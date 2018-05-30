'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.storage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // based on @researchgate/react-intersection-observer


exports.getPooled = getPooled;

var _utils = require('../lib/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getPooled() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var root = options.root || null;
    var rootMargin = (0, _utils.parseRootMargin)(options.rootMargin);
    var threshold = Array.isArray(options.threshold) ? options.threshold : [options.threshold != null ? options.threshold : 0];

    var observers = storage.keys();

    for (var observer = observers.next(); !observer.done; observer = observers.next()) {
        var unmatched = (0, _utils.shallowCompareOptions)(root, observer.value.root) || (0, _utils.shallowCompareOptions)(rootMargin, observer.value.rootMargin) || (0, _utils.shallowCompareOptions)(threshold, observer.value.threshold);

        if (!unmatched) {
            return observer.value;
        }
    }

    return null;
}

var storage = exports.storage = new Map();

var ObserverContainer = function () {
    function ObserverContainer() {
        _classCallCheck(this, ObserverContainer);
    }

    _createClass(ObserverContainer, null, [{
        key: 'create',
        value: function create(callback, options) {
            return getPooled(options) || new IntersectionObserver(callback, options);
        }
    }, {
        key: 'findElement',
        value: function findElement(entry, observer) {
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
    }, {
        key: 'observe',
        value: function observe(element) {
            if (!storage.has(element.observer)) {
                storage.set(element.observer, new Set());
            }

            storage.get(element.observer).add(element);
            element.observer.observe(element.target);
        }
    }, {
        key: 'unobserve',
        value: function unobserve(element) {
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
    }, {
        key: 'clear',
        value: function clear() {
            storage.clear();
        }
    }, {
        key: 'count',
        value: function count() {
            return storage.size;
        }
    }]);

    return ObserverContainer;
}();

exports.default = ObserverContainer;