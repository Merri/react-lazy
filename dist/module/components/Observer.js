'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.callback = callback;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _ObserverContainer = require('./ObserverContainer');

var _ObserverContainer2 = _interopRequireDefault(_ObserverContainer);

var _utils = require('../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // based on @researchgate/react-intersection-observer


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
        var instance = _ObserverContainer2.default.findElement(changes[i], observer);

        if (instance) {
            instance.handleChange(changes[i]);
        }
    }
}

var observerOptions = ['viewport', 'cushion', 'threshold'];
var compareObserverOptions = observerOptions.concat('disabled');
var objectProto = Object.prototype;

var Observer = function (_React$Component) {
    _inherits(Observer, _React$Component);

    function Observer(props) {
        _classCallCheck(this, Observer);

        var _this = _possibleConstructorReturn(this, (Observer.__proto__ || Object.getPrototypeOf(Observer)).call(this, props));

        _this.compareObserverProps = _this.compareObserverProps.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleNode = _this.handleNode.bind(_this);
        _this.observe = _this.observe.bind(_this);
        _this.reobserve = _this.reobserve.bind(_this);
        _this.unobserve = _this.unobserve.bind(_this);
        return _this;
    }

    _createClass(Observer, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.props.onChange(event, this.unobserve);
        }
    }, {
        key: 'handleNode',
        value: function handleNode(target) {
            if (typeof this.props.children.ref === 'function') {
                this.props.children.ref(target);
            }

            if (this.renderedTarget && target && this.renderedTarget !== target) {
                this.unobserve();
                this.targetChanged = true;
            } else {
                this.targetChanged = false;
            }

            this.target = target;
        }
    }, {
        key: 'compareObserverProps',
        value: function compareObserverProps(prevProps) {
            var _this2 = this;

            return compareObserverOptions.some(function (option) {
                return (0, _utils.shallowCompareOptions)(_this2.props[option], prevProps[option]);
            });
        }
    }, {
        key: 'observe',
        value: function observe() {
            // eslint-disable-next-line react/no-find-dom-node
            this.target = (0, _utils.isDOMTypeElement)(this.target) ? this.target : (0, _reactDom.findDOMNode)(this.target);
            this.observer = _ObserverContainer2.default.create(callback, this.options);
            _ObserverContainer2.default.observe(this);
        }
    }, {
        key: 'unobserve',
        value: function unobserve() {
            if (this.target != null) {
                _ObserverContainer2.default.unobserve(this);
            }
        }
    }, {
        key: 'reobserve',
        value: function reobserve() {
            this.unobserve();

            if (!this.props.disabled) {
                this.observe();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.disabled) {
                this.observe();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.targetChanged || this.compareObserverProps(prevProps)) {
                this.reobserve();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unobserve();
        }
    }, {
        key: 'render',
        value: function render() {
            this.renderedTarget = this.target;

            return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), { ref: this.handleNode });
        }
    }, {
        key: 'options',
        get: function get() {
            var props = this.props;

            return observerOptions.reduce(function (prev, key) {
                if (objectProto.hasOwnProperty.call(props, key)) {
                    var useQuery = key === 'viewport' && objectProto.toString.call(props[key]) === '[object String]';

                    prev[key] = useQuery ? document.querySelector(props[key]) : props[key];
                }

                return prev;
            }, {});
        }
    }]);

    return Observer;
}(_react2.default.Component);

exports.default = Observer;


Observer.propTypes = {
    /**
     * The element that is used as the target to observe.
     */
    children: _propTypes2.default.element.isRequired,

    /**
     * Cushion around the viewport. Can have values similar to the CSS margin property,
     * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
     * If the viewport element is specified, the values can be percentages.
     * This set of values serves to grow or shrink each side of the viewport element's
     * bounding box before computing intersections.
     * Defaults to all zeros.
     */
    cushion: _propTypes2.default.string,

    /**
     * Controls whether the element should stop being observed by its IntersectionObserver instance.
     * Defaults to false.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Function that will be invoked whenever the intersection value for this element changes.
     */
    onChange: _propTypes2.default.func.isRequired,

    /**
     * Either a single number or an array of numbers which indicate at what percentage
     * of the target's visibility the observer's callback should be executed.
     * If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
     * If you want the callback run every time visibility passes another 25%,
     * you would specify the array [0, 0.25, 0.5, 0.75, 1].
     * The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
     * A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
     */
    threshold: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),

    /**
     * The element that is used as the viewport for checking visibility of the target.
     * Can be specified as string for selector matching within the document.
     * Defaults to the browser viewport if not specified or if null.
     */
    viewport: _propTypes2.default.oneOfType([_propTypes2.default.string].concat(typeof HTMLElement === 'undefined' ? [] : _propTypes2.default.instanceOf(HTMLElement)))
};