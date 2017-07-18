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

    it('should contain empty noscript element by default', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy)
        )

        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal('<noscript></noscript>')
    })

    it('should contain empty noscript wrapped within IE conditional comments', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { ltIE9: true })
        )

        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(NOSCRIPT_BEGIN + NOSCRIPT_END)
    })

    it('should contain children inside noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, {}, React.createElement('div', { className: 'test' }, 'Test'))
        )

        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(
            '<noscript><div class="test">Test</div></noscript>'
        )
    })

    it('should contain children inside IECC noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { ltIE9: true }, React.createElement('div', { className: 'test' }, 'Test'))
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

    it('should wrap all contained img elements to noscript when using imgWrapperComponent', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                Lazy,
                { imgWrapperComponent: 'div' },
                [
                    React.createElement('img', { key: 'a', src: '' }),
                    React.createElement('div', { key: 'b' }, React.createElement('img', { src: '' }))
                ]
            )
        )

        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(
            '<div><noscript><img src=""/></noscript></div><div><div><noscript><img src=""/></noscript></div></div>'
        )
    })

    it('should wrap all contained img elements to IECC noscript when using imgWrapperComponent', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(
                Lazy,
                { imgWrapperComponent: 'div', ltIE9: true },
                [
                    React.createElement('img', { key: 'a', src: '' }),
                    React.createElement('div', { key: 'b' }, React.createElement('img', { src: '' }))
                ]
            )
        )

        // ReactDOM renders as `<img src=""/>`
        expect(ReactDOM.findDOMNode(rendered).innerHTML).to.equal(
            '<div>' + NOSCRIPT_BEGIN + '<img src=""/>' + NOSCRIPT_END + '</div>'
            + '<div><div>' + NOSCRIPT_BEGIN + '<img src=""/>' + NOSCRIPT_END + '</div></div>'
        )
    })
})
