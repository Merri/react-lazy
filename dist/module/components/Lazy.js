'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntersectionObserver = require('@researchgate/react-intersection-observer');

var _reactIntersectionObserver2 = _interopRequireDefault(_reactIntersectionObserver);

var _wrap = require('../lib/wrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lazy = function (_React$PureComponent) {
    _inherits(Lazy, _React$PureComponent);

    function Lazy(props) {
        _classCallCheck(this, Lazy);

        var _this = _possibleConstructorReturn(this, (Lazy.__proto__ || Object.getPrototypeOf(Lazy)).call(this, props));

        _this.state = { show: false };

        _this.onViewport = _this.onViewport.bind(_this);
        return _this;
    }

    _createClass(Lazy, [{
        key: 'onViewport',
        value: function onViewport(event, unobserve) {
            var _props = this.props,
                onLoad = _props.onLoad,
                onViewport = _props.onViewport,
                visible = _props.visible;


            if (!visible) {
                return;
            }

            if (!event.isIntersecting || event.defaultPrevented) {
                return;
            }

            unobserve();

            if (onViewport) {
                onViewport(event);
            }

            this.setState({ show: true }, onLoad);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                clientOnly = _props2.clientOnly,
                component = _props2.component,
                cushion = _props2.cushion,
                ltIE9 = _props2.ltIE9,
                visible = _props2.visible,
                onLoad = _props2.onLoad,
                onViewport = _props2.onViewport,
                threshold = _props2.threshold,
                viewport = _props2.viewport,
                props = _objectWithoutProperties(_props2, ['children', 'clientOnly', 'component', 'cushion', 'ltIE9', 'visible', 'onLoad', 'onViewport', 'threshold', 'viewport']);

            if (clientOnly || visible && this.state.show) {
                return _react2.default.createElement(
                    _reactIntersectionObserver2.default,
                    { onChange: this.onViewport, root: viewport, rootMargin: cushion, threshold: threshold },
                    _react2.default.createElement(component, props, visible && this.state.show ? children : null)
                );
            }

            // wrap all contents inside noscript
            return _react2.default.createElement(
                _reactIntersectionObserver2.default,
                { onChange: this.onViewport, root: viewport, rootMargin: cushion, threshold: threshold },
                _react2.default.createElement(component, (0, _wrap.propsWithNoScriptRender)(children, ltIE9, props))
            );
        }
    }]);

    return Lazy;
}(_react2.default.PureComponent);

exports.default = Lazy;


Lazy.defaultProps = {
    clientOnly: false,
    component: 'div',
    ltIE9: false,
    visible: true
};