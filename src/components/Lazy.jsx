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
        const { onLoad, onViewport, visible } = this.props

        if (!visible) {
            return
        }

        if (!event.isIntersecting || event.defaultPrevented) {
            return
        }

        unobserve()

        if (onViewport) {
            onViewport(event)
        }

        this.setState({ show: true }, onLoad)
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

        if (clientOnly || (visible && this.state.show)) {
            return (
                <Observer onChange={this.onViewport} root={viewport} rootMargin={cushion} threshold={threshold}>
                    {React.createElement(component, props, visible && this.state.show ? children : null)}
                </Observer>
            )
        }

        // wrap all contents inside noscript
        return (
            <Observer onChange={this.onViewport} root={viewport} rootMargin={cushion} threshold={threshold}>
                {React.createElement(component, propsWithNoScriptRender(children, ltIE9, props))}
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
