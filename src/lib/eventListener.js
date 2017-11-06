const options = ['capture', 'once', 'passive']
const AEL = 'addEventListener'
const REL = 'removeEventListener'
const supports = {
    dom: !!(
        typeof window === 'object'
        && window[AEL]
        && window[REL]
        && Object.defineProperty
    )
}

if (supports.dom) {
    const check = {}

    options.forEach(function(option) {
        Object.defineProperty(check, option, function() {
            supports.optionsObject = true
            supports[option] = true
        })
    })

    window[AEL]('null', null, check)
    window[REL]('null', null, check)
}

export function bindEventsToListener(target, events, listener, options) {
    if (!supports.dom || !target || !target[AEL] || !Array.isArray(events) || typeof listener !== 'function') {
        return false
    }

    const opts = getEventListenerOptions(options)

    events.forEach(function(event) {
        target[AEL](event, listener, opts)
    })

    return function unbindEventsOfListener() {
        events.forEach(function(event) {
            target[REL](event, listener, opts)
        })
    }
}

export function getEventListenerOptions(options) {
    if (supports.optionsObject && Object.keys(options).every(isEventListenerOptionSupported)) {
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
