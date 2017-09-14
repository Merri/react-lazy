import React from 'react'
import PropTypes from 'prop-types'

function DefaultWrapper({ childProps, children, isFailed, isLoaded, ...props }) {
    const className = 'react-lazy-wrapper'
    + (!isLoaded && !isFailed ? ` react-lazy-wrapper--${childProps ? 'loading' : 'placeholder'}` : '')
    + (isFailed ? ' react-lazy-wrapper--failed' : '')
    + (isLoaded ? ' react-lazy-wrapper--loaded' : '')
    + (props.className ? ' ' + props.className : '')

    return (
        <div {...props} className={className}>{children}</div>
    )
}

DefaultWrapper.propTypes = {
    children: PropTypes.node,
    childProps: PropTypes.object,
    className: PropTypes.string,
    isFailed: PropTypes.bool,
    isLoaded: PropTypes.bool,
}

export default DefaultWrapper
