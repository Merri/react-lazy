# react-lazy
[![Version](http://img.shields.io/npm/v/react-lazy.svg)](https://www.npmjs.org/package/react-lazy)
[![Build Status](https://travis-ci.org/Merri/react-lazy.svg)](https://travis-ci.org/Merri/react-lazy)

Lazy loader container element that triggers load when element comes into view. Provides fallback for SEO and no-JS by
using a `noscript` element, a unique feature compared to other solutions. This means your images and/or content can be
crawled by search engines that are not JavaScript aware. Also means this component supports isomorphic rendering.

Works for **both vertical and horizontal scrolling**, which is also unlike some other solutions.

[View demo](https://merri.github.io/react-lazy/)

## Why lazy load content such as images?

You want to save your bandwidth and/or server load. As a side effect you may also gain some performance benefits on
client side, especially on mobile devices. However the main benefit (and main purpose) for you should always be the
reduction of bandwidth/server load.

Another side effect of lazy loading is that user may see content flashing as it comes into view; sometimes with a lot of
delay as it depends on connectivity.

## Usage

A sample for targetting a single image. You are encouraged to give the container lazy element an explicit size, as can
be seen in the CSS below.

```css
/* SAMPLE CSS */
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
// ES2015
import {Lazy} from 'react-lazy'
// or ES5
var reactLazy = require('react-lazy')
var Lazy = reactLazy.Lazy

...

    <Lazy nodeName="a" href="/" className="image-link image-link--100px">
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

## Why IE conditional comments?

You probably develop your site in a way that your scripts don't really run on Internet Explorer 8. Maybe you see just
enough trouble to make things render and work just enough that IE8 user can browse around without things being unusably
wrong. The above syntax ensures that IE9+, modern browsers and crawlers do notice the `noscript` tag, but IE8 and below
will not see it, therefore causing a non-lazy load of the content immediately upon first browser render.

In other words, if you want to have minimal support in legacy browsers when using this component... you can have that!
This component **does not** support lazy loading in any form in Internet Explorer 8 and older.

## Other features

`react-lazy` exposes [verge](https://github.com/ryanve/verge), you can use it with
`import {verge} from 'react-lazy'` or `var verge = require('react-lazy').verge`

You can apply "cushion" around elements so they are loaded slighly before coming into the actual viewport:

```jsx
// element content appear if it is in viewport or within 100px radius of it
<Lazy cushion={100}>...</Lazy>
```

You can also get notified on just before lazy load switch render happens:

```jsx
<Lazy onLoad={yourCustomFunction}>...</Lazy>
```

Finally, you can also manually trigger checking for elements in viewport, which can be useful if you toggle element
resize (which won't cause resize or scroll events). Or you can use setInterval if you want to be very lazy.

```js
import {checkElementsInViewport} from 'react-lazy'

// now you're being a very lazy dev...
setInterval(checkElementsInViewport, 250)
```

## Developing

```
git clone git@github.com:merri/react-lazy.git
cd react-lazy
npm install
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
