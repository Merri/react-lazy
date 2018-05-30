# Upgrading from v0.6.1 to v1.0.0

`react-lazy` has a lot of changes in the v1 release as it now uses the new IntersectionObserver API with code that is
heavily based on work at
[@researchgate/react-intersection-observer](https://github.com/researchgate/react-intersection-observer). For the most
part `react-lazy`'s implementation is identical, but there are minor optimizations, removal of some dependancies and
`viewport` and `cushion` props are preferred over `root` and `rootMargin` props (however latter are also supported).


## Changes in props passed to `Lazy` and `LazyGroup`

- `cushion` is no longer integer value indicating pixels around element but instead `rootMargin` around the viewport
  `root` element.
- `jsOnly` has been renamed as `clientOnly`.
- `threshold` prop has been added; it works just like the one in `Observer`.
- `viewport` prop has been added; it is the `root` option passed to IntersectionObserver.


## Other notable changes

- `Observer` component has been added and exposed
- `checkElementsInViewport` has been removed: it is unnecessary with IntersectionObserver.
- `LazyGroup` no longer extends nor depends on `Lazy`.
- `PropTypes` is no longer required in production build.
