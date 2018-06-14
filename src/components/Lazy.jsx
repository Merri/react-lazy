import React from 'react'
import PropTypes from 'prop-types'

import Observer from '@researchgate/react-intersection-observer'

import { propsWithNoScriptRender } from '../lib/wrap'

export default class Lazy extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { show: false }

        this.onViewport = this.onViewport.bind(this)
    }

    onViewport(event, unobserve) {
        if (!event.isIntersecting || !this.props.visible) {
            return
        }

        if (this.props.onViewport) {
            this.props.onViewport(event)
        }

        if (event.defaultPrevented) {
            return
        }

        unobserve()

        this.setState({ show: true }, this.props.onLoad)
    }

    render() {
        const {
            children,
            clientOnly,
            component,
            cushion,
            ltIE9,
            visible,
            onLoad,
            onViewport,
            threshold,
            viewport,
            ...props
        } = this.props

        const isClientRender = clientOnly || this.state.show

        return (
            <Observer onChange={this.onViewport} root={viewport} rootMargin={cushion} threshold={threshold}>
                {React.createElement(
                    component,
                    isClientRender ? props : propsWithNoScriptRender(children, ltIE9, props),
                    isClientRender && this.state.show && visible ? children : null
                )}
            </Observer>
        )
    }
}

Lazy.defaultProps = {
    clientOnly: false,
    component: 'div',
    ltIE9: false,
    visible: true
}

Lazy.propTypes = {
    children: PropTypes.node,
    component: PropTypes.any,
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
