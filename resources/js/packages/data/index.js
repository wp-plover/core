/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/packages/data/constants.js":
/*!*******************************************!*\
  !*** ./static/packages/data/constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockEditorStore: () => (/* binding */ blockEditorStore),
/* harmony export */   blocksStore: () => (/* binding */ blocksStore),
/* harmony export */   coreStore: () => (/* binding */ coreStore),
/* harmony export */   noticesStore: () => (/* binding */ noticesStore)
/* harmony export */ });
const blockEditorStore = 'core/block-editor';
const blocksStore = 'core/blocks';
const coreStore = 'core';
const noticesStore = 'core/notices';

/***/ }),

/***/ "./static/packages/data/device-type/hooks.js":
/*!***************************************************!*\
  !*** ./static/packages/data/device-type/hooks.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDeviceType: () => (/* binding */ useDeviceType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Responsive device hook
 *
 * @returns []
 */
function useDeviceType() {
  const deviceType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    return select('plover/responsive-device-type').getPreviewDeviceType();
  }, []);
  const {
    setPreviewDeviceType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)('plover/responsive-device-type');
  return [deviceType, setPreviewDeviceType];
}

/***/ }),

/***/ "./static/packages/data/device-type/store.js":
/*!***************************************************!*\
  !*** ./static/packages/data/device-type/store.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_1__);


const DEFAULT_STATE = {
  deviceType: 'desktop'
};
const storeOptions = {
  name: 'plover/responsive-device-type',
  options: {
    reducer(state = DEFAULT_STATE, action) {
      switch (action.type) {
        case 'SET_PREVIEW_DEVICE_TYPE':
          return {
            ...state,
            deviceType: action.payload
          };
      }
      return state;
    },
    actions: {
      setPreviewDeviceType: function (deviceType) {
        // post or site editor
        const _ref = 'site-editor' === window.pagenow ? (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/edit-site') : (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/edit-post') || false,
          setPreviewDeviceType = _ref.__experimentalSetPreviewDeviceType;
        if (setPreviewDeviceType) {
          setPreviewDeviceType((0,_plover_utils__WEBPACK_IMPORTED_MODULE_1__.capitalize)(deviceType));
        }

        // customize preview
        if ('customize' === (window ? window.pagenow : undefined)) {
          if (wp.customize) {
            wp.customize.previewedDevice(deviceType);
          }
        }
        return {
          type: 'SET_PREVIEW_DEVICE_TYPE',
          payload: deviceType
        };
      }
    },
    selectors: {
      getPreviewDeviceType: function (state) {
        var _select;
        const core = 'site-editor' === window.pagenow ? (_select = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor')) !== null && _select !== void 0 ? _select : (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-site') : (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-post');
        if (core && core.getDeviceType) {
          return core.getDeviceType().toLowerCase();
        }
        if (core && core.__experimentalGetPreviewDeviceType) {
          return core.__experimentalGetPreviewDeviceType().toLowerCase();
        }
        return state.deviceType;
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storeOptions);

/***/ }),

/***/ "@plover/utils":
/*!***********************************!*\
  !*** external ["plover","utils"] ***!
  \***********************************/
/***/ ((module) => {

module.exports = window["plover"]["utils"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

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
/*!***************************************!*\
  !*** ./static/packages/data/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockEditorStore: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.blockEditorStore),
/* harmony export */   blocksStore: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.blocksStore),
/* harmony export */   coreStore: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.coreStore),
/* harmony export */   noticesStore: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.noticesStore),
/* harmony export */   useDeviceType: () => (/* reexport safe */ _device_type_hooks__WEBPACK_IMPORTED_MODULE_3__.useDeviceType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _device_type_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./device-type/store */ "./static/packages/data/device-type/store.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./static/packages/data/constants.js");
/* harmony import */ var _device_type_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./device-type/hooks */ "./static/packages/data/device-type/hooks.js");


// register device store


if (_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register) {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_device_type_store__WEBPACK_IMPORTED_MODULE_1__["default"].name, _device_type_store__WEBPACK_IMPORTED_MODULE_1__["default"].options));
} else {
  // WP 5.4 - WP5.6
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.registerStore)(_device_type_store__WEBPACK_IMPORTED_MODULE_1__["default"].name, _device_type_store__WEBPACK_IMPORTED_MODULE_1__["default"].options);
}

})();

(window.plover = window.plover || {}).data = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map