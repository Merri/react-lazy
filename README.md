# react-lazy
[![Version](http://img.shields.io/npm/v/react-lazy.svg)](https://www.npmjs.org/package/react-lazy)
[![Build Status](https://travis-ci.org/Merri/react-lazy.svg)](https://travis-ci.org/Merri/react-lazy)

Lazy loader container element that triggers load when element comes into view. Provides fallback for SEO and no-JS by
using a `noscript` element. This means your images and/or content can be crawled by search engines that are not
JavaScript aware. Also means this component supports universal rendering (isomorphic JS).

Works for **both vertical and horizontal scrolling**, which is also unlike some other solutions.

[View demo](https://merri.github.io/react-lazy/)


## Why lazy load content such as images?

You want to save your bandwidth and/or server load. As a side effect you may also gain some performance benefits on
client side, especially on mobile devices. However the main benefit (and main purpose) for you should always be the
reduction of bandwidth/server load.

Likely side effect of lazy loading is that user may see content flashing as it comes into view; sometimes with a lot of
delay as it depends on connectivity. You can make the experience less flickery by adding a transition when image is
loaded (a bit harder to develop) or by giving `Lazy` a large cushion (500 pixels or more) to load image before it is
actually in the viewport. Using both strategies together is recommended. You can test the experience on your own site by
dropping mobile connection to 2G / edge.

Chrome developer tools also has network throttling so you don't need to get yourself into a train to nowhere to test how
well or poorly your site works in high latency conditions. However it is also recommended you do get yourself into a
train to nowhere as it does good for your mind and soul to abandon the hectic although convenient city lifestyle every
once in a while.


## Usage

A sample for targetting a single image. You are encouraged to give the container lazy element an explicit size as can
be seen in the CSS below. Also, use of CSS is recommended as you can't know the height of a container in JavaScript code
when rendering a responsive website, which is highly likely to be the case these days.

```css
/* sample of traditional CSS centered thumbnail styling */
.image-link {
    display: inline-block;
    margin: 5px;
    position: relative;
    text-align: center;
}

.image-link--100px {
    height: 100px;
    line-height: 98px;
    width: 100px;
}

.image-link__image {
    line-height: 1;
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
}
```

```jsx
import { Lazy } from 'react-lazy'

...

    <Lazy component="a" href="/" className="image-link image-link--100px" ltIE9>
        <img alt="My Lazy Loaded Image" className="image-link__image" src="my-lazy-loaded-image.png" />
    </Lazy>
```

**Output HTML**

```html
<a href="/" class="image-link image-link--100px">
    <!--[if IE 9]><!--><noscript><!--<![endif]-->
        <img alt="My Lazy Loaded Image" class="image-link__image" src="my-lazy-loaded-image.png" />
    <!--[if IE 9]><!--></noscript><!--<![endif]-->
</a>
```


## Features

**TL;DR**

1. Use of `noscript` ensures search engines can see the images.
2. Use of `noscript` allows images to be rendered even in case JavaScript is disabled.
3. Optional: IE conditional comments allow rendering images in IE8 and earlier where your JS code does not execute.


### `cushion`

You can apply "cushion" around elements so they are loaded slighly before coming into the actual viewport:

```jsx
// element content appear if it is in viewport or within 100px radius of it
<Lazy cushion={100}>...</Lazy>
```


### `imgWrapperComponent`

Allows you to toggle a render where given component is rendered around all contained img elements, while still rendering
all the other children as usual.

```jsx
<Lazy component="ul" className="thumbnail-list" imgWrapperComponent={MyThumbnailPlaceholder}>
    {imagesWithProps.map((props, index) =>
        <li key={index} className="thumbnail-list__item"><img {...props} /></li>
    )}
</Lazy>
```

Will result in HTML like:

```html
<ul class="thumbnail-list">
    <li class="thumbnail-list__item">
        <div class="my-thumbnail-placeholder">
            <noscript>
                <img alt="My Image" class="my-thumbnail" src="my-image.png" />
            </noscript>
        </div>
    </li>
</ul>
```

Which will change to a DOM tree like this when coming into viewport:

```html
<ul class="thumbnail-list">
    <li class="thumbnail-list__item">
        <img alt="My Image" class="my-thumbnail" src="my-image.png" />
    </li>
</ul>
```

You can also have Lazy containers inside Lazy containers.


### `ltIE9`

Renders Internet Explorer 8 friendly syntax by adding conditional comments around `noscript`, effectively hiding
existance of the tag from IE8 and earlier. This allows for minimal legacy browser support, since it is highly unlikely
anyone writes their JS to execute on IE8 anymore.

Essentially this feature allows to render a visually non-broken page to users of legacy browsers, making it possible to
give minimally acceptable user experience to users of browsers that should be dead.

This means there is no lazy rendering on legacy browsers, images load immediately.


### `onLoad`

You can also get notified on just before lazy load switch render happens:

```jsx
<Lazy onLoad={yourCustomFunction}>...</Lazy>
```


### `checkElementsInViewport`

Finally, you can also manually trigger checking for elements in viewport, which can be useful if you toggle element
resize (which won't cause resize or scroll events). Or you can use setInterval if you want to be very lazy.

```js
import { checkElementsInViewport } from 'react-lazy'

// now you're being a very lazy dev...
setInterval(checkElementsInViewport, 250)
```

## Notes about performance

`checkElementsInViewport` is debounced by 50ms so it never executes more than 20 times a second. Checking element's
position in viewport is costly. For best performance it is recommended to use `imgWrapperComponent` and have multiple
images inside a single Lazy container as this means only the container's position in viewport is checked for, not the
position of every single image component.


## Developing

```
npm install
npm run build
npm test
```

**Note!** This component uses jsdom in it's tests. This means you may need to install stuff, especially on
Windows. The following is copied from [node-jsdom's readme](https://github.com/darrylwest/node-jsdom):

### Contextify

[Contextify](https://npmjs.org/package/contextify) is a dependency of jsdom, used for running `<script>` tags within the
page. In other words, it allows jsdom, which is run in Node.js, to run strings of JavaScript in an isolated environment
that pretends to be a browser environment instead of a server. You can see how this is an important feature.

Unfortunately, doing this kind of magic requires C++. And in Node.js, using C++ from JavaScript means using "native
modules." Native modules are compiled at installation time so that they work precisely for your machine; that is, you
don't download a contextify binary from npm, but instead build one locally after downloading the source from npm.

Getting C++ compiled within npm's installation system can be tricky, especially for Windows users. Thus, one of the most
common problems with jsdom is trying to use it without the proper compilation tools installed. Here's what you need to
compile Contextify, and thus to install jsdom:

#### Windows

- The latest version of [Node.js for Windows](http://nodejs.org/download/)
- A copy of [Visual Studio Express 2013 for Windows Desktop](http://www.visualstudio.com/downloads/download-visual-studio-vs#d-express-windows-desktop)
- A copy of [Python 2.7](http://www.python.org/download/), installed in the default location of `C:\Python27`
- Set your system environment variable GYP_MSVS_VERSION like so (assuming you have Visual Studio 2013 installed):
  ```shell
  setx GYP_MSVS_VERSION 2013
  ```

- Restart your command prompt window to ensure required path variables are present.

There are some slight modifications to this that can work; for example other Visual Studio versions often work too. But
it's tricky, so start with the basics!

#### Mac

- XCode needs to be installed
- "Command line tools for XCode" need to be installed
- Launch XCode once to accept the license, etc. and ensure it's properly installed

#### Linux

You'll need various build tools installed, like `make`, Python 2.7, and a compiler toolchain. How to install these will
be specific to your distro, if you don't already have them.
