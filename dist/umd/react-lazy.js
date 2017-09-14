!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types"),require("react-dom/server"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","prop-types","react-dom/server","react-dom"],t):"object"==typeof exports?exports.ReactLazy=t(require("react"),require("prop-types"),require("react-dom/server"),require("react-dom")):e.ReactLazy=t(e.React,e.PropTypes,e.ReactDOMServer,e.ReactDOM)}(this,function(e,t,n,r){return function(e){function t(r){if(n[r])return n[r].exports
var o=n[r]={i:r,l:!1,exports:{}}
return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={}
return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e}
return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/build/",t(t.s=8)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={}
for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])
return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":u(t))&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":u(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),p=r(d),s=n(10),f=n(1),h=r(f),y=n(3),b=n(7),v=function(e){function t(e){i(this,t)
var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.state={loadedAt:null},n.onViewport=n.onViewport.bind(n),n}return l(t,e),c(t,[{key:"componentDidMount",value:function(){this.options={callback:this.onViewport,cushion:this.props.cushion,element:(0,s.findDOMNode)(this)},(0,y.addElement)(this.options)}},{key:"componentWillReceiveProps",value:function(e){e.cushion!==this.props.cushion&&(this.options.cushion=e.cushion)}},{key:"componentWillUnmount",value:function(){(0,y.removeElement)(this.options),delete this.options}},{key:"onViewport",value:function(){var e=this.props,t=e.onLoad,n=e.onViewport
if(!e.visible)return!1
n&&n(),this.setState({loadedAt:Date.now()},t)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.component,r=(e.cushion,e.ltIE9),i=e.visible,a=(e.onLoad,e.onViewport,o(e,["children","component","cushion","ltIE9","visible","onLoad","onViewport"]))
return i&&this.state.loadedAt?p.default.createElement(n,a,t):p.default.createElement(n,(0,b.propsWithNoScriptRender)(t,r,a))}}]),t}(p.default.PureComponent)
v.defaultProps={component:"div",cushion:0,ltIE9:!1,visible:!0},v.propTypes={children:h.default.node,component:h.default.oneOfType([h.default.string,h.default.object,h.default.func]),cushion:h.default.number,ltIE9:h.default.bool,onLoad:h.default.func,onViewport:h.default.func,visible:h.default.bool},t.default=v},function(e,t,n){"use strict"
function r(e,t){var n=e.bottom+t,r=e.left-t,o=e.right+t,i=e.top-t
return{bottom:n,left:r,right:o,top:i,height:n-i,width:o-r}}function o(e,t){return!(!(e=e&&!e.nodeType?e[0]:e)||1!==e.nodeType)&&r(e.getBoundingClientRect(),t)}function i(){return{height:Math.max(document.documentElement.clientHeight,window.innerHeight),width:Math.max(document.documentElement.clientWidth,window.innerWidth)}}function a(e,t){var n=e.cushion,r=e.element
if(null===r.offsetParent)return!1
var i=o(r,n)
return!!i&&i.bottom>=0&&i.right>=0&&i.top<t.height&&i.left<t.width}function l(e){a(e,i())&&!1!==e.callback()||(!p&&0===d.length&&window.addEventListener&&(window.addEventListener("resize",s,!1),window.addEventListener("scroll",s,!1),window.addEventListener("touchend",s,!1),p=!0),d.push(e))}function u(){p&&0===d.length&&window.removeEventListener&&(window.removeEventListener("resize",s,!1),window.removeEventListener("scroll",s,!1),window.removeEventListener("touchend",s,!1),p=!1)}function c(e){var t=d.indexOf(e)
t>=0&&d.splice(t,1),u()}Object.defineProperty(t,"__esModule",{value:!0}),t.addElement=l,t.removeElement=c
var d=[],p=!1,s=t.checkElementsInViewport=function(e,t){var n
return function(){var r=!n
clearTimeout(n),n=setTimeout(function(t){n=null,e.apply(this,t)}.bind(this,arguments),t),r&&e.apply(this,arguments)}}(function(){if(0!==d.length){for(var e=i(),t=d.length-1;t>=0;t--)a(d[t],e)&&!1!==d[t].callback()&&d.splice(t,1)
u()}},50)},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={}
for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])
return n}function i(e){var t=e.childProps,n=e.children,r=e.isFailed,i=e.isLoaded,l=o(e,["childProps","children","isFailed","isLoaded"]),c="react-lazy-wrapper"+(i||r?"":" react-lazy-wrapper--"+(t?"loading":"placeholder"))+(r?" react-lazy-wrapper--failed":"")+(i?" react-lazy-wrapper--loaded":"")+(l.className?" "+l.className:"")
return u.default.createElement("div",a({},l,{className:c}),n)}Object.defineProperty(t,"__esModule",{value:!0})
var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=n(0),u=r(l),c=n(1),d=r(c)
i.propTypes={children:d.default.node,childProps:d.default.object,className:d.default.string,isFailed:d.default.bool,isLoaded:d.default.bool},t.default=i},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={}
for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])
return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":u(t))&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":u(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=n(0),s=r(p),f=n(1),h=r(f),y=function(e){function t(e){i(this,t)
var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=e.children&&(e.children.props||e.children._store&&e.children._store.props)||{},l=r.onError,u=r.onLoad,c=o(r,["onError","onLoad"])
return n.childOnError=l,n.childOnLoad=u,n.childProps=c,n.state={isFailed:!1,isLoaded:!1},n.onError=n.onError.bind(n),n.onLoad=n.onLoad.bind(n),n}return l(t,e),d(t,[{key:"componentWillReceiveProps",value:function(e){if(e.children!==this.props.children){var t=e.children&&(e.children.props||e.children._store&&e.children._store.props)||{},n=t.onError,r=t.onLoad,i=o(t,["onError","onLoad"])
this.childOnError=n,this.childOnLoad=r,this.childProps=i}}},{key:"onError",value:function(e){this.setState({isFailed:!0},this.props.callback),this.childOnError&&this.childOnError(e)}},{key:"onLoad",value:function(e){this.setState({isLoaded:!0},this.props.callback),this.childOnLoad&&this.childOnLoad(e)}},{key:"render",value:function(){var e=this.props,t=(e.callback,e.children),n=e.wrapper,r=o(e,["callback","children","wrapper"]),i=s.default.Children.only(t)
return s.default.createElement(n,c({},r,this.state,{childProps:this.childProps}),this.state.isFailed||this.state.isLoaded?i:s.default.cloneElement(i,{onError:this.onError,onLoad:this.onLoad}))}}]),t}(s.default.PureComponent)
y.propTypes={callback:h.default.func,children:h.default.node.isRequired,wrapper:h.default.oneOfType([h.default.object,h.default.func]).isRequired},t.default=y},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={}
for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])
return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":u(t))&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":u(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=n(0),s=r(p),f=n(1),h=r(f),y=n(7),b=n(4),v=r(b),m=n(2),w=r(m),O=function(e){function t(e){i(this,t)
var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.loadedImgTags=0,n.state={imgTagCount:null,loadedAt:null,viewportAt:null},n.onImgLoaded=n.onImgLoaded.bind(n),n.onViewport=n.onViewport.bind(n),n}return l(t,e),d(t,[{key:"onImgLoaded",value:function(){++this.loadedImgTags===this.state.imgTagCount&&(this.loadedImgTags=0,this.setState({imgTagCount:null,loadedAt:Date.now()},this.props.onLoad))}},{key:"onViewport",value:function(){var e=this.props,t=e.children,n=e.childrenToWrap,r=e.onLoad,o=e.onViewport
if(!e.visible)return!1
var i=(0,y.countTypesTags)(n,t)||null
this.loadedImgTags=0,o&&o()
var a=Date.now()
this.setState({imgTagCount:i,loadedAt:i?null:a,viewportAt:a},i?null:r)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.childrenToWrap,r=e.childWrapper,i=e.component,a=(e.cushion,e.ltIE9),l=(e.onLoad,e.onViewport,e.visible),u=o(e,["children","childrenToWrap","childWrapper","component","cushion","ltIE9","onLoad","onViewport","visible"])
return s.default.createElement(i,u,l&&this.state.viewportAt?(0,y.wrapTypesToLazyChild)(n,t,r,this.onImgLoaded):(0,y.wrapTypesToNoScript)(n,t,a,r))}}]),t}(w.default)
O.defaultProps=c({},w.default.defaultProps,{childrenToWrap:["iframe","img"],childWrapper:v.default}),O.propTypes=c({},w.default.propTypes,{childrenToWrap:h.default.arrayOf(w.default.propTypes.component),childWrapper:h.default.oneOfType([h.default.object,h.default.func])}),t.default=O},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0
return t?(c.default.Children.forEach(t,function(t){if(t&&t.type!==s.default&&t.type!==b.default&&t.type!==h.default)if(e.includes(t.type))n++
else{var r=t.props||t._store&&t._store.props||{}
n+=o(e,r.children)}}),n):n}function i(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
return n.dangerouslySetInnerHTML=t?{__html:(0,d.renderToStaticMarkup)(c.default.createElement("noscript",null,e)).replace("<noscript>","\x3c!--[if IE 9]>\x3c!--\x3e<noscript>\x3c!--<![endif]--\x3e").replace("</noscript>","\x3c!--[if IE 9]>\x3c!--\x3e</noscript>\x3c!--<![endif]--\x3e")}:{__html:(0,d.renderToStaticMarkup)(c.default.createElement("noscript",null,e))},n}function a(e,t,n,r){return t?c.default.Children.map(t,function(t){if(t&&t.type!==s.default&&t.type!==b.default&&t.type!==h.default){if(e.includes(t.type))return c.default.createElement(h.default,{callback:r,children:t,wrapper:n})
var o=t.props||t._store&&t._store.props||{},i=a(e,o.children,n,r)
return i!==o.children?c.default.cloneElement(t,null,i):t}return t}):t}function l(e,t,n,r){return t?c.default.Children.map(t,function(t){if(t&&t.type!==s.default&&t.type!==b.default&&t.type!==h.default){if(e.includes(t.type))return c.default.createElement(r,i(t,n))
var o=t.props||t._store&&t._store.props||{},a=l(e,o.children,n,r)
return a!==o.children?c.default.cloneElement(t,null,a):t}return t}):t}Object.defineProperty(t,"__esModule",{value:!0}),t.countTypesTags=o,t.propsWithNoScriptRender=i,t.wrapTypesToLazyChild=a,t.wrapTypesToNoScript=l
var u=n(0),c=r(u),d=n(9),p=n(2),s=r(p),f=n(5),h=r(f),y=n(6),b=r(y)},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Lazy=t.LazyGroup=t.LazyChild=t.DefaultWrapper=t.checkElementsInViewport=void 0
var o=n(3)
Object.defineProperty(t,"checkElementsInViewport",{enumerable:!0,get:function(){return o.checkElementsInViewport}})
var i=n(4),a=r(i),l=n(5),u=r(l),c=n(6),d=r(c),p=n(2),s=r(p)
t.DefaultWrapper=a.default,t.LazyChild=u.default,t.LazyGroup=d.default,t.Lazy=s.default},function(e,t){e.exports=n},function(e,t){e.exports=r}])})

//# sourceMappingURL=react-lazy.js.map