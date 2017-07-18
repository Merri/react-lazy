import React from 'react'
import { findDOMNode } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import PropTypes from 'prop-types'
import verge from 'verge'

const elements = []
let isBind = false

function debounce(func, wait) {
    var timeout

    return function() {
        var call = !timeout
        clearTimeout(timeout)
        timeout = setTimeout(function(args) {
            timeout = null
            func.apply(this, args)
        }.bind(this, arguments), wait)
        if (call) {
            func.apply(this, arguments)
        }
    }
}

function inViewport({ cushion, element }) {
    return element.offsetParent !== null && verge.inViewport(element, cushion)
}

export const checkElementsInViewport = debounce(function checkElementsInViewport() {
    for (let i = elements.length - 1; i >= 0; i--) {
        if (inViewport(elements[i])) {
            elements[i].callback()
            elements.splice(i, 1)
        }
    }
    checkUnbind()
}, 50)

function checkUnbind() {
    if (isBind && elements.length === 0 && window.removeEventListener) {
        window.removeEventListener('resize', checkElementsInViewport, false)
        window.removeEventListener('scroll', checkElementsInViewport, false)
        window.removeEventListener('touchend', checkElementsInViewport, false)
        isBind = false
    }
}

function addElement(options) {
    if (inViewport(options)) {
        options.callback()
        return
    }

    if (!isBind && elements.length === 0 && window.addEventListener) {
        window.addEventListener('resize', checkElementsInViewport, false)
        window.addEventListener('scroll', checkElementsInViewport, false)
        window.addEventListener('touchend', checkElementsInViewport, false)
        isBind = true
    }

    elements.push(options)
}

function removeElement(options) {
    const index = elements.indexOf(options)

    if (index >= 0) {
        elements.splice(index, 1)
    }

    checkUnbind()
}

function propsWithNoScriptRender(children, ltIE9, props = {}) {
    if (!ltIE9) {
        props.dangerouslySetInnerHTML = {
            __html: (
                renderToStaticMarkup(React.createElement('noscript', null, children))
            )
        }
    } else {
        props.dangerouslySetInnerHTML = {
            __html: (
                renderToStaticMarkup(React.createElement('noscript', null, children))
                .replace('<noscript>', '<!--[if IE 9]><!--><noscript><!--<![endif]-->')
                .replace('</noscript>', '<!--[if IE 9]><!--></noscript><!--<![endif]-->')
            )
        }
    }

    return props
}

function wrapImgToNoScript(children, ltIE9, wrapper) {
    if (!children) {
        return children
    }
    return React.Children.map(children, child => {
        if (!child) {
            return child
        } else if (child.type === 'img') {
            return React.createElement(wrapper, propsWithNoScriptRender(child, ltIE9))
        } else if (child.type !== Lazy) {
            const props = child.props || (child._store && child._store.props) || {}
            const children = wrapImgToNoScript(props.children, ltIE9, wrapper)

            if (children !== props.children) {
                return React.cloneElement(child, null, children)
            }
        }

        return child
    })
}

export class Lazy extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { loadedAt: null }

        this.handleLoad = this.handleLoad.bind(this)
    }

    componentDidMount() {
        this.options = {
            callback: this.handleLoad,
            cushion: this.props.cushion,
            element: findDOMNode(this),
        }
        addElement(this.options)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cushion !== this.props.cushion) {
            this.options.cushion = nextProps.cushion
        }
    }

    componentWillUnmount() {
        removeElement(this.options)
        delete this.options
    }

    handleLoad() {
        if (this.props.onLoad) {
            this.props.onLoad()
        }
        this.setState({ loadedAt: Date.now() })
    }

    render() {
        const { children, component, imgWrapperComponent, ltIE9, ...props } = this.props
        delete props.cushion
        delete props.onLoad

        if (this.state.loadedAt) {
            return React.createElement(component, props, children)
        }

        if (imgWrapperComponent) {
            // wrap only img elements to noscript and the given wrapper component
            return React.createElement(component, props, wrapImgToNoScript(children, ltIE9, imgWrapperComponent))
        } else {
            // wrap all contents inside noscript
            return React.createElement(component, propsWithNoScriptRender(children, ltIE9, props))
        }
    }
}

Lazy.defaultProps = {
    component: 'div',
    cushion: 0,
    ltIE9: false,
}

Lazy.propTypes = {
    children: PropTypes.node,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
    ]),
    cushion: PropTypes.number,
    imgWrapperComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
    ]),
    ltIE9: PropTypes.bool,
    onLoad: PropTypes.func,
}
