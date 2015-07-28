'use strict'
var React = require('react')
var verge = require('verge')

var elements = [],
    isBind = false

function throttle(func, wait) {
    var timeout

    return function() {
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null
            }, wait)

            func.apply(this, arguments)
        }
    }
}

var checkElementsInViewport = throttle(function() {
    for (var i = elements.length; i > 0; --i) {
        if (verge.inViewport(elements[i].element, elements[i].cushion)) {
            elements[i].callback()
            elements.splice(i, 1)
            checkUnbind()
        }
    }
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
    var index = elements.indexOf(options)

    if (index >= 0) {
        elements.splice(index, 1)
    }

    checkUnbind()
}

var Lazy = React.createClass({
    displayName: 'Lazy',

    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        cushion: React.PropTypes.number,
        nodeName: React.PropTypes.oneOf([
            'a',
            'abbr',
            'address',
            'article',
            'aside',
            'b',
            'bdi',
            'bdo',
            'big',
            'blockquote',
            'body',
            'button',
            'caption',
            'cite',
            'code',
            'data',
            'dd',
            'del',
            'dfn',
            'dialog',
            'div',
            'dt',
            'em',
            'fieldset',
            'figcaption',
            'footer',
            'form',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'header',
            'i',
            'ins',
            'kbd',
            'label',
            'legend',
            'li',
            'main',
            'mark',
            'menuitem',
            'nav',
            'ol',
            'output',
            'p',
            'pre',
            'q',
            's',
            'samp',
            'section',
            'small',
            'span',
            'strong',
            'summary',
            'td',
            'th',
            'time',
            'u',
            'ul',
            'var'
        ]),
        onLoad: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            cushion: 0,
            nodeName: 'div'
        }
    },

    getInitialState: function() {
        return {}
    },

    componentDidMount: function() {
        this.options = {
            callback: this.handleLoad,
            cushion: this.props.cushion,
            element: React.findDOMNode(this)
        }
        addElement(this.options)
    },

    componentWillUnmount: function() {
        removeElement(this.options)
    },

    handleLoad: function() {
        if (this.props.onLoad) {
            this.props.onLoad()
        }
        this.setState({ loadedAt: Date.now() })
    },

    render: function() {
        var props = {}

        for (var key in this.props) {
            if (this.props.hasOwnProperty(key) && !Lazy.propTypes.hasOwnProperty(key)) {
                props[key] = this.props[key]
            }
        }

        if (this.state.loadedAt) {
            return React.createElement(this.props.nodeName, props, this.props.children)
        }

        props.dangerouslySetInnerHTML = {
            __html: React.renderToStaticMarkup(
                React.DOM.noscript({}, this.props.children)
            ).replace(
                '<noscript>',
                '<!--[if IE 9]><!--><noscript><!--<![endif]-->'
            ).replace(
                '</noscript>',
                '<!--[if IE 9]><!--></noscript><!--<![endif]-->'
            )
        }

        return React.createElement(this.props.nodeName, props)
    }
})

module.exports = {
    Lazy: Lazy,
    verge: verge
}
