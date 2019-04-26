/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import DefaultWrapper from '../DefaultWrapper'

test('DefaultWrapper className indicates placeholder state by default', () => {
    const tree = renderer.create(<DefaultWrapper />)
    expect(tree.toJSON()).toMatchSnapshot()
})

test('DefaultWrapper className indicates loading state when childProps exists', () => {
    const tree = renderer.create(<DefaultWrapper childProps={{}} />)
    expect(tree.toJSON()).toMatchSnapshot()
})

test('DefaultWrapper className indicates failed state when isFailed', () => {
    const tree = renderer.create(<DefaultWrapper childProps={{}} isFailed />)
    expect(tree.toJSON()).toMatchSnapshot()
})

test('DefaultWrapper className indicates loaded state when isLoaded', () => {
    const tree = renderer.create(<DefaultWrapper childProps={{}} isLoaded />)
    expect(tree.toJSON()).toMatchSnapshot()
})

test('DefaultWrapper may contain children', () => {
    const tree = renderer.create(
        <DefaultWrapper childProps={{}} isLoaded>
            <div />
        </DefaultWrapper>,
    )
    expect(tree.toJSON()).toMatchSnapshot()
})

test('DefaultWrapper passes other props directly to the rendered div element', () => {
    const tree = renderer.create(<DefaultWrapper childProps={{}} isLoaded id="you-should-see-me-in-the-div" />)
    expect(tree.toJSON()).toMatchSnapshot()
})
