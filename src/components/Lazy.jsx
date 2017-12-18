import React from 'react'
import PropTypes from 'prop-types'

import { addElement, removeElement } from '../lib/viewport'
import { propsWithNoScriptRender } from '../lib/wrap'

class Lazy extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { loadedAt: null }

        this.getRef = this.getRef.bind(this)
        this.onViewport = this.onViewport.bind(this)
    }

    componentDidMount() {
        this.options = {
            callback: this.onViewport,
            cushion: this.props.cushion,
            element: this.el,
            throttle: this.props.throttle,
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

    getRef(el) {
        this.el = el
    }

    onViewport() {
        const { onLoad, onViewport, visible } = this.props

        if (!visible) {
            return false
        }

        if (onViewport) {
            onViewport()
        }

        this.setState({ loadedAt: Date.now() }, onLoad)
    }

    render() {
        const { children, component, cushion, jsOnly, ltIE9, visible, onLoad, onViewport, throttle, ...rest } = this.props

        const props = { ...rest, ref: this.getRef }

        if (jsOnly || (visible && this.state.loadedAt)) {
            return React.createElement(component, props, visible && this.state.loadedAt ? children : null)
        }

        // wrap all contents inside noscript
        return React.createElement(component, propsWithNoScriptRender(children, ltIE9, props))
    }
}

Lazy.defaultProps = {
    component: 'div',
    cushion: 0,
    jsOnly: false,
    ltIE9: false,
    visible: true,
    throttle: false,
}

Lazy.propTypes = {
    children: PropTypes.node,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
    ]),
    cushion: PropTypes.number,
    jsOnly: PropTypes.bool,
    ltIE9: PropTypes.bool,
    onLoad: PropTypes.func,
    onViewport: PropTypes.func,
    visible: PropTypes.bool,
    throttle: PropTypes.bool,
}

export default Lazy
