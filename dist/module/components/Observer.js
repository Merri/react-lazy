'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _intersectionObserver = require('../lib/intersectionObserver');

var _utils = require('../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // based on @researchgate/react-intersection-observer

/* eslint-disable react/no-find-dom-node */


var observerOptions = ['root', 'rootMargin', 'threshold'];
var optToPropMapper = { root: 'viewport', rootMargin: 'cushion' };
var observerProps = ['viewport', 'cushion', 'disabled'].concat(observerOptions);
var objectProto = Object.prototype;

var Observer = function (_React$Component) {
    _inherits(Observer, _React$Component);

    function Observer(props) {
        _classCallCheck(this, Observer);

        var _this = _possibleConstructorReturn(this, (Observer.__proto__ || Object.getPrototypeOf(Observer)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleNode = _this.handleNode.bind(_this);
        _this.observe = _this.observe.bind(_this);
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
        key: 'observe',
        value: function observe() {
            var isDOMTypeElement = _react2.default.isValidElement(this.target) && typeof this.target.type === 'string';

            if (!isDOMTypeElement) {
                this.target = (0, _reactDom.findDOMNode)(this.target);
            }

            this.observer = (0, _intersectionObserver.createObserver)(this.options);
            (0, _intersectionObserver.observeElement)(this);
        }
    }, {
        key: 'unobserve',
        value: function unobserve() {
            if (this.target != null) {
                (0, _intersectionObserver.unobserveElement)(this);
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
            var _this2 = this;

            if (this.targetChanged || observerProps.some(function (option) {
                return (0, _utils.shallowCompare)(_this2.props[option], prevProps[option]);
            })) {
                this.unobserve();

                if (!this.props.disabled) {
                    this.observe();
                }
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

            return observerOptions.reduce(function (options, option) {
                var prop = optToPropMapper[option] || option;
                // allow usage of root and rootMargin props, but prefer viewport and cushion
                var key = objectProto.hasOwnProperty.call(props, prop) && prop || prop !== option && objectProto.hasOwnProperty.call(props, option) && option || '';

                if (key) {
                    var useQuery = option === 'root' && objectProto.toString.call(props[key]) === '[object String]';

                    options[option] = useQuery ? document.querySelector(props[key]) : props[key];
                }

                return options;
            }, {});
        }
    }]);

    return Observer;
}(_react2.default.Component);

exports.default = Observer;