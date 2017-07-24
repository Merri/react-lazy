/* global describe, it */
'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-dom/test-utils')
var jsdom = require('mocha-jsdom')
var expect = require('chai').expect
var Lazy = require('../dist/module/').Lazy
var LazyGroup = require('../dist/module/').LazyGroup
var findDOMNode = ReactDOM.findDOMNode

var NOSCRIPT_BEGIN = '<!--[if IE 9]><!--><noscript><!--<![endif]-->'
var NOSCRIPT_END = '<!--[if IE 9]><!--></noscript><!--<![endif]-->'

describe('Lazy', function() {
    jsdom()

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

        expect(findDOMNode(rendered).innerHTML).to.equal(NOSCRIPT_BEGIN + NOSCRIPT_END)
    })

    it('should contain children inside noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, {}, React.createElement('div', { className: 'test' }, 'Test'))
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
            NOSCRIPT_BEGIN + '<div class="test">Test</div>' + NOSCRIPT_END
        )
    })

    it('should allow customization of component', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { component: 'section' })
        )

        expect(findDOMNode(rendered).nodeName).to.equal('SECTION')
    })
})

function divWrapper(props) {
    return React.createElement('div', props)
}

describe('LazyGroup', function() {
    jsdom()

    it('should wrap all contained img elements to noscript when using childWrapper', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                LazyGroup,
                { childWrapper: divWrapper },
                React.createElement('img', { src: '' }),
                React.createElement('div', null, React.createElement('img', { src: '' }))
            )
        )

        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div><noscript><img src=""/></noscript></div><div><div><noscript><img src=""/></noscript></div></div>'
        )
    })

    it('should wrap all contained img elements to IECC noscript when using childWrapper', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                LazyGroup,
                { childWrapper: divWrapper, ltIE9: true },
                React.createElement('img', { src: '' }),
                React.createElement('div', null, React.createElement('img', { src: '' }))
            )
        )

        // ReactDOM renders as `<img src=""/>`
        expect(findDOMNode(rendered).innerHTML).to.equal(
            '<div>' + NOSCRIPT_BEGIN + '<img src=""/>' + NOSCRIPT_END + '</div>'
            + '<div><div>' + NOSCRIPT_BEGIN + '<img src=""/>' + NOSCRIPT_END + '</div></div>'
        )
    })
})
