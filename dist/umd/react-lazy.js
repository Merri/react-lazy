!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types"),require("react-dom/server")):"function"==typeof define&&define.amd?define(["react","prop-types","react-dom/server"],t):"object"==typeof exports?exports.ReactLazy=t(require("react"),require("prop-types"),require("react-dom/server")):e.ReactLazy=t(e.React,e.PropTypes,e.ReactDOMServer)}(this,function(e,t,n){return function(e){function t(o){if(n[o])return n[o].exports
var r=n[o]={i:o,l:!1,exports:{}}
return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={}
return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e}
return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/build/",t(t.s=8)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict"
function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":u(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":u(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=n(0),s=o(p),d=n(1),h=o(d),y=n(3),b=n(7),v=function(e){function t(e){i(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.state={loadedAt:null},n.getRef=n.getRef.bind(n),n.onViewport=n.onViewport.bind(n),n}return a(t,e),f(t,[{key:"componentDidMount",value:function(){this.options={callback:this.onViewport,cushion:this.props.cushion,element:this.el},(0,y.addElement)(this.options)}},{key:"componentWillReceiveProps",value:function(e){e.cushion!==this.props.cushion&&(this.options.cushion=e.cushion)}},{key:"componentWillUnmount",value:function(){(0,y.removeElement)(this.options),delete this.options}},{key:"getRef",value:function(e){this.el=e}},{key:"onViewport",value:function(){var e=this.props,t=e.onLoad,n=e.onViewport
if(!e.visible)return!1
n&&n(),this.setState({loadedAt:Date.now()},t)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.component,o=(e.cushion,e.jsOnly),i=e.ltIE9,l=e.visible,a=(e.onLoad,e.onViewport,r(e,["children","component","cushion","jsOnly","ltIE9","visible","onLoad","onViewport"])),u=c({},a,{ref:this.getRef})
return o||l&&this.state.loadedAt?s.default.createElement(n,u,l&&this.state.loadedAt?t:null):s.default.createElement(n,(0,b.propsWithNoScriptRender)(t,i,u))}}]),t}(s.default.PureComponent)
v.defaultProps={component:"div",cushion:0,ltIE9:!1,visible:!0},v.propTypes={children:h.default.node,component:h.default.oneOfType([h.default.string,h.default.object,h.default.func]),cushion:h.default.number,jsOnly:h.default.bool,ltIE9:h.default.bool,onLoad:h.default.func,onViewport:h.default.func,visible:h.default.bool},t.default=v},function(e,t,n){"use strict"
function o(e,t){var n=e.bottom+t,o=e.left-t,r=e.right+t,i=e.top-t
return{bottom:n,left:o,right:r,top:i,height:n-i,width:r-o}}function r(e,t){return!(!(e=e&&!e.nodeType?e[0]:e)||1!==e.nodeType)&&o(e.getBoundingClientRect(),t)}function i(){return{height:Math.max(document.documentElement.clientHeight,window.innerHeight),width:Math.max(document.documentElement.clientWidth,window.innerWidth)}}function l(e,t){var n=e.cushion,o=e.element
if(null===o.offsetParent)return!1
var i=r(o,n)
return!!i&&i.bottom>=0&&i.right>=0&&i.top<t.height&&i.left<t.width}function a(e){l(e,i())&&!1!==e.callback()||(s||0!==p.length||(s=(0,f.bindEventsToListener)(window,["resize","scroll","touchend","wheel"],d,{passive:!0})),p.push(e))}function u(){s&&0===p.length&&(s(),s=!1)}function c(e){var t=p.indexOf(e)
t>=0&&p.splice(t,1),u()}Object.defineProperty(t,"__esModule",{value:!0}),t.checkElementsInViewport=void 0,t.addElement=a,t.removeElement=c
var f=n(9),p=[],s=!1,d=t.checkElementsInViewport=function(e,t){var n
return function(){var o=!n
clearTimeout(n),n=setTimeout(function(t){n=null,e.apply(this,t)}.bind(this,arguments),t),o&&e.apply(this,arguments)}}(function(){if(0!==p.length){for(var e=i(),t=p.length-1;t>=0;t--)l(p[t],e)&&!1!==p[t].callback()&&p.splice(t,1)
u()}},50)},function(e,t,n){"use strict"
function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}function i(e){var t=e.childProps,n=e.children,o=e.isFailed,i=e.isLoaded,a=r(e,["childProps","children","isFailed","isLoaded"]),c="react-lazy-wrapper"+(i||o?"":" react-lazy-wrapper--"+(t?"loading":"placeholder"))+(o?" react-lazy-wrapper--failed":"")+(i?" react-lazy-wrapper--loaded":"")+(a.className?" "+a.className:"")
return u.default.createElement("div",l({},a,{className:c}),n)}Object.defineProperty(t,"__esModule",{value:!0})
var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=n(0),u=o(a),c=n(1),f=o(c)
i.propTypes={children:f.default.node,childProps:f.default.object,className:f.default.string,isFailed:f.default.bool,isLoaded:f.default.bool},t.default=i},function(e,t,n){"use strict"
function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":u(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":u(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=n(0),s=o(p),d=n(1),h=o(d),y=function(e){function t(e){i(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),o=e.children&&(e.children.props||e.children._store&&e.children._store.props)||{},a=o.onError,u=o.onLoad,c=r(o,["onError","onLoad"])
return n.childOnError=a,n.childOnLoad=u,n.childProps=c,n.state={isFailed:!1,isLoaded:!1},n.onError=n.onError.bind(n),n.onLoad=n.onLoad.bind(n),n}return a(t,e),f(t,[{key:"componentWillReceiveProps",value:function(e){if(e.children!==this.props.children){var t=e.children&&(e.children.props||e.children._store&&e.children._store.props)||{},n=t.onError,o=t.onLoad,i=r(t,["onError","onLoad"])
this.childOnError=n,this.childOnLoad=o,this.childProps=i}}},{key:"onError",value:function(e){this.setState({isFailed:!0},this.props.callback),this.childOnError&&this.childOnError(e)}},{key:"onLoad",value:function(e){this.setState({isLoaded:!0},this.props.callback),this.childOnLoad&&this.childOnLoad(e)}},{key:"render",value:function(){var e=this.props,t=(e.callback,e.children),n=e.wrapper,o=r(e,["callback","children","wrapper"]),i=s.default.Children.only(t)
return s.default.createElement(n,c({},o,this.state,{childProps:this.childProps}),this.state.isFailed||this.state.isLoaded?i:s.default.cloneElement(i,{onError:this.onError,onLoad:this.onLoad}))}}]),t}(s.default.PureComponent)
y.propTypes={callback:h.default.func,children:h.default.node.isRequired,wrapper:h.default.oneOfType([h.default.object,h.default.func]).isRequired},t.default=y},function(e,t,n){"use strict"
function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={}
for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])
return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":u(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":u(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=n(0),s=o(p),d=n(1),h=o(d),y=n(7),b=n(4),v=o(b),m=n(2),w=o(m),O=function(e){function t(e){i(this,t)
var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.loadedImgTags=0,n.state={imgTagCount:null,loadedAt:null,viewportAt:null},n.onImgLoaded=n.onImgLoaded.bind(n),n.onViewport=n.onViewport.bind(n),n}return a(t,e),f(t,[{key:"onImgLoaded",value:function(){++this.loadedImgTags===this.state.imgTagCount&&(this.loadedImgTags=0,this.setState({imgTagCount:null,loadedAt:Date.now()},this.props.onLoad))}},{key:"onViewport",value:function(){var e=this.props,t=e.children,n=e.childrenToWrap,o=e.onLoad,r=e.onViewport
if(!e.visible)return!1
var i=(0,y.countTypesTags)(n,t)||null
this.loadedImgTags=0,r&&r()
var l=Date.now()
this.setState({imgTagCount:i,loadedAt:i?null:l,viewportAt:l},i?null:o)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.childrenToWrap,o=e.childWrapper,i=e.component,l=(e.cushion,e.jsOnly),a=e.ltIE9,u=(e.onLoad,e.onViewport,e.visible),f=r(e,["children","childrenToWrap","childWrapper","component","cushion","jsOnly","ltIE9","onLoad","onViewport","visible"]),p=c({},f,{ref:this.getRef})
return s.default.createElement(i,p,l||u&&this.state.viewportAt?(0,y.wrapTypesToLazyChild)(n,t,o,this.onImgLoaded):(0,y.wrapTypesToNoScript)(n,t,a,o))}}]),t}(w.default)
O.defaultProps=c({},w.default.defaultProps,{childrenToWrap:["iframe","img"],childWrapper:v.default}),O.propTypes=c({},w.default.propTypes,{childrenToWrap:h.default.arrayOf(w.default.propTypes.component),childWrapper:h.default.oneOfType([h.default.object,h.default.func])}),t.default=O},function(e,t,n){"use strict"
function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0
return t?(c.default.Children.forEach(t,function(t){if(t&&t.type!==s.default&&t.type!==b.default&&t.type!==h.default)if(e.includes(t.type))n++
else{var o=t.props||t._store&&t._store.props||{}
n+=r(e,o.children)}}),n):n}function i(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
return t?n.dangerouslySetInnerHTML={__html:(0,f.renderToStaticMarkup)(c.default.createElement("noscript",null,e)).replace("<noscript>","\x3c!--[if IE 9]>\x3c!--\x3e<noscript>\x3c!--<![endif]--\x3e").replace("</noscript>","\x3c!--[if IE 9]>\x3c!--\x3e</noscript>\x3c!--<![endif]--\x3e")}:n.children=c.default.createElement("noscript",null,e),n}function l(e,t,n,o){return t?c.default.Children.map(t,function(t){if(t&&t.type!==s.default&&t.type!==b.default&&t.type!==h.default){if(e.includes(t.type))return c.default.createElement(h.default,{callback:o,wrapper:n},t)
var r=t.props||t._store&&t._store.props||{},i=l(e,r.children,n,o)
return i!==r.children?c.default.cloneElement(t,null,i):t}return t}):t}function a(e,t,n,o){return t?c.default.Children.map(t,function(t){if(t&&t.type!==s.default&&t.type!==b.default&&t.type!==h.default){if(e.includes(t.type))return c.default.createElement(o,i(t,n))
var r=t.props||t._store&&t._store.props||{},l=a(e,r.children,n,o)
return l!==r.children?c.default.cloneElement(t,null,l):t}return t}):t}Object.defineProperty(t,"__esModule",{value:!0}),t.countTypesTags=r,t.propsWithNoScriptRender=i,t.wrapTypesToLazyChild=l,t.wrapTypesToNoScript=a
var u=n(0),c=o(u),f=n(10),p=n(2),s=o(p),d=n(5),h=o(d),y=n(6),b=o(y)},function(e,t,n){"use strict"
function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Lazy=t.LazyGroup=t.LazyChild=t.DefaultWrapper=t.checkElementsInViewport=void 0
var r=n(3)
Object.defineProperty(t,"checkElementsInViewport",{enumerable:!0,get:function(){return r.checkElementsInViewport}})
var i=n(4),l=o(i),a=n(5),u=o(a),c=n(6),f=o(c),p=n(2),s=o(p)
t.DefaultWrapper=l.default,t.LazyChild=u.default,t.LazyGroup=f.default,t.Lazy=s.default},function(e,t,n){"use strict"
function o(e,t,n,o){if(!(p.dom&&e&&e[c]&&Array.isArray(t)&&"function"==typeof n))return!1
var i=r(o)
return t.forEach(function(t){e[c](t,n,i)}),function(){t.forEach(function(t){e[f](t,n,i)})}}function r(e){return p.optionsObject&&Object.keys(e).every(i)?e:!(!e||!e.capture)}function i(e){if(u.includes(e))return!0===p[e]
throw new Error("Option must be exactly one of: "+u.join(", "))}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var a="function"==typeof Symbol&&"symbol"===l(Symbol.iterator)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":l(e)}
t.bindEventsToListener=o,t.getEventListenerOptions=r,t.isEventListenerOptionSupported=i
var u=["capture","once","passive"],c="addEventListener",f="removeEventListener",p={dom:!!("object"===("undefined"==typeof window?"undefined":a(window))&&window[c]&&window[f]&&Object.defineProperty)}
if(p.dom){var s={}
u.forEach(function(e){Object.defineProperty(s,e,function(){p.optionsObject=!0,p[e]=!0})}),window[c]("null",null,s),window[f]("null",null,s)}},function(e,t){e.exports=n}])})

//# sourceMappingURL=react-lazy.js.map