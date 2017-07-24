import React from 'react'
import PropTypes from 'prop-types'

const style = {
    calc: 'rect(0 0 0 0)',
    height: '1px',
    opacity: '0.01',
    position: 'absolute',
    width: '1px',
    zIndex: -1,
}

class LazyChild extends React.PureComponent {
    constructor(props) {
        super(props)

        const { onError, onLoad, ...childProps } = props.children && (
            props.children.props || (props.children._store && (props.children._store.props))
        ) || {}

        this.childOnError = onError
        this.childOnLoad = onLoad
        this.childProps = childProps

        this.state = { isFailed: false, isLoaded: false, isLoading: false }

        this.onError = this.onError.bind(this)
        this.onLoad = this.onLoad.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children === this.props.children) {
            return
        }

        const { onError, onLoad, ...childProps } = nextProps.children && (
            nextProps.children.props || (nextProps.children._store && (nextProps.children._store.props))
        ) || {}

        this.childOnError = onError
        this.childOnLoad = onLoad
        this.childProps = childProps
    }

    onError(event) {
        this.setState({ isFailed: true }, this.props.callback)

        if (this.childOnError) {
            this.childOnError(event)
        }
    }

    onLoad(event) {
        this.setState({ isLoaded: true }, this.props.callback)

        if (this.childOnLoad) {
            this.childOnLoad(event)
        }
    }

    render() {
        const { callback, children, wrapper, ...props } = this.props

        const child = React.Children.only(children)

        return React.createElement(
            wrapper,
            { ...props, ...this.state, childProps: this.childProps },
            !this.state.isFailed && !this.state.isLoaded
                ? React.cloneElement(child, { onError: this.onError, onLoad: this.onLoad, style })
                : child
        )
    }
}

LazyChild.propTypes = {
    callback: PropTypes.func,
    children: PropTypes.node.isRequired,
    wrapper: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]).isRequired,
}

export default LazyChild
