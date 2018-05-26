'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkElementsInViewport = undefined;
exports.addElement = addElement;
exports.removeElement = removeElement;

var _eventListener = require('./eventListener');

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

function throttle(func, limit) {
    var timeout = void 0;
    var time = void 0;

    return function () {
        var context = this;
        var args = arguments;

        if (!time) {
            func.apply(context, args);
            time = Date.now();
        } else {
            clearTimeout(timeout);

            timeout = setTimeout(function () {
                if (Date.now() - time >= limit) {
                    func.apply(context, args);
                    time = Date.now();
                }
            }, limit - (Date.now() - time));
        }
    };
}

var checkElementsInViewport = exports.checkElementsInViewport = throttle(function checkElementsInViewport() {
    if (elements.length === 0) {
        return;
    }

    var size = getViewportSize();

    for (var i = elements.length - 1; i >= 0; i--) {
        if (inViewport(elements[i], size)) {
            // callback may return false to prevent lazy loading items in viewport
            if (elements[i].callback() !== false) {
                elements.splice(i, 1);
            }
        }
    }
    checkUnbind();
}, 50);

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