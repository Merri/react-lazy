/* global createReactClass, React, ReactDOM, ReactLazy */
(function() {
    var Lazy = React.createFactory(ReactLazy.Lazy)
    var LazyGroup = React.createFactory(ReactLazy.LazyGroup)

    var TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    var ImageLink = React.createFactory(createReactClass({
        displayName: 'ImageLink',

        getInitialState: function() {
            return {
                backgroundColor: 'red',
                opacity: 0.1
            }
        },

        onError: function() {
            // eslint-disable-next-line
            console.log('[IMAGES] Failed to load ' + this.props.src, new Date())
        },

        onViewport: function() {
            // eslint-disable-next-line
            console.log('[IMAGE] To viewport ' + this.props.src, new Date())
        },

        onLoad: function() {
            // eslint-disable-next-line
            console.log('[IMAGE] Loaded ' + this.props.src, new Date())
            this.setState({ backgroundColor: 'white', opacity: 1 })
        },

        render: function() {
            return Lazy(
                {
                    component: 'a',
                    href: this.props.href || '#',
                    className: 'image-link image-link--100px',
                    onViewport: this.onViewport,
                    style: this.state
                },
                React.createElement('img', {
                    className: 'image-link__image',
                    alt: this.props.alt || '',
                    height: this.props.height,
                    src: this.props.src || TRANSPARENT_GIF,
                    width: this.props.width,
                    onLoad: this.onLoad,
                    onError: this.onError
                })
            )
        }
    }))

    function ImageContainer(props) {
        if (props.isFailed) {
            return React.createElement(
                'span',
                {
                    className: 'image-link image-link--100px image-link--container image-link--failed',
                    title: props.childProps.src
                },
                'FAILED :('
            )
        } else {
            return React.createElement(
                'span',
                {
                    className: 'image-link image-link--100px image-link--container'
                },
                props.children
            )
        }
    }

    var ThreeImageContainer = React.createFactory(createReactClass({
        displayName: 'ThreeImageContainer',

        getInitialState: function() {
            return {
                opacity: 0.1
            }
        },

        onViewport: function() {
            // eslint-disable-next-line
            console.log('[CONTAINER] To viewport ' + this.props.id, new Date())
        },

        onLoad: function() {
            // eslint-disable-next-line
            console.log('[CONTAINER] Loaded ' + this.props.id, new Date())
            this.setState({ opacity: 1 })
        },

        render: function() {
            return LazyGroup(
                {
                    component: 'span',
                    className: 'three-image-container',
                    childrenToWrap: ['img'],
                    childWrapper: ImageContainer,
                    onLoad: this.onLoad,
                    onViewport: this.onViewport,
                    style: this.state
                },
                React.Children.map(this.props.children, (function(child) {
                    return React.cloneElement(child, {
                        className: 'image-link__image',
                        alt: this.props.alt || '',
                        height: this.props.height,
                        width: this.props.width,
                    })
                }).bind(this))
            )
        }
    }))

    var Demo = createReactClass({
        displayName: 'Demo',

        render: function() {
            return React.createElement(
                'div',
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

                ThreeImageContainer(
                    { id: 'first-group' },
                    React.createElement('img', { src: 'http://placekitten.com/50/75' }),
                    React.createElement('img', { src: 'http://placekitten.com/80/75' }),
                    React.createElement('img', { src: 'http://placekitten.com/75/75' })
                ),

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

                ThreeImageContainer(
                    { id: 'second-group' },
                    React.createElement('img', { src: 'http://placekitten.com/60/75' }),
                    React.createElement('img', { src: 'http://placekitten.com/90/75' }),
                    React.createElement('img', { src: 'http://placekitten.com/75/85' })
                ),

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

                ThreeImageContainer(
                    { id: 'third-group-with-a-failing-member' },
                    React.createElement('img', { src: 'http://placekitten.com/50/75' }),
                    React.createElement('img', { src: 'http://placekitten.com/100/75' }),
                    React.createElement('img', { src: 'http://placekitten.com/75/75' })
                )
            )
        }
    })

    ReactDOM.render(React.createElement(Demo), document.getElementById('app'))
})()
