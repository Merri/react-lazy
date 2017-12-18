import { bindEventsToListener } from './eventListener'

const elements = []
let removeListeners = false

function getRectWithCushion(rect, cushion) {
    const bottom = rect.bottom + cushion
    const left = rect.left - cushion
    const right = rect.right + cushion
    const top = rect.top - cushion

    return {
        bottom,
        left,
        right,
        top,
        height: bottom - top,
        width: right - left,
    }
}

function getRect(element, cushion) {
    element = element && !element.nodeType ? element[0] : element

    if (!element || element.nodeType !== 1) {
        return false
    }

    return getRectWithCushion(element.getBoundingClientRect(), cushion)
}

function getViewportSize() {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth),
    }
}

function inViewport({ cushion, element }, viewport) {
    if (element.offsetParent === null) {
        return false
    }

    const rect = getRect(element, cushion)

    return !!rect && rect.bottom >= 0 && rect.right >= 0 && rect.top < viewport.height && rect.left < viewport.width
}

function throttle(func, wait) {
    var context, args, result
    var timeout = null
    var previous = 0
    var later = function() {
        previous = Date.now()
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
    }
    return function() {
        var now = Date.now()
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            result = func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout) {
            timeout = setTimeout(later, remaining)
        }
        return result
    }
}

function debounce(func, wait) {
    var timeout

    return function() {
        var call = !timeout
        clearTimeout(timeout)
        timeout = setTimeout(function(args) {
            timeout = null
            func.apply(this, args)
        }.bind(this, arguments), wait)
        if (call) {
            func.apply(this, arguments)
        }
    }
}

function checkElements(checkThrottled) {
    if (elements.length === 0) {
        return
    }

    const size = getViewportSize()

    for (let i = elements.length - 1; i >= 0; i--) {
        if ((checkThrottled && elements[i].throttle !== true) ||
          (!checkThrottled && elements[i].throttle === true)) {
            continue
        }
        if (inViewport(elements[i], size)) {
            // callback may return false to prevent lazy loading items in viewport
            if (elements[i].callback() !== false) {
                elements.splice(i, 1)
            }
        }
    }
    checkUnbind()
}

const debouncedCheckElements = debounce(function(){ checkElements(false) }, 50)
const throttledCheckElements = throttle(function(){ checkElements(true) }, 50)

export function checkElementsInViewport() {
    debouncedCheckElements()
    throttledCheckElements()
}

export function addElement(options) {
    // callback may return false to prevent lazy loading items in viewport
    if (inViewport(options, getViewportSize()) && options.callback() !== false) {
        return
    }

    if (!removeListeners && elements.length === 0) {
        removeListeners = bindEventsToListener(
            window,
            ['resize', 'scroll', 'touchend', 'wheel'],
            checkElementsInViewport,
            { passive: true }
        )
    }

    elements.push(options)
}

function checkUnbind() {
    if (removeListeners && elements.length === 0) {
        removeListeners()
        removeListeners = false
    }
}

export function removeElement(options) {
    const index = elements.indexOf(options)

    if (index >= 0) {
        elements.splice(index, 1)
    }

    checkUnbind()
}
