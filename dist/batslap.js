(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],2:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],3:[function(require,module,exports){
(function() {
  var $, Batslap, balloonA, balloonB, css, fnt, fnt_b, fnt_i, fs, img, insertCss;

  $ = require('jquery');

  insertCss = require('insert-css');

  

  css = ".batslap {\n  width: 600px;\n  height: 580px;\n  background: center center no-repeat;\n  position: relative;\n}\n.batslap span.wordballoon {\n  top: 0;\n  position: absolute;\n}\n.batslap span.wordballoon-rbn {\n  left: 4px;\n  width: 316px;\n  height: 236px;\n}\n.batslap span.wordballoon-bmn {\n  right: 0;\n  width: 305px;\n  height: 197px;\n}\n.batslap p {\n  margin: 0;\n  z-index: 20;\n  position: absolute;\n  top: 0;\n  text-align: center;\n  font-family: 'unmasked';\n  font-size: 150%;\n  color: rgba(25, 25, 25, 0.9);\n  box-sizing: border-box;\n  padding: 0 10px;\n  width: 50%;\n  max-width: 50%;\n  height: 125px;\n  line-height: 125px;\n}\n.batslap p span {\n  display: inline-block;\n  vertical-align: middle;\n  line-height: normal;\n}\n.batslap p span strong {\n  font-family: 'unmasked-bold';\n  font-weight: normal;\n}\n.batslap p span em {\n  font-family: 'unmasked-ital';\n  font-style: normal;\n}\n.batslap p.rbn {\n  left: 0;\n}\n.batslap p.btmn {\n  top: 0;\n  right: 0;\n}\n.batslap-sm {\n  width: 300px;\n  height: 290px;\n  background-size: 300px 290px;\n}\n.batslap-sm p {\n  font-size: 80%;\n  height: 62px;\n  line-height: 62px;\n}\n.batslap-sm span.wordballoon-rbn {\n  left: 2px;\n  width: 158px;\n  height: 118px;\n  background-size: 158px 118px;\n}\n.batslap-sm span.wordballoon-bmn {\n  right: 0;\n  width: 152px;\n  height: 98px;\n  background-size: 152px 98px;\n}\n";

  img = "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";

  balloonA = "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";

  balloonB = "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";

  fnt = "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AD3/twAMAEn/7gAMAE7/uAAMAFn/zAAMAF3/2QAMAF7/6wAMAF//twAfAE7/zQAgACT/3wAgAC3/4wAgAEb/2wAgAE7/1AAkACD/8gAkACP/6QAkADf/1wAkADn/1wAkADz/0QAkAET/6AAkAFn/5QAkAFv/3gAkAF7/5AAnAAz/2wAnACL/eAAnACT/rwAnACb/3AAnAC3/4wAnADD/vAAnADL/0gAnADT/3AAnADj/0wAnAED/ZwAnAEb/rwAnAEj/3AAnAEz/5QAnAE7/4wAnAFH/wQAnAFP/0wAnAFb/zAAnAFj/3AAnAFr/3AAnAGD/uAAnAGH/5QAnAGL/FgApACL/wQApACT/0QApAC3/4wApADD/2QApAED/MQApAEb/1wApAE7/6wApAFH/zQApAGL/HwAqAEP/3AAtACT/3wAtADD/4gAtAEb/5QAtAFH/7AAuACT/3gAuACb/0wAuAC3/9gAuADL/2gAuADT/zwAuADb/vAAuAEj/0wAuAFP/4gAuAFj/vAAvAAz/UQAvACD/WwAvACP/NAAvADb/lQAvADf/xQAvADn/vAAvADz/lgAvAET/WwAvAFj/jAAvAFn/sgAvAFv/vAAvAF7/lQAvAGv/WwAwADf/7AAwADn/2QAwADz/5gAwAF7/2QAzAAz/2QAzACT/wwAzACb/5QAzAC3/4wAzADD/2QAzADL/5gAzADb/2gAzAEb/xAAzAEz/8wAzAE7/7QAzAFH/2gAzAFP/5gAzAFj/5gA1ACL+7wA1ACT/rwA1ACb/0wA1ACr/3AA1AC3/2QA1ADD/vAA1ADL/2QA1ADT/zAA1ADb/2QA1ADj/2QA1AED+7wA1AEb/mgA1AEj/0wA1AEz/3AA1AE7/7AA1AFH/sgA1AFP/2QA1AFb/zQA1AFj/2QA1AGL+yQA3AAz/mAA3ACL/cQA3ACT/mgA3ACr/3AA3AC3/4wA3ADD/vAA3ADL/vwA3ADT/2QA3ADb/pgA3ADj/5gA3AED/fgA3AEb/qAA3AEj/ygA3AEz/zQA3AE7/7QA3AFH/sgA3AFP/vwA3AFb/zAA3AFj/vwA3AFr/2QA3AGD/fgA3AGH/jAA3AGL/cQA5ACL/zAA5ACT/5QA5ADD/4wA5AED/sgA5AEb/8gA5AFH/7QA5AGL/sgA6ACT/+QA6AEb/8gA7AAz/zAA7ADb/pQA7AFj/vwA8AAz/rQA8ACL/bgA8ACT/mgA8ACb/ygA8ACr/zQA8AC3/2QA8ADD/sgA8ADL/vwA8ADT/wAA8ADb/sgA8AED/ZAA8AEb/ogA8AEj/uAA8AEz/zgA8AE7/2QA8AFH/vAA8AFP/zAA8AFb/vwA8AFj/sgA8AFr/1gA8AGD/eQA8AGH/gwA8AGL/ZAA9AAz/uAA9ACT/1wA9ADb/sgA9AEb/6wBEACT/5ABEAC3/4wBEAEb/zABEAE7/4wBGACD/4wBGACP/7QBGADf/3gBGADn/5QBGADz/3wBGAET/8gBGAFn/7wBGAFv/5wBGAF7/3wBGAGv/9wBJAAz/3ABJACL/lABJACT/rwBJACb/3ABJACr/1QBJAC3/zwBJADD/ygBJADL/0wBJADT/3ABJADb/8wBJADj/3ABJAD3/7gBJAED/cABJAEb/qABJAEj/2ABJAEz/7gBJAE7/4wBJAFH/uABJAFP/0wBJAFr/3ABJAGD/wQBJAGH/0wBJAGL/AwBLACL/nQBLACT/xABLADD/0ABLADL/4wBLADj/4wBLAED/OgBLAEb/xwBLAEf/7gBLAEj/5QBLAFH/0gBLAFb/7gBLAGL/FgBMADz/6gBMAFv/4wBOACT/3gBOAEb/4ABOAFH/3ABPACT/3gBPACb/4wBPACr/zQBPADL/2QBPADT/zwBPADb/sgBPAEb/5gBPAEj/0ABPAEz/1QBPAFH/4wBPAFP/xgBPAFb/zABPAFj/sgBQAAz/UQBQACD/eABQACP/NABQADb/nwBQADf/sgBQADn/vABQADz/qABQAET/WwBQAFj/nwBQAFn/xgBQAFv/xgBQAF7/jABQAGv/eABRADn/4wBRADz/9wBRAF7/4wBVAAz/swBVACL+/QBVACT/qQBVACb/1wBVACr/6wBVAC3/4wBVADD/xgBVADL/zABVADT/zABVADb/zABVADj/5gBVAED+7wBVAEb/qABVAEj/1wBVAEz/1ABVAE7/2wBVAFH/vABVAFP/2QBVAFb/zABVAFj/zQBVAFr/zABVAGL+4wBXAAz/2QBXACT/vABXACb/5QBXAC3/4wBXADD/xgBXADL/2QBXADb/zABXAEb/tABXAEj/3ABXAEz/6gBXAE7/4wBXAFH/xgBXAFP/2QBXAFb/sgBXAFj/2QBYADz/5gBZAAz/iwBZACL/cQBZACT/mwBZACb/rwBZACr/xgBZAC3/xQBZADD/nwBZADL/zABZADT/iwBZADb/pQBZAED/ZABZAEb/owBZAEj/wQBZAEz/zABZAE7/2QBZAFH/nwBZAFP/sgBZAFb/pQBZAFj/sgBZAFr/5gBZAGD/fgBZAGH/mABZAGL/SgBbACL/wABbACT/1wBbADD/4wBbAED/vwBbAEb/3wBbAGD/2QBbAGL/mABdAAz/swBdADb/twBdAFj/wABeAAz/mABeACL/bgBeACT/oQBeACb/rwBeACr/sABeAC3/vABeADD/qQBeADL/sgBeADT/pQBeADb/vwBeAED/ZABeAEb/ggBeAEf/1wBeAEj/twBeAEz/uABeAE7/xgBeAFH/ngBeAFP/sgBeAFb/rABeAFj/swBeAFr/4QBeAGD/ZABeAGH/jgBeAGL/eQBfAAz/owBfACT/7ABfADb/sgBfAEb/4ABfAFj/sgBiADf/zABiADn/zABiADz/gwBiAFn/zABiAFv/vwBiAF7/mABnACT/tABnAC3/sQBnADD/vABnAEb/ogBnAE7/qQBnAFH/swBrACT/6ABrAC3/4wBrAEb/2wBrAE7/zQABAAAACgAeACwAAWxhdG4ACAAEAAAAAP//AAEAAAABa2VybgAIAAAAAQAAAAEABAACAAAAAQAIAAEGmgAEAAAAJwBYAIYAjACeAMQBHgFEAUoBXAGCAbgBygIAAlICsALOAtgC5gNEA1YDaAOSA/AEIgQsBDoEcASmBLQFDgVMBVIFsAXOBdwGPgZUBm4GiAALACf/7gA3/8wAO//mADz/4AA9/7cASf/uAE7/uABZ/8wAXf/ZAF7/6wBf/7cAAQBO/80ABAAk/98ALf/jAEb/2wBO/9QACQAg//IAI//pADf/1wA5/9cAPP/RAET/6ABZ/+UAW//eAF7/5AAWAAz/2wAi/3gAJP+vACb/3AAt/+MAMP+8ADL/0gA0/9wAOP/TAED/ZwBG/68ASP/cAEz/5QBO/+MAUf/BAFP/0wBW/8wAWP/cAFr/3ABg/7gAYf/lAGL/FgAJACL/wQAk/9EALf/jADD/2QBA/zEARv/XAE7/6wBR/80AYv8fAAEAQ//cAAQAJP/fADD/4gBG/+UAUf/sAAkAJP/eACb/0wAt//YAMv/aADT/zwA2/7wASP/TAFP/4gBY/7wADQAM/1EAIP9bACP/NAA2/5UAN//FADn/vAA8/5YARP9bAFj/jABZ/7IAW/+8AF7/lQBr/1sABAA3/+wAOf/ZADz/5gBe/9kADQAM/9kAJP/DACb/5QAt/+MAMP/ZADL/5gA2/9oARv/EAEz/8wBO/+0AUf/aAFP/5gBY/+YAFAAi/u8AJP+vACb/0wAq/9wALf/ZADD/vAAy/9kANP/MADb/2QA4/9kAQP7vAEb/mgBI/9MATP/cAE7/7ABR/7IAU//ZAFb/zQBY/9kAYv7JABcADP+YACL/cQAk/5oAKv/cAC3/4wAw/7wAMv+/ADT/2QA2/6YAOP/mAED/fgBG/6gASP/KAEz/zQBO/+0AUf+yAFP/vwBW/8wAWP+/AFr/2QBg/34AYf+MAGL/cQAHACL/zAAk/+UAMP/jAED/sgBG//IAUf/tAGL/sgACACT/+QBG//IAAwAM/8wANv+lAFj/vwAXAAz/rQAi/24AJP+aACb/ygAq/80ALf/ZADD/sgAy/78ANP/AADb/sgBA/2QARv+iAEj/uABM/84ATv/ZAFH/vABT/8wAVv+/AFj/sgBa/9YAYP95AGH/gwBi/2QABAAM/7gAJP/XADb/sgBG/+sABAAk/+QALf/jAEb/zABO/+MACgAg/+MAI//tADf/3gA5/+UAPP/fAET/8gBZ/+8AW//nAF7/3wBr//cAFwAM/9wAIv+UACT/rwAm/9wAKv/VAC3/zwAw/8oAMv/TADT/3AA2//MAOP/cAD3/7gBA/3AARv+oAEj/2ABM/+4ATv/jAFH/uABT/9MAWv/cAGD/wQBh/9MAYv8DAAwAIv+dACT/xAAw/9AAMv/jADj/4wBA/zoARv/HAEf/7gBI/+UAUf/SAFb/7gBi/xYAAgA8/+oAW//jAAMAJP/eAEb/4ABR/9wADQAk/94AJv/jACr/zQAy/9kANP/PADb/sgBG/+YASP/QAEz/1QBR/+MAU//GAFb/zABY/7IADQAM/1EAIP94ACP/NAA2/58AN/+yADn/vAA8/6gARP9bAFj/nwBZ/8YAW//GAF7/jABr/3gAAwA5/+MAPP/3AF7/4wAWAAz/swAi/v0AJP+pACb/1wAq/+sALf/jADD/xgAy/8wANP/MADb/zAA4/+YAQP7vAEb/qABI/9cATP/UAE7/2wBR/7wAU//ZAFb/zABY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";

  fnt_b = "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AAAAAAAAAAAAAAABAAAJLAABAYUGAAAIAx4ADAAzAAoADAA3/6UADAA7/7QADAA9/7gADABX/+sADABZ/74ADABd/8YADABe/+QADABf/68ADQA3/9YADQBZ/9cAIAAk/94AIABG/9gAIwAt/9YAJAAj//kAJAAn//IAJAA3/9UAJAA5/9wAJAA8/9AAJABE/+YAJABZ/98AJABb/9gAJABe/9gAJABr/+YAJQAk/+4AJQAw//QAJQBG/+MAJwAi/3MAJwAk/6QAJwAm/80AJwAq/9cAJwAt/+YAJwAw/78AJwAy/80AJwA2/+cAJwBA/0wAJwBG/7AAJwBI/9AAJwBM/9oAJwBO/80AJwBR/8AAJwBT/80AJwBW/+cAJwBi/w0AKQAi/6YAKQAk/84AKQAw/80AKQAy/+EAKQBA/xkAKQBG/8sAKQBR/80AKQBi/w0AKgBe//UALQAk/+QALQBG/90ALgAk/9wALgAm/9MALgAt/9MALgAw/9oALgAy/9QALgA2/7kALgBG/+4ALgBR/+cALgBT/8gALgBY/7IALwAM/1sALwAg/54ALwAj/zMALwA2/8YALwA3/6sALwA5/8cALwA8/5cALwBE/00ALwBY/8AALwBZ/7EALwBb/8cALwBe/44ALwBn/zEALwBr/0UAMAAj/9kAMAA5/9kAMAA8/9kAMABZ/+YAMABb/9oAMABe/8wAMABr/9oAMwAM/+wAMwAk/7IAMwAm/+YAMwAq//AAMwAt/98AMwAw/80AMwAy/9cAMwA0/98AMwBG/7kAMwBI/+MAMwBR/74AMwBT/+EAMwBY/98ANQAi/uAANQAk/5UANQAm/+YANQAq/9cANQAw/8AANQAy/80ANQA0/9YANQA2/+EANQA4/+wANQBA/t8ANQBG/7AANQBI/+MANQBM//IANQBO/9cANQBR/8AANQBT/7gANQBW/+EANQBY/80ANQBi/qEANgAi/+8ANgA3/9AANgBA/9cANgBD/88ANgBZ/9AANwAM/3wANwAN/50ANwAi/1oANwAk/5UANwAm/8wANwAq/8gANwAt/9YANwAw/6cANwAy/7gANwA0/6wANwA2/74ANwA4/9EANwBA/1QANwBG/58ANwBI/8cANwBM/8gANwBO/+UANwBR/6YANwBT/64ANwBY/7YANwBa/9wANwBg/2MANwBh/3wANwBi/1sAOQAi/9oAOQAk/+sAOQAw/+cAOQBA/74AOQBG/+4AOQBi/6EAOgAi/+0AOgAk//IAOwAM/7QAOwBY/8YAPAAM/6EAPAAi/3EAPAAk/4EAPAAm/7MAPAAq/8gAPAAt/98APAAw/7MAPAAy/6MAPAA0/64APAA2/74APAA4/9AAPABA/2cAPABG/54APABI/70APABM/8kAPABO/+UAPABR/6YAPABT/7gAPABW/68APABY/8YAPABa/9kAPABg/3oAPABh/7QAPABi/40APQAM/8IAPQA2/8IAPQBT/+sAQwA2/60AQwBT/+cARAAk/+YARAAt/+QARABG/+wARgAg/+wARgAj/+YARgA3/9MARgA5/9QARgA8/9wARgBE//MARgBZ/9IARgBb/9gARgBc//MARgBe/8sARgBn/+wARgBr/+UASQAi/4AASQAk/7EASQAm/9EASQAt/9kASQAw/8AASQAy/9kASQA2/+8ASQBA/0wASQBG/6QASQBI/8cASQBM/9oASQBO/9oASQBR/7MASQBT/8wASQBW/80ASQBY/9kASQBi/zMASwAi/8AASwAk/8QASwAw/80ASwAy/+YASwBA/yYASwBG/8UASwBO//UASwBR/8YASwBT/9kASwBi/v8ATABb/+MATgAk//IATgAw/9oATwAk/98ATwAm/9oATwAt/98ATwAy/8kATwA2/7YATwBG/98ATwBI/9AATwBR/+MATwBT/8IATwBY/7IAUAAM/04AUAAj/zMAUAA2/8cAUAA3/70AUAA5/8cAUAA8/40AUABE/2AAUABY/9wAUABZ/7EAUABb/9wAUABe/40AUABn/2kAUABr/zsAUQAj/+wAUQA3//MAUQA5/+cAUQA8/8wAUQBb/9kAUQBc/+YAUQBe/9kAUQBr/+QAUwBD/9oAVQAi/ygAVQAk/5YAVQAm/8cAVQAq/80AVQAt/+QAVQAw/7MAVQAy/80AVQA0/8wAVQA2/8wAVQA4/+EAVQBA/uAAVQBG/6QAVQBI/9AAVQBM/+EAVQBO/9cAVQBR/6oAVQBT/8wAVQBY/80AVQBi/uoAVgBe/+wAVwAM/9YAVwAk/6MAVwAm/+0AVwAq/+8AVwAw/8AAVwAy/80AVwA2/98AVwA9//AAVwBG/7EAVwBI/9cAVwBO/8wAVwBR/7UAVwBT/80AVwBW/84AVwBY/+cAVwBa/98AWAA3/9AAWAA9/+8AWABA/8YAWABZ/9AAWQAM/2MAWQAN/3wAWQAi/1MAWQAk/48AWQAm/8cAWQAq/8IAWQAt/+QAWQAw/6cAWQAy/60AWQA0/7kAWQA2/60AWQA4/9AAWQBA/1IAWQBG/50AWQBI/9AAWQBM/80AWQBO/94AWQBR/5kAWQBT/7MAWQBY/60AWQBa/9QAWQBg/1IAWQBh/2sAWQBi/0IAWwAi/8cAWwAk/+YAWwAw/+cAWwBA/70AWwBG/9gAWwBR/+YAWwBT/9kAWwBi/6EAXAAi/9oAXAAk/+wAXABG/+wAXABR/+cAXABT/+YAXABi/9AAXQAM/5cAXQBY/7YAXgAM/5cAXgAi/14AXgAk/4QAXgAm/7QAXgAq/7sAXgAt/7sAXgAw/7MAXgAy/6MAXgA0/64AXgA2/74AXgA4/9EAXgBA/18AXgBG/4gAXgBI/7QAXgBM/8wAXgBO/7oAXgBR/5kAXgBT/7MAXgBW/64AXgBY/60AXgBa/9oAXgBg/3EAXgBi/0sAXwAM/7kAXwAk/+UAXwAm/+MAXwAy/8wAXwA2/74AXwBY/74AYgA3/60AYgA5/70AYgA8/5cAYgBZ/7YAYgBb/8cAYgBe/44AZwAk/7AAZwAt/9YAZwAw/74AZwBG/6QAZwBO/7sAZwBR/70AawAk/98AawAw/9oAawBG/8sAawBO/9cAawBR/9oAAQAAAAoAHgAsAAFsYXRuAAgABAAAAAD//wABAAAAAWtlcm4ACAAAAAEAAAABAAQAAgAAAAEACAABBtYABAAAAC4AZgCMAJYAoACmANAA3gEkAUYBTAFWAYABugHYAg4CXAJyAtQC7gL4AwIDZANyA3wDigO8BAIELAQyBDwEZgScBL4ExAUSBRgFWgVsBc4F8AYKBhQGcgaMBqYGwAAJADMACgA3/6UAO/+0AD3/uABX/+sAWf++AF3/xgBe/+QAX/+vAAIAN//WAFn/1wACACT/3gBG/9gAAQAt/9YACgAj//kAJ//yADf/1QA5/9wAPP/QAET/5gBZ/98AW//YAF7/2ABr/+YAAwAk/+4AMP/0AEb/4wARACL/cwAk/6QAJv/NACr/1wAt/+YAMP+/ADL/zQA2/+cAQP9MAEb/sABI/9AATP/aAE7/zQBR/8AAU//NAFb/5wBi/w0ACAAi/6YAJP/OADD/zQAy/+EAQP8ZAEb/ywBR/80AYv8NAAEAXv/1AAIAJP/kAEb/3QAKACT/3AAm/9MALf/TADD/2gAy/9QANv+5AEb/7gBR/+cAU//IAFj/sgAOAAz/WwAg/54AI/8zADb/xgA3/6sAOf/HADz/lwBE/00AWP/AAFn/sQBb/8cAXv+OAGf/MQBr/0UABwAj/9kAOf/ZADz/2QBZ/+YAW//aAF7/zABr/9oADQAM/+wAJP+yACb/5gAq//AALf/fADD/zQAy/9cANP/fAEb/uQBI/+MAUf++AFP/4QBY/98AEwAi/uAAJP+VACb/5gAq/9cAMP/AADL/zQA0/9YANv/hADj/7ABA/t8ARv+wAEj/4wBM//IATv/XAFH/wABT/7gAVv/hAFj/zQBi/qEABQAi/+8AN//QAED/1wBD/88AWf/QABgADP98AA3/nQAi/1oAJP+VACb/zAAq/8gALf/WADD/pwAy/7gANP+sADb/vgA4/9EAQP9UAEb/nwBI/8cATP/IAE7/5QBR/6YAU/+uAFj/tgBa/9wAYP9jAGH/fABi/1sABgAi/9oAJP/rADD/5wBA/74ARv/uAGL/oQACACL/7QAk//IAAgAM/7QAWP/GABgADP+hACL/cQAk/4EAJv+zACr/yAAt/98AMP+zADL/owA0/64ANv++ADj/0ABA/2cARv+eAEj/vQBM/8kATv/lAFH/pgBT/7gAVv+vAFj/xgBa/9kAYP96AGH/tABi/40AAwAM/8IANv/CAFP/6wACADb/rQBT/+cAAwAk/+YALf/kAEb/7AAMACD/7AAj/+YAN//TADn/1AA8/9wARP/zAFn/0gBb/9gAXP/zAF7/ywBn/+wAa//lABEAIv+AACT/sQAm/9EALf/ZADD/wAAy/9kANv/vAED/TABG/6QASP/HAEz/2gBO/9oAUf+zAFP/zABW/80AWP/ZAGL/MwAKACL/wAAk/8QAMP/NADL/5gBA/yYARv/FAE7/9QBR/8YAU//ZAGL+/wABAFv/4wACACT/8gAw/9oACgAk/98AJv/aAC3/3wAy/8kANv+2AEb/3wBI/9AAUf/jAFP/wgBY/7IADQAM/04AI/8zADb/xwA3/70AOf/HADz/jQBE/2AAWP/cAFn/sQBb/9wAXv+NAGf/aQBr/zsACAAj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";

  fnt_i = "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AP4AVgADAAD/8AAA/7UAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAACPwAAQF9BgAACALuAAwAJ//uAAwAN//MAAwAO//mAAwAPP/gAAwAPf+3AAwASf/uAAwATv+4AAwAWf/MAAwAXf/ZAAwAXv/rAAwAX/+3AB8ATv/NACAAJP/fACAALf/jACAARv/bACAATv/UACQAIP/yACQAI//pACQAN//XACQAOf/XACQAPP/RACQARP/oACQAWf/lACQAW//eACQAXv/kACcADP/bACcAIv94ACcAJP+vACcAJv/cACcALf/jACcAMP+8ACcAMv/SACcANP/cACcAOP/TACcAQP9nACcARv+vACcASP/cACcATP/lACcATv/jACcAUf/BACcAU//TACcAVv/MACcAWP/cACcAWv/cACcAYP+4ACcAYf/lACcAYv8WACkAIv/BACkAJP/RACkALf/jACkAMP/ZACkAQP8xACkARv/XACkATv/rACkAUf/NACkAYv8fACoAQ//cAC0AJP/fAC0AMP/iAC0ARv/lAC0AUf/sAC4AJP/eAC4AJv/TAC4ALf/2AC4AMv/aAC4ANP/PAC4ANv+8AC4ASP/TAC4AU//iAC4AWP+8AC8ADP9RAC8AIP9bAC8AI/80AC8ANv+VAC8AN//FAC8AOf+8AC8APP+WAC8ARP9bAC8AWP+MAC8AWf+yAC8AW/+8AC8AXv+VAC8Aa/9bADAAN//sADAAOf/ZADAAPP/mADAAXv/ZADMADP/ZADMAJP/DADMAJv/lADMALf/jADMAMP/ZADMAMv/mADMANv/aADMARv/EADMATP/zADMATv/tADMAUf/aADMAU//mADMAWP/mADUAIv7vADUAJP+vADUAJv/TADUAKv/cADUALf/ZADUAMP+8ADUAMv/ZADUANP/MADUANv/ZADUAOP/ZADUAQP7vADUARv+aADUASP/TADUATP/cADUATv/sADUAUf+yADUAU//ZADUAVv/NADUAWP/ZADUAYv7JADcADP+YADcAIv9xADcAJP+aADcAKv/cADcALf/jADcAMP+8ADcAMv+/ADcANP/ZADcANv+mADcAOP/mADcAQP9+ADcARv+oADcASP/KADcATP/NADcATv/tADcAUf+yADcAU/+/ADcAVv/MADcAWP+/ADcAWv/ZADcAYP9+ADcAYf+MADcAYv9xADkAIv/MADkAJP/lADkAMP/jADkAQP+yADkARv/yADkAUf/tADkAYv+yADoAJP/5ADoARv/yADsADP/MADsANv+lADsAWP+/ADwADP+tADwAIv9uADwAJP+aADwAJv/KADwAKv/NADwALf/ZADwAMP+yADwAMv+/ADwANP/AADwANv+yADwAQP9kADwARv+iADwASP+4ADwATP/OADwATv/ZADwAUf+8ADwAU//MADwAVv+/ADwAWP+yADwAWv/WADwAYP95ADwAYf+DADwAYv9kAD0ADP+4AD0AJP/XAD0ANv+yAD0ARv/rAEQAJP/kAEQALf/jAEQARv/MAEQATv/jAEYAIP/jAEYAI//tAEYAN//eAEYAOf/lAEYAPP/fAEYARP/yAEYAWf/vAEYAW//nAEYAXv/fAEYAa//3AEkADP/cAEkAIv+UAEkAJP+vAEkAJv/cAEkAKv/VAEkALf/PAEkAMP/KAEkAMv/TAEkANP/cAEkANv/zAEkAOP/cAEkAPf/uAEkAQP9wAEkARv+oAEkASP/YAEkATP/uAEkATv/jAEkAUf+4AEkAU//TAEkAWv/cAEkAYP/BAEkAYf/TAEkAYv8DAEsAIv+dAEsAJP/EAEsAMP/QAEsAMv/jAEsAOP/jAEsAQP86AEsARv/HAEsAR//uAEsASP/lAEsAUf/SAEsAVv/uAEsAYv8WAEwAPP/qAEwAW//jAE4AJP/eAE4ARv/gAE4AUf/cAE8AJP/eAE8AJv/jAE8AKv/NAE8AMv/ZAE8ANP/PAE8ANv+yAE8ARv/mAE8ASP/QAE8ATP/VAE8AUf/jAE8AU//GAE8AVv/MAE8AWP+yAFAADP9RAFAAIP94AFAAI/80AFAANv+fAFAAN/+yAFAAOf+8AFAAPP+oAFAARP9bAFAAWP+fAFAAWf/GAFAAW//GAFAAXv+MAFAAa/94AFEAOf/jAFEAPP/3AFEAXv/jAFUADP+zAFUAIv79AFUAJP+pAFUAJv/XAFUAKv/rAFUALf/jAFUAMP/GAFUAMv/MAFUANP/MAFUANv/MAFUAOP/mAFUAQP7vAFUARv+oAFUASP/XAFUATP/UAFUATv/bAFUAUf+8AFUAU//ZAFUAVv/MAFUAWP/NAFUAWv/MAFUAYv7jAFcADP/ZAFcAJP+8AFcAJv/lAFcALf/jAFcAMP/GAFcAMv/ZAFcANv/MAFcARv+0AFcASP/cAFcATP/qAFcATv/jAFcAUf/GAFcAU//ZAFcAVv+yAFcAWP/ZAFgAPP/mAFkADP+LAFkAIv9xAFkAJP+bAFkAJv+vAFkAKv/GAFkALf/FAFkAMP+fAFkAMv/MAFkANP+LAFkANv+lAFkAQP9kAFkARv+jAFkASP/BAFkATP/MAFkATv/ZAFkAUf+fAFkAU/+yAFkAVv+lAFkAWP+yAFkAWv/mAFkAYP9+AFkAYf+YAFkAYv9KAFsAIv/AAFsAJP/XAFsAMP/jAFsAQP+/AFsARv/fAFsAYP/ZAFsAYv+YAF0ADP+zAF0ANv+3AF0AWP/AAF4ADP+YAF4AIv9uAF4AJP+hAF4AJv+vAF4AKv+wAF4ALf+8AF4AMP+pAF4AMv+yAF4ANP+lAF4ANv+/AF4AQP9kAF4ARv+CAF4AR//XAF4ASP+3AF4ATP+4AF4ATv/GAF4AUf+eAF4AU/+yAF4AVv+sAF4AWP+zAF4AWv/hAF4AYP9kAF4AYf+OAF4AYv95AF8ADP+jAF8AJP/sAF8ANv+yAF8ARv/gAF8AWP+yAGIAN//MAGIAOf/MAGIAPP+DAGIAWf/MAGIAW/+/AGIAXv+YAGcAJP+0AGcALf+xAGcAMP+8AGcARv+iAGcATv+pAGcAUf+zAGsAJP/oAGsALf/jAGsARv/bAGsATv/NAAEAAAAKAB4ALAABbGF0bgAIAAQAAAAA//8AAQAAAAFrZXJuAAgAAAABAAAAAQAEAAIAAAABAAgAAQaaAAQAAAAnAFgAhgCMAJ4AxAEeAUQBSgFcAYIBuAHKAgACUgKwAs4C2ALmA0QDVgNoA5ID8AQiBCwEOgRwBKYEtAUOBUwFUgWwBc4F3AY+BlQGbgaIAAsAJ//uADf/zAA7/+YAPP/gAD3/twBJ/+4ATv+4AFn/zABd/9kAXv/rAF//twABAE7/zQAEACT/3wAt/+MARv/bAE7/1AAJACD/8gAj/+kAN//XADn/1wA8/9EARP/oAFn/5QBb/94AXv/kABYADP/bACL/eAAk/68AJv/cAC3/4wAw/7wAMv/SADT/3AA4/9MAQP9nAEb/rwBI/9wATP/lAE7/4wBR/8EAU//TAFb/zABY/9wAWv/cAGD/uABh/+UAYv8WAAkAIv/BACT/0QAt/+MAMP/ZAED/MQBG/9cATv/rAFH/zQBi/x8AAQBD/9wABAAk/98AMP/iAEb/5QBR/+wACQAk/94AJv/TAC3/9gAy/9oANP/PADb/vABI/9MAU//iAFj/vAANAAz/UQAg/1sAI/80ADb/lQA3/8UAOf+8ADz/lgBE/1sAWP+MAFn/sgBb/7wAXv+VAGv/WwAEADf/7AA5/9kAPP/mAF7/2QANAAz/2QAk/8MAJv/lAC3/4wAw/9kAMv/mADb/2gBG/8QATP/zAE7/7QBR/9oAU//mAFj/5gAUACL+7wAk/68AJv/TACr/3AAt/9kAMP+8ADL/2QA0/8wANv/ZADj/2QBA/u8ARv+aAEj/0wBM/9wATv/sAFH/sgBT/9kAVv/NAFj/2QBi/skAFwAM/5gAIv9xACT/mgAq/9wALf/jADD/vAAy/78ANP/ZADb/pgA4/+YAQP9+AEb/qABI/8oATP/NAE7/7QBR/7IAU/+/AFb/zABY/78AWv/ZAGD/fgBh/4wAYv9xAAcAIv/MACT/5QAw/+MAQP+yAEb/8gBR/+0AYv+yAAIAJP/5AEb/8gADAAz/zAA2/6UAWP+/ABcADP+tACL/bgAk/5oAJv/KACr/zQAt/9kAMP+yADL/vwA0/8AANv+yAED/ZABG/6IASP+4AEz/zgBO/9kAUf+8AFP/zABW/78AWP+yAFr/1gBg/3kAYf+DAGL/ZAAEAAz/uAAk/9cANv+yAEb/6wAEACT/5AAt/+MARv/MAE7/4wAKACD/4wAj/+0AN//eADn/5QA8/98ARP/yAFn/7wBb/+cAXv/fAGv/9wAXAAz/3AAi/5QAJP+vACb/3AAq/9UALf/PADD/ygAy/9MANP/cADb/8wA4/9wAPf/uAED/cABG/6gASP/YAEz/7gBO/+MAUf+4AFP/0wBa/9wAYP/BAGH/0wBi/wMADAAi/50AJP/EADD/0AAy/+MAOP/jAED/OgBG/8cAR//uAEj/5QBR/9IAVv/uAGL/FgACADz/6gBb/+MAAwAk/94ARv/gAFH/3AANACT/3gAm/+MAKv/NADL/2QA0/88ANv+yAEb/5gBI/9AATP/VAFH/4wBT/8YAVv/MAFj/sgANAAz/UQAg/3gAI/80ADb/nwA3/7IAOf+8ADz/qABE/1sAWP+fAFn/xgBb/8YAXv+MAGv/eAADADn/4wA8//cAXv/j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";

  Batslap = (function() {
    function Batslap() {
      var $obj, batslaps, container, data, style, wordballoonA, wordballoonB, _i, _len;
      batslaps = $('.batslap');
      style = $('<style>');
      style.type = 'text/css';
      style.append(document.createTextNode("@font-face {font-family: 'unmasked';src: url('data:font/opentype;base64," + fnt + "');} @font-face {font-family: 'unmasked-bold';src: url('data:font/opentype;base64," + fnt_b + "');} @font-face {font-family: 'unmasked-ital';src: url('data:font/opentype;base64," + fnt_i + "');}"));
      $('head').append(style);
      insertCss(css);
      for (_i = 0, _len = batslaps.length; _i < _len; _i++) {
        container = batslaps[_i];
        $obj = $(container);
        data = $obj.data();
        $obj.css('background-image', 'url(data:image/jpeg;base64,' + img + ')');
        if (data.r != null) {
          wordballoonA = $('<span>', {
            "class": 'wordballoon wordballoon-rbn'
          });
          wordballoonA.css('background-image', 'url(data:image/jpeg;base64,' + balloonA + ')');
          $obj.append(wordballoonA);
        }
        if (data.b != null) {
          wordballoonB = $('<span>', {
            "class": 'wordballoon wordballoon-bmn'
          });
          wordballoonB.css('background-image', 'url(data:image/jpeg;base64,' + balloonB + ')');
          $obj.append(wordballoonB);
        }
        $obj.append(this.dialog(data.r, 'rbn'));
        $obj.append(this.dialog(data.b, 'btmn'));
      }
    }

    Batslap.prototype.dialog = function(txt, className) {
      var obj, s;
      txt = this.parse(txt);
      s = $('<span>', {
        html: txt
      });
      obj = $('<p>', {
        attr: {
          "class": className
        },
        html: s
      });
      return obj;
    };

    Batslap.prototype.parse = function(txt) {
      var em, strong;
      if (txt) {
        strong = /\*\*(.+)\*\*/;
        em = /\*(.+)\*/;
        txt = txt.replace(strong, '<strong>$1</strong>');
        txt = txt.replace(em, '<em>$1</em>');
      }
      return txt;
    };

    return Batslap;

  })();

  window.batslap = new Batslap;

  module.exports = Batslap;

}).call(this);

},{"insert-css":1,"jquery":2}]},{},[3])