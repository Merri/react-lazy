'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkElementsInViewport = checkElementsInViewport;
exports.addElement = addElement;
exports.removeElement = removeElement;

var _eventListener = require('./eventListener');

var _defaults = require('../lib/defaults.js');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elements = [];
var removeListeners = false;

function getRectWithCushion(rect, cushion) {
    var bottom = rect.bottom + cushion;
    var left = rect.left - cushion;
    var right = rect.right + cushion;
    var top = rect.top - cushion;

    return {
        bottom: bottom,
        left: left,
        right: right,
        top: top,
        height: bottom - top,
        width: right - left
    };
}

function getRect(element, cushion) {
    element = element && !element.nodeType ? element[0] : element;

    if (!element || element.nodeType !== 1) {
        return false;
    }

    return getRectWithCushion(element.getBoundingClientRect(), cushion);
}

function getViewportSize() {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth)
    };
}

function inViewport(_ref, viewport) {
    var cushion = _ref.cushion,
        element = _ref.element;

    if (element.offsetParent === null) {
        return false;
    }

    var rect = getRect(element, cushion);

    return !!rect && rect.bottom >= 0 && rect.right >= 0 && rect.top < viewport.height && rect.left < viewport.width;
}

function throttle(func, wait) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function later() {
        previous = Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var waitTime = typeof wait === 'function' ? wait() : wait;
        var now = Date.now();
        var remaining = waitTime - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > waitTime) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

function debounce(func, wait) {
    var timeout;

    return function () {
        var waitTime = typeof wait === 'function' ? wait() : wait;
        var call = !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function (args) {
            timeout = null;
            func.apply(this, args);
        }.bind(this, arguments), waitTime);
        if (call) {
            func.apply(this, arguments);
        }
    };
}

function checkElements(checkThrottled) {
    if (elements.length === 0) {
        return;
    }

    var size = getViewportSize();

    for (var i = elements.length - 1; i >= 0; i--) {
        if (checkThrottled && elements[i].throttle !== true || !checkThrottled && elements[i].throttle === true) {
            continue;
        }
        if (inViewport(elements[i], size)) {
            // callback may return false to prevent lazy loading items in viewport
            if (elements[i].callback() !== false) {
                elements.splice(i, 1);
            }
        }
    }
    checkUnbind();
}

var debouncedCheckElements = debounce(function () {
    checkElements(false);
}, function () {
    return _defaults2.default.debounceTime;
});
var throttledCheckElements = throttle(function () {
    checkElements(true);
}, function () {
    return _defaults2.default.throttleTime;
});

function checkElementsInViewport() {
    debouncedCheckElements();
    throttledCheckElements();
}

function addElement(options) {
    // callback may return false to prevent lazy loading items in viewport
    if (inViewport(options, getViewportSize()) && options.callback() !== false) {
        return;
    }

    if (!removeListeners && elements.length === 0) {
        removeListeners = (0, _eventListener.bindEventsToListener)(window, ['resize', 'scroll', 'touchend', 'wheel'], checkElementsInViewport, { passive: true });
    }

    elements.push(options);
}

function checkUnbind() {
    if (removeListeners && elements.length === 0) {
        removeListeners();
        removeListeners = false;
    }
}

function removeElement(options) {
    var index = elements.indexOf(options);

    if (index >= 0) {
        elements.splice(index, 1);
    }

    checkUnbind();
}