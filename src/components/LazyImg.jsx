import React from 'react'
import PropTypes from 'prop-types'

import TransparentPixel from './TransparentPixel'

const style = {
    calc: 'rect(0 0 0 0)',
    height: '1px',
    opacity: '0.01',
    position: 'absolute',
    width: '1px',
    zIndex: -1,
}

function getSrcForElement(element, props) {
    return typeof element === 'string' || !props || !props.src ? null : { src: props.src }
}

class LazyImg extends React.PureComponent {
    constructor(props) {
        super(props)

        const { onError, onLoad, ...imgProps } = props.children && (
            props.children.props || (props.children._store && (props.children._store.props))
        ) || {}

        this.imgOnError = onError
        this.imgOnLoad = onLoad
        this.imgProps = imgProps

        this.state = { isFailed: false, isLoaded: false }

        this.onError = this.onError.bind(this)
        this.onLoad = this.onLoad.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children === this.props.children) {
            return
        }

        const { onError, onLoad, ...imgProps } = nextProps.children && (
            nextProps.children.props || (nextProps.children._store && (nextProps.children._store.props))
        ) || {}

        this.imgOnError = onError
        this.imgOnLoad = onLoad
        this.imgProps = imgProps
    }

    onError(event) {
        this.setState({ isFailed: true }, this.props.callback)

        if (this.imgOnError) {
            this.imgOnError(event)
        }
    }

    onLoad(event) {
        this.setState({ isLoaded: true }, this.props.callback)

        if (this.imgOnLoad) {
            this.imgOnLoad(event)
        }
    }

    render() {
        const { children, fallback, placeholder, wrapper } = this.props

        if (this.state.isFailed) {
            return React.createElement(fallback, this.imgProps)
        }

        const img = React.Children.only(children)

        if (this.state.isLoaded) {
            return wrapper ? React.createElement(wrapper, getSrcForElement(wrapper, this.imgProps), img) : img
        }

        return React.createElement(
            placeholder,
            getSrcForElement(placeholder, this.imgProps),
            <span style={style}>{
                React.cloneElement(img, { onError: this.onError, onLoad: this.onLoad })
            }</span>
        )
    }
}

LazyImg.defaultProps = {
    fallback: TransparentPixel,
}

const ReactElement = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
])

LazyImg.propTypes = {
    callback: PropTypes.func,
    children: PropTypes.node.isRequired,
    fallback: ReactElement,
    placeholder: ReactElement.isRequired,
    wrapper: ReactElement,
}

export default LazyImg
