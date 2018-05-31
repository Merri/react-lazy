'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseRootMargin = parseRootMargin;
exports.shallowCompare = shallowCompare;
// from @researchgate/react-intersection-observer
var marginRE = /^-?\d*\.?\d+(px|%)$/;

function parseRootMargin(rootMargin) {
    var marginString = rootMargin ? rootMargin.trim() : '0px';

    var _marginString$split$m = marginString.split(/\s+/).map(function (margin) {
        if (!marginRE.test(margin)) {
            throw new Error('rootMargin must be a string literal containing pixels and/or percent values');
        }

        return margin;
    }),
        _marginString$split$m2 = _slicedToArray(_marginString$split$m, 4),
        _marginString$split$m3 = _marginString$split$m2[0],
        m0 = _marginString$split$m3 === undefined ? '0px' : _marginString$split$m3,
        _marginString$split$m4 = _marginString$split$m2[1],
        m1 = _marginString$split$m4 === undefined ? m0 : _marginString$split$m4,
        _marginString$split$m5 = _marginString$split$m2[2],
        m2 = _marginString$split$m5 === undefined ? m0 : _marginString$split$m5,
        _marginString$split$m6 = _marginString$split$m2[3],
        m3 = _marginString$split$m6 === undefined ? m1 : _marginString$split$m6;

    return m0 + ' ' + m1 + ' ' + m2 + ' ' + m3;
}

function shallowCompare(next, prev) {
    if (Array.isArray(next) && Array.isArray(prev)) {
        if (next.length === prev.length) {
            return next.some(function (_, index) {
                return shallowCompare(next[index], prev[index]);
            });
        }
    }

    return next !== prev;
}