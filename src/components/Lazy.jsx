import React from 'react'
import { findDOMNode } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import PropTypes from 'prop-types'

import { addElement, removeElement } from '../lib/viewport'

import LazyImg from './LazyImg'

function countImgTags(children, count = 0) {
    if (!children) {
        return count
    }

    React.Children.forEach(children, child => {
        if (!child) {
            return
        } else if (child.type === 'img') {
            count++
        } else if (child.type !== Lazy && child.type !== LazyImg) {
            const props = child.props || (child._store && child._store.props) || {}
            count += countImgtags(props.children)
        }
    })

    return count
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

function wrapImgToLazyImg(children, wrapper, placeholder, fallback, callback) {
    if (!children) {
        return children
    }

    return React.Children.map(children, child => {
        if (!child) {
            return child
        } else if (child.type === 'img') {
            return (
                <LazyImg
                    callback={callback}
                    children={child}
                    fallback={fallback}
                    placeholder={placeholder}
                    wrapper={wrapper}
                />
            )
        } else if (child.type !== Lazy && child.type !== LazyImg) {
            const props = child.props || (child._store && child._store.props) || {}
            const children = wrapImgToLazyImg(props.children, wrapper, placeholder, fallback, callback)

            if (children !== props.children) {
                return React.cloneElement(child, null, children)
            }
        }

        return child
    })
}

function wrapImgToNoScript(children, ltIE9, placeholder) {
    if (!children) {
        return children
    }

    return React.Children.map(children, child => {
        if (!child) {
            return child
        } else if (child.type === 'img') {
            return React.createElement(placeholder, propsWithNoScriptRender(child, ltIE9))
        } else if (child.type !== Lazy && child.type !== LazyImg) {
            const props = child.props || (child._store && child._store.props) || {}
            const children = wrapImgToNoScript(props.children, ltIE9, placeholder)

            if (children !== props.children) {
                return React.cloneElement(child, null, children)
            }
        }

        return child
    })
}

class Lazy extends React.PureComponent {
    constructor(props) {
        super(props)

        this.loadedImgTags = 0
        this.state = { imgTagCount: null, loadedAt: null, viewportAt: null }

        this.onImgLoaded = this.onImgLoaded.bind(this)
        this.onViewport = this.onViewport.bind(this)
    }

    componentDidMount() {
        this.options = {
            callback: this.onViewport,
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

    onImgLoaded() {
        this.loadedImgTags++

        if (this.loadedImgTags === this.state.imgTagCount) {
            this.loadedImgTags = 0
            this.setState({ imgTagCount: null, loadedAt: Date.now() }, this.props.onLoad)
        }
    }

    onViewport() {
        const { children, imgPlaceholder, onLoad, onViewport } = this.props

        if (imgPlaceholder) {
            const imgTagCount = countImgTags(children) || null
            this.loadedImgTags = 0
            if (onViewport) {
                onViewport()
            }
            const viewportAt = Date.now()
            this.setState(
                { imgTagCount, loadedAt: !imgTagCount ? viewportAt : null, viewportAt },
                !imgTagCount ? onLoad : null
            )
        } else {
            if (onViewport) {
                onViewport()
            }
            const loadedAt = Date.now()
            this.setState({ imgTagCount: null, loadedAt, viewportAt: loadedAt }, onLoad)
        }
    }

    render() {
        const { children, component, imgFallback, imgPlaceholder, imgWrapper, ltIE9, ...props } = this.props
        // remove props we do not want to pass to the rendering component
        delete props.cushion
        delete props.onLoad
        delete props.onViewport

        if (this.state.loadedAt && (!imgWrapper || !imgPlaceholder)) {
            return React.createElement(component, props, children)
        }

        if (imgPlaceholder) {
            if (this.state.viewportAt) {
                // wrap img elements to LazyImg
                return React.createElement(
                    component,
                    props,
                    wrapImgToLazyImg(children, imgWrapper, imgPlaceholder, imgFallback, this.onImgLoaded)
                )
            } else {
                // wrap only img elements to noscript and the given placeholder component
                return React.createElement(component, props, wrapImgToNoScript(children, ltIE9, imgPlaceholder))
            }
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

const ReactElement = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
])

Lazy.propTypes = {
    children: PropTypes.node,
    component: ReactElement,
    cushion: PropTypes.number,
    imgFallback: ReactElement,
    imgPlaceholder: ReactElement,
    imgWrapper: ReactElement,
    ltIE9: PropTypes.bool,
    onLoad: PropTypes.func,
    onViewport: PropTypes.func,
}

export default Lazy
