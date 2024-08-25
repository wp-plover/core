/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/packages/utils/block-extensions.js":
/*!***************************************************!*\
  !*** ./static/packages/utils/block-extensions.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockExtensions: () => (/* binding */ blockExtensions),
/* harmony export */   getExtension: () => (/* binding */ getExtension),
/* harmony export */   getExtensionSetting: () => (/* binding */ getExtensionSetting),
/* harmony export */   hasExtension: () => (/* binding */ hasExtension)
/* harmony export */ });
var _window$PloverEditor$;
const blockExtensions = (_window$PloverEditor$ = window?.PloverEditor?.extensions) !== null && _window$PloverEditor$ !== void 0 ? _window$PloverEditor$ : {};
const getExtension = (extension, default_value = null) => {
  var _blockExtensions$exte;
  return (_blockExtensions$exte = blockExtensions?.[extension]) !== null && _blockExtensions$exte !== void 0 ? _blockExtensions$exte : default_value;
};
const getExtensionSetting = (extension, setting, default_value = null) => {
  var _blockExtensions$exte2;
  return (_blockExtensions$exte2 = blockExtensions?.[extension]?.[setting]) !== null && _blockExtensions$exte2 !== void 0 ? _blockExtensions$exte2 : default_value;
};
const hasExtension = extension => {
  var _blockExtensions$exte3;
  return (_blockExtensions$exte3 = blockExtensions?.[extension]) !== null && _blockExtensions$exte3 !== void 0 ? _blockExtensions$exte3 : false;
};


/***/ }),

/***/ "./static/packages/utils/block-supports.js":
/*!*************************************************!*\
  !*** ./static/packages/utils/block-supports.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockSupports: () => (/* binding */ blockSupports),
/* harmony export */   getCustomBlockSupportConfig: () => (/* binding */ getCustomBlockSupportConfig),
/* harmony export */   getPloverSupport: () => (/* binding */ getPloverSupport),
/* harmony export */   hasPloverSupport: () => (/* binding */ hasPloverSupport)
/* harmony export */ });
var _window$PloverEditor$, _window$PloverEditor$2;
const blockSupports = (_window$PloverEditor$ = window?.PloverEditor?.blockSupports) !== null && _window$PloverEditor$ !== void 0 ? _window$PloverEditor$ : {};
const customBlockSupports = (_window$PloverEditor$2 = window?.PloverEditor?.customBlockSupports) !== null && _window$PloverEditor$2 !== void 0 ? _window$PloverEditor$2 : {};
const getCustomBlockSupportConfig = (support, default_value = null) => {
  var _customBlockSupports$;
  return (_customBlockSupports$ = customBlockSupports?.[support]) !== null && _customBlockSupports$ !== void 0 ? _customBlockSupports$ : default_value;
};
const getPloverSupport = (name, support, default_value = null) => {
  var _blockSupports$name$s;
  return (_blockSupports$name$s = blockSupports?.[name]?.[support]) !== null && _blockSupports$name$s !== void 0 ? _blockSupports$name$s : default_value;
};
const hasPloverSupport = (name, support) => {
  var _blockSupports$name$s2;
  return (_blockSupports$name$s2 = blockSupports?.[name]?.[support]) !== null && _blockSupports$name$s2 !== void 0 ? _blockSupports$name$s2 : false;
};


/***/ }),

/***/ "./static/packages/utils/deep-merge.js":
/*!*********************************************!*\
  !*** ./static/packages/utils/deep-merge.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepMerge: () => (/* binding */ deepMerge)
/* harmony export */ });
function deepMerge(...objects) {
  const result = {};
  for (const obj of objects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          // direct assign array value
          result[key] = obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          // if value is obj, then recursive merge
          result[key] = deepMerge(result[key] || {}, obj[key]);
        } else {
          // direct assign primitive value
          result[key] = obj[key];
        }
      }
    }
  }
  return result;
}

/***/ }),

/***/ "./static/packages/utils/extract-colors.js":
/*!*************************************************!*\
  !*** ./static/packages/utils/extract-colors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractColors: () => (/* binding */ extractColors),
/* harmony export */   replaceColorsWithPlaceholder: () => (/* binding */ replaceColorsWithPlaceholder)
/* harmony export */ });
/**
 * Extract all color values from string
 *
 * @param str
 * @param vars
 * @returns {*[]}
 */
function extractColors(str, vars = true) {
  const cssVarRegex = /var\(--(.*?)\)/gi;
  const hexRegex = /#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})/gi;
  const rgbRegex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi;
  const rgbaRegex = /rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0-9]*\.?[0-9]+)\)/gi;
  const colorNamesRegex = /\b(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|currentcolor|inherit|transparent)\b/gi;
  let cssVars = vars ? str.match(cssVarRegex) : [];
  let hexColors = str.match(hexRegex);
  let rgbColors = str.match(rgbRegex);
  let rgbaColors = str.match(rgbaRegex);
  let colorNames = str.match(colorNamesRegex);
  return [...new Set([...(cssVars || []), ...(hexColors || []), ...(rgbColors || []), ...(rgbaColors || []), ...(colorNames || [])])];
}

/**
 * Replaces color values with placeholders for simple css procession
 *
 * @param raw
 * @param callback
 * @param vars
 * @returns {*}
 */
function replaceColorsWithPlaceholder(raw, callback, vars = true) {
  const colors = extractColors(raw, vars);
  colors.forEach((c, i) => {
    // avoid split rgb()/rgba() values
    raw = raw.replaceAll(c, `#COLOR_${i}#`);
  });
  const restore = part => {
    const colorRegex = /#COLOR_(\d+)#/i;
    const matches = part.match(colorRegex);
    if (matches && matches[1]) {
      part = part.replace(matches[0], colors[Number(matches[1])]);
    }
    return part;
  };
  return callback(raw, restore);
}

/***/ }),

/***/ "./static/packages/utils/extract-css-vars.js":
/*!***************************************************!*\
  !*** ./static/packages/utils/extract-css-vars.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractCssVars: () => (/* binding */ extractCssVars)
/* harmony export */ });
function extractCssVars(str) {
  const regex = /var\(--(.*?)\)/gi;
  return [...(str.match(regex) || [])];
}

/***/ }),

/***/ "./static/packages/utils/flatten-object.js":
/*!*************************************************!*\
  !*** ./static/packages/utils/flatten-object.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenObject: () => (/* binding */ flattenObject)
/* harmony export */ });
const flattenObject = (obj, key = 'id') => {
  return Object.keys(obj !== null && obj !== void 0 ? obj : {}).map(id => {
    return {
      ...obj[id],
      [key]: id
    };
  });
};

/***/ }),

/***/ "./static/packages/utils/format-custom-property.js":
/*!*********************************************************!*\
  !*** ./static/packages/utils/format-custom-property.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatCustomProperty: () => (/* binding */ formatCustomProperty)
/* harmony export */ });
/* harmony import */ var _str_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./str-utils */ "./static/packages/utils/str-utils.js");

function formatCustomProperty(property) {
  if (!property.includes('var:')) {
    return property;
  }
  property = property.replace('var:', 'var(--wp--');
  property = (0,_str_utils__WEBPACK_IMPORTED_MODULE_0__.replaceAll)(property, '|', '--');
  return property + ')';
}
;

/***/ }),

/***/ "./static/packages/utils/get-computed-style.js":
/*!*****************************************************!*\
  !*** ./static/packages/utils/get-computed-style.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBodyComputedStyle: () => (/* binding */ getBodyComputedStyle),
/* harmony export */   getDocumentComputedStyle: () => (/* binding */ getDocumentComputedStyle),
/* harmony export */   getDomComputedStyle: () => (/* binding */ getDomComputedStyle)
/* harmony export */ });
/* harmony import */ var _type_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-assert */ "./static/packages/utils/type-assert.js");

function getDomComputedStyle(property, dom = document.documentElement) {
  if (!(0,_type_assert__WEBPACK_IMPORTED_MODULE_0__.isString)(property)) {
    return property;
  }
  if (!property.startsWith('var(')) {
    return property;
  }
  return getComputedStyle(dom).getPropertyValue(property.replace(/var\(/, '').replace(/\)/, '')).trim();
}
function getDocumentComputedStyle(property) {
  return getDomComputedStyle(property, document.documentElement);
}
function getBodyComputedStyle(property) {
  return getDomComputedStyle(property, document.body);
}


/***/ }),

/***/ "./static/packages/utils/plover-theme.js":
/*!***********************************************!*\
  !*** ./static/packages/utils/plover-theme.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPloverThemeSettings: () => (/* binding */ getPloverThemeSettings)
/* harmony export */ });
var _window$PloverEditor$;
const theme = (_window$PloverEditor$ = window?.PloverEditor?.theme) !== null && _window$PloverEditor$ !== void 0 ? _window$PloverEditor$ : {};
const getPloverThemeSettings = path => {
  var _theme$settings;
  const steps = path.split('.');
  let result = (_theme$settings = theme?.settings) !== null && _theme$settings !== void 0 ? _theme$settings : {};
  for (let i = 0; i < steps.length; i++) {
    var _result$steps$i;
    result = (_result$steps$i = result[steps[i]]) !== null && _result$steps$i !== void 0 ? _result$steps$i : undefined;
    if (!result) {
      return result;
    }
  }
  return result;
};


/***/ }),

/***/ "./static/packages/utils/read-files-sync.js":
/*!**************************************************!*\
  !*** ./static/packages/utils/read-files-sync.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readFile: () => (/* binding */ readFile),
/* harmony export */   readFilesSync: () => (/* binding */ readFilesSync)
/* harmony export */ });
/**
 * Read file
 *
 * @param file
 * @returns {Promise<unknown>}
 */
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve({
      file,
      content: e.target.result
    });
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * Read files sync
 *
 * @param files
 * @returns {Promise<*[]>}
 */
async function readFilesSync(files) {
  const result = [];
  for (const file of files) {
    result.push(await readFile(file));
  }
  return result;
}

/***/ }),

/***/ "./static/packages/utils/responsive.js":
/*!*********************************************!*\
  !*** ./static/packages/utils/responsive.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getScalarValueByDevice: () => (/* binding */ getScalarValueByDevice),
/* harmony export */   promoteScalarValueIntoResponsive: () => (/* binding */ promoteScalarValueIntoResponsive)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Responsive value must necessarily have the desktop key attached to it
 */
const promoteScalarValueIntoResponsive = (value, fill = false) => {
  var _clone, _clone2;
  let valueWithResponsive = typeof value === 'object' && Object.keys(value).indexOf('desktop') > -1 ? (_clone = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.clone)(value)) !== null && _clone !== void 0 ? _clone : '' : {
    desktop: (_clone2 = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.clone)(value)) !== null && _clone2 !== void 0 ? _clone2 : '',
    tablet: '__INITIAL_VALUE__',
    mobile: '__INITIAL_VALUE__'
  };
  if (fill) {
    if (valueWithResponsive['tablet'] === '__INITIAL_VALUE__') {
      valueWithResponsive['tablet'] = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.clone)(valueWithResponsive['desktop']);
    }
    if (valueWithResponsive['mobile'] === '__INITIAL_VALUE__') {
      valueWithResponsive['mobile'] = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.clone)(valueWithResponsive['tablet']);
    }
  }
  return valueWithResponsive;
};

/**
 * @param value
 * @param device
 * @returns {*|string}
 */
const getScalarValueByDevice = (value, device = 'desktop') => {
  return promoteScalarValueIntoResponsive(value, true)[device];
};

/***/ }),

/***/ "./static/packages/utils/str-utils.js":
/*!********************************************!*\
  !*** ./static/packages/utils/str-utils.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   replaceAll: () => (/* binding */ replaceAll),
/* harmony export */   titleCase: () => (/* binding */ titleCase)
/* harmony export */ });
/**
 * Capitalize text transform
 *
 * @param string
 * @returns {string}
 */
const capitalize = string => {
  return string.toLowerCase().replace(/\b[a-z]/g, function (match) {
    return match.toUpperCase();
  });
};

/**
 * Title case text transform
 *
 * @param str
 * @param search
 * @returns {string}
 */
function titleCase(str, search = ['-', '-']) {
  return capitalize(replaceAll(str, search, ' ').trim());
}

/**
 * @param str
 * @param find
 * @param replace
 * @returns {string|undefined|string}
 */
const replaceAll = (str = '', find, replace) => {
  if (typeof find === 'string') {
    return str?.split(find)?.join(replace);
  }
  for (const f of find) {
    str = replaceAll(str, f, replace);
  }
  return str;
};

/***/ }),

/***/ "./static/packages/utils/type-assert.js":
/*!**********************************************!*\
  !*** ./static/packages/utils/type-assert.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isString: () => (/* binding */ isString)
/* harmony export */ });
function isString(value) {
  return typeof value === 'string';
}


/***/ }),

/***/ "./static/packages/utils/upsell.js":
/*!*****************************************!*\
  !*** ./static/packages/utils/upsell.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   is_premium: () => (/* binding */ is_premium),
/* harmony export */   upsell_url: () => (/* binding */ upsell_url)
/* harmony export */ });
function is_premium() {
  return window?.PloverDashboard?.plan === 'premium' || window?.PloverEditor?.plan === 'premium';
}
function upsell_url() {
  return window?.PloverDashboard?.upsell || window?.PloverEditor?.upsell;
}

/***/ }),

/***/ "./static/packages/utils/use-settings.js":
/*!***********************************************!*\
  !*** ./static/packages/utils/use-settings.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSettings: () => (/* binding */ useSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Polyfill for useSettings before WordPress v6.5.0
 *
 * @param path
 * @returns {*|*[]}
 */
function useSettings(...path) {
  if (_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useSettings) {
    return (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useSettings)(...path);
  }
  let result = [];
  path.forEach(item => {
    result.push((0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useSetting)(item));
  });
  return result;
}

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

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
/*!****************************************!*\
  !*** ./static/packages/utils/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockExtensions: () => (/* reexport safe */ _block_extensions__WEBPACK_IMPORTED_MODULE_1__.blockExtensions),
/* harmony export */   blockSupports: () => (/* reexport safe */ _block_supports__WEBPACK_IMPORTED_MODULE_0__.blockSupports),
/* harmony export */   capitalize: () => (/* reexport safe */ _str_utils__WEBPACK_IMPORTED_MODULE_4__.capitalize),
/* harmony export */   deepMerge: () => (/* reexport safe */ _deep_merge__WEBPACK_IMPORTED_MODULE_11__.deepMerge),
/* harmony export */   extractColors: () => (/* reexport safe */ _extract_colors__WEBPACK_IMPORTED_MODULE_7__.extractColors),
/* harmony export */   extractCssVars: () => (/* reexport safe */ _extract_css_vars__WEBPACK_IMPORTED_MODULE_8__.extractCssVars),
/* harmony export */   flattenObject: () => (/* reexport safe */ _flatten_object__WEBPACK_IMPORTED_MODULE_9__.flattenObject),
/* harmony export */   formatCustomProperty: () => (/* reexport safe */ _format_custom_property__WEBPACK_IMPORTED_MODULE_6__.formatCustomProperty),
/* harmony export */   getBodyComputedStyle: () => (/* reexport safe */ _get_computed_style__WEBPACK_IMPORTED_MODULE_14__.getBodyComputedStyle),
/* harmony export */   getComputedStyle: () => (/* reexport safe */ _get_computed_style__WEBPACK_IMPORTED_MODULE_14__.getDomComputedStyle),
/* harmony export */   getCustomBlockSupportConfig: () => (/* reexport safe */ _block_supports__WEBPACK_IMPORTED_MODULE_0__.getCustomBlockSupportConfig),
/* harmony export */   getDocumentComputedStyle: () => (/* reexport safe */ _get_computed_style__WEBPACK_IMPORTED_MODULE_14__.getDocumentComputedStyle),
/* harmony export */   getExtension: () => (/* reexport safe */ _block_extensions__WEBPACK_IMPORTED_MODULE_1__.getExtension),
/* harmony export */   getExtensionSetting: () => (/* reexport safe */ _block_extensions__WEBPACK_IMPORTED_MODULE_1__.getExtensionSetting),
/* harmony export */   getPloverSupport: () => (/* reexport safe */ _block_supports__WEBPACK_IMPORTED_MODULE_0__.getPloverSupport),
/* harmony export */   getPloverThemeSettings: () => (/* reexport safe */ _plover_theme__WEBPACK_IMPORTED_MODULE_2__.getPloverThemeSettings),
/* harmony export */   getScalarValueByDevice: () => (/* reexport safe */ _responsive__WEBPACK_IMPORTED_MODULE_12__.getScalarValueByDevice),
/* harmony export */   hasExtension: () => (/* reexport safe */ _block_extensions__WEBPACK_IMPORTED_MODULE_1__.hasExtension),
/* harmony export */   hasPloverSupport: () => (/* reexport safe */ _block_supports__WEBPACK_IMPORTED_MODULE_0__.hasPloverSupport),
/* harmony export */   isString: () => (/* reexport safe */ _type_assert__WEBPACK_IMPORTED_MODULE_3__.isString),
/* harmony export */   is_premium: () => (/* reexport safe */ _upsell__WEBPACK_IMPORTED_MODULE_13__.is_premium),
/* harmony export */   promoteScalarValueIntoResponsive: () => (/* reexport safe */ _responsive__WEBPACK_IMPORTED_MODULE_12__.promoteScalarValueIntoResponsive),
/* harmony export */   readFile: () => (/* reexport safe */ _read_files_sync__WEBPACK_IMPORTED_MODULE_10__.readFile),
/* harmony export */   readFilesSync: () => (/* reexport safe */ _read_files_sync__WEBPACK_IMPORTED_MODULE_10__.readFilesSync),
/* harmony export */   replaceAll: () => (/* reexport safe */ _str_utils__WEBPACK_IMPORTED_MODULE_4__.replaceAll),
/* harmony export */   replaceColorsWithPlaceholder: () => (/* reexport safe */ _extract_colors__WEBPACK_IMPORTED_MODULE_7__.replaceColorsWithPlaceholder),
/* harmony export */   titleCase: () => (/* reexport safe */ _str_utils__WEBPACK_IMPORTED_MODULE_4__.titleCase),
/* harmony export */   upsell_url: () => (/* reexport safe */ _upsell__WEBPACK_IMPORTED_MODULE_13__.upsell_url),
/* harmony export */   useSettings: () => (/* reexport safe */ _use_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)
/* harmony export */ });
/* harmony import */ var _block_supports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block-supports */ "./static/packages/utils/block-supports.js");
/* harmony import */ var _block_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block-extensions */ "./static/packages/utils/block-extensions.js");
/* harmony import */ var _plover_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plover-theme */ "./static/packages/utils/plover-theme.js");
/* harmony import */ var _type_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type-assert */ "./static/packages/utils/type-assert.js");
/* harmony import */ var _str_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./str-utils */ "./static/packages/utils/str-utils.js");
/* harmony import */ var _use_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-settings */ "./static/packages/utils/use-settings.js");
/* harmony import */ var _format_custom_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./format-custom-property */ "./static/packages/utils/format-custom-property.js");
/* harmony import */ var _extract_colors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extract-colors */ "./static/packages/utils/extract-colors.js");
/* harmony import */ var _extract_css_vars__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extract-css-vars */ "./static/packages/utils/extract-css-vars.js");
/* harmony import */ var _flatten_object__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./flatten-object */ "./static/packages/utils/flatten-object.js");
/* harmony import */ var _read_files_sync__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./read-files-sync */ "./static/packages/utils/read-files-sync.js");
/* harmony import */ var _deep_merge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./deep-merge */ "./static/packages/utils/deep-merge.js");
/* harmony import */ var _responsive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./responsive */ "./static/packages/utils/responsive.js");
/* harmony import */ var _upsell__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./upsell */ "./static/packages/utils/upsell.js");
/* harmony import */ var _get_computed_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./get-computed-style */ "./static/packages/utils/get-computed-style.js");















})();

(window.plover = window.plover || {}).utils = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map