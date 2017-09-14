## v0.4.1 - 2017-09-14
- Update dependencies
- Fix linting issues
- Add event listener helpers
- Use passive listeners
- Add wheel event to listened events


## v0.4.0 - 2017-07-23
- Remove `imgWrapperComponent` as it's development went only half-way to completion
- Add `LazyGroup`, `LazyChild` and `DefaultWrapper` components


## v0.3.1 - 2017-07-18

- Fix non-`ltIE9` not loading images


## v0.3.0 - 2017-07-18

- Disable IE conditional comment rendering by default
- Add `ltIE9` to enable IE conditional comment rendering
- Update dependencies
- Fix `React.DOM.div` warnings


## v0.2.1 - 2017-05-12

- Fix issue where images loaded when `display: none` was set to hide an element
- Introduces issue where having lazy loading on `position: fixed` elements does not work


## v0.2.0 - 2017-05-12

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


## v0.1.0 - 2016-04-11

- Upgrade to React 0.14


## v0.0.3 - 2015-09-11

- Fix issue #1: require loaded client side only intended minified version due to wrong reference in package.json


## v0.0.2 - 2015-07-29

- Use debounce instead of throttle.
- Expose checkElementsInViewport to allow manual triggers.


## v0.0.1 - 2015-07-28

- Initial release.
