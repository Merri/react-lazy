'use strict'

var React = require('react/addons'),
    jsdom = require('mocha-jsdom'),
    expect = require('chai').expect,
    Lazy = require('../index').Lazy

var TestUtils = React.addons.TestUtils

var NOSCRIPT_BEGIN = '<!--[if IE 9]><!--><noscript><!--<![endif]-->',
    NOSCRIPT_END = '<!--[if IE 9]><!--></noscript><!--<![endif]-->'

describe('Lazy', function() {
    jsdom()

    it('should render empty noscript wrapped within IE conditional comments', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy)
        )

        expect(React.findDOMNode(rendered).innerHTML).to.equal(NOSCRIPT_BEGIN + NOSCRIPT_END)
    })

    it('should render children inside noscript element', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, {}, React.DOM.div({ className: 'test' }, 'Test'))
        )

        expect(React.findDOMNode(rendered).innerHTML).to.equal(
            NOSCRIPT_BEGIN + '<div class="test">Test</div>' + NOSCRIPT_END
        )
    })

    it('should allow customization of nodeName', function() {
        var rendered = TestUtils.renderIntoDocument(
            React.createElement(Lazy, { nodeName: 'section' })
        )

        expect(React.findDOMNode(rendered).nodeName).to.equal('SECTION')
    })
})
