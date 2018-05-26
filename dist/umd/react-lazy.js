!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types"),require("react-dom/server")):"function"==typeof define&&define.amd?define(["react","prop-types","react-dom/server"],t):"object"==typeof exports?exports.ReactLazy=t(require("react"),require("prop-types"),require("react-dom/server")):e.ReactLazy=t(e.React,e.PropTypes,e.ReactDOMServer)}(window,function(e,t,n){return function(e){var t={}
function n(o){if(t[o])return t[o].exports
var r=t[o]={i:o,l:!1,exports:{}}
return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/build/",n(n.s=8)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=p(n(0)),l=p(n(1)),u=n(3),c=n(7)
function p(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.state={loadedAt:null},n.getRef=n.getRef.bind(n),n.onViewport=n.onViewport.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.PureComponent),i(t,[{key:"componentDidMount",value:function(){this.options={callback:this.onViewport,cushion:this.props.cushion,element:this.el},(0,u.addElement)(this.options)}},{key:"componentDidUpdate",value:function(e){e.cushion!==this.props.cushion&&(this.options.cushion=this.props.cushion)}},{key:"componentWillUnmount",value:function(){(0,u.removeElement)(this.options),delete this.options}},{key:"getRef",value:function(e){this.el=e}},{key:"onViewport",value:function(){var e=this.props,t=e.onLoad,n=e.onViewport
if(!e.visible)return!1
n&&n(),this.setState({loadedAt:Date.now()},t)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.component,o=(e.cushion,e.jsOnly),i=e.ltIE9,l=e.visible,u=(e.onLoad,e.onViewport,function(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}(e,["children","component","cushion","jsOnly","ltIE9","visible","onLoad","onViewport"])),p=r({},u,{ref:this.getRef})
return o||l&&this.state.loadedAt?a.default.createElement(n,p,l&&this.state.loadedAt?t:null):a.default.createElement(n,(0,c.propsWithNoScriptRender)(t,i,p))}}]),t}()
f.defaultProps={component:"div",cushion:0,jsOnly:!1,ltIE9:!1,visible:!0},f.propTypes={children:l.default.node,component:l.default.oneOfType([l.default.string,l.default.object,l.default.func]),cushion:l.default.number,jsOnly:l.default.bool,ltIE9:l.default.bool,onLoad:l.default.func,onViewport:l.default.func,visible:l.default.bool},t.default=f},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.checkElementsInViewport=void 0,t.addElement=function(e){if(l(e,a())&&!1!==e.callback())return
i||0!==r.length||(i=(0,o.bindEventsToListener)(window,["resize","scroll","touchend","wheel"],s,{passive:!0}))
r.push(e)},t.removeElement=function(e){var t=r.indexOf(e)
t>=0&&r.splice(t,1)
d()}
var o=n(9),r=[],i=!1
function a(){return{height:Math.max(document.documentElement.clientHeight,window.innerHeight),width:Math.max(document.documentElement.clientWidth,window.innerWidth)}}function l(e,t){var n=e.cushion,o=e.element
if(null===o.offsetParent)return!1
var r=function(e,t){return!(!(e=e&&!e.nodeType?e[0]:e)||1!==e.nodeType)&&function(e,t){var n=e.bottom+t,o=e.left-t,r=e.right+t,i=e.top-t
return{bottom:n,left:o,right:r,top:i,height:n-i,width:r-o}}(e.getBoundingClientRect(),t)}(o,n)
return!!r&&r.bottom>=0&&r.right>=0&&r.top<t.height&&r.left<t.width}var u,c,p,f,s=t.checkElementsInViewport=(u=function(){if(0!==r.length){for(var e=a(),t=r.length-1;t>=0;t--)l(r[t],e)&&!1!==r[t].callback()&&r.splice(t,1)
d()}},c=50,p=void 0,f=void 0,function(){var e=this,t=arguments
f?(clearTimeout(p),p=setTimeout(function(){Date.now()-f>=c&&(u.apply(e,t),f=Date.now())},c-(Date.now()-f))):(u.apply(e,t),f=Date.now())})
function d(){i&&0===r.length&&(i(),i=!1)}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=a(n(0)),i=a(n(1))
function a(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=e.childProps,n=e.children,i=e.isFailed,a=e.isLoaded,l=function(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}(e,["childProps","children","isFailed","isLoaded"]),u="react-lazy-wrapper"+(a||i?"":" react-lazy-wrapper--"+(t?"loading":"placeholder"))+(i?" react-lazy-wrapper--failed":"")+(a?" react-lazy-wrapper--loaded":"")+(l.className?" "+l.className:"")
return r.default.createElement("div",o({},l,{className:u}),n)}l.propTypes={children:i.default.node,childProps:i.default.object,className:i.default.string,isFailed:i.default.bool,isLoaded:i.default.bool},t.default=l},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=u(n(0)),l=u(n(1))
function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}var p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=e.children&&(e.children.props||e.children._store&&e.children._store.props)||{},i=r.onError,a=r.onLoad,l=c(r,["onError","onLoad"])
return n.childOnError=i,n.childOnLoad=a,n.childProps=l,n.state={isFailed:!1,isLoaded:!1},n.onError=n.onError.bind(n),n.onLoad=n.onLoad.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.PureComponent),i(t,[{key:"componentDidUpdate",value:function(e){if(e.children!==this.props.children){var t=this.props.children&&(this.props.children.props||this.props.children._store&&this.props.children._store.props)||{},n=t.onError,o=t.onLoad,r=c(t,["onError","onLoad"])
this.childOnError=n,this.childOnLoad=o,this.childProps=r}}},{key:"onError",value:function(e){this.setState({isFailed:!0},this.props.callback),this.childOnError&&this.childOnError(e)}},{key:"onLoad",value:function(e){this.setState({isLoaded:!0},this.props.callback),this.childOnLoad&&this.childOnLoad(e)}},{key:"render",value:function(){var e=this.props,t=(e.callback,e.children),n=e.wrapper,o=c(e,["callback","children","wrapper"]),i=a.default.Children.only(t)
return a.default.createElement(n,r({},o,this.state,{childProps:this.childProps}),this.state.isFailed||this.state.isLoaded?i:a.default.cloneElement(i,{onError:this.onError,onLoad:this.onLoad}))}}]),t}()
p.propTypes={callback:l.default.func,children:l.default.node.isRequired,wrapper:l.default.oneOfType([l.default.object,l.default.func]).isRequired},t.default=p},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=f(n(0)),l=f(n(1)),u=n(7),c=f(n(4)),p=f(n(2))
function f(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.loadedImgTags=0,n.state={imgTagCount:null,loadedAt:null,viewportAt:null},n.onImgLoaded=n.onImgLoaded.bind(n),n.onViewport=n.onViewport.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,p.default),i(t,[{key:"onImgLoaded",value:function(){this.loadedImgTags++,this.loadedImgTags===this.state.imgTagCount&&(this.loadedImgTags=0,this.setState({imgTagCount:null,loadedAt:Date.now()},this.props.onLoad))}},{key:"onViewport",value:function(){var e=this.props,t=e.children,n=e.childrenToWrap,o=e.onLoad,r=e.onViewport
if(!e.visible)return!1
var i=(0,u.countTypesTags)(n,t)||null
this.loadedImgTags=0,r&&r()
var a=Date.now()
this.setState({imgTagCount:i,loadedAt:i?null:a,viewportAt:a},i?null:o)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.childrenToWrap,o=e.childWrapper,i=e.component,l=(e.cushion,e.jsOnly),c=e.ltIE9,p=(e.onLoad,e.onViewport,e.visible),f=function(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}(e,["children","childrenToWrap","childWrapper","component","cushion","jsOnly","ltIE9","onLoad","onViewport","visible"]),s=r({},f,{ref:this.getRef})
return a.default.createElement(i,s,l||p&&this.state.viewportAt?(0,u.wrapTypesToLazyChild)(n,t,o,this.onImgLoaded):(0,u.wrapTypesToNoScript)(n,t,c,o))}}]),t}()
s.defaultProps=r({},p.default.defaultProps,{childrenToWrap:["iframe","img"],childWrapper:c.default}),s.propTypes=r({},p.default.propTypes,{childrenToWrap:l.default.arrayOf(p.default.propTypes.component),childWrapper:l.default.oneOfType([l.default.object,l.default.func])}),t.default=s},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.countTypesTags=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0
if(!n)return r
o.default.Children.forEach(n,function(n){if(n&&n.type!==i.default&&n.type!==l.default&&n.type!==a.default)if(t.includes(n.type))r++
else{var o=n.props||n._store&&n._store.props||{}
r+=e(t,o.children)}})
return r},t.propsWithNoScriptRender=c,t.wrapTypesToLazyChild=function e(t,n,r,u){if(!n)return n
return o.default.Children.map(n,function(n){if(n&&n.type!==i.default&&n.type!==l.default&&n.type!==a.default){if(t.includes(n.type))return o.default.createElement(a.default,{callback:u,wrapper:r},n)
var c=n.props||n._store&&n._store.props||{},p=e(t,c.children,r,u)
return p!==c.children?o.default.cloneElement(n,null,p):n}return n})},t.wrapTypesToNoScript=function e(t,n,r,u){if(!n)return n
return o.default.Children.map(n,function(n){if(n&&n.type!==i.default&&n.type!==l.default&&n.type!==a.default){if(t.includes(n.type))return o.default.createElement(u,c(n,r))
var p=n.props||n._store&&n._store.props||{},f=e(t,p.children,r,u)
return f!==p.children?o.default.cloneElement(n,null,f):n}return n})}
var o=u(n(0)),r=n(10),i=u(n(2)),a=u(n(5)),l=u(n(6))
function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=(0,r.renderToStaticMarkup)(o.default.createElement("noscript",null,e)),a=t?i.replace("<noscript>","\x3c!--[if IE 9]>\x3c!--\x3e<noscript>\x3c!--<![endif]--\x3e").replace("</noscript>","\x3c!--[if IE 9]>\x3c!--\x3e</noscript>\x3c!--<![endif]--\x3e"):i
return n.dangerouslySetInnerHTML={__html:a},n}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.Lazy=t.LazyGroup=t.LazyChild=t.DefaultWrapper=t.checkElementsInViewport=void 0
var o=n(3)
Object.defineProperty(t,"checkElementsInViewport",{enumerable:!0,get:function(){return o.checkElementsInViewport}})
var r=u(n(4)),i=u(n(5)),a=u(n(6)),l=u(n(2))
function u(e){return e&&e.__esModule?e:{default:e}}t.DefaultWrapper=r.default,t.LazyChild=i.default,t.LazyGroup=a.default,t.Lazy=l.default},function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var r="function"==typeof Symbol&&"symbol"===o(Symbol.iterator)?function(e){return void 0===e?"undefined":o(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":o(e)}
t.bindEventsToListener=function(e,t,n,o){if(!(u.dom&&e&&e[a]&&Array.isArray(t)&&"function"==typeof n))return!1
var r=p(o)
return t.forEach(function(t){e[a](t,n,r)}),function(){t.forEach(function(t){e[l](t,n,r)})}},t.getEventListenerOptions=p,t.isEventListenerOptionSupported=f
var i=["capture","once","passive"],a="addEventListener",l="removeEventListener",u={dom:!!("object"===("undefined"==typeof window?"undefined":r(window))&&window[a]&&window[l]&&Object.defineProperty)}
if(u.dom){var c={}
i.forEach(function(e){Object.defineProperty(c,e,function(){u.optionsObject=!0,u[e]=!0})}),window[a]("null",null,c),window[l]("null",null,c)}function p(e){return u.optionsObject&&Object.keys(e).every(f)?e:!(!e||!e.capture)}function f(e){if(i.includes(e))return!0===u[e]
throw new Error("Option must be exactly one of: "+i.join(", "))}},function(e,t){e.exports=n}])})

//# sourceMappingURL=react-lazy.js.map