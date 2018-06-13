!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types"),require("react-dom/server"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","prop-types","react-dom/server","react-dom"],t):"object"==typeof exports?exports.ReactLazy=t(require("react"),require("prop-types"),require("react-dom/server"),require("react-dom")):e.ReactLazy=t(e.React,e.PropTypes,e.ReactDOMServer,e.ReactDOM)}(window,function(e,t,r,n){return function(e){var t={}
function r(n){if(t[n])return t[n].exports
var o=t[n]={i:n,l:!1,exports:{}}
return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/build/",r(r.s=7)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.isDOMTypeElement=function(e){return i.default.isValidElement(e)&&"string"==typeof e.type},t.parseRootMargin=function(e){var t=(e?e.trim():"0px").split(/\s+/).map(function(e){if(!a.test(e))throw new Error("rootMargin must be a string literal containing pixels and/or percent values")
return e}),r=t[0],n=void 0===r?"0px":r,o=t[1],i=void 0===o?n:o,l=t[2],u=void 0===l?n:l,s=t[3],c=void 0===s?i:s
return n+" "+i+" "+u+" "+c},t.shallowCompare=function e(t,r){if(Array.isArray(t)&&Array.isArray(r)&&t.length===r.length)return t.some(function(n,o){return e(t[o],r[o])})
return t!==r}
var n,o=r(0),i=(n=o)&&n.__esModule?n:{default:n}
var a=/^-?\d*\.?\d+(px|%)$/},function(e,t,r){"use strict"
var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=s(r(0)),a=(s(r(1)),r(4)),l=s(r(15)),u=s(r(6))
function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":n(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return r.loadedImgTags=0,r.state={imgTagCount:null,loadedAt:null,viewportAt:null},r.onImgLoaded=r.onImgLoaded.bind(r),r.onViewport=r.onViewport.bind(r),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":n(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.PureComponent),o(t,[{key:"onImgLoaded",value:function(){this.loadedImgTags++,this.loadedImgTags===this.state.imgTagCount&&(this.loadedImgTags=0,this.setState({imgTagCount:null,loadedAt:Date.now()},this.props.onLoad))}},{key:"onViewport",value:function(e,t){var r=this.props,n=r.children,o=r.childrenToWrap,i=r.onLoad,l=r.onViewport
if(!r.visible)return!1
if(e.isIntersecting&&!e.defaultPrevented){t()
var u=(0,a.countTypesTags)(o,n)||null
this.loadedImgTags=0,l&&l(e)
var s=Date.now()
this.setState({imgTagCount:u,loadedAt:u?null:s,viewportAt:s},u?null:i)}}},{key:"render",value:function(){var e=this.props,t=e.children,r=e.childrenToWrap,n=e.childWrapper,o=e.clientOnly,l=e.component,s=e.cushion,c=e.ltIE9,p=(e.onLoad,e.onViewport,e.threshold),f=e.viewport,d=e.visible,h=function(e,t){var r={}
for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])
return r}(e,["children","childrenToWrap","childWrapper","clientOnly","component","cushion","ltIE9","onLoad","onViewport","threshold","viewport","visible"])
return i.default.createElement(u.default,{onChange:this.onViewport,root:f,rootMargin:s,threshold:p},i.default.createElement(l,h,o||d&&this.state.viewportAt?(0,a.wrapTypesToLazyChild)(r,t,n,this.onImgLoaded):(0,a.wrapTypesToNoScript)(r,t,c,n)))}}]),t}()
t.default=c,c.defaultProps={childrenToWrap:["iframe","img"],childWrapper:l.default,clientOnly:!1,component:"div",ltIE9:!1,visible:!0}},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.countTypesTags=function e(t,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0
if(!r)return o
n.default.Children.forEach(r,function(r){if(r&&r.type!==i.default&&r.type!==l.default&&r.type!==a.default)if(t.includes(r.type))o++
else{var n=r.props||r._store&&r._store.props||{}
o+=e(t,n.children)}})
return o},t.propsWithNoScriptRender=s,t.wrapTypesToLazyChild=function e(t,r,o,u){if(!r)return r
return n.default.Children.map(r,function(r){if(r&&r.type!==i.default&&r.type!==l.default&&r.type!==a.default){if(t.includes(r.type))return n.default.createElement(a.default,{callback:u,wrapper:o},r)
var s=r.props||r._store&&r._store.props||{},c=e(t,s.children,o,u)
return c!==s.children?n.default.cloneElement(r,null,c):r}return r})},t.wrapTypesToNoScript=function e(t,r,o,u){if(!r)return r
return n.default.Children.map(r,function(r){if(r&&r.type!==i.default&&r.type!==l.default&&r.type!==a.default){if(t.includes(r.type))return n.default.createElement(u,s(r,o))
var c=r.props||r._store&&r._store.props||{},p=e(t,c.children,o,u)
return p!==c.children?n.default.cloneElement(r,null,p):r}return r})}
var n=u(r(0)),o=r(8),i=u(r(5)),a=u(r(14)),l=u(r(3))
function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=(0,o.renderToStaticMarkup)(n.default.createElement("noscript",null,e)),a=t?i.replace("<noscript>","\x3c!--[if IE 9]>\x3c!--\x3e<noscript>\x3c!--<![endif]--\x3e").replace("</noscript>","\x3c!--[if IE 9]>\x3c!--\x3e</noscript>\x3c!--<![endif]--\x3e"):i
return r.dangerouslySetInnerHTML={__html:a},r}},function(e,t,r){"use strict"
var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=u(r(0)),a=(u(r(1)),u(r(6))),l=r(4)
function u(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":n(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return r.state={show:!1},r.onViewport=r.onViewport.bind(r),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":n(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.PureComponent),o(t,[{key:"onViewport",value:function(e,t){var r=this.props,n=r.onLoad,o=r.onViewport
r.visible&&e.isIntersecting&&!e.defaultPrevented&&(t(),o&&o(e),this.setState({show:!0},n))}},{key:"render",value:function(){var e=this.props,t=e.children,r=e.clientOnly,n=e.component,o=e.cushion,u=e.ltIE9,s=e.visible,c=(e.onLoad,e.onViewport,e.threshold),p=e.viewport,f=function(e,t){var r={}
for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])
return r}(e,["children","clientOnly","component","cushion","ltIE9","visible","onLoad","onViewport","threshold","viewport"])
return r||s&&this.state.show?i.default.createElement(a.default,{onChange:this.onViewport,root:p,rootMargin:o,threshold:c},i.default.createElement(n,f,s&&this.state.show?t:null)):i.default.createElement(a.default,{onChange:this.onViewport,root:p,rootMargin:o,threshold:c},i.default.createElement(n,(0,l.propsWithNoScriptRender)(t,u,f)))}}]),t}()
t.default=s,s.defaultProps={clientOnly:!1,component:"div",ltIE9:!1,visible:!0}},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n=r(9)
Object.defineProperty(t,"default",{enumerable:!0,get:function(){return(e=n,e&&e.__esModule?e:{default:e}).default
var e}})
var o=r(2)
Object.defineProperty(t,"parseRootMargin",{enumerable:!0,get:function(){return o.parseRootMargin}})},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.Lazy=t.LazyGroup=void 0
var n=i(r(3)),o=i(r(5))
function i(e){return e&&e.__esModule?e:{default:e}}t.LazyGroup=n.default,t.Lazy=o.default},function(e,t){e.exports=r},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=u(r(0)),i=r(10),a=(u(r(1)),u(r(11)),u(r(12)),r(13)),l=r(2)
function u(e){return e&&e.__esModule?e:{default:e}}var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()
function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":n(t))&&"function"!=typeof t?e:t}var p=["root","rootMargin","threshold"],f=["disabled"].concat(p),d=Object.prototype,h=function(e){function t(){var r,n
!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
for(var o=arguments.length,u=Array(o),s=0;s<o;s++)u[s]=arguments[s]
return r=n=c(this,e.call.apply(e,[this].concat(u))),n.handleChange=function(e){n.props.onChange(e,n.unobserve),n.props.onlyOnce&&e.isIntersecting&&n.unobserve()},n.handleNode=function(e){"function"==typeof n.props.children.ref&&n.props.children.ref(e),n.targetChanged=null!=(n.renderedTarget&&e)&&n.renderedTarget!==e,n.targetChanged&&n.unobserve(),n.target=e},n.observe=function(){n.target=(0,l.isDOMTypeElement)(n.target)?n.target:(0,i.findDOMNode)(n.target),n.observer=(0,a.createObserver)(n.options),(0,a.observeElement)(n)},n.unobserve=function(){null!=n.target&&(0,a.unobserveElement)(n)},c(n,r)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":n(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.componentDidMount=function(){this.props.disabled||this.observe()},t.prototype.componentDidUpdate=function(e){var t=this,r=f.some(function(r){return(0,l.shallowCompare)(t.props[r],e[r])})
r&&this.unobserve(),(this.targetChanged||r)&&(this.props.disabled||this.observe())},t.prototype.componentWillUnmount=function(){this.unobserve()},t.prototype.render=function(){return this.renderedTarget=this.target,o.default.cloneElement(o.default.Children.only(this.props.children),{ref:this.handleNode})},s(t,[{key:"options",get:function(){var e=this
return p.reduce(function(t,r){if(d.hasOwnProperty.call(e.props,r)){var n="root"===r&&"[object String]"===d.toString.call(e.props[r])
t[r]=n?document.querySelector(e.props[r]):e.props[r]}return t},{})}}]),t}(o.default.Component)
h.displayName="IntersectionObserver",t.default=h},function(e,t){e.exports=n},function(e,t,r){"use strict"
e.exports=function(e,t,r,n,o,i,a,l){if(!e){var u
if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var s=[r,n,o,i,a,l],c=0;(u=new Error(t.replace(/%s/g,function(){return s[c++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}}},function(e,t,r){"use strict"
e.exports=function(){}},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.observerElementsMap=void 0,t.getPooled=i,t.findObserverElement=a,t.callback=l,t.createObserver=function(e){return i(e)||new IntersectionObserver(l,e)},t.observeElement=function(e){o.has(e.observer)||o.set(e.observer,new Set)
o.get(e.observer).add(e),e.observer.observe(e.target)},t.unobserveElement=function(e){if(o.has(e.observer)){var t=o.get(e.observer)
t.delete(e)&&(t.size>0?e.observer.unobserve(e.target):(e.observer.disconnect(),o.delete(e.observer)))}}
var n=r(2),o=t.observerElementsMap=new Map
function i(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.root||null,r=(0,n.parseRootMargin)(e.rootMargin),i=Array.isArray(e.threshold)?e.threshold:[null!=e.threshold?e.threshold:0],a=o.keys(),l=void 0;l=a.next().value;){if(!(t!==l.root||r!==l.rootMargin||(0,n.shallowCompare)(i,l.thresholds)))return l}return null}function a(e,t){var r=o.get(e)
if(r)for(var n=r.values(),i=void 0;i=n.next().value;)if(i.target===t.target)return i
return null}function l(e,t){for(var r=0;r<e.length;r++){var n=a(t,e[r])
n&&n.handleChange(e[r])}}},function(e,t,r){"use strict"
var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
Object.defineProperty(t,"__esModule",{value:!0})
var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=l(r(0))
l(r(1))
function l(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var r={}
for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])
return r}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!==(void 0===t?"undefined":n(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),o=e.children&&(e.children.props||e.children._store&&e.children._store.props)||{},i=o.onError,a=o.onLoad,l=u(o,["onError","onLoad"])
return r.childOnError=i,r.childOnLoad=a,r.childProps=l,r.state={isFailed:!1,isLoaded:!1},r.onError=r.onError.bind(r),r.onLoad=r.onLoad.bind(r),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":n(t)))
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.PureComponent),i(t,[{key:"componentDidUpdate",value:function(e){if(e.children!==this.props.children){var t=this.props.children&&(this.props.children.props||this.props.children._store&&this.props.children._store.props)||{},r=t.onError,n=t.onLoad,o=u(t,["onError","onLoad"])
this.childOnError=r,this.childOnLoad=n,this.childProps=o}}},{key:"onError",value:function(e){this.setState({isFailed:!0},this.props.callback),this.childOnError&&this.childOnError(e)}},{key:"onLoad",value:function(e){this.setState({isLoaded:!0},this.props.callback),this.childOnLoad&&this.childOnLoad(e)}},{key:"render",value:function(){var e=this.props,t=(e.callback,e.children),r=e.wrapper,n=u(e,["callback","children","wrapper"]),i=a.default.Children.only(t)
return a.default.createElement(r,o({},n,this.state,{childProps:this.childProps}),this.state.isFailed||this.state.isLoaded?i:a.default.cloneElement(i,{onError:this.onError,onLoad:this.onLoad}))}}]),t}()
t.default=s},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=i(r(0))
i(r(1))
function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.childProps,r=e.children,i=e.isFailed,a=e.isLoaded,l=function(e,t){var r={}
for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])
return r}(e,["childProps","children","isFailed","isLoaded"]),u="react-lazy-wrapper"+(a||i?"":" react-lazy-wrapper--"+(t?"loading":"placeholder"))+(i?" react-lazy-wrapper--failed":"")+(a?" react-lazy-wrapper--loaded":"")+(l.className?" "+l.className:"")
return o.default.createElement("div",n({},l,{className:u}),r)}}])})

//# sourceMappingURL=react-lazy.js.map