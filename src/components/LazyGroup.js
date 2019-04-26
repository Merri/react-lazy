import React from 'react'
import PropTypes from 'prop-types'

import { countTypesTags, wrapTypesToLazyChild, wrapTypesToNoScript } from '../lib/wrap'

import DefaultWrapper from './DefaultWrapper'
import Observer from '@researchgate/react-intersection-observer'

class LazyGroup extends React.PureComponent {
    constructor(props) {
        super(props)

        this.loadedImgTags = 0
        this.state = { imgTagCount: null, loadedAt: null, viewportAt: null }

        this.handleViewport = this.handleViewport.bind(this)
        this.handleImgLoaded = this.handleImgLoaded.bind(this)
    }

    handleImgLoaded() {
        this.loadedImgTags++

        if (this.loadedImgTags === this.state.imgTagCount) {
            this.loadedImgTags = 0
            this.setState({ imgTagCount: null, loadedAt: Date.now() }, this.props.onLoad)
        }
    }

    handleViewport(event, unobserve) {
        const { children, childrenToWrap, onLoad, onViewport, visible } = this.props

        if (!event.isIntersecting || !visible) {
            return
        }

        if (onViewport) {
            onViewport(event)
        }

        if (event.defaultPrevented) {
            return
        }

        unobserve()

        const imgTagCount = countTypesTags(childrenToWrap, children) || null
        this.loadedImgTags = 0
        const viewportAt = Date.now()
        this.setState(
            { imgTagCount, loadedAt: !imgTagCount ? viewportAt : null, viewportAt },
            !imgTagCount ? onLoad : null,
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
            forwardedRef: ref,
            ltIE9,
            onLoad,
            onViewport,
            threshold,
            viewport,
            visible,
            ...rest
        } = this.props

        const props = Object.assign({ ref }, rest)

        return (
            <Observer onChange={this.handleViewport} root={viewport} rootMargin={cushion} threshold={threshold}>
                {React.createElement(
                    component,
                    props,
                    // swap render once element is visible in viewport
                    clientOnly || this.state.viewportAt
                        ? wrapTypesToLazyChild(childrenToWrap, children, childWrapper, this.handleImgLoaded, this.state.viewportAt != null)
                        : wrapTypesToNoScript(childrenToWrap, children, ltIE9, childWrapper),
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
    visible: true,
}

LazyGroup.propTypes = {
    clientOnly: PropTypes.bool,
    children: PropTypes.node,
    childrenToWrap: PropTypes.arrayOf(PropTypes.any),
    childWrapper: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    component: PropTypes.any,
    cushion: PropTypes.string,
    forwardedRef: PropTypes.any,
    ltIE9: PropTypes.bool,
    onLoad: PropTypes.func,
    onViewport: PropTypes.func,
    threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    viewport: PropTypes.oneOfType(
        [PropTypes.string].concat(typeof HTMLElement === 'undefined' ? [] : PropTypes.instanceOf(HTMLElement)),
    ),
    visible: PropTypes.bool,
}

// eslint-disable-next-line react/display-name,react/no-multi-comp
export default React.forwardRef((props, ref) => <LazyGroup {...props} forwardedRef={ref} />)
