// based on @researchgate/react-intersection-observer
import React from 'react'
import PropTypes from 'prop-types'
/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom'

import ObserverContainer from './ObserverContainer'

import { isDOMTypeElement, shallowCompareOptions } from '../lib/utils'

/**
 * The Intersection Observer API callback that is called whenever one element,
 * called the target, intersects either the device viewport or a specified element.
 * Also will get called whenever the visibility of the target element changes and
 * crosses desired amounts of intersection with the viewport element.
 * @param {array} changes
 * @param {IntersectionObserver} observer
 */
export function callback(changes, observer) {
    for (let i = 0; i < changes.length; i++) {
        const instance = ObserverContainer.findElement(changes[i], observer)

        if (instance) {
            instance.handleChange(changes[i])
        }
    }
}

const optToPropMapper = { root: 'viewport', rootMargin: 'cushion' }

/**
 * Terminology rename.
 * @param {string} option
 * @return {string} prop
 */
function optToProp(option) {
    return optToPropMapper[option] || option
}

const observerOptions = ['root', 'rootMargin', 'threshold']
const observerProps = observerOptions.map(optToProp).concat('disabled')
const objectProto = Object.prototype

export default class Observer extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleNode = this.handleNode.bind(this)
        this.observe = this.observe.bind(this)
        this.unobserve = this.unobserve.bind(this)
    }

    get options() {
        const props = this.props

        return observerOptions.reduce(function(options, option) {
            const key = optToProp(option)

            if (objectProto.hasOwnProperty.call(props, key)) {
                const useQuery = key === 'viewport' && objectProto.toString.call(props[key]) === '[object String]'

                options[option] = useQuery ? document.querySelector(props[key]) : props[key]
            }

            return options
        }, {})
    }

    handleChange(event) {
        this.props.onChange(event, this.unobserve)
    }

    handleNode(target) {
        if (typeof this.props.children.ref === 'function') {
            this.props.children.ref(target)
        }

        if (this.renderedTarget && target && this.renderedTarget !== target) {
            this.unobserve()
            this.targetChanged = true
        } else {
            this.targetChanged = false
        }

        this.target = target
    }

    observe() {
        this.target = isDOMTypeElement(this.target) ? this.target : findDOMNode(this.target)
        this.observer = ObserverContainer.create(callback, this.options)
        ObserverContainer.observe(this)
    }

    unobserve() {
        if (this.target != null) {
            ObserverContainer.unobserve(this)
        }
    }

    componentDidMount() {
        if (!this.props.disabled) {
            this.observe()
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.targetChanged ||
            observerProps.some(option => shallowCompareOptions(this.props[option], prevProps[option]))
        ) {
            this.unobserve()

            if (!this.props.disabled) {
                this.observe()
            }
        }
    }

    componentWillUnmount() {
        this.unobserve()
    }

    render() {
        this.renderedTarget = this.target

        return React.cloneElement(
            React.Children.only(this.props.children),
            { ref: this.handleNode }
        )
    }
}

Observer.propTypes = {
    /**
     * The element that is used as the target to observe.
     */
    children: PropTypes.element.isRequired,

    /**
     * Cushion around the viewport. Can have values similar to the CSS margin property,
     * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
     * If the viewport element is specified, the values can be percentages.
     * This set of values serves to grow or shrink each side of the viewport element's
     * bounding box before computing intersections.
     * Defaults to all zeros.
     */
    cushion: PropTypes.string,

    /**
     * Controls whether the element should stop being observed by its IntersectionObserver instance.
     * Defaults to false.
     */
    disabled: PropTypes.bool,

    /**
     * Function that will be invoked whenever the intersection value for this element changes.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Either a single number or an array of numbers which indicate at what percentage
     * of the target's visibility the observer's callback should be executed.
     * If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
     * If you want the callback run every time visibility passes another 25%,
     * you would specify the array [0, 0.25, 0.5, 0.75, 1].
     * The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
     * A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
     */
    threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),

    /**
     * The element that is used as the viewport for checking visibility of the target.
     * Can be specified as string for selector matching within the document.
     * Defaults to the browser viewport if not specified or if null.
     */
    viewport: PropTypes.oneOfType(
        [PropTypes.string].concat(typeof HTMLElement === 'undefined' ? [] : PropTypes.instanceOf(HTMLElement))
    )
}
