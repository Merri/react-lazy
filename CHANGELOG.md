# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [1.1.0] - 2019-04-26

### Fixed
- Allow blocking lazy load in `onViewport` events by using `preventDefault()`
- No longer re-render as `noscript` if setting `visible` to false after element has come to viewport
- `component` propTypes have been fixed to `any`
- `clientOnly` works now correctly with `LazyGroup`

### Changed
- `ref` is now passed through
- Build and test system has been replaced with a less clunky modern one
- `Lazy`'s render method has been compacted to shorter code

### Removed
- Support for old versions of React, now minimum of 16.4 required


## [1.0.3] - 2018-06-13

### Changed
- Now uses `@researchgate/react-intersection-observer` instead of customized implementation

### Fixed
- Case where `viewport` and `threshold` were not passed to `Observer` in `Lazy`


## [1.0.2] - 2018-05-31

### Changed
- Size of final generated JavaScript has been reduced
- Minor code speed optimizations

### Removed
- `DefaultWrapper` and `LazyChild` are no longer exported


## [1.0.1] - 2018-05-30

### Changed
- React version requirement to 16

### Removed
- Symbol polyfill requirement


## [1.0.0] - 2018-05-30

### Added
- `Observer` component
- `threshold` prop to `Lazy` and `LazyGroup`
- `viewport` prop to `Lazy` and `LazyGroup` which works like `root` of IntersectionObserver

### Changed
- `cushion` prop works now like `marginRoot` of IntersectionObserver
- `jsOnly` prop is now `clientOnly`
- Viewport detection to use IntersectionObserver API with code heavily based on
  [@researchgate/react-intersection-observer](https://github.com/researchgate/react-intersection-observer)
- `LazyGroup` no longer extends from `Lazy` as both use `Observer` now
- `onViewport` receives intersection observer event as first parameter

### Removed
- `checkElementsInViewport`

### Fixed
- Production build no longer requires `PropTypes`


## [0.6.1] - 2018-05-26

- Fix dependency issue with `uglifyjs-webpack-plugin`


## [0.6.0] - 2018-05-26

- Update to React 16.4
- Use throttle instead of debounce
- Update to Webpack 4 and other latest packages (except for the tests because I am lazy)


## [0.5.1] - 2017-11-14

- Update to React 16.1.1
- Update to Node 8 LTS; run Travis in it and include a `package-lock.json`
- Fix render mismatch in certain cases


## [0.5.0] - 2017-11-07

- Update to React 16
- Add `jsOnly` option as a solution for less [React 16.0.0 errors](https://github.com/facebook/react/issues/10993)


## [0.4.1] - 2017-09-14

- Update dependencies
- Fix linting issues
- Add event listener helpers
- Use passive listeners
- Add wheel event to listened events


## [0.4.0] - 2017-07-23

- Remove `imgWrapperComponent` as it's development went only half-way to completion
- Add `LazyGroup`, `LazyChild` and `DefaultWrapper` components


## [0.3.1] - 2017-07-18

- Fix non-`ltIE9` not loading images


## [0.3.0] - 2017-07-18

- Disable IE conditional comment rendering by default
- Add `ltIE9` to enable IE conditional comment rendering
- Update dependencies
- Fix `React.DOM.div` warnings


## [0.2.1] - 2017-05-12

- Fix issue where images loaded when `display: none` was set to hide an element
- Introduces issue where having lazy loading on `position: fixed` elements does not work


## [0.2.0] - 2017-05-12

- Upgrade to React 15.5
- Babel 6
- Webpack 2
- Convert from createClass to ES6 class
- Modularize
- Test Travis CI in Node 6.10
- Update linting
- Change `nodeName` to `component` and allow for more than string tags
- Fix bug in cushion handling
- Add support for `imgWrapperComponent` which renders given component around all noscripted img childs
- No longer expose `verge`


## [0.1.0] - 2016-04-11

- Upgrade to React 0.14


## [0.0.3] - 2015-09-11

- Fix issue #1: require loaded client side only intended minified version due to wrong reference in package.json


## [0.0.2] - 2015-07-29

- Use debounce instead of throttle.
- Expose checkElementsInViewport to allow manual triggers.


## [0.0.1] - 2015-07-28

- Initial release.