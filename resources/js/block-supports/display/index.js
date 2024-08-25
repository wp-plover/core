/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/scripts/block-supports/display/DisplayPanel.jsx":
/*!****************************************************************!*\
  !*** ./static/scripts/block-supports/display/DisplayPanel.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplayPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _plover_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @plover/components */ "@plover/components");
/* harmony import */ var _plover_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_plover_components__WEBPACK_IMPORTED_MODULE_5__);

/**
 * WordPress dependencies.
 */




/**
 * Plover dependencies.
 */


function DisplayPanel({
  name,
  attributes,
  setAttributes
}) {
  const ploverDisplay = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_4__.getPloverSupport)(name, 'ploverDisplay');
  // explicitly disable
  if (ploverDisplay === false) {
    return null;
  }
  const display = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_4__.getPloverSupport)(name, 'ploverDisplay')?.display;
  const order = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_4__.getPloverSupport)(name, 'ploverDisplay')?.order;

  // explicitly disable all props
  if (display === false && order === false) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display', 'plover'),
    initialOpen: false
  }, display !== false && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_5__.ResponsiveControl, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display', 'plover'),
    Component: _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl,
    value: attributes.cssDisplay,
    onChange: value => {
      setAttributes({
        cssDisplay: value
      });
    },
    controlProps: {
      options: [{
        label: '',
        value: ''
      }, ...(display?.options || [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'plover'),
        value: 'none'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Block', 'plover'),
        value: 'block'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inline', 'plover'),
        value: 'inline'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inline Block', 'plover'),
        value: 'inline-block'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inline Flex', 'plover'),
        value: 'flex'
      }])]
    }
  }), order !== false && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_5__.ResponsiveControl, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Order', 'plover'),
    Component: _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl,
    value: attributes.cssOrder,
    sanitizer: v => v === '' ? v : Number(v),
    onChange: value => {
      setAttributes({
        cssOrder: value
      });
    },
    controlProps: {
      min: 0,
      max: 10,
      step: 1
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_5__.Tips, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wpplover.com/docs/plover-kit/modules/css-display/",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Documentation ↗', 'plover')))));
}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@plover/components":
/*!****************************************!*\
  !*** external ["plover","components"] ***!
  \****************************************/
/***/ ((module) => {

module.exports = window["plover"]["components"];

/***/ }),

/***/ "@plover/data":
/*!**********************************!*\
  !*** external ["plover","data"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["plover"]["data"];

/***/ }),

/***/ "@plover/utils":
/*!***********************************!*\
  !*** external ["plover","utils"] ***!
  \***********************************/
/***/ ((module) => {

module.exports = window["plover"]["utils"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/*!*********************************************************!*\
  !*** ./static/scripts/block-supports/display/index.jsx ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _plover_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @plover/data */ "@plover/data");
/* harmony import */ var _plover_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_plover_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _DisplayPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DisplayPanel */ "./static/scripts/block-supports/display/DisplayPanel.jsx");

/**
 * WordPress dependencies
 */



/**
 * Plover dependencies
 */



/**
 * Internal dependencies.
 */

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'plover/display-attributes', (settings, name) => {
  const ploverDisplay = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_3__.getPloverSupport)(name, 'ploverDisplay');
  if (ploverDisplay === false) {
    return settings;
  }
  const displayAttributes = {};
  if (ploverDisplay?.display !== false) {
    displayAttributes['cssDisplay'] = {
      type: 'object'
    };
  }
  if (ploverDisplay?.order !== false) {
    displayAttributes['cssOrder'] = {
      type: 'object'
    };
  }
  settings.attributes = {
    ...settings.attributes,
    ...displayAttributes
  };
  return settings;
});
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockListBlock', 'plover/with-block-display-css', (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    var _props$attributes$css, _props$attributes$css2, _props$style;
    const {
      name
    } = props;
    const ploverDisplay = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_3__.getPloverSupport)(name, 'ploverDisplay');
    const defaultReturn = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
      ...props
    });
    if (ploverDisplay === false) {
      return defaultReturn;
    }
    const [deviceType] = (0,_plover_data__WEBPACK_IMPORTED_MODULE_4__.useDeviceType)();
    const cssDisplay = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_3__.getScalarValueByDevice)((_props$attributes$css = props?.attributes?.cssDisplay) !== null && _props$attributes$css !== void 0 ? _props$attributes$css : '', deviceType);
    const cssOrder = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_3__.getScalarValueByDevice)((_props$attributes$css2 = props?.attributes?.cssOrder) !== null && _props$attributes$css2 !== void 0 ? _props$attributes$css2 : '', deviceType);
    const displayStyle = {};
    if (cssDisplay) {
      displayStyle['display'] = cssDisplay;
    }
    if (cssOrder !== '') {
      displayStyle['order'] = Number(cssOrder);
    }
    props = {
      ...props,
      style: {
        ...((_props$style = props.style) !== null && _props$style !== void 0 ? _props$style : {}),
        ...displayStyle
      }
    };
    const wrapperProps = {
      ...props.wrapperProps,
      style: {
        ...props.wrapperProps?.style,
        ...displayStyle
      }
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
      ...props,
      wrapperProps: wrapperProps
    });
  };
}, 'withBlockDisplayCss'));
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'plover/display-controls', BlockEdit => {
  return props => {
    const {
      isSelected
    } = props;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }), isSelected && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DisplayPanel__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ...props
    }));
  };
}, 99);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map