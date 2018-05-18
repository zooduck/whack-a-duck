// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {

},{"./..\\images\\duck.gif":[["duck.e454fcf4.gif",29],29]}],55:[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
},{}],56:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ('production' !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],62:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyObject = {};

if ('production' !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],59:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],31:[function(require,module,exports) {
/** @license React v16.3.2
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
var m = require("object-assign"),
    n = require("fbjs/lib/invariant"),
    p = require("fbjs/lib/emptyObject"),
    q = require("fbjs/lib/emptyFunction"),
    r = "function" === typeof Symbol && Symbol["for"],
    t = r ? Symbol["for"]("react.element") : 60103,
    u = r ? Symbol["for"]("react.portal") : 60106,
    v = r ? Symbol["for"]("react.fragment") : 60107,
    w = r ? Symbol["for"]("react.strict_mode") : 60108,
    x = r ? Symbol["for"]("react.provider") : 60109,
    y = r ? Symbol["for"]("react.context") : 60110,
    z = r ? Symbol["for"]("react.async_mode") : 60111,
    A = r ? Symbol["for"]("react.forward_ref") : 60112,
    B = "function" === typeof Symbol && Symbol.iterator;function C(a) {
  for (var b = arguments.length - 1, e = "http://reactjs.org/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);n(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
}var D = { isMounted: function () {
    return !1;
  }, enqueueForceUpdate: function () {}, enqueueReplaceState: function () {}, enqueueSetState: function () {} };
function E(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || D;
}E.prototype.isReactComponent = {};E.prototype.setState = function (a, b) {
  "object" !== typeof a && "function" !== typeof a && null != a ? C("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};function F() {}F.prototype = E.prototype;function G(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || D;
}var H = G.prototype = new F();
H.constructor = G;m(H, E.prototype);H.isPureReactComponent = !0;var I = { current: null },
    J = Object.prototype.hasOwnProperty,
    K = { key: !0, ref: !0, __self: !0, __source: !0 };
function L(a, b, e) {
  var c = void 0,
      d = {},
      g = null,
      h = null;if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) J.call(b, c) && !K.hasOwnProperty(c) && (d[c] = b[c]);var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var k = Array(f), l = 0; l < f; l++) k[l] = arguments[l + 2];d.children = k;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === d[c] && (d[c] = f[c]);return { $$typeof: t, type: a, key: g, ref: h, props: d, _owner: I.current };
}
function M(a) {
  return "object" === typeof a && null !== a && a.$$typeof === t;
}function escape(a) {
  var b = { "\x3d": "\x3d0", ":": "\x3d2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var N = /\/+/g,
    O = [];function P(a, b, e, c) {
  if (O.length) {
    var d = O.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function Q(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > O.length && O.push(a);
}
function R(a, b, e, c) {
  var d = typeof a;if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case t:case u:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + S(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    d = a[h];var f = b + S(d, h);g += R(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) d = d.value, f = b + S(d, h++), g += R(d, f, e, c);else "object" === d && (e = "" + a, C("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function S(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function T(a, b) {
  a.func.call(a.context, b, a.count++);
}
function U(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? V(a, c, e, q.thatReturnsArgument) : null != a && (M(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(N, "$\x26/") + "/") + e, a = { $$typeof: t, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function V(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(N, "$\x26/") + "/");b = P(b, g, c, d);null == a || R(a, "", U, b);Q(b);
}
var W = { Children: { map: function (a, b, e) {
      if (null == a) return a;var c = [];V(a, c, null, b, e);return c;
    }, forEach: function (a, b, e) {
      if (null == a) return a;b = P(null, null, b, e);null == a || R(a, "", T, b);Q(b);
    }, count: function (a) {
      return null == a ? 0 : R(a, "", q.thatReturnsNull, null);
    }, toArray: function (a) {
      var b = [];V(a, b, null, q.thatReturnsArgument);return b;
    }, only: function (a) {
      M(a) ? void 0 : C("143");return a;
    } }, createRef: function () {
    return { current: null };
  }, Component: E, PureComponent: G, createContext: function (a, b) {
    void 0 === b && (b = null);a = { $$typeof: y,
      _calculateChangedBits: b, _defaultValue: a, _currentValue: a, _changedBits: 0, Provider: null, Consumer: null };a.Provider = { $$typeof: x, _context: a };return a.Consumer = a;
  }, forwardRef: function (a) {
    return { $$typeof: A, render: a };
  }, Fragment: v, StrictMode: w, unstable_AsyncMode: z, createElement: L, cloneElement: function (a, b, e) {
    null === a || void 0 === a ? C("267", a) : void 0;var c = void 0,
        d = m({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = I.current);void 0 !== b.key && (g = "" + b.key);var k = void 0;a.type && a.type.defaultProps && (k = a.type.defaultProps);for (c in b) J.call(b, c) && !K.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== k ? k[c] : b[c]);
    }c = arguments.length - 2;if (1 === c) d.children = e;else if (1 < c) {
      k = Array(c);for (var l = 0; l < c; l++) k[l] = arguments[l + 2];d.children = k;
    }return { $$typeof: t, type: a.type, key: g, ref: h, props: d, _owner: f };
  }, createFactory: function (a) {
    var b = L.bind(null, a);b.type = a;return b;
  }, isValidElement: M, version: "16.3.2", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: I, assign: m } },
    X = Object.freeze({ default: W }),
    Y = X && W || X;module.exports = Y["default"] ? Y["default"] : Y;
},{"object-assign":55,"fbjs/lib/invariant":56,"fbjs/lib/emptyObject":62,"fbjs/lib/emptyFunction":59}],20:[function(require,module,exports) {
'use strict';

if ('production' === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.production.min.js":31}],57:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],58:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;
},{}],60:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],75:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;
},{}],73:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = require('./isNode');

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;
},{"./isNode":75}],61:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = require('./isTextNode');

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;
},{"./isTextNode":73}],32:[function(require,module,exports) {
/** @license React v16.3.2
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';var ba=require("fbjs/lib/invariant"),ea=require("react"),m=require("fbjs/lib/ExecutionEnvironment"),A=require("object-assign"),C=require("fbjs/lib/emptyFunction"),fa=require("fbjs/lib/getActiveElement"),ha=require("fbjs/lib/shallowEqual"),ja=require("fbjs/lib/containsNode"),ka=require("fbjs/lib/emptyObject");
function D(a){for(var b=arguments.length-1,c="http://reactjs.org/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);ba(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}ea?void 0:D("227");
function ma(a,b,c,d,e,f,h,g,k){this._hasCaughtError=!1;this._caughtError=null;var v=Array.prototype.slice.call(arguments,3);try{b.apply(c,v)}catch(l){this._caughtError=l,this._hasCaughtError=!0}}
var E={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(a,b,c,d,e,f,h,g,k){ma.apply(E,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,h,g,k){E.invokeGuardedCallback.apply(this,arguments);if(E.hasCaughtError()){var v=E.clearCaughtError();E._hasRethrowError||(E._hasRethrowError=!0,E._rethrowError=v)}},rethrowCaughtError:function(){return na.apply(E,arguments)},hasCaughtError:function(){return E._hasCaughtError},clearCaughtError:function(){if(E._hasCaughtError){var a=
E._caughtError;E._caughtError=null;E._hasCaughtError=!1;return a}D("198")}};function na(){if(E._hasRethrowError){var a=E._rethrowError;E._rethrowError=null;E._hasRethrowError=!1;throw a;}}var oa=null,pa={};
function qa(){if(oa)for(var a in pa){var b=pa[a],c=oa.indexOf(a);-1<c?void 0:D("96",a);if(!ra[c]){b.extractEvents?void 0:D("97",a);ra[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],h=b,g=d;sa.hasOwnProperty(g)?D("99",g):void 0;sa[g]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&ta(k[e],h,g);e=!0}else f.registrationName?(ta(f.registrationName,h,g),e=!0):e=!1;e?void 0:D("98",d,a)}}}}
function ta(a,b,c){ua[a]?D("100",a):void 0;ua[a]=b;va[a]=b.eventTypes[c].dependencies}var ra=[],sa={},ua={},va={};function wa(a){oa?D("101"):void 0;oa=Array.prototype.slice.call(a);qa()}function xa(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];pa.hasOwnProperty(c)&&pa[c]===d||(pa[c]?D("102",c):void 0,pa[c]=d,b=!0)}b&&qa()}
var Ca=Object.freeze({plugins:ra,eventNameDispatchConfigs:sa,registrationNameModules:ua,registrationNameDependencies:va,possibleRegistrationNames:null,injectEventPluginOrder:wa,injectEventPluginsByName:xa}),Da=null,Ea=null,Fa=null;function Ga(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=Fa(d);E.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function Ha(a,b){null==b?D("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function Ia(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Ja=null;
function Ka(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)Ga(a,b,c[e],d[e]);else c&&Ga(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function La(a){return Ka(a,!0)}function Ma(a){return Ka(a,!1)}var Na={injectEventPluginOrder:wa,injectEventPluginsByName:xa};
function Oa(a,b){var c=a.stateNode;if(!c)return null;var d=Da(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?D("231",b,typeof c):void 0;
return c}function Pa(a,b){null!==a&&(Ja=Ha(Ja,a));a=Ja;Ja=null;a&&(b?Ia(a,La):Ia(a,Ma),Ja?D("95"):void 0,E.rethrowCaughtError())}function Qa(a,b,c,d){for(var e=null,f=0;f<ra.length;f++){var h=ra[f];h&&(h=h.extractEvents(a,b,c,d))&&(e=Ha(e,h))}Pa(e,!1)}var Ra=Object.freeze({injection:Na,getListener:Oa,runEventsInBatch:Pa,runExtractedEventsInBatch:Qa}),Sa=Math.random().toString(36).slice(2),F="__reactInternalInstance$"+Sa,Ta="__reactEventHandlers$"+Sa;
function Ua(a){if(a[F])return a[F];for(;!a[F];)if(a.parentNode)a=a.parentNode;else return null;a=a[F];return 5===a.tag||6===a.tag?a:null}function Va(a){if(5===a.tag||6===a.tag)return a.stateNode;D("33")}function Xa(a){return a[Ta]||null}var bb=Object.freeze({precacheFiberNode:function(a,b){b[F]=a},getClosestInstanceFromNode:Ua,getInstanceFromNode:function(a){a=a[F];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:Va,getFiberCurrentPropsFromNode:Xa,updateFiberProps:function(a,b){a[Ta]=b}});
function L(a){do a=a["return"];while(a&&5!==a.tag);return a?a:null}function cb(a,b,c){for(var d=[];a;)d.push(a),a=L(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}function db(a,b,c){if(b=Oa(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Ha(c._dispatchListeners,b),c._dispatchInstances=Ha(c._dispatchInstances,a)}function eb(a){a&&a.dispatchConfig.phasedRegistrationNames&&cb(a._targetInst,db,a)}
function fb(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?L(b):null;cb(b,db,a)}}function gb(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Oa(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Ha(c._dispatchListeners,b),c._dispatchInstances=Ha(c._dispatchInstances,a))}function hb(a){a&&a.dispatchConfig.registrationName&&gb(a._targetInst,null,a)}function ib(a){Ia(a,eb)}
function jb(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,h=0,g=e;g;g=L(g))h++;g=0;for(var k=f;k;k=L(k))g++;for(;0<h-g;)e=L(e),h--;for(;0<g-h;)f=L(f),g--;for(;h--;){if(e===f||e===f.alternate)break a;e=L(e);f=L(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){h=c.alternate;if(null!==h&&h===f)break;e.push(c);c=L(c)}for(c=[];d&&d!==f;){h=d.alternate;if(null!==h&&h===f)break;c.push(d);d=L(d)}for(d=0;d<e.length;d++)gb(e[d],"bubbled",a);for(a=c.length;0<a--;)gb(c[a],"captured",b)}
var kb=Object.freeze({accumulateTwoPhaseDispatches:ib,accumulateTwoPhaseDispatchesSkipTarget:function(a){Ia(a,fb)},accumulateEnterLeaveDispatches:jb,accumulateDirectDispatches:function(a){Ia(a,hb)}}),lb=null;function mb(){!lb&&m.canUseDOM&&(lb="textContent"in document.documentElement?"textContent":"innerText");return lb}var M={_root:null,_startText:null,_fallbackText:null};
function nb(){if(M._fallbackText)return M._fallbackText;var a,b=M._startText,c=b.length,d,e=ob(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var h=c-a;for(d=1;d<=h&&b[c-d]===e[f-d];d++);M._fallbackText=e.slice(a,1<d?1-d:void 0);return M._fallbackText}function ob(){return"value"in M._root?M._root.value:M._root[mb()]}
var pb="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),qb={type:null,target:null,currentTarget:C.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function N(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?C.thatReturnsTrue:C.thatReturnsFalse;this.isPropagationStopped=C.thatReturnsFalse;return this}
A(N.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=C.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=C.thatReturnsTrue)},persist:function(){this.isPersistent=C.thatReturnsTrue},isPersistent:C.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<pb.length;a++)this[pb[a]]=null}});N.Interface=qb;N.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;A(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=A({},d.Interface,a);c.extend=d.extend;rb(c);return c};rb(N);
function sb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function tb(a){a instanceof this?void 0:D("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function rb(a){a.eventPool=[];a.getPooled=sb;a.release=tb}var ub=N.extend({data:null}),vb=N.extend({data:null}),wb=[9,13,27,32],xb=m.canUseDOM&&"CompositionEvent"in window,yb=null;m.canUseDOM&&"documentMode"in document&&(yb=document.documentMode);
var zb=m.canUseDOM&&"TextEvent"in window&&!yb,Ab=m.canUseDOM&&(!xb||yb&&8<yb&&11>=yb),Bb=String.fromCharCode(32),Kb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},Lb=!1;
function Mb(a,b){switch(a){case "topKeyUp":return-1!==wb.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;default:return!1}}function Nb(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Ob=!1;function Pb(a,b){switch(a){case "topCompositionEnd":return Nb(b);case "topKeyPress":if(32!==b.which)return null;Lb=!0;return Bb;case "topTextInput":return a=b.data,a===Bb&&Lb?null:a;default:return null}}
function Qb(a,b){if(Ob)return"topCompositionEnd"===a||!xb&&Mb(a,b)?(a=nb(),M._root=null,M._startText=null,M._fallbackText=null,Ob=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return Ab?null:b.data;default:return null}}
var Rb={eventTypes:Kb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(xb)b:{switch(a){case "topCompositionStart":e=Kb.compositionStart;break b;case "topCompositionEnd":e=Kb.compositionEnd;break b;case "topCompositionUpdate":e=Kb.compositionUpdate;break b}e=void 0}else Ob?Mb(a,c)&&(e=Kb.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(e=Kb.compositionStart);e?(Ab&&(Ob||e!==Kb.compositionStart?e===Kb.compositionEnd&&Ob&&(f=nb()):(M._root=d,M._startText=ob(),Ob=!0)),e=ub.getPooled(e,
b,c,d),f?e.data=f:(f=Nb(c),null!==f&&(e.data=f)),ib(e),f=e):f=null;(a=zb?Pb(a,c):Qb(a,c))?(b=vb.getPooled(Kb.beforeInput,b,c,d),b.data=a,ib(b)):b=null;return null===f?b:null===b?f:[f,b]}},Sb=null,Tb={injectFiberControlledHostComponent:function(a){Sb=a}},Ub=null,Vb=null;function Wb(a){if(a=Ea(a)){Sb&&"function"===typeof Sb.restoreControlledState?void 0:D("194");var b=Da(a.stateNode);Sb.restoreControlledState(a.stateNode,a.type,b)}}function Xb(a){Ub?Vb?Vb.push(a):Vb=[a]:Ub=a}
function Yb(){return null!==Ub||null!==Vb}function Zb(){if(Ub){var a=Ub,b=Vb;Vb=Ub=null;Wb(a);if(b)for(a=0;a<b.length;a++)Wb(b[a])}}var $b=Object.freeze({injection:Tb,enqueueStateRestore:Xb,needsStateRestore:Yb,restoreStateIfNeeded:Zb});function ac(a,b){return a(b)}function bc(a,b,c){return a(b,c)}function cc(){}var dc=!1;function ec(a,b){if(dc)return a(b);dc=!0;try{return ac(a,b)}finally{dc=!1,Yb()&&(cc(),Zb())}}
var fc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gc(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!fc[a.type]:"textarea"===b?!0:!1}function hc(a){a=a.target||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}
function ic(a,b){if(!m.canUseDOM||b&&!("addEventListener"in document))return!1;a="on"+a;b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function jc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function kc(a){var b=jc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),Object.defineProperty(a,b,{enumerable:c.enumerable}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
function lc(a){a._valueTracker||(a._valueTracker=kc(a))}function mc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=jc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
var nc=ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,O="function"===typeof Symbol&&Symbol["for"],oc=O?Symbol["for"]("react.element"):60103,pc=O?Symbol["for"]("react.call"):60104,qc=O?Symbol["for"]("react.return"):60105,rc=O?Symbol["for"]("react.portal"):60106,sc=O?Symbol["for"]("react.fragment"):60107,tc=O?Symbol["for"]("react.strict_mode"):60108,uc=O?Symbol["for"]("react.provider"):60109,vc=O?Symbol["for"]("react.context"):60110,wc=O?Symbol["for"]("react.async_mode"):60111,
xc=O?Symbol["for"]("react.forward_ref"):60112,yc="function"===typeof Symbol&&Symbol.iterator;function zc(a){if(null===a||"undefined"===typeof a)return null;a=yc&&a[yc]||a["@@iterator"];return"function"===typeof a?a:null}
function Ac(a){a=a.type;if("function"===typeof a)return a.displayName||a.name;if("string"===typeof a)return a;switch(a){case sc:return"ReactFragment";case rc:return"ReactPortal";case pc:return"ReactCall";case qc:return"ReactReturn"}if("object"===typeof a&&null!==a)switch(a.$$typeof){case xc:return a=a.render.displayName||a.render.name||"",""!==a?"ForwardRef("+a+")":"ForwardRef"}return null}
function Bc(a){var b="";do{a:switch(a.tag){case 0:case 1:case 2:case 5:var c=a._debugOwner,d=a._debugSource;var e=Ac(a);var f=null;c&&(f=Ac(c));c=d;e="\n    in "+(e||"Unknown")+(c?" (at "+c.fileName.replace(/^.*[\\\/]/,"")+":"+c.lineNumber+")":f?" (created by "+f+")":"");break a;default:e=""}b+=e;a=a["return"]}while(a);return b}
var Cc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Dc={},Ec={};function Fc(a){if(Ec.hasOwnProperty(a))return!0;if(Dc.hasOwnProperty(a))return!1;if(Cc.test(a))return Ec[a]=!0;Dc[a]=!0;return!1}
function Gc(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function Hc(a,b,c,d){if(null===b||"undefined"===typeof b||Gc(a,b,c,d))return!0;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}
function U(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b}var V={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){V[a]=new U(a,0,!1,a,null)});
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];V[b]=new U(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){V[a]=new U(a,2,!1,a.toLowerCase(),null)});["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(a){V[a]=new U(a,2,!1,a,null)});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){V[a]=new U(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){V[a]=new U(a,3,!0,a.toLowerCase(),null)});["capture","download"].forEach(function(a){V[a]=new U(a,4,!1,a.toLowerCase(),null)});
["cols","rows","size","span"].forEach(function(a){V[a]=new U(a,6,!1,a.toLowerCase(),null)});["rowSpan","start"].forEach(function(a){V[a]=new U(a,5,!1,a.toLowerCase(),null)});var Sc=/[\-:]([a-z])/g;function Tc(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Sc,
Tc);V[b]=new U(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Sc,Tc);V[b]=new U(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Sc,Tc);V[b]=new U(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});V.tabIndex=new U("tabIndex",1,!1,"tabindex",null);
function Uc(a,b,c,d){var e=V.hasOwnProperty(b)?V[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Hc(b,c,e,d)&&(c=null),d||null===e?Fc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function Vc(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Wc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Xc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Yc(a,b){b=b.checked;null!=b&&Uc(a,"checked",b,!1)}
function Zc(a,b){Yc(a,b);var c=Xc(b.value);if(null!=c)if("number"===b.type){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);b.hasOwnProperty("value")?$c(a,b.type,c):b.hasOwnProperty("defaultValue")&&$c(a,b.type,Xc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function ad(a,b){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue"))""===a.value&&(a.value=""+a._wrapperState.initialValue),a.defaultValue=""+a._wrapperState.initialValue;b=a.name;""!==b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)}function $c(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}
function Xc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}var bd={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}};function cd(a,b,c){a=N.getPooled(bd.change,a,b,c);a.type="change";Xb(c);ib(a);return a}var dd=null,ed=null;function fd(a){Pa(a,!1)}
function gd(a){var b=Va(a);if(mc(b))return a}function hd(a,b){if("topChange"===a)return b}var id=!1;m.canUseDOM&&(id=ic("input")&&(!document.documentMode||9<document.documentMode));function jd(){dd&&(dd.detachEvent("onpropertychange",kd),ed=dd=null)}function kd(a){"value"===a.propertyName&&gd(ed)&&(a=cd(ed,a,hc(a)),ec(fd,a))}function ld(a,b,c){"topFocus"===a?(jd(),dd=b,ed=c,dd.attachEvent("onpropertychange",kd)):"topBlur"===a&&jd()}
function md(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return gd(ed)}function nd(a,b){if("topClick"===a)return gd(b)}function od(a,b){if("topInput"===a||"topChange"===a)return gd(b)}
var pd={eventTypes:bd,_isInputEventSupported:id,extractEvents:function(a,b,c,d){var e=b?Va(b):window,f=void 0,h=void 0,g=e.nodeName&&e.nodeName.toLowerCase();"select"===g||"input"===g&&"file"===e.type?f=hd:gc(e)?id?f=od:(f=md,h=ld):(g=e.nodeName)&&"input"===g.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=nd);if(f&&(f=f(a,b)))return cd(f,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&$c(e,"number",e.value)}},qd=N.extend({view:null,
detail:null}),rd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=rd[a])?!!b[a]:!1}function td(){return sd}
var ud=qd.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:td,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}}),vd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},wd={eventTypes:vd,extractEvents:function(a,
b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?Ua(b):null):a=null;if(a===b)return null;var f=null==a?e:Va(a);e=null==b?e:Va(b);var h=ud.getPooled(vd.mouseLeave,a,c,d);h.type="mouseleave";h.target=f;h.relatedTarget=e;c=ud.getPooled(vd.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=
f;jb(h,c,a,b);return[h,c]}};function xd(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if(0!==(b.effectTag&2))return 1;for(;b["return"];)if(b=b["return"],0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function yd(a){return(a=a._reactInternalFiber)?2===xd(a):!1}function zd(a){2!==xd(a)?D("188"):void 0}
function Ad(a){var b=a.alternate;if(!b)return b=xd(a),3===b?D("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var h=e.child;h;){if(h===c)return zd(e),a;if(h===d)return zd(e),b;h=h.sibling}D("188")}if(c["return"]!==d["return"])c=e,d=f;else{h=!1;for(var g=e.child;g;){if(g===c){h=!0;c=e;d=f;break}if(g===d){h=!0;d=e;c=f;break}g=g.sibling}if(!h){for(g=f.child;g;){if(g===c){h=!0;c=f;d=e;break}if(g===d){h=!0;d=f;c=e;break}g=g.sibling}h?
void 0:D("189")}}c.alternate!==d?D("190"):void 0}3!==c.tag?D("188"):void 0;return c.stateNode.current===c?a:b}function Bd(a){a=Ad(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}
function Cd(a){a=Ad(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}var Dd=N.extend({animationName:null,elapsedTime:null,pseudoElement:null}),Ed=N.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Fd=qd.extend({relatedTarget:null});
function Gd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var Hd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Id={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jd=qd.extend({key:function(a){if(a.key){var b=Hd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=Gd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Id[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:td,charCode:function(a){return"keypress"===
a.type?Gd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?Gd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Kd=ud.extend({dataTransfer:null}),Ld=qd.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:td}),Md=N.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),Nd=ud.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),Od={},Pd={};function Qd(a,b){var c=a[0].toUpperCase()+a.slice(1),d="on"+c;c="top"+c;b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Od[a]=b;Pd[c]=b}
"blur cancel click close contextMenu copy cut doubleClick dragEnd dragStart drop focus input invalid keyDown keyPress keyUp mouseDown mouseUp paste pause play rateChange reset seeked submit touchCancel touchEnd touchStart volumeChange".split(" ").forEach(function(a){Qd(a,!0)});
"abort animationEnd animationIteration animationStart canPlay canPlayThrough drag dragEnter dragExit dragLeave dragOver durationChange emptied encrypted ended error load loadedData loadedMetadata loadStart mouseMove mouseOut mouseOver playing progress scroll seeking stalled suspend timeUpdate toggle touchMove transitionEnd waiting wheel".split(" ").forEach(function(a){Qd(a,!1)});
var Rd={eventTypes:Od,isInteractiveTopLevelEventType:function(a){a=Pd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Pd[a];if(!e)return null;switch(a){case "topKeyPress":if(0===Gd(c))return null;case "topKeyDown":case "topKeyUp":a=Jd;break;case "topBlur":case "topFocus":a=Fd;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":a=
ud;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":a=Kd;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":a=Ld;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":a=Dd;break;case "topTransitionEnd":a=Md;break;case "topScroll":a=qd;break;case "topWheel":a=Nd;break;case "topCopy":case "topCut":case "topPaste":a=Ed;break;default:a=
N}b=a.getPooled(e,b,c,d);ib(b);return b}},Sd=Rd.isInteractiveTopLevelEventType,Td=[];function Ud(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c["return"];)c=c["return"];c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=Ua(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],Qa(a.topLevelType,b,a.nativeEvent,hc(a.nativeEvent))}var Vd=!0;function Wd(a){Vd=!!a}
function W(a,b,c){if(!c)return null;a=(Sd(a)?Xd:Yd).bind(null,a);c.addEventListener(b,a,!1)}function Zd(a,b,c){if(!c)return null;a=(Sd(a)?Xd:Yd).bind(null,a);c.addEventListener(b,a,!0)}function Xd(a,b){bc(Yd,a,b)}
function Yd(a,b){if(Vd){var c=hc(b);c=Ua(c);null!==c&&"number"===typeof c.tag&&2!==xd(c)&&(c=null);if(Td.length){var d=Td.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{ec(Ud,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Td.length&&Td.push(a)}}}
var $d=Object.freeze({get _enabled(){return Vd},setEnabled:Wd,isEnabled:function(){return Vd},trapBubbledEvent:W,trapCapturedEvent:Zd,dispatchEvent:Yd});function ae(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var be={animationend:ae("Animation","AnimationEnd"),animationiteration:ae("Animation","AnimationIteration"),animationstart:ae("Animation","AnimationStart"),transitionend:ae("Transition","TransitionEnd")},ce={},de={};m.canUseDOM&&(de=document.createElement("div").style,"AnimationEvent"in window||(delete be.animationend.animation,delete be.animationiteration.animation,delete be.animationstart.animation),"TransitionEvent"in window||delete be.transitionend.transition);
function ee(a){if(ce[a])return ce[a];if(!be[a])return a;var b=be[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in de)return ce[a]=b[c];return a}
var fe={topAnimationEnd:ee("animationend"),topAnimationIteration:ee("animationiteration"),topAnimationStart:ee("animationstart"),topBlur:"blur",topCancel:"cancel",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",
topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoad:"load",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topScroll:"scroll",topSelectionChange:"selectionchange",topTextInput:"textInput",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",
topTouchStart:"touchstart",topTransitionEnd:ee("transitionend"),topWheel:"wheel"},ge={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",
topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",topWaiting:"waiting"},he={},ie=0,je="_reactListenersID"+(""+Math.random()).slice(2);function ke(a){Object.prototype.hasOwnProperty.call(a,je)||(a[je]=ie++,he[a[je]]={});return he[a[je]]}function le(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function me(a,b){var c=le(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=le(c)}}function ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)}
var oe=m.canUseDOM&&"documentMode"in document&&11>=document.documentMode,pe={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},qe=null,re=null,se=null,te=!1;
function ue(a,b){if(te||null==qe||qe!==fa())return null;var c=qe;"selectionStart"in c&&ne(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return se&&ha(se,c)?null:(se=c,a=N.getPooled(pe.select,re,a,b),a.type="select",a.target=qe,ib(a),a)}
var ve={eventTypes:pe,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=ke(e);f=va.onSelect;for(var h=0;h<f.length;h++){var g=f[h];if(!e.hasOwnProperty(g)||!e[g]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?Va(b):window;switch(a){case "topFocus":if(gc(e)||"true"===e.contentEditable)qe=e,re=b,se=null;break;case "topBlur":se=re=qe=null;break;case "topMouseDown":te=!0;break;case "topContextMenu":case "topMouseUp":return te=!1,ue(c,d);case "topSelectionChange":if(oe)break;
case "topKeyDown":case "topKeyUp":return ue(c,d)}return null}};Na.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));Da=bb.getFiberCurrentPropsFromNode;Ea=bb.getInstanceFromNode;Fa=bb.getNodeFromInstance;Na.injectEventPluginsByName({SimpleEventPlugin:Rd,EnterLeaveEventPlugin:wd,ChangeEventPlugin:pd,SelectEventPlugin:ve,BeforeInputEventPlugin:Rb});
function xe(a,b,c,d){this.tag=a;this.key=c;this.stateNode=this.type=null;this.sibling=this.child=this["return"]=null;this.index=0;this.ref=null;this.pendingProps=b;this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function ze(a,b,c){var d=a.alternate;null===d?(d=new xe(a.tag,b,a.key,a.mode),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=b,d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function Ae(a,b,c){var d=a.type,e=a.key;a=a.props;var f=void 0;if("function"===typeof d)f=d.prototype&&d.prototype.isReactComponent?2:0;else if("string"===typeof d)f=5;else switch(d){case sc:return Be(a.children,b,c,e);case wc:f=11;b|=3;break;case tc:f=11;b|=2;break;case pc:f=7;break;case qc:f=9;break;default:if("object"===typeof d&&null!==d)switch(d.$$typeof){case uc:f=13;break;case vc:f=12;break;case xc:f=14;break;default:if("number"===typeof d.tag)return b=d,b.pendingProps=a,b.expirationTime=c,
b;D("130",null==d?d:typeof d,"")}else D("130",null==d?d:typeof d,"")}b=new xe(f,a,e,b);b.type=d;b.expirationTime=c;return b}function Be(a,b,c,d){a=new xe(10,a,d,b);a.expirationTime=c;return a}function Ce(a,b,c){a=new xe(6,a,null,b);a.expirationTime=c;return a}function De(a,b,c){b=new xe(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}var Ee=null,Fe=null;
function Ge(a){return function(b){try{return a(b)}catch(c){}}}function He(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Ee=Ge(function(a){return b.onCommitFiberRoot(c,a)});Fe=Ge(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function Ie(a){"function"===typeof Ee&&Ee(a)}function Je(a){"function"===typeof Fe&&Fe(a)}new Set;
function Ke(a){return{baseState:a,expirationTime:0,first:null,last:null,callbackList:null,hasForceUpdate:!1,isInitialized:!1,capturedValues:null}}function Le(a,b){null===a.last?a.first=a.last=b:(a.last.next=b,a.last=b);if(0===a.expirationTime||a.expirationTime>b.expirationTime)a.expirationTime=b.expirationTime}var Me=void 0,Ne=void 0;
function Oe(a){Me=Ne=null;var b=a.alternate,c=a.updateQueue;null===c&&(c=a.updateQueue=Ke(null));null!==b?(a=b.updateQueue,null===a&&(a=b.updateQueue=Ke(null))):a=null;Me=c;Ne=a!==c?a:null}function Pe(a,b){Oe(a);a=Me;var c=Ne;null===c?Le(a,b):null===a.last||null===c.last?(Le(a,b),Le(c,b)):(Le(a,b),c.last=b)}function Qe(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}
function Re(a,b,c,d,e,f){null!==a&&a.updateQueue===c&&(c=b.updateQueue={baseState:c.baseState,expirationTime:c.expirationTime,first:c.first,last:c.last,isInitialized:c.isInitialized,capturedValues:c.capturedValues,callbackList:null,hasForceUpdate:!1});c.expirationTime=0;c.isInitialized?a=c.baseState:(a=c.baseState=b.memoizedState,c.isInitialized=!0);for(var h=!0,g=c.first,k=!1;null!==g;){var v=g.expirationTime;if(v>f){var l=c.expirationTime;if(0===l||l>v)c.expirationTime=v;k||(k=!0,c.baseState=a)}else{k||
(c.first=g.next,null===c.first&&(c.last=null));if(g.isReplace)a=Qe(g,d,a,e),h=!0;else if(v=Qe(g,d,a,e))a=h?A({},a,v):A(a,v),h=!1;g.isForced&&(c.hasForceUpdate=!0);null!==g.callback&&(v=c.callbackList,null===v&&(v=c.callbackList=[]),v.push(g));null!==g.capturedValue&&(v=c.capturedValues,null===v?c.capturedValues=[g.capturedValue]:v.push(g.capturedValue))}g=g.next}null!==c.callbackList?b.effectTag|=32:null!==c.first||c.hasForceUpdate||null!==c.capturedValues||(b.updateQueue=null);k||(c.baseState=a);
return a}function Se(a,b){var c=a.callbackList;if(null!==c)for(a.callbackList=null,a=0;a<c.length;a++){var d=c[a],e=d.callback;d.callback=null;"function"!==typeof e?D("191",e):void 0;e.call(b)}}
function Te(a,b,c,d,e){function f(a,b,c,d,e,f){if(null===b||null!==a.updateQueue&&a.updateQueue.hasForceUpdate)return!0;var n=a.stateNode;a=a.type;return"function"===typeof n.shouldComponentUpdate?n.shouldComponentUpdate(c,e,f):a.prototype&&a.prototype.isPureReactComponent?!ha(b,c)||!ha(d,e):!0}function h(a,b){b.updater=r;a.stateNode=b;b._reactInternalFiber=a}function g(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&r.enqueueReplaceState(b,b.state,null)}function k(a,b,c,d){a=a.type;if("function"===typeof a.getDerivedStateFromProps)return a.getDerivedStateFromProps.call(null,c,d)}var v=a.cacheContext,l=a.getMaskedContext,p=a.getUnmaskedContext,z=a.isContextConsumer,B=a.hasContextChanged,r={isMounted:yd,enqueueSetState:function(a,d,e){a=a._reactInternalFiber;e=void 0===e?null:e;var f=c(a);Pe(a,{expirationTime:f,partialState:d,callback:e,isReplace:!1,isForced:!1,
capturedValue:null,next:null});b(a,f)},enqueueReplaceState:function(a,d,e){a=a._reactInternalFiber;e=void 0===e?null:e;var f=c(a);Pe(a,{expirationTime:f,partialState:d,callback:e,isReplace:!0,isForced:!1,capturedValue:null,next:null});b(a,f)},enqueueForceUpdate:function(a,d){a=a._reactInternalFiber;d=void 0===d?null:d;var e=c(a);Pe(a,{expirationTime:e,partialState:null,callback:d,isReplace:!1,isForced:!0,capturedValue:null,next:null});b(a,e)}};return{adoptClassInstance:h,callGetDerivedStateFromProps:k,
constructClassInstance:function(a,b){var c=a.type,d=p(a),e=z(a),f=e?l(a,d):ka;c=new c(b,f);var n=null!==c.state&&void 0!==c.state?c.state:null;h(a,c);a.memoizedState=n;b=k(a,c,b,n);null!==b&&void 0!==b&&(a.memoizedState=A({},a.memoizedState,b));e&&v(a,d,f);return c},mountClassInstance:function(a,b){var c=a.type,d=a.alternate,e=a.stateNode,f=a.pendingProps,n=p(a);e.props=f;e.state=a.memoizedState;e.refs=ka;e.context=l(a,n);"function"===typeof c.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||
"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(c=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),c!==e.state&&r.enqueueReplaceState(e,e.state,null),c=a.updateQueue,null!==c&&(e.state=Re(d,a,c,e,f,b)));"function"===typeof e.componentDidMount&&(a.effectTag|=4)},resumeMountClassInstance:function(a,b){var c=a.type,n=a.stateNode;n.props=a.memoizedProps;n.state=
a.memoizedState;var h=a.memoizedProps,r=a.pendingProps,z=n.context,q=p(a);q=l(a,q);(c="function"===typeof c.getDerivedStateFromProps||"function"===typeof n.getSnapshotBeforeUpdate)||"function"!==typeof n.UNSAFE_componentWillReceiveProps&&"function"!==typeof n.componentWillReceiveProps||(h!==r||z!==q)&&g(a,n,r,q);z=a.memoizedState;b=null!==a.updateQueue?Re(null,a,a.updateQueue,n,r,b):z;var u=void 0;h!==r&&(u=k(a,n,r,b));if(null!==u&&void 0!==u){b=null===b||void 0===b?u:A({},b,u);var t=a.updateQueue;
null!==t&&(t.baseState=A({},t.baseState,u))}if(!(h!==r||z!==b||B()||null!==a.updateQueue&&a.updateQueue.hasForceUpdate))return"function"===typeof n.componentDidMount&&(a.effectTag|=4),!1;(h=f(a,h,r,z,b,q))?(c||"function"!==typeof n.UNSAFE_componentWillMount&&"function"!==typeof n.componentWillMount||("function"===typeof n.componentWillMount&&n.componentWillMount(),"function"===typeof n.UNSAFE_componentWillMount&&n.UNSAFE_componentWillMount()),"function"===typeof n.componentDidMount&&(a.effectTag|=
4)):("function"===typeof n.componentDidMount&&(a.effectTag|=4),d(a,r),e(a,b));n.props=r;n.state=b;n.context=q;return h},updateClassInstance:function(a,b,c){var n=b.type,x=b.stateNode;x.props=b.memoizedProps;x.state=b.memoizedState;var h=b.memoizedProps,r=b.pendingProps,q=x.context,u=p(b);u=l(b,u);(n="function"===typeof n.getDerivedStateFromProps||"function"===typeof x.getSnapshotBeforeUpdate)||"function"!==typeof x.UNSAFE_componentWillReceiveProps&&"function"!==typeof x.componentWillReceiveProps||
(h!==r||q!==u)&&g(b,x,r,u);q=b.memoizedState;c=null!==b.updateQueue?Re(a,b,b.updateQueue,x,r,c):q;var t=void 0;h!==r&&(t=k(b,x,r,c));if(null!==t&&void 0!==t){c=null===c||void 0===c?t:A({},c,t);var y=b.updateQueue;null!==y&&(y.baseState=A({},y.baseState,t))}if(!(h!==r||q!==c||B()||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==typeof x.componentDidUpdate||h===a.memoizedProps&&q===a.memoizedState||(b.effectTag|=4),"function"!==typeof x.getSnapshotBeforeUpdate||h===a.memoizedProps&&
q===a.memoizedState||(b.effectTag|=2048),!1;(t=f(b,h,r,q,c,u))?(n||"function"!==typeof x.UNSAFE_componentWillUpdate&&"function"!==typeof x.componentWillUpdate||("function"===typeof x.componentWillUpdate&&x.componentWillUpdate(r,c,u),"function"===typeof x.UNSAFE_componentWillUpdate&&x.UNSAFE_componentWillUpdate(r,c,u)),"function"===typeof x.componentDidUpdate&&(b.effectTag|=4),"function"===typeof x.getSnapshotBeforeUpdate&&(b.effectTag|=2048)):("function"!==typeof x.componentDidUpdate||h===a.memoizedProps&&
q===a.memoizedState||(b.effectTag|=4),"function"!==typeof x.getSnapshotBeforeUpdate||h===a.memoizedProps&&q===a.memoizedState||(b.effectTag|=2048),d(b,r),e(b,c));x.props=r;x.state=c;x.context=u;return t}}}var Ue=Array.isArray;
function Ve(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(2!==c.tag?D("110"):void 0,d=c.stateNode);d?void 0:D("147",a);var e=""+a;if(null!==b&&null!==b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs===ka?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}"string"!==typeof a?D("148"):void 0;c._owner?void 0:D("254",a)}return a}
function We(a,b){"textarea"!==a.type&&D("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function Xe(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=ze(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function h(b){a&&null===b.alternate&&(b.effectTag=2);return b}function g(a,b,c,d){if(null===b||6!==b.tag)return b=Ce(c,a.mode,d),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=Ve(a,b,c),d["return"]=a,d;d=Ae(c,a.mode,d);d.ref=Ve(a,b,c);d["return"]=a;return d}function v(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
De(c,a.mode,d),b["return"]=a,b;b=e(b,c.children||[],d);b["return"]=a;return b}function l(a,b,c,d,f){if(null===b||10!==b.tag)return b=Be(c,a.mode,d,f),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function p(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ce(""+b,a.mode,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case oc:return c=Ae(b,a.mode,c),c.ref=Ve(a,null,b),c["return"]=a,c;case rc:return b=De(b,a.mode,c),b["return"]=a,b}if(Ue(b)||zc(b))return b=Be(b,
a.mode,c,null),b["return"]=a,b;We(a,b)}return null}function z(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:g(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case oc:return c.key===e?c.type===sc?l(a,b,c.props.children,d,e):k(a,b,c,d):null;case rc:return c.key===e?v(a,b,c,d):null}if(Ue(c)||zc(c))return null!==e?null:l(a,b,c,d,null);We(a,c)}return null}function B(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,g(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case oc:return a=a.get(null===d.key?c:d.key)||null,d.type===sc?l(b,a,d.props.children,e,d.key):k(b,a,d,e);case rc:return a=a.get(null===d.key?c:d.key)||null,v(b,a,d,e)}if(Ue(d)||zc(d))return a=a.get(c)||null,l(b,a,d,e,null);We(b,d)}return null}function r(e,l,g,h){for(var r=null,k=null,q=l,u=l=0,t=null;null!==q&&u<g.length;u++){q.index>u?(t=q,q=null):t=q.sibling;var n=z(e,q,g[u],h);if(null===n){null===q&&(q=t);break}a&&q&&null===
n.alternate&&b(e,q);l=f(n,l,u);null===k?r=n:k.sibling=n;k=n;q=t}if(u===g.length)return c(e,q),r;if(null===q){for(;u<g.length;u++)if(q=p(e,g[u],h))l=f(q,l,u),null===k?r=q:k.sibling=q,k=q;return r}for(q=d(e,q);u<g.length;u++)if(t=B(q,e,u,g[u],h)){if(a&&null!==t.alternate)q["delete"](null===t.key?u:t.key);l=f(t,l,u);null===k?r=t:k.sibling=t;k=t}a&&q.forEach(function(a){return b(e,a)});return r}function Q(e,l,g,h){var r=zc(g);"function"!==typeof r?D("150"):void 0;g=r.call(g);null==g?D("151"):void 0;for(var k=
r=null,q=l,u=l=0,t=null,n=g.next();null!==q&&!n.done;u++,n=g.next()){q.index>u?(t=q,q=null):t=q.sibling;var H=z(e,q,n.value,h);if(null===H){q||(q=t);break}a&&q&&null===H.alternate&&b(e,q);l=f(H,l,u);null===k?r=H:k.sibling=H;k=H;q=t}if(n.done)return c(e,q),r;if(null===q){for(;!n.done;u++,n=g.next())n=p(e,n.value,h),null!==n&&(l=f(n,l,u),null===k?r=n:k.sibling=n,k=n);return r}for(q=d(e,q);!n.done;u++,n=g.next())if(n=B(q,e,u,n.value,h),null!==n){if(a&&null!==n.alternate)q["delete"](null===n.key?u:n.key);
l=f(n,l,u);null===k?r=n:k.sibling=n;k=n}a&&q.forEach(function(a){return b(e,a)});return r}return function(a,d,f,l){"object"===typeof f&&null!==f&&f.type===sc&&null===f.key&&(f=f.props.children);var g="object"===typeof f&&null!==f;if(g)switch(f.$$typeof){case oc:a:{var k=f.key;for(g=d;null!==g;){if(g.key===k)if(10===g.tag?f.type===sc:g.type===f.type){c(a,g.sibling);d=e(g,f.type===sc?f.props.children:f.props,l);d.ref=Ve(a,g,f);d["return"]=a;a=d;break a}else{c(a,g);break}else b(a,g);g=g.sibling}f.type===
sc?(d=Be(f.props.children,a.mode,l,f.key),d["return"]=a,a=d):(l=Ae(f,a.mode,l),l.ref=Ve(a,d,f),l["return"]=a,a=l)}return h(a);case rc:a:{for(g=f.key;null!==d;){if(d.key===g)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],l);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=De(f,a.mode,l);d["return"]=a;a=d}return h(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&
6===d.tag?(c(a,d.sibling),d=e(d,f,l),d["return"]=a,a=d):(c(a,d),d=Ce(f,a.mode,l),d["return"]=a,a=d),h(a);if(Ue(f))return r(a,d,f,l);if(zc(f))return Q(a,d,f,l);g&&We(a,f);if("undefined"===typeof f)switch(a.tag){case 2:case 1:l=a.type,D("152",l.displayName||l.name||"Component")}return c(a,d)}}var Ye=Xe(!0),Ze=Xe(!1);
function $e(a,b,c,d,e,f,h){function g(a,b,c){k(a,b,c,b.expirationTime)}function k(a,b,c,d){b.child=null===a?Ze(b,null,c,d):Ye(b,a.child,c,d)}function v(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function l(a,b,c,d,e,f){v(a,b);if(!c&&!e)return d&&y(b,!1),r(a,b);c=b.stateNode;nc.current=b;var l=e?null:c.render();b.effectTag|=1;e&&(k(a,b,null,f),b.child=null);k(a,b,l,f);b.memoizedState=c.state;b.memoizedProps=c.props;d&&y(b,!0);return b.child}function p(a){var b=a.stateNode;
b.pendingContext?t(a,b.pendingContext,b.pendingContext!==b.context):b.context&&t(a,b.context,!1);Y(a,b.containerInfo)}function z(a,b,c,d){var e=a.child;for(null!==e&&(e["return"]=a);null!==e;){switch(e.tag){case 12:var f=e.stateNode|0;if(e.type===b&&0!==(f&c)){for(f=e;null!==f;){var l=f.alternate;if(0===f.expirationTime||f.expirationTime>d)f.expirationTime=d,null!==l&&(0===l.expirationTime||l.expirationTime>d)&&(l.expirationTime=d);else if(null!==l&&(0===l.expirationTime||l.expirationTime>d))l.expirationTime=
d;else break;f=f["return"]}f=null}else f=e.child;break;case 13:f=e.type===a.type?null:e.child;break;default:f=e.child}if(null!==f)f["return"]=e;else for(f=e;null!==f;){if(f===a){f=null;break}e=f.sibling;if(null!==e){f=e;break}f=f["return"]}e=f}}function B(a,b,c){var d=b.type._context,e=b.pendingProps,f=b.memoizedProps;if(!q()&&f===e)return b.stateNode=0,G(b),r(a,b);var l=e.value;b.memoizedProps=e;if(null===f)l=1073741823;else if(f.value===e.value){if(f.children===e.children)return b.stateNode=0,G(b),
r(a,b);l=0}else{var h=f.value;if(h===l&&(0!==h||1/h===1/l)||h!==h&&l!==l){if(f.children===e.children)return b.stateNode=0,G(b),r(a,b);l=0}else if(l="function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,l):1073741823,l|=0,0===l){if(f.children===e.children)return b.stateNode=0,G(b),r(a,b)}else z(b,d,l,c)}b.stateNode=l;G(b);g(a,b,e.children);return b.child}function r(a,b){null!==a&&b.child!==a.child?D("153"):void 0;if(null!==b.child){a=b.child;var c=ze(a,a.pendingProps,a.expirationTime);
b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=ze(a,a.pendingProps,a.expirationTime),c["return"]=b;c.sibling=null}return b.child}var Q=a.shouldSetTextContent,n=a.shouldDeprioritizeSubtree,x=b.pushHostContext,Y=b.pushHostContainer,G=d.pushProvider,R=c.getMaskedContext,S=c.getUnmaskedContext,q=c.hasContextChanged,u=c.pushContextProvider,t=c.pushTopLevelContextObject,y=c.invalidateContextProvider,H=e.enterHydrationState,Wa=e.resetHydrationState,Cb=e.tryToClaimNextHydratableInstance;
a=Te(c,f,h,function(a,b){a.memoizedProps=b},function(a,b){a.memoizedState=b});var Jc=a.adoptClassInstance,Kc=a.callGetDerivedStateFromProps,Lc=a.constructClassInstance,Db=a.mountClassInstance,Mc=a.resumeMountClassInstance,Eb=a.updateClassInstance;return{beginWork:function(a,b,c){if(0===b.expirationTime||b.expirationTime>c){switch(b.tag){case 3:p(b);break;case 2:u(b);break;case 4:Y(b,b.stateNode.containerInfo);break;case 13:G(b)}return null}switch(b.tag){case 0:null!==a?D("155"):void 0;var d=b.type,
e=b.pendingProps,f=S(b);f=R(b,f);d=d(e,f);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render&&void 0===d.$$typeof?(f=b.type,b.tag=2,b.memoizedState=null!==d.state&&void 0!==d.state?d.state:null,"function"===typeof f.getDerivedStateFromProps&&(e=Kc(b,d,e,b.memoizedState),null!==e&&void 0!==e&&(b.memoizedState=A({},b.memoizedState,e))),e=u(b),Jc(b,d),Db(b,c),a=l(a,b,!0,e,!1,c)):(b.tag=1,g(a,b,d),b.memoizedProps=e,a=b.child);return a;case 1:return e=b.type,c=b.pendingProps,q()||
b.memoizedProps!==c?(d=S(b),d=R(b,d),e=e(c,d),b.effectTag|=1,g(a,b,e),b.memoizedProps=c,a=b.child):a=r(a,b),a;case 2:e=u(b);null===a?null===b.stateNode?(Lc(b,b.pendingProps),Db(b,c),d=!0):d=Mc(b,c):d=Eb(a,b,c);f=!1;var h=b.updateQueue;null!==h&&null!==h.capturedValues&&(f=d=!0);return l(a,b,d,e,f,c);case 3:a:if(p(b),d=b.updateQueue,null!==d){f=b.memoizedState;e=Re(a,b,d,null,null,c);b.memoizedState=e;d=b.updateQueue;if(null!==d&&null!==d.capturedValues)d=null;else if(f===e){Wa();a=r(a,b);break a}else d=
e.element;f=b.stateNode;(null===a||null===a.child)&&f.hydrate&&H(b)?(b.effectTag|=2,b.child=Ze(b,null,d,c)):(Wa(),g(a,b,d));b.memoizedState=e;a=b.child}else Wa(),a=r(a,b);return a;case 5:a:{x(b);null===a&&Cb(b);e=b.type;h=b.memoizedProps;d=b.pendingProps;f=null!==a?a.memoizedProps:null;if(!q()&&h===d){if(h=b.mode&1&&n(e,d))b.expirationTime=1073741823;if(!h||1073741823!==c){a=r(a,b);break a}}h=d.children;Q(e,d)?h=null:f&&Q(e,f)&&(b.effectTag|=16);v(a,b);1073741823!==c&&b.mode&1&&n(e,d)?(b.expirationTime=
1073741823,b.memoizedProps=d,a=null):(g(a,b,h),b.memoizedProps=d,a=b.child)}return a;case 6:return null===a&&Cb(b),b.memoizedProps=b.pendingProps,null;case 8:b.tag=7;case 7:return e=b.pendingProps,q()||b.memoizedProps!==e||(e=b.memoizedProps),d=e.children,b.stateNode=null===a?Ze(b,b.stateNode,d,c):Ye(b,a.stateNode,d,c),b.memoizedProps=e,b.stateNode;case 9:return null;case 4:return Y(b,b.stateNode.containerInfo),e=b.pendingProps,q()||b.memoizedProps!==e?(null===a?b.child=Ye(b,null,e,c):g(a,b,e),b.memoizedProps=
e,a=b.child):a=r(a,b),a;case 14:return c=b.type.render,c=c(b.pendingProps,b.ref),g(a,b,c),b.memoizedProps=c,b.child;case 10:return c=b.pendingProps,q()||b.memoizedProps!==c?(g(a,b,c),b.memoizedProps=c,a=b.child):a=r(a,b),a;case 11:return c=b.pendingProps.children,q()||null!==c&&b.memoizedProps!==c?(g(a,b,c),b.memoizedProps=c,a=b.child):a=r(a,b),a;case 13:return B(a,b,c);case 12:a:{d=b.type;f=b.pendingProps;h=b.memoizedProps;e=d._currentValue;var t=d._changedBits;if(q()||0!==t||h!==f){b.memoizedProps=
f;var k=f.unstable_observedBits;if(void 0===k||null===k)k=1073741823;b.stateNode=k;if(0!==(t&k))z(b,d,t,c);else if(h===f){a=r(a,b);break a}c=f.children;c=c(e);g(a,b,c);a=b.child}else a=r(a,b)}return a;default:D("156")}}}}
function af(a,b,c,d,e){function f(a){a.effectTag|=4}var h=a.createInstance,g=a.createTextInstance,k=a.appendInitialChild,v=a.finalizeInitialChildren,l=a.prepareUpdate,p=a.persistence,z=b.getRootHostContainer,B=b.popHostContext,r=b.getHostContext,Q=b.popHostContainer,n=c.popContextProvider,x=c.popTopLevelContextObject,Y=d.popProvider,G=e.prepareToHydrateHostInstance,R=e.prepareToHydrateHostTextInstance,S=e.popHydrationState,q=void 0,u=void 0,t=void 0;a.mutation?(q=function(){},u=function(a,b,c){(b.updateQueue=
c)&&f(b)},t=function(a,b,c,d){c!==d&&f(b)}):p?D("235"):D("236");return{completeWork:function(a,b,c){var d=b.pendingProps;switch(b.tag){case 1:return null;case 2:return n(b),a=b.stateNode,d=b.updateQueue,null!==d&&null!==d.capturedValues&&(b.effectTag&=-65,"function"===typeof a.componentDidCatch?b.effectTag|=256:d.capturedValues=null),null;case 3:Q(b);x(b);d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)S(b),b.effectTag&=-3;q(b);a=b.updateQueue;
null!==a&&null!==a.capturedValues&&(b.effectTag|=256);return null;case 5:B(b);c=z();var e=b.type;if(null!==a&&null!=b.stateNode){var p=a.memoizedProps,H=b.stateNode,y=r();H=l(H,e,p,d,c,y);u(a,b,H,e,p,d,c,y);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!d)return null===b.stateNode?D("166"):void 0,null;a=r();if(S(b))G(b,c,a)&&f(b);else{p=h(e,d,c,a,b);a:for(y=b.child;null!==y;){if(5===y.tag||6===y.tag)k(p,y.stateNode);else if(4!==y.tag&&null!==y.child){y.child["return"]=y;y=y.child;continue}if(y===b)break;
for(;null===y.sibling;){if(null===y["return"]||y["return"]===b)break a;y=y["return"]}y.sibling["return"]=y["return"];y=y.sibling}v(p,e,d,c,a)&&f(b);b.stateNode=p}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)t(a,b,a.memoizedProps,d);else{if("string"!==typeof d)return null===b.stateNode?D("166"):void 0,null;a=z();c=r();S(b)?R(b)&&f(b):b.stateNode=g(d,a,c,b)}return null;case 7:(d=b.memoizedProps)?void 0:D("165");b.tag=8;e=[];a:for((p=b.stateNode)&&(p["return"]=b);null!==
p;){if(5===p.tag||6===p.tag||4===p.tag)D("247");else if(9===p.tag)e.push(p.pendingProps.value);else if(null!==p.child){p.child["return"]=p;p=p.child;continue}for(;null===p.sibling;){if(null===p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}p=d.handler;d=p(d.props,e);b.child=Ye(b,null!==a?a.child:null,d,c);return b.child;case 8:return b.tag=7,null;case 9:return null;case 14:return null;case 10:return null;case 11:return null;case 4:return Q(b),q(b),null;
case 13:return Y(b),null;case 12:return null;case 0:D("167");default:D("156")}}}}
function bf(a,b,c,d,e){var f=a.popHostContainer,h=a.popHostContext,g=b.popContextProvider,k=b.popTopLevelContextObject,v=c.popProvider;return{throwException:function(a,b,c){b.effectTag|=512;b.firstEffect=b.lastEffect=null;b={value:c,source:b,stack:Bc(b)};do{switch(a.tag){case 3:Oe(a);a.updateQueue.capturedValues=[b];a.effectTag|=1024;return;case 2:if(c=a.stateNode,0===(a.effectTag&64)&&null!==c&&"function"===typeof c.componentDidCatch&&!e(c)){Oe(a);c=a.updateQueue;var d=c.capturedValues;null===d?
c.capturedValues=[b]:d.push(b);a.effectTag|=1024;return}}a=a["return"]}while(null!==a)},unwindWork:function(a){switch(a.tag){case 2:g(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return f(a),k(a),b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 5:return h(a),null;case 4:return f(a),null;case 13:return v(a),null;default:return null}},unwindInterruptedWork:function(a){switch(a.tag){case 2:g(a);break;case 3:f(a);k(a);break;case 5:h(a);break;case 4:f(a);break;case 13:v(a)}}}}
function cf(a,b){var c=b.source;null===b.stack&&Bc(c);null!==c&&Ac(c);b=b.value;null!==a&&2===a.tag&&Ac(a);try{b&&b.suppressReactErrorLogging||console.error(b)}catch(d){d&&d.suppressReactErrorLogging||console.error(d)}}
function df(a,b,c,d,e){function f(a){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(t){b(a,t)}else c.current=null}function h(a){"function"===typeof Je&&Je(a);switch(a.tag){case 2:f(a);var c=a.stateNode;if("function"===typeof c.componentWillUnmount)try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(t){b(a,t)}break;case 5:f(a);break;case 7:g(a.stateNode);break;case 4:p&&v(a)}}function g(a){for(var b=a;;)if(h(b),null===b.child||p&&4===b.tag){if(b===
a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}else b.child["return"]=b,b=b.child}function k(a){return 5===a.tag||3===a.tag||4===a.tag}function v(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?D("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c["return"]}c=!0}if(5===
b.tag||6===b.tag)g(b),e?S(d,b.stateNode):R(d,b.stateNode);else if(4===b.tag?d=b.stateNode.containerInfo:h(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];4===b.tag&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}var l=a.getPublicInstance,p=a.mutation;a=a.persistence;p||(a?D("235"):D("236"));var z=p.commitMount,B=p.commitUpdate,r=p.resetTextContent,Q=p.commitTextUpdate,n=p.appendChild,
x=p.appendChildToContainer,Y=p.insertBefore,G=p.insertInContainerBefore,R=p.removeChild,S=p.removeChildFromContainer;return{commitBeforeMutationLifeCycles:function(a,b){switch(b.tag){case 2:if(b.effectTag&2048&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;a.props=b.memoizedProps;a.state=b.memoizedState;b=a.getSnapshotBeforeUpdate(c,d);a.__reactInternalSnapshotBeforeUpdate=b}break;case 3:case 5:case 6:case 4:break;default:D("163")}},commitResetTextContent:function(a){r(a.stateNode)},
commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(k(b)){var c=b;break a}b=b["return"]}D("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:D("161")}c.effectTag&16&&(r(b),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||k(c["return"])){c=null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;5!==c.tag&&6!==
c.tag;){if(c.effectTag&2)continue b;if(null===c.child||4===c.tag)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)c?d?G(b,e.stateNode,c):Y(b,e.stateNode,c):d?x(b,e.stateNode):n(b,e.stateNode);else if(4!==e.tag&&null!==e.child){e.child["return"]=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e["return"]||e["return"]===a)return;e=e["return"]}e.sibling["return"]=e["return"];e=e.sibling}},commitDeletion:function(a){v(a);
a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&B(c,f,e,a,d,b)}break;case 6:null===b.stateNode?D("162"):void 0;c=b.memoizedProps;Q(b.stateNode,null!==a?a.memoizedProps:c,c);break;case 3:break;default:D("163")}},commitLifeCycles:function(a,b,c){switch(c.tag){case 2:a=
c.stateNode;if(c.effectTag&4)if(null===b)a.props=c.memoizedProps,a.state=c.memoizedState,a.componentDidMount();else{var d=b.memoizedProps;b=b.memoizedState;a.props=c.memoizedProps;a.state=c.memoizedState;a.componentDidUpdate(d,b,a.__reactInternalSnapshotBeforeUpdate)}c=c.updateQueue;null!==c&&Se(c,a);break;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=l(c.child.stateNode);break;case 2:a=c.child.stateNode}Se(b,a)}break;case 5:a=c.stateNode;null===b&&c.effectTag&
4&&z(a,c.type,c.memoizedProps,c);break;case 6:break;case 4:break;default:D("163")}},commitErrorLogging:function(a,b){switch(a.tag){case 2:var c=a.type;b=a.stateNode;var d=a.updateQueue;null===d||null===d.capturedValues?D("264"):void 0;var f=d.capturedValues;d.capturedValues=null;"function"!==typeof c.getDerivedStateFromCatch&&e(b);b.props=a.memoizedProps;b.state=a.memoizedState;for(c=0;c<f.length;c++){d=f[c];var l=d.value,g=d.stack;cf(a,d);b.componentDidCatch(l,{componentStack:null!==g?g:""})}break;
case 3:c=a.updateQueue;null===c||null===c.capturedValues?D("264"):void 0;f=c.capturedValues;c.capturedValues=null;for(c=0;c<f.length;c++)d=f[c],cf(a,d),b(d.value);break;default:D("265")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=l(c);break;default:a=c}"function"===typeof b?b(a):b.current=a}},commitDetachRef:function(a){a=a.ref;null!==a&&("function"===typeof a?a(null):a.current=null)}}}var ef={};
function ff(a,b){function c(a){a===ef?D("174"):void 0;return a}var d=a.getChildHostContext,e=a.getRootHostContext;a=b.createCursor;var f=b.push,h=b.pop,g=a(ef),k=a(ef),v=a(ef);return{getHostContext:function(){return c(g.current)},getRootHostContainer:function(){return c(v.current)},popHostContainer:function(a){h(g,a);h(k,a);h(v,a)},popHostContext:function(a){k.current===a&&(h(g,a),h(k,a))},pushHostContainer:function(a,b){f(v,b,a);f(k,a,a);f(g,ef,a);b=e(b);h(g,a);f(g,b,a)},pushHostContext:function(a){var b=
c(v.current),e=c(g.current);b=d(e,a.type,b);e!==b&&(f(k,a,a),f(g,b,a))}}}
function gf(a){function b(a,b){var c=new xe(5,null,null,0);c.type="DELETED";c.stateNode=b;c["return"]=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case 5:return b=f(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 6:return b=h(b,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;default:return!1}}function d(a){for(a=a["return"];null!==a&&5!==a.tag&&3!==a.tag;)a=a["return"];p=a}var e=a.shouldSetTextContent;
a=a.hydration;if(!a)return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){D("175")},prepareToHydrateHostTextInstance:function(){D("176")},popHydrationState:function(){return!1}};var f=a.canHydrateInstance,h=a.canHydrateTextInstance,g=a.getNextHydratableSibling,k=a.getFirstHydratableChild,v=a.hydrateInstance,l=a.hydrateTextInstance,p=null,z=null,B=!1;return{enterHydrationState:function(a){z=
k(a.stateNode.containerInfo);p=a;return B=!0},resetHydrationState:function(){z=p=null;B=!1},tryToClaimNextHydratableInstance:function(a){if(B){var d=z;if(d){if(!c(a,d)){d=g(d);if(!d||!c(a,d)){a.effectTag|=2;B=!1;p=a;return}b(p,z)}p=a;z=k(d)}else a.effectTag|=2,B=!1,p=a}},prepareToHydrateHostInstance:function(a,b,c){b=v(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return l(a.stateNode,a.memoizedProps,a)},popHydrationState:function(a){if(a!==
p)return!1;if(!B)return d(a),B=!0,!1;var c=a.type;if(5!==a.tag||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=z;c;)b(a,c),c=g(c);d(a);z=p?g(a.stateNode):null;return!0}}}
function hf(a){function b(a,b,c){a=a.stateNode;a.__reactInternalMemoizedUnmaskedChildContext=b;a.__reactInternalMemoizedMaskedChildContext=c}function c(a){return 2===a.tag&&null!=a.type.childContextTypes}function d(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:D("108",Ac(a)||"Unknown",e);return A({},b,c)}var e=a.createCursor,f=a.push,h=a.pop,g=e(ka),k=e(!1),v=ka;return{getUnmaskedContext:function(a){return c(a)?
v:g.current},cacheContext:b,getMaskedContext:function(a,c){var d=a.type.contextTypes;if(!d)return ka;var e=a.stateNode;if(e&&e.__reactInternalMemoizedUnmaskedChildContext===c)return e.__reactInternalMemoizedMaskedChildContext;var f={},g;for(g in d)f[g]=c[g];e&&b(a,c,f);return f},hasContextChanged:function(){return k.current},isContextConsumer:function(a){return 2===a.tag&&null!=a.type.contextTypes},isContextProvider:c,popContextProvider:function(a){c(a)&&(h(k,a),h(g,a))},popTopLevelContextObject:function(a){h(k,
a);h(g,a)},pushTopLevelContextObject:function(a,b,c){null!=g.cursor?D("168"):void 0;f(g,b,a);f(k,c,a)},processChildContext:d,pushContextProvider:function(a){if(!c(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||ka;v=g.current;f(g,b,a);f(k,k.current,a);return!0},invalidateContextProvider:function(a,b){var c=a.stateNode;c?void 0:D("169");if(b){var e=d(a,v);c.__reactInternalMemoizedMergedChildContext=e;h(k,a);h(g,a);f(g,e,a)}else h(k,a);f(k,b,a)},findCurrentUnmaskedContext:function(a){for(2!==
xd(a)||2!==a.tag?D("170"):void 0;3!==a.tag;){if(c(a))return a.stateNode.__reactInternalMemoizedMergedChildContext;(a=a["return"])?void 0:D("171")}return a.stateNode.context}}}
function jf(a){var b=a.createCursor,c=a.push,d=a.pop,e=b(null),f=b(null),h=b(0);return{pushProvider:function(a){var b=a.type._context;c(h,b._changedBits,a);c(f,b._currentValue,a);c(e,a,a);b._currentValue=a.pendingProps.value;b._changedBits=a.stateNode},popProvider:function(a){var b=h.current,c=f.current;d(e,a);d(f,a);d(h,a);a=a.type._context;a._currentValue=c;a._changedBits=b}}}
function kf(){var a=[],b=-1;return{createCursor:function(a){return{current:a}},isEmpty:function(){return-1===b},pop:function(c){0>b||(c.current=a[b],a[b]=null,b--)},push:function(c,d){b++;a[b]=c.current;c.current=d},checkThatStackIsEmpty:function(){},resetStackAfterFatalErrorInDev:function(){}}}
function lf(a){function b(){if(null!==I)for(var a=I["return"];null!==a;)Lc(a),a=a["return"];Ya=null;Z=0;I=null;Nc=!1}function c(a){return null!==ya&&ya.has(a)}function d(a){for(;;){var b=a.alternate,c=a["return"],d=a.sibling;if(0===(a.effectTag&512)){b=Cb(b,a,Z);var e=a;if(1073741823===Z||1073741823!==e.expirationTime){b:switch(e.tag){case 3:case 2:var f=e.updateQueue;f=null===f?0:f.expirationTime;break b;default:f=0}for(var g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=
g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{Nc=!0;break}}else{a=Kc(a);if(null!==a)return a.effectTag&=2559,a;null!==c&&(c.firstEffect=c.lastEffect=
null,c.effectTag|=512);if(null!==d)return d;if(null!==c)a=c;else break}}return null}function e(a){var b=Wa(a.alternate,a,Z);null===b&&(b=d(a));nc.current=null;return b}function f(a,c,f){ca?D("243"):void 0;ca=!0;if(c!==Z||a!==Ya||null===I)b(),Ya=a,Z=c,I=ze(Ya.current,null,Z),a.pendingCommitExpirationTime=0;var g=!1;do{try{if(f)for(;null!==I&&!S();)I=e(I);else for(;null!==I;)I=e(I)}catch(Oc){if(null===I){g=!0;q(Oc);break}f=I;var h=f["return"];if(null===h){g=!0;q(Oc);break}Jc(h,f,Oc);I=d(f)}break}while(1);
ca=!1;if(g||null!==I)return null;if(Nc)return a.pendingCommitExpirationTime=c,a.current.alternate;D("262")}function h(a,b,c,d){a={value:c,source:a,stack:Bc(a)};Pe(b,{expirationTime:d,partialState:null,callback:null,isReplace:!1,isForced:!1,capturedValue:a,next:null});v(b,d)}function g(a,b){a:{ca&&!Za?D("263"):void 0;for(var d=a["return"];null!==d;){switch(d.tag){case 2:var e=d.stateNode;if("function"===typeof d.type.getDerivedStateFromCatch||"function"===typeof e.componentDidCatch&&!c(e)){h(a,d,b,
1);a=void 0;break a}break;case 3:h(a,d,b,1);a=void 0;break a}d=d["return"]}3===a.tag&&h(a,a,b,1);a=void 0}return a}function k(a){a=0!==ia?ia:ca?Za?1:Z:a.mode&1?za?10*(((l()+15)/10|0)+1):25*(((l()+500)/25|0)+1):1;za&&(0===da||a>da)&&(da=a);return a}function v(a,c){a:{for(;null!==a;){if(0===a.expirationTime||a.expirationTime>c)a.expirationTime=c;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>c)&&(a.alternate.expirationTime=c);if(null===a["return"])if(3===a.tag){var d=
a.stateNode;!ca&&0!==Z&&c<Z&&b();ca&&!Za&&Ya===d||B(d,c);Fb>xg&&D("185")}else{c=void 0;break a}a=a["return"]}c=void 0}return c}function l(){ye=Ic()-Pc;return yg=(ye/10|0)+2}function p(a,b,c,d,e){var f=ia;ia=1;try{return a(b,c,d,e)}finally{ia=f}}function z(a){if(0!==Gb){if(a>Gb)return;mg(Qc)}var b=Ic()-Pc;Gb=a;Qc=lg(Q,{timeout:10*(a-2)-b})}function B(a,b){if(null===a.nextScheduledRoot)a.remainingExpirationTime=b,null===K?(la=K=a,a.nextScheduledRoot=a):(K=K.nextScheduledRoot=a,K.nextScheduledRoot=la);
else{var c=a.remainingExpirationTime;if(0===c||b<c)a.remainingExpirationTime=b}T||(J?Hb&&(aa=a,P=1,G(a,1,!1)):1===b?n():z(b))}function r(){var a=0,b=null;if(null!==K)for(var c=K,d=la;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===K?D("244"):void 0;if(d===d.nextScheduledRoot){la=K=d.nextScheduledRoot=null;break}else if(d===la)la=e=d.nextScheduledRoot,K.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===K){K=c;K.nextScheduledRoot=la;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=
d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===K)break;c=d;d=d.nextScheduledRoot}}c=aa;null!==c&&c===b&&1===a?Fb++:Fb=0;aa=b;P=a}function Q(a){x(0,!0,a)}function n(){x(1,!1,null)}function x(a,b,c){$a=c;r();if(b)for(;null!==aa&&0!==P&&(0===a||a>=P)&&(!Ib||l()>=P);)G(aa,P,!Ib),r();else for(;null!==aa&&0!==P&&(0===a||a>=P);)G(aa,P,!1),r();null!==$a&&(Gb=0,Qc=-1);0!==P&&z(P);$a=null;Ib=!1;Y()}function Y(){Fb=0;if(null!==Aa){var a=Aa;Aa=null;for(var b=
0;b<a.length;b++){var c=a[b];try{c._onComplete()}catch(wg){Ba||(Ba=!0,Jb=wg)}}}if(Ba)throw a=Jb,Jb=null,Ba=!1,a;}function G(a,b,c){T?D("245"):void 0;T=!0;c?(c=a.finishedWork,null!==c?R(a,c,b):(a.finishedWork=null,c=f(a,b,!0),null!==c&&(S()?a.finishedWork=c:R(a,c,b)))):(c=a.finishedWork,null!==c?R(a,c,b):(a.finishedWork=null,c=f(a,b,!1),null!==c&&R(a,c,b)));T=!1}function R(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===Aa?Aa=[d]:Aa.push(d),d._defer)){a.finishedWork=b;a.remainingExpirationTime=
0;return}a.finishedWork=null;Za=ca=!0;c=b.stateNode;c.current===b?D("177"):void 0;d=c.pendingCommitExpirationTime;0===d?D("261"):void 0;c.pendingCommitExpirationTime=0;var e=l();nc.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var f=b.firstEffect}else f=b;else f=b.firstEffect;zg(c.containerInfo);for(w=f;null!==w;){var h=!1,k=void 0;try{for(;null!==w;)w.effectTag&2048&&Db(w.alternate,w),w=w.nextEffect}catch(ab){h=!0,k=ab}h&&(null===w?D("178"):void 0,g(w,k),null!==
w&&(w=w.nextEffect))}for(w=f;null!==w;){h=!1;k=void 0;try{for(;null!==w;){var p=w.effectTag;p&16&&Mc(w);if(p&128){var n=w.alternate;null!==n&&kg(n)}switch(p&14){case 2:Eb(w);w.effectTag&=-3;break;case 6:Eb(w);w.effectTag&=-3;we(w.alternate,w);break;case 4:we(w.alternate,w);break;case 8:gg(w)}w=w.nextEffect}}catch(ab){h=!0,k=ab}h&&(null===w?D("178"):void 0,g(w,k),null!==w&&(w=w.nextEffect))}Ag(c.containerInfo);c.current=b;for(w=f;null!==w;){p=!1;n=void 0;try{for(f=c,h=e,k=d;null!==w;){var r=w.effectTag;
r&36&&hg(f,w.alternate,w,h,k);r&256&&ig(w,q);r&128&&jg(w);var t=w.nextEffect;w.nextEffect=null;w=t}}catch(ab){p=!0,n=ab}p&&(null===w?D("178"):void 0,g(w,n),null!==w&&(w=w.nextEffect))}ca=Za=!1;"function"===typeof Ie&&Ie(b.stateNode);b=c.current.expirationTime;0===b&&(ya=null);a.remainingExpirationTime=b}function S(){return null===$a||$a.timeRemaining()>Bg?!1:Ib=!0}function q(a){null===aa?D("246"):void 0;aa.remainingExpirationTime=0;Ba||(Ba=!0,Jb=a)}var u=kf(),t=ff(a,u),y=hf(u);u=jf(u);var H=gf(a),
Wa=$e(a,t,y,u,H,v,k).beginWork,Cb=af(a,t,y,u,H).completeWork;t=bf(t,y,u,v,c);var Jc=t.throwException,Kc=t.unwindWork,Lc=t.unwindInterruptedWork;t=df(a,g,v,k,function(a){null===ya?ya=new Set([a]):ya.add(a)},l);var Db=t.commitBeforeMutationLifeCycles,Mc=t.commitResetTextContent,Eb=t.commitPlacement,gg=t.commitDeletion,we=t.commitWork,hg=t.commitLifeCycles,ig=t.commitErrorLogging,jg=t.commitAttachRef,kg=t.commitDetachRef,Ic=a.now,lg=a.scheduleDeferredCallback,mg=a.cancelDeferredCallback,zg=a.prepareForCommit,
Ag=a.resetAfterCommit,Pc=Ic(),yg=2,ye=Pc,Rc=0,ia=0,ca=!1,I=null,Ya=null,Z=0,w=null,Za=!1,Nc=!1,ya=null,la=null,K=null,Gb=0,Qc=-1,T=!1,aa=null,P=0,da=0,Ib=!1,Ba=!1,Jb=null,$a=null,J=!1,Hb=!1,za=!1,Aa=null,xg=1E3,Fb=0,Bg=1;return{recalculateCurrentTime:l,computeExpirationForFiber:k,scheduleWork:v,requestWork:B,flushRoot:function(a,b){T?D("253"):void 0;aa=a;P=b;G(a,b,!1);n();Y()},batchedUpdates:function(a,b){var c=J;J=!0;try{return a(b)}finally{(J=c)||T||n()}},unbatchedUpdates:function(a,b){if(J&&!Hb){Hb=
!0;try{return a(b)}finally{Hb=!1}}return a(b)},flushSync:function(a,b){T?D("187"):void 0;var c=J;J=!0;try{return p(a,b)}finally{J=c,n()}},flushControlled:function(a){var b=J;J=!0;try{p(a)}finally{(J=b)||T||x(1,!1,null)}},deferredUpdates:function(a){var b=ia;ia=25*(((l()+500)/25|0)+1);try{return a()}finally{ia=b}},syncUpdates:p,interactiveUpdates:function(a,b,c){if(za)return a(b,c);J||T||0===da||(x(da,!1,null),da=0);var d=za,e=J;J=za=!0;try{return a(b,c)}finally{za=d,(J=e)||T||n()}},flushInteractiveUpdates:function(){T||
0===da||(x(da,!1,null),da=0)},computeUniqueAsyncExpiration:function(){var a=25*(((l()+500)/25|0)+1);a<=Rc&&(a=Rc+1);return Rc=a},legacyContext:y}}
function mf(a){function b(a,b,c,d,e,h){d=b.current;if(c){c=c._reactInternalFiber;var l=g(c);c=k(c)?v(c,l):l}else c=ka;null===b.context?b.context=c:b.pendingContext=c;b=h;Pe(d,{expirationTime:e,partialState:{element:a},callback:void 0===b?null:b,isReplace:!1,isForced:!1,capturedValue:null,next:null});f(d,e);return e}var c=a.getPublicInstance;a=lf(a);var d=a.recalculateCurrentTime,e=a.computeExpirationForFiber,f=a.scheduleWork,h=a.legacyContext,g=h.findCurrentUnmaskedContext,k=h.isContextProvider,v=
h.processChildContext;return{createContainer:function(a,b,c){b=new xe(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:c,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null};return b.stateNode=a},updateContainer:function(a,c,f,h){var g=c.current,k=d();g=e(g);return b(a,c,f,k,g,h)},updateContainerAtExpirationTime:function(a,c,e,f,g){var h=d();return b(a,c,e,h,f,g)},flushRoot:a.flushRoot,
requestWork:a.requestWork,computeUniqueAsyncExpiration:a.computeUniqueAsyncExpiration,batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,syncUpdates:a.syncUpdates,interactiveUpdates:a.interactiveUpdates,flushInteractiveUpdates:a.flushInteractiveUpdates,flushControlled:a.flushControlled,flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return c(a.child.stateNode);default:return a.child.stateNode}},
findHostInstance:function(a){var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?D("188"):D("268",Object.keys(a)));a=Bd(b);return null===a?null:a.stateNode},findHostInstanceWithNoPortals:function(a){a=Cd(a);return null===a?null:a.stateNode},injectIntoDevTools:function(a){var b=a.findFiberByHostInstance;return He(A({},a,{findHostInstanceByFiber:function(a){a=Bd(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))}}}
var nf=Object.freeze({default:mf}),of=nf&&mf||nf,pf=of["default"]?of["default"]:of;function qf(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:rc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}var rf="object"===typeof performance&&"function"===typeof performance.now,sf=void 0;sf=rf?function(){return performance.now()}:function(){return Date.now()};var tf=void 0,uf=void 0;
if(m.canUseDOM)if("function"!==typeof requestIdleCallback||"function"!==typeof cancelIdleCallback){var vf=null,wf=!1,xf=-1,yf=!1,zf=0,Af=33,Bf=33,Cf=void 0;Cf=rf?{didTimeout:!1,timeRemaining:function(){var a=zf-performance.now();return 0<a?a:0}}:{didTimeout:!1,timeRemaining:function(){var a=zf-Date.now();return 0<a?a:0}};var Df="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===Df){wf=!1;a=sf();if(0>=zf-a)if(-1!==
xf&&xf<=a)Cf.didTimeout=!0;else{yf||(yf=!0,requestAnimationFrame(Ef));return}else Cf.didTimeout=!1;xf=-1;a=vf;vf=null;null!==a&&a(Cf)}},!1);var Ef=function(a){yf=!1;var b=a-zf+Bf;b<Bf&&Af<Bf?(8>b&&(b=8),Bf=b<Af?Af:b):Af=b;zf=a+Bf;wf||(wf=!0,window.postMessage(Df,"*"))};tf=function(a,b){vf=a;null!=b&&"number"===typeof b.timeout&&(xf=sf()+b.timeout);yf||(yf=!0,requestAnimationFrame(Ef));return 0};uf=function(){vf=null;wf=!1;xf=-1}}else tf=window.requestIdleCallback,uf=window.cancelIdleCallback;else tf=
function(a){return setTimeout(function(){a({timeRemaining:function(){return Infinity},didTimeout:!1})})},uf=function(a){clearTimeout(a)};function Ff(a){var b="";ea.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}function Gf(a,b){a=A({children:void 0},b);if(b=Ff(b.children))a.children=b;return a}
function Hf(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function If(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Jf(a,b){null!=b.dangerouslySetInnerHTML?D("91"):void 0;return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Kf(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?D("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:D("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function Lf(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Mf(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Nf={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Of(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pf(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Of(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Qf=void 0,Rf=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Nf.svg||"innerHTML"in a)a.innerHTML=b;else{Qf=Qf||document.createElement("div");Qf.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e";for(b=Qf.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Sf(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var Tf={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Uf=["Webkit","ms","Moz","O"];Object.keys(Tf).forEach(function(a){Uf.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Tf[b]=Tf[a]})});
function Vf(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Tf.hasOwnProperty(e)&&Tf[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var Wf=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function Xf(a,b,c){b&&(Wf[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?D("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?D("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:D("61")),null!=b.style&&"object"!==typeof b.style?D("62",c()):void 0)}
function Yf(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var Zf=C.thatReturns("");
function $f(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=ke(a);b=va[b];for(var d=0;d<b.length;d++){var e=b[d];c.hasOwnProperty(e)&&c[e]||("topScroll"===e?Zd("topScroll","scroll",a):"topFocus"===e||"topBlur"===e?(Zd("topFocus","focus",a),Zd("topBlur","blur",a),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(ic("cancel",!0)&&Zd("topCancel","cancel",a),c.topCancel=!0):"topClose"===e?(ic("close",!0)&&Zd("topClose","close",a),c.topClose=!0):fe.hasOwnProperty(e)&&W(e,fe[e],a),c[e]=!0)}}
function ag(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===Nf.html&&(d=Of(a));d===Nf.html?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function bg(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function cg(a,b,c,d){var e=Yf(b,c);switch(b){case "iframe":case "object":W("topLoad","load",a);var f=c;break;case "video":case "audio":for(f in ge)ge.hasOwnProperty(f)&&W(f,ge[f],a);f=c;break;case "source":W("topError","error",a);f=c;break;case "img":case "image":case "link":W("topError","error",a);W("topLoad","load",a);f=c;break;case "form":W("topReset","reset",a);W("topSubmit","submit",a);f=c;break;case "details":W("topToggle","toggle",a);f=c;break;case "input":Wc(a,c);f=Vc(a,c);W("topInvalid",
"invalid",a);$f(d,"onChange");break;case "option":f=Gf(a,c);break;case "select":If(a,c);f=A({},c,{value:void 0});W("topInvalid","invalid",a);$f(d,"onChange");break;case "textarea":Kf(a,c);f=Jf(a,c);W("topInvalid","invalid",a);$f(d,"onChange");break;default:f=c}Xf(b,f,Zf);var h=f,g;for(g in h)if(h.hasOwnProperty(g)){var k=h[g];"style"===g?Vf(a,k,Zf):"dangerouslySetInnerHTML"===g?(k=k?k.__html:void 0,null!=k&&Rf(a,k)):"children"===g?"string"===typeof k?("textarea"!==b||""!==k)&&Sf(a,k):"number"===typeof k&&
Sf(a,""+k):"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&"autoFocus"!==g&&(ua.hasOwnProperty(g)?null!=k&&$f(d,g):null!=k&&Uc(a,g,k,e))}switch(b){case "input":lc(a);ad(a,c);break;case "textarea":lc(a);Mf(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?Hf(a,!!c.multiple,b,!1):null!=c.defaultValue&&Hf(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=C)}}
function dg(a,b,c,d,e){var f=null;switch(b){case "input":c=Vc(a,c);d=Vc(a,d);f=[];break;case "option":c=Gf(a,c);d=Gf(a,d);f=[];break;case "select":c=A({},c,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":c=Jf(a,c);d=Jf(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=C)}Xf(b,d,Zf);b=a=void 0;var h=null;for(a in c)if(!d.hasOwnProperty(a)&&c.hasOwnProperty(a)&&null!=c[a])if("style"===a){var g=c[a];for(b in g)g.hasOwnProperty(b)&&(h||
(h={}),h[b]="")}else"dangerouslySetInnerHTML"!==a&&"children"!==a&&"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(ua.hasOwnProperty(a)?f||(f=[]):(f=f||[]).push(a,null));for(a in d){var k=d[a];g=null!=c?c[a]:void 0;if(d.hasOwnProperty(a)&&k!==g&&(null!=k||null!=g))if("style"===a)if(g){for(b in g)!g.hasOwnProperty(b)||k&&k.hasOwnProperty(b)||(h||(h={}),h[b]="");for(b in k)k.hasOwnProperty(b)&&g[b]!==k[b]&&(h||(h={}),h[b]=k[b])}else h||(f||(f=[]),f.push(a,h)),
h=k;else"dangerouslySetInnerHTML"===a?(k=k?k.__html:void 0,g=g?g.__html:void 0,null!=k&&g!==k&&(f=f||[]).push(a,""+k)):"children"===a?g===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(a,""+k):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&(ua.hasOwnProperty(a)?(null!=k&&$f(e,a),f||g===k||(f=[])):(f=f||[]).push(a,k))}h&&(f=f||[]).push("style",h);return f}
function eg(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Yc(a,e);Yf(c,d);d=Yf(c,e);for(var f=0;f<b.length;f+=2){var h=b[f],g=b[f+1];"style"===h?Vf(a,g,Zf):"dangerouslySetInnerHTML"===h?Rf(a,g):"children"===h?Sf(a,g):Uc(a,h,g,d)}switch(c){case "input":Zc(a,e);break;case "textarea":Lf(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?Hf(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?
Hf(a,!!e.multiple,e.defaultValue,!0):Hf(a,!!e.multiple,e.multiple?[]:"",!1))}}
function fg(a,b,c,d,e){switch(b){case "iframe":case "object":W("topLoad","load",a);break;case "video":case "audio":for(var f in ge)ge.hasOwnProperty(f)&&W(f,ge[f],a);break;case "source":W("topError","error",a);break;case "img":case "image":case "link":W("topError","error",a);W("topLoad","load",a);break;case "form":W("topReset","reset",a);W("topSubmit","submit",a);break;case "details":W("topToggle","toggle",a);break;case "input":Wc(a,c);W("topInvalid","invalid",a);$f(e,"onChange");break;case "select":If(a,
c);W("topInvalid","invalid",a);$f(e,"onChange");break;case "textarea":Kf(a,c),W("topInvalid","invalid",a),$f(e,"onChange")}Xf(b,c,Zf);d=null;for(var h in c)c.hasOwnProperty(h)&&(f=c[h],"children"===h?"string"===typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):ua.hasOwnProperty(h)&&null!=f&&$f(e,h));switch(b){case "input":lc(a);ad(a,c);break;case "textarea":lc(a);Mf(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&
(a.onclick=C)}return d}function ng(a,b){return a.nodeValue!==b}
var og=Object.freeze({createElement:ag,createTextNode:bg,setInitialProperties:cg,diffProperties:dg,updateProperties:eg,diffHydratedProperties:fg,diffHydratedText:ng,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Zc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=
c.parentNode;c=c.querySelectorAll("input[name\x3d"+JSON.stringify(""+b)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Xa(d);e?void 0:D("90");mc(d);Zc(d,e)}}}break;case "textarea":Lf(a,c);break;case "select":b=c.value,null!=b&&Hf(a,!!c.multiple,b,!1)}}});Tb.injectFiberControlledHostComponent(og);var pg=null,qg=null;
function rg(a){this._expirationTime=X.computeUniqueAsyncExpiration();this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0}rg.prototype.render=function(a){this._defer?void 0:D("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new sg;X.updateContainerAtExpirationTime(a,b,null,c,d._onCommit);return d};
rg.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
rg.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:D("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?D("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this}this._defer=!1;X.flushRoot(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children)}else this._next=
null,this._defer=!1};rg.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}};function sg(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this)}sg.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
sg.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?D("191",c):void 0;c()}}};function tg(a,b,c){this._internalRoot=X.createContainer(a,b,c)}tg.prototype.render=function(a,b){var c=this._internalRoot,d=new sg;b=void 0===b?null:b;null!==b&&d.then(b);X.updateContainer(a,c,null,d._onCommit);return d};
tg.prototype.unmount=function(a){var b=this._internalRoot,c=new sg;a=void 0===a?null:a;null!==a&&c.then(a);X.updateContainer(null,b,null,c._onCommit);return c};tg.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new sg;c=void 0===c?null:c;null!==c&&e.then(c);X.updateContainer(b,d,a,e._onCommit);return e};
tg.prototype.createBatch=function(){var a=new rg(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a)}return a};function ug(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function vg(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
var X=pf({getRootHostContext:function(a){var b=a.nodeType;switch(b){case 9:case 11:a=(a=a.documentElement)?a.namespaceURI:Pf(null,"");break;default:b=8===b?a.parentNode:a,a=b.namespaceURI||null,b=b.tagName,a=Pf(a,b)}return a},getChildHostContext:function(a,b){return Pf(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){pg=Vd;var a=fa();if(ne(a)){if("selectionStart"in a)var b={start:a.selectionStart,end:a.selectionEnd};else a:{var c=window.getSelection&&window.getSelection();
if(c&&0!==c.rangeCount){b=c.anchorNode;var d=c.anchorOffset,e=c.focusNode;c=c.focusOffset;try{b.nodeType,e.nodeType}catch(B){b=null;break a}var f=0,h=-1,g=-1,k=0,v=0,l=a,p=null;b:for(;;){for(var z;;){l!==b||0!==d&&3!==l.nodeType||(h=f+d);l!==e||0!==c&&3!==l.nodeType||(g=f+c);3===l.nodeType&&(f+=l.nodeValue.length);if(null===(z=l.firstChild))break;p=l;l=z}for(;;){if(l===a)break b;p===b&&++k===d&&(h=f);p===e&&++v===c&&(g=f);if(null!==(z=l.nextSibling))break;l=p;p=l.parentNode}l=z}b=-1===h||-1===g?null:
{start:h,end:g}}else b=null}b=b||{start:0,end:0}}else b=null;qg={focusedElem:a,selectionRange:b};Wd(!1)},resetAfterCommit:function(){var a=qg,b=fa(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&ja(document.documentElement,c)){if(ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(window.getSelection){b=window.getSelection();var e=c[mb()].length;a=Math.min(d.start,e);d=void 0===d.end?a:Math.min(d.end,e);!b.extend&&a>
d&&(e=d,d=a,a=e);e=me(c,a);var f=me(c,d);if(e&&f&&(1!==b.rangeCount||b.anchorNode!==e.node||b.anchorOffset!==e.offset||b.focusNode!==f.node||b.focusOffset!==f.offset)){var h=document.createRange();h.setStart(e.node,e.offset);b.removeAllRanges();a>d?(b.addRange(h),b.extend(f.node,f.offset)):(h.setEnd(f.node,f.offset),b.addRange(h))}}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,
a.element.scrollTop=a.top}qg=null;Wd(pg);pg=null},createInstance:function(a,b,c,d,e){a=ag(a,b,c,d);a[F]=e;a[Ta]=b;return a},appendInitialChild:function(a,b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){cg(a,b,c,d);return vg(b,c)},prepareUpdate:function(a,b,c,d,e){return dg(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===
typeof b.dangerouslySetInnerHTML.__html},shouldDeprioritizeSubtree:function(a,b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=bg(a,b);a[F]=d;return a},now:sf,mutation:{commitMount:function(a,b,c){vg(b,c)&&a.focus()},commitUpdate:function(a,b,c,d,e){a[Ta]=e;eg(a,b,c,d,e)},resetTextContent:function(a){Sf(a,"")},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,b){8===a.nodeType?a.parentNode.insertBefore(b,a):a.appendChild(b)},
insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,b,c){8===a.nodeType?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,b){8===a.nodeType?a.parentNode.removeChild(b):a.removeChild(b)}},hydration:{canHydrateInstance:function(a,b){return 1!==a.nodeType||b.toLowerCase()!==a.nodeName.toLowerCase()?null:a},canHydrateTextInstance:function(a,b){return""===b||3!==a.nodeType?null:a},getNextHydratableSibling:function(a){for(a=
a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){a[F]=f;a[Ta]=c;return fg(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){a[F]=c;return ng(a,b)},didNotMatchHydratedContainerTextInstance:function(){},didNotMatchHydratedTextInstance:function(){},didNotHydrateContainerInstance:function(){},didNotHydrateInstance:function(){},
didNotFindHydratableContainerInstance:function(){},didNotFindHydratableContainerTextInstance:function(){},didNotFindHydratableInstance:function(){},didNotFindHydratableTextInstance:function(){}},scheduleDeferredCallback:tf,cancelDeferredCallback:uf}),Cg=X;ac=Cg.batchedUpdates;bc=Cg.interactiveUpdates;cc=Cg.flushInteractiveUpdates;
function Dg(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new tg(a,!1,b)}
function Eg(a,b,c,d,e){ug(c)?void 0:D("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var h=e;e=function(){var a=X.getPublicRootInstance(f._internalRoot);h.call(a)}}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)}else{f=c._reactRootContainer=Dg(c,d);if("function"===typeof e){var g=e;e=function(){var a=X.getPublicRootInstance(f._internalRoot);g.call(a)}}X.unbatchedUpdates(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)})}return X.getPublicRootInstance(f._internalRoot)}
function Fg(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;ug(b)?void 0:D("200");return qf(a,b,null,c)}
var Gg={createPortal:Fg,findDOMNode:function(a){return null==a?null:1===a.nodeType?a:X.findHostInstance(a)},hydrate:function(a,b,c){return Eg(null,a,b,!0,c)},render:function(a,b,c){return Eg(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?D("38"):void 0;return Eg(a,b,c,!1,d)},unmountComponentAtNode:function(a){ug(a)?void 0:D("40");return a._reactRootContainer?(X.unbatchedUpdates(function(){Eg(null,null,a,!1,function(){a._reactRootContainer=
null})}),!0):!1},unstable_createPortal:function(){return Fg.apply(void 0,arguments)},unstable_batchedUpdates:X.batchedUpdates,unstable_deferredUpdates:X.deferredUpdates,flushSync:X.flushSync,unstable_flushControlled:X.flushControlled,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Ra,EventPluginRegistry:Ca,EventPropagators:kb,ReactControlledComponent:$b,ReactDOMComponentTree:bb,ReactDOMEventListener:$d},unstable_createRoot:function(a,b){return new tg(a,!0,null!=b&&!0===b.hydrate)}};
X.injectIntoDevTools({findFiberByHostInstance:Ua,bundleType:0,version:"16.3.2",rendererPackageName:"react-dom"});var Hg=Object.freeze({default:Gg}),Ig=Hg&&Gg||Hg;module.exports=Ig["default"]?Ig["default"]:Ig;

},{"fbjs/lib/invariant":56,"react":20,"fbjs/lib/ExecutionEnvironment":57,"object-assign":55,"fbjs/lib/emptyFunction":59,"fbjs/lib/getActiveElement":58,"fbjs/lib/shallowEqual":60,"fbjs/lib/containsNode":61,"fbjs/lib/emptyObject":62}],21:[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if ('production' !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if ('production' === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.production.min.js":32}],64:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = isUndefined;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isDate = isDate;
exports.hasIntl = hasIntl;
exports.hasFormatToParts = hasFormatToParts;
exports.maybeArray = maybeArray;
exports.bestBy = bestBy;
exports.pick = pick;
exports.numberBetween = numberBetween;
exports.floorMod = floorMod;
exports.padStart = padStart;
exports.parseMillis = parseMillis;
exports.roundTo = roundTo;
exports.isLeapYear = isLeapYear;
exports.daysInYear = daysInYear;
exports.daysInMonth = daysInMonth;
exports.weeksInWeekYear = weeksInWeekYear;
exports.untruncateYear = untruncateYear;
exports.parseZoneInfo = parseZoneInfo;
exports.signedOffset = signedOffset;
exports.normalizeObject = normalizeObject;
exports.timeObject = timeObject;
/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/

/**
 * @private
 */

// TYPES

function isUndefined(o) {
  return typeof o === 'undefined';
}

function isNumber(o) {
  return typeof o === 'number';
}

function isString(o) {
  return typeof o === 'string';
}

function isDate(o) {
  return Object.prototype.toString.call(o) === '[object Date]';
}

// CAPABILITIES

function hasIntl() {
  return typeof Intl !== 'undefined' && Intl.DateTimeFormat;
}

function hasFormatToParts() {
  return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
}

// OBJECTS AND ARRAYS

function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}

function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return undefined;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare.apply(null, [best[0], pair[0]]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}

function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}

// NUMBERS AND STRINGS

function numberBetween(thing, bottom, top) {
  return isNumber(thing) && thing >= bottom && thing <= top;
}

// x % n but takes the sign of n instead of x
function floorMod(x, n) {
  return x - n * Math.floor(x / n);
}

function padStart(input, n = 2) {
  if (input.toString().length < n) {
    return ('0'.repeat(n) + input).slice(-n);
  } else {
    return input.toString();
  }
}

function parseMillis(fraction) {
  if (isUndefined(fraction)) {
    return NaN;
  } else {
    const f = parseFloat('0.' + fraction) * 1000;
    return Math.floor(f);
  }
}

function roundTo(number, digits) {
  const factor = 10 ** digits;
  return Math.round(number * factor) / factor;
}

// DATE BASICS

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1,
        modYear = year + (month - modMonth) / 12;

  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}

function weeksInWeekYear(weekYear) {
  const p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7,
        last = weekYear - 1,
        p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}

function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > 60 ? 1900 + year : 2000 + year;
}

// PARSING

function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts),
        intlOpts = {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };

  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }

  const modified = Object.assign({ timeZoneName: offsetFormat }, intlOpts),
        intl = hasIntl();

  if (intl && hasFormatToParts()) {
    const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(m => m.type.toLowerCase() === 'timezonename');
    return parsed ? parsed.value : null;
  } else if (intl) {
    // this probably doesn't work for all locales
    const without = new Intl.DateTimeFormat(locale, intlOpts).format(date),
          included = new Intl.DateTimeFormat(locale, modified).format(date),
          diffed = included.substring(without.length),
          trimmed = diffed.replace(/^[, ]+/, '');
    return trimmed;
  } else {
    return null;
  }
}

// signedOffset('-5', '30') -> -330
function signedOffset(offHourStr, offMinuteStr) {
  const offHour = parseInt(offHourStr, 10) || 0,
        offMin = parseInt(offMinuteStr, 10) || 0,
        offMinSigned = offHour < 0 ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}

// COERCION

function normalizeObject(obj, normalizer, ignoreUnknown = false) {
  const normalized = {};
  for (const u in obj) {
    if (obj.hasOwnProperty(u)) {
      const v = obj[u];
      if (v !== null && !isUndefined(v) && !Number.isNaN(v)) {
        const mapped = normalizer(u, ignoreUnknown);
        if (mapped) {
          normalized[mapped] = v;
        }
      }
    }
  }
  return normalized;
}

function timeObject(obj) {
  return pick(obj, ['hour', 'minute', 'second', 'millisecond']);
}
},{}],72:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @private
 */

const n = 'numeric',
      s = 'short',
      l = 'long',
      d2 = '2-digit';

const DATE_SHORT = exports.DATE_SHORT = {
  year: n,
  month: n,
  day: n
};

const DATE_MED = exports.DATE_MED = {
  year: n,
  month: s,
  day: n
};

const DATE_FULL = exports.DATE_FULL = {
  year: n,
  month: l,
  day: n
};

const DATE_HUGE = exports.DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};

const TIME_SIMPLE = exports.TIME_SIMPLE = {
  hour: n,
  minute: d2
};

const TIME_WITH_SECONDS = exports.TIME_WITH_SECONDS = {
  hour: n,
  minute: d2,
  second: d2
};

const TIME_WITH_SHORT_OFFSET = exports.TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: d2,
  second: d2,
  timeZoneName: s
};

const TIME_WITH_LONG_OFFSET = exports.TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: d2,
  second: d2,
  timeZoneName: l
};

const TIME_24_SIMPLE = exports.TIME_24_SIMPLE = {
  hour: n,
  minute: d2,
  hour12: false
};

/**
 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
 */
const TIME_24_WITH_SECONDS = exports.TIME_24_WITH_SECONDS = {
  hour: n,
  minute: d2,
  second: d2,
  hour12: false
};

/**
 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
 */
const TIME_24_WITH_SHORT_OFFSET = exports.TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: d2,
  second: d2,
  hour12: false,
  timeZoneName: s
};

/**
 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
 */
const TIME_24_WITH_LONG_OFFSET = exports.TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: d2,
  second: d2,
  hour12: false,
  timeZoneName: l
};

/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
 */
const DATETIME_SHORT = exports.DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: d2
};

/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
 */
const DATETIME_SHORT_WITH_SECONDS = exports.DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: d2,
  second: d2
};

const DATETIME_MED = exports.DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: d2
};

const DATETIME_MED_WITH_SECONDS = exports.DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: d2,
  second: d2
};

const DATETIME_FULL = exports.DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: d2,
  timeZoneName: s
};

const DATETIME_FULL_WITH_SECONDS = exports.DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: d2,
  second: d2,
  timeZoneName: s
};

const DATETIME_HUGE = exports.DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: d2,
  timeZoneName: l
};

const DATETIME_HUGE_WITH_SECONDS = exports.DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: d2,
  second: d2,
  timeZoneName: l
};
},{}],76:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.erasNarrow = exports.erasShort = exports.erasLong = exports.meridiems = exports.weekdaysNarrow = exports.weekdaysShort = exports.weekdaysLong = exports.monthsNarrow = exports.monthsShort = exports.monthsLong = undefined;
exports.months = months;
exports.weekdays = weekdays;
exports.eras = eras;
exports.meridiemForDateTime = meridiemForDateTime;
exports.weekdayForDateTime = weekdayForDateTime;
exports.monthForDateTime = monthForDateTime;
exports.eraForDateTime = eraForDateTime;
exports.formatString = formatString;

var _formats = require('./formats');

var Formats = _interopRequireWildcard(_formats);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function stringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

/**
 * @private
 */

const monthsLong = exports.monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthsShort = exports.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const monthsNarrow = exports.monthsNarrow = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

function months(length) {
  switch (length) {
    case 'narrow':
      return monthsNarrow;
    case 'short':
      return monthsShort;
    case 'long':
      return monthsLong;
    case 'numeric':
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    case '2-digit':
      return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    default:
      return null;
  }
}

const weekdaysLong = exports.weekdaysLong = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weekdaysShort = exports.weekdaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weekdaysNarrow = exports.weekdaysNarrow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function weekdays(length) {
  switch (length) {
    case 'narrow':
      return weekdaysNarrow;
    case 'short':
      return weekdaysShort;
    case 'long':
      return weekdaysLong;
    case 'numeric':
      return ['1', '2', '3', '4', '5', '6', '7'];
    default:
      return null;
  }
}

const meridiems = exports.meridiems = ['AM', 'PM'];

const erasLong = exports.erasLong = ['Before Christ', 'Anno Domini'];

const erasShort = exports.erasShort = ['BC', 'AD'];

const erasNarrow = exports.erasNarrow = ['B', 'A'];

function eras(length) {
  switch (length) {
    case 'narrow':
      return erasNarrow;
    case 'short':
      return erasShort;
    case 'long':
      return erasLong;
    default:
      return null;
  }
}

function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}

function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}

function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}

function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}

function formatString(knownFormat) {
  // these all have the offsets removed because we don't have access to them
  // without all the intl stuff this is backfilling
  const filtered = (0, _util.pick)(knownFormat, ['weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName', 'hour12']),
        key = stringify(filtered),
        dateTimeHuge = 'EEEE, LLLL d, yyyy, h:mm a';
  switch (key) {
    case stringify(Formats.DATE_SHORT):
      return 'M/d/yyyy';
    case stringify(Formats.DATE_MED):
      return 'LLL d, yyyy';
    case stringify(Formats.DATE_FULL):
      return 'LLLL d, yyyy';
    case stringify(Formats.DATE_HUGE):
      return 'EEEE, LLLL d, yyyy';
    case stringify(Formats.TIME_SIMPLE):
      return 'h:mm a';
    case stringify(Formats.TIME_WITH_SECONDS):
      return 'h:mm:ss a';
    case stringify(Formats.TIME_WITH_SHORT_OFFSET):
      return 'h:mm a';
    case stringify(Formats.TIME_WITH_LONG_OFFSET):
      return 'h:mm a';
    case stringify(Formats.TIME_24_SIMPLE):
      return 'HH:mm';
    case stringify(Formats.TIME_24_WITH_SECONDS):
      return 'HH:mm:ss';
    case stringify(Formats.TIME_24_WITH_SHORT_OFFSET):
      return 'HH:mm';
    case stringify(Formats.TIME_24_WITH_LONG_OFFSET):
      return 'HH:mm';
    case stringify(Formats.DATETIME_SHORT):
      return 'M/d/yyyy, h:mm a';
    case stringify(Formats.DATETIME_MED):
      return 'LLL d, yyyy, h:mm a';
    case stringify(Formats.DATETIME_FULL):
      return 'LLLL d, yyyy, h:mm a';
    case stringify(Formats.DATETIME_HUGE):
      return dateTimeHuge;
    case stringify(Formats.DATETIME_SHORT_WITH_SECONDS):
      return 'M/d/yyyy, h:mm:ss a';
    case stringify(Formats.DATETIME_MED_WITH_SECONDS):
      return 'LLL d, yyyy, h:mm:ss a';
    case stringify(Formats.DATETIME_FULL_WITH_SECONDS):
      return 'LLLL d, yyyy, h:mm:ss a';
    case stringify(Formats.DATETIME_HUGE_WITH_SECONDS):
      return 'EEEE, LLLL d, yyyy, h:mm:ss a';
    default:
      return dateTimeHuge;
  }
}
},{"./formats":72,"./util":64}],63:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
class LuxonError extends Error {}

/**
 * @private
 */
class InvalidDateTimeError extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason}`);
  }
}

exports.InvalidDateTimeError = InvalidDateTimeError; /**
                                                      * @private
                                                      */

class InvalidIntervalError extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason}`);
  }
}

exports.InvalidIntervalError = InvalidIntervalError; /**
                                                      * @private
                                                      */

class InvalidDurationError extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason}`);
  }
}

exports.InvalidDurationError = InvalidDurationError; /**
                                                      * @private
                                                      */

class ConflictingSpecificationError extends LuxonError {}

exports.ConflictingSpecificationError = ConflictingSpecificationError; /**
                                                                        * @private
                                                                        */

class InvalidUnitError extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
}

exports.InvalidUnitError = InvalidUnitError; /**
                                              * @private
                                              */

class InvalidArgumentError extends LuxonError {}

exports.InvalidArgumentError = InvalidArgumentError; /**
                                                      * @private
                                                      */

class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super('Zone is an abstract class');
  }
}
exports.ZoneIsAbstractError = ZoneIsAbstractError;
},{}],39:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('./errors');

/**
 * @interface
*/
class Zone {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new _errors.ZoneIsAbstractError();
  }

  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new _errors.ZoneIsAbstractError();
  }

  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get universal() {
    throw new _errors.ZoneIsAbstractError();
  }

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.localeCode - What locale to return the offset name in. Defaults to us-en
   * @return {string}
   */
  static offsetName(ts, opts) {
    throw new _errors.ZoneIsAbstractError();
  }

  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    throw new _errors.ZoneIsAbstractError();
  }

  /**
   * Return whether this Zone is equal to another zoner
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    throw new _errors.ZoneIsAbstractError();
  }

  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new _errors.ZoneIsAbstractError();
  }
}
exports.default = Zone; /* eslint no-unused-vars: "off" */
},{"./errors":63}],43:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../impl/util');

var _zone = require('../zone');

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let singleton = null;

/**
 * @private
 */

class LocalZone extends _zone2.default {
  static get instance() {
    if (singleton === null) {
      singleton = new LocalZone();
    }
    return singleton;
  }

  get type() {
    return 'local';
  }

  get name() {
    if ((0, _util.hasIntl)()) {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else return 'local';
  }

  get universal() {
    return false;
  }

  offsetName(ts, { format, locale }) {
    return (0, _util.parseZoneInfo)(ts, format, locale);
  }

  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }

  equals(otherZone) {
    return otherZone.type === 'local';
  }

  get isValid() {
    return true;
  }
}
exports.default = LocalZone;
},{"../impl/util":64,"../zone":39}],42:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../impl/util');

var _zone = require('../zone');

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: zone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  return dtfCache[zone];
}

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ''),
        parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
        [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date),
        filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i],
          pos = typeToPos[type];

    if (!(0, _util.isUndefined)(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}

/**
 * @private
 */

class IANAZone extends _zone2.default {
  static isValidSpecifier(s) {
    return s && s.match(/^[a-z_+-]{1,256}\/[a-z_+-]{1,256}(\/[a-z_+-]{1,256})?$/i);
  }

  static isValidZone(zone) {
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Etc/GMT+8 -> 480
  static parseGMTOffset(specifier) {
    if (specifier) {
      const match = specifier.match(/^Etc\/GMT([+-]\d{1,2})$/i);
      if (match) {
        return 60 * parseInt(match[1]);
      }
    }
    return null;
  }

  constructor(name) {
    super();
    this.zoneName = name;
    this.valid = IANAZone.isValidZone(name);
  }

  get type() {
    return 'iana';
  }

  get name() {
    return this.zoneName;
  }

  get universal() {
    return false;
  }

  offsetName(ts, { format, locale }) {
    return (0, _util.parseZoneInfo)(ts, format, locale, this.zoneName);
  }

  offset(ts) {
    const date = new Date(ts),
          dtf = makeDTF(this.zoneName),
          [fYear, fMonth, fDay, fHour, fMinute, fSecond] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date),
          asUTC = Date.UTC(fYear, fMonth - 1, fDay, fHour, fMinute, fSecond);
    let asTS = date.valueOf();
    asTS -= asTS % 1000;
    return (asUTC - asTS) / (60 * 1000);
  }

  equals(otherZone) {
    return otherZone.type === 'iana' && otherZone.zoneName === this.zoneName;
  }

  get isValid() {
    return this.valid;
  }
}
exports.default = IANAZone;
},{"../impl/util":64,"../zone":39}],41:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../impl/util');

var _zone = require('../zone');

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let singleton = null;

function hoursMinutesOffset(z) {
  const hours = Math.trunc(z.fixed / 60),
        minutes = Math.abs(z.fixed % 60),
        sign = hours > 0 ? '+' : '-',
        base = sign + Math.abs(hours);
  return minutes > 0 ? `${base}:${(0, _util.padStart)(minutes, 2)}` : base;
}

/**
 * @private
 */

class FixedOffsetZone extends _zone2.default {
  static get utcInstance() {
    if (singleton === null) {
      singleton = new FixedOffsetZone(0);
    }
    return singleton;
  }

  static instance(offset) {
    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
  }

  static parseSpecifier(s) {
    if (s) {
      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new FixedOffsetZone((0, _util.signedOffset)(r[1], r[2]));
      }
    }
    return null;
  }

  constructor(offset) {
    super();
    this.fixed = offset;
  }

  get type() {
    return 'fixed';
  }

  get name() {
    return this.fixed === 0 ? 'UTC' : `UTC${hoursMinutesOffset(this)}`;
  }

  offsetName() {
    return this.name;
  }

  get universal() {
    return true;
  }

  offset() {
    return this.fixed;
  }

  equals(otherZone) {
    return otherZone.type === 'fixed' && otherZone.fixed === this.fixed;
  }

  get isValid() {
    return true;
  }
}
exports.default = FixedOffsetZone;
},{"../impl/util":64,"../zone":39}],78:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zone = require('../zone');

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let singleton = null;

class InvalidZone extends _zone2.default {
  static get instance() {
    if (singleton === null) {
      singleton = new InvalidZone();
    }
    return singleton;
  }

  get type() {
    return 'invalid';
  }

  get name() {
    return null;
  }

  get universal() {
    return false;
  }

  offsetName() {
    return null;
  }

  offset() {
    return NaN;
  }

  equals() {
    return false;
  }

  get isValid() {
    return false;
  }
}
exports.default = InvalidZone;
},{"../zone":39}],68:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeZone = normalizeZone;

var _zone = require('../zone');

var _zone2 = _interopRequireDefault(_zone);

var _localZone = require('../zones/localZone');

var _localZone2 = _interopRequireDefault(_localZone);

var _IANAZone = require('../zones/IANAZone');

var _IANAZone2 = _interopRequireDefault(_IANAZone);

var _fixedOffsetZone = require('../zones/fixedOffsetZone');

var _fixedOffsetZone2 = _interopRequireDefault(_fixedOffsetZone);

var _invalidZone = require('../zones/invalidZone');

var _invalidZone2 = _interopRequireDefault(_invalidZone);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */

function normalizeZone(input, defaultZone) {
  let offset;
  if ((0, _util.isUndefined)(input) || input === null) {
    return defaultZone;
  } else if (input instanceof _zone2.default) {
    return input;
  } else if ((0, _util.isString)(input)) {
    const lowered = input.toLowerCase();
    if (lowered === 'local') return _localZone2.default.instance;else if (lowered === 'utc' || lowered === 'gmt') return _fixedOffsetZone2.default.utcInstance;else if ((offset = _IANAZone2.default.parseGMTOffset(input)) != null) {
      // handle Etc/GMT-4, which V8 chokes on
      return _fixedOffsetZone2.default.instance(offset);
    } else if (_IANAZone2.default.isValidSpecifier(lowered)) return new _IANAZone2.default(input);else return _fixedOffsetZone2.default.parseSpecifier(lowered) || _invalidZone2.default.instance;
  } else if ((0, _util.isNumber)(input)) {
    return _fixedOffsetZone2.default.instance(input);
  } else if (typeof input === 'object' && input.offset) {
    // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
  } else {
    return _invalidZone2.default.instance;
  }
}
},{"../zone":39,"../zones/localZone":43,"../zones/IANAZone":42,"../zones/fixedOffsetZone":41,"../zones/invalidZone":78,"./util":64}],40:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localZone = require('./zones/localZone');

var _localZone2 = _interopRequireDefault(_localZone);

var _locale = require('./impl/locale');

var _locale2 = _interopRequireDefault(_locale);

var _zoneUtil = require('./impl/zoneUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let now = () => new Date().valueOf(),
    defaultZone = null,
    // not setting this directly to LocalZone.instance bc loading order issues
defaultLocale = null,
    defaultNumberingSystem = null,
    defaultOutputCalendar = null,
    throwOnInvalid = false;

/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */
class Settings {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return now;
  }

  /**
   * Set the callback for returning the current timestamp.
   * @type {function}
   */
  static set now(n) {
    now = n;
  }

  /**
   * Get the default time zone to create DateTimes in.
   * @type {string}
   */
  static get defaultZoneName() {
    return (defaultZone || _localZone2.default.instance).name;
  }

  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * @type {string}
   */
  static set defaultZoneName(z) {
    if (!z) {
      defaultZone = null;
    } else {
      defaultZone = (0, _zoneUtil.normalizeZone)(z);
    }
  }

  /**
   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
   * @type {Zone}
   */
  static get defaultZone() {
    return defaultZone || _localZone2.default.instance;
  }

  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return defaultLocale;
  }

  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }

  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }

  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }

  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }

  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }

  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }

  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    throwOnInvalid = t;
  }

  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    _locale2.default.resetCache();
  }
}
exports.default = Settings;
},{"./zones/localZone":43,"./impl/locale":65,"./impl/zoneUtil":68}],66:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _english = require('./english');

var English = _interopRequireWildcard(_english);

var _formats = require('./formats');

var Formats = _interopRequireWildcard(_formats);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function stringifyTokens(splits, tokenToString) {
  let s = '';
  for (const token of splits) {
    if (token.literal) {
      s += token.val;
    } else {
      s += tokenToString(token.val);
    }
  }
  return s;
}

const tokenToObject = {
  D: Formats.DATE_SHORT,
  DD: Formats.DATE_MED,
  DDD: Formats.DATE_FULL,
  DDDD: Formats.DATE_HUGE,
  t: Formats.TIME_SIMPLE,
  tt: Formats.TIME_WITH_SECONDS,
  ttt: Formats.TIME_WITH_SHORT_OFFSET,
  tttt: Formats.TIME_WITH_LONG_OFFSET,
  T: Formats.TIME_24_SIMPLE,
  TT: Formats.TIME_24_WITH_SECONDS,
  TTT: Formats.TIME_24_WITH_SHORT_OFFSET,
  TTTT: Formats.TIME_24_WITH_LONG_OFFSET,
  f: Formats.DATETIME_SHORT,
  ff: Formats.DATETIME_MED,
  fff: Formats.DATETIME_FULL,
  ffff: Formats.DATETIME_HUGE,
  F: Formats.DATETIME_SHORT_WITH_SECONDS,
  FF: Formats.DATETIME_MED_WITH_SECONDS,
  FFF: Formats.DATETIME_FULL_WITH_SECONDS,
  FFFF: Formats.DATETIME_HUGE_WITH_SECONDS
};

/**
 * @private
 */

class Formatter {
  static create(locale, opts = {}) {
    const formatOpts = Object.assign({}, { round: true }, opts);
    return new Formatter(locale, formatOpts);
  }

  static parseFormat(fmt) {
    let current = null,
        currentFull = '',
        bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed, val: currentFull });
        }
        current = null;
        currentFull = '';
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: false, val: currentFull });
        }
        currentFull = c;
        current = c;
      }
    }

    if (currentFull.length > 0) {
      splits.push({ literal: bracketed, val: currentFull });
    }

    return splits;
  }

  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }

  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.format();
  }

  formatDateTime(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.format();
  }

  formatDateTimeParts(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.formatToParts();
  }

  resolvedOptions(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.resolvedOptions();
  }

  num(n, p = 0) {
    // we get some perf out of doing this here, annoyingly
    if (this.opts.forceSimple) {
      return (0, _util.padStart)(n, p);
    }

    const opts = Object.assign({}, this.opts);

    if (p > 0) {
      opts.padTo = p;
    }

    return this.loc.numberFormatter(opts).format(n);
  }

  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === 'en';
    const string = (opts, extract) => this.loc.extract(dt, opts, extract),
          formatOffset = opts => {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return 'Z';
      }

      const hours = Math.trunc(dt.offset / 60),
            minutes = Math.abs(dt.offset % 60),
            sign = hours >= 0 ? '+' : '-',
            base = `${sign}${Math.abs(hours)}`;

      switch (opts.format) {
        case 'short':
          return `${sign}${this.num(Math.abs(hours), 2)}:${this.num(minutes, 2)}`;
        case 'narrow':
          return minutes > 0 ? `${base}:${minutes}` : base;
        case 'techie':
          return `${sign}${this.num(Math.abs(hours), 2)}${this.num(minutes, 2)}`;
        default:
          throw new RangeError(`Value format ${opts.format} is out of range for property format`);
      }
    },
          meridiem = () => knownEnglish ? English.meridiemForDateTime(dt) : string({ hour: 'numeric', hour12: true }, 'dayperiod'),
          month = (length, standalone) => knownEnglish ? English.monthForDateTime(dt, length) : string(standalone ? { month: length } : { month: length, day: 'numeric' }, 'month'),
          weekday = (length, standalone) => knownEnglish ? English.weekdayForDateTime(dt, length) : string(standalone ? { weekday: length } : { weekday: length, month: 'long', day: 'numeric' }, 'weekday'),
          maybeMacro = token => {
      const macro = tokenToObject[token];
      if (macro) {
        return this.formatWithSystemDefault(dt, macro);
      } else {
        return token;
      }
    },
          era = length => knownEnglish ? English.eraForDateTime(dt, length) : string({ era: length }, 'era'),
          tokenToString = token => {
      const outputCal = this.loc.outputCalendar;

      // Where possible: http://cldr.unicode.org/translation/date-time#TOC-Stand-Alone-vs.-Format-Styles
      switch (token) {
        // ms
        case 'S':
          return this.num(dt.millisecond);
        case 'u':
        // falls through
        case 'SSS':
          return this.num(dt.millisecond, 3);
        // seconds
        case 's':
          return this.num(dt.second);
        case 'ss':
          return this.num(dt.second, 2);
        // minutes
        case 'm':
          return this.num(dt.minute);
        case 'mm':
          return this.num(dt.minute, 2);
        // hours
        case 'h':
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case 'hh':
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case 'H':
          return this.num(dt.hour);
        case 'HH':
          return this.num(dt.hour, 2);
        // offset
        case 'Z':
          // like +6
          return formatOffset({ format: 'narrow', allowZ: this.opts.allowZ });
        case 'ZZ':
          // like +06:00
          return formatOffset({ format: 'short', allowZ: this.opts.allowZ });
        case 'ZZZ':
          // like +0600
          return formatOffset({ format: 'techie', allowZ: false });
        case 'ZZZZ':
          // like EST
          return dt.offsetNameShort;
        case 'ZZZZZ':
          // like Eastern Standard Time
          return dt.offsetNameLong;
        // zone
        case 'z':
          // like America/New_York
          return dt.zoneName;
        // meridiems
        case 'a':
          return meridiem();
        // dates
        case 'd':
          return outputCal ? string({ day: 'numeric' }, 'day') : this.num(dt.day);
        case 'dd':
          return outputCal ? string({ day: '2-digit' }, 'day') : this.num(dt.day, 2);
        // weekdays - standalone
        case 'c':
          // like 1
          return this.num(dt.weekday);
        case 'ccc':
          // like 'Tues'
          return weekday('short', true);
        case 'cccc':
          // like 'Tuesday'
          return weekday('long', true);
        case 'ccccc':
          // like 'T'
          return weekday('narrow', true);
        // weekdays - format
        case 'E':
          // like 1
          return this.num(dt.weekday);
        case 'EEE':
          // like 'Tues'
          return weekday('short', false);
        case 'EEEE':
          // like 'Tuesday'
          return weekday('long', false);
        case 'EEEEE':
          // like 'T'
          return weekday('narrow', false);
        // months - standalone
        case 'L':
          // like 1
          return outputCal ? string({ month: 'numeric', day: 'numeric' }, 'month') : this.num(dt.month);
        case 'LL':
          // like 01, doesn't seem to work
          return outputCal ? string({ month: '2-digit', day: 'numeric' }, 'month') : this.num(dt.month, 2);
        case 'LLL':
          // like Jan
          return month('short', true);
        case 'LLLL':
          // like January
          return month('long', true);
        case 'LLLLL':
          // like J
          return month('narrow', true);
        // months - format
        case 'M':
          // like 1
          return outputCal ? string({ month: 'numeric' }, 'month') : this.num(dt.month);
        case 'MM':
          // like 01
          return outputCal ? string({ month: '2-digit' }, 'month') : this.num(dt.month, 2);
        case 'MMM':
          // like Jan
          return month('short', false);
        case 'MMMM':
          // like January
          return month('long', false);
        case 'MMMMM':
          // like J
          return month('narrow', false);
        // years
        case 'y':
          // like 2014
          return outputCal ? string({ year: 'numeric' }, 'year') : this.num(dt.year);
        case 'yy':
          // like 14
          return outputCal ? string({ year: '2-digit' }, 'year') : this.num(dt.year.toString().slice(-2), 2);
        case 'yyyy':
          // like 0012
          return outputCal ? string({ year: 'numeric' }, 'year') : this.num(dt.year, 4);
        case 'yyyyyy':
          // like 000012
          return outputCal ? string({ year: 'numeric' }, 'year') : this.num(dt.year, 6);
        // eras
        case 'G':
          // like AD
          return era('short');
        case 'GG':
          // like Anno Domini
          return era('long');
        case 'GGGGG':
          return era('narrow');
        case 'kk':
          return this.num(dt.weekYear.toString().slice(-2), 2);
        case 'kkkk':
          return this.num(dt.weekYear, 4);
        case 'W':
          return this.num(dt.weekNumber);
        case 'WW':
          return this.num(dt.weekNumber, 2);
        case 'o':
          return this.num(dt.ordinal);
        case 'ooo':
          return this.num(dt.ordinal, 3);
        case 'q':
          // like 1
          return this.num(dt.quarter);
        case 'qq':
          // like 01
          return this.num(dt.quarter, 2);
        default:
          return maybeMacro(token);
      }
    };

    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  }

  formatDurationFromString(dur, fmt) {
    const tokenToField = token => {
      switch (token[0]) {
        case 'S':
          return 'millisecond';
        case 's':
          return 'second';
        case 'm':
          return 'minute';
        case 'h':
          return 'hour';
        case 'd':
          return 'day';
        case 'M':
          return 'month';
        case 'y':
          return 'year';
        default:
          return null;
      }
    },
          tokenToString = lildur => token => {
      const mapped = tokenToField(token);
      if (mapped) {
        return this.num(lildur.get(mapped), token.length);
      } else {
        return token;
      }
    },
          tokens = Formatter.parseFormat(fmt),
          realTokens = tokens.reduce((found, { literal, val }) => literal ? found : found.concat(val), []),
          collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter(t => t));
    return stringifyTokens(tokens, tokenToString(collapsed));
  }
}
exports.default = Formatter;
},{"./english":76,"./formats":72,"./util":64}],65:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

var _english = require('./english');

var English = _interopRequireWildcard(_english);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _datetime = require('../datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else if ((0, _util.hasIntl)()) {
    const computedSys = new Intl.DateTimeFormat().resolvedOptions().locale;
    // node sometimes defaults to "und". Override that because that is dumb
    sysLocaleCache = computedSys === 'und' ? 'en-US' : computedSys;
    return sysLocaleCache;
  } else {
    sysLocaleCache = 'en-US';
    return sysLocaleCache;
  }
}

function intlConfigString(locale, numberingSystem, outputCalendar) {
  if ((0, _util.hasIntl)()) {
    locale = Array.isArray(locale) ? locale : [locale];

    if (outputCalendar || numberingSystem) {
      locale = locale.map(l => {
        l += '-u';

        if (outputCalendar) {
          l += '-ca-' + outputCalendar;
        }

        if (numberingSystem) {
          l += '-nu-' + numberingSystem;
        }
        return l;
      });
    }
    return locale;
  } else {
    return [];
  }
}

function mapMonths(f) {
  const ms = [];
  for (let i = 1; i <= 12; i++) {
    const dt = _datetime2.default.utc(2016, i, 1);
    ms.push(f(dt));
  }
  return ms;
}

function mapWeekdays(f) {
  const ms = [];
  for (let i = 1; i <= 7; i++) {
    const dt = _datetime2.default.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}

function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  const mode = loc.listingMode(defaultOK);

  if (mode === 'error') {
    return null;
  } else if (mode === 'en') {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}

function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== 'latn') {
    return false;
  } else {
    return loc.numberingSystem === 'latn' || !loc.locale || loc.locale.startsWith('en') || (0, _util.hasIntl)() && Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === 'latn';
  }
}

/**
 * @private
 */

class SimpleNumberFormatter {
  constructor(opts) {
    this.padTo = opts.padTo || 0;
    this.round = opts.round || false;
  }

  format(i) {
    // to match the browser's numberformatter defaults
    const digits = this.round ? 0 : 3,
          rounded = (0, _util.roundTo)(i, digits);
    return (0, _util.padStart)(rounded, this.padTo);
  }
}

/**
 * @private
 */

class PolyDateFormatter {
  constructor(dt, intl, opts) {
    this.opts = opts;
    this.hasIntl = (0, _util.hasIntl)();

    let z;
    if (dt.zone.universal && this.hasIntl) {
      // Chromium doesn't support fixed-offset zones like Etc/GMT+8 in its formatter,
      // See https://bugs.chromium.org/p/chromium/issues/detail?id=364374.
      // So we have to make do. Two cases:
      // 1. The format options tell us to show the zone. We can't do that, so the best
      // we can do is format the date in UTC.
      // 2. The format options don't tell us to show the zone. Then we can adjust them
      // the time and tell the formatter to show it to us in UTC, so that the time is right
      // and the bad zone doesn't show up.
      // We can clean all this up when Chrome fixes this.
      z = 'UTC';
      if (opts.timeZoneName) {
        this.dt = dt;
      } else {
        this.dt = dt.offset === 0 ? dt : _datetime2.default.fromMillis(dt.ts + dt.offset * 60 * 1000);
      }
    } else if (dt.zone.type === 'local') {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }

    if (this.hasIntl) {
      const realIntlOpts = Object.assign({}, this.opts);
      if (z) {
        realIntlOpts.timeZone = z;
      }
      this.dtf = new Intl.DateTimeFormat(intl, realIntlOpts);
    }
  }

  format() {
    if (this.hasIntl) {
      return this.dtf.format(this.dt.toJSDate());
    } else {
      const tokenFormat = English.formatString(this.opts),
            loc = Locale.create('en-US');
      return _formatter2.default.create(loc).formatDateTimeFromString(this.dt, tokenFormat);
    }
  }

  formatToParts() {
    if (this.hasIntl && (0, _util.hasFormatToParts)()) {
      return this.dtf.formatToParts(this.dt.toJSDate());
    } else {
      // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
      // and IMO it's too weird to have an uncanny valley like that
      return [];
    }
  }

  resolvedOptions() {
    if (this.hasIntl) {
      return this.dtf.resolvedOptions();
    } else {
      return {
        locale: 'en-US',
        numberingSystem: 'latn',
        outputCalendar: 'gregory'
      };
    }
  }
}

/**
 * @private
 */

class Locale {
  static fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  }

  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
    const specifiedLocale = locale || _settings2.default.defaultLocale,

    // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
    localeR = specifiedLocale || (defaultToEN ? 'en-US' : systemLocale()),
          numberingSystemR = numberingSystem || _settings2.default.defaultNumberingSystem,
          outputCalendarR = outputCalendar || _settings2.default.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  }

  static resetCache() {
    sysLocaleCache = null;
  }

  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
    return Locale.create(locale, numberingSystem, outputCalendar);
  }

  constructor(locale, numbering, outputCalendar, specifiedLocale) {
    this.locale = locale;
    this.numberingSystem = numbering;
    this.outputCalendar = outputCalendar;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};

    this.specifiedLocale = specifiedLocale;
    this.fastNumbers = supportsFastNumbers(this);
  }

  // todo: cache me
  listingMode(defaultOK = true) {
    const intl = (0, _util.hasIntl)(),
          hasFTP = intl && (0, _util.hasFormatToParts)(),
          isActuallyEn = this.locale === 'en' || this.locale.toLowerCase() === 'en-us' || intl && Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith('en-us'),
          hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === 'latn') && (this.outputCalendar === null || this.outputCalendar === 'gregory');

    if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) {
      return 'error';
    } else if (!hasFTP || isActuallyEn && hasNoWeirdness) {
      return 'en';
    } else {
      return 'intl';
    }
  }

  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    }
  }

  redefaultToEN(alts = {}) {
    return this.clone(Object.assign({}, alts, { defaultToEN: true }));
  }

  redefaultToSystem(alts = {}) {
    return this.clone(Object.assign({}, alts, { defaultToEN: false }));
  }

  months(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, English.months, () => {
      const intl = format ? { month: length, day: 'numeric' } : { month: length },
            formatStr = format ? 'format' : 'standalone';
      if (!this.monthsCache[formatStr][length]) {
        this.monthsCache[formatStr][length] = mapMonths(dt => this.extract(dt, intl, 'month'));
      }
      return this.monthsCache[formatStr][length];
    });
  }

  weekdays(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, English.weekdays, () => {
      const intl = format ? { weekday: length, year: 'numeric', month: 'long', day: 'numeric' } : { weekday: length },
            formatStr = format ? 'format' : 'standalone';
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays(dt => this.extract(dt, intl, 'weekday'));
      }
      return this.weekdaysCache[formatStr][length];
    });
  }

  meridiems(defaultOK = true) {
    return listStuff(this, undefined, defaultOK, () => English.meridiems, () => {
      // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
      // for AM and PM. This is probably wrong, but it's makes parsing way easier.
      if (!this.meridiemCache) {
        const intl = { hour: 'numeric', hour12: true };
        this.meridiemCache = [_datetime2.default.utc(2016, 11, 13, 9), _datetime2.default.utc(2016, 11, 13, 19)].map(dt => this.extract(dt, intl, 'dayperiod'));
      }

      return this.meridiemCache;
    });
  }

  eras(length, defaultOK = true) {
    return listStuff(this, length, defaultOK, English.eras, () => {
      const intl = { era: length };

      // This is utter bullshit. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
      // to definitely enumerate them.
      if (!this.eraCache[length]) {
        this.eraCache[length] = [_datetime2.default.utc(-40, 1, 1), _datetime2.default.utc(2017, 1, 1)].map(dt => this.extract(dt, intl, 'era'));
      }

      return this.eraCache[length];
    });
  }

  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts),
          results = df.formatToParts(),
          matching = results.find(m => m.type.toLowerCase() === field);

    return matching ? matching.value : null;
  }

  numberFormatter(opts = {}) {
    // this option is never used (the only caller short-circuits on it, but it seems safer to leave)
    // (in contrast, the || is used heavily)
    if (opts.forceSimple || this.fastNumbers) {
      return new SimpleNumberFormatter(opts);
    } else if ((0, _util.hasIntl)()) {
      const intlOpts = { useGrouping: false };

      if (opts.padTo > 0) {
        intlOpts.minimumIntegerDigits = opts.padTo;
      }

      if (opts.round) {
        intlOpts.maximumFractionDigits = 0;
      }

      return new Intl.NumberFormat(this.intl, intlOpts);
    } else {
      return new SimpleNumberFormatter(opts);
    }
  }

  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }

  equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  }
}
exports.default = Locale;
},{"./util":64,"./english":76,"../settings":40,"../datetime":36,"./formatter":66}],67:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseISODate = parseISODate;
exports.parseRFC2822Date = parseRFC2822Date;
exports.parseHTTPDate = parseHTTPDate;
exports.parseISODuration = parseISODuration;
exports.parseSQL = parseSQL;

var _util = require('./util');

var _english = require('./english');

var English = _interopRequireWildcard(_english);

var _fixedOffsetZone = require('../zones/fixedOffsetZone');

var _fixedOffsetZone2 = _interopRequireDefault(_fixedOffsetZone);

var _IANAZone = require('../zones/IANAZone');

var _IANAZone2 = _interopRequireDefault(_IANAZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */

function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, '');
  return RegExp(`^${full}$`);
}

function combineExtractors(...extractors) {
  return m => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
    const [val, zone, next] = ex(m, cursor);
    return [Object.assign(mergedVals, val), mergedZone || zone, next];
  }, [{}, null, 1]).slice(0, 2);
}

function parse(s, ...patterns) {
  if (s == null) {
    return [null, null];
  }

  for (const [regex, extractor] of patterns) {
    const m = regex.exec(s);
    if (m) {
      return extractor(m);
    }
  }
  return [null, null];
}

function simpleParse(...keys) {
  return (match, cursor) => {
    const ret = {};
    let i;

    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInt(match[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}

// ISO and SQL parsing
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
      isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,9}))?)?)?/,
      isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`),
      isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`),
      isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
      isoWeekRegex = /(\d{4})-?W(\d\d)-?(\d)/,
      isoOrdinalRegex = /(\d{4})-?(\d{3})/,
      extractISOWeekData = simpleParse('weekYear', 'weekNumber', 'weekDay'),
      extractISOOrdinalData = simpleParse('year', 'ordinal'),
      sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/,
      // dumbed-down version of the ISO one
sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|([a-zA-Z_]{1,256}/[a-zA-Z_]{1,256}))?`),
      sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

function extractISOYmd(match, cursor) {
  const item = {
    year: parseInt(match[cursor]),
    month: parseInt(match[cursor + 1]) || 1,
    day: parseInt(match[cursor + 2]) || 1
  };

  return [item, null, cursor + 3];
}

function extractISOTime(match, cursor) {
  const item = {
    hour: parseInt(match[cursor]) || 0,
    minute: parseInt(match[cursor + 1]) || 0,
    second: parseInt(match[cursor + 2]) || 0,
    millisecond: (0, _util.parseMillis)(match[cursor + 3])
  };

  return [item, null, cursor + 4];
}

function extractISOOffset(match, cursor) {
  const local = !match[cursor] && !match[cursor + 1],
        fullOffset = (0, _util.signedOffset)(match[cursor + 1], match[cursor + 2]),
        zone = local ? null : _fixedOffsetZone2.default.instance(fullOffset);
  return [{}, zone, cursor + 3];
}

function extractIANAZone(match, cursor) {
  const zone = match[cursor] ? new _IANAZone2.default(match[cursor]) : null;
  return [{}, zone, cursor + 1];
}

// ISO duration parsing

const isoDuration = /^P(?:(?:(\d{1,9})Y)?(?:(\d{1,9})M)?(?:(\d{1,9})D)?(?:T(?:(\d{1,9})H)?(?:(\d{1,9})M)?(?:(\d{1,9})(?:[.,](\d{1,9}))?S)?)?|(\d{1,9})W)$/;

function extractISODuration(match) {
  const [, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr, weekStr] = match;

  return [{
    years: parseInt(yearStr),
    months: parseInt(monthStr),
    weeks: parseInt(weekStr),
    days: parseInt(dayStr),
    hours: parseInt(hourStr),
    minutes: parseInt(minuteStr),
    seconds: parseInt(secondStr),
    milliseconds: (0, _util.parseMillis)(millisecondsStr)
  }];
}

// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that
const obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};

function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? (0, _util.untruncateYear)(parseInt(yearStr)) : parseInt(yearStr),
    month: monthStr.length === 2 ? parseInt(monthStr, 10) : English.monthsShort.indexOf(monthStr) + 1,
    day: parseInt(dayStr),
    hour: parseInt(hourStr),
    minute: parseInt(minuteStr)
  };

  if (secondStr) result.second = parseInt(secondStr);
  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? English.weekdaysLong.indexOf(weekdayStr) + 1 : English.weekdaysShort.indexOf(weekdayStr) + 1;
  }

  return result;
}

// RFC 2822/5322
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function extractRFC2822(match) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match,
        result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

  let offset;
  if (obsOffset) {
    offset = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset = 0;
  } else {
    offset = (0, _util.signedOffset)(offHourStr, offMinuteStr);
  }

  return [result, new _fixedOffsetZone2.default(offset)];
}

function preprocessRFC2822(s) {
  // Remove comments and folding whitespace and replace multiple-spaces with a single space
  return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

// http date

const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
      rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
      ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function extractRFC1123Or850(match) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
        result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, _fixedOffsetZone2.default.utcInstance];
}

function extractASCII(match) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
        result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, _fixedOffsetZone2.default.utcInstance];
}

/**
 * @private
 */

function parseISODate(s) {
  return parse(s, [combineRegexes(isoYmdRegex, isoTimeExtensionRegex), combineExtractors(extractISOYmd, extractISOTime, extractISOOffset)], [combineRegexes(isoWeekRegex, isoTimeExtensionRegex), combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset)], [combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex), combineExtractors(extractISOOrdinalData, extractISOTime)], [combineRegexes(isoTimeRegex), combineExtractors(extractISOTime, extractISOOffset)]);
}

function parseRFC2822Date(s) {
  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}

function parseHTTPDate(s) {
  return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}

function parseISODuration(s) {
  return parse(s, [isoDuration, extractISODuration]);
}

function parseSQL(s) {
  return parse(s, [combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex), combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone)], [combineRegexes(sqlTimeRegex), combineExtractors(extractISOTime, extractISOOffset, extractIANAZone)]);
}
},{"./util":64,"./english":76,"../zones/fixedOffsetZone":41,"../zones/IANAZone":42}],35:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.friendlyDuration = friendlyDuration;

var _util = require('./impl/util');

var _locale = require('./impl/locale');

var _locale2 = _interopRequireDefault(_locale);

var _formatter = require('./impl/formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _regexParser = require('./impl/regexParser');

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVALID = 'Invalid Duration',
      UNPARSABLE = 'unparsable';

// unit conversion constants
const lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1000
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1000
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
  minutes: { seconds: 60, milliseconds: 60 * 1000 },
  seconds: { milliseconds: 1000 }
},
      casualMatrix = Object.assign({
  years: {
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1000
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix),
      daysInYearAccurate = 146097.0 / 400,
      daysInMonthAccurate = 146097.0 / 4800,
      accurateMatrix = Object.assign({
  years: {
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix);

// units ordered by size
const orderedUnits = ['years', 'quarters', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

const reverseUnits = orderedUnits.slice(0).reverse();

// clone really means "create another instance just like this one, but with these changes"
function clone(dur, alts, clear = false) {
  // deep merge for vals
  const conf = {
    values: clear ? alts.values : Object.assign({}, dur.values, alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}

// some functions really care about the absolute value of a duration, so combined with
// normalize() this tells us whether this duration is positive or negative
function isHighOrderNegative(obj) {
  // only rule is that the highest-order part must be non-negative
  for (const k of orderedUnits) {
    if (obj[k]) return obj[k] < 0;
  }
  return false;
}

// NB: mutates parameters
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  const conv = matrix[toUnit][fromUnit],
        added = Math.floor(fromMap[fromUnit] / conv);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
}

// NB: mutates parameters
function normalizeValues(matrix, vals) {
  reverseUnits.reduce((previous, current) => {
    if (!(0, _util.isUndefined)(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}

/**
 * @private
 */
function friendlyDuration(duration) {
  if ((0, _util.isNumber)(duration)) {
    return Duration.fromMillis(duration);
  } else if (duration instanceof Duration) {
    return duration;
  } else if (duration instanceof Object) {
    return Duration.fromObject(duration);
  } else {
    throw new _errors.InvalidArgumentError('Unknown duration argument');
  }
}

/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
 * * **Unit values** See the {@link years}, {@link months}, {@link weeks}, {@link days}, {@link hours}, {@link minutes}, {@link seconds}, {@link milliseconds} accessors.
 * * **Configuration** See  {@link locale} and {@link numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link plus}, {@link minus}, {@link normalize}, {@link set}, {@link reconfigure}, {@link shiftTo}, and {@link negate}.
 * * **Output** To convert the Duration into other representations, see {@link as}, {@link toISO}, {@link toFormat}, and {@link toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */
class Duration {
  /**
   * @private
   */
  constructor(config) {
    const accurate = config.conversionAccuracy === 'longterm' || false;
    /**
     * @access private
     */
    this.values = config.values;
    /**
     * @access private
     */
    this.loc = config.loc || _locale2.default.create();
    /**
     * @access private
     */
    this.conversionAccuracy = accurate ? 'longterm' : 'casual';
    /**
     * @access private
     */
    this.invalid = config.invalidReason || null;
    /**
     * @access private
     */
    this.matrix = accurate ? accurateMatrix : casualMatrix;
  }

  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(count, opts) {
    return Duration.fromObject(Object.assign({ milliseconds: count }, opts));
  }

  /**
   * Create an Duration from a Javascript object with keys like 'years' and 'hours'.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {string} [obj.locale='en-US'] - the locale to use
   * @param {string} obj.numberingSystem - the numbering system to use
   * @param {string} [obj.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromObject(obj) {
    return new Duration({
      values: (0, _util.normalizeObject)(obj, Duration.normalizeUnit, true),
      loc: _locale2.default.fromObject(obj),
      conversionAccuracy: obj.conversionAccuracy
    });
  }

  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M4DT12H30M5S').toObject() //=> { years: 3, months: 6, day: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text, opts) {
    const [parsed] = (0, _regexParser.parseISODuration)(text);
    if (parsed) {
      const obj = Object.assign(parsed, opts);
      return Duration.fromObject(obj);
    } else {
      return Duration.invalid(UNPARSABLE);
    }
  }

  /**
   * Create an invalid Duration.
   * @param {string} reason - reason this is invalid
   * @return {Duration}
   */
  static invalid(reason) {
    if (!reason) {
      throw new _errors.InvalidArgumentError('need to specify a reason the Duration is invalid');
    }
    if (_settings2.default.throwOnInvalid) {
      throw new _errors.InvalidDurationError(reason);
    } else {
      return new Duration({ invalidReason: reason });
    }
  }

  /**
   * @private
   */
  static normalizeUnit(unit, ignoreUnknown = false) {
    const normalized = {
      year: 'years',
      years: 'years',
      quarter: 'quarters',
      quarters: 'quarters',
      month: 'months',
      months: 'months',
      week: 'weeks',
      weeks: 'weeks',
      day: 'days',
      days: 'days',
      hour: 'hours',
      hours: 'hours',
      minute: 'minutes',
      minutes: 'minutes',
      second: 'seconds',
      seconds: 'seconds',
      millisecond: 'milliseconds',
      milliseconds: 'milliseconds'
    }[unit ? unit.toLowerCase() : unit];

    if (!ignoreUnknown && !normalized) throw new _errors.InvalidUnitError(unit);

    return normalized;
  }

  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }

  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }

  /**
   * Returns a string representation of this Duration formatted according to the specified format string.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} opts.round - round numerical values
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid ? _formatter2.default.create(this.loc, opts).formatDurationFromString(this, fmt) : INVALID;
  }

  /**
   * Returns a Javascript object with this Duration's values.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};

    const base = Object.assign({}, this.values);

    if (opts.includeConfig) {
      base.conversionAccuracy = this.conversionAccuracy;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @return {string}
   */
  toISO() {
    // we could use the formatter, but this is an easier way to get the minimum string
    if (!this.isValid) return null;

    let s = 'P',
        norm = this.normalize();

    // ISO durations are always positive, so take the absolute value
    norm = isHighOrderNegative(norm.values) ? norm.negate() : norm;

    if (norm.years > 0) s += norm.years + 'Y';
    if (norm.months > 0 || norm.quarters > 0) s += norm.months + norm.quarters * 3 + 'M';
    if (norm.days > 0 || norm.weeks > 0) s += norm.days + norm.weeks * 7 + 'D';
    if (norm.hours > 0 || norm.minutes > 0 || norm.seconds > 0 || norm.milliseconds > 0) s += 'T';
    if (norm.hours > 0) s += norm.hours + 'H';
    if (norm.minutes > 0) s += norm.minutes + 'M';
    if (norm.seconds > 0) s += norm.seconds + 'S';
    return s;
  }

  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }

  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }

  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  inspect() {
    if (this.isValid) {
      const valsInspect = JSON.stringify(this.toObject());
      return `Duration {\n  values: ${valsInspect},\n  locale: ${this.locale},\n  conversionAccuracy: ${this.conversionAccuracy} }`;
    } else {
      return `Duration { Invalid, reason: ${this.invalidReason} }`;
    }
  }

  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid) return this;

    const dur = friendlyDuration(duration),
          result = {};

    for (const k of orderedUnits) {
      const val = dur.get(k) + this.get(k);
      if (val !== 0) {
        result[k] = val;
      }
    }

    return clone(this, { values: result }, true);
  }

  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid) return this;

    const dur = friendlyDuration(duration);
    return this.plus(dur.negate());
  }

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).years //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).months //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).days //=> 3
   * @return {number}
   */
  get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }

  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    const mixed = Object.assign(this.values, (0, _util.normalizeObject)(values, Duration.normalizeUnit));
    return clone(this, { values: mixed });
  }

  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem }),
          opts = { loc };

    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }

    return clone(this, opts);
  }

  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }

  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;

    const neg = isHighOrderNegative(this.values),
          vals = (neg ? this.negate() : this).toObject();
    normalizeValues(this.matrix, vals);
    const dur = Duration.fromObject(vals);
    return neg ? dur.negate() : dur;
  }

  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid) return this;

    if (units.length === 0) {
      return this;
    }

    units = units.map(u => Duration.normalizeUnit(u));

    const built = {},
          accumulated = {},
          vals = this.toObject();
    let lastUnit;

    normalizeValues(this.matrix, vals);

    for (const k of orderedUnits) {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;

        let own = 0;

        // anything we haven't boiled down yet should get boiled to this unit
        for (const ak in accumulated) {
          if (accumulated.hasOwnProperty(ak)) {
            own += this.matrix[ak][k] * accumulated[ak];
            accumulated[ak] = 0;
          }
        }

        // plus anything that's already in this unit
        if ((0, _util.isNumber)(vals[k])) {
          own += vals[k];
        }

        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = own - i;

        // plus anything further down the chain that should be rolled up in to this
        for (const down in vals) {
          if (orderedUnits.indexOf(down) > orderedUnits.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        }
        // otherwise, keep it in the wings to boil it later
      } else if ((0, _util.isNumber)(vals[k])) {
        accumulated[k] = vals[k];
      }
    }

    // anything leftover becomes the decimal for the last unit
    if (lastUnit) {
      for (const key in accumulated) {
        if (accumulated.hasOwnProperty(key)) {
          if (accumulated[key] > 0) {
            built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
          }
        }
      }
    }
    return clone(this, { values: built }, true);
  }

  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const negated = {};
    for (const k of Object.keys(this.values)) {
      negated[k] = -this.values[k];
    }
    return clone(this, { values: negated }, true);
  }

  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }

  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }

  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }

  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }

  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }

  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }

  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }

  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }

  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }

  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }

  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid;
  }

  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    if (!this.loc.equals(other.loc)) {
      return false;
    }

    for (const u of orderedUnits) {
      if (this.values[u] !== other.values[u]) {
        return false;
      }
    }
    return true;
  }
}
exports.default = Duration;
},{"./impl/util":64,"./impl/locale":65,"./impl/formatter":66,"./impl/regexParser":67,"./settings":40,"./errors":63}],37:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = require('./datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _duration = require('./duration');

var _duration2 = _interopRequireDefault(_duration);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVALID = 'Invalid Interval';

// checks if the start is equal to or before the end
function validateStartEnd(start, end) {
  return !!start && !!end && start.isValid && end.isValid && start <= end;
}

/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}
 * * **Output*** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toFormat}, and {@link toDuration}.
 */
class Interval {
  /**
   * @private
   */
  constructor(config) {
    /**
     * @access private
     */
    this.s = config.start;
    /**
     * @access private
     */
    this.e = config.end;
    /**
     * @access private
     */
    this.invalid = config.invalidReason || null;
  }

  /**
   * Create an invalid Interval.
   * @return {Interval}
   */
  static invalid(reason) {
    if (!reason) {
      throw new _errors.InvalidArgumentError('need to specify a reason the DateTime is invalid');
    }
    if (_settings2.default.throwOnInvalid) {
      throw new _errors.InvalidIntervalError(reason);
    } else {
      return new Interval({ invalidReason: reason });
    }
  }

  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(start, end) {
    const builtStart = (0, _datetime.friendlyDateTime)(start),
          builtEnd = (0, _datetime.friendlyDateTime)(end);

    return new Interval({
      start: builtStart,
      end: builtEnd,
      invalidReason: validateStartEnd(builtStart, builtEnd) ? null : 'invalid endpoints'
    });
  }

  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(start, duration) {
    const dur = (0, _duration.friendlyDuration)(duration),
          dt = (0, _datetime.friendlyDateTime)(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }

  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(end, duration) {
    const dur = (0, _duration.friendlyDuration)(duration),
          dt = (0, _datetime.friendlyDateTime)(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }

  /**
   * Create an Interval from an ISO 8601 string
   * @param {string} string - the ISO string to parse
   * @param {Object} opts - options to pass {@see DateTime.fromISO}
   * @return {Interval}
   */
  static fromISO(string, opts) {
    if (string) {
      const [s, e] = string.split(/\//);
      if (s && e) {
        return Interval.fromDateTimes(_datetime2.default.fromISO(s, opts), _datetime2.default.fromISO(e, opts));
      }
    }
    return Interval.invalid('invalid ISO format');
  }

  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }

  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }

  /**
   * Returns whether this Interval's end is at least its start, i.e. that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }

  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid;
  }

  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(unit = 'milliseconds') {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }

  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  count(unit = 'milliseconds') {
    if (!this.isValid) return NaN;
    const start = this.start.startOf(unit),
          end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }

  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.e.minus(1).hasSame(this.s, unit) : false;
  }

  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }

  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }

  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }

  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }

  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }

  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...[DateTime]} dateTimes - the unit of time to count.
   * @return {[Interval]}
   */
  splitAt(...dateTimes) {
    if (!this.isValid) return [];
    const sorted = dateTimes.map(_datetime.friendlyDateTime).sort(),
          results = [];
    let { s } = this,
        i = 0;

    while (s < this.e) {
      const added = sorted[i] || this.e,
            next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      i += 1;
    }

    return results;
  }

  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {[Interval]}
   */
  splitBy(duration) {
    if (!this.isValid) return [];
    const dur = (0, _duration.friendlyDuration)(duration),
          results = [];
    let { s } = this,
        added,
        next;

    while (s < this.e) {
      added = s.plus(dur);
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
    }

    return results;
  }

  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {[Interval]}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }

  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }

  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }

  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }

  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }

  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    return this.s.equals(other.s) && this.e.equals(other.e);
  }

  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, i.e., the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(other) {
    if (!this.isValid) return this;
    const s = this.s > other.s ? this.s : other.s,
          e = this.e < other.e ? this.e : other.e;

    if (s > e) {
      return null;
    } else {
      return Interval.fromDateTimes(s, e);
    }
  }

  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid) return this;
    const s = this.s < other.s ? this.s : other.s,
          e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s, e);
  }

  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {[Interval]} intervals
   * @return {[Interval]}
   */
  static merge(intervals) {
    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(([sofar, current], item) => {
      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]);
    if (final) {
      found.push(final);
    }
    return found;
  }

  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {[Interval]} intervals
   * @return {[Interval]}
   */
  static xor(intervals) {
    let start = null,
        currentCount = 0;
    const results = [],
          ends = intervals.map(i => [{ time: i.s, type: 's' }, { time: i.e, type: 'e' }]),
          flattened = Array.prototype.concat(...ends),
          arr = flattened.sort((a, b) => a.time - b.time);

    for (const i of arr) {
      currentCount += i.type === 's' ? 1 : -1;

      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }

        start = null;
      }
    }

    return Interval.merge(results);
  }

  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {[Interval]}
   */
  difference(...intervals) {
    return Interval.xor([this].concat(intervals)).map(i => this.intersection(i)).filter(i => i && !i.isEmpty());
  }

  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid) return INVALID;
    return `[${this.s.toISO()} – ${this.e.toISO()})`;
  }

  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  inspect() {
    if (this.isValid) {
      return `Interval {\n  start: ${this.start.toISO()},\n  end: ${this.end.toISO()},\n  zone:   ${this.start.zone.name},\n  locale:   ${this.start.locale} }`;
    } else {
      return `Interval { Invalid, reason: ${this.invalidReason} }`;
    }
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime.toISO}
   * @return {string}
   */
  toISO(opts) {
    if (!this.isValid) return INVALID;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }

  /**
   * Returns a string representation of this Interval formatted according to the specified format string.
   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
   * @param {Object} opts - options
   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
   * @return {string}
   */
  toFormat(dateFormat, { separator = ' – ' } = {}) {
    if (!this.isValid) return INVALID;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }

  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit, opts) {
    if (!this.isValid) {
      return _duration2.default.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }
}
exports.default = Interval;
},{"./datetime":36,"./duration":35,"./settings":40,"./errors":63}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = require('./datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _locale = require('./impl/locale');

var _locale2 = _interopRequireDefault(_locale);

var _IANAZone = require('./zones/IANAZone');

var _IANAZone2 = _interopRequireDefault(_IANAZone);

var _util = require('./impl/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */
class Info {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = _settings2.default.defaultZone) {
    const proto = _datetime2.default.local().setZone(zone).set({ month: 12 });

    return !zone.universal && proto.offset !== proto.set({ month: 6 }).offset;
  }

  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return !!_IANAZone2.default.isValidSpecifier(zone) && _IANAZone2.default.isValidZone(zone);
  }

  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {[string]}
   */
  static months(length = 'long', { locale = null, numberingSystem = null, outputCalendar = 'gregory' } = {}) {
    return _locale2.default.create(locale, numberingSystem, outputCalendar).months(length);
  }

  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {[string]}
   */
  static monthsFormat(length = 'long', { locale = null, numberingSystem = null, outputCalendar = 'gregory' } = {}) {
    return _locale2.default.create(locale, numberingSystem, outputCalendar).months(length, true);
  }

  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {[string]}
   */
  static weekdays(length = 'long', { locale = null, numberingSystem = null } = {}) {
    return _locale2.default.create(locale, numberingSystem, null).weekdays(length);
  }

  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @return {[string]}
   */
  static weekdaysFormat(length = 'long', { locale = null, numberingSystem = null } = {}) {
    return _locale2.default.create(locale, numberingSystem, null).weekdays(length, true);
  }

  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'de' }) //=> [ 'vorm.', 'nachm.' ]
   * @return {[string]}
   */
  static meridiems({ locale = null } = {}) {
    return _locale2.default.create(locale).meridiems();
  }

  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {[string]}
   */
  static eras(length = 'short', { locale = null } = {}) {
    return _locale2.default.create(locale, null, 'gregory').eras(length);
  }

  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `zones`: whether this environment supports IANA timezones
   * * `intlTokens`: whether this environment supports internationalized token-based formatting/parsing
   * * `intl`: whether this environment supports general internationalization
   * @example Info.features() //=> { intl: true, intlTokens: false, zones: true }
   * @return {Object}
   */
  static features() {
    let intl = false,
        intlTokens = false,
        zones = false;

    if ((0, _util.hasIntl)()) {
      intl = true;
      intlTokens = (0, _util.hasFormatToParts)();

      try {
        zones = new Intl.DateTimeFormat('en', { timeZone: 'America/New_York' }).resolvedOptions().timeZone === 'America/New_York';
      } catch (e) {
        zones = false;
      }
    }

    return { intl, intlTokens, zones };
  }
}
exports.default = Info;
},{"./datetime":36,"./settings":40,"./impl/locale":65,"./zones/IANAZone":42,"./impl/util":64}],69:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

  const remainingMillis = later - cursor;

  const lowerOrderUnits = units.filter(u => ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(u) >= 0);

  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }

    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }

  const duration = _duration2.default.fromObject(Object.assign(results, opts));

  if (lowerOrderUnits.length > 0) {
    return _duration2.default.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
};

var _duration = require('../duration');

var _duration2 = _interopRequireDefault(_duration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dayDiff(earlier, later) {
  const utcDayStart = dt => dt.toUTC(0, { keepLocalTime: true }).startOf('day').valueOf(),
        ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(_duration2.default.fromMillis(ms).as('days'));
}

function highOrderDiffs(cursor, later, units) {
  const differs = [['years', (a, b) => b.year - a.year], ['months', (a, b) => b.month - a.month + (b.year - a.year) * 12], ['weeks', (a, b) => {
    const days = dayDiff(a, b);
    return (days - days % 7) / 7;
  }], ['days', dayDiff]];

  const results = {};
  let lowestOrder, highWater;

  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;

      let delta = differ(cursor, later);

      highWater = cursor.plus({ [unit]: delta });

      if (highWater > later) {
        cursor = highWater.minus({ [unit]: 1 });
        delta -= 1;
      } else {
        cursor = highWater;
      }

      if (delta > 0) {
        results[unit] = delta;
      }
    }
  }

  return [cursor, results, highWater, lowestOrder];
}
},{"../duration":35}],70:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.explainFromTokens = explainFromTokens;
exports.parseFromTokens = parseFromTokens;

var _util = require('./util');

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _fixedOffsetZone = require('../zones/fixedOffsetZone');

var _fixedOffsetZone2 = _interopRequireDefault(_fixedOffsetZone);

var _IANAZone = require('../zones/IANAZone');

var _IANAZone2 = _interopRequireDefault(_IANAZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MISSING_FTP = 'missing Intl.DateTimeFormat.formatToParts support';

function intUnit(regex, post = i => i) {
  return { regex, deser: ([s]) => post(parseInt(s)) };
}

function fixListRegex(s) {
  // make dots optional and also make them literal
  return s.replace(/\./, '\\.?');
}

function stripInsensitivities(s) {
  return s.replace(/\./, '').toLowerCase();
}

function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join('|')),
      deser: ([s]) => strings.findIndex(i => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex
    };
  }
}

function offset(regex, groups) {
  return { regex, deser: ([, h, m]) => (0, _util.signedOffset)(h, m), groups };
}

function simple(regex) {
  return { regex, deser: ([s]) => s };
}

function unitForToken(token, loc) {
  const one = /\d/,
        two = /\d{2}/,
        three = /\d{3}/,
        four = /\d{4}/,
        oneOrTwo = /\d{1,2}/,
        oneToThree = /\d{1,3}/,
        twoToFour = /\d{2,4}/,
        literal = t => ({ regex: RegExp(t.val), deser: ([s]) => s, literal: true }),
        unitate = t => {
    if (token.literal) {
      return literal(t);
    }
    switch (t.val) {
      // era
      case 'G':
        return oneOf(loc.eras('short', false), 0);
      case 'GG':
        return oneOf(loc.eras('long', false), 0);
      // years
      case 'y':
        return intUnit(/\d{1,6}/);
      case 'yy':
        return intUnit(twoToFour, _util.untruncateYear);
      case 'yyyy':
        return intUnit(four);
      case 'yyyyy':
        return intUnit(/\d{4,6}/);
      case 'yyyyyy':
        return intUnit(/\d{6}/);
      // months
      case 'M':
        return intUnit(oneOrTwo);
      case 'MM':
        return intUnit(two);
      case 'MMM':
        return oneOf(loc.months('short', false, false), 1);
      case 'MMMM':
        return oneOf(loc.months('long', false, false), 1);
      case 'L':
        return intUnit(oneOrTwo);
      case 'LL':
        return intUnit(two);
      case 'LLL':
        return oneOf(loc.months('short', true, false), 1);
      case 'LLLL':
        return oneOf(loc.months('long', true, false), 1);
      // dates
      case 'd':
        return intUnit(oneOrTwo);
      case 'dd':
        return intUnit(two);
      // ordinals
      case 'o':
        return intUnit(oneToThree);
      case 'ooo':
        return intUnit(three);
      // time
      case 'HH':
        return intUnit(two);
      case 'H':
        return intUnit(oneOrTwo);
      case 'hh':
        return intUnit(two);
      case 'h':
        return intUnit(oneOrTwo);
      case 'mm':
        return intUnit(two);
      case 'm':
        return intUnit(oneOrTwo);
      case 's':
        return intUnit(oneOrTwo);
      case 'ss':
        return intUnit(two);
      case 'S':
        return intUnit(oneToThree);
      case 'SSS':
        return intUnit(three);
      case 'u':
        return simple(/\d{1,9}/);
      // meridiem
      case 'a':
        return oneOf(loc.meridiems(), 0);
      // weekYear (k)
      case 'kkkk':
        return intUnit(four);
      case 'kk':
        return intUnit(twoToFour, _util.untruncateYear);
      // weekNumber (W)
      case 'W':
        return intUnit(oneOrTwo);
      case 'WW':
        return intUnit(two);
      // weekdays
      case 'E':
      case 'c':
        return intUnit(one);
      case 'EEE':
        return oneOf(loc.weekdays('short', false, false), 1);
      case 'EEEE':
        return oneOf(loc.weekdays('long', false, false), 1);
      case 'ccc':
        return oneOf(loc.weekdays('short', true, false), 1);
      case 'cccc':
        return oneOf(loc.weekdays('long', true, false), 1);
      // offset/zone
      case 'Z':
      case 'ZZ':
        return offset(/([+-]\d{1,2})(?::(\d{2}))?/, 2);
      case 'ZZZ':
        return offset(/([+-]\d{1,2})(\d{2})?/, 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case 'z':
        return simple(/[A-Za-z_]{1,256}\/[A-Za-z_]{1,256}/);
      default:
        return literal(t);
    }
  };

  const unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };

  unit.token = token;

  return unit;
}

function buildRegex(units) {
  const re = units.map(u => u.regex).reduce((f, r) => `${f}(${r.source})`, '');
  return [`^${re}$`, units];
}

function match(input, regex, handlers) {
  const matches = input.match(regex);

  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i in handlers) {
      if (handlers.hasOwnProperty(i)) {
        const h = handlers[i],
              groups = h.groups ? h.groups + 1 : 1;
        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}

function dateTimeFromMatches(matches) {
  const toField = token => {
    switch (token) {
      case 'S':
        return 'millisecond';
      case 's':
        return 'second';
      case 'm':
        return 'minute';
      case 'h':
      case 'H':
        return 'hour';
      case 'd':
        return 'day';
      case 'o':
        return 'ordinal';
      case 'L':
      case 'M':
        return 'month';
      case 'y':
        return 'year';
      case 'E':
      case 'c':
        return 'weekday';
      case 'W':
        return 'weekNumber';
      case 'k':
        return 'weekYear';
      default:
        return null;
    }
  };

  let zone;
  if (!(0, _util.isUndefined)(matches.Z)) {
    zone = new _fixedOffsetZone2.default(matches.Z);
  } else if (!(0, _util.isUndefined)(matches.z)) {
    zone = new _IANAZone2.default(matches.z);
  } else {
    zone = null;
  }

  if (!(0, _util.isUndefined)(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }

  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }

  if (!(0, _util.isUndefined)(matches.u)) {
    matches.S = (0, _util.parseMillis)(matches.u);
  }

  const vals = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }

    return r;
  }, {});

  return [vals, zone];
}

/**
 * @private
 */

function explainFromTokens(locale, input, format) {
  const tokens = _formatter2.default.parseFormat(format),
        units = tokens.map(t => unitForToken(t, locale)),
        disqualifyingUnit = units.find(t => t.invalidReason);

  if (disqualifyingUnit) {
    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
  } else {
    const [regexString, handlers] = buildRegex(units),
          regex = RegExp(regexString, 'i'),
          [rawMatches, matches] = match(input, regex, handlers),
          [result, zone] = matches ? dateTimeFromMatches(matches) : [null, null];

    return { input, tokens, regex, rawMatches, matches, result, zone };
  }
}

function parseFromTokens(locale, input, format) {
  const { result, zone, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, invalidReason];
}
},{"./util":64,"./formatter":66,"../zones/fixedOffsetZone":41,"../zones/IANAZone":42}],71:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gregorianToWeek = gregorianToWeek;
exports.weekToGregorian = weekToGregorian;
exports.gregorianToOrdinal = gregorianToOrdinal;
exports.ordinalToGregorian = ordinalToGregorian;
exports.hasInvalidWeekData = hasInvalidWeekData;
exports.hasInvalidOrdinalData = hasInvalidOrdinalData;
exports.hasInvalidGregorianData = hasInvalidGregorianData;
exports.hasInvalidTimeData = hasInvalidTimeData;

var _util = require('./util');

const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
      leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function dayOfWeek(year, month, day) {
  const js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return js === 0 ? 7 : js;
}

function computeOrdinal(year, month, day) {
  return day + ((0, _util.isLeapYear)(year) ? leapLadder : nonLeapLadder)[month - 1];
}

function uncomputeOrdinal(year, ordinal) {
  const table = (0, _util.isLeapYear)(year) ? leapLadder : nonLeapLadder,
        month0 = table.findIndex(i => i < ordinal),
        day = ordinal - table[month0];
  return { month: month0 + 1, day };
}

/**
 * @private
 */

function gregorianToWeek(gregObj) {
  const { year, month, day } = gregObj,
        ordinal = computeOrdinal(year, month, day),
        weekday = dayOfWeek(year, month, day);

  let weekNumber = Math.floor((ordinal - weekday + 10) / 7),
      weekYear;

  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = (0, _util.weeksInWeekYear)(weekYear);
  } else if (weekNumber > (0, _util.weeksInWeekYear)(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }

  return Object.assign({ weekYear, weekNumber, weekday }, (0, _util.timeObject)(gregObj));
}

function weekToGregorian(weekData) {
  const { weekYear, weekNumber, weekday } = weekData,
        weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
        yearInDays = (0, _util.daysInYear)(weekYear);
  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
      year;

  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += (0, _util.daysInYear)(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= (0, _util.daysInYear)(year);
  } else {
    year = weekYear;
  }

  const { month, day } = uncomputeOrdinal(year, ordinal);

  return Object.assign({ year, month, day }, (0, _util.timeObject)(weekData));
}

function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData,
        ordinal = computeOrdinal(year, month, day);

  return Object.assign({ year, ordinal }, (0, _util.timeObject)(gregData));
}

function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData,
        { month, day } = uncomputeOrdinal(year, ordinal);

  return Object.assign({ year, month, day }, (0, _util.timeObject)(ordinalData));
}

function hasInvalidWeekData(obj) {
  const validYear = (0, _util.isNumber)(obj.weekYear),
        validWeek = (0, _util.numberBetween)(obj.weekNumber, 1, (0, _util.weeksInWeekYear)(obj.weekYear)),
        validWeekday = (0, _util.numberBetween)(obj.weekday, 1, 7);

  if (!validYear) {
    return 'weekYear out of range';
  } else if (!validWeek) {
    return 'week out of range';
  } else if (!validWeekday) {
    return 'weekday out of range';
  } else return false;
}

function hasInvalidOrdinalData(obj) {
  const validYear = (0, _util.isNumber)(obj.year),
        validOrdinal = (0, _util.numberBetween)(obj.ordinal, 1, (0, _util.daysInYear)(obj.year));

  if (!validYear) {
    return 'year out of range';
  } else if (!validOrdinal) {
    return 'ordinal out of range';
  } else return false;
}

function hasInvalidGregorianData(obj) {
  const validYear = (0, _util.isNumber)(obj.year),
        validMonth = (0, _util.numberBetween)(obj.month, 1, 12),
        validDay = (0, _util.numberBetween)(obj.day, 1, (0, _util.daysInMonth)(obj.year, obj.month));

  if (!validYear) {
    return 'year out of range';
  } else if (!validMonth) {
    return 'month out of range';
  } else if (!validDay) {
    return 'day out of range';
  } else return false;
}

function hasInvalidTimeData(obj) {
  const validHour = (0, _util.numberBetween)(obj.hour, 0, 23),
        validMinute = (0, _util.numberBetween)(obj.minute, 0, 59),
        validSecond = (0, _util.numberBetween)(obj.second, 0, 59),
        validMillisecond = (0, _util.numberBetween)(obj.millisecond, 0, 999);

  if (!validHour) {
    return 'hour out of range';
  } else if (!validMinute) {
    return 'minute out of range';
  } else if (!validSecond) {
    return 'second out of range';
  } else if (!validMillisecond) {
    return 'millisecond out of range';
  } else return false;
}
},{"./util":64}],36:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.friendlyDateTime = friendlyDateTime;

var _duration = require('./duration');

var _duration2 = _interopRequireDefault(_duration);

var _interval = require('./interval');

var _interval2 = _interopRequireDefault(_interval);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _formatter = require('./impl/formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _fixedOffsetZone = require('./zones/fixedOffsetZone');

var _fixedOffsetZone2 = _interopRequireDefault(_fixedOffsetZone);

var _localZone = require('./zones/localZone');

var _localZone2 = _interopRequireDefault(_localZone);

var _locale = require('./impl/locale');

var _locale2 = _interopRequireDefault(_locale);

var _util = require('./impl/util');

var _zoneUtil = require('./impl/zoneUtil');

var _diff = require('./impl/diff');

var _diff2 = _interopRequireDefault(_diff);

var _regexParser = require('./impl/regexParser');

var _tokenParser = require('./impl/tokenParser');

var _conversions = require('./impl/conversions');

var _formats = require('./impl/formats');

var Formats = _interopRequireWildcard(_formats);

var _errors = require('./errors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVALID = 'Invalid DateTime',
      INVALID_INPUT = 'invalid input',
      UNSUPPORTED_ZONE = 'unsupported zone',
      UNPARSABLE = 'unparsable';

// we cache week data on the DT object and this intermediates the cache
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = (0, _conversions.gregorianToWeek)(dt.c);
  }
  return dt.weekData;
}

// clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties
function clone(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalidReason: inst.invalidReason
  };
  return new DateTime(Object.assign({}, current, alts, { old: current }));
}

// find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
function fixOffset(localTS, o, tz) {
  // Our UTC time is just a guess because our offset is just a guess
  let utcGuess = localTS - o * 60 * 1000;

  // Test whether the zone matches the offset for this ts
  const o2 = tz.offset(utcGuess);

  // If so, offset didn't change and we're done
  if (o === o2) {
    return [utcGuess, o];
  }

  // If not, change the ts by the difference in the offset
  utcGuess -= (o2 - o) * 60 * 1000;

  // If that gives us the local time we want, we're done
  const o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }

  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
}

// convert an epoch timestamp into a calendar object with the given offset
function tsToObj(ts, offset) {
  ts += offset * 60 * 1000;

  const d = new Date(ts);

  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
}

// covert a calendar object to a local timestamp (epoch, but with the offset baked in)
function objToLocalTS(obj) {
  let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);

  // javascript is stupid and i hate it
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(obj.year);
  }
  return +d;
}

// convert a calendar object to a epoch timestamp
function objToTS(obj, offset, zone) {
  return fixOffset(objToLocalTS(obj), offset, zone);
}

// create a new DT instance by adding a duration, adjusting for DSTs
function adjustTime(inst, dur) {
  const oPre = inst.o,
        year = inst.c.year + dur.years,
        month = inst.c.month + dur.months + dur.quarters * 3,
        c = Object.assign({}, inst.c, {
    year,
    month,
    day: Math.min(inst.c.day, (0, _util.daysInMonth)(year, month)) + dur.days + dur.weeks * 7
  }),
        millisToAdd = _duration2.default.fromObject({
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as('milliseconds'),
        localTS = objToLocalTS(c);

  let [ts, o] = fixOffset(localTS, oPre, inst.zone);

  if (millisToAdd !== 0) {
    ts += millisToAdd;
    // that could have changed the offset by going over a DST, but we want to keep the ts the same
    o = inst.zone.offset(ts);
  }

  return { ts, o };
}

// helper useful in turning the results of parsing into real dates
// by handling the zone options
function parseDataToDateTime(parsed, parsedZone, opts) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0) {
    const interpretationZone = parsedZone || zone,
          inst = DateTime.fromObject(Object.assign(parsed, opts, {
      zone: interpretationZone
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(UNPARSABLE);
  }
}

// if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details
function toTechFormat(dt, format) {
  return dt.isValid ? _formatter2.default.create(_locale2.default.create('en-US'), {
    allowZ: true,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}

// technical time formats (e.g. the time part of ISO 8601), take some options
// and this commonizes their handling
function toTechTimeFormat(dt, {
  suppressSeconds = false,
  suppressMilliseconds = false,
  includeOffset = true,
  includeZone = false,
  spaceZone = false
}) {
  let fmt = 'HH:mm';

  if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
    fmt += ':ss';
    if (!suppressMilliseconds || dt.millisecond !== 0) {
      fmt += '.SSS';
    }
  }

  if ((includeZone || includeOffset) && spaceZone) {
    fmt += ' ';
  }

  if (includeZone) {
    fmt += 'z';
  } else if (includeOffset) {
    fmt += 'ZZ';
  }

  return toTechFormat(dt, fmt);
}

// defaults for unspecified units in the supported calendars
const defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
      defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
      defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};

// Units in the supported calendars, sorted by bigness
const orderedUnits = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
      orderedWeekUnits = ['weekYear', 'weekNumber', 'weekday', 'hour', 'minute', 'second', 'millisecond'],
      orderedOrdinalUnits = ['year', 'ordinal', 'hour', 'minute', 'second', 'millisecond'];

// standardize case and plurality in units
function normalizeUnit(unit, ignoreUnknown = false) {
  const normalized = {
    year: 'year',
    years: 'year',
    month: 'month',
    months: 'month',
    day: 'day',
    days: 'day',
    hour: 'hour',
    hours: 'hour',
    minute: 'minute',
    minutes: 'minute',
    second: 'second',
    seconds: 'second',
    millisecond: 'millisecond',
    milliseconds: 'millisecond',
    weekday: 'weekday',
    weekdays: 'weekday',
    weeknumber: 'weekNumber',
    weeksnumber: 'weekNumber',
    weeknumbers: 'weekNumber',
    weekyear: 'weekYear',
    weekyears: 'weekYear',
    ordinal: 'ordinal'
  }[unit ? unit.toLowerCase() : unit];

  if (!ignoreUnknown && !normalized) throw new _errors.InvalidUnitError(unit);

  return normalized;
}

// this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
function quickDT(obj, zone) {
  // assume we have the higher-order units
  for (const u of orderedUnits) {
    if ((0, _util.isUndefined)(obj[u])) {
      obj[u] = defaultUnitValues[u];
    }
  }

  const invalidReason = (0, _conversions.hasInvalidGregorianData)(obj) || (0, _conversions.hasInvalidTimeData)(obj);
  if (invalidReason) {
    return DateTime.invalid(invalidReason);
  }

  const tsNow = _settings2.default.now(),
        offsetProvis = zone.offset(tsNow),
        [ts, o] = objToTS(obj, offsetProvis, zone);

  return new DateTime({
    ts,
    zone,
    o
  });
}

/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link valueOf} and {@link toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */
class DateTime {
  /**
   * @access private
   */
  constructor(config) {
    const zone = config.zone || _settings2.default.defaultZone,
          invalidReason = config.invalidReason || (Number.isNaN(config.ts) ? INVALID_INPUT : null) || (!zone.isValid ? UNSUPPORTED_ZONE : null);
    /**
     * @access private
     */
    this.ts = (0, _util.isUndefined)(config.ts) ? _settings2.default.now() : config.ts;

    let c = null,
        o = null;
    if (!invalidReason) {
      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
      c = unchanged ? config.old.c : tsToObj(this.ts, zone.offset(this.ts));
      o = unchanged ? config.old.o : zone.offset(this.ts);
    }

    /**
     * @access private
     */
    this.zone = zone;
    /**
     * @access private
     */
    this.loc = config.loc || _locale2.default.create();
    /**
     * @access private
     */
    this.invalid = invalidReason;
    /**
     * @access private
     */
    this.weekData = null;
    /**
     * @access private
     */
    this.c = c;
    /**
     * @access private
     */
    this.o = o;
  }

  // CONSTRUCT

  /**
   * Create a local DateTime
   * @param {number} year - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, i.e. a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, i.e. a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, i.e. a number between 0 and 999
   * @example DateTime.local()                            //~> now
   * @example DateTime.local(2017)                        //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                     //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12)                 //~> 2017-03-12T00:00:00
   * @example DateTime.local(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.675
   * @return {DateTime}
   */
  static local(year, month, day, hour, minute, second, millisecond) {
    if ((0, _util.isUndefined)(year)) {
      return new DateTime({ ts: _settings2.default.now() });
    } else {
      return quickDT({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond
      }, _settings2.default.defaultZone);
    }
  }

  /**
   * Create a DateTime in UTC
   * @param {number} year - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, i.e. a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, i.e. a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, i.e. a number between 0 and 999
   * @example DateTime.utc()                            //~> now
   * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.675Z
   * @return {DateTime}
   */
  static utc(year, month, day, hour, minute, second, millisecond) {
    if ((0, _util.isUndefined)(year)) {
      return new DateTime({
        ts: _settings2.default.now(),
        zone: _fixedOffsetZone2.default.utcInstance
      });
    } else {
      return quickDT({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond
      }, _fixedOffsetZone2.default.utcInstance);
    }
  }

  /**
   * Create an DateTime from a Javascript Date object. Uses the default zone.
   * @param {Date} date - a Javascript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    return new DateTime({
      ts: (0, _util.isDate)(date) ? date.valueOf() : NaN,
      zone: (0, _zoneUtil.normalizeZone)(options.zone, _settings2.default.defaultZone),
      loc: _locale2.default.fromObject(options)
    });
  }

  /**
   * Create an DateTime from a count of epoch milliseconds. Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    return new DateTime({
      ts: milliseconds,
      zone: (0, _zoneUtil.normalizeZone)(options.zone, _settings2.default.defaultZone),
      loc: _locale2.default.fromObject(options)
    });
  }

  /**
   * Create an DateTime from a Javascript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {string|Zone} [obj.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [obj.locale='en-US'] - a locale to set on the resulting DateTime instance
   * @param {string} obj.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} obj.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01T00'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  static fromObject(obj) {
    const zoneToUse = (0, _zoneUtil.normalizeZone)(obj.zone, _settings2.default.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(UNSUPPORTED_ZONE);
    }

    const tsNow = _settings2.default.now(),
          offsetProvis = zoneToUse.offset(tsNow),
          normalized = (0, _util.normalizeObject)(obj, normalizeUnit, true),
          containsOrdinal = !(0, _util.isUndefined)(normalized.ordinal),
          containsGregorYear = !(0, _util.isUndefined)(normalized.year),
          containsGregorMD = !(0, _util.isUndefined)(normalized.month) || !(0, _util.isUndefined)(normalized.day),
          containsGregor = containsGregorYear || containsGregorMD,
          definiteWeekDef = normalized.weekYear || normalized.weekNumber,
          loc = _locale2.default.fromObject(obj);

    // cases:
    // just a weekday -> this week's instance of that weekday, no worries
    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
    // (gregorian month or day) + ordinal -> error
    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new _errors.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new _errors.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;

    // configure ourselves to deal with gregorian dates or week stuff
    let units,
        defaultValues,
        objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = (0, _conversions.gregorianToWeek)(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = (0, _conversions.gregorianToOrdinal)(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }

    // set default values for missing stuff
    let foundFirst = false;
    for (const u of units) {
      const v = normalized[u];
      if (!(0, _util.isUndefined)(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }

    // make sure the values we have are in range
    const higherOrderInvalid = useWeekData ? (0, _conversions.hasInvalidWeekData)(normalized) : containsOrdinal ? (0, _conversions.hasInvalidOrdinalData)(normalized) : (0, _conversions.hasInvalidGregorianData)(normalized),
          invalidReason = higherOrderInvalid || (0, _conversions.hasInvalidTimeData)(normalized);

    if (invalidReason) {
      return DateTime.invalid(invalidReason);
    }

    // compute the actual time
    const gregorian = useWeekData ? (0, _conversions.weekToGregorian)(normalized) : containsOrdinal ? (0, _conversions.ordinalToGregorian)(normalized) : normalized,
          [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
          inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc
    });

    // gregorian data + weekday serves only to validate
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid('mismatched weekday');
    }

    return inst;
  }

  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = (0, _regexParser.parseISODate)(text);
    return parseDataToDateTime(vals, parsedZone, opts);
  }

  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Tue, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = (0, _regexParser.parseRFC2822Date)(text);
    return parseDataToDateTime(vals, parsedZone, opts);
  }

  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} options - options to affect the creation
   * @param {string|Zone} [options.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [options.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [options.locale='en-US'] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(text, options = {}) {
    const [vals, parsedZone] = (0, _regexParser.parseHTTPDate)(text);
    return parseDataToDateTime(vals, parsedZone, options);
  }

  /**
   * Create a DateTime from an input string and format string
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options to affect the creation
   * @param {string|Zone} [options.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [options.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [options.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} options.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(text, fmt, options = {}) {
    if ((0, _util.isUndefined)(text) || (0, _util.isUndefined)(fmt)) {
      throw new _errors.InvalidArgumentError('fromFormat requires an input string and a format');
    }

    const { locale = null, numberingSystem = null } = options,
          localeToUse = _locale2.default.fromOpts({ locale, numberingSystem, defaultToEN: true }),
          [vals, parsedZone, invalidReason] = (0, _tokenParser.parseFromTokens)(localeToUse, text, fmt);
    if (invalidReason) {
      return DateTime.invalid(invalidReason);
    } else {
      return parseDataToDateTime(vals, parsedZone, options);
    }
  }

  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text, fmt, opts = {}) {
    return DateTime.fromFormat(text, fmt, opts);
  }

  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} options - options to affect the creation
   * @param {string|Zone} [options.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [options.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [options.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} options.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(text, options = {}) {
    const [vals, parsedZone] = (0, _regexParser.parseSQL)(text);
    return parseDataToDateTime(vals, parsedZone, options);
  }

  /**
   * Create an invalid DateTime.
   * @return {DateTime}
   */
  static invalid(reason) {
    if (!reason) {
      throw new _errors.InvalidArgumentError('need to specify a reason the DateTime is invalid');
    }
    if (_settings2.default.throwOnInvalid) {
      throw new _errors.InvalidDateTimeError(reason);
    } else {
      return new DateTime({ invalidReason: reason });
    }
  }

  // INFO

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }

  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }

  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid;
  }

  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }

  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }

  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }

  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }

  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }

  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }

  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }

  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }

  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }

  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }

  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }

  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }

  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }

  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }

  /**
   * Get the ordinal (i.e. the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? (0, _conversions.gregorianToOrdinal)(this.c).ordinal : NaN;
  }

  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? _info2.default.months('short', { locale: this.locale })[this.month - 1] : null;
  }

  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? _info2.default.months('long', { locale: this.locale })[this.month - 1] : null;
  }

  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? _info2.default.weekdays('short', { locale: this.locale })[this.weekday - 1] : null;
  }

  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? _info2.default.weekdays('long', { locale: this.locale })[this.weekday - 1] : null;
  }

  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.local().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? this.zone.offset(this.ts) : NaN;
  }

  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: 'short',
        locale: this.locale
      });
    } else {
      return null;
    }
  }

  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: 'long',
        locale: this.locale
      });
    } else {
      return null;
    }
  }

  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.universal : null;
  }

  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
    }
  }

  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return (0, _util.isLeapYear)(this.year);
  }

  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return (0, _util.daysInMonth)(this.year, this.month);
  }

  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? (0, _util.daysInYear)(this.year) : NaN;
  }

  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? (0, _util.weeksInWeekYear)(this.weekYear) : NaN;
  }

  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOpts(opts = {}) {
    const { locale, numberingSystem, calendar } = _formatter2.default.create(this.loc.clone(opts), opts).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }

  // TRANSFORM

  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset = 0, opts = {}) {
    return this.setZone(_fixedOffsetZone2.default.instance(offset), opts);
  }

  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(new _localZone2.default());
  }

  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same UTC timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link plus}. You may wish to use {@link toLocal} and {@link toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'utc+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = (0, _zoneUtil.normalizeZone)(zone, _settings2.default.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(UNSUPPORTED_ZONE);
    } else {
      const newTS = keepLocalTime || keepCalendarTime // keepCalendarTime is the deprecated name for keepLocalTime
      ? this.ts + (this.o - zone.offset(this.ts)) * 60 * 1000 : this.ts;
      return clone(this, { ts: newTS, zone });
    }
  }

  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone(this, { loc });
  }

  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }

  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link reconfigure} and {@link setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(values) {
    if (!this.isValid) return this;

    const normalized = (0, _util.normalizeObject)(values, normalizeUnit),
          settingWeekStuff = !(0, _util.isUndefined)(normalized.weekYear) || !(0, _util.isUndefined)(normalized.weekNumber) || !(0, _util.isUndefined)(normalized.weekday);

    let mixed;
    if (settingWeekStuff) {
      mixed = (0, _conversions.weekToGregorian)(Object.assign((0, _conversions.gregorianToWeek)(this.c), normalized));
    } else if (!(0, _util.isUndefined)(normalized.ordinal)) {
      mixed = (0, _conversions.ordinalToGregorian)(Object.assign((0, _conversions.gregorianToOrdinal)(this.c), normalized));
    } else {
      mixed = Object.assign(this.toObject(), normalized);

      // if we didn't set the day but we ended up on an overflow date,
      // use the last day of the right month
      if ((0, _util.isUndefined)(normalized.day)) {
        mixed.day = Math.min((0, _util.daysInMonth)(mixed.year, mixed.month), mixed.day);
      }
    }

    const [ts, o] = objToTS(mixed, this.o, this.zone);
    return clone(this, { ts, o });
  }

  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.local().plus(123) //~> in 123 milliseconds
   * @example DateTime.local().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.local().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.local().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.local().plus({ hours: 3, minutes: 13 }) //~> in 1 hr, 13 min
   * @example DateTime.local().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 1 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = (0, _duration.friendlyDuration)(duration);
    return clone(this, adjustTime(this, dur));
  }

  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
  */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = (0, _duration.friendlyDuration)(duration).negate();
    return clone(this, adjustTime(this, dur));
  }

  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'month', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(unit) {
    if (!this.isValid) return this;
    const o = {},
          normalizedUnit = _duration2.default.normalizeUnit(unit);
    switch (normalizedUnit) {
      case 'years':
        o.month = 1;
      // falls through
      case 'quarters':
      case 'months':
        o.day = 1;
      // falls through
      case 'weeks':
      case 'days':
        o.hour = 0;
      // falls through
      case 'hours':
        o.minute = 0;
      // falls through
      case 'minutes':
        o.second = 0;
      // falls through
      case 'seconds':
        o.millisecond = 0;
        break;
      case 'milliseconds':
        break;
      default:
        throw new _errors.InvalidUnitError(unit);
    }

    if (normalizedUnit === 'weeks') {
      o.weekday = 1;
    }

    if (normalizedUnit === 'quarters') {
      const q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }

    return this.set(o);
  }

  /**
   * "Set" this DateTime to the end (i.e. the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'month', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit) {
    return this.isValid ? this.startOf(unit).plus({ [unit]: 1 }).minus(1) : this;
  }

  // OUTPUT

  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link toLocaleString} for a more flexible formatting tool. See the documentation for the specific format tokens supported.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} opts.round - round numerical values
   * @example DateTime.local().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.local().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.local().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid ? _formatter2.default.create(this.loc.redefaultToEN(), opts).formatDateTimeFromString(this, fmt) : INVALID;
  }

  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation.
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param opts {Object} - Intl.DateTimeFormat constructor options
   * @example DateTime.local().toLocaleString(); //=> 4/20/2017
   * @example DateTime.local().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.local().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.local().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.local().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.local().toLocaleString({weekday: 'long', month: 'long', day: '2-digit'}); //=> 'Thu, Apr 20'
   * @example DateTime.local().toLocaleString({weekday: 'long', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'}); //=> 'Thu, Apr 20, 11:27'
   * @example DateTime.local().toLocaleString({hour: '2-digit', minute: '2-digit'}); //=> '11:32'
   * @return {string}
   */
  toLocaleString(opts = Formats.DATE_SHORT) {
    return this.isValid ? _formatter2.default.create(this.loc.clone(opts), opts).formatDateTime(this) : INVALID;
  }

  /**
   * Returns an array of format "parts", i.e. individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.local().toLocaleString(); //=> [
   *                                    //=>   { type: 'day', value: '25' },
   *                                    //=>   { type: 'literal', value: '/' },
   *                                    //=>   { type: 'month', value: '05' },
   *                                    //=>   { type: 'literal', value: '/' },
   *                                    //=>   { type: 'year', value: '1982' }
   *                                    //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid ? _formatter2.default.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.local().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.local().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @return {string}
   */
  toISO(opts = {}) {
    if (!this.isValid) {
      return null;
    }

    return `${this.toISODate()}T${this.toISOTime(opts)}`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @return {string}
   */
  toISODate() {
    return toTechFormat(this, 'yyyy-MM-dd');
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc().hour(7).minute(34).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().hour(7).minute(34).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @return {string}
   */
  toISOTime({ suppressMilliseconds = false, suppressSeconds = false, includeOffset = true } = {}) {
    return toTechTimeFormat(this, { suppressSeconds, suppressMilliseconds, includeOffset });
  }

  /**
   * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, 'EEE, dd LLL yyyy hh:mm:ss ZZZ');
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return toTechFormat(this, 'yyyy-MM-dd');
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.local().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.local().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.local().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false } = {}) {
    return toTechTimeFormat(this, { includeOffset, includeZone, spaceZone: true });
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: false }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }

    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }

  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }

  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  inspect() {
    if (this.isValid) {
      return `DateTime {\n  ts: ${this.toISO()},\n  zone: ${this.zone.name},\n  locale: ${this.locale} }`;
    } else {
      return `DateTime { Invalid, reason: ${this.invalidReason} }`;
    }
  }

  /**
   * Returns the epoch milliseconds of this DateTime
   * @return {number}
   */
  valueOf() {
    return this.isValid ? this.ts : NaN;
  }

  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }

  /**
   * Returns a Javascript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.local().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};

    const base = Object.assign({}, this.c);

    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }

  /**
   * Returns a Javascript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }

  // COMPARE

  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = 'milliseconds', opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) return _duration2.default.invalid(this.invalidReason || otherDateTime.invalidReason);

    const units = (0, _util.maybeArray)(unit).map(_duration2.default.normalizeUnit),
          otherIsLater = otherDateTime.valueOf() > this.valueOf(),
          earlier = otherIsLater ? this : otherDateTime,
          later = otherIsLater ? otherDateTime : this,
          diffed = (0, _diff2.default)(earlier, later, units, opts);

    return otherIsLater ? diffed.negate() : diffed;
  }

  /**
   * Return the difference between this DateTime and right now.
   * See {@link diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = 'milliseconds', opts = {}) {
    return this.diff(DateTime.local(), unit, opts);
  }

  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(otherDateTime) {
    return this.isValid ? _interval2.default.fromDateTimes(this, otherDateTime) : this;
  }

  /**
   * Return whether this DateTime is in the same unit of time as another DateTime
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.local().hasSame(otherDT, 'day'); //~> true if both the same calendar day
   * @return {boolean}
   */
  hasSame(otherDateTime, unit) {
    if (!this.isValid) return false;
    if (unit === 'millisecond') {
      return this.valueOf() === otherDateTime.valueOf();
    } else {
      const inputMs = otherDateTime.valueOf();
      return this.startOf(unit) <= inputMs && inputMs <= this.endOf(unit);
    }
  }

  /**
   * Equality check
   * Two DateTimes are equal iff they represent the same millisecond
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(other) {
    return this.isValid && other.isValid ? this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc) : false;
  }

  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...dateTimes) {
    return (0, _util.bestBy)(dateTimes, i => i.valueOf(), Math.min);
  }

  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...dateTimes) {
    return (0, _util.bestBy)(dateTimes, i => i.valueOf(), Math.max);
  }

  // MISC

  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options,
          localeToUse = _locale2.default.fromOpts({ locale, numberingSystem, defaultToEN: true });
    return (0, _tokenParser.explainFromTokens)(localeToUse, text, fmt);
  }

  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text, fmt, options = {}) {
    return DateTime.fromFormatExplain(text, fmt, options);
  }

  // FORMAT PRESETS

  /**
   * {@link toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return Formats.DATE_SHORT;
  }

  /**
   * {@link toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return Formats.DATE_MED;
  }

  /**
   * {@link toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return Formats.DATE_FULL;
  }

  /**
   * {@link toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Formats.DATE_HUGE;
  }

  /**
   * {@link toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Formats.TIME_SIMPLE;
  }

  /**
   * {@link toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Formats.TIME_WITH_SECONDS;
  }

  /**
   * {@link toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Formats.TIME_WITH_SHORT_OFFSET;
  }

  /**
   * {@link toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Formats.TIME_WITH_LONG_OFFSET;
  }

  /**
   * {@link toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Formats.TIME_24_SIMPLE;
  }

  /**
   * {@link toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Formats.TIME_24_WITH_SECONDS;
  }

  /**
   * {@link toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Formats.TIME_24_WITH_SHORT_OFFSET;
  }

  /**
   * {@link toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Formats.TIME_24_WITH_LONG_OFFSET;
  }

  /**
   * {@link toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Formats.DATETIME_SHORT;
  }

  /**
   * {@link toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Formats.DATETIME_SHORT_WITH_SECONDS;
  }

  /**
   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Formats.DATETIME_MED;
  }

  /**
   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Formats.DATETIME_MED_WITH_SECONDS;
  }

  /**
   * {@link toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Formats.DATETIME_FULL;
  }

  /**
   * {@link toLocaleString} format like 'October 14, 1983, 9:303 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Formats.DATETIME_FULL_WITH_SECONDS;
  }

  /**
   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return Formats.DATETIME_HUGE;
  }

  /**
   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Formats.DATETIME_HUGE_WITH_SECONDS;
  }
}

exports.default = DateTime; /**
                             * @private
                             */

function friendlyDateTime(dateTimeish) {
  if (dateTimeish instanceof DateTime) {
    return dateTimeish;
  } else if (dateTimeish.valueOf && (0, _util.isNumber)(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish instanceof Object) {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new _errors.InvalidArgumentError('Unknown datetime argument');
  }
}
},{"./duration":35,"./interval":37,"./settings":40,"./info":38,"./impl/formatter":66,"./zones/fixedOffsetZone":41,"./zones/localZone":43,"./impl/locale":65,"./impl/util":64,"./impl/zoneUtil":68,"./impl/diff":69,"./impl/regexParser":67,"./impl/tokenParser":70,"./impl/conversions":71,"./impl/formats":72,"./errors":63}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = exports.LocalZone = exports.IANAZone = exports.FixedOffsetZone = exports.Zone = exports.Info = exports.Interval = exports.Duration = exports.DateTime = undefined;

var _datetime = require('./datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _duration = require('./duration');

var _duration2 = _interopRequireDefault(_duration);

var _interval = require('./interval');

var _interval2 = _interopRequireDefault(_interval);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _zone = require('./zone');

var _zone2 = _interopRequireDefault(_zone);

var _fixedOffsetZone = require('./zones/fixedOffsetZone');

var _fixedOffsetZone2 = _interopRequireDefault(_fixedOffsetZone);

var _IANAZone = require('./zones/IANAZone');

var _IANAZone2 = _interopRequireDefault(_IANAZone);

var _localZone = require('./zones/localZone');

var _localZone2 = _interopRequireDefault(_localZone);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DateTime = _datetime2.default;
exports.Duration = _duration2.default;
exports.Interval = _interval2.default;
exports.Info = _info2.default;
exports.Zone = _zone2.default;
exports.FixedOffsetZone = _fixedOffsetZone2.default;
exports.IANAZone = _IANAZone2.default;
exports.LocalZone = _localZone2.default;
exports.Settings = _settings2.default;
},{"./datetime":36,"./duration":35,"./interval":37,"./info":38,"./zone":39,"./zones/fixedOffsetZone":41,"./zones/IANAZone":42,"./zones/localZone":43,"./settings":40}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = exports.Controls = function (_React$Component) {
  _inherits(Controls, _React$Component);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
  }

  _createClass(Controls, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var startGame = function startGame() {
        _this2.props.fn.startGame();
      };
      var setRows = function setRows() {
        var rows__NUMBER = _reactDom2.default.findDOMNode(_this2.refs.setRowsCtrl).value || _this2.props.state.grid.rows;
        _this2.props.fn.setRows(rows__NUMBER);
      };
      var setColumns = function setColumns() {
        var columns__NUMBER = _reactDom2.default.findDOMNode(_this2.refs.setColumnsCtrl).value || _this2.props.state.grid.columns;
        _this2.props.fn.setColumns(columns__NUMBER);
      };
      var setSecondsPerStage = function setSecondsPerStage() {
        var secondsPerStage__NUMBER = _reactDom2.default.findDOMNode(_this2.refs.setSecondsPerStage).value || _this2.props.state.stages.secondsPerStage;
        _this2.props.fn.setSecondsPerStage(secondsPerStage__NUMBER);
      };
      return _react2.default.createElement(
        'div',
        { className: 'header__controls' },
        _react2.default.createElement(
          'div',
          { className: 'header__controls__startCtrl' },
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: startGame },
            'START'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'header__controls__ctrls' },
          _react2.default.createElement(
            'div',
            { className: 'header__controls__item' },
            _react2.default.createElement(
              'label',
              null,
              'ROWS'
            ),
            _react2.default.createElement('input', { type: 'number', ref: 'setRowsCtrl', onChange: setRows, value: this.props.state.grid.rows })
          ),
          _react2.default.createElement(
            'div',
            { className: 'header__controls__item' },
            _react2.default.createElement(
              'label',
              null,
              'COLUMNS'
            ),
            _react2.default.createElement('input', { type: 'number', ref: 'setColumnsCtrl', onChange: setColumns, value: this.props.state.grid.columns })
          ),
          _react2.default.createElement(
            'div',
            { className: 'header__controls__item' },
            _react2.default.createElement(
              'label',
              null,
              'LEVEL SECONDS'
            ),
            _react2.default.createElement('input', { type: 'number', ref: 'setSecondsPerStage', onChange: setSecondsPerStage, value: this.props.state.stages.secondsPerStage })
          )
        )
      );
    }
  }]);

  return Controls;
}(_react2.default.Component);
},{"react":20,"react-dom":21}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoreData = exports.ScoreData = function (_React$Component) {
  _inherits(ScoreData, _React$Component);

  function ScoreData() {
    _classCallCheck(this, ScoreData);

    return _possibleConstructorReturn(this, (ScoreData.__proto__ || Object.getPrototypeOf(ScoreData)).apply(this, arguments));
  }

  _createClass(ScoreData, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var propsToCheck = ['currentScore', 'currentStage', 'secondsLeft', 'ducksWhacked'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = propsToCheck[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          if (nextProps.state[prop] !== this.props.state[prop]) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      var _this2 = this;

      var levelChanged = function levelChanged() {
        return _this2.props.state.currentStage !== nextProps.state.currentStage;
      };
      if (levelChanged() && nextProps.state.gameOver !== true) {
        var level = _reactDom2.default.findDOMNode(this.refs.level);
        level.classList.remove('--flash');
        setTimeout(function () {
          level.classList.add('--flash');
        }.bind(level), 20);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: 'headerScoreData', className: 'header__score-data' },
        _react2.default.createElement(
          'div',
          { className: 'header__score-data__item current-score' },
          _react2.default.createElement(
            'span',
            null,
            'SCORE: ',
            this.props.state.currentScore
          )
        ),
        _react2.default.createElement(
          'div',
          { ref: 'level', className: 'header__score-data__item level' },
          _react2.default.createElement(
            'span',
            null,
            'LEVEL: ',
            this.props.state.currentStage + 1
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'header__score-data__item time-left' },
          _react2.default.createElement(
            'span',
            null,
            'TIME LEFT: ',
            this.props.state.secondsLeft
          )
        )
      );
    }
  }]);

  return ScoreData;
}(_react2.default.Component);
},{"react":20,"react-dom":21}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinalScoreBanner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinalScoreBanner = exports.FinalScoreBanner = function (_React$Component) {
  _inherits(FinalScoreBanner, _React$Component);

  function FinalScoreBanner() {
    _classCallCheck(this, FinalScoreBanner);

    return _possibleConstructorReturn(this, (FinalScoreBanner.__proto__ || Object.getPrototypeOf(FinalScoreBanner)).apply(this, arguments));
  }

  _createClass(FinalScoreBanner, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.state.gameOver !== this.props.state.gameOver && nextProps.state.gameOver === true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var finalScoreBanner = _reactDom2.default.findDOMNode(this.refs.finalScoreBanner);
      var animationDuration = 5000;
      var animationDelay = 1000;
      var delay = animationDuration + animationDelay;
      var hideFinalScoreBanner = function hideFinalScoreBanner() {
        finalScoreBanner.classList.remove('--active', 'print-chars');
      };
      var showFinalScoreBanner = function showFinalScoreBanner() {
        finalScoreBanner.classList.add('--active', 'print-chars');
        setTimeout(function () {
          hideFinalScoreBanner();
        }, delay);
      };
      showFinalScoreBanner();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: 'finalScoreBanner', className: 'final-score-banner' },
        _react2.default.createElement(
          'div',
          { className: 'final-score-banner__chars' },
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'F'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'I'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'N'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'A'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'L'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            '\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'S'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'C'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'O'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'R'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            'E'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            ':'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            '\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: 'char' },
            this.props.state.finalScore
          )
        )
      );
    }
  }]);

  return FinalScoreBanner;
}(_react2.default.Component);
},{"react":20,"react-dom":21}],77:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridDuck = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridDuck = exports.GridDuck = function (_React$Component) {
  _inherits(GridDuck, _React$Component);

  function GridDuck() {
    _classCallCheck(this, GridDuck);

    return _possibleConstructorReturn(this, (GridDuck.__proto__ || Object.getPrototypeOf(GridDuck)).apply(this, arguments));
  }

  _createClass(GridDuck, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var shouldUpdate = nextProps.duckGateOpen || nextProps.gameInProgress != this.props.gameInProgress;
      return shouldUpdate;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.closeDuckGate();
      var duck = _reactDom2.default.findDOMNode(this.refs.duck);
      duck.classList.remove('--active');
      var isCurrentDuck = function isCurrentDuck(coords, currentDuckCoords) {
        return coords.x == currentDuckCoords.x && coords.y == currentDuckCoords.y;
      };
      if (isCurrentDuck(this.props.coords, this.props.currentDuckCoords)) {
        duck.style.animationDuration = this.props.duckSpeed + 's';
        this.props.setTimeout(function () {
          duck.classList.add('--active');
        }.bind(duck), 20);
        var delay = this.props.duckSpeed * 1000;
        this.props.setTimeout(function () {
          this.props.enterTheDuck(duck);
        }.bind(this), delay);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var duckWhack__EVENT = function () {
        var duck = _reactDom2.default.findDOMNode(this.refs.duck);
        this.props.duckWhacked(duck);
      }.bind(this);
      var className = 'grid__duck';
      return _react2.default.createElement(
        'div',
        { ref: 'duck', className: className, onClick: duckWhack__EVENT },
        _react2.default.createElement(
          'span',
          null,
          this.props.duckSpeed,
          's'
        )
      );
    }
  }]);

  return GridDuck;
}(_react2.default.Component);
},{"react":20,"react-dom":21}],74:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridSquare = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gridDuck = require('./grid-duck.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridSquare = exports.GridSquare = function (_React$Component) {
  _inherits(GridSquare, _React$Component);

  function GridSquare() {
    _classCallCheck(this, GridSquare);

    return _possibleConstructorReturn(this, (GridSquare.__proto__ || Object.getPrototypeOf(GridSquare)).apply(this, arguments));
  }

  _createClass(GridSquare, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'grid__square' },
        _react2.default.createElement(_gridDuck.GridDuck, {
          coords: this.props.coords,
          currentDuckCoords: this.props.currentDuckCoords,
          currentDuckId: this.props.currentDuckId,
          duckWhacked: this.props.duckWhacked,
          enterTheDuck: this.props.enterTheDuck,
          closeDuckGate: this.props.closeDuckGate,
          setTimeout: this.props.setTimeout,
          duckGateOpen: this.props.duckGateOpen,
          gameInProgress: this.props.gameInProgress,
          currentStage: this.props.currentStage,
          duckSpeed: this.props.duckSpeed })
      );
    }
  }]);

  return GridSquare;
}(_react2.default.Component);
},{"react":20,"./grid-duck.component":77}],53:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gridSquare = require('./grid-square.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridRow = exports.GridRow = function (_React$Component) {
  _inherits(GridRow, _React$Component);

  function GridRow() {
    _classCallCheck(this, GridRow);

    return _possibleConstructorReturn(this, (GridRow.__proto__ || Object.getPrototypeOf(GridRow)).apply(this, arguments));
  }

  _createClass(GridRow, [{
    key: 'render',
    value: function render() {
      var gridSquares = [];
      for (var i = 0, l = this.props.grid.columns; i < l; i++) {
        var coords = {
          x: i,
          y: this.props.row
        };
        gridSquares.push(_react2.default.createElement(_gridSquare.GridSquare, {
          key: i,
          coords: coords,
          currentDuckCoords: this.props.currentDuckCoords,
          currentDuckId: this.props.currentDuckId,
          duckWhacked: this.props.duckWhacked,
          enterTheDuck: this.props.enterTheDuck,
          closeDuckGate: this.props.closeDuckGate,
          setTimeout: this.props.setTimeout,
          duckGateOpen: this.props.duckGateOpen,
          gameInProgress: this.props.gameInProgress,
          currentStage: this.props.currentStage,
          duckSpeed: this.props.duckSpeed }));
      }
      return _react2.default.createElement(
        'div',
        { className: 'grid__row' },
        gridSquares
      );
    }
  }]);

  return GridRow;
}(_react2.default.Component);
},{"react":20,"./grid-square.component":74}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRows = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _gridRow = require('./grid-row.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridRows = exports.GridRows = function (_React$Component) {
  _inherits(GridRows, _React$Component);

  function GridRows() {
    _classCallCheck(this, GridRows);

    return _possibleConstructorReturn(this, (GridRows.__proto__ || Object.getPrototypeOf(GridRows)).apply(this, arguments));
  }

  _createClass(GridRows, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var propsToCheck = ['currentDuckId', 'grid'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = propsToCheck[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          if (this.props.state[prop] !== nextProps.state[prop]) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      var grid = _reactDom2.default.findDOMNode(this.refs.grid);
      if (this.props.state.ducksWhacked !== nextProps.state.ducksWhacked) {
        grid.classList.remove('--shake');
        setTimeout(function () {
          grid.classList.add('--shake');
        }.bind(grid), 20);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var gridRows = [];
      for (var i = 0, l = this.props.state.grid.rows; i < l; i++) {
        var gridRowComponent = _react2.default.createElement(_gridRow.GridRow, {
          key: i,
          row: i,
          grid: this.props.state.grid,
          currentStage: this.props.state.currentStage,
          currentDuckCoords: this.props.state.currentDuckCoords,
          currentDuckId: this.props.state.currentDuckId,
          duckGateOpen: this.props.state.duckGateOpen,
          gameInProgress: this.props.state.gameInProgress,
          duckSpeed: this.props.state.currentDuckSpeed,
          duckWhacked: this.props.fn.duckWhacked,
          enterTheDuck: this.props.fn.enterTheDuck,
          closeDuckGate: this.props.fn.closeDuckGate,
          setTimeout: this.props.fn.setTimeout });
        gridRows.push(gridRowComponent);
      }
      return _react2.default.createElement(
        'div',
        { ref: 'grid', className: 'grid' },
        gridRows
      );
    }
  }]);

  return GridRows;
}(_react2.default.Component);
},{"react":20,"react-dom":21,"./grid-row.component":53}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomDuckGenerator = randomDuckGenerator;
function randomDuckGenerator() {
  var grid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { rows: 4, columns: 4 };

  var coords = {
    x: Math.floor(Math.random() * (grid.columns || 4)),
    y: Math.floor(Math.random() * (grid.rows || 4))
  };
  var prefix = '_' + Math.random().toString().slice(2) + '_';
  var id = prefix + Object.keys(coords).map(function (key) {
    return coords[key];
  }).join(':');
  return {
    get coords() {
      return coords;
    },
    get id() {
      return id;
    }
  };
}
},{}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whackPointsGenerator = whackPointsGenerator;
function whackPointsGenerator() {
  var whacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var pointsPerWhacks = {
    1: 1,
    2: 4,
    3: 16,
    4: 256
  };
  var pointsData = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    score: 0,
    pointsPerWhacks: pointsPerWhacks
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = whacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var whackCount = _step.value;

      if (typeof whackCount === 'number') {
        if (whackCount > 4) {
          var modulusRemainder = whackCount % 4;
          var fours = (whackCount - modulusRemainder) / 4;
          pointsData[4] += fours;
          if (modulusRemainder > 0) pointsData[modulusRemainder] += 1;
          // pointsData.score += (fours * pointsPerWhacks[4]) + (pointsPerWhacks[modulusRemainder] || 0);
        } else if (whackCount > 0) {
          pointsData[whackCount] += 1;
          // pointsData.score += pointsPerWhacks[whackCount];
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var key in pointsData) {
    if (isNaN(key) === false) {
      pointsData.score += pointsData[key] * pointsPerWhacks[key];
    }
  }
  return pointsData;
};
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duckSpeedGenerator = duckSpeedGenerator;
function duckSpeedGenerator() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { maxDuckSpeed: 4, minDuckSpeed: 0.5, currentStage: 0 };

  return {
    get seconds() {
      var speedInSeconds = data.minDuckSpeed;
      if (data.maxDuckSpeed - data.currentStage >= data.minDuckSpeed) {
        speedInSeconds = data.maxDuckSpeed - data.currentStage;
      }
      return speedInSeconds;
    }
  };
}
},{}],4:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _luxon = require('luxon');

var _controls = require('./components/controls.component');

var _scoreData = require('./components/score-data.component');

var _finalScoreBanner = require('./components/final-score-banner.component');

var _gridRows = require('./components/grid-rows.component');

var _randomDuckGenerator = require('./services/random-duck-generator');

var _whackPointsGenerator = require('./services/whack-points-generator');

var _duckSpeedGenerator = require('./services/duck-speed-generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // THIRD-PARTY

// COMPONENTS

// SERVICES


var WhackADuck = function (_React$Component) {
  _inherits(WhackADuck, _React$Component);

  function WhackADuck(props) {
    _classCallCheck(this, WhackADuck);

    var _this = _possibleConstructorReturn(this, (WhackADuck.__proto__ || Object.getPrototypeOf(WhackADuck)).call(this, props));

    _this.timeoutStore = [];
    _this.countdownInterval = null;
    _this.defaults = {
      grid: {
        rows: 4,
        columns: 4
      },
      stages: {
        length: 6,
        secondsPerStage: 10
      },
      currentStage: 0,
      currentDuckCoords: {
        x: -1,
        y: -1
      },
      currentDuckId: '0:0',
      maxDuckSpeed: 4,
      minDuckSpeed: 0.5,
      gameInProgress: false,
      gameOver: false,
      duckGateOpen: false,
      currentScore: 0,
      finalScore: 0,
      secondsLeft: 0,
      gameStartedAt: _luxon.DateTime.local()
    };
    _this.state = {
      currentDuckCoords: _this.defaults.currentDuckCoords,
      currentDuckId: _this.defaults.currentDuckId,
      currentStage: _this.defaults.currentStage,
      maxDuckSpeed: _this.defaults.maxDuckSpeed,
      minDuckSpeed: _this.defaults.minDuckSpeed,
      currentDuckSpeed: _this.defaults.maxDuckSpeed,
      gameInProgress: _this.defaults.gameInProgress,
      gameOver: _this.defaults.gameOver,
      duckGateOpen: _this.defaults.duckGateOpen,
      whacks: new Array(_this.defaults.stages.length).fill(0),
      ducksWhacked: 0,
      gameDuration: 0,
      grid: _this.defaults.grid,
      stages: _this.defaults.stages,
      currentScore: _this.defaults.currentScore,
      finalScore: _this.defaults.finalScore,
      gameStartedAt: _this.defaults.gameStartedAt,
      secondsLeft: _this.defaults.secondsLeft
    };
    _this.setRows = _this.setRows.bind(_this);
    _this.setColumns = _this.setColumns.bind(_this);
    _this.setSecondsPerStage = _this.setSecondsPerStage.bind(_this);
    _this.startGame = _this.startGame.bind(_this);
    _this.enterTheDuck = _this.enterTheDuck.bind(_this);
    _this.duckWhacked = _this.duckWhacked.bind(_this);
    _this.closeDuckGate = _this.closeDuckGate.bind(_this);
    _this.setTimeout = _this.setTimeout.bind(_this);
    return _this;
  }

  _createClass(WhackADuck, [{
    key: 'secondsLeft',
    value: function secondsLeft() {
      var secondsPassed = _luxon.Interval.fromDateTimes(this.state.gameStartedAt, _luxon.DateTime.local()).length('seconds');
      var gameLengthInSeconds = this.state.stages.secondsPerStage * this.state.stages.length;
      var secondsLeft = Math.ceil(gameLengthInSeconds - secondsPassed);
      return secondsLeft;
    }
  }, {
    key: 'startCountdown',
    value: function startCountdown() {
      this.setState({
        secondsLeft: this.secondsLeft()
      });
      this.countdownInterval = setInterval(function () {
        this.setState({
          secondsLeft: this.secondsLeft()
        });
      }.bind(this), 1000);
    }
  }, {
    key: 'endCountdown',
    value: function endCountdown() {
      clearInterval(this.countdownInterval);
    }
  }, {
    key: 'ctrlSettingsAllowed',
    value: function ctrlSettingsAllowed() {
      return !this.state.gameInProgress;
    }
  }, {
    key: 'setRows',
    value: function setRows(rows__NUMBER) {
      rows__NUMBER = parseInt(rows__NUMBER);
      if (this.ctrlSettingsAllowed()) {
        this.setState({
          grid: {
            rows: rows__NUMBER == 0 ? 1 : rows__NUMBER <= 10 ? rows__NUMBER : this.defaults.grid.rows,
            columns: this.state.grid.columns
          }
        });
      }
    }
  }, {
    key: 'setColumns',
    value: function setColumns(columns__NUMBER) {
      columns__NUMBER = parseInt(columns__NUMBER);
      if (this.ctrlSettingsAllowed()) {
        this.setState({
          grid: {
            rows: this.state.grid.rows,
            columns: columns__NUMBER == 0 ? 1 : columns__NUMBER <= 10 ? columns__NUMBER : this.defaults.grid.columns
          }
        });
      }
    }
  }, {
    key: 'setSecondsPerStage',
    value: function setSecondsPerStage(seconds__NUMBER) {
      seconds__NUMBER = parseInt(seconds__NUMBER);
      if (this.ctrlSettingsAllowed()) {
        this.setState({
          stages: {
            secondsPerStage: seconds__NUMBER == 0 ? 1 : seconds__NUMBER,
            length: this.state.stages.length
          }
        });
      }
    }
  }, {
    key: 'updateTimeoutStore',
    value: function updateTimeoutStore(timeout) {
      this.timeoutStore.push(timeout);
    }
  }, {
    key: 'emptyTimeoutStore',
    value: function emptyTimeoutStore() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.timeoutStore[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var timeout = _step.value;

          console.log('%cclearTimeout(' + timeout + ')', 'color: lightslategray');
          clearTimeout(timeout);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.timeoutStore = [];
    }
  }, {
    key: 'setTimeout',
    value: function (_setTimeout) {
      function setTimeout(_x, _x2) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (callback, delay) {
      var t = setTimeout(callback, delay);
      this.updateTimeoutStore(t);
    })
  }, {
    key: 'duckIdGenerator',
    value: function duckIdGenerator(currentDuckCoords) {
      var prefix = '_' + Math.random().toString().slice(2);
      return prefix + Object.keys(currentDuckCoords).map(function (key) {
        return currentDuckCoords[key];
      }).join(':');
    }
  }, {
    key: 'closeDuckGate',
    value: function closeDuckGate() {
      this.setState({
        duckGateOpen: false
      });
    }
  }, {
    key: 'setCurrentDuck',
    value: function setCurrentDuck() {
      var randomDuck = (0, _randomDuckGenerator.randomDuckGenerator)(this.state.grid);
      return {
        coords: randomDuck.coords,
        id: randomDuck.id
      };
    }
  }, {
    key: 'enterTheDuck',
    value: function enterTheDuck(duck__EL) {
      if (this.state.gameInProgress) {
        var isoTimeLessOffset = _luxon.DateTime.local().toISOTime({ includeOffset: false });
        console.warn('enterTheDuck() @ ' + isoTimeLessOffset);
        this.emptyTimeoutStore();
        this.setState({
          currentDuckCoords: this.setCurrentDuck().coords,
          currentDuckId: this.setCurrentDuck().id,
          currentDuckSpeed: (0, _duckSpeedGenerator.duckSpeedGenerator)(this.state).seconds,
          duckGateOpen: true
        });
      }
    }
  }, {
    key: 'duckWhacked',
    value: function duckWhacked(duck__EL) {
      duck__EL.classList.remove('--active');
      var updatedWhacks = Array.from(this.state.whacks);
      updatedWhacks[this.state.currentStage] += 1;
      this.setState({
        whacks: updatedWhacks,
        ducksWhacked: this.state.ducksWhacked + 1
      }, this.enterTheDuck());
    }
  }, {
    key: 'endGame',
    value: function endGame(stagesInterval) {
      clearInterval(stagesInterval);
      this.endCountdown();
      this.emptyTimeoutStore();
      var finalScore = (0, _whackPointsGenerator.whackPointsGenerator)(this.state.whacks).score;
      this.setState({
        currentScore: finalScore,
        finalScore: finalScore,
        gameOver: true
      });
      console.log('%cGAME OVER!', 'color: magenta');
      console.log('%cYOU SCORED ' + this.state.finalScore + ' POINTS', 'color: magenta');
      console.log('%cYOU WHACKED ' + this.state.ducksWhacked + ' DUCKS', 'color: magenta');
    }
  }, {
    key: 'buildGameReport',
    value: function buildGameReport() {
      return {
        whacks: this.state.whacks,
        ducksWhacked: this.state.ducksWhacked,
        finalScore: this.state.finalScore,
        pointsData: (0, _whackPointsGenerator.whackPointsGenerator)(this.state.whacks),
        gameDuration: this.state.gameDuration,
        levels: this.state.stages.length,
        gridSize: this.state.grid.rows * this.state.grid.columns
      };
    }
  }, {
    key: 'resetGame',
    value: function resetGame() {
      console.log('%cEND OF GAME REPORT:', 'color: magenta', this.buildGameReport());
      this.setState({
        report: this.buildGameReport(),
        gameInProgress: false,
        whacks: new Array(this.state.stages.length).fill(0),
        ducksWhacked: 0,
        currentDuckCoords: {
          x: -1,
          y: -1
        }
      }, this.emptyTimeoutStore);
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      if (!this.state.gameInProgress) {
        this.setState({
          gameInProgress: true,
          gameOver: false,
          currentScore: 0,
          currentStage: 0,
          gameStartedAt: _luxon.DateTime.local(),
          gameDuration: this.state.stages.length * this.state.stages.secondsPerStage,
          currentDuckSpeed: (0, _duckSpeedGenerator.duckSpeedGenerator)(this.state).seconds
        }, this.runStages);
      }
    }
  }, {
    key: 'runStages',
    value: function runStages() {
      var delay = this.state.stages.secondsPerStage * 1000;
      this.stageStarted();
      this.startCountdown();
      var stagesInterval = setInterval(function () {
        if (this.state.currentStage === this.state.stages.length - 1) {
          this.endGame(stagesInterval);
          this.resetGame();
        } else {
          this.emptyTimeoutStore();
          var nextStage = this.state.currentStage + 1;
          this.setState({
            currentStage: nextStage,
            currentScore: (0, _whackPointsGenerator.whackPointsGenerator)(this.state.whacks).score
          }, this.stageStarted);
        }
      }.bind(this), delay);
    }
  }, {
    key: 'stageStarted',
    value: function stageStarted() {
      this.enterTheDuck();
      console.log('%cLEVEL ' + this.state.currentStage + ' STARTED', 'color: magenta');
    }
  }, {
    key: 'render',
    value: function render() {
      var fn = {
        startGame: this.startGame,
        setRows: this.setRows,
        setColumns: this.setColumns,
        setSecondsPerStage: this.setSecondsPerStage,
        duckWhacked: this.duckWhacked,
        enterTheDuck: this.enterTheDuck,
        updateTimeoutStore: this.updateTimeoutStore,
        closeDuckGate: this.closeDuckGate,
        setTimeout: this.setTimeout
      };
      return _react2.default.createElement(
        'div',
        { id: 'whack-a-duck' },
        _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement(_scoreData.ScoreData, { state: this.state }),
          _react2.default.createElement(_controls.Controls, { state: this.state, fn: fn })
        ),
        _react2.default.createElement(_gridRows.GridRows, { state: this.state, fn: fn }),
        _react2.default.createElement(_finalScoreBanner.FinalScoreBanner, { state: this.state })
      );
    }
  }]);

  return WhackADuck;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(WhackADuck, null), document.querySelector('#root'));
},{"react":20,"react-dom":21,"luxon":22,"./components/controls.component":9,"./components/score-data.component":10,"./components/final-score-banner.component":11,"./components/grid-rows.component":12,"./services/random-duck-generator":13,"./services/whack-points-generator":14,"./services/duck-speed-generator":15}],2:[function(require,module,exports) {
'use strict';

require('./styles/main.scss');

require('./scripts/whack-a-duck.app.js');
},{"./styles/main.scss":3,"./scripts/whack-a-duck.app.js":4}]},{},[2], null)
//# sourceMappingURL=public.c86c96a8.map