import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
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

export const checkElementsInViewport = debounce(function checkElementsInViewport() {
    for (let i = elements.length - 1; i >= 0; i--) {
        if (verge.inViewport(elements[i].element, elements[i].cushion)) {
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
    if (verge.inViewport(options.element, options.cushion)) {
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

function propsWithNoScriptRender(children, props = {}) {
    props.dangerouslySetInnerHTML = {
        __html: (
            ReactDOMServer.renderToStaticMarkup(React.DOM.noscript(null, children))
            .replace('<noscript>', '<!--[if IE 9]><!--><noscript><!--<![endif]-->')
            .replace('</noscript>', '<!--[if IE 9]><!--></noscript><!--<![endif]-->')
        )
    }
    return props
}

function wrapImgToNoScript(children, wrapper) {
    if (!children) {
        return children
    }
    return React.Children.map(children, child => {
        if (!child) {
            return child
        } else if (child.type === 'img') {
            return React.createElement(wrapper, propsWithNoScriptRender(child))
        } else if (child.type !== Lazy) {
            const props = child.props || (child._store && child._store.props) || {}
            const children = wrapImgToNoScript(props.children, wrapper)

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
            element: ReactDOM.findDOMNode(this),
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
        const { children, component, imgWrapperComponent, ...props } = this.props
        delete props.cushion
        delete props.onLoad

        if (this.state.loadedAt) {
            return React.createElement(component, props, children)
        }

        if (imgWrapperComponent) {
            // wrap only img elements to noscript and the given wrapper component
            return React.createElement(component, props, wrapImgToNoScript(children, imgWrapperComponent))
        } else {
            // wrap all contents inside noscript
            return React.createElement(component, propsWithNoScriptRender(children, props))
        }
    }
}

Lazy.defaultProps = {
    component: 'div',
    cushion: 0,
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
    onLoad: PropTypes.func,
}

export default { checkElementsInViewport, Lazy }
