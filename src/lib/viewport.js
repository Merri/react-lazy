import { bindMultipleListeners } from './eventListener'

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

export const checkElementsInViewport = debounce(function checkElementsInViewport() {
    if (elements.length === 0) {
        return
    }

    const size = getViewportSize()

    for (let i = elements.length - 1; i >= 0; i--) {
        if (inViewport(elements[i], size)) {
            // callback may return false to prevent lazy loading items in viewport
            if (elements[i].callback() !== false) {
                elements.splice(i, 1)
            }
        }
    }
    checkUnbind()
}, 50)

export function addElement(options) {
    // callback may return false to prevent lazy loading items in viewport
    if (inViewport(options, getViewportSize()) && options.callback() !== false) {
        return
    }

    if (!removeListeners && elements.length === 0) {
        removeListeners = bindMultipleListeners(
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
