import React from 'react'
import PropTypes from 'prop-types'

import { countTypesTags, wrapTypesToLazyChild, wrapTypesToNoScript } from '../lib/wrap'

import DefaultWrapper from './DefaultWrapper'
import Observer from '@researchgate/react-intersection-observer'

export default class LazyGroup extends React.PureComponent {
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
            <Observer onChange={this.onViewport} root={viewport} rootMargin={cushion} threshold={threshold}>
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
    childrenToWrap: ['iframe', 'img'],
    childWrapper: DefaultWrapper,
    clientOnly: false,
    component: 'div',
    ltIE9: false,
    visible: true
}

LazyGroup.propTypes = {
    children: PropTypes.node,
    childrenToWrap: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])),
    childWrapper: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    cushion: PropTypes.string,
    clientOnly: PropTypes.bool,
    ltIE9: PropTypes.bool,
    onLoad: PropTypes.func,
    onViewport: PropTypes.func,
    threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    viewport: PropTypes.oneOfType(
        [PropTypes.string].concat(typeof HTMLElement === 'undefined' ? [] : PropTypes.instanceOf(HTMLElement))
    ),
    visible: PropTypes.bool
}
