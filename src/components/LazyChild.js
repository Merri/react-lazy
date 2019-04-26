import React from 'react'
import PropTypes from 'prop-types'

function getProps(children, prop) {
    if (!children || !children.props) return null
    const { onError, onLoad, ...childProps } = children.props
    switch (prop) {
        case 'onError':
            return onError
        case 'onLoad':
            return onLoad
        default:
            return childProps
    }
}

class LazyChild extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { isFailed: false, isLoaded: false }

        this.handleError = this.handleError.bind(this)
        this.handleLoad = this.handleLoad.bind(this)
    }

    componentDidMount() {
        this.setState({ childProps: getProps(this.props.children) })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.children === this.props.children) {
            return
        }

        this.setState({ childProps: getProps(this.props.children) })
    }

    handleError(event) {
        this.setState({ isFailed: true }, this.props.callback)

        const onError = getProps(this.props.children, 'onError')
        if (onError) onError(event)
    }

    handleLoad(event) {
        this.setState({ isLoaded: true }, this.props.callback)

        const onLoad = getProps(this.props.children, 'onLoad')
        if (onLoad) onLoad(event)
    }

    render() {
        const { callback, children, wrapper, ...props } = this.props

        const child = children ? React.Children.only(children) : null

        return React.createElement(
            wrapper,
            { ...props, ...this.state },
            child && !this.state.isFailed && !this.state.isLoaded
                ? React.cloneElement(child, { onError: this.handleError, onLoad: this.handleLoad })
                : child,
        )
    }
}

LazyChild.propTypes = {
    callback: PropTypes.func,
    children: PropTypes.node,
    wrapper: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
}

export default LazyChild
