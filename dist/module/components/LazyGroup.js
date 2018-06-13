'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _wrap = require('../lib/wrap');

var _DefaultWrapper = require('./DefaultWrapper');

var _DefaultWrapper2 = _interopRequireDefault(_DefaultWrapper);

var _reactIntersectionObserver = require('@researchgate/react-intersection-observer');

var _reactIntersectionObserver2 = _interopRequireDefault(_reactIntersectionObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyGroup = function (_React$PureComponent) {
    _inherits(LazyGroup, _React$PureComponent);

    function LazyGroup(props) {
        _classCallCheck(this, LazyGroup);

        var _this = _possibleConstructorReturn(this, (LazyGroup.__proto__ || Object.getPrototypeOf(LazyGroup)).call(this, props));

        _this.loadedImgTags = 0;
        _this.state = { imgTagCount: null, loadedAt: null, viewportAt: null };

        _this.onImgLoaded = _this.onImgLoaded.bind(_this);
        _this.onViewport = _this.onViewport.bind(_this);
        return _this;
    }

    _createClass(LazyGroup, [{
        key: 'onImgLoaded',
        value: function onImgLoaded() {
            this.loadedImgTags++;

            if (this.loadedImgTags === this.state.imgTagCount) {
                this.loadedImgTags = 0;
                this.setState({ imgTagCount: null, loadedAt: Date.now() }, this.props.onLoad);
            }
        }
    }, {
        key: 'onViewport',
        value: function onViewport(event, unobserve) {
            var _props = this.props,
                children = _props.children,
                childrenToWrap = _props.childrenToWrap,
                onLoad = _props.onLoad,
                onViewport = _props.onViewport,
                visible = _props.visible;


            if (!visible) {
                return false;
            }

            if (!event.isIntersecting || event.defaultPrevented) {
                return;
            }

            unobserve();

            var imgTagCount = (0, _wrap.countTypesTags)(childrenToWrap, children) || null;
            this.loadedImgTags = 0;
            if (onViewport) {
                onViewport(event);
            }
            var viewportAt = Date.now();
            this.setState({ imgTagCount: imgTagCount, loadedAt: !imgTagCount ? viewportAt : null, viewportAt: viewportAt }, !imgTagCount ? onLoad : null);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                childrenToWrap = _props2.childrenToWrap,
                childWrapper = _props2.childWrapper,
                clientOnly = _props2.clientOnly,
                component = _props2.component,
                cushion = _props2.cushion,
                ltIE9 = _props2.ltIE9,
                onLoad = _props2.onLoad,
                onViewport = _props2.onViewport,
                threshold = _props2.threshold,
                viewport = _props2.viewport,
                visible = _props2.visible,
                props = _objectWithoutProperties(_props2, ['children', 'childrenToWrap', 'childWrapper', 'clientOnly', 'component', 'cushion', 'ltIE9', 'onLoad', 'onViewport', 'threshold', 'viewport', 'visible']);

            return _react2.default.createElement(
                _reactIntersectionObserver2.default,
                { onChange: this.onViewport, root: viewport, rootMargin: cushion, threshold: threshold },
                _react2.default.createElement(component, props,
                // swap render once element is visible in viewport
                clientOnly || visible && this.state.viewportAt
                // replace elements with LazyChild
                ? (0, _wrap.wrapTypesToLazyChild)(childrenToWrap, children, childWrapper, this.onImgLoaded)
                // wrap given element types to noscript and the given wrapper component
                : (0, _wrap.wrapTypesToNoScript)(childrenToWrap, children, ltIE9, childWrapper))
            );
        }
    }]);

    return LazyGroup;
}(_react2.default.PureComponent);

exports.default = LazyGroup;


LazyGroup.defaultProps = {
    childrenToWrap: ['iframe', 'img'],
    childWrapper: _DefaultWrapper2.default,
    clientOnly: false,
    component: 'div',
    ltIE9: false,
    visible: true
};