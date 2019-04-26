/* eslint-env jest */
/* eslint-disable react/prop-types,react/no-multi-comp */
import React from 'react'
import renderer from 'react-test-renderer'

import LazyGroup from '../LazyGroup'

const originalIntersectionObserver = window.IntersectionObserver

function noop() {}

function mockIntersectionObserver() {
    return {
        disconnect: noop,
        observe: noop,
        unobserve: noop,
    }
}

const target = { nodeType: 1 }

beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver
})

afterAll(() => {
    window.IntersectionObserver = originalIntersectionObserver
})

describe('LazyGroup', () => {
    test('should render just a div by default', () => {
        const tree = renderer.create(<LazyGroup />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('should let change component to be rendered', () => {
        const tree = renderer.create(<LazyGroup component="section" />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('ltIE9 should render just a div by default', () => {
        const tree = renderer.create(<LazyGroup ltIE9 />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('should render span inside div by default', () => {
        const tree = renderer.create(
            <LazyGroup>
                <span>I am NOT inside noscript!</span>
            </LazyGroup>,
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('childrenToWrap should wrap given component types inside noscript', () => {
        const tree = renderer.create(
            <LazyGroup childrenToWrap={['span']}>
                <span>I am inside noscript!</span>
                <div>
                    I am not! <span>But I am!</span>
                </div>
            </LazyGroup>,
        )
        expect(tree.toJSON()).toMatchSnapshot()

        const tree2 = renderer.create(
            <LazyGroup childrenToWrap={['span']} ltIE9>
                <span>I am inside IECC noscript!</span>
                <div>
                    I am not! <span>But I am!</span>
                </div>
            </LazyGroup>,
        )
        expect(tree2.toJSON()).toMatchSnapshot()
    })

    test('ltIE9 should render span inside div by default', () => {
        const tree = renderer.create(
            <LazyGroup ltIE9>
                <span>I am NOT inside IECC noscript!</span>
            </LazyGroup>,
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('childrenToWrap should wrap matching children in clientOnly mode', () => {
        const tree = renderer.create(
            <LazyGroup clientOnly>
                <img alt="I should be replaced by a placeholder!" />
                <div>
                    Not wrapped! You can read me in the snapshot! <img alt="Replaced by placeholder!" />
                </div>
            </LazyGroup>,
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('should call ref callback', () => {
        const spy = jest.fn()
        renderer.create(<LazyGroup ref={spy} />, { createNodeMock: () => target })
        expect(spy).toHaveBeenCalledWith(target)
    })
})
