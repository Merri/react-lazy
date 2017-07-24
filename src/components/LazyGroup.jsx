import React from 'react'
import PropTypes from 'prop-types'

import { countTypesTags, wrapTypesToLazyChild, wrapTypesToNoScript } from '../lib/wrap'

import DefaultWrapper from './DefaultWrapper'
import Lazy from './Lazy'

class LazyGroup extends Lazy {
    constructor(props) {
        super(props)

        this.loadedImgTags = 0
        this.state = { imgTagCount: null, loadedAt: null, viewportAt: null }

        this.onImgLoaded = this.onImgLoaded.bind(this)
        this.onViewport = this.onViewport.bind(this)
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
        const {
            children,
            childrenToWrap,
            childWrapper,
            component,
            cushion,
            ltIE9,
            onLoad,
            onViewport,
            visible,
            ...props
        } = this.props

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
    ...Lazy.defaultProps,
    childrenToWrap: ['iframe', 'img'],
    childWrapper: DefaultWrapper,
}

LazyGroup.propTypes = {
    ...Lazy.propTypes,
    childrenToWrap: PropTypes.arrayOf(Lazy.propTypes.component),
    childWrapper: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
}

export default LazyGroup
