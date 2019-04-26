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
            const props = child.props || {}
            count += countTypesTags(types, props.children)
        }
    })

    return count
}

export function propsWithNoScriptRender(children, ltIE9, props = {}) {
    const noscript = renderToStaticMarkup(React.createElement('noscript', null, children))

    props.dangerouslySetInnerHTML = {
        __html: !ltIE9
            ? noscript
            : noscript
                  .replace('<noscript>', '<!--[if IE 9]><!--><noscript><!--<![endif]-->')
                  .replace('</noscript>', '<!--[if IE 9]><!--></noscript><!--<![endif]-->'),
    }

    return props
}

export function wrapTypesToLazyChild(types, children, wrapper, callback, inViewport) {
    if (!children) {
        return children
    }

    return React.Children.map(children, child => {
        if (!child || child.type === Lazy || child.type === LazyGroup || child.type === LazyChild) {
            return child
        } else if (types.includes(child.type)) {
            return (
                <LazyChild callback={callback} wrapper={wrapper}>
                    {inViewport ? child : null}
                </LazyChild>
            )
        }
        const props = child.props || {}
        const laziedChildren = wrapTypesToLazyChild(types, props.children, wrapper, callback, inViewport)

        if (laziedChildren !== props.children) {
            return React.cloneElement(child, null, laziedChildren)
        }

        return child
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
        }

        const props = child.props || {}
        const noscriptedChildren = wrapTypesToNoScript(types, props.children, ltIE9, wrapper)

        if (noscriptedChildren !== props.children) {
            return React.cloneElement(child, null, noscriptedChildren)
        }

        return child
    })
}
