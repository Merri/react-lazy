const options = ['capture', 'once', 'passive']
const supports = {}

if (typeof window === 'object' && window.addEventListener && window.removeEventListener && Object.defineProperty) {
    const check = {}

    options.forEach(function(option) {
        Object.defineProperty(check, option, function() {
            supports.optionsObject = true
            supports[option] = true
        })
    })

    window.addEventListener('null', null, check)
    window.removeEventListener('null', null, check)

    supports.browser = true
}

export function bindMultipleListeners(target, events, listener, options) {
    if (!supports.browser) {
        return false
    }

    const opts = getEventListenerOptions(options)

    events.forEach(function(event) {
        target.addEventListener(event, listener, opts)
    })

    return function unbindMultipleListeners() {
        events.forEach(function(event) {
            target.removeEventListener(event, listener, opts)
        })
    }
}

export function getEventListenerOptions(options) {
    if (supports.optionsObject) {
        return options
    }

    return !!(options && options.capture)
}

export function isEventListenerOptionSupported(option) {
    if (options.includes(option)) {
        return supports[option] === true
    }

    throw new Error('Option must be exactly one of: ' + options.join(', '))
}
