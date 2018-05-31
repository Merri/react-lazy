'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.storage = undefined;
exports.findObserverElement = findObserverElement;
exports.getPooled = getPooled;
exports.callback = callback;
exports.createObserver = createObserver;
exports.observeElement = observeElement;
exports.unobserveElement = unobserveElement;

var _utils = require('./utils');

var storage = exports.storage = new Map(); // based on @researchgate/react-intersection-observer
function findObserverElement(observer, entry) {
    var observerElements = storage.get(observer);

    if (observerElements) {
        var elements = observerElements.values();

        for (var element = elements.next(); !element.done; element = elements.next()) {
            if (element.value.target === entry.target) {
                return element.value;
            }
        }
    }

    return null;
}

function getPooled() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var root = options.root || null;
    var rootMargin = (0, _utils.parseRootMargin)(options.rootMargin);
    var threshold = Array.isArray(options.threshold) ? options.threshold : [options.threshold != null ? options.threshold : 0];

    var observers = storage.keys();

    for (var observer = observers.next(); !observer.done; observer = observers.next()) {
        var unmatched = root !== observer.value.root || rootMargin !== observer.value.rootMargin || (0, _utils.shallowCompare)(threshold, observer.value.threshold);

        if (!unmatched) {
            return observer.value;
        }
    }

    return null;
}

/**
 * The Intersection Observer API callback that is called whenever one element,
 * called the target, intersects either the device viewport or a specified element.
 * Also will get called whenever the visibility of the target element changes and
 * crosses desired amounts of intersection with the viewport element.
 * @param {array} changes
 * @param {IntersectionObserver} observer
 */
function callback(changes, observer) {
    for (var i = 0; i < changes.length; i++) {
        var instance = findObserverElement(observer, changes[i]);

        if (instance) {
            instance.handleChange(changes[i]);
        }
    }
}

function createObserver(options) {
    return getPooled(options) || new IntersectionObserver(callback, options);
}

function observeElement(element) {
    if (!storage.has(element.observer)) {
        storage.set(element.observer, new Set());
    }

    storage.get(element.observer).add(element);
    element.observer.observe(element.target);
}

function unobserveElement(element) {
    if (storage.has(element.observer)) {
        var targets = storage.get(element.observer);

        if (targets.delete(element)) {
            if (targets.size > 0) {
                element.observer.unobserve(element.target);
            } else {
                element.observer.disconnect();
                storage.delete(element.observer);
            }
        }
    }
}