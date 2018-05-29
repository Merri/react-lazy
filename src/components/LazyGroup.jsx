import React from 'react'
import PropTypes from 'prop-types'

import { countTypesTags, wrapTypesToLazyChild, wrapTypesToNoScript } from '../lib/wrap'

import DefaultWrapper from './DefaultWrapper'
import Lazy from './Lazy'
import Observer from './Observer'

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

    onViewport(event, unobserve) {
        const { children, childrenToWrap, onLoad, onViewport, visible } = this.props

        if (!visible) {
            return false
        }

        if (!event.isIntersecting || event.defaultPrevented) {
            return
        }

        unobserve()

        const imgTagCount = countTypesTags(childrenToWrap, children) || null
        this.loadedImgTags = 0
        if (onViewport) {
            onViewport(event)
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
            clientOnly,
            component,
            cushion,
            ltIE9,
            onLoad,
            onViewport,
            threshold,
            viewport,
            visible,
            ...props
        } = this.props

        return (
            <Observer cushion={cushion} onChange={this.onViewport} threshold={threshold} viewport={viewport}>
                {React.createElement(
                    component,
                    props,
                    // swap render once element is visible in viewport
                    clientOnly || (visible && this.state.viewportAt)
                        // replace elements with LazyChild
                        ? wrapTypesToLazyChild(childrenToWrap, children, childWrapper, this.onImgLoaded)
                        // wrap given element types to noscript and the given wrapper component
                        : wrapTypesToNoScript(childrenToWrap, children, ltIE9, childWrapper)
                )}
            </Observer>
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
