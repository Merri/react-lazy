'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.bindEventsToListener = bindEventsToListener;
exports.getEventListenerOptions = getEventListenerOptions;
exports.isEventListenerOptionSupported = isEventListenerOptionSupported;
var options = ['capture', 'once', 'passive'];
var AEL = 'addEventListener';
var REL = 'removeEventListener';
var supports = {
    dom: !!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window[AEL] && window[REL] && Object.defineProperty)
};

if (supports.dom) {
    var check = {};

    options.forEach(function (option) {
        Object.defineProperty(check, option, function () {
            supports.optionsObject = true;
            supports[option] = true;
        });
    });

    window[AEL]('null', null, check);
    window[REL]('null', null, check);
}

function bindEventsToListener(target, events, listener, options) {
    if (!supports.dom || !target || !target[AEL] || !Array.isArray(events) || typeof listener !== 'function') {
        return false;
    }

    var opts = getEventListenerOptions(options);

    events.forEach(function (event) {
        target[AEL](event, listener, opts);
    });

    return function unbindEventsOfListener() {
        events.forEach(function (event) {
            target[REL](event, listener, opts);
        });
    };
}

function getEventListenerOptions(options) {
    if (supports.optionsObject && Object.keys(options).every(isEventListenerOptionSupported)) {
        return options;
    }

    return !!(options && options.capture);
}

function isEventListenerOptionSupported(option) {
    if (options.includes(option)) {
        return supports[option] === true;
    }

    throw new Error('Option must be exactly one of: ' + options.join(', '));
}