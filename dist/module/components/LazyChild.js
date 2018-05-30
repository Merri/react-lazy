'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyChild = function (_React$PureComponent) {
    _inherits(LazyChild, _React$PureComponent);

    function LazyChild(props) {
        _classCallCheck(this, LazyChild);

        var _this = _possibleConstructorReturn(this, (LazyChild.__proto__ || Object.getPrototypeOf(LazyChild)).call(this, props));

        var _ref = props.children && (props.children.props || props.children._store && props.children._store.props) || {},
            onError = _ref.onError,
            onLoad = _ref.onLoad,
            childProps = _objectWithoutProperties(_ref, ['onError', 'onLoad']);

        _this.childOnError = onError;
        _this.childOnLoad = onLoad;
        _this.childProps = childProps;

        _this.state = { isFailed: false, isLoaded: false };

        _this.onError = _this.onError.bind(_this);
        _this.onLoad = _this.onLoad.bind(_this);
        return _this;
    }

    _createClass(LazyChild, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.children === this.props.children) {
                return;
            }

            var _ref2 = this.props.children && (this.props.children.props || this.props.children._store && this.props.children._store.props) || {},
                onError = _ref2.onError,
                onLoad = _ref2.onLoad,
                childProps = _objectWithoutProperties(_ref2, ['onError', 'onLoad']);

            this.childOnError = onError;
            this.childOnLoad = onLoad;
            this.childProps = childProps;
        }
    }, {
        key: 'onError',
        value: function onError(event) {
            this.setState({ isFailed: true }, this.props.callback);

            if (this.childOnError) {
                this.childOnError(event);
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad(event) {
            this.setState({ isLoaded: true }, this.props.callback);

            if (this.childOnLoad) {
                this.childOnLoad(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                callback = _props.callback,
                children = _props.children,
                wrapper = _props.wrapper,
                props = _objectWithoutProperties(_props, ['callback', 'children', 'wrapper']);

            var child = _react2.default.Children.only(children);

            return _react2.default.createElement(wrapper, _extends({}, props, this.state, { childProps: this.childProps }), !this.state.isFailed && !this.state.isLoaded ? _react2.default.cloneElement(child, { onError: this.onError, onLoad: this.onLoad }) : child);
        }
    }]);

    return LazyChild;
}(_react2.default.PureComponent);

exports.default = LazyChild;