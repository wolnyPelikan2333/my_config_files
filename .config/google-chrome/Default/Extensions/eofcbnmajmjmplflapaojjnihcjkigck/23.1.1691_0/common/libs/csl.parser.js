(function webpackUniversalModuleDefinition(root, factory) {
  // if(typeof exports === 'object' && typeof module === 'object')
  // 	module.exports = factory();
  // else if(typeof define === 'function' && define.amd)
  // 	define("csl", [], factory);
  // else if(typeof exports === 'object')
  // 	exports["csl"] = factory();
  // else
  // 	root["csl"] = factory();
  root["csl"] = factory();
})(this, function () {
  return /******/ (() => {
    // webpackBootstrap
    /******/ var __webpack_modules__ = {
      /***/ 271: /***/ (module, exports, __webpack_require__) => {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * Sizzle CSS Selector Engine v2.3.6
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://js.foundation/
         *
         * Date: 2021-02-16
         */
        (function (window) {
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
            expando = "sizzle" + 1 * new Date(),
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            nonnativeSelectorCache = createCache(),
            sortOrder = function (a, b) {
              if (a === b) {
                hasDuplicate = true;
              }
              return 0;
            },
            // Instance methods
            hasOwn = {}.hasOwnProperty,
            arr = [],
            pop = arr.pop,
            pushNative = arr.push,
            push = arr.push,
            slice = arr.slice,
            // Use a stripped-down indexOf as it's faster than native
            // https://jsperf.com/thor-indexof-vs-for/5
            indexOf = function (list, elem) {
              var i = 0,
                len = list.length;
              for (; i < len; i++) {
                if (list[i] === elem) {
                  return i;
                }
              }
              return -1;
            },
            booleans =
              "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
              "ismap|loop|multiple|open|readonly|required|scoped",
            // Regular expressions

            // http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace = "[\\x20\\t\\r\\n\\f]",
            // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
            identifier =
              "(?:\\\\[\\da-fA-F]{1,6}" +
              whitespace +
              "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
            attributes =
              "\\[" +
              whitespace +
              "*(" +
              identifier +
              ")(?:" +
              whitespace +
              // Operator (capture 2)
              "*([*^$|!~]?=)" +
              whitespace +
              // "Attribute values must be CSS identifiers [capture 5]
              // or strings [capture 3 or capture 4]"
              "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
              identifier +
              "))|)" +
              whitespace +
              "*\\]",
            pseudos =
              ":(" +
              identifier +
              ")(?:\\((" +
              // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
              // 1. quoted (capture 3; capture 4 or capture 5)
              "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
              // 2. simple (capture 6)
              "((?:\\\\.|[^\\\\()[\\]]|" +
              attributes +
              ")*)|" +
              // 3. anything else (capture 2)
              ".*" +
              ")\\)|)",
            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rwhitespace = new RegExp(whitespace + "+", "g"),
            rtrim = new RegExp(
              "^" +
                whitespace +
                "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                whitespace +
                "+$",
              "g"
            ),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp(
              "^" +
                whitespace +
                "*([>+~]|" +
                whitespace +
                ")" +
                whitespace +
                "*"
            ),
            rdescend = new RegExp(whitespace + "|>"),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
              ID: new RegExp("^#(" + identifier + ")"),
              CLASS: new RegExp("^\\.(" + identifier + ")"),
              TAG: new RegExp("^(" + identifier + "|[*])"),
              ATTR: new RegExp("^" + attributes),
              PSEUDO: new RegExp("^" + pseudos),
              CHILD: new RegExp(
                "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                  whitespace +
                  "*(even|odd|(([+-]|)(\\d*)n|)" +
                  whitespace +
                  "*(?:([+-]|)" +
                  whitespace +
                  "*(\\d+)|))" +
                  whitespace +
                  "*\\)|)",
                "i"
              ),
              bool: new RegExp("^(?:" + booleans + ")$", "i"),

              // For use in libraries implementing .is()
              // We use this for POS matching in `select`
              needsContext: new RegExp(
                "^" +
                  whitespace +
                  "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                  whitespace +
                  "*((?:-\\d)?\\d*)" +
                  whitespace +
                  "*\\)|)(?=[^-]|$)",
                "i"
              ),
            },
            rhtml = /HTML$/i,
            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rnative = /^[^{]+\{\s*\[native \w/,
            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rsibling = /[+~]/,
            // CSS escapes
            // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape = new RegExp(
              "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])",
              "g"
            ),
            funescape = function (escape, nonHex) {
              var high = "0x" + escape.slice(1) - 0x10000;

              return nonHex
                ? // Strip the backslash prefix from a non-hex escape sequence
                  nonHex
                : // Replace a hexadecimal escape sequence with the encoded Unicode code point
                // Support: IE <=11+
                // For values outside the Basic Multilingual Plane (BMP), manually construct a
                // surrogate pair
                high < 0
                ? String.fromCharCode(high + 0x10000)
                : String.fromCharCode(
                    (high >> 10) | 0xd800,
                    (high & 0x3ff) | 0xdc00
                  );
            },
            // CSS string/identifier serialization
            // https://drafts.csswg.org/cssom/#common-serializing-idioms
            rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            fcssescape = function (ch, asCodePoint) {
              if (asCodePoint) {
                // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                if (ch === "\0") {
                  return "\uFFFD";
                }

                // Control characters and (dependent upon position) numbers get escaped as code points
                return (
                  ch.slice(0, -1) +
                  "\\" +
                  ch.charCodeAt(ch.length - 1).toString(16) +
                  " "
                );
              }

              // Other potentially-special ASCII characters get backslash-escaped
              return "\\" + ch;
            },
            // Used for iframes
            // See setDocument()
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE
            unloadHandler = function () {
              setDocument();
            },
            inDisabledFieldset = addCombinator(
              function (elem) {
                return (
                  elem.disabled === true &&
                  elem.nodeName.toLowerCase() === "fieldset"
                );
              },
              { dir: "parentNode", next: "legend" }
            );

          // Optimize for push.apply( _, NodeList )
          try {
            push.apply(
              (arr = slice.call(preferredDoc.childNodes)),
              preferredDoc.childNodes
            );

            // Support: Android<4.0
            // Detect silently failing push.apply
            // eslint-disable-next-line no-unused-expressions
            arr[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push = {
              apply: arr.length
                ? // Leverage slice if possible
                  function (target, els) {
                    pushNative.apply(target, slice.call(els));
                  }
                : // Support: IE<9
                  // Otherwise append directly
                  function (target, els) {
                    var j = target.length,
                      i = 0;

                    // Can't trust NodeList.length
                    while ((target[j++] = els[i++])) {}
                    target.length = j - 1;
                  },
            };
          }

          function Sizzle(selector, context, results, seed) {
            var m,
              i,
              elem,
              nid,
              match,
              groups,
              newSelector,
              newContext = context && context.ownerDocument,
              // nodeType defaults to 9, since context defaults to document
              nodeType = context ? context.nodeType : 9;

            results = results || [];

            // Return early from calls with invalid selector or context
            if (
              typeof selector !== "string" ||
              !selector ||
              (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
            ) {
              return results;
            }

            // Try to shortcut find operations (as opposed to filters) in HTML documents
            if (!seed) {
              setDocument(context);
              context = context || document;

              if (documentIsHTML) {
                // If the selector is sufficiently simple, try using a "get*By*" DOM method
                // (excepting DocumentFragment context, where the methods don't exist)
                if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                  // ID selector
                  if ((m = match[1])) {
                    // Document context
                    if (nodeType === 9) {
                      if ((elem = context.getElementById(m))) {
                        // Support: IE, Opera, Webkit
                        // TODO: identify versions
                        // getElementById can match elements by name instead of ID
                        if (elem.id === m) {
                          results.push(elem);
                          return results;
                        }
                      } else {
                        return results;
                      }

                      // Element context
                    } else {
                      // Support: IE, Opera, Webkit
                      // TODO: identify versions
                      // getElementById can match elements by name instead of ID
                      if (
                        newContext &&
                        (elem = newContext.getElementById(m)) &&
                        contains(context, elem) &&
                        elem.id === m
                      ) {
                        results.push(elem);
                        return results;
                      }
                    }

                    // Type selector
                  } else if (match[2]) {
                    push.apply(results, context.getElementsByTagName(selector));
                    return results;

                    // Class selector
                  } else if (
                    (m = match[3]) &&
                    support.getElementsByClassName &&
                    context.getElementsByClassName
                  ) {
                    push.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }

                // Take advantage of querySelectorAll
                if (
                  support.qsa &&
                  !nonnativeSelectorCache[selector + " "] &&
                  (!rbuggyQSA || !rbuggyQSA.test(selector)) &&
                  // Support: IE 8 only
                  // Exclude object elements
                  (nodeType !== 1 ||
                    context.nodeName.toLowerCase() !== "object")
                ) {
                  newSelector = selector;
                  newContext = context;

                  // qSA considers elements outside a scoping root when evaluating child or
                  // descendant combinators, which is not what we want.
                  // In such cases, we work around the behavior by prefixing every selector in the
                  // list with an ID selector referencing the scope context.
                  // The technique has to be used as well when a leading combinator is used
                  // as such selectors are not recognized by querySelectorAll.
                  // Thanks to Andrew Dupont for this technique.
                  if (
                    nodeType === 1 &&
                    (rdescend.test(selector) || rcombinators.test(selector))
                  ) {
                    // Expand context for sibling selectors
                    newContext =
                      (rsibling.test(selector) &&
                        testContext(context.parentNode)) ||
                      context;

                    // We can use :scope instead of the ID hack if the browser
                    // supports it & if we're not changing the context.
                    if (newContext !== context || !support.scope) {
                      // Capture the context ID, setting it first if necessary
                      if ((nid = context.getAttribute("id"))) {
                        nid = nid.replace(rcssescape, fcssescape);
                      } else {
                        context.setAttribute("id", (nid = expando));
                      }
                    }

                    // Prefix every selector in the list
                    groups = tokenize(selector);
                    i = groups.length;
                    while (i--) {
                      groups[i] =
                        (nid ? "#" + nid : ":scope") +
                        " " +
                        toSelector(groups[i]);
                    }
                    newSelector = groups.join(",");
                  }

                  try {
                    push.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }

            // All others
            return select(
              selector.replace(rtrim, "$1"),
              context,
              results,
              seed
            );
          }

          /**
           * Create key-value caches of limited size
           * @returns {function(string, object)} Returns the Object data after storing it on itself with
           *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
           *	deleting the oldest entry
           */
          function createCache() {
            var keys = [];

            function cache(key, value) {
              // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
              if (keys.push(key + " ") > Expr.cacheLength) {
                // Only keep the most recent entries
                delete cache[keys.shift()];
              }
              return (cache[key + " "] = value);
            }
            return cache;
          }

          /**
           * Mark a function for special use by Sizzle
           * @param {Function} fn The function to mark
           */
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }

          /**
           * Support testing using an element
           * @param {Function} fn Passed the created element and returns a boolean result
           */
          function assert(fn) {
            var el = document.createElement("fieldset");

            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              // Remove from its parent by default
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }

              // release memory in IE
              el = null;
            }
          }

          /**
           * Adds the same handler for all of the specified attrs
           * @param {String} attrs Pipe-separated list of attributes
           * @param {Function} handler The method that will be applied
           */
          function addHandle(attrs, handler) {
            var arr = attrs.split("|"),
              i = arr.length;

            while (i--) {
              Expr.attrHandle[arr[i]] = handler;
            }
          }

          /**
           * Checks document order of two siblings
           * @param {Element} a
           * @param {Element} b
           * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
           */
          function siblingCheck(a, b) {
            var cur = b && a,
              diff =
                cur &&
                a.nodeType === 1 &&
                b.nodeType === 1 &&
                a.sourceIndex - b.sourceIndex;

            // Use IE sourceIndex if available on both nodes
            if (diff) {
              return diff;
            }

            // Check if b follows a
            if (cur) {
              while ((cur = cur.nextSibling)) {
                if (cur === b) {
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
          function createInputPseudo(type) {
            return function (elem) {
              var name = elem.nodeName.toLowerCase();
              return name === "input" && elem.type === type;
            };
          }

          /**
           * Returns a function to use in pseudos for buttons
           * @param {String} type
           */
          function createButtonPseudo(type) {
            return function (elem) {
              var name = elem.nodeName.toLowerCase();
              return (
                (name === "input" || name === "button") && elem.type === type
              );
            };
          }

          /**
           * Returns a function to use in pseudos for :enabled/:disabled
           * @param {Boolean} disabled true for :disabled; false for :enabled
           */
          function createDisabledPseudo(disabled) {
            // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
            return function (elem) {
              // Only certain elements can match :enabled or :disabled
              // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
              // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
              if ("form" in elem) {
                // Check for inherited disabledness on relevant non-disabled elements:
                // * listed form-associated elements in a disabled fieldset
                //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                // * option elements in a disabled optgroup
                //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                // All such elements have a "form" property.
                if (elem.parentNode && elem.disabled === false) {
                  // Option elements defer to a parent optgroup if present
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }

                  // Support: IE 6 - 11
                  // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                  return (
                    elem.isDisabled === disabled ||
                    // Where there is no isDisabled, check manually
                    /* jshint -W018 */
                    (elem.isDisabled !== !disabled &&
                      inDisabledFieldset(elem) === disabled)
                  );
                }

                return elem.disabled === disabled;

                // Try to winnow out elements that can't be disabled before trusting the disabled property.
                // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                // even exist on them, let alone have a boolean value.
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }

              // Remaining elements are neither :enabled nor :disabled
              return false;
            };
          }

          /**
           * Returns a function to use in pseudos for positionals
           * @param {Function} fn
           */
          function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
              argument = +argument;
              return markFunction(function (seed, matches) {
                var j,
                  matchIndexes = fn([], seed.length, argument),
                  i = matchIndexes.length;

                // Match elements found at the specified indexes
                while (i--) {
                  if (seed[(j = matchIndexes[i])]) {
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
          function testContext(context) {
            return (
              context &&
              typeof context.getElementsByTagName !== "undefined" &&
              context
            );
          }

          // Expose support vars for convenience
          support = Sizzle.support = {};

          /**
           * Detects XML nodes
           * @param {Element|Object} elem An element or a document
           * @returns {Boolean} True iff elem is a non-HTML XML node
           */
          isXML = Sizzle.isXML = function (elem) {
            var namespace = elem && elem.namespaceURI,
              docElem = elem && (elem.ownerDocument || elem).documentElement;

            // Support: IE <=8
            // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
            // https://bugs.jquery.com/ticket/4833
            return !rhtml.test(
              namespace || (docElem && docElem.nodeName) || "HTML"
            );
          };

          /**
           * Sets document-related variables once based on the current document
           * @param {Element|Object} [doc] An element or document object to use to set the document
           * @returns {Object} Returns the current document
           */
          setDocument = Sizzle.setDocument = function (node) {
            var hasCompare,
              subWindow,
              doc = node ? node.ownerDocument || node : preferredDoc;

            // Return early if doc is invalid or already selected
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
              return document;
            }

            // Update global variables
            document = doc;
            docElem = document.documentElement;
            documentIsHTML = !isXML(document);

            // Support: IE 9 - 11+, Edge 12 - 18+
            // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if (
              preferredDoc != document &&
              (subWindow = document.defaultView) &&
              subWindow.top !== subWindow
            ) {
              // Support: IE 11, Edge
              if (subWindow.addEventListener) {
                subWindow.addEventListener("unload", unloadHandler, false);

                // Support: IE 9 - 10 only
              } else if (subWindow.attachEvent) {
                subWindow.attachEvent("onunload", unloadHandler);
              }
            }

            // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
            // Safari 4 - 5 only, Opera <=11.6 - 12.x only
            // IE/Edge & older browsers don't support the :scope pseudo-class.
            // Support: Safari 6.0 only
            // Safari 6.0 supports :scope but it's an alias of :root there.
            support.scope = assert(function (el) {
              docElem
                .appendChild(el)
                .appendChild(document.createElement("div"));
              return (
                typeof el.querySelectorAll !== "undefined" &&
                !el.querySelectorAll(":scope fieldset div").length
              );
            });

            /* Attributes
---------------------------------------------------------------------- */

            // Support: IE<8
            // Verify that getAttribute really returns attributes and not properties
            // (excepting IE8 booleans)
            support.attributes = assert(function (el) {
              el.className = "i";
              return !el.getAttribute("className");
            });

            /* getElement(s)By*
---------------------------------------------------------------------- */

            // Check if getElementsByTagName("*") returns only elements
            support.getElementsByTagName = assert(function (el) {
              el.appendChild(document.createComment(""));
              return !el.getElementsByTagName("*").length;
            });

            // Support: IE<9
            support.getElementsByClassName = rnative.test(
              document.getElementsByClassName
            );

            // Support: IE<10
            // Check if getElementById returns elements by name
            // The broken getElementById methods don't pick up programmatically-set names,
            // so use a roundabout getElementsByName test
            support.getById = assert(function (el) {
              docElem.appendChild(el).id = expando;
              return (
                !document.getElementsByName ||
                !document.getElementsByName(expando).length
              );
            });

            // ID filter and find
            if (support.getById) {
              Expr.filter["ID"] = function (id) {
                var attrId = id.replace(runescape, funescape);
                return function (elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find["ID"] = function (id, context) {
                if (
                  typeof context.getElementById !== "undefined" &&
                  documentIsHTML
                ) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter["ID"] = function (id) {
                var attrId = id.replace(runescape, funescape);
                return function (elem) {
                  var node =
                    typeof elem.getAttributeNode !== "undefined" &&
                    elem.getAttributeNode("id");
                  return node && node.value === attrId;
                };
              };

              // Support: IE 6 - 7 only
              // getElementById is not reliable as a find shortcut
              Expr.find["ID"] = function (id, context) {
                if (
                  typeof context.getElementById !== "undefined" &&
                  documentIsHTML
                ) {
                  var node,
                    i,
                    elems,
                    elem = context.getElementById(id);

                  if (elem) {
                    // Verify the id attribute
                    node = elem.getAttributeNode("id");
                    if (node && node.value === id) {
                      return [elem];
                    }

                    // Fall back on getElementsByName
                    elems = context.getElementsByName(id);
                    i = 0;
                    while ((elem = elems[i++])) {
                      node = elem.getAttributeNode("id");
                      if (node && node.value === id) {
                        return [elem];
                      }
                    }
                  }

                  return [];
                }
              };
            }

            // Tag
            Expr.find["TAG"] = support.getElementsByTagName
              ? function (tag, context) {
                  if (typeof context.getElementsByTagName !== "undefined") {
                    return context.getElementsByTagName(tag);

                    // DocumentFragment nodes don't have gEBTN
                  } else if (support.qsa) {
                    return context.querySelectorAll(tag);
                  }
                }
              : function (tag, context) {
                  var elem,
                    tmp = [],
                    i = 0,
                    // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                    results = context.getElementsByTagName(tag);

                  // Filter out possible comments
                  if (tag === "*") {
                    while ((elem = results[i++])) {
                      if (elem.nodeType === 1) {
                        tmp.push(elem);
                      }
                    }

                    return tmp;
                  }
                  return results;
                };

            // Class
            Expr.find["CLASS"] =
              support.getElementsByClassName &&
              function (className, context) {
                if (
                  typeof context.getElementsByClassName !== "undefined" &&
                  documentIsHTML
                ) {
                  return context.getElementsByClassName(className);
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
            // See https://bugs.jquery.com/ticket/13378
            rbuggyQSA = [];

            if ((support.qsa = rnative.test(document.querySelectorAll))) {
              // Build QSA regex
              // Regex strategy adopted from Diego Perini
              assert(function (el) {
                var input;

                // Select is set to empty string on purpose
                // This is to test IE's treatment of not explicitly
                // setting a boolean content attribute,
                // since its presence should be enough
                // https://bugs.jquery.com/ticket/12359
                docElem.appendChild(el).innerHTML =
                  "<a id='" +
                  expando +
                  "'></a>" +
                  "<select id='" +
                  expando +
                  "-\r\\' msallowcapture=''>" +
                  "<option selected=''></option></select>";

                // Support: IE8, Opera 11-12.16
                // Nothing should be selected when empty strings follow ^= or $= or *=
                // The test attribute must be unknown in Opera but "safe" for WinRT
                // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                if (el.querySelectorAll("[msallowcapture^='']").length) {
                  rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                }

                // Support: IE8
                // Boolean attributes and "value" are not treated correctly
                if (!el.querySelectorAll("[selected]").length) {
                  rbuggyQSA.push(
                    "\\[" + whitespace + "*(?:value|" + booleans + ")"
                  );
                }

                // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                  rbuggyQSA.push("~=");
                }

                // Support: IE 11+, Edge 15 - 18+
                // IE 11/Edge don't find elements on a `[name='']` query in some cases.
                // Adding a temporary attribute to the document before the selection works
                // around the issue.
                // Interestingly, IE 10 & older don't seem to have the issue.
                input = document.createElement("input");
                input.setAttribute("name", "");
                el.appendChild(input);
                if (!el.querySelectorAll("[name='']").length) {
                  rbuggyQSA.push(
                    "\\[" +
                      whitespace +
                      "*name" +
                      whitespace +
                      "*=" +
                      whitespace +
                      "*(?:''|\"\")"
                  );
                }

                // Webkit/Opera - :checked should return selected option elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                // IE8 throws error here and will not see later tests
                if (!el.querySelectorAll(":checked").length) {
                  rbuggyQSA.push(":checked");
                }

                // Support: Safari 8+, iOS 8+
                // https://bugs.webkit.org/show_bug.cgi?id=136851
                // In-page `selector#id sibling-combinator selector` fails
                if (!el.querySelectorAll("a#" + expando + "+*").length) {
                  rbuggyQSA.push(".#.+[+~]");
                }

                // Support: Firefox <=3.6 - 5 only
                // Old Firefox doesn't throw on a badly-escaped identifier.
                el.querySelectorAll("\\\f");
                rbuggyQSA.push("[\\r\\n\\f]");
              });

              assert(function (el) {
                el.innerHTML =
                  "<a href='' disabled='disabled'></a>" +
                  "<select disabled='disabled'><option/></select>";

                // Support: Windows 8 Native Apps
                // The type and name attributes are restricted during .innerHTML assignment
                var input = document.createElement("input");
                input.setAttribute("type", "hidden");
                el.appendChild(input).setAttribute("name", "D");

                // Support: IE8
                // Enforce case-sensitivity of name attribute
                if (el.querySelectorAll("[name=d]").length) {
                  rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                }

                // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                // IE8 throws error here and will not see later tests
                if (el.querySelectorAll(":enabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }

                // Support: IE9-11+
                // IE's :disabled selector does not pick up the children of disabled fieldsets
                docElem.appendChild(el).disabled = true;
                if (el.querySelectorAll(":disabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }

                // Support: Opera 10 - 11 only
                // Opera 10-11 does not throw on post-comma invalid pseudos
                el.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
              });
            }

            if (
              (support.matchesSelector = rnative.test(
                (matches =
                  docElem.matches ||
                  docElem.webkitMatchesSelector ||
                  docElem.mozMatchesSelector ||
                  docElem.oMatchesSelector ||
                  docElem.msMatchesSelector)
              ))
            ) {
              assert(function (el) {
                // Check to see if it's possible to do matchesSelector
                // on a disconnected node (IE 9)
                support.disconnectedMatch = matches.call(el, "*");

                // This should fail with an exception
                // Gecko does not error, returns false instead
                matches.call(el, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
              });
            }

            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches =
              rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

            /* Contains
---------------------------------------------------------------------- */
            hasCompare = rnative.test(docElem.compareDocumentPosition);

            // Element contains another
            // Purposefully self-exclusive
            // As in, an element does not contain itself
            contains =
              hasCompare || rnative.test(docElem.contains)
                ? function (a, b) {
                    var adown = a.nodeType === 9 ? a.documentElement : a,
                      bup = b && b.parentNode;
                    return (
                      a === bup ||
                      !!(
                        bup &&
                        bup.nodeType === 1 &&
                        (adown.contains
                          ? adown.contains(bup)
                          : a.compareDocumentPosition &&
                            a.compareDocumentPosition(bup) & 16)
                      )
                    );
                  }
                : function (a, b) {
                    if (b) {
                      while ((b = b.parentNode)) {
                        if (b === a) {
                          return true;
                        }
                      }
                    }
                    return false;
                  };

            /* Sorting
---------------------------------------------------------------------- */

            // Document order sorting
            sortOrder = hasCompare
              ? function (a, b) {
                  // Flag for duplicate removal
                  if (a === b) {
                    hasDuplicate = true;
                    return 0;
                  }

                  // Sort on method existence if only one input has compareDocumentPosition
                  var compare =
                    !a.compareDocumentPosition - !b.compareDocumentPosition;
                  if (compare) {
                    return compare;
                  }

                  // Calculate position if both inputs belong to the same document
                  // Support: IE 11+, Edge 17 - 18+
                  // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                  // two documents; shallow comparisons work.
                  // eslint-disable-next-line eqeqeq
                  compare =
                    (a.ownerDocument || a) == (b.ownerDocument || b)
                      ? a.compareDocumentPosition(b)
                      : // Otherwise we know they are disconnected
                        1;

                  // Disconnected nodes
                  if (
                    compare & 1 ||
                    (!support.sortDetached &&
                      b.compareDocumentPosition(a) === compare)
                  ) {
                    // Choose the first element that is related to our preferred document
                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    if (
                      a == document ||
                      (a.ownerDocument == preferredDoc &&
                        contains(preferredDoc, a))
                    ) {
                      return -1;
                    }

                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    if (
                      b == document ||
                      (b.ownerDocument == preferredDoc &&
                        contains(preferredDoc, b))
                    ) {
                      return 1;
                    }

                    // Maintain original order
                    return sortInput
                      ? indexOf(sortInput, a) - indexOf(sortInput, b)
                      : 0;
                  }

                  return compare & 4 ? -1 : 1;
                }
              : function (a, b) {
                  // Exit early if the nodes are identical
                  if (a === b) {
                    hasDuplicate = true;
                    return 0;
                  }

                  var cur,
                    i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];

                  // Parentless nodes are either documents or disconnected
                  if (!aup || !bup) {
                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    /* eslint-disable eqeqeq */
                    return a == document
                      ? -1
                      : b == document
                      ? 1
                      : /* eslint-enable eqeqeq */
                      aup
                      ? -1
                      : bup
                      ? 1
                      : sortInput
                      ? indexOf(sortInput, a) - indexOf(sortInput, b)
                      : 0;

                    // If the nodes are siblings, we can do a quick check
                  } else if (aup === bup) {
                    return siblingCheck(a, b);
                  }

                  // Otherwise we need full lists of their ancestors for comparison
                  cur = a;
                  while ((cur = cur.parentNode)) {
                    ap.unshift(cur);
                  }
                  cur = b;
                  while ((cur = cur.parentNode)) {
                    bp.unshift(cur);
                  }

                  // Walk down the tree looking for a discrepancy
                  while (ap[i] === bp[i]) {
                    i++;
                  }

                  return i
                    ? // Do a sibling check if the nodes have a common ancestor
                      siblingCheck(ap[i], bp[i])
                    : // Otherwise nodes in our document sort first
                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    /* eslint-disable eqeqeq */
                    ap[i] == preferredDoc
                    ? -1
                    : bp[i] == preferredDoc
                    ? 1
                    : /* eslint-enable eqeqeq */
                      0;
                };

            return document;
          };

          Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
          };

          Sizzle.matchesSelector = function (elem, expr) {
            setDocument(elem);

            if (
              support.matchesSelector &&
              documentIsHTML &&
              !nonnativeSelectorCache[expr + " "] &&
              (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
              (!rbuggyQSA || !rbuggyQSA.test(expr))
            ) {
              try {
                var ret = matches.call(elem, expr);

                // IE 9's matchesSelector returns false on disconnected nodes
                if (
                  ret ||
                  support.disconnectedMatch ||
                  // As well, disconnected nodes are said to be in a document
                  // fragment in IE 9
                  (elem.document && elem.document.nodeType !== 11)
                ) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }

            return Sizzle(expr, document, null, [elem]).length > 0;
          };

          Sizzle.contains = function (context, elem) {
            // Set document vars if needed
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if ((context.ownerDocument || context) != document) {
              setDocument(context);
            }
            return contains(context, elem);
          };

          Sizzle.attr = function (elem, name) {
            // Set document vars if needed
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if ((elem.ownerDocument || elem) != document) {
              setDocument(elem);
            }

            var fn = Expr.attrHandle[name.toLowerCase()],
              // Don't get fooled by Object.prototype properties (jQuery #13807)
              val =
                fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
                  ? fn(elem, name, !documentIsHTML)
                  : undefined;

            return val !== undefined
              ? val
              : support.attributes || !documentIsHTML
              ? elem.getAttribute(name)
              : (val = elem.getAttributeNode(name)) && val.specified
              ? val.value
              : null;
          };

          Sizzle.escape = function (sel) {
            return (sel + "").replace(rcssescape, fcssescape);
          };

          Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };

          /**
           * Document sorting and removing duplicates
           * @param {ArrayLike} results
           */
          Sizzle.uniqueSort = function (results) {
            var elem,
              duplicates = [],
              j = 0,
              i = 0;

            // Unless we *know* we can detect duplicates, assume their presence
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);

            if (hasDuplicate) {
              while ((elem = results[i++])) {
                if (elem === results[i]) {
                  j = duplicates.push(i);
                }
              }
              while (j--) {
                results.splice(duplicates[j], 1);
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
          getText = Sizzle.getText = function (elem) {
            var node,
              ret = "",
              i = 0,
              nodeType = elem.nodeType;

            if (!nodeType) {
              // If no nodeType, this is expected to be an array
              while ((node = elem[i++])) {
                // Do not traverse comment nodes
                ret += getText(node);
              }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
              // Use textContent for elements
              // innerText usage removed for consistency of new lines (jQuery #11153)
              if (typeof elem.textContent === "string") {
                return elem.textContent;
              } else {
                // Traverse its children
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  ret += getText(elem);
                }
              }
            } else if (nodeType === 3 || nodeType === 4) {
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
              "~": { dir: "previousSibling" },
            },

            preFilter: {
              ATTR: function (match) {
                match[1] = match[1].replace(runescape, funescape);

                // Move the given value to match[3] whether quoted or unquoted
                match[3] = (match[3] || match[4] || match[5] || "").replace(
                  runescape,
                  funescape
                );

                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }

                return match.slice(0, 4);
              },

              CHILD: function (match) {
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

                if (match[1].slice(0, 3) === "nth") {
                  // nth-* requires argument
                  if (!match[3]) {
                    Sizzle.error(match[0]);
                  }

                  // numeric x and y parameters for Expr.filter.CHILD
                  // remember that false/true cast respectively to 0/1
                  match[4] = +(match[4]
                    ? match[5] + (match[6] || 1)
                    : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");

                  // other types prohibit arguments
                } else if (match[3]) {
                  Sizzle.error(match[0]);
                }

                return match;
              },

              PSEUDO: function (match) {
                var excess,
                  unquoted = !match[6] && match[2];

                if (matchExpr["CHILD"].test(match[0])) {
                  return null;
                }

                // Accept quoted arguments as-is
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";

                  // Strip excess characters from unquoted arguments
                } else if (
                  unquoted &&
                  rpseudo.test(unquoted) &&
                  // Get excess from tokenize (recursively)
                  (excess = tokenize(unquoted, true)) &&
                  // advance to the next closing parenthesis
                  (excess =
                    unquoted.indexOf(")", unquoted.length - excess) -
                    unquoted.length)
                ) {
                  // excess is a negative index
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }

                // Return only captures needed by the pseudo filter method (type and argument)
                return match.slice(0, 3);
              },
            },

            filter: {
              TAG: function (nodeNameSelector) {
                var nodeName = nodeNameSelector
                  .replace(runescape, funescape)
                  .toLowerCase();
                return nodeNameSelector === "*"
                  ? function () {
                      return true;
                    }
                  : function (elem) {
                      return (
                        elem.nodeName &&
                        elem.nodeName.toLowerCase() === nodeName
                      );
                    };
              },

              CLASS: function (className) {
                var pattern = classCache[className + " "];

                return (
                  pattern ||
                  ((pattern = new RegExp(
                    "(^|" +
                      whitespace +
                      ")" +
                      className +
                      "(" +
                      whitespace +
                      "|$)"
                  )) &&
                    classCache(className, function (elem) {
                      return pattern.test(
                        (typeof elem.className === "string" &&
                          elem.className) ||
                          (typeof elem.getAttribute !== "undefined" &&
                            elem.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },

              ATTR: function (name, operator, check) {
                return function (elem) {
                  var result = Sizzle.attr(elem, name);

                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }

                  result += "";

                  /* eslint-disable max-len */

                  return operator === "="
                    ? result === check
                    : operator === "!="
                    ? result !== check
                    : operator === "^="
                    ? check && result.indexOf(check) === 0
                    : operator === "*="
                    ? check && result.indexOf(check) > -1
                    : operator === "$="
                    ? check && result.slice(-check.length) === check
                    : operator === "~="
                    ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(
                        check
                      ) > -1
                    : operator === "|="
                    ? result === check ||
                      result.slice(0, check.length + 1) === check + "-"
                    : false;
                  /* eslint-enable max-len */
                };
              },

              CHILD: function (type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth",
                  forward = type.slice(-4) !== "last",
                  ofType = what === "of-type";

                return first === 1 && last === 0
                  ? // Shortcut for :nth-*(n)
                    function (elem) {
                      return !!elem.parentNode;
                    }
                  : function (elem, _context, xml) {
                      var cache,
                        uniqueCache,
                        outerCache,
                        node,
                        nodeIndex,
                        start,
                        dir =
                          simple !== forward
                            ? "nextSibling"
                            : "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType,
                        diff = false;

                      if (parent) {
                        // :(first|last|only)-(child|of-type)
                        if (simple) {
                          while (dir) {
                            node = elem;
                            while ((node = node[dir])) {
                              if (
                                ofType
                                  ? node.nodeName.toLowerCase() === name
                                  : node.nodeType === 1
                              ) {
                                return false;
                              }
                            }

                            // Reverse direction for :only-* (if we haven't yet done so)
                            start = dir =
                              type === "only" && !start && "nextSibling";
                          }
                          return true;
                        }

                        start = [
                          forward ? parent.firstChild : parent.lastChild,
                        ];

                        // non-xml :nth-child(...) stores cache data on `parent`
                        if (forward && useCache) {
                          // Seek `elem` from a previously-cached index

                          // ...in a gzip-friendly way
                          node = parent;
                          outerCache = node[expando] || (node[expando] = {});

                          // Support: IE <9 only
                          // Defend against cloned attroperties (jQuery gh-1709)
                          uniqueCache =
                            outerCache[node.uniqueID] ||
                            (outerCache[node.uniqueID] = {});

                          cache = uniqueCache[type] || [];
                          nodeIndex = cache[0] === dirruns && cache[1];
                          diff = nodeIndex && cache[2];
                          node = nodeIndex && parent.childNodes[nodeIndex];

                          while (
                            (node =
                              (++nodeIndex && node && node[dir]) ||
                              // Fallback to seeking `elem` from the start
                              (diff = nodeIndex = 0) ||
                              start.pop())
                          ) {
                            // When found, cache indexes on `parent` and break
                            if (
                              node.nodeType === 1 &&
                              ++diff &&
                              node === elem
                            ) {
                              uniqueCache[type] = [dirruns, nodeIndex, diff];
                              break;
                            }
                          }
                        } else {
                          // Use previously-cached element index if available
                          if (useCache) {
                            // ...in a gzip-friendly way
                            node = elem;
                            outerCache = node[expando] || (node[expando] = {});

                            // Support: IE <9 only
                            // Defend against cloned attroperties (jQuery gh-1709)
                            uniqueCache =
                              outerCache[node.uniqueID] ||
                              (outerCache[node.uniqueID] = {});

                            cache = uniqueCache[type] || [];
                            nodeIndex = cache[0] === dirruns && cache[1];
                            diff = nodeIndex;
                          }

                          // xml :nth-child(...)
                          // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                          if (diff === false) {
                            // Use the same loop as above to seek `elem` from the start
                            while (
                              (node =
                                (++nodeIndex && node && node[dir]) ||
                                (diff = nodeIndex = 0) ||
                                start.pop())
                            ) {
                              if (
                                (ofType
                                  ? node.nodeName.toLowerCase() === name
                                  : node.nodeType === 1) &&
                                ++diff
                              ) {
                                // Cache the index of each encountered element
                                if (useCache) {
                                  outerCache =
                                    node[expando] || (node[expando] = {});

                                  // Support: IE <9 only
                                  // Defend against cloned attroperties (jQuery gh-1709)
                                  uniqueCache =
                                    outerCache[node.uniqueID] ||
                                    (outerCache[node.uniqueID] = {});

                                  uniqueCache[type] = [dirruns, diff];
                                }

                                if (node === elem) {
                                  break;
                                }
                              }
                            }
                          }
                        }

                        // Incorporate the offset, then check against cycle size
                        diff -= last;
                        return (
                          diff === first ||
                          (diff % first === 0 && diff / first >= 0)
                        );
                      }
                    };
              },

              PSEUDO: function (pseudo, argument) {
                // pseudo-class names are case-insensitive
                // http://www.w3.org/TR/selectors/#pseudo-classes
                // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                // Remember that setFilters inherits from pseudos
                var args,
                  fn =
                    Expr.pseudos[pseudo] ||
                    Expr.setFilters[pseudo.toLowerCase()] ||
                    Sizzle.error("unsupported pseudo: " + pseudo);

                // The user may use createPseudo to indicate that
                // arguments are needed to create the filter function
                // just as Sizzle does
                if (fn[expando]) {
                  return fn(argument);
                }

                // But maintain support for old signatures
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
                    ? markFunction(function (seed, matches) {
                        var idx,
                          matched = fn(seed, argument),
                          i = matched.length;
                        while (i--) {
                          idx = indexOf(seed, matched[i]);
                          seed[idx] = !(matches[idx] = matched[i]);
                        }
                      })
                    : function (elem) {
                        return fn(elem, 0, args);
                      };
                }

                return fn;
              },
            },

            pseudos: {
              // Potentially complex pseudos
              not: markFunction(function (selector) {
                // Trim the selector passed to compile
                // to avoid treating leading and trailing
                // spaces as combinators
                var input = [],
                  results = [],
                  matcher = compile(selector.replace(rtrim, "$1"));

                return matcher[expando]
                  ? markFunction(function (seed, matches, _context, xml) {
                      var elem,
                        unmatched = matcher(seed, null, xml, []),
                        i = seed.length;

                      // Match elements unmatched by `matcher`
                      while (i--) {
                        if ((elem = unmatched[i])) {
                          seed[i] = !(matches[i] = elem);
                        }
                      }
                    })
                  : function (elem, _context, xml) {
                      input[0] = elem;
                      matcher(input, null, xml, results);

                      // Don't keep the element (issue #299)
                      input[0] = null;
                      return !results.pop();
                    };
              }),

              has: markFunction(function (selector) {
                return function (elem) {
                  return Sizzle(selector, elem).length > 0;
                };
              }),

              contains: markFunction(function (text) {
                text = text.replace(runescape, funescape);
                return function (elem) {
                  return (elem.textContent || getText(elem)).indexOf(text) > -1;
                };
              }),

              // "Whether an element is represented by a :lang() selector
              // is based solely on the element's language value
              // being equal to the identifier C,
              // or beginning with the identifier C immediately followed by "-".
              // The matching of C against the element's language value is performed case-insensitively.
              // The identifier C does not have to be a valid language name."
              // http://www.w3.org/TR/selectors/#lang-pseudo
              lang: markFunction(function (lang) {
                // lang value must be a valid identifier
                if (!ridentifier.test(lang || "")) {
                  Sizzle.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function (elem) {
                  var elemLang;
                  do {
                    if (
                      (elemLang = documentIsHTML
                        ? elem.lang
                        : elem.getAttribute("xml:lang") ||
                          elem.getAttribute("lang"))
                    ) {
                      elemLang = elemLang.toLowerCase();
                      return (
                        elemLang === lang || elemLang.indexOf(lang + "-") === 0
                      );
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),

              // Miscellaneous
              target: function (elem) {
                var hash = window.location && window.location.hash;
                return hash && hash.slice(1) === elem.id;
              },

              root: function (elem) {
                return elem === docElem;
              },

              focus: function (elem) {
                return (
                  elem === document.activeElement &&
                  (!document.hasFocus || document.hasFocus()) &&
                  !!(elem.type || elem.href || ~elem.tabIndex)
                );
              },

              // Boolean properties
              enabled: createDisabledPseudo(false),
              disabled: createDisabledPseudo(true),

              checked: function (elem) {
                // In CSS3, :checked should return both checked and selected elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                var nodeName = elem.nodeName.toLowerCase();
                return (
                  (nodeName === "input" && !!elem.checked) ||
                  (nodeName === "option" && !!elem.selected)
                );
              },

              selected: function (elem) {
                // Accessing this property makes selected-by-default
                // options in Safari work properly
                if (elem.parentNode) {
                  // eslint-disable-next-line no-unused-expressions
                  elem.parentNode.selectedIndex;
                }

                return elem.selected === true;
              },

              // Contents
              empty: function (elem) {
                // http://www.w3.org/TR/selectors/#empty-pseudo
                // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                //   but not by others (comment: 8; processing instruction: 7; etc.)
                // nodeType < 6 works because attributes (2) do not appear as children
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },

              parent: function (elem) {
                return !Expr.pseudos["empty"](elem);
              },

              // Element/input types
              header: function (elem) {
                return rheader.test(elem.nodeName);
              },

              input: function (elem) {
                return rinputs.test(elem.nodeName);
              },

              button: function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (
                  (name === "input" && elem.type === "button") ||
                  name === "button"
                );
              },

              text: function (elem) {
                var attr;
                return (
                  elem.nodeName.toLowerCase() === "input" &&
                  elem.type === "text" &&
                  // Support: IE<8
                  // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                  ((attr = elem.getAttribute("type")) == null ||
                    attr.toLowerCase() === "text")
                );
              },

              // Position-in-collection
              first: createPositionalPseudo(function () {
                return [0];
              }),

              last: createPositionalPseudo(function (_matchIndexes, length) {
                return [length - 1];
              }),

              eq: createPositionalPseudo(function (
                _matchIndexes,
                length,
                argument
              ) {
                return [argument < 0 ? argument + length : argument];
              }),

              even: createPositionalPseudo(function (matchIndexes, length) {
                var i = 0;
                for (; i < length; i += 2) {
                  matchIndexes.push(i);
                }
                return matchIndexes;
              }),

              odd: createPositionalPseudo(function (matchIndexes, length) {
                var i = 1;
                for (; i < length; i += 2) {
                  matchIndexes.push(i);
                }
                return matchIndexes;
              }),

              lt: createPositionalPseudo(function (
                matchIndexes,
                length,
                argument
              ) {
                var i =
                  argument < 0
                    ? argument + length
                    : argument > length
                    ? length
                    : argument;
                for (; --i >= 0; ) {
                  matchIndexes.push(i);
                }
                return matchIndexes;
              }),

              gt: createPositionalPseudo(function (
                matchIndexes,
                length,
                argument
              ) {
                var i = argument < 0 ? argument + length : argument;
                for (; ++i < length; ) {
                  matchIndexes.push(i);
                }
                return matchIndexes;
              }),
            },
          };

          Expr.pseudos["nth"] = Expr.pseudos["eq"];

          // Add button/input type pseudos
          for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true,
          }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }

          // Easy API for creating new setFilters
          function setFilters() {}
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();

          tokenize = Sizzle.tokenize = function (selector, parseOnly) {
            var matched,
              match,
              tokens,
              type,
              soFar,
              groups,
              preFilters,
              cached = tokenCache[selector + " "];

            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }

            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;

            while (soFar) {
              // Comma and first run
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  // Don't consume trailing commas as valid
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push((tokens = []));
              }

              matched = false;

              // Combinators
              if ((match = rcombinators.exec(soFar))) {
                matched = match.shift();
                tokens.push({
                  value: matched,

                  // Cast descendant combinators to space
                  type: match[0].replace(rtrim, " "),
                });
                soFar = soFar.slice(matched.length);
              }

              // Filters
              for (type in Expr.filter) {
                if (
                  (match = matchExpr[type].exec(soFar)) &&
                  (!preFilters[type] || (match = preFilters[type](match)))
                ) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type: type,
                    matches: match,
                  });
                  soFar = soFar.slice(matched.length);
                }
              }

              if (!matched) {
                break;
              }
            }

            // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            return parseOnly
              ? soFar.length
              : soFar
              ? Sizzle.error(selector)
              : // Cache the tokens
                tokenCache(selector, groups).slice(0);
          };

          function toSelector(tokens) {
            var i = 0,
              len = tokens.length,
              selector = "";
            for (; i < len; i++) {
              selector += tokens[i].value;
            }
            return selector;
          }

          function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
              skip = combinator.next,
              key = skip || dir,
              checkNonElements = base && key === "parentNode",
              doneName = done++;

            return combinator.first
              ? // Check against closest ancestor/preceding element
                function (elem, context, xml) {
                  while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      return matcher(elem, context, xml);
                    }
                  }
                  return false;
                }
              : // Check against all ancestor/preceding elements
                function (elem, context, xml) {
                  var oldCache,
                    uniqueCache,
                    outerCache,
                    newCache = [dirruns, doneName];

                  // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                  if (xml) {
                    while ((elem = elem[dir])) {
                      if (elem.nodeType === 1 || checkNonElements) {
                        if (matcher(elem, context, xml)) {
                          return true;
                        }
                      }
                    }
                  } else {
                    while ((elem = elem[dir])) {
                      if (elem.nodeType === 1 || checkNonElements) {
                        outerCache = elem[expando] || (elem[expando] = {});

                        // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)
                        uniqueCache =
                          outerCache[elem.uniqueID] ||
                          (outerCache[elem.uniqueID] = {});

                        if (skip && skip === elem.nodeName.toLowerCase()) {
                          elem = elem[dir] || elem;
                        } else if (
                          (oldCache = uniqueCache[key]) &&
                          oldCache[0] === dirruns &&
                          oldCache[1] === doneName
                        ) {
                          // Assign to newCache so results back-propagate to previous elements
                          return (newCache[2] = oldCache[2]);
                        } else {
                          // Reuse newcache so results back-propagate to previous elements
                          uniqueCache[key] = newCache;

                          // A match means we're done; a fail means we have to keep checking
                          if ((newCache[2] = matcher(elem, context, xml))) {
                            return true;
                          }
                        }
                      }
                    }
                  }
                  return false;
                };
          }

          function elementMatcher(matchers) {
            return matchers.length > 1
              ? function (elem, context, xml) {
                  var i = matchers.length;
                  while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                      return false;
                    }
                  }
                  return true;
                }
              : matchers[0];
          }

          function multipleContexts(selector, contexts, results) {
            var i = 0,
              len = contexts.length;
            for (; i < len; i++) {
              Sizzle(selector, contexts[i], results);
            }
            return results;
          }

          function condense(unmatched, map, filter, context, xml) {
            var elem,
              newUnmatched = [],
              i = 0,
              len = unmatched.length,
              mapped = map != null;

            for (; i < len; i++) {
              if ((elem = unmatched[i])) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i);
                  }
                }
              }
            }

            return newUnmatched;
          }

          function setMatcher(
            preFilter,
            selector,
            matcher,
            postFilter,
            postFinder,
            postSelector
          ) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
              var temp,
                i,
                elem,
                preMap = [],
                postMap = [],
                preexisting = results.length,
                // Get initial elements from seed or context
                elems =
                  seed ||
                  multipleContexts(
                    selector || "*",
                    context.nodeType ? [context] : context,
                    []
                  ),
                // Prefilter to get matcher input, preserving a map for seed-results synchronization
                matcherIn =
                  preFilter && (seed || !selector)
                    ? condense(elems, preMap, preFilter, context, xml)
                    : elems,
                matcherOut = matcher
                  ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                    postFinder || (seed ? preFilter : preexisting || postFilter)
                    ? // ...intermediate processing is necessary
                      []
                    : // ...otherwise use results directly
                      results
                  : matcherIn;

              // Find primary matches
              if (matcher) {
                matcher(matcherIn, matcherOut, context, xml);
              }

              // Apply postFilter
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);

                // Un-match failing elements by moving them back to matcherIn
                i = temp.length;
                while (i--) {
                  if ((elem = temp[i])) {
                    matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                  }
                }
              }

              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
                    temp = [];
                    i = matcherOut.length;
                    while (i--) {
                      if ((elem = matcherOut[i])) {
                        // Restore matcherIn since elem is not yet a final match
                        temp.push((matcherIn[i] = elem));
                      }
                    }
                    postFinder(null, (matcherOut = []), temp, xml);
                  }

                  // Move matched elements from seed to results to keep them synchronized
                  i = matcherOut.length;
                  while (i--) {
                    if (
                      (elem = matcherOut[i]) &&
                      (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1
                    ) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }

                // Add elements to results, through postFinder if defined
              } else {
                matcherOut = condense(
                  matcherOut === results
                    ? matcherOut.splice(preexisting, matcherOut.length)
                    : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push.apply(results, matcherOut);
                }
              }
            });
          }

          function matcherFromTokens(tokens) {
            var checkContext,
              matcher,
              j,
              len = tokens.length,
              leadingRelative = Expr.relative[tokens[0].type],
              implicitRelative = leadingRelative || Expr.relative[" "],
              i = leadingRelative ? 1 : 0,
              // The foundational matcher ensures that elements are reachable from top-level context(s)
              matchContext = addCombinator(
                function (elem) {
                  return elem === checkContext;
                },
                implicitRelative,
                true
              ),
              matchAnyContext = addCombinator(
                function (elem) {
                  return indexOf(checkContext, elem) > -1;
                },
                implicitRelative,
                true
              ),
              matchers = [
                function (elem, context, xml) {
                  var ret =
                    (!leadingRelative &&
                      (xml || context !== outermostContext)) ||
                    ((checkContext = context).nodeType
                      ? matchContext(elem, context, xml)
                      : matchAnyContext(elem, context, xml));

                  // Avoid hanging onto element (issue #299)
                  checkContext = null;
                  return ret;
                },
              ];

            for (; i < len; i++) {
              if ((matcher = Expr.relative[tokens[i].type])) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i].type].apply(
                  null,
                  tokens[i].matches
                );

                // Return special upon seeing a positional matcher
                if (matcher[expando]) {
                  // Find the next relative operator (if any) for proper handling
                  j = ++i;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i > 1 && elementMatcher(matchers),
                    i > 1 &&
                      toSelector(
                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        tokens.slice(0, i - 1).concat({
                          value: tokens[i - 2].type === " " ? "*" : "",
                        })
                      ).replace(rtrim, "$1"),
                    matcher,
                    i < j && matcherFromTokens(tokens.slice(i, j)),
                    j < len && matcherFromTokens((tokens = tokens.slice(j))),
                    j < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }

            return elementMatcher(matchers);
          }

          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
              byElement = elementMatchers.length > 0,
              superMatcher = function (seed, context, xml, results, outermost) {
                var elem,
                  j,
                  matcher,
                  matchedCount = 0,
                  i = "0",
                  unmatched = seed && [],
                  setMatched = [],
                  contextBackup = outermostContext,
                  // We must always have either seed elements or outermost context
                  elems =
                    seed || (byElement && Expr.find["TAG"]("*", outermost)),
                  // Use integer dirruns iff this is the outermost matcher
                  dirrunsUnique = (dirruns +=
                    contextBackup == null ? 1 : Math.random() || 0.1),
                  len = elems.length;

                if (outermost) {
                  // Support: IE 11+, Edge 17 - 18+
                  // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                  // two documents; shallow comparisons work.
                  // eslint-disable-next-line eqeqeq
                  outermostContext =
                    context == document || context || outermost;
                }

                // Add elements passing elementMatchers directly to results
                // Support: IE<9, Safari
                // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                for (; i !== len && (elem = elems[i]) != null; i++) {
                  if (byElement && elem) {
                    j = 0;

                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    if (!context && elem.ownerDocument != document) {
                      setDocument(elem);
                      xml = !documentIsHTML;
                    }
                    while ((matcher = elementMatchers[j++])) {
                      if (matcher(elem, context || document, xml)) {
                        results.push(elem);
                        break;
                      }
                    }
                    if (outermost) {
                      dirruns = dirrunsUnique;
                    }
                  }

                  // Track unmatched elements for set filters
                  if (bySet) {
                    // They will have gone through all possible matchers
                    if ((elem = !matcher && elem)) {
                      matchedCount--;
                    }

                    // Lengthen the array for every element, matched or not
                    if (seed) {
                      unmatched.push(elem);
                    }
                  }
                }

                // `i` is now the count of elements visited above, and adding it to `matchedCount`
                // makes the latter nonnegative.
                matchedCount += i;

                // Apply set filters to unmatched elements
                // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                // no element matchers and no seed.
                // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                // numerically zero.
                if (bySet && i !== matchedCount) {
                  j = 0;
                  while ((matcher = setMatchers[j++])) {
                    matcher(unmatched, setMatched, context, xml);
                  }

                  if (seed) {
                    // Reintegrate element matches to eliminate the need for sorting
                    if (matchedCount > 0) {
                      while (i--) {
                        if (!(unmatched[i] || setMatched[i])) {
                          setMatched[i] = pop.call(results);
                        }
                      }
                    }

                    // Discard index placeholder values to get only actual matches
                    setMatched = condense(setMatched);
                  }

                  // Add matches to results
                  push.apply(results, setMatched);

                  // Seedless set matches succeeding multiple successful matchers stipulate sorting
                  if (
                    outermost &&
                    !seed &&
                    setMatched.length > 0 &&
                    matchedCount + setMatchers.length > 1
                  ) {
                    Sizzle.uniqueSort(results);
                  }
                }

                // Override manipulation of globals by nested matchers
                if (outermost) {
                  dirruns = dirrunsUnique;
                  outermostContext = contextBackup;
                }

                return unmatched;
              };

            return bySet ? markFunction(superMatcher) : superMatcher;
          }

          compile = Sizzle.compile = function (
            selector,
            match /* Internal Use Only */
          ) {
            var i,
              setMatchers = [],
              elementMatchers = [],
              cached = compilerCache[selector + " "];

            if (!cached) {
              // Generate a function of recursive functions that can be used to check each element
              if (!match) {
                match = tokenize(selector);
              }
              i = match.length;
              while (i--) {
                cached = matcherFromTokens(match[i]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }

              // Cache the compiled function
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );

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
          select = Sizzle.select = function (selector, context, results, seed) {
            var i,
              tokens,
              token,
              type,
              find,
              compiled = typeof selector === "function" && selector,
              match =
                !seed && tokenize((selector = compiled.selector || selector));

            results = results || [];

            // Try to minimize operations if there is only one selector in the list and no seed
            // (the latter of which guarantees us context)
            if (match.length === 1) {
              // Reduce context if the leading compound selector is an ID
              tokens = match[0] = match[0].slice(0);
              if (
                tokens.length > 2 &&
                (token = tokens[0]).type === "ID" &&
                context.nodeType === 9 &&
                documentIsHTML &&
                Expr.relative[tokens[1].type]
              ) {
                context = (Expr.find["ID"](
                  token.matches[0].replace(runescape, funescape),
                  context
                ) || [])[0];
                if (!context) {
                  return results;

                  // Precompiled matchers will still verify ancestry, so step up a level
                } else if (compiled) {
                  context = context.parentNode;
                }

                selector = selector.slice(tokens.shift().value.length);
              }

              // Fetch a seed set for right-to-left matching
              i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
              while (i--) {
                token = tokens[i];

                // Abort if we hit a combinator
                if (Expr.relative[(type = token.type)]) {
                  break;
                }
                if ((find = Expr.find[type])) {
                  // Search, expanding context for leading sibling combinators
                  if (
                    (seed = find(
                      token.matches[0].replace(runescape, funescape),
                      (rsibling.test(tokens[0].type) &&
                        testContext(context.parentNode)) ||
                        context
                    ))
                  ) {
                    // If seed is empty or no tokens remain, we can return early
                    tokens.splice(i, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push.apply(results, seed);
                      return results;
                    }

                    break;
                  }
                }
              }
            }

            // Compile and execute a filtering function if one is not provided
            // Provide `match` to avoid retokenization if we modified the selector above
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context ||
                (rsibling.test(selector) && testContext(context.parentNode)) ||
                context
            );
            return results;
          };

          // One-time assignments

          // Sort stability
          support.sortStable =
            expando.split("").sort(sortOrder).join("") === expando;

          // Support: Chrome 14-35+
          // Always assume duplicates if they aren't passed to the comparison function
          support.detectDuplicates = !!hasDuplicate;

          // Initialize against the default document
          setDocument();

          // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
          // Detached nodes confoundingly follow *each other*
          support.sortDetached = assert(function (el) {
            // Should return 1, but returns 4 (following)
            return (
              el.compareDocumentPosition(document.createElement("fieldset")) & 1
            );
          });

          // Support: IE<8
          // Prevent attribute/property "interpolation"
          // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
          if (
            !assert(function (el) {
              el.innerHTML = "<a href='#'></a>";
              return el.firstChild.getAttribute("href") === "#";
            })
          ) {
            addHandle("type|href|height|width", function (elem, name, isXML) {
              if (!isXML) {
                return elem.getAttribute(
                  name,
                  name.toLowerCase() === "type" ? 1 : 2
                );
              }
            });
          }

          // Support: IE<9
          // Use defaultValue in place of getAttribute("value")
          if (
            !support.attributes ||
            !assert(function (el) {
              el.innerHTML = "<input/>";
              el.firstChild.setAttribute("value", "");
              return el.firstChild.getAttribute("value") === "";
            })
          ) {
            addHandle("value", function (elem, _name, isXML) {
              if (!isXML && elem.nodeName.toLowerCase() === "input") {
                return elem.defaultValue;
              }
            });
          }

          // Support: IE<9
          // Use getAttributeNode to fetch booleans when getAttribute lies
          if (
            !assert(function (el) {
              return el.getAttribute("disabled") == null;
            })
          ) {
            addHandle(booleans, function (elem, name, isXML) {
              var val;
              if (!isXML) {
                return elem[name] === true
                  ? name.toLowerCase()
                  : (val = elem.getAttributeNode(name)) && val.specified
                  ? val.value
                  : null;
              }
            });
          }

          // EXPOSE
          var _sizzle = window.Sizzle;

          Sizzle.noConflict = function () {
            if (window.Sizzle === Sizzle) {
              window.Sizzle = _sizzle;
            }

            return Sizzle;
          };

          if (true) {
            !((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
              return Sizzle;
            }.call(exports, __webpack_require__, exports, module)),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

            // Sizzle requires that there be a global window in Common-JS like environments
          } else {
          }

          // EXPOSE
        })(window);

        /***/
      },

      /***/ 809: /***/ (module, exports) => {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*
         * Generated by PEG.js 0.10.0.
         *
         * http://pegjs.org/
         */
        !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
        (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          "use strict";

          function peg$subclass(child, parent) {
            function ctor() {
              this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
          }

          function peg$SyntaxError(message, expected, found, location) {
            this.message = message;
            this.expected = expected;
            this.found = found;
            this.location = location;
            this.name = "SyntaxError";

            if (typeof Error.captureStackTrace === "function") {
              Error.captureStackTrace(this, peg$SyntaxError);
            }
          }

          peg$subclass(peg$SyntaxError, Error);

          peg$SyntaxError.buildMessage = function (expected, found) {
            var DESCRIBE_EXPECTATION_FNS = {
              literal: function (expectation) {
                return '"' + literalEscape(expectation.text) + '"';
              },

              class: function (expectation) {
                var escapedParts = "",
                  i;

                for (i = 0; i < expectation.parts.length; i++) {
                  escapedParts +=
                    expectation.parts[i] instanceof Array
                      ? classEscape(expectation.parts[i][0]) +
                        "-" +
                        classEscape(expectation.parts[i][1])
                      : classEscape(expectation.parts[i]);
                }

                return (
                  "[" + (expectation.inverted ? "^" : "") + escapedParts + "]"
                );
              },

              any: function (expectation) {
                return "any character";
              },

              end: function (expectation) {
                return "end of input";
              },

              other: function (expectation) {
                return expectation.description;
              },
            };

            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            function literalEscape(s) {
              return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, '\\"')
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) {
                  return "\\x0" + hex(ch);
                })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
                  return "\\x" + hex(ch);
                });
            }

            function classEscape(s) {
              return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) {
                  return "\\x0" + hex(ch);
                })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
                  return "\\x" + hex(ch);
                });
            }

            function describeExpectation(expectation) {
              return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
            }

            function describeExpected(expected) {
              var descriptions = new Array(expected.length),
                i,
                j;

              for (i = 0; i < expected.length; i++) {
                descriptions[i] = describeExpectation(expected[i]);
              }

              descriptions.sort();

              if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                  if (descriptions[i - 1] !== descriptions[i]) {
                    descriptions[j] = descriptions[i];
                    j++;
                  }
                }
                descriptions.length = j;
              }

              switch (descriptions.length) {
                case 1:
                  return descriptions[0];

                case 2:
                  return descriptions[0] + " or " + descriptions[1];

                default:
                  return (
                    descriptions.slice(0, -1).join(", ") +
                    ", or " +
                    descriptions[descriptions.length - 1]
                  );
              }
            }

            function describeFound(found) {
              return found ? '"' + literalEscape(found) + '"' : "end of input";
            }

            return (
              "Expected " +
              describeExpected(expected) +
              " but " +
              describeFound(found) +
              " found."
            );
          };

          function peg$parse(input, options) {
            options = options !== void 0 ? options : {};

            var peg$FAILED = {},
              peg$startRuleFunctions = { start: peg$parsestart },
              peg$startRuleFunction = peg$parsestart,
              peg$c0 = function (program) {
                return program;
              },
              peg$c1 = peg$anyExpectation(),
              peg$c2 = peg$otherExpectation("whitespace"),
              peg$c3 = /^[\t\x0B\f \xA0\uFEFF]/,
              peg$c4 = peg$classExpectation(
                ["\t", "\x0B", "\f", " ", "\xA0", "\uFEFF"],
                false,
                false
              ),
              peg$c5 = /^[\n\r\u2028\u2029]/,
              peg$c6 = peg$classExpectation(
                ["\n", "\r", "\u2028", "\u2029"],
                false,
                false
              ),
              peg$c7 = peg$otherExpectation("end of line"),
              peg$c8 = "\n",
              peg$c9 = peg$literalExpectation("\n", false),
              peg$c10 = "\r\n",
              peg$c11 = peg$literalExpectation("\r\n", false),
              peg$c12 = "\r",
              peg$c13 = peg$literalExpectation("\r", false),
              peg$c14 = "\u2028",
              peg$c15 = peg$literalExpectation("\u2028", false),
              peg$c16 = "\u2029",
              peg$c17 = peg$literalExpectation("\u2029", false),
              peg$c18 = peg$otherExpectation("comment"),
              peg$c19 = "/*",
              peg$c20 = peg$literalExpectation("/*", false),
              peg$c21 = "*/",
              peg$c22 = peg$literalExpectation("*/", false),
              peg$c23 = "//",
              peg$c24 = peg$literalExpectation("//", false),
              peg$c25 = "$",
              peg$c26 = peg$literalExpectation("$", false),
              peg$c27 = /^[ ]/,
              peg$c28 = peg$classExpectation([" "], false, false),
              peg$c29 = "}",
              peg$c30 = peg$literalExpectation("}", false),
              peg$c31 = peg$otherExpectation("Statement"),
              peg$c32 = peg$otherExpectation("Assignment Statement"),
              peg$c33 = function (variable, accessor, operator, value) {
                return {
                  type: "AssignmentStatement",
                  variable: variable,
                  accessor: accessor,
                  operator: operator,
                  value: value,
                  interpret: function (interpreter) {
                    var value = this.value.interpret(interpreter);
                    // handle +=, -=, /=, etc...
                    if (this.operator != "=") {
                      var var_value = this.variable.interpret(interpreter);
                      value = binaryOperator(
                        var_value,
                        this.operator.substring(0, 1),
                        value
                      );
                    }
                    if (this.accessor !== null) {
                      var index = accessor.interpret(interpreter);
                      var var_value = this.variable.interpret(interpreter);
                      index = absolute_index(index, var_value);
                      interpreter.variables[this.variable.identifier][index] =
                        value;
                    } else {
                      interpreter.variables[this.variable.identifier] = value;
                    }
                  },
                  accept: function (visitor) {
                    visitor.visitAssignmentStatement(this);
                  },
                };
              },
              peg$c34 = peg$otherExpectation("Assignment Operator"),
              peg$c35 = "=",
              peg$c36 = peg$literalExpectation("=", false),
              peg$c37 = function () {
                return "=";
              },
              peg$c38 = "*=",
              peg$c39 = peg$literalExpectation("*=", false),
              peg$c40 = "/=",
              peg$c41 = peg$literalExpectation("/=", false),
              peg$c42 = "%=",
              peg$c43 = peg$literalExpectation("%=", false),
              peg$c44 = "+=",
              peg$c45 = peg$literalExpectation("+=", false),
              peg$c46 = "-=",
              peg$c47 = peg$literalExpectation("-=", false),
              peg$c48 = /^[a-zA-Z0-9_]/,
              peg$c49 = peg$classExpectation(
                [["a", "z"], ["A", "Z"], ["0", "9"], "_"],
                false,
                false
              ),
              peg$c50 = function (start, name) {
                return {
                  type: "VariableExpression",
                  identifier: start + name.join(""),
                  interpret: function (interpreter) {
                    if (!(this.identifier in interpreter.variables)) {
                      throw new interpreter.InterpreterError(
                        "Variable " + this.identifier + " not defined."
                      );
                    }
                    var value = interpreter.variables[this.identifier];
                    return value;
                  },
                  accept: function (visitor) {
                    return visitor.visitVariableExpression(this);
                  },
                };
              },
              peg$c51 = ",",
              peg$c52 = peg$literalExpectation(",", false),
              peg$c53 = function (head, tail) {
                var vars = [head];
                for (var i = 0; i < tail.length; i++) {
                  vars.push(tail[i][3]);
                }
                return vars;
              },
              peg$c54 = function (expr) {
                return {
                  type: "StatementExpression",
                  expr: expr,
                  interpret: function (interpreter) {
                    this.expr.interpret(interpreter);
                  },
                  accept: function (visitor) {
                    return visitor.visitStatementExpression(this);
                  },
                };
              },
              peg$c55 = peg$otherExpectation("Block"),
              peg$c56 = "{",
              peg$c57 = peg$literalExpectation("{", false),
              peg$c58 = function (statements) {
                return {
                  type: "Block",
                  statements: statements !== null ? statements[0] : [],
                  interpret: function (interpreter) {
                    for (var i = this.statements.length - 1; i >= 0; i--) {
                      interpreter.stmt_stack.push(this.statements[i]);
                    }
                  },
                  accept: function (visitor) {
                    visitor.visitBlock(this);
                  },
                };
              },
              peg$c59 = function (head, tail) {
                var result = [head];
                for (var i = 0; i < tail.length; i++) {
                  result.push(tail[i][1]);
                }
                return result;
              },
              peg$c60 = peg$otherExpectation("No-op Statement"),
              peg$c61 = ";",
              peg$c62 = peg$literalExpectation(";", false),
              peg$c63 = function () {
                return {
                  type: "EmptyStatement",
                  interpret: function (interpreter) {},
                  accept: function (visitor) {
                    visitor.visitEmptyStatement(this);
                  },
                };
              },
              peg$c64 = peg$otherExpectation("For-In Loop"),
              peg$c65 = "(",
              peg$c66 = peg$literalExpectation("(", false),
              peg$c67 = ")",
              peg$c68 = peg$literalExpectation(")", false),
              peg$c69 = function (iterator, collection, statement) {
                return {
                  type: "ForInStatement",
                  iterator: iterator,
                  collection: collection,
                  statement: statement,
                  interpret: function (interpreter) {
                    var collection = this.collection.interpret(interpreter);
                    var statement = this.statement;
                    if (!collection.hasOwnProperty("length")) {
                      throw new interpreter.InterpreterError(
                        "ForIn Loop only on Arrays or Strings."
                      );
                    }
                    var i = 0;
                    var iteratorid = this.iterator.identifier;
                    function LoopClosure() {
                      this.type = "LoopClosure";
                    }
                    LoopClosure.prototype.interpret = function (interpreter) {
                      //console.log("loop counter is " + i);
                      if (i < collection.length) {
                        interpreter.variables[iteratorid] = collection[i];
                        i += 1;
                        interpreter.stmt_stack.push(this);
                        interpreter.stmt_stack.push(statement);
                      }
                    };
                    interpreter.stmt_stack.push(new LoopClosure());
                  },
                  accept: function (visitor) {
                    visitor.visitForInStatement(this);
                  },
                };
              },
              peg$c70 = peg$otherExpectation("If Statement"),
              peg$c71 = function (condition, if_statement, else_statement) {
                return {
                  type: "IfStatement",
                  condition: condition,
                  if_statement: if_statement,
                  else_statement: else_statement,
                  interpret: function (interpreter) {
                    if (this.condition.interpret(interpreter)) {
                      interpreter.stmt_stack.push(this.if_statement);
                    } else {
                      if (this.else_statement !== null) {
                        interpreter.stmt_stack.push(this.else_statement[2]);
                      }
                    }
                  },
                  accept: function (visitor) {
                    visitor.visitIfStatement(this);
                  },
                };
              },
              peg$c72 = peg$otherExpectation("Require Statement"),
              peg$c73 = function (vars) {
                return {
                  type: "RequireStatement",
                  vars: vars,
                  interpret: function (interpreter) {
                    for (var i = 0; i < this.vars.length; i++) {
                      var identifier = this.vars[i].identifier;
                      var value = this.vars[i].interpret(interpreter);
                      if (!value) {
                        interpreter.error_callback.call(
                          this,
                          new interpreter.RequireError(
                            "Variable " + identifier + " required."
                          )
                        );

                        // remove all stmts from the stack - program fin.
                        while (interpreter.stmt_stack.length > 0) {
                          interpreter.stmt_stack.pop();
                        }

                        // set interpreter.ret to undefined to indicate that we
                        // just triggered a RequireError
                        interpreter.ret = undefined;
                        // break loop
                        break;
                      }
                    }
                  },
                  accept: function (visitor) {
                    visitor.visitRequireStatement(this);
                  },
                };
              },
              peg$c74 = peg$otherExpectation("Return Statement"),
              peg$c75 = function (vars) {
                return {
                  type: "ReturnStatement",
                  vars: vars,
                  interpret: function (interpreter) {
                    // For 'refresh' functionality - we only call 'return_callback' if
                    // returned values are 'different' from last time.
                    // Since JS does not support object equality we will check if all
                    // 'vars' are in interpreter.ret and if the number of properties match.
                    var different = false;

                    // set of variables to return (get rid of accidential duplicates)
                    var var_identifiers = {};
                    var i = this.vars.length - 1;
                    while (i >= 0) {
                      var_identifiers[this.vars[i].identifier] = true;
                      i = i - 1;
                    }

                    if (interpreter.ret === undefined) {
                      // last time we triggered an RequireError, now we got results.
                      interpreter.ret = {};
                    }

                    var i = this.vars.length - 1;
                    while (i >= 0) {
                      var variable = this.vars[i];
                      var value = variable.interpret(interpreter);
                      // strip "$" from identifier
                      var identifier = variable.identifier.substring(1);

                      // set value in interpreter.ret if not already there
                      if (
                        !(
                          identifier in interpreter.ret &&
                          compare(interpreter.ret[identifier], value)
                        )
                      ) {
                        different = true;
                        interpreter.ret[identifier] = value;
                      }
                      i = i - 1;
                    }

                    var n_vars_ret = 0;
                    for (var prop in interpreter.ret) {
                      n_vars_ret += 1;
                    }

                    var n_vars = 0;
                    for (var prop in var_identifiers) {
                      n_vars += 1;
                    }

                    // now check if size of interpreter.ret == var_identifiers.length
                    // if not they are different
                    if (n_vars != n_vars_ret) {
                      different = true;
                    }

                    if (different) {
                      //console.log("Found something different - lets call the backend in");
                      interpreter.return_callback.call(
                        interpreter.return_callback,
                        interpreter.ret
                      );
                    } else {
                      // console.log("Nothing changed...");
                    }
                  },
                  accept: function (visitor) {
                    visitor.visitReturnStatement(this);
                  },
                };
              },
              peg$c76 = function (expression) {
                return expression;
              },
              peg$c77 = /^[a-zA-Z_]/,
              peg$c78 = peg$classExpectation(
                [["a", "z"], ["A", "Z"], "_"],
                false,
                false
              ),
              peg$c79 = function (name) {
                return name.join("");
              },
              peg$c80 = function (func_name, arg_exprs) {
                return {
                  type: "CallExpression",
                  func_name: func_name,
                  arg_exprs: arg_exprs !== null ? arg_exprs : [],
                  interpret: function (interpreter) {
                    var args = [];
                    for (var i = 0; i < this.arg_exprs.length; i++) {
                      var val = this.arg_exprs[i].interpret(interpreter);
                      args.push(val);
                    }
                    var func = interpreter.function_table[this.func_name];
                    if (!func) {
                      return undefined;
                    }
                    return func.apply(interpreter, args);
                  },
                  accept: function (visitor) {
                    return visitor.visitCallExpression(this);
                  },
                };
              },
              peg$c81 = function (head, tail) {
                var args = [head];
                for (var i = 0; i < tail.length; i++) {
                  args.push(tail[i][3]);
                }
                return args;
              },
              peg$c82 = "[",
              peg$c83 = peg$literalExpectation("[", false),
              peg$c84 = "]",
              peg$c85 = peg$literalExpectation("]", false),
              peg$c86 = function (index) {
                return index;
              },
              peg$c87 = function (value, index) {
                return {
                  type: "AccessorExpression",
                  value: value,
                  index: index,
                  interpret: function (interpreter) {
                    var value = this.value.interpret(interpreter);
                    var index = this.index.interpret(interpreter);
                    index = absolute_index(index, value);
                    return value[index];
                  },
                  accept: function (visitor) {
                    return visitor.visitAccessorExpression(this);
                  },
                };
              },
              peg$c88 = function (operator, expression) {
                return {
                  type: "UnaryExpression",
                  operator: operator,
                  expression: expression,
                  interpret: function (interpreter) {
                    var val = this.expression.interpret(interpreter);
                    return unaryOperator(this.operator, val);
                  },
                  accept: function (visitor) {
                    return visitor.visitUnaryExpression(this);
                  },
                };
              },
              peg$c89 = "+",
              peg$c90 = peg$literalExpectation("+", false),
              peg$c91 = "-",
              peg$c92 = peg$literalExpectation("-", false),
              peg$c93 = "~",
              peg$c94 = peg$literalExpectation("~", false),
              peg$c95 = "not",
              peg$c96 = peg$literalExpectation("not", false),
              peg$c97 = function (head, tail) {
                var result = head;
                for (var i = 0; i < tail.length; i++) {
                  result = {
                    type: "MultiplicativeExpression",
                    operator: tail[i][1],
                    left: result,
                    right: tail[i][3],
                    interpret: function (interpreter) {
                      var left = this.left.interpret(interpreter);
                      var right = this.right.interpret(interpreter);
                      return binaryOperator(left, this.operator, right);
                    },
                    accept: function (visitor) {
                      return visitor.visitMultiplicativeExpression(this);
                    },
                  };
                }
                return result;
              },
              peg$c98 = "*",
              peg$c99 = peg$literalExpectation("*", false),
              peg$c100 = "/",
              peg$c101 = peg$literalExpectation("/", false),
              peg$c102 = "%",
              peg$c103 = peg$literalExpectation("%", false),
              peg$c104 = function (operator) {
                return operator;
              },
              peg$c105 = function (head, tail) {
                var result = head;
                for (var i = 0; i < tail.length; i++) {
                  result = {
                    type: "AdditiveExpression",
                    operator: tail[i][1],
                    left: result,
                    right: tail[i][3],
                    interpret: function (interpreter) {
                      var left = this.left.interpret(interpreter);
                      var right = this.right.interpret(interpreter);
                      return binaryOperator(left, this.operator, right);
                    },
                    accept: function (visitor) {
                      return visitor.visitAdditiveExpression(this);
                    },
                  };
                }
                return result;
              },
              peg$c106 = function () {
                return "+";
              },
              peg$c107 = function () {
                return "-";
              },
              peg$c108 = function (head, tail) {
                var result = head;
                for (var i = 0; i < tail.length; i++) {
                  result = {
                    type: "RelationalExpression",
                    operator: tail[i][1],
                    left: result,
                    right: tail[i][3],
                    interpret: function (interpreter) {
                      var left = this.left.interpret(interpreter);
                      var right = this.right.interpret(interpreter);
                      return binaryOperator(left, this.operator, right);
                    },
                    accept: function (visitor) {
                      return visitor.visitRelationalExpression(this);
                    },
                  };
                }
                return result;
              },
              peg$c109 = "<=",
              peg$c110 = peg$literalExpectation("<=", false),
              peg$c111 = ">=",
              peg$c112 = peg$literalExpectation(">=", false),
              peg$c113 = "<",
              peg$c114 = peg$literalExpectation("<", false),
              peg$c115 = ">",
              peg$c116 = peg$literalExpectation(">", false),
              peg$c117 = function (head, tail) {
                var result = head;
                for (var i = 0; i < tail.length; i++) {
                  result = {
                    type: "EqualsExpression",
                    operator: tail[i][1],
                    left: result,
                    right: tail[i][3],
                    interpret: function (interpreter) {
                      var left_val = this.left.interpret(interpreter);
                      var right_val = this.right.interpret(interpreter);
                      return left_val == right_val;
                    },
                    accept: function (visitor) {
                      return visitor.visitEqualsExpression(this);
                    },
                  };
                }
                return result;
              },
              peg$c118 = "==",
              peg$c119 = peg$literalExpectation("==", false),
              peg$c120 = function () {
                return "==";
              },
              peg$c121 = function (head, tail) {
                var result = head;
                for (var i = 0; i < tail.length; i++) {
                  result = {
                    type: "LogicalANDExpression",
                    operator: tail[i][1],
                    left: result,
                    right: tail[i][3],
                    interpret: function (interpreter) {
                      var left = this.left.interpret(interpreter);
                      if (!left) {
                        return false;
                      } else {
                        return this.right.interpret(interpreter);
                      }
                    },
                    accept: function (visitor) {
                      return visitor.visitLogicalANDExpression(this);
                    },
                  };
                }
                return result;
              },
              peg$c122 = function (head, tail) {
                var result = head;
                for (var i = 0; i < tail.length; i++) {
                  result = {
                    type: "LogicalORExpression",
                    operator: tail[i][1],
                    left: result,
                    right: tail[i][3],
                    interpret: function (interpreter) {
                      var left = this.left.interpret(interpreter);
                      if (left) {
                        return left;
                      } else {
                        return this.right.interpret(interpreter);
                      }
                    },
                    accept: function (visitor) {
                      return visitor.visitLogicalORExpression(this);
                    },
                  };
                }
                return result;
              },
              peg$c123 = function (elements) {
                return {
                  type: "ArrayLiteral",
                  elements: elements !== null ? elements : [],
                  interpret: function (interpreter) {
                    var res = new Array();
                    for (var i = 0; i < this.elements.length; i++) {
                      res.push(this.elements[i].interpret(interpreter));
                    }
                    return res;
                  },
                  accept: function (visitor) {
                    return visitor.visitArrayLiteral(this);
                  },
                };
              },
              peg$c124 = peg$otherExpectation("regex"),
              peg$c125 = function (value_) {
                return {
                  type: "RegexLiteral",
                  value: value_,
                  interpret: function (interpreter) {
                    return this.value;
                  },
                  accept: function (visitor) {
                    return visitor.visitRegularExpressionLiteral(this);
                  },
                };
              },
              peg$c126 = function () {
                return {
                  type: "NullLiteral",
                  value: null,
                  interpret: function (interpreter) {
                    return this.value;
                  },
                  accept: function (visitor) {
                    return visitor.visitNullLiteral(this);
                  },
                };
              },
              peg$c127 = function () {
                return {
                  type: "BooleanLiteral",
                  value: true,
                  interpret: function (interpreter) {
                    return this.value;
                  },
                  accept: function (visitor) {
                    return visitor.visitBooleanLiteral(this);
                  },
                };
              },
              peg$c128 = function () {
                return {
                  type: "BooleanLiteral",
                  value: false,
                  interpret: function (interpreter) {
                    return this.value;
                  },
                  accept: function (visitor) {
                    return visitor.visitBooleanLiteral(this);
                  },
                };
              },
              peg$c129 = peg$otherExpectation("number"),
              peg$c130 = function (value) {
                return {
                  type: "NumericLiteral",
                  value: value,
                  interpret: function (interpreter) {
                    return this.value;
                  },
                  accept: function (visitor) {
                    return visitor.visitNumericLiteral(this);
                  },
                };
              },
              peg$c131 = ".",
              peg$c132 = peg$literalExpectation(".", false),
              peg$c133 = function (before, after, exponent) {
                return parseFloat(before + "." + after + exponent);
              },
              peg$c134 = function (after, exponent) {
                return parseFloat("." + after + exponent);
              },
              peg$c135 = function (before, exponent) {
                return parseFloat(before + exponent);
              },
              peg$c136 = "0",
              peg$c137 = peg$literalExpectation("0", false),
              peg$c138 = function (digit, digits) {
                return digit + digits;
              },
              peg$c139 = function (digits) {
                return digits.join("");
              },
              peg$c140 = /^[0-9]/,
              peg$c141 = peg$classExpectation([["0", "9"]], false, false),
              peg$c142 = /^[1-9]/,
              peg$c143 = peg$classExpectation([["1", "9"]], false, false),
              peg$c144 = function (indicator, integer) {
                return indicator + integer;
              },
              peg$c145 = /^[eE]/,
              peg$c146 = peg$classExpectation(["e", "E"], false, false),
              peg$c147 = /^[\-+]/,
              peg$c148 = peg$classExpectation(["-", "+"], false, false),
              peg$c149 = function (sign, digits) {
                return sign + digits;
              },
              peg$c150 = /^[xX]/,
              peg$c151 = peg$classExpectation(["x", "X"], false, false),
              peg$c152 = function (digits) {
                return parseInt("0x" + dgits.join(""));
              },
              peg$c153 = /^[0-9a-fA-F]/,
              peg$c154 = peg$classExpectation(
                [
                  ["0", "9"],
                  ["a", "f"],
                  ["A", "F"],
                ],
                false,
                false
              ),
              peg$c155 = peg$otherExpectation("string"),
              peg$c156 = '"',
              peg$c157 = peg$literalExpectation('"', false),
              peg$c158 = "'",
              peg$c159 = peg$literalExpectation("'", false),
              peg$c160 = function (parts) {
                return {
                  type: "StringLiteral",
                  value: parts[1] || "",
                  quote: parts[0],
                  interpret: function (interpreter) {
                    return this.value;
                  },
                  accept: function (visitor) {
                    return visitor.visitStringLiteral(this);
                  },
                };
              },
              peg$c161 = function (chars) {
                return chars.join("");
              },
              peg$c162 = "\\",
              peg$c163 = peg$literalExpectation("\\", false),
              peg$c164 = function (char_) {
                return char_;
              },
              peg$c165 = function (sequence) {
                return sequence;
              },
              peg$c166 = function (slash) {
                return slash;
              },
              peg$c167 = function (sequence) {
                return sequence;
              },
              peg$c168 = function () {
                return "\0";
              },
              peg$c169 = /^['"\\bfnrtv]/,
              peg$c170 = peg$classExpectation(
                ["'", '"', "\\", "b", "f", "n", "r", "t", "v"],
                false,
                false
              ),
              peg$c171 = function (char_) {
                return char_
                  .replace("b", "\b")
                  .replace("f", "\f")
                  .replace("n", "\n")
                  .replace("r", "\r")
                  .replace("t", "\t")
                  .replace("v", "\x0B"); // IE does not recognize "\v".
              },
              peg$c172 = function (char_) {
                return char_;
              },
              peg$c173 = "x",
              peg$c174 = peg$literalExpectation("x", false),
              peg$c175 = "u",
              peg$c176 = peg$literalExpectation("u", false),
              peg$c177 = function (h1, h2) {
                return String.fromCharCode(parseInt("0x" + h1 + h2));
              },
              peg$c178 = function (h1, h2, h3, h4) {
                return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
              },
              peg$c179 = "and",
              peg$c180 = peg$literalExpectation("and", false),
              peg$c181 = "or",
              peg$c182 = peg$literalExpectation("or", false),
              peg$c183 = "break",
              peg$c184 = peg$literalExpectation("break", false),
              peg$c185 = "else",
              peg$c186 = peg$literalExpectation("else", false),
              peg$c187 = "false",
              peg$c188 = peg$literalExpectation("false", false),
              peg$c189 = "for",
              peg$c190 = peg$literalExpectation("for", false),
              peg$c191 = "in",
              peg$c192 = peg$literalExpectation("in", false),
              peg$c193 = "if",
              peg$c194 = peg$literalExpectation("if", false),
              peg$c195 = "null",
              peg$c196 = peg$literalExpectation("null", false),
              peg$c197 = "return",
              peg$c198 = peg$literalExpectation("return", false),
              peg$c199 = "true",
              peg$c200 = peg$literalExpectation("true", false),
              peg$c201 = "require",
              peg$c202 = peg$literalExpectation("require", false),
              peg$c203 = function (statements) {
                return {
                  type: "Program",
                  statements: statements !== null ? statements : [],
                  interpret: function (interpreter) {
                    var statements = this.statements;
                    for (var i = this.statements.length - 1; i >= 0; i--) {
                      interpreter.stmt_stack.push(this.statements[i]);
                    }
                    interpreter.interpretNext();
                  },
                  accept: function (visitor) {
                    visitor.visitProgram(this);
                  },
                };
              },
              peg$c204 = function (head, tail, ret_stmt) {
                var result = [head];
                for (var i = 0; i < tail.length; i++) {
                  result.push(tail[i][1]);
                }
                result.push(ret_stmt);
                return result;
              },
              peg$currPos = 0,
              peg$savedPos = 0,
              peg$posDetailsCache = [{ line: 1, column: 1 }],
              peg$maxFailPos = 0,
              peg$maxFailExpected = [],
              peg$silentFails = 0,
              peg$result;

            if ("startRule" in options) {
              if (!(options.startRule in peg$startRuleFunctions)) {
                throw new Error(
                  "Can't start parsing from rule \"" + options.startRule + '".'
                );
              }

              peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
            }

            function text() {
              return input.substring(peg$savedPos, peg$currPos);
            }

            function location() {
              return peg$computeLocation(peg$savedPos, peg$currPos);
            }

            function expected(description, location) {
              location =
                location !== void 0
                  ? location
                  : peg$computeLocation(peg$savedPos, peg$currPos);

              throw peg$buildStructuredError(
                [peg$otherExpectation(description)],
                input.substring(peg$savedPos, peg$currPos),
                location
              );
            }

            function error(message, location) {
              location =
                location !== void 0
                  ? location
                  : peg$computeLocation(peg$savedPos, peg$currPos);

              throw peg$buildSimpleError(message, location);
            }

            function peg$literalExpectation(text, ignoreCase) {
              return { type: "literal", text: text, ignoreCase: ignoreCase };
            }

            function peg$classExpectation(parts, inverted, ignoreCase) {
              return {
                type: "class",
                parts: parts,
                inverted: inverted,
                ignoreCase: ignoreCase,
              };
            }

            function peg$anyExpectation() {
              return { type: "any" };
            }

            function peg$endExpectation() {
              return { type: "end" };
            }

            function peg$otherExpectation(description) {
              return { type: "other", description: description };
            }

            function peg$computePosDetails(pos) {
              var details = peg$posDetailsCache[pos],
                p;

              if (details) {
                return details;
              } else {
                p = pos - 1;
                while (!peg$posDetailsCache[p]) {
                  p--;
                }

                details = peg$posDetailsCache[p];
                details = {
                  line: details.line,
                  column: details.column,
                };

                while (p < pos) {
                  if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                  } else {
                    details.column++;
                  }

                  p++;
                }

                peg$posDetailsCache[pos] = details;
                return details;
              }
            }

            function peg$computeLocation(startPos, endPos) {
              var startPosDetails = peg$computePosDetails(startPos),
                endPosDetails = peg$computePosDetails(endPos);

              return {
                start: {
                  offset: startPos,
                  line: startPosDetails.line,
                  column: startPosDetails.column,
                },
                end: {
                  offset: endPos,
                  line: endPosDetails.line,
                  column: endPosDetails.column,
                },
              };
            }

            function peg$fail(expected) {
              if (peg$currPos < peg$maxFailPos) {
                return;
              }

              if (peg$currPos > peg$maxFailPos) {
                peg$maxFailPos = peg$currPos;
                peg$maxFailExpected = [];
              }

              peg$maxFailExpected.push(expected);
            }

            function peg$buildSimpleError(message, location) {
              return new peg$SyntaxError(message, null, null, location);
            }

            function peg$buildStructuredError(expected, found, location) {
              return new peg$SyntaxError(
                peg$SyntaxError.buildMessage(expected, found),
                expected,
                found,
                location
              );
            }

            function peg$parsestart() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              s1 = peg$parse__();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseProgram();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parse__();
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c0(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseSourceCharacter() {
              var s0;

              if (input.length > peg$currPos) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c1);
                }
              }

              return s0;
            }

            function peg$parseWhiteSpace() {
              var s0, s1;

              peg$silentFails++;
              if (peg$c3.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
              if (s0 === peg$FAILED) {
                s0 = peg$parseZs();
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c2);
                }
              }

              return s0;
            }

            function peg$parseLineTerminator() {
              var s0;

              if (peg$c5.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }

              return s0;
            }

            function peg$parseLineTerminatorSequence() {
              var s0, s1;

              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 10) {
                s0 = peg$c8;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c9);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c10) {
                  s0 = peg$c10;
                  peg$currPos += 2;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 13) {
                    s0 = peg$c12;
                    peg$currPos++;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c13);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 8232) {
                      s0 = peg$c14;
                      peg$currPos++;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c15);
                      }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 8233) {
                        s0 = peg$c16;
                        peg$currPos++;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c17);
                        }
                      }
                    }
                  }
                }
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c7);
                }
              }

              return s0;
            }

            function peg$parseComment() {
              var s0, s1;

              peg$silentFails++;
              s0 = peg$parseMultiLineComment();
              if (s0 === peg$FAILED) {
                s0 = peg$parseSingleLineComment();
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c18);
                }
              }

              return s0;
            }

            function peg$parseMultiLineComment() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c19) {
                s1 = peg$c19;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c20);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                if (input.substr(peg$currPos, 2) === peg$c21) {
                  s5 = peg$c21;
                  peg$currPos += 2;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c22);
                  }
                }
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                  s4 = void 0;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseSourceCharacter();
                  if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$currPos;
                  peg$silentFails++;
                  if (input.substr(peg$currPos, 2) === peg$c21) {
                    s5 = peg$c21;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c22);
                    }
                  }
                  peg$silentFails--;
                  if (s5 === peg$FAILED) {
                    s4 = void 0;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseSourceCharacter();
                    if (s5 !== peg$FAILED) {
                      s4 = [s4, s5];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c21) {
                    s3 = peg$c21;
                    peg$currPos += 2;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c22);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseMultiLineCommentNoLineTerminator() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c19) {
                s1 = peg$c19;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c20);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                if (input.substr(peg$currPos, 2) === peg$c21) {
                  s5 = peg$c21;
                  peg$currPos += 2;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c22);
                  }
                }
                if (s5 === peg$FAILED) {
                  s5 = peg$parseLineTerminator();
                }
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                  s4 = void 0;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseSourceCharacter();
                  if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$currPos;
                  peg$silentFails++;
                  if (input.substr(peg$currPos, 2) === peg$c21) {
                    s5 = peg$c21;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c22);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    s5 = peg$parseLineTerminator();
                  }
                  peg$silentFails--;
                  if (s5 === peg$FAILED) {
                    s4 = void 0;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseSourceCharacter();
                    if (s5 !== peg$FAILED) {
                      s4 = [s4, s5];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c21) {
                    s3 = peg$c21;
                    peg$currPos += 2;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c22);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseSingleLineComment() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c23) {
                s1 = peg$c23;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c24);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                s5 = peg$parseLineTerminator();
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                  s4 = void 0;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseSourceCharacter();
                  if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$currPos;
                  peg$silentFails++;
                  s5 = peg$parseLineTerminator();
                  peg$silentFails--;
                  if (s5 === peg$FAILED) {
                    s4 = void 0;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseSourceCharacter();
                    if (s5 !== peg$FAILED) {
                      s4 = [s4, s5];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  s1 = [s1, s2];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseIdentifierStart() {
              var s0;

              if (input.charCodeAt(peg$currPos) === 36) {
                s0 = peg$c25;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c26);
                }
              }

              return s0;
            }

            function peg$parseZs() {
              var s0;

              if (peg$c27.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c28);
                }
              }

              return s0;
            }

            function peg$parseEOS() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              s1 = peg$parse_();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseLineTerminatorSequence();
                if (s2 !== peg$FAILED) {
                  s1 = [s1, s2];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  peg$silentFails++;
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s3 = peg$c29;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c30);
                    }
                  }
                  peg$silentFails--;
                  if (s3 !== peg$FAILED) {
                    peg$currPos = s2;
                    s2 = void 0;
                  } else {
                    s2 = peg$FAILED;
                  }
                  if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parse__();
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parseEOF();
                    if (s2 !== peg$FAILED) {
                      s1 = [s1, s2];
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }

              return s0;
            }

            function peg$parseEOF() {
              var s0, s1;

              s0 = peg$currPos;
              peg$silentFails++;
              if (input.length > peg$currPos) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c1);
                }
              }
              peg$silentFails--;
              if (s1 === peg$FAILED) {
                s0 = void 0;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parse_() {
              var s0, s1;

              s0 = [];
              s1 = peg$parseWhiteSpace();
              if (s1 === peg$FAILED) {
                s1 = peg$parseMultiLineCommentNoLineTerminator();
                if (s1 === peg$FAILED) {
                  s1 = peg$parseSingleLineComment();
                }
              }
              while (s1 !== peg$FAILED) {
                s0.push(s1);
                s1 = peg$parseWhiteSpace();
                if (s1 === peg$FAILED) {
                  s1 = peg$parseMultiLineCommentNoLineTerminator();
                  if (s1 === peg$FAILED) {
                    s1 = peg$parseSingleLineComment();
                  }
                }
              }

              return s0;
            }

            function peg$parse__() {
              var s0, s1;

              s0 = [];
              s1 = peg$parseWhiteSpace();
              if (s1 === peg$FAILED) {
                s1 = peg$parseLineTerminatorSequence();
                if (s1 === peg$FAILED) {
                  s1 = peg$parseComment();
                }
              }
              while (s1 !== peg$FAILED) {
                s0.push(s1);
                s1 = peg$parseWhiteSpace();
                if (s1 === peg$FAILED) {
                  s1 = peg$parseLineTerminatorSequence();
                  if (s1 === peg$FAILED) {
                    s1 = peg$parseComment();
                  }
                }
              }

              return s0;
            }

            function peg$parseStatement() {
              var s0, s1;

              peg$silentFails++;
              s0 = peg$parseAssignmentStatement();
              if (s0 === peg$FAILED) {
                s0 = peg$parseForInStatement();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseIfStatement();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseRequireStatement();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseStatementExpression();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseEmptyStatement();
                      }
                    }
                  }
                }
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c31);
                }
              }

              return s0;
            }

            function peg$parseAssignmentStatement() {
              var s0, s1, s2, s3, s4, s5, s6, s7, s8;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$parseVariableExpression();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseAccessor();
                  if (s3 === peg$FAILED) {
                    s3 = null;
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseAssignmentOperator();
                      if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                          s7 = peg$parseLogicalORExpression();
                          if (s7 !== peg$FAILED) {
                            s8 = peg$parseEOS();
                            if (s8 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c33(s1, s3, s5, s7);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c32);
                }
              }

              return s0;
            }

            function peg$parseAssignmentOperator() {
              var s0, s1, s2, s3;

              peg$silentFails++;
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 61) {
                s1 = peg$c35;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c36);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 61) {
                  s3 = peg$c35;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c36);
                  }
                }
                peg$silentFails--;
                if (s3 === peg$FAILED) {
                  s2 = void 0;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c37();
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c38) {
                  s0 = peg$c38;
                  peg$currPos += 2;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c39);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c40) {
                    s0 = peg$c40;
                    peg$currPos += 2;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c41);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c42) {
                      s0 = peg$c42;
                      peg$currPos += 2;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                      }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 2) === peg$c44) {
                        s0 = peg$c44;
                        peg$currPos += 2;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c45);
                        }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c46) {
                          s0 = peg$c46;
                          peg$currPos += 2;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c47);
                          }
                        }
                      }
                    }
                  }
                }
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c34);
                }
              }

              return s0;
            }

            function peg$parseVariableExpression() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              s1 = peg$parseIdentifierStart();
              if (s1 !== peg$FAILED) {
                s2 = [];
                if (peg$c48.test(input.charAt(peg$currPos))) {
                  s3 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c49);
                  }
                }
                if (s3 !== peg$FAILED) {
                  while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    if (peg$c48.test(input.charAt(peg$currPos))) {
                      s3 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c49);
                      }
                    }
                  }
                } else {
                  s2 = peg$FAILED;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c50(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseVariableExpressionList() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseVariableExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s5 = peg$c51;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c52);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseVariableExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s5 = peg$c51;
                      peg$currPos++;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c52);
                      }
                    }
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseVariableExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c53(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseStatementExpression() {
              var s0, s1;

              s0 = peg$currPos;
              s1 = peg$parseCallExpression();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c54(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseBlock() {
              var s0, s1, s2, s3, s4, s5;

              peg$silentFails++;
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 123) {
                s1 = peg$c56;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$currPos;
                  s4 = peg$parseStatementList();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parse__();
                    if (s5 !== peg$FAILED) {
                      s4 = [s4, s5];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                  if (s3 === peg$FAILED) {
                    s3 = null;
                  }
                  if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s4 = peg$c29;
                      peg$currPos++;
                    } else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c30);
                      }
                    }
                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c58(s3);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c55);
                }
              }

              return s0;
            }

            function peg$parseStatementList() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              s1 = peg$parseStatement();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseStatement();
                  if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseStatement();
                    if (s5 !== peg$FAILED) {
                      s4 = [s4, s5];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c59(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseEmptyStatement() {
              var s0, s1;

              peg$silentFails++;
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 59) {
                s1 = peg$c61;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c62);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c63();
              }
              s0 = s1;
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c60);
                }
              }

              return s0;
            }

            function peg$parseForInStatement() {
              var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$parseForToken();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c65;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c66);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseVariableExpression();
                      if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                          s7 = peg$parseInToken();
                          if (s7 !== peg$FAILED) {
                            s8 = peg$parse__();
                            if (s8 !== peg$FAILED) {
                              s9 = peg$parseExpression();
                              if (s9 === peg$FAILED) {
                                s9 = peg$parseVariableExpression();
                              }
                              if (s9 !== peg$FAILED) {
                                s10 = peg$parse__();
                                if (s10 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 41) {
                                    s11 = peg$c67;
                                    peg$currPos++;
                                  } else {
                                    s11 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c68);
                                    }
                                  }
                                  if (s11 !== peg$FAILED) {
                                    s12 = peg$parse__();
                                    if (s12 !== peg$FAILED) {
                                      s13 = peg$parseStatement();
                                      if (s13 === peg$FAILED) {
                                        s13 = peg$parseBlock();
                                      }
                                      if (s13 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c69(s5, s9, s13);
                                        s0 = s1;
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c64);
                }
              }

              return s0;
            }

            function peg$parseIfStatement() {
              var s0,
                s1,
                s2,
                s3,
                s4,
                s5,
                s6,
                s7,
                s8,
                s9,
                s10,
                s11,
                s12,
                s13,
                s14;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$parseIfToken();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c65;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c66);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseLogicalORExpression();
                      if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s7 = peg$c67;
                            peg$currPos++;
                          } else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c68);
                            }
                          }
                          if (s7 !== peg$FAILED) {
                            s8 = peg$parse__();
                            if (s8 !== peg$FAILED) {
                              s9 = peg$parseStatement();
                              if (s9 === peg$FAILED) {
                                s9 = peg$parseBlock();
                              }
                              if (s9 !== peg$FAILED) {
                                s10 = peg$parse__();
                                if (s10 !== peg$FAILED) {
                                  s11 = peg$currPos;
                                  s12 = peg$parseElseToken();
                                  if (s12 !== peg$FAILED) {
                                    s13 = peg$parse__();
                                    if (s13 !== peg$FAILED) {
                                      s14 = peg$parseStatement();
                                      if (s14 === peg$FAILED) {
                                        s14 = peg$parseBlock();
                                      }
                                      if (s14 !== peg$FAILED) {
                                        s12 = [s12, s13, s14];
                                        s11 = s12;
                                      } else {
                                        peg$currPos = s11;
                                        s11 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s11;
                                      s11 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s11;
                                    s11 = peg$FAILED;
                                  }
                                  if (s11 === peg$FAILED) {
                                    s11 = null;
                                  }
                                  if (s11 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c71(s5, s9, s11);
                                    s0 = s1;
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c70);
                }
              }

              return s0;
            }

            function peg$parseRequireStatement() {
              var s0, s1, s2, s3, s4;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$parseRequireToken();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseVariableExpressionList();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseEOS();
                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c73(s3);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c72);
                }
              }

              return s0;
            }

            function peg$parseReturnStatement() {
              var s0, s1, s2, s3, s4;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$parseReturnToken();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseVariableExpressionList();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseEOS();
                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c75(s3);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c74);
                }
              }

              return s0;
            }

            function peg$parseExpression() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$parseCallExpression();
              if (s0 === peg$FAILED) {
                s0 = peg$parseVariableExpression();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseLiteral();
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 40) {
                      s1 = peg$c65;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c66);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      s2 = peg$parse__();
                      if (s2 !== peg$FAILED) {
                        s3 = peg$parseLogicalORExpression();
                        if (s3 !== peg$FAILED) {
                          s4 = peg$parse__();
                          if (s4 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s5 = peg$c67;
                              peg$currPos++;
                            } else {
                              s5 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c68);
                              }
                            }
                            if (s5 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c76(s3);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  }
                }
              }

              return s0;
            }

            function peg$parseFunctionName() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = [];
              if (peg$c77.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c78);
                }
              }
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  if (peg$c77.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c78);
                    }
                  }
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c79(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseCallExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseFunctionName();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c65;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c66);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseExpressionList();
                      if (s5 === peg$FAILED) {
                        s5 = null;
                      }
                      if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s7 = peg$c67;
                            peg$currPos++;
                          } else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c68);
                            }
                          }
                          if (s7 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c80(s1, s5);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseExpressionList() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s5 = peg$c51;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c52);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s5 = peg$c51;
                      peg$currPos++;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c52);
                      }
                    }
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c81(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseAccessor() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 91) {
                s1 = peg$c82;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c83);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseLogicalORExpression();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s5 = peg$c84;
                        peg$currPos++;
                      } else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c85);
                        }
                      }
                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c86(s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseAccessorExpression() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              s1 = peg$parseExpression();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseAccessor();
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c87(s1, s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseUnaryExpression() {
              var s0, s1, s2, s3;

              s0 = peg$parseAccessorExpression();
              if (s0 === peg$FAILED) {
                s0 = peg$parseExpression();
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parseUnaryOperator();
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parse__();
                    if (s2 !== peg$FAILED) {
                      s3 = peg$parseExpression();
                      if (s3 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c88(s1, s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }

              return s0;
            }

            function peg$parseUnaryOperator() {
              var s0;

              if (input.charCodeAt(peg$currPos) === 43) {
                s0 = peg$c89;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c90);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                  s0 = peg$c91;
                  peg$currPos++;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c92);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 126) {
                    s0 = peg$c93;
                    peg$currPos++;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c94);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c95) {
                      s0 = peg$c95;
                      peg$currPos += 3;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c96);
                      }
                    }
                  }
                }
              }

              return s0;
            }

            function peg$parseMultiplicativeExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseUnaryExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseMultiplicativeOperator();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseUnaryExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseMultiplicativeOperator();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseUnaryExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c97(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseMultiplicativeOperator() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c98;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c99);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 47) {
                  s1 = peg$c100;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c101);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 37) {
                    s1 = peg$c102;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c103);
                    }
                  }
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 61) {
                  s3 = peg$c35;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c36);
                  }
                }
                peg$silentFails--;
                if (s3 === peg$FAILED) {
                  s2 = void 0;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c104(s1);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseAdditiveExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseMultiplicativeExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseAdditiveOperator();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseMultiplicativeExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseAdditiveOperator();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseMultiplicativeExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c105(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseAdditiveOperator() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 43) {
                s1 = peg$c89;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c90);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 43) {
                  s3 = peg$c89;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c90);
                  }
                }
                if (s3 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 61) {
                    s3 = peg$c35;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c36);
                    }
                  }
                }
                peg$silentFails--;
                if (s3 === peg$FAILED) {
                  s2 = void 0;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c106();
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 45) {
                  s1 = peg$c91;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c92);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  peg$silentFails++;
                  if (input.charCodeAt(peg$currPos) === 45) {
                    s3 = peg$c91;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c92);
                    }
                  }
                  if (s3 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 61) {
                      s3 = peg$c35;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c36);
                      }
                    }
                  }
                  peg$silentFails--;
                  if (s3 === peg$FAILED) {
                    s2 = void 0;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c107();
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }

              return s0;
            }

            function peg$parseRelationalExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseAdditiveExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseRelationalOperator();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseAdditiveExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseRelationalOperator();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseAdditiveExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c108(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseRelationalOperator() {
              var s0;

              if (input.substr(peg$currPos, 2) === peg$c109) {
                s0 = peg$c109;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c110);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c111) {
                  s0 = peg$c111;
                  peg$currPos += 2;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c112);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 60) {
                    s0 = peg$c113;
                    peg$currPos++;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c114);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 62) {
                      s0 = peg$c115;
                      peg$currPos++;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c116);
                      }
                    }
                  }
                }
              }

              return s0;
            }

            function peg$parseEqualsExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseRelationalExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseEqualsToken();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseRelationalExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseEqualsToken();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseRelationalExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c117(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseEqualsToken() {
              var s0, s1;

              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c118) {
                s1 = peg$c118;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c119);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c120();
              }
              s0 = s1;

              return s0;
            }

            function peg$parseLogicalANDExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseEqualsExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseAndToken();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseEqualsExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseAndToken();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseEqualsExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c121(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseLogicalORExpression() {
              var s0, s1, s2, s3, s4, s5, s6, s7;

              s0 = peg$currPos;
              s1 = peg$parseLogicalANDExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseOrToken();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseLogicalANDExpression();
                      if (s7 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseOrToken();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parseLogicalANDExpression();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c122(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseLiteral() {
              var s0;

              s0 = peg$parseNullLiteral();
              if (s0 === peg$FAILED) {
                s0 = peg$parseBooleanLiteral();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseNumericLiteral();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseStringLiteral();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseRegularExpressionLiteral();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseArrayLiteral();
                      }
                    }
                  }
                }
              }

              return s0;
            }

            function peg$parseArrayLiteral() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 91) {
                s1 = peg$c82;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c83);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseExpressionList();
                  if (s3 === peg$FAILED) {
                    s3 = null;
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s5 = peg$c84;
                        peg$currPos++;
                      } else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c85);
                        }
                      }
                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c123(s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseRegularExpressionLiteral() {
              var s0, s1, s2, s3;

              peg$silentFails++;
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 47) {
                s1 = peg$c100;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c101);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseRegularExpressionLiteralCharacters();
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 47) {
                    s3 = peg$c100;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c101);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c125(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c124);
                }
              }

              return s0;
            }

            function peg$parseNullLiteral() {
              var s0, s1;

              s0 = peg$currPos;
              s1 = peg$parseNullToken();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c126();
              }
              s0 = s1;

              return s0;
            }

            function peg$parseBooleanLiteral() {
              var s0, s1;

              s0 = peg$currPos;
              s1 = peg$parseTrueToken();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c127();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseFalseToken();
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c128();
                }
                s0 = s1;
              }

              return s0;
            }

            function peg$parseNumericLiteral() {
              var s0, s1, s2, s3;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$parseHexIntegerLiteral();
              if (s1 === peg$FAILED) {
                s1 = peg$parseDecimalLiteral();
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                peg$silentFails++;
                s3 = peg$parseIdentifierStart();
                peg$silentFails--;
                if (s3 === peg$FAILED) {
                  s2 = void 0;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c130(s1);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c129);
                }
              }

              return s0;
            }

            function peg$parseDecimalLiteral() {
              var s0, s1, s2, s3, s4;

              s0 = peg$currPos;
              s1 = peg$parseDecimalIntegerLiteral();
              if (s1 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                  s2 = peg$c131;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c132);
                  }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseDecimalDigits();
                  if (s3 === peg$FAILED) {
                    s3 = null;
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseExponentPart();
                    if (s4 === peg$FAILED) {
                      s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c133(s1, s3, s4);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 46) {
                  s1 = peg$c131;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c132);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseDecimalDigits();
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parseExponentPart();
                    if (s3 === peg$FAILED) {
                      s3 = null;
                    }
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c134(s2, s3);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parseDecimalIntegerLiteral();
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parseExponentPart();
                    if (s2 === peg$FAILED) {
                      s2 = null;
                    }
                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c135(s1, s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }

              return s0;
            }

            function peg$parseDecimalIntegerLiteral() {
              var s0, s1, s2;

              if (input.charCodeAt(peg$currPos) === 48) {
                s0 = peg$c136;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c137);
                }
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseNonZeroDigit();
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseDecimalDigits();
                  if (s2 === peg$FAILED) {
                    s2 = null;
                  }
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c138(s1, s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }

              return s0;
            }

            function peg$parseDecimalDigits() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parseDecimalDigit();
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parseDecimalDigit();
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c139(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseDecimalDigit() {
              var s0;

              if (peg$c140.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c141);
                }
              }

              return s0;
            }

            function peg$parseNonZeroDigit() {
              var s0;

              if (peg$c142.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c143);
                }
              }

              return s0;
            }

            function peg$parseExponentPart() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = peg$parseExponentIndicator();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseSignedInteger();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c144(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseExponentIndicator() {
              var s0;

              if (peg$c145.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c146);
                }
              }

              return s0;
            }

            function peg$parseSignedInteger() {
              var s0, s1, s2;

              s0 = peg$currPos;
              if (peg$c147.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c148);
                }
              }
              if (s1 === peg$FAILED) {
                s1 = null;
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseDecimalDigits();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c149(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseHexIntegerLiteral() {
              var s0, s1, s2, s3, s4;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 48) {
                s1 = peg$c136;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c137);
                }
              }
              if (s1 !== peg$FAILED) {
                if (peg$c150.test(input.charAt(peg$currPos))) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c151);
                  }
                }
                if (s2 !== peg$FAILED) {
                  s3 = [];
                  s4 = peg$parseHexDigit();
                  if (s4 !== peg$FAILED) {
                    while (s4 !== peg$FAILED) {
                      s3.push(s4);
                      s4 = peg$parseHexDigit();
                    }
                  } else {
                    s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c152(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseHexDigit() {
              var s0;

              if (peg$c153.test(input.charAt(peg$currPos))) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c154);
                }
              }

              return s0;
            }

            function peg$parseStringLiteral() {
              var s0, s1, s2, s3, s4;

              peg$silentFails++;
              s0 = peg$currPos;
              s1 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 34) {
                s2 = peg$c156;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c157);
                }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parseDoubleStringCharacters();
                if (s3 === peg$FAILED) {
                  s3 = null;
                }
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 34) {
                    s4 = peg$c156;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c157);
                    }
                  }
                  if (s4 !== peg$FAILED) {
                    s2 = [s2, s3, s4];
                    s1 = s2;
                  } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
              if (s1 === peg$FAILED) {
                s1 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 39) {
                  s2 = peg$c158;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c159);
                  }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseSingleStringCharacters();
                  if (s3 === peg$FAILED) {
                    s3 = null;
                  }
                  if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 39) {
                      s4 = peg$c158;
                      peg$currPos++;
                    } else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c159);
                      }
                    }
                    if (s4 !== peg$FAILED) {
                      s2 = [s2, s3, s4];
                      s1 = s2;
                    } else {
                      peg$currPos = s1;
                      s1 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c160(s1);
              }
              s0 = s1;
              peg$silentFails--;
              if (s0 === peg$FAILED) {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c155);
                }
              }

              return s0;
            }

            function peg$parseDoubleStringCharacters() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parseDoubleStringCharacter();
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parseDoubleStringCharacter();
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c161(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseSingleStringCharacters() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parseSingleStringCharacter();
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parseSingleStringCharacter();
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c161(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseRegularExpressionLiteralCharacters() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parseRegularExpressionLiteralCharacter();
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parseRegularExpressionLiteralCharacter();
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c161(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseDoubleStringCharacter() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 34) {
                s2 = peg$c156;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c157);
                }
              }
              if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 92) {
                  s2 = peg$c162;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c163);
                  }
                }
                if (s2 === peg$FAILED) {
                  s2 = peg$parseLineTerminator();
                }
              }
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = void 0;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseSourceCharacter();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c164(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 92) {
                  s1 = peg$c162;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c163);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseEscapeSequence();
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c165(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$parseLineContinuation();
                }
              }

              return s0;
            }

            function peg$parseSingleStringCharacter() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 39) {
                s2 = peg$c158;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c159);
                }
              }
              if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 92) {
                  s2 = peg$c162;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c163);
                  }
                }
                if (s2 === peg$FAILED) {
                  s2 = peg$parseLineTerminator();
                }
              }
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = void 0;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseSourceCharacter();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c164(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 92) {
                  s1 = peg$c162;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c163);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseEscapeSequence();
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c165(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$parseLineContinuation();
                }
              }

              return s0;
            }

            function peg$parseRegularExpressionLiteralCharacter() {
              var s0, s1, s2;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 92) {
                s1 = peg$c162;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c163);
                }
              }
              if (s1 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 47) {
                  s2 = peg$c100;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c101);
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c166(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 47) {
                  s2 = peg$c100;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c101);
                  }
                }
                if (s2 === peg$FAILED) {
                  s2 = peg$parseLineTerminator();
                }
                peg$silentFails--;
                if (s2 === peg$FAILED) {
                  s1 = void 0;
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseSourceCharacter();
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c164(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$parseLineContinuation();
                }
              }

              return s0;
            }

            function peg$parseLineContinuation() {
              var s0, s1, s2;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 92) {
                s1 = peg$c162;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c163);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseLineTerminatorSequence();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c167(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseEscapeSequence() {
              var s0, s1, s2, s3;

              s0 = peg$parseCharacterEscapeSequence();
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 48) {
                  s1 = peg$c136;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c137);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  peg$silentFails++;
                  s3 = peg$parseDecimalDigit();
                  peg$silentFails--;
                  if (s3 === peg$FAILED) {
                    s2 = void 0;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c168();
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$parseHexEscapeSequence();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseUnicodeEscapeSequence();
                  }
                }
              }

              return s0;
            }

            function peg$parseCharacterEscapeSequence() {
              var s0;

              s0 = peg$parseSingleEscapeCharacter();
              if (s0 === peg$FAILED) {
                s0 = peg$parseNonEscapeCharacter();
              }

              return s0;
            }

            function peg$parseSingleEscapeCharacter() {
              var s0, s1;

              s0 = peg$currPos;
              if (peg$c169.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c170);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c171(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseNonEscapeCharacter() {
              var s0, s1, s2;

              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              s2 = peg$parseEscapeCharacter();
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = void 0;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
              if (s1 === peg$FAILED) {
                s1 = peg$parseLineTerminator();
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseSourceCharacter();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c172(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseEscapeCharacter() {
              var s0;

              s0 = peg$parseSingleEscapeCharacter();
              if (s0 === peg$FAILED) {
                s0 = peg$parseDecimalDigit();
                if (s0 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 120) {
                    s0 = peg$c173;
                    peg$currPos++;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c174);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 117) {
                      s0 = peg$c175;
                      peg$currPos++;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c176);
                      }
                    }
                  }
                }
              }

              return s0;
            }

            function peg$parseHexEscapeSequence() {
              var s0, s1, s2, s3;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 120) {
                s1 = peg$c173;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c174);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseHexDigit();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseHexDigit();
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c177(s2, s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseUnicodeEscapeSequence() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 117) {
                s1 = peg$c175;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c176);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseHexDigit();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseHexDigit();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseHexDigit();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseHexDigit();
                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c178(s2, s3, s4, s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            function peg$parseAndToken() {
              var s0;

              if (input.substr(peg$currPos, 3) === peg$c179) {
                s0 = peg$c179;
                peg$currPos += 3;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c180);
                }
              }

              return s0;
            }

            function peg$parseOrToken() {
              var s0;

              if (input.substr(peg$currPos, 2) === peg$c181) {
                s0 = peg$c181;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c182);
                }
              }

              return s0;
            }

            function peg$parseNotToken() {
              var s0;

              if (input.substr(peg$currPos, 3) === peg$c95) {
                s0 = peg$c95;
                peg$currPos += 3;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c96);
                }
              }

              return s0;
            }

            function peg$parseBreakToken() {
              var s0;

              if (input.substr(peg$currPos, 5) === peg$c183) {
                s0 = peg$c183;
                peg$currPos += 5;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c184);
                }
              }

              return s0;
            }

            function peg$parseElseToken() {
              var s0;

              if (input.substr(peg$currPos, 4) === peg$c185) {
                s0 = peg$c185;
                peg$currPos += 4;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c186);
                }
              }

              return s0;
            }

            function peg$parseFalseToken() {
              var s0;

              if (input.substr(peg$currPos, 5) === peg$c187) {
                s0 = peg$c187;
                peg$currPos += 5;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c188);
                }
              }

              return s0;
            }

            function peg$parseForToken() {
              var s0;

              if (input.substr(peg$currPos, 3) === peg$c189) {
                s0 = peg$c189;
                peg$currPos += 3;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c190);
                }
              }

              return s0;
            }

            function peg$parseInToken() {
              var s0;

              if (input.substr(peg$currPos, 2) === peg$c191) {
                s0 = peg$c191;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c192);
                }
              }

              return s0;
            }

            function peg$parseIfToken() {
              var s0;

              if (input.substr(peg$currPos, 2) === peg$c193) {
                s0 = peg$c193;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c194);
                }
              }

              return s0;
            }

            function peg$parseNullToken() {
              var s0;

              if (input.substr(peg$currPos, 4) === peg$c195) {
                s0 = peg$c195;
                peg$currPos += 4;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c196);
                }
              }

              return s0;
            }

            function peg$parseReturnToken() {
              var s0;

              if (input.substr(peg$currPos, 6) === peg$c197) {
                s0 = peg$c197;
                peg$currPos += 6;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c198);
                }
              }

              return s0;
            }

            function peg$parseTrueToken() {
              var s0;

              if (input.substr(peg$currPos, 4) === peg$c199) {
                s0 = peg$c199;
                peg$currPos += 4;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c200);
                }
              }

              return s0;
            }

            function peg$parseRequireToken() {
              var s0;

              if (input.substr(peg$currPos, 7) === peg$c201) {
                s0 = peg$c201;
                peg$currPos += 7;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c202);
                }
              }

              return s0;
            }

            function peg$parseProgram() {
              var s0, s1;

              s0 = peg$currPos;
              s1 = peg$parseStatements();
              if (s1 === peg$FAILED) {
                s1 = null;
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c203(s1);
              }
              s0 = s1;

              return s0;
            }

            function peg$parseStatements() {
              var s0, s1, s2, s3, s4, s5;

              s0 = peg$currPos;
              s1 = peg$parseStatement();
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseStatement();
                  if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  s4 = peg$parse__();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseStatement();
                    if (s5 !== peg$FAILED) {
                      s4 = [s4, s5];
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parse__();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseReturnStatement();
                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s1, s2, s4);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }

              return s0;
            }

            this.VERSION = "0.2.2";

            function binaryOperator(left, operator, right) {
              switch (operator) {
                case "+":
                  return left + right;
                case "-":
                  return left - right;
                case "*":
                  return left * right;
                case "/":
                  return left / right;
                case "%":
                  return left % right;
                case "<":
                  return left < right;
                case ">":
                  return left > right;
                case "<=":
                  return left <= right;
                case ">=":
                  return left >= right;
                case "==":
                  return left == right;
                case "!=":
                  return left != right;
                default:
                  return undefined;
              }
            }

            function unaryOperator(operator, val) {
              switch (operator) {
                case "+":
                  return +val;
                case "-":
                  return -val;
                case "~":
                  return ~val;
                case "not":
                  return !val;
                default:
                  return undefined;
              }
            }

            /* Compares a and b and returns True if they are equal and False otherwise.
             *
             */
            function compare(a, b) {
              if (a instanceof Array && b instanceof Array) {
                if (a.length !== b.length) {
                  return false;
                } else {
                  for (var i = 0; i < a.length; i++) {
                    if (a[i] != b[i]) {
                      return false;
                    }
                  }
                  return true;
                }
              } else {
                return a == b;
              }
            }

            function absolute_index(index, value) {
              if (value === undefined || index === undefined) {
                return undefined;
              }
              index = parseInt(index);
              if (isNaN(index)) {
                return undefined;
              } else {
                if (index < 0 && value.hasOwnProperty("length")) {
                  index = value.length + index;
                  if (index < 0) index = 0;
                }
                return index;
              }
            }

            peg$result = peg$startRuleFunction();

            if (peg$result !== peg$FAILED && peg$currPos === input.length) {
              return peg$result;
            } else {
              if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                peg$fail(peg$endExpectation());
              }

              throw peg$buildStructuredError(
                peg$maxFailExpected,
                peg$maxFailPos < input.length
                  ? input.charAt(peg$maxFailPos)
                  : null,
                peg$maxFailPos < input.length
                  ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
                  : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
              );
            }
          }

          return {
            SyntaxError: peg$SyntaxError,
            parse: peg$parse,
          };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
          (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

        /***/
      },

      /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId];
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/ exports: {},
        /******/
      });
      /******/
      /******/ // Execute the module function
      /******/ __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
      );
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            });
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop);
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module",
          });
          /******/
        }
        /******/ Object.defineProperty(exports, "__esModule", { value: true });
        /******/
      };
      /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    (() => {
      "use strict";
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // EXPORTS
      __webpack_require__.d(__webpack_exports__, {
        Interpreter: () => /* reexport */ interpreter,
        Parser: () => /* reexport */ cslparser,
      }); // CONCATENATED MODULE: ./js/request.js

      /*
       * Copyright 2011-2022 Ciuvo GmbH. All rights reserved.
       * This file is subject to the terms and conditions defined in
       * file 'LICENSE.txt', which is part of this source code package.
       */

      // Important: import list needs to be empty, otherwise debug will be added automatically.
      //define("request", [], function() {

      var IE_SEND_TIMEOUT = 200,
        TYPE_XDR = "XDR",
        TYPE_XHR = "XHR";

      /**
       * Class to abstract the various available implementations of XMLHttpRequest
       * published by browser vendors - we do assume that there are currently
       * only two major implementations available for cross domain requests:
       *
       *   XMLHttpRequest
       *   XDomainRequest
       *
       * @constructor
       */
      class AjaxRequest {
        constructor(method, url, params) {
          this.method = method;
          this.url = url;
          this.requestTimer = undefined;
          this.type = TYPE_XHR;
          this.rq = new window.XMLHttpRequest();

          if ("withCredentials" in this.rq) {
            // pass
          } else if (typeof window.XDomainRequest !== "undefined") {
            this.type = TYPE_XDR;
            this.rq = new window.XDomainRequest();
            this.rq.readyState = 1;
          }

          if (typeof params === "object") {
            var seperator = this.url.indexOf("?") === -1 ? "?" : "&";
            for (var key in params) {
              if (typeof params[key] !== "undefined") {
                this.url +=
                  seperator + key + "=" + encodeURIComponent(params[key]);
                seperator = "&";
              }
            }
          }

          this.rq.open(method, this.url, true);

          if (this.type === TYPE_XDR) {
            // IE XDR abort fix: Initialize event handlers with noops
            // @see http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e/
            this.rq.onprogress = function () {};
            this.rq.ontimeout = function () {};
            this.rq.onerror = function () {};
            this.rq.onload = function () {};
            this.rq.timeout = 0;
          }
        }

        wrapCallback(callback) {
          var self = this;
          return function (result) {
            self.clearTimeout();
            callback(self.rq, result);
          };
        }

        /**
         * Sets the method to be called when the readystate changes.
         * @param callback
         */
        onReadyStateChange(callback) {
          if (this.type === TYPE_XDR) {
            this.rq.readyState = 3;
            this.rq.status = 200;
            this.rq.onload = this.wrapCallback(callback);
          } else {
            this.rq.onreadystatechange = this.wrapCallback(callback);
          }
        }

        /**
         * Sets the method to be called when the request has loaded.
         * @param callback
         */
        onLoad(callback) {
          if (this.type === TYPE_XDR) {
            this.rq.readyState = 3;
            this.rq.status = 200;
          }
          this.rq.onload = this.wrapCallback(callback);
        }

        /**
         * Sets the method to be called when the request has loaded.
         * @param callback
         */
        onError(callback) {
          if (this.type === TYPE_XDR) {
            this.rq.readyState = 3;
            this.rq.status = 500;
          }
          this.rq.onerror = this.wrapCallback(callback);
        }

        /**
         * Sets a header value for the request object.
         * @param header
         * @param value
         */
        setHeader(header, value) {
          if ("setRequestHeader" in this.rq) {
            this.rq.setRequestHeader(header, value);
          }
        }

        setTimeout(timeout, callback) {
          this.timeout = timeout;
          this.timeoutCallback = callback;
        }

        abort() {
          if (this.rq) {
            this.rq.abort();
          }
        }

        /**
         * Sets up timeouts, this may be overridden i.e. if window is undefined.
         * NOTE: Do not confuse with setTimeout().
         */
        setupTimeoutTimer(timeout) {
          // Check if a timeout has been configured and setup hooks
          if (typeof timeout === "number") {
            var self = this;
            window.setTimeout(function () {
              self.rq.abort();
              if (typeof self.timeoutCallback === "function") {
                self.timeoutCallback();
              }
            }, timeout);
          }
        }

        clearTimeout() {
          window.clearTimeout(this.requestTimer);
          this.requestTimer = undefined;
        }

        /**
         * Submits the request.
         * @param data
         */
        send(data) {
          var self = this;
          //>>excludeStart("appBuildExclude", pragmas.appBuildExclude);
          console.log("--> " + this.method + " " + this.url);
          if (data) {
            console.log(data);
          }
          //>>excludeEnd("appBuildExclude");

          this.setupTimeoutTimer(this.timeout);

          // IE needs some time to get started...
          // TODO: verify that this is still required for IE.
          if (this.type === TYPE_XDR) {
            // Do not unwrap .send method.
            // Required to run on a separate thread.
            window.setTimeout(function () {
              self.rq.send(data);
            }, IE_SEND_TIMEOUT);
          } else {
            this.rq.send(data);
          }
        }
      }

      /* harmony default export */ const request = {
        AjaxRequest: AjaxRequest,
      };

      // EXTERNAL MODULE: ./js/cslparser.cjs
      var cslparser = __webpack_require__(809);
      // EXTERNAL MODULE: ./node_modules/sizzle/dist/sizzle.js
      var sizzle = __webpack_require__(271); // CONCATENATED MODULE: ./js/interpreter.js
      /*
       * Copyright 2011-2023 Ciuvo GmbH. All rights reserved.
       * This file is subject to the terms and conditions defined in
       * file 'LICENSE.txt', which is part of this source code package.
       */

      /**
       * A simple implementation to check if two objects a and b are
       * equal (object values match). Ignores properties that start with
       * an underscore.
       */
      function objectEquals(a, b) {
        var p;

        // check if either is null
        if (a === null || b === null) {
          return a === b;
        }

        // check if either is undefined
        if (a === undefined || b === undefined) {
          return a === b;
        }

        // Find attributes that are in b but not in a
        for (p in b) {
          if (p[0] === "_") {
            continue;
          }
          if (!a.hasOwnProperty(p)) {
            return false;
          }
        }

        // Compare all attributes that are in both, a and b
        for (p in a) {
          if (!a.hasOwnProperty(p)) {
            continue;
          }

          // Ignore private properties
          if (p[0] === "_") {
            continue;
          }

          // Find attributes that are in a but not in b
          if (!b.hasOwnProperty(p)) {
            return false;
          }

          if (a[p]) {
            switch (typeof a[p]) {
              case "object":
                if (!objectEquals(a[p], b[p])) {
                  return false;
                }
                break;
              default:
                if (a[p] !== b[p]) {
                  return false;
                }
            }
          } else if (b[p]) {
            return false;
          }
        }

        return true;
      }

      function Timer(callback, delay) {
        var timerId,
          start,
          remaining = delay;

        this.pause = function () {
          window.clearTimeout(timerId);
          remaining -= new Date() - start;
        };

        this.resume = function () {
          start = new Date();
          timerId = window.setTimeout(function () {
            callback();
          }, remaining);
        };

        this.cancel = function () {
          window.clearTimeout(timerId);
        };

        this.resume();
      }

      /* ------------------------
* Custom exception classes
* ------------------------

/**
* Type of argument not valid.
*/
      var TypeError = function (message) {
        this.message = message;
        this.name = "TypeError";
      };

      /**
       * Value of argument not valid.
       */
      var ValueError = function (message) {
        this.message = message;
        this.name = "ValueError";
      };

      /**
       * Required variables not found.
       */
      var RequireError = function (message) {
        this.message = message;
        this.name = "RequireError";
      };

      RequireError.prototype.getMessage = function () {
        return this.name + ": " + this.message;
      };

      /**
       * Custom error for interpreter internals
       */
      var InterpreterError = function (message) {
        this.message = message;
        this.name = "InterpreterError";
      };

      /**
       * Custom exception for control flow.
       * Used to implement async execution.
       */
      var InterruptException = function () {
        this.name = "InterruptException";
      };

      /**
       * The Interpreter class encapsulates the state of the CSL interpreter
       * (aka the Context), most of the interpreter logic is in the abstract
       * syntax tree (via Composite pattern).
       *
       * This class holds the following attributes:
       *
       *   * doc
       *   * return_callback
       *   * error_callback
       *
       * Furthermore, during interpretation it holds:
       *
       *   * variables
       *   * temp
       *   * stmt_stack
       */
      var Interpreter = function (
        window,
        return_callback,
        error_callback,
        event_callback
      ) {
        this.doc = window.document;
        this.window = window;
        this.ret = {};
        this.id = Interpreter.id++;
        this.first_run = true;

        var self = this;
        this.return_callback = function (result) {
          return_callback(result, self.getCurrentContext());
        };
        this.error_callback = function (error) {
          var context = self.getCurrentContext();
          if (context._modified) {
            //>>excludeStart("appBuildExclude", pragmas.appBuildExclude);
            console.log("Context has been modified, running error_callback.");
            //>>excludeEnd("appBuildExclude");
            error_callback(error, context);
          }
        };
        this.event_callback = function (event) {
          //>>excludeStart("appBuildExclude", pragmas.appBuildExclude);
          console.log("Calling event callback.");
          //>>excludeEnd("appBuildExclude");
          event_callback(event);
        };
      };

      Interpreter.id = 0;

      /**
       * Register custom errors at interpreter so that we can
       * throw them in the AST (csl.pegjs).
       */
      Interpreter.prototype.InterpreterError = InterpreterError;
      Interpreter.prototype.RequireError = RequireError;

      Interpreter.prototype.interpretNext = function () {
        var stmt_stack = this.stmt_stack;
        if (stmt_stack.length > 0) {
          var stmt = stmt_stack.pop();
          try {
            stmt.interpret(this);
            this.interpretNext();
          } catch (e) {
            if (e instanceof InterruptException) {
              // we have to re-run the interrupted stmt (might be from expr)
              stmt_stack.push(stmt);
            } else {
              this.error_callback.call(this, e);
            }
          }
        }
      };

      Interpreter.prototype.getCurrentContext = function () {
        var context = {
          _refresh: this.refresh_timer !== undefined,
        };
        for (var name in this.variables) {
          if (this.variables.hasOwnProperty(name)) {
            var varname = name.substring(1);
            context[varname] = this.variables[name];
          }
        }
        if (this.previousContext === undefined) {
          context._modified = true;
        } else {
          context._modified = !objectEquals(this.previousContext, context);
        }
        return context;
      };

      /*
       * Interpret the given abstract syntax tree.
       *
       * Makes inversion of control.
       */
      Interpreter.prototype.interpret = function (astOrCode) {
        // if first call to interpret - make sure that _modified is true.
        if (this.first_run) {
          this.previousContext = undefined;
          this.first_run = false;
        } else {
          this.previousContext = this.getCurrentContext();
        }

        if (typeof astOrCode === "string") {
          try {
            this.ast = cslparser.parse(astOrCode);
          } catch (error) {
            this.error_callback(error);
            return undefined;
          }
        } else {
          this.ast = astOrCode;
        }

        this.variables = {};
        this.temp = {};
        this.stmt_stack = [];
        this.refresh_timer = undefined;
        this.wait_timer = undefined;
        this.ast.interpret(this);
      };

      Interpreter.prototype.pause_timers = function () {
        if (this.refresh_timer) {
          this.refresh_timer.pause();
        }
        if (this.wait_timer) {
          this.wait_timer.pause();
        }
      };

      Interpreter.prototype.resume_timers = function () {
        if (this.refresh_timer) {
          this.refresh_timer.resume();
        }
        if (this.wait_timer) {
          this.wait_timer.resume();
        }
      };

      /**
       * Closes the interpreter; cancels all timers.
       */
      Interpreter.prototype.close = function () {
        if (this.refresh_timer) {
          this.refresh_timer.cancel();
        }
        if (this.wait_timer) {
          this.wait_timer.cancel();
        }
      };

      Interpreter.prototype._getNodeList = function (selector) {
        if (typeof selector !== "string") {
          throw new InterpreterError("First argument needs to be a selector.");
        }
        try {
          return sizzle(selector, this.doc);
        } catch (e) {
          throw new InterpreterError("CSS Selector - " + e);
        }
      };

      /*
       * Function table mapping function names to JS code.
       *
       * Functions with variable length arguments (e.g. `replace`)
       * use the builtin `arguments` variable to retrieve the variable
       * length list of args.
       */
      Interpreter.prototype.function_table = {
        call: function () {
          var args = Array.prototype.slice.call(arguments);
          if (args.length < 2) {
            throw new InterpreterError("Wrong number of arguments.");
          }

          var selector = args[0];
          var method = args[1];
          var callArguments = args.slice(2);
          var nodeList = this._getNodeList(selector);
          for (var i = 0; i < nodeList.length; i++) {
            var node = sizzle(nodeList[i]);
            if (node[method]) {
              node[method].apply(node, callArguments);
            }
          }
        },
        event: function () {
          var args = Array.prototype.slice.call(arguments);
          this.event_callback(args);
        },
        json: function () {
          var args = Array.prototype.slice.call(arguments);
          if (args.length % 2 !== 0) {
            throw new InterpreterError("Need even number of arguments.");
          }
          for (
            var i = 0, payload = {};
            i < args.length;
            payload[args[i]] = args[i + 1], i += 2
          ) {}
          return JSON.stringify(payload);
        },
        setAttribute: function () {
          var args = Array.prototype.slice.call(arguments);
          if (args.length < 3) {
            throw new InterpreterError("Wrong number of arguments.");
          }

          var selector = args[0];
          var attribute = args[1];
          var value = args[2];
          var nodeList = this._getNodeList(selector);
          for (var i = 0; i < nodeList.length; i++) {
            nodeList[i][attribute] = value;
          }
        },

        const: function (value) {
          return value;
        },

        sizzle: function () {
          var args = Array.prototype.slice.call(arguments);
          var selector = args[0];
          var attribute;

          if (args.length > 1) {
            attribute = args[1];
          }

          var nodeList = this._getNodeList(selector);
          if (nodeList.length === 0) {
            return "";
          } else {
            var res = [];
            for (var i = 0; i < nodeList.length; i++) {
              var elem = nodeList[i];
              var value = "";
              if (attribute) {
                if (attribute === "textContent") {
                  // cross-browser; textContent first because of efficiency in
                  // Chrome
                  value = elem.textContent || elem.innerText;
                } else {
                  value = elem.getAttribute(attribute);
                }
              } else {
                value = elem.innerHTML;
              }
              res.push(value);
            }
            if (res.length === 1) {
              return res[0];
            } else {
              return res;
            }
          }
        },

        debug: function () {
          //>>excludeStart("appBuildExclude", pragmas.appBuildExclude);
          var args = Array.prototype.slice.call(arguments);
          console.log(args);
          //>>excludeEnd("appBuildExclude");
          return undefined;
        },

        httpGet: function (url) {
          var self = this,
            temp = this.temp;
          var expr_id = "__httpGet__" + url;
          if (expr_id in temp) {
            var value = temp[expr_id];
            delete temp[expr_id];
            return value;
          } else {
            var req = new request.AjaxRequest("GET", url);
            req.onReadyStateChange(function (rq) {
              var value = null;
              if (rq.readyState === 4) {
                if (rq.status === 200) {
                  value = rq.responseText;
                }
                temp[expr_id] = value;
                self.interpretNext();
              }
            });
            req.onError(function () {
              temp[expr_id] = null;
              self.interpretNext();
            });
            req.send(null);
            throw new InterruptException();
          }
        },

        join: function (values, joiner) {
          return values.join(joiner);
        },

        len: function (value) {
          if (value.hasOwnProperty("length")) {
            return value.length;
          } else {
            return undefined;
          }
        },

        re: function () {
          var args = Array.prototype.slice.call(arguments);
          var mycontent = "";
          var regexp = args[0];
          var flags = "";
          if (args.length >= 2) {
            flags = args[1];
          }
          if (args.length === 3) {
            mycontent = args[2];
          } else {
            mycontent = this.doc.documentElement.innerHTML;
          }
          if (args.length > 3) {
            throw new ValueError(
              "'re' expression expects 3 arguments at most."
            );
          }

          // cannot match empty content
          if (!mycontent) {
            return "";
          }
          if (typeof mycontent !== "string") {
            try {
              mycontent = mycontent.toString();
            } catch (e) {
              throw new ValueError("'re' block argument has no 'toString'.");
            }
          }

          // We're "flattening" the content so that we don't need to use a modifier.
          mycontent = mycontent.replace(/(\r|\n)/gi, "");

          // if regexp is written as RegularExpressionLiteral extract source string.
          if (regexp instanceof RegExp) {
            regexp = regexp.source;
          }

          // make all quotation marks optional (i.e. insert ? afterwards).
          regexp = regexp.replace(/"([^?])/gi, '"?$1');

          // make case independent flag 'i' always on.
          if (flags.search("i") === -1) {
            flags += "i";
          }

          // construct RegExp object
          regexp = new RegExp(regexp, flags);
          var m = mycontent.match(regexp);
          if (!m) {
            return "";
          } else {
            if (flags.search("g") !== -1) {
              return m;
            } else {
              // invariant: m.length >= 1
              if (m.length === 1) {
                return true;
              } else {
                return m[1];
              }
            }
          }
        },

        refresh: function (interval) {
          var self = this;
          if (interval === undefined) {
            throw new ValueError("refresh interval argument required.");
          }
          interval = parseInt(interval, 10);
          if (interval < 1000) {
            throw new ValueError("interval must be at least 1000.");
          }

          if (this.refresh_timer) {
            this.refresh_timer.cancel();
          }

          this.refresh_timer = new Timer(function () {
            // lets call interpret again and again and again...
            self.interpret(self.ast);
          }, interval);
        },

        replace: function () {
          var args = Array.prototype.slice.call(arguments);
          var value = args.shift();

          if (typeof value !== "string") {
            throw new TypeError("First argument must be of type string.");
          }
          if (args.length === 0 || args.length % 2 !== 0) {
            throw new ValueError("ReplaceExpression got wrong number of args.");
          }
          // assert args.length >= 2 and even
          args.reverse();
          var i = 2;
          while (args.length > 0) {
            var regexp = args.pop();
            if (regexp instanceof RegExp) {
              regexp = regexp.source;
            }
            var replace_str = args.pop();
            try {
              regexp = new RegExp(regexp, "gi");
            } catch (e) {
              throw new ValueError("Cannot create RegExp for " + regexp);
            }
            i += 2;
            value = value.replace(regexp, replace_str);
          }
          return value;
        },

        trim: function (value) {
          if (typeof value === "string") {
            // normalize sequences of spaces
            value = value.replace(/\s+/gi, " ");
            // trim leading and trailing spaces
            value = value.replace(/^\s/i, "").replace(/\s$/i, "");
          }
          return value;
        },

        url: function () {
          var doc = this.doc;
          try {
            return doc.location.href;
          } catch (e) {
            throw new InterpreterError(
              "'doc' has no property 'location.href'."
            );
          }
        },

        urlParam: function (param_name) {
          var doc = this.doc;
          var url;
          try {
            url = doc.location.href;
          } catch (e) {
            throw new InterpreterError(
              "'doc' has no property 'location.href'."
            );
          }

          var qs = url.slice(url.indexOf("?") + 1).split("&");
          var vars = {};
          for (var i = 0, l = qs.length; i < l; i++) {
            var pair = qs[i].split("=");
            vars[pair[0]] = pair[1];
          }
          return vars[param_name];
        },

        version: function () {
          if (cslparser) {
            return cslparser.VERSION;
          } else {
            return undefined;
          }
        },

        at_least_version: function (value) {
          if (!cslparser) {
            throw new InterpreterError("CSL Parser not in namespace. ");
          }
          function parseVersionString(str) {
            if (typeof str !== "string") {
              return false;
            }
            var x = str.split(".");
            // parse from string or default to 0 if can't parse
            var maj = parseInt(x[0], 10) || 0;
            var min = parseInt(x[1], 10) || 0;
            var pat = parseInt(x[2], 10) || 0;
            return {
              major: maj,
              minor: min,
              patch: pat,
            };
          }

          var given_version = parseVersionString(value);
          var running_version = parseVersionString(cslparser.VERSION);

          if (running_version.major !== given_version.major) {
            return running_version.major > given_version.major;
          } else {
            if (running_version.minor !== given_version.minor) {
              return running_version.minor > given_version.minor;
            } else {
              if (running_version.patch !== given_version.patch) {
                return running_version.patch > given_version.patch;
              } else {
                return true;
              }
            }
          }
        },

        wait: function (delay) {
          var self = this;
          if (!("wait_token" in this.temp)) {
            delay = parseInt(delay, 10);
            if (delay < 0) {
              throw new ValueError("Delay must be larger than 0.");
            }
            window.setTimeout(function () {
              self.temp.wait_token = null;
              self.interpretNext();
            }, delay);
            throw new InterruptException();
          }
          delete this.temp.wait_token;
        },

        xpath: function (value) {
          var doc = this.doc;
          if (!("evaluate" in doc)) {
            throw new InterpreterError(
              "DOM doc object has no 'evaluate' function."
            );
          }
          var xresult = null;
          try {
            xresult = doc.evaluate(value, doc, null, 2, null); // 2 == XPathResult.STRING_TYPE
          } catch (e) {
            throw new InterpreterError(e);
          }
          if (xresult) {
            return xresult.stringValue;
          } else {
            return "";
          }
        },
      };

      /* harmony default export */ const interpreter = Interpreter; // CONCATENATED MODULE: ./js/index.js
      /*
       * Copyright 2011-2023 Ciuvo GmbH. All rights reserved.
       * This file is subject to the terms and conditions defined in
       * file 'LICENSE.txt', which is part of this source code package.
       */
    })();

    /******/ return __webpack_exports__;
    /******/
  })();
});

(function () {
  if (typeof AvastWRC === "undefined") AvastWRC = { ial: {} };

  AvastWRC.ial.productScan = function (json, callback) {
    var ast = window.csl.Parser.parse(json.csl);
    var interpreter = new window.csl.Interpreter(
      window,
      function (res) {
        callback(res);
        interpreter.close();
      },
      function (err) {
        console.log("csl interp finished with err", err);
        callback(err);
        interpreter.close();
      }
    );
    interpreter.interpret(ast);
  };
}.call(this));
