import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Lazy from '../components/Lazy'
import LazyChild from '../components/LazyChild'
import LazyGroup from '../components/LazyGroup'

export function countTypesTags(types, children, count = 0) {
    if (!children) {
        return count
    }

    React.Children.forEach(children, child => {
        if (!child || child.type === Lazy || child.type === LazyGroup || child.type === LazyChild) {
            return
        } else if (types.includes(child.type)) {
            count++
        } else {
            const props = child.props || (child._store && child._store.props) || {}
            count += countTypesTags(types, props.children)
        }
    })

    return count
}

export function propsWithNoScriptRender(children, ltIE9, props = {}) {
    const noscript = renderToStaticMarkup(React.createElement('noscript', null, children))

    const __html = !ltIE9 ? noscript : noscript
        .replace('<noscript>', '<!--[if IE 9]><!--><noscript><!--<![endif]-->')
        .replace('</noscript>', '<!--[if IE 9]><!--></noscript><!--<![endif]-->')

    props.dangerouslySetInnerHTML = { __html }

    return props
}

export function wrapTypesToLazyChild(types, children, wrapper, callback) {
    if (!children) {
        return children
    }

    return React.Children.map(children, child => {
        if (!child || child.type === Lazy || child.type === LazyGroup || child.type === LazyChild) {
            return child
        } else if (types.includes(child.type)) {
            return (
                <LazyChild callback={callback} wrapper={wrapper}>{child}</LazyChild>
            )
        } else {
            const props = child.props || (child._store && child._store.props) || {}
            const children = wrapTypesToLazyChild(types, props.children, wrapper, callback)

            if (children !== props.children) {
                return React.cloneElement(child, null, children)
            } else {
                return child
            }
        }
    })
}

export function wrapTypesToNoScript(types, children, ltIE9, wrapper) {
    if (!children) {
        return children
    }

    return React.Children.map(children, child => {
        if (!child || child.type === Lazy || child.type === LazyGroup || child.type === LazyChild) {
            return child
        } else if (types.includes(child.type)) {
            return React.createElement(wrapper, propsWithNoScriptRender(child, ltIE9))
        } else {
            const props = child.props || (child._store && child._store.props) || {}
            const children = wrapTypesToNoScript(types, props.children, ltIE9, wrapper)

            if (children !== props.children) {
                return React.cloneElement(child, null, children)
            } else {
                return child
            }
        }
    })
}
