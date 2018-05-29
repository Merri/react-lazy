'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.storage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getPooled = getPooled;

var _utils = require('../lib/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // based on @researchgate/react-intersection-observer


function getPooled() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var root = options.viewport || null;
    var rootMargin = (0, _utils.parseRootMargin)(options.cushion);
    var threshold = Array.isArray(options.threshold) ? options.threshold : [options.threshold != null ? options.threshold : 0];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = storage.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var observer = _step.value;

            var unmatched = [[root, observer.root], [rootMargin, observer.rootMargin], [threshold, observer.thresholds]].some(function (option) {
                return _utils.shallowCompareOptions.apply(undefined, _toConsumableArray(option));
            });

            if (!unmatched) {
                return observer;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
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
            var elements = storage.get(observer);
            if (elements) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = elements.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var element = _step2.value;

                        if (element.target === entry.target) {
                            return element;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            return null;
        }
    }, {
        key: 'observe',
        value: function observe(element) {
            var targets = void 0;

            if (storage.has(element.observer)) {
                targets = storage.get(element.observer);
            } else {
                targets = new Set();
                storage.set(element.observer, targets);
            }

            targets.add(element);
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