/* global describe, it */
'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-dom/test-utils')
var jsdom = require('mocha-jsdom')
var expect = require('chai').expect
var Lazy = require('../dist/module/').Lazy

var NOSCRIPT_BEGIN = '<!--[if IE 9]><!--><noscript><!--<![endif]-->'
var NOSCRIPT_END = '<!--[if IE 9]><!--></noscript><!--<![endif]-->'

describe('Lazy', function() {
    jsdom()

    it('should render empty noscript wrapped within IE conditional comments', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy)
        )

        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(NOSCRIPT_BEGIN + NOSCRIPT_END)
    })

    it('should render children inside noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, {}, React.DOM.div({ className: 'test' }, 'Test'))
        )

        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(
            NOSCRIPT_BEGIN + '<div class="test">Test</div>' + NOSCRIPT_END
        )
    })

    it('should allow customization of component', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { component: 'section' })
        )

        expect(ReactDOM.findDOMNode(rendered).nodeName).to.equal('SECTION')
    })

    it('should wrap only img elements to noscript if told so', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                Lazy,
                { imgWrapperComponent: 'div' },
                [
                    React.DOM.img({ key: 'a', src: '' }),
                    React.DOM.div({ key: 'b' }, React.DOM.img({ src: '' }))
                ]
            )
        )

        // eslint-disable-next-line
        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(
            '<div>' + NOSCRIPT_BEGIN + '<img src=""/>' + NOSCRIPT_END + '</div>'
            + '<div><div>' + NOSCRIPT_BEGIN + '<img src=""/>' + NOSCRIPT_END + '</div></div>'
        )
    })
})
