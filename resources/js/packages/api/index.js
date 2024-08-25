/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/packages/api/batch.js":
/*!**************************************!*\
  !*** ./static/packages/api/batch.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   batchApiRequest: () => (/* binding */ batchApiRequest),
/* harmony export */   fetchBatchOptions: () => (/* binding */ fetchBatchOptions)
/* harmony export */ });
/* harmony import */ var _cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cancelable-fetch */ "./static/packages/api/cancelable-fetch.js");


/**
 * @param array
 * @param chunk_size
 * @returns []
 */
function array_to_chunks(array, chunk_size) {
  return array.reduce((chunks, value, index) => {
    const chunkIndex = Math.floor(index / chunk_size);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(value);
    return chunks;
  }, []);
}

/**
 * Get batch api options.
 *
 * @returns Promise
 */
function fetchBatchOptions() {
  return (0,_cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__.cancelableFetch)({
    path: '/batch/v1',
    method: 'OPTIONS'
  });
}
async function batchApiRequest(limit, data, requestGenerator, requestHandler) {
  const chunks = array_to_chunks(data, limit);
  for (const chunk of chunks) {
    const requests = [];
    for (const item of chunk) {
      requests.push(requestGenerator(item));
    }
    const batchRequest = (0,_cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__.cancelableFetch)({
      path: '/batch/v1',
      method: 'POST',
      data: {
        requests
      }
    });
    if (requestHandler) {
      requestHandler(batchRequest);
    }
    await batchRequest;
  }
}

/***/ }),

/***/ "./static/packages/api/cancelable-fetch.js":
/*!*************************************************!*\
  !*** ./static/packages/api/cancelable-fetch.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelableFetch: () => (/* binding */ cancelableFetch)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * @param args
 * @returns {Promise<unknown>}
 */
function cancelableFetch(args) {
  const controller = typeof AbortController === 'undefined' ? undefined : new AbortController();
  const promise = _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    ...args,
    signal: controller?.signal
  });
  promise.cancel = () => controller?.abort();
  return promise;
}

/***/ }),

/***/ "./static/packages/api/fetch-icons.js":
/*!********************************************!*\
  !*** ./static/packages/api/fetch-icons.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchIcons: () => (/* binding */ fetchIcons)
/* harmony export */ });
/* harmony import */ var _cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cancelable-fetch */ "./static/packages/api/cancelable-fetch.js");

function fetchIcons(library) {
  return (0,_cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__.cancelableFetch)({
    path: `/plover/v1/icons/${library}`,
    method: 'GET'
  });
}

/***/ }),

/***/ "./static/packages/api/update-setting-fields.js":
/*!******************************************************!*\
  !*** ./static/packages/api/update-setting-fields.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateSettingFields: () => (/* binding */ updateSettingFields)
/* harmony export */ });
/* harmony import */ var _cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cancelable-fetch */ "./static/packages/api/cancelable-fetch.js");

function updateSettingFields(group, data) {
  return (0,_cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__.cancelableFetch)({
    path: `/plover/v1/settings/${group}`,
    method: 'POST',
    data: data
  });
}

/***/ }),

/***/ "./static/packages/api/update-setting-groups.js":
/*!******************************************************!*\
  !*** ./static/packages/api/update-setting-groups.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateSettingGroups: () => (/* binding */ updateSettingGroups)
/* harmony export */ });
/* harmony import */ var _cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cancelable-fetch */ "./static/packages/api/cancelable-fetch.js");

function updateSettingGroups(groups) {
  return (0,_cancelable_fetch__WEBPACK_IMPORTED_MODULE_0__.cancelableFetch)({
    path: `/plover/v1/settings`,
    method: 'POST',
    data: groups
  });
}

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

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
/*!**************************************!*\
  !*** ./static/packages/api/index.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   batchApiRequest: () => (/* reexport safe */ _batch__WEBPACK_IMPORTED_MODULE_0__.batchApiRequest),
/* harmony export */   fetchBatchOptions: () => (/* reexport safe */ _batch__WEBPACK_IMPORTED_MODULE_0__.fetchBatchOptions),
/* harmony export */   fetchIcons: () => (/* reexport safe */ _fetch_icons__WEBPACK_IMPORTED_MODULE_1__.fetchIcons),
/* harmony export */   updateSettingFields: () => (/* reexport safe */ _update_setting_fields__WEBPACK_IMPORTED_MODULE_2__.updateSettingFields),
/* harmony export */   updateSettingGroups: () => (/* reexport safe */ _update_setting_groups__WEBPACK_IMPORTED_MODULE_3__.updateSettingGroups)
/* harmony export */ });
/* harmony import */ var _batch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batch */ "./static/packages/api/batch.js");
/* harmony import */ var _fetch_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch-icons */ "./static/packages/api/fetch-icons.js");
/* harmony import */ var _update_setting_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update-setting-fields */ "./static/packages/api/update-setting-fields.js");
/* harmony import */ var _update_setting_groups__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update-setting-groups */ "./static/packages/api/update-setting-groups.js");




})();

(window.plover = window.plover || {}).api = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map