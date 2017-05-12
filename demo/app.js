(function() {
    var Lazy = React.createFactory(window.ReactLazy.Lazy)

    var TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    var ImageLink = React.createFactory(React.createClass({
        displayName: 'ImageLink',

        getInitialState: function() {
            return {
                backgroundColor: 'red',
                opacity: 0.1
            }
        },

        onError: function() {
            console.log('Load ' + this.props.src + ' FAILED', new Date())
        },

        onLoad: function() {
            console.log('Load ' + this.props.src, new Date())
        },

        onLoaded: function() {
            console.log('Load ' + this.props.src + ' complete', new Date())
            this.setState({ backgroundColor: 'white', opacity: 1 })
        },

        render: function() {
            return Lazy(
                {
                    nodeName: 'a',
                    href: this.props.href || '#',
                    className: 'image-link image-link--100px',
                    onLoad: this.onLoad,
                    style: this.state
                },
                React.DOM.img({
                    className: 'image-link__image',
                    alt: this.props.alt || '',
                    height: this.props.height,
                    src: this.props.src || TRANSPARENT_GIF,
                    width: this.props.width,
                    onLoad: this.onLoaded,
                    onError: this.onError
                })
            )
        }
    }))

    var Demo = React.createClass({
        displayName: 'Demo',

        render: function() {
            return React.DOM.div(
                {},
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' }),
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' }),
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' }),
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' }),
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' }),
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' }),
                ImageLink({ src: 'http://placekitten.com/50/75' }),
                ImageLink({ src: 'http://placekitten.com/60/75' }),
                ImageLink({ src: 'http://placekitten.com/70/75' }),
                ImageLink({ src: 'http://placekitten.com/80/75' }),
                ImageLink({ src: 'http://placekitten.com/90/75' }),
                ImageLink({ src: 'http://placekitten.com/100/75' }),
                ImageLink({ src: 'http://placekitten.com/75/75' }),
                ImageLink({ src: 'http://placekitten.com/75/85' }),
                ImageLink({ src: 'http://placekitten.com/75/95' }),
                ImageLink({ src: 'http://placekitten.com/75/55' })
            )
        }
    })

    ReactDOM.render(React.createElement(Demo), document.getElementById('app'))
})()
