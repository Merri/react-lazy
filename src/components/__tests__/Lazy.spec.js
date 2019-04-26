/* eslint-env jest */
/* eslint-disable react/prop-types,react/no-multi-comp */
import React from 'react'
import renderer from 'react-test-renderer'

import Lazy from '../Lazy'

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

describe('Lazy', () => {
    test('should render as div and with empty noscript by default', () => {
        const tree = renderer.create(<Lazy />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('should let change component to be rendered', () => {
        const tree = renderer.create(<Lazy component="section" />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('ltIE9 should render with IE conditional comments around noscript', () => {
        const tree = renderer.create(<Lazy ltIE9 />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('children should be rendered inside noscript', () => {
        const tree = renderer.create(
            <Lazy>
                <span>I am inside noscript!</span>
            </Lazy>,
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('with ltIE9 children should be rendered inside noscript with conditional comments', () => {
        const tree = renderer.create(
            <Lazy ltIE9>
                <span>I am inside IECC noscript!</span>
            </Lazy>,
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('should render only div in clientOnly mode', () => {
        const tree = renderer.create(<Lazy clientOnly />)
        expect(tree.toJSON()).toMatchSnapshot()
    })

    test('should call ref callback', () => {
        const spy = jest.fn()
        renderer.create(<Lazy ref={spy} />, { createNodeMock: () => target })
        expect(spy).toHaveBeenCalledWith(target)
    })
})
