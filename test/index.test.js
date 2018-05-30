/* global describe, it */
/* eslint-disable react/no-find-dom-node */
'use strict'

global.IntersectionObserver = function() {
    return {
        disconnect: function() {},
        observe: function() {},
        unobserve: function() {}
    }
}

var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-dom/test-utils')
var jsdom = require('mocha-jsdom')
var expect = require('chai').expect
var DefaultWrapper = require('../dist/module/components/DefaultWrapper').default
var Lazy = require('../dist/module/').Lazy
var LazyChild = require('../dist/module/components/LazyChild').default
var LazyGroup = require('../dist/module/').LazyGroup
var findDOMNode = ReactDOM.findDOMNode

var IECC_NOSCRIPT_BEGIN = '<!--[if IE 9]><!--><noscript><!--<![endif]-->'
var IECC_NOSCRIPT_END = '<!--[if IE 9]><!--></noscript><!--<![endif]-->'

function sharedTest(Component, otherTests) {
    return function() {
        jsdom()

        it('should allow customization of component', function() {
            var rendered = TestUtils.renderIntoDocument(
                React.createElement(Component, { component: 'section' })
            )

            expect(findDOMNode(rendered).nodeName).to.equal('SECTION')
        })

        if (otherTests) {
            otherTests()
        }
    }
}

describe('Lazy', sharedTest(Lazy, function otherLazyTests() {
    it('should contain empty noscript element by default', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy)
        )

        expect(findDOMNode(rendered).innerHTML).to.equal('<noscript></noscript>')
    })

    it('should contain empty noscript wrapped within IE conditional comments', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { ltIE9: true })
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(IECC_NOSCRIPT_BEGIN + IECC_NOSCRIPT_END)
    })

    it('should contain children inside noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, null, React.createElement('div', { className: 'test' }, 'Test'))
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<noscript><div class="test">Test</div></noscript>'
        )
    })

    it('should contain children inside IECC noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { ltIE9: true }, React.createElement('div', { className: 'test' }, 'Test'))
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            IECC_NOSCRIPT_BEGIN + '<div class="test">Test</div>' + IECC_NOSCRIPT_END
        )
    })

    it('should render nothing in clientOnly mode', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { clientOnly: true })
        )

        expect(findDOMNode(rendered).innerHTML).to.equal('')
    })
}))

var wrapper = '<div class="react-lazy-wrapper react-lazy-wrapper--placeholder"><noscript><img src=""/></noscript></div>'

describe('LazyGroup', sharedTest(LazyGroup, function otherLazyGroupTests() {
    it('should be empty when no children is given', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(LazyGroup)
        )

        expect(findDOMNode(rendered).innerHTML).to.equal('')
    })

    it('should be empty when no children is given when using IE conditional comments', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(LazyGroup, { ltIE9: true })
        )

        expect(findDOMNode(rendered).innerHTML).to.equal('')
    })

    it('should render elements as-is if they are not in childrenToWrap array', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                LazyGroup,
                null,
                React.createElement('div', { className: 'test' }, React.createElement('span'))
            )
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="test"><span></span></div>'
        )
    })

    it('should wrap children inside wrapper and IECC noscript element if they are in childrenToWrap array', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                LazyGroup,
                { childrenToWrap: ['div'], ltIE9: true },
                React.createElement('div', { className: 'test' }, 'Test')
            )
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--placeholder">'
            + IECC_NOSCRIPT_BEGIN + '<div class="test">Test</div>' + IECC_NOSCRIPT_END
            + '</div>'
        )
    })

    it('should wrap all contained img elements to noscript when using childWrapper', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                LazyGroup,
                null,
                React.createElement('img', { src: '' }),
                React.createElement('div', null, React.createElement('img', { src: '' }))
            )
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(wrapper + '<div>' + wrapper + '</div>')
    })

    it('should wrap all contained img elements to IECC noscript when using childWrapper', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                LazyGroup,
                { ltIE9: true },
                React.createElement('img', { src: '' }),
                React.createElement('div', null, React.createElement('img', { src: '' }))
            )
        )

        // ReactDOM renders as `<img src=""/>`
        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--placeholder">'
            + IECC_NOSCRIPT_BEGIN + '<img src=""/>' + IECC_NOSCRIPT_END + '</div>'
            + '<div><div class="react-lazy-wrapper react-lazy-wrapper--placeholder">'
            + IECC_NOSCRIPT_BEGIN + '<img src=""/>' + IECC_NOSCRIPT_END + '</div></div>'
        )
    })
}))

describe('LazyChild', function lazyChildTests() {
    jsdom()

    it('should render using wrapper', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(LazyChild, { wrapper: DefaultWrapper }, React.createElement('img', { src: '' }))
        )

        expect(findDOMNode(rendered).outerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--loading"><img src=""></div>'
        )
    })
})

describe('DefaultWrapper', function defaultWrapperTests() {
    jsdom()

    it('should render placeholder class if it DOES NOT get childProps', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement('div', null, React.createElement(DefaultWrapper))
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--placeholder"></div>'
        )
    })

    it('should render loading class if it DOES get childProps', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement('div', null, React.createElement(DefaultWrapper, { childProps: {} }))
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--loading"></div>'
        )
    })

    it('should render failed class if it isFailed is true', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement('div', null, React.createElement(DefaultWrapper, { isFailed: true }))
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--failed"></div>'
        )
    })

    it('should render loaded class if it isLoaded is true', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement('div', null, React.createElement(DefaultWrapper, { isLoaded: true }))
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div class="react-lazy-wrapper react-lazy-wrapper--loaded"></div>'
        )
    })
})
