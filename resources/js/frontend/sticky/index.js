/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/scripts/frontend/sticky/helpers.js":
/*!***************************************************!*\
  !*** ./static/scripts/frontend/sticky/helpers.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: () => (/* binding */ addClass),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   getCascadedStyle: () => (/* binding */ getCascadedStyle),
/* harmony export */   getElement: () => (/* binding */ getElement),
/* harmony export */   getStyle: () => (/* binding */ getStyle),
/* harmony export */   hasClass: () => (/* binding */ hasClass),
/* harmony export */   isEmptyObject: () => (/* binding */ isEmptyObject),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   position: () => (/* binding */ position),
/* harmony export */   removeClass: () => (/* binding */ removeClass),
/* harmony export */   supportsPassive: () => (/* binding */ supportsPassive)
/* harmony export */ });
const document = window.document;

/*
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      'use strict';

      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/*
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback) {
    var T, k;
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = arguments[1];
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = {
        passive: false
      };
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}
const getElement = el => {
  let node = null;
  if (typeof el === 'string') {
    node = document.querySelector(el);
  } else if (window.jQuery && el instanceof window.jQuery && el.length) {
    node = el[0];
  } else if (el instanceof Element) {
    node = el;
  }
  return node;
};

// debounce taken from underscore
const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

// cross-browser get style
const getStyle = (el, style) => {
  if (window.getComputedStyle) {
    return style ? document.defaultView.getComputedStyle(el, null).getPropertyValue(style) : document.defaultView.getComputedStyle(el, null);
  } else if (el.currentStyle) {
    return style ? el.currentStyle[style.replace(/-\w/g, s => {
      return s.toUpperCase().replace('-', '');
    })] : el.currentStyle;
  }
};

// check if object is empty
const isEmptyObject = obj => {
  for (const name in obj) {
    return false;
  }
  return true;
};

/**
 * check if element has classes
 *
 * @param el
 * @param className
 * @returns {boolean}
 */
const hasClass = (el, className) => {
  const classnames = className.split(' ').filter(s => s);
  if (el.classList) {
    for (const classname of classnames) {
      if (el.classList.contains(classname)) {
        return true;
      }
    }
    return false;
  } else {
    return new RegExp('(^| )' + classnames.join('|') + '( |$)', 'gi').test(el.className);
  }
};

/**
 * add class name to element
 *
 * @param el
 * @param className
 */
const addClass = (el, className) => {
  if (el.classList) {
    const classnames = className.split(' ').filter(s => s);
    for (const classname of classnames) {
      el.classList.add(classname);
    }
  } else {
    el.className += ' ' + className;
  }
};

/**
 * remove class name to element
 *
 * @param el
 * @param className
 */
const removeClass = (el, className) => {
  const classnames = className.split(' ').filter(s => s);
  if (el.classList) {
    for (const classname of classnames) {
      el.classList.remove(classname);
    }
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + classnames.join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

// like jQuery .offset()
const offset = el => {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

// like jQuery .position()
const position = el => {
  const offsetParent = el.offsetParent;
  const parentOffset = offset(offsetParent);
  const elemOffset = offset(el);
  const prentStyle = getStyle(offsetParent);
  // const elemStyle = getStyle(el);

  parentOffset.top += parseInt(prentStyle.borderTopWidth) || 0;
  parentOffset.left += parseInt(prentStyle.borderLeftWidth) || 0;
  return {
    top: elemOffset.top - parentOffset.top,
    // - (parseInt(elemStyle.marginTop) || 0),
    left: elemOffset.left - parentOffset.left // - (parseInt(elemStyle.marginLeft) || 0)
  };
};

// get cascaded instead of computed styles
const getCascadedStyle = el => {
  // clone element
  let clone = el.cloneNode(true);
  clone.style.display = 'none';

  // remove name attr from cloned radio buttons to prevent their clearing
  Array.prototype.slice.call(clone.querySelectorAll('input[type="radio"]')).forEach(el => {
    el.removeAttribute('name');
  });

  // insert clone to DOM
  el.parentNode.insertBefore(clone, el.nextSibling);

  // get styles
  let currentStyle;
  if (clone.currentStyle) {
    currentStyle = clone.currentStyle;
  } else if (window.getComputedStyle) {
    currentStyle = document.defaultView.getComputedStyle(clone, null);
  }

  // new style oject
  let style = {};
  for (const prop in currentStyle) {
    if (isNaN(prop) && (typeof currentStyle[prop] === 'string' || typeof currentStyle[prop] === 'number')) {
      style[prop] = currentStyle[prop];
    }
  }

  // safari copy
  if (Object.keys(style).length < 3) {
    style = {}; // clear
    for (const prop in currentStyle) {
      if (!isNaN(prop)) {
        style[currentStyle[prop].replace(/-\w/g, s => {
          return s.toUpperCase().replace('-', '');
        })] = currentStyle.getPropertyValue(currentStyle[prop]);
      }
    }
  }

  // check for margin:auto
  if (!style.margin && style.marginLeft === 'auto') {
    style.margin = 'auto';
  } else if (!style.margin && style.marginLeft === style.marginRight && style.marginLeft === style.marginTop && style.marginLeft === style.marginBottom) {
    style.margin = style.marginLeft;
  }

  // safari margin:auto hack
  if (!style.margin && style.marginLeft === '0px' && style.marginRight === '0px') {
    const posLeft = el.offsetLeft - el.parentNode.offsetLeft;
    const marginLeft = posLeft - (parseInt(style.left) || 0) - (parseInt(style.right) || 0);
    const marginRight = el.parentNode.offsetWidth - el.offsetWidth - posLeft - (parseInt(style.right) || 0) + (parseInt(style.left) || 0);
    const diff = marginRight - marginLeft;
    if (diff === 0 || diff === 1) {
      style.margin = 'auto';
    }
  }

  // destroy clone
  clone.parentNode.removeChild(clone);
  clone = null;
  return style;
};


/***/ }),

/***/ "./static/scripts/frontend/sticky/plover-sticky.js":
/*!*********************************************************!*\
  !*** ./static/scripts/frontend/sticky/plover-sticky.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./static/scripts/frontend/sticky/helpers.js");
/*
 * Plover Sticky
 *
 * Fork of https://github.com/somewebmedia/hc-sticky
 * =========
 * Version: 1.0.0
 * Description: JavaScript library that makes any element on your page visible while you scroll
 * License: MIT
 */


const document = window.document;
const DEFAULT_OPTIONS = {
  top: 0,
  bottom: 0,
  bottomEnd: 0,
  innerTop: 0,
  zIndex: null,
  // keep default
  innerSticker: null,
  stickyClass: 'sticky',
  stickTo: null,
  followScroll: true,
  responsive: null,
  mobileFirst: false,
  onStart: null,
  onStop: null,
  onBeforeResize: null,
  onResize: null,
  resizeDebounce: 100,
  disable: false
};
const deprecated = (() => {
  const pluginName = 'Plover Sticky';
  return (what, instead, type) => {
    console.warn('%c' + pluginName + ':' + '%c ' + type + '%c \'' + what + '\'' + '%c is now deprecated and will be removed. Use' + '%c \'' + instead + '\'' + '%c instead.', 'color: #fa253b', 'color: default', 'color: #5595c6', 'color: default', 'color: #5595c6', 'color: default');
  };
})();
const PloverSticky = function (elem, userSettings) {
  userSettings = userSettings || {};

  // use querySeletor if string is passed
  if (typeof elem === 'string') {
    elem = document.querySelector(elem);
  }

  // check if element exist
  if (!elem) return false;
  if (userSettings.queries) {
    deprecated('queries', 'responsive', 'option');
  }
  if (userSettings.queryFlow) {
    deprecated('queryFlow', 'mobileFirst', 'option');
  }
  let STICKY_OPTIONS = {};
  const elemParent = elem.parentNode;

  // parent can't be static
  if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elemParent, 'position') === 'static') {
    elemParent.style.position = 'relative';
  }
  const setOptions = options => {
    options = options || {};
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(options) && !(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(STICKY_OPTIONS)) {
      // nothing to set
      return;
    }

    // extend options
    STICKY_OPTIONS = Object.assign({}, DEFAULT_OPTIONS, STICKY_OPTIONS, options);
  };
  const resetOptions = options => {
    STICKY_OPTIONS = Object.assign({}, DEFAULT_OPTIONS, options || {});
  };
  const getOptions = option => {
    return option ? STICKY_OPTIONS[option] : Object.assign({}, STICKY_OPTIONS);
  };
  const isDisabled = () => {
    return STICKY_OPTIONS.disable;
  };
  const applyQueries = () => {
    const mediaQueries = STICKY_OPTIONS.responsive || STICKY_OPTIONS.queries;
    if (mediaQueries) {
      const window_width = window.innerWidth;

      // reset settings
      resetOptions(userSettings);
      if (STICKY_OPTIONS.mobileFirst) {
        for (const width in mediaQueries) {
          if (window_width >= width && !(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(mediaQueries[width])) {
            setOptions(mediaQueries[width]);
          }
        }
      } else {
        const queriesArr = [];

        // convert to array so we can reverse loop it
        for (const b in mediaQueries) {
          const q = {};
          q[b] = mediaQueries[b];
          queriesArr.push(q);
        }
        for (let i = queriesArr.length - 1; i >= 0; i--) {
          const query = queriesArr[i];
          const breakpoint = Object.keys(query)[0];
          if (window_width <= breakpoint && !(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(query[breakpoint])) {
            setOptions(query[breakpoint]);
          }
        }
      }
    }
  };

  // our helper function for getting necessary styles
  const getStickyCss = el => {
    const cascadedStyle = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCascadedStyle)(el);
    const computedStyle = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getStyle)(el);
    const css = {
      height: el.offsetHeight + 'px',
      left: cascadedStyle.left,
      right: cascadedStyle.right,
      top: cascadedStyle.top,
      bottom: cascadedStyle.bottom,
      position: computedStyle.position,
      display: computedStyle.display,
      verticalAlign: computedStyle.verticalAlign,
      boxSizing: computedStyle.boxSizing,
      marginLeft: cascadedStyle.marginLeft,
      marginRight: cascadedStyle.marginRight,
      marginTop: cascadedStyle.marginTop,
      marginBottom: cascadedStyle.marginBottom,
      paddingLeft: cascadedStyle.paddingLeft,
      paddingRight: cascadedStyle.paddingRight
    };
    if (cascadedStyle['float']) {
      css['float'] = cascadedStyle['float'] || 'none';
    }
    if (cascadedStyle.cssFloat) {
      css['cssFloat'] = cascadedStyle.cssFloat || 'none';
    }

    // old firefox box-sizing
    if (computedStyle.MozBoxSizing) {
      css['MozBoxSizing'] = computedStyle.MozBoxSizing;
    }
    css['width'] = cascadedStyle.width !== 'auto' ? cascadedStyle.width : css.boxSizing === 'border-box' || css.MozBoxSizing === 'border-box' ? el.offsetWidth + 'px' : computedStyle.width;
    return css;
  };
  const Sticky = {
    css: {},
    position: null,
    // so we don't need to check css all the time
    stick: args => {
      args = args || {};

      // check if element is already sticky
      if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.hasClass)(elem, STICKY_OPTIONS.stickyClass)) {
        return;
      }
      if (Spacer.isAttached === false) {
        Spacer.attach();
      }
      Sticky.position = 'fixed';

      // apply styles
      elem.style.position = 'fixed';
      elem.style.setProperty('margin-left', '0', 'important');
      elem.style.setProperty('margin-right', '0', 'important');
      elem.style.left = Spacer.offsetLeft() + 'px';
      elem.style.width = Spacer.width;
      if (typeof args.bottom === 'undefined') {
        elem.style.bottom = 'auto';
      } else {
        elem.style.bottom = args.bottom + 'px';
      }
      if (typeof args.top === 'undefined') {
        elem.style.top = 'auto';
      } else {
        elem.style.top = args.top + 'px';
      }

      // add sticky class
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addClass)(elem, STICKY_OPTIONS.stickyClass);

      // add sticky z-index attribute
      if (STICKY_OPTIONS.zIndex !== null && STICKY_OPTIONS.zIndex !== undefined) {
        elem.style.zIndex = STICKY_OPTIONS.zIndex;
      }

      // fire 'start' event
      if (STICKY_OPTIONS.onStart) {
        STICKY_OPTIONS.onStart.call(elem, Object.assign({}, STICKY_OPTIONS));
      }
    },
    release: args => {
      args = args || {};
      args.stop = args.stop || false;

      // check if we've already done this
      if (args.stop !== true && Sticky.position !== 'fixed' && Sticky.position !== null && (typeof args.top === 'undefined' && typeof args.bottom === 'undefined' || typeof args.top !== 'undefined' && (parseInt((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, 'top')) || 0) === args.top || typeof args.bottom !== 'undefined' && (parseInt((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, 'bottom')) || 0) === args.bottom)) {
        return;
      }
      if (args.stop === true) {
        // remove spacer
        if (Spacer.isAttached === true) {
          Spacer.detach();
        }
      } else {
        // check spacer
        if (Spacer.isAttached === false) {
          Spacer.attach();
        }
      }
      const position = args.position || Sticky.css.position;

      // remember position
      Sticky.position = position;

      // apply styles
      elem.style.position = position;
      elem.style.marginLeft = '';
      elem.style.marginRight = '';
      elem.style.left = args.stop === true ? Sticky.css.left : Spacer.positionLeft() + 'px';
      elem.style.width = position !== 'absolute' ? Sticky.css.width : Spacer.width;
      if (typeof args.bottom === 'undefined') {
        elem.style.bottom = args.stop === true ? '' : 'auto';
      } else {
        elem.style.bottom = args.bottom + 'px';
      }
      if (typeof args.top === 'undefined') {
        elem.style.top = args.stop === true ? '' : 'auto';
      } else {
        elem.style.top = args.top + 'px';
      }

      // remove sticky class
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(elem, STICKY_OPTIONS.stickyClass);

      // fire 'stop' event
      if (STICKY_OPTIONS.onStop) {
        STICKY_OPTIONS.onStop.call(elem, Object.assign({}, STICKY_OPTIONS));
      }
    }
  };
  const Spacer = {
    el: elem.cloneNode(true),
    offsetLeft: null,
    positionLeft: null,
    width: null,
    isAttached: false,
    init: () => {
      Spacer.el.innerHTML = '';
      if (Spacer.el.classList) {
        Spacer.el.classList.add('sticky-spacer');
        if (STICKY_OPTIONS.spacerExcludeClass) {
          Spacer.el.classList.remove(STICKY_OPTIONS.spacerExcludeClass);
        }
      } else {
        if (STICKY_OPTIONS.spacerExcludeClass) {
          Spacer.el.className = Spacer.el.className.replace(new RegExp('(^|\\b)' + STICKY_OPTIONS.spacerExcludeClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
        Spacer.el.className = Spacer.el.className + ' sticky-spacer';
      }

      // copy styles from sticky element
      for (const prop in Sticky.css) {
        Spacer.el.style[prop] = Sticky.css[prop];
      }

      // make spacer invisible
      Spacer.el.style.visibility = 'hidden';
      Spacer.el.style.opacity = 0;
      Spacer.el.style.pointerEvents = 'none';

      // just to be sure the spacer is behind everything
      Spacer.el.style['z-index'] = '-1';

      // get spacer offset and position
      Spacer.offsetLeft = () => {
        return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.offset)(Spacer.el).left;
      };
      Spacer.positionLeft = () => {
        return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.position)(Spacer.el).left;
      };

      // get spacer width
      Spacer.width = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, 'width');
    },
    attach: () => {
      // insert spacer to DOM
      elemParent.insertBefore(Spacer.el, elem);
      Spacer.isAttached = true;
    },
    detach: () => {
      // remove spacer from DOM
      Spacer.el = elemParent.removeChild(Spacer.el);
      Spacer.isAttached = false;
    }
  };

  // define our private variables
  let stickTo_document;
  let container;
  let inner_sticker;
  let container_height;
  let container_offsetTop;
  let elemParent_offsetTop;
  let window_height;
  let options_top;
  let options_bottom;
  let stick_top;
  let stick_bottom;
  let top_limit;
  let bottom_limit;
  let largerSticky;
  let sticky_height;
  let sticky_offsetTop;
  let calcContainerHeight;
  let calcStickyHeight;
  const calcSticky = () => {
    // get/set element styles
    Sticky.css = getStickyCss(elem);

    // init or reinit spacer
    Spacer.init();

    // check if referring element is document
    stickTo_document = STICKY_OPTIONS.stickTo && (STICKY_OPTIONS.stickTo === 'document' || STICKY_OPTIONS.stickTo.nodeType && STICKY_OPTIONS.stickTo.nodeType === 9 || typeof STICKY_OPTIONS.stickTo === 'object' && STICKY_OPTIONS.stickTo instanceof (typeof HTMLDocument !== 'undefined' ? HTMLDocument : Document)) ? true : false;

    // select referred container
    container = STICKY_OPTIONS.stickTo ? stickTo_document ? document : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)(STICKY_OPTIONS.stickTo) : elemParent;

    // get sticky height
    calcStickyHeight = () => {
      const height = elem.offsetHeight + (parseInt(Sticky.css.marginTop) || 0) + (parseInt(Sticky.css.marginBottom) || 0);
      const h_diff = (sticky_height || 0) - height;
      if (h_diff >= -1 && h_diff <= 1) {
        // sometimes element height changes by 1px when it get fixed position, so don't return new value
        return sticky_height;
      } else {
        return height;
      }
    };
    sticky_height = calcStickyHeight();

    // get container height
    calcContainerHeight = () => {
      return !stickTo_document ? container.offsetHeight : Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
    };
    container_height = calcContainerHeight();
    container_offsetTop = !stickTo_document ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.offset)(container).top : 0;
    elemParent_offsetTop = !STICKY_OPTIONS.stickTo ? container_offsetTop // parent is container
    : !stickTo_document ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.offset)(elemParent).top : 0;
    window_height = window.innerHeight;
    sticky_offsetTop = elem.offsetTop - (parseInt(Sticky.css.marginTop) || 0);

    // get inner sticker element
    inner_sticker = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)(STICKY_OPTIONS.innerSticker);

    // top
    options_top = isNaN(STICKY_OPTIONS.top) && STICKY_OPTIONS.top.indexOf('%') > -1 ? parseFloat(STICKY_OPTIONS.top) / 100 * window_height : STICKY_OPTIONS.top;

    // bottom
    options_bottom = isNaN(STICKY_OPTIONS.bottom) && STICKY_OPTIONS.bottom.indexOf('%') > -1 ? parseFloat(STICKY_OPTIONS.bottom) / 100 * window_height : STICKY_OPTIONS.bottom;

    // calculate sticky breakpoints
    stick_top = inner_sticker ? inner_sticker.offsetTop : STICKY_OPTIONS.innerTop ? STICKY_OPTIONS.innerTop : 0;
    stick_bottom = isNaN(STICKY_OPTIONS.bottomEnd) && STICKY_OPTIONS.bottomEnd.indexOf('%') > -1 ? parseFloat(STICKY_OPTIONS.bottomEnd) / 100 * window_height : STICKY_OPTIONS.bottomEnd;
    top_limit = container_offsetTop - options_top + stick_top + sticky_offsetTop;
  };

  // store scroll position so we can determine scroll direction
  let last_pos = window.pageYOffset || document.documentElement.scrollTop;
  let diff_y = 0;
  let scroll_dir;
  const runSticky = () => {
    // always calculate sticky and container height in case of DOM change
    sticky_height = calcStickyHeight();
    container_height = calcContainerHeight();
    bottom_limit = container_offsetTop + container_height - options_top - stick_bottom;

    // check if sticky is bigger than container
    largerSticky = sticky_height > container_height;
    const offset_top = window.pageYOffset || document.documentElement.scrollTop;
    const sticky_top = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.offset)(elem).top;
    const sticky_window_top = sticky_top - offset_top;
    let bottom_distance;

    // get scroll direction
    scroll_dir = offset_top < last_pos ? 'up' : 'down';
    diff_y = offset_top - last_pos;
    last_pos = offset_top;
    if (offset_top > top_limit) {
      // http://geek-and-poke.com/geekandpoke/2012/7/27/simply-explained.html
      if (bottom_limit + options_top + (largerSticky ? options_bottom : 0) - (STICKY_OPTIONS.followScroll && largerSticky ? 0 : options_top) <= offset_top + sticky_height - stick_top - (sticky_height - stick_top > window_height - (top_limit - stick_top) && STICKY_OPTIONS.followScroll ? (bottom_distance = sticky_height - window_height - stick_top) > 0 ? bottom_distance : 0 : 0)) {
        // bottom reached end
        Sticky.release({
          position: 'absolute',
          //top: bottom_limit - sticky_height - top_limit + stick_top + sticky_offsetTop
          bottom: elemParent_offsetTop + elemParent.offsetHeight - bottom_limit - options_top
        });
      } else if (largerSticky && STICKY_OPTIONS.followScroll) {
        // sticky is bigger than container and follows scroll
        if (scroll_dir === 'down') {
          // scroll down
          if (sticky_window_top + sticky_height + options_bottom <= window_height + .9) {
            // stick on bottom
            // fix subpixel precision with adding .9 pixels
            Sticky.stick({
              //top: window_height - sticky_height - options_bottom
              bottom: options_bottom
            });
          } else if (Sticky.position === 'fixed') {
            // bottom reached window bottom
            Sticky.release({
              position: 'absolute',
              top: sticky_top - options_top - top_limit - diff_y + stick_top
            });
          }
        } else {
          // scroll up
          if (Math.ceil(sticky_window_top + stick_top) < 0 && Sticky.position === 'fixed') {
            // top reached window top
            Sticky.release({
              position: 'absolute',
              top: sticky_top - options_top - top_limit + stick_top - diff_y
            });
          } else if (sticky_top >= offset_top + options_top - stick_top) {
            // stick on top
            Sticky.stick({
              top: options_top - stick_top
            });
          }
        }
      } else {
        // stick on top
        Sticky.stick({
          top: options_top - stick_top
        });
      }
    } else {
      // starting point
      Sticky.release({
        stop: true
      });
    }
  };
  let scrollAttached = false;
  let resizeAttached = false;
  const disableSticky = () => {
    if (scrollAttached) {
      // detach sticky from scroll
      window.removeEventListener('scroll', runSticky, _helpers__WEBPACK_IMPORTED_MODULE_0__.supportsPassive);

      // sticky is not attached to scroll anymore
      scrollAttached = false;
    }
  };
  const initSticky = () => {
    // check if element or it's parents are visible
    if (elem.offsetParent === null || (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, 'display') === 'none') {
      disableSticky();
      return;
    }

    // calculate stuff
    calcSticky();

    // check if sticky is bigger than reffering container
    if (sticky_height > container_height) {
      disableSticky();
      return;
    }

    // run
    runSticky();
    if (!scrollAttached) {
      // attach sticky to scroll
      window.addEventListener('scroll', runSticky, _helpers__WEBPACK_IMPORTED_MODULE_0__.supportsPassive);

      // sticky is attached to scroll
      scrollAttached = true;
    }
  };
  const resetSticky = () => {
    // remove inline styles
    elem.style.position = '';
    elem.style.marginLeft = '';
    elem.style.marginRight = '';
    elem.style.left = '';
    elem.style.top = '';
    elem.style.bottom = '';
    elem.style.width = '';

    // remove sticky class
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.removeClass)(elem, STICKY_OPTIONS.stickyClass);

    // reset sticky object data
    Sticky.css = {};
    Sticky.position = null;

    // remove spacer
    if (Spacer.isAttached === true) {
      Spacer.detach();
    }
  };
  const reinitSticky = () => {
    resetSticky();
    applyQueries();
    if (isDisabled()) {
      disableSticky();
      return;
    }

    // restart sticky
    initSticky();
  };
  const resizeSticky = () => {
    // fire 'beforeResize' event
    if (STICKY_OPTIONS.onBeforeResize) {
      STICKY_OPTIONS.onBeforeResize.call(elem, Object.assign({}, STICKY_OPTIONS));
    }

    // reinit sticky
    reinitSticky();

    // fire 'resize' event
    if (STICKY_OPTIONS.onResize) {
      STICKY_OPTIONS.onResize.call(elem, Object.assign({}, STICKY_OPTIONS));
    }
  };
  const resize_cb = !STICKY_OPTIONS.resizeDebounce ? resizeSticky : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.debounce)(resizeSticky, STICKY_OPTIONS.resizeDebounce);

  // Method for updating options
  const Update = options => {
    setOptions(options);

    // also update user settings
    userSettings = Object.assign({}, userSettings, options || {});
    reinitSticky();
  };
  const Detach = () => {
    // detach resize reinit
    if (resizeAttached) {
      window.removeEventListener('resize', resize_cb, _helpers__WEBPACK_IMPORTED_MODULE_0__.supportsPassive);
      resizeAttached = false;
    }
    disableSticky();
  };
  const Destroy = () => {
    Detach();
    resetSticky();
  };
  const Attach = () => {
    // attach resize reinit
    if (!resizeAttached) {
      window.addEventListener('resize', resize_cb, _helpers__WEBPACK_IMPORTED_MODULE_0__.supportsPassive);
      resizeAttached = true;
    }
    applyQueries();
    if (isDisabled()) {
      disableSticky();
      return;
    }
    initSticky();
  };
  this.options = getOptions;
  this.refresh = reinitSticky;
  this.update = Update;
  this.attach = Attach;
  this.detach = Detach;
  this.destroy = Destroy;
  this.reinit = () => {
    deprecated('reinit', 'refresh', 'method');
    reinitSticky();
  };

  // init settings
  setOptions(userSettings);

  // start sticky
  Attach();

  // reinit on complete page load
  window.addEventListener('load', reinitSticky);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PloverSticky);

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************************!*\
  !*** ./static/scripts/frontend/sticky/index.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plover_sticky__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plover-sticky */ "./static/scripts/frontend/sticky/plover-sticky.js");


_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  const stickyElements = document.getElementsByClassName('plover-is-sticky-block');
  const parseInt = (value, def = 0) => {
    var _Number$parseInt;
    const v = (_Number$parseInt = Number.parseInt(value)) !== null && _Number$parseInt !== void 0 ? _Number$parseInt : def;
    return Number.isInteger(v) ? v : def;
  };
  for (const element of [...stickyElements]) {
    var _element$dataset$stic, _element$dataset$stic2, _element$dataset$stic3;
    const stickyOffsetTop = parseInt(element.dataset.stickyOffsetTop, 0);
    const stickyZIndex = (_element$dataset$stic = element.dataset.stickyZIndex) !== null && _element$dataset$stic !== void 0 ? _element$dataset$stic : 10;
    const stickyContainer = (_element$dataset$stic2 = element.dataset.stickyContainer) !== null && _element$dataset$stic2 !== void 0 ? _element$dataset$stic2 : null;
    const stickyHasAdminBar = element.dataset.stickyHasAdminBar;
    const stickyClass = element.dataset.stickyClass ? ' ' + element.dataset.stickyClass : '';
    const stickyBreakpoint = Number.parseInt((_element$dataset$stic3 = element.dataset.stickyBreakpoint) !== null && _element$dataset$stic3 !== void 0 ? _element$dataset$stic3 : undefined);
    new _plover_sticky__WEBPACK_IMPORTED_MODULE_1__["default"](element, {
      stickTo: stickyContainer,
      top: stickyHasAdminBar ? 32 + stickyOffsetTop : stickyOffsetTop,
      zIndex: stickyZIndex,
      spacerExcludeClass: 'plover-is-sticky-block',
      stickyClass: 'plover-sticky' + stickyClass,
      responsive: isNaN(stickyBreakpoint) || stickyBreakpoint <= 0 ? null : {
        [stickyBreakpoint]: {
          disable: true
        }
      }
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map