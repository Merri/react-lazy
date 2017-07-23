import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { addElement, removeElement } from '../lib/viewport'
import { countTypesTags, wrapTypesToLazyChild, wrapTypesToNoScript } from '../lib/wrap'

class LazyGroup extends React.PureComponent {
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
        const { children, childrenToWrap, onLoad, onViewport, visible } = this.props

        if (!visible) {
            return false
        }

        const imgTagCount = countTypesTags(childrenToWrap, children) || null
        this.loadedImgTags = 0
        if (onViewport) {
            onViewport()
        }
        const viewportAt = Date.now()
        this.setState(
            { imgTagCount, loadedAt: !imgTagCount ? viewportAt : null, viewportAt },
            !imgTagCount ? onLoad : null
        )
    }

    render() {
        const { children, childrenToWrap, childWrapper, component, ltIE9, visible, ...props } = this.props
        // remove props we do not want to pass to the rendering component
        delete props.cushion
        delete props.onLoad
        delete props.onViewport

        return React.createElement(
            component,
            props,
            // swap render once element is visible in viewport
            visible && this.state.viewportAt
            // replace elements with LazyChild
            ? wrapTypesToLazyChild(childrenToWrap, children, childWrapper, this.onImgLoaded)
            // wrap given element types to noscript and the given wrapper component
            : wrapTypesToNoScript(childrenToWrap, children, ltIE9, childWrapper)
        )
    }
}

LazyGroup.defaultProps = {
    component: 'div',
    childrenToWrap: ['iframe', 'img'],
    cushion: 0,
    ltIE9: false,
    visible: true,
}

const ReactElement = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
])

LazyGroup.propTypes = {
    children: PropTypes.node,
    childrenToWrap: PropTypes.arrayOf(ReactElement),
    childWrapper: ReactElement,
    component: ReactElement,
    cushion: PropTypes.number,
    ltIE9: PropTypes.bool,
    onLoad: PropTypes.func,
    onViewport: PropTypes.func,
    visible: PropTypes.bool,
}

export default LazyGroup
