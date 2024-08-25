/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/scripts/block-extensions/highlight/HighlightControls.jsx":
/*!*************************************************************************!*\
  !*** ./static/scripts/block-extensions/highlight/HighlightControls.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _plover_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @plover/components */ "@plover/components");
/* harmony import */ var _plover_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_plover_components__WEBPACK_IMPORTED_MODULE_6__);

/**
 * WordPress dependencies
 */





/**
 * Plover dependencies
 */


const HighlightControls = ({
  attributes,
  setAttributes
}) => {
  const highlightControls = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
    isBlock: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Style', 'plover'),
    value: attributes.highlight,
    onChange: highlight => {
      setAttributes({
        highlight
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
    value: "highlight",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Highlight', 'plover')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
    value: "none",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'plover')
  })), attributes.highlight === 'highlight' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Theme', 'plover'),
    value: attributes.theme,
    options: (0,_plover_utils__WEBPACK_IMPORTED_MODULE_5__.getExtensionSetting)('highlight', 'support_themes', []),
    onChange: theme => setAttributes({
      theme
    }),
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Language', 'plover'),
    value: attributes.language,
    options: (0,_plover_utils__WEBPACK_IMPORTED_MODULE_5__.getExtensionSetting)('highlight', 'support_languages', []),
    onChange: language => setAttributes({
      language
    }),
    __nextHasNoMarginBottom: true
  })));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.applyFilters)('plover.highlight.InspectorControls', highlightControls, attributes, setAttributes), !(0,_plover_utils__WEBPACK_IMPORTED_MODULE_5__.is_premium)() && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_6__.Tips, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Upgrade to %s to access these features:', 'plover'), '<a href="' + (0,_plover_utils__WEBPACK_IMPORTED_MODULE_5__.upsell_url)() + '">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Premium', 'plover') + '</a>')
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Line numbers', 'plover')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show languages', 'plover')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show copy button', 'plover')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('More highlight themes', 'plover'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wpplover.com/docs/plover-kit/modules/code-highlight/",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Learn More ↗', 'plover')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HighlightControls);

/***/ }),

/***/ "./static/scripts/block-extensions/highlight/HighlightEdit.jsx":
/*!*********************************************************************!*\
  !*** ./static/scripts/block-extensions/highlight/HighlightEdit.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HighlightEdit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function HighlightEdit({
  BlockEdit,
  ...props
}) {
  const {
    attributes
  } = props;
  const blockWrapProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const alignClassnames = blockWrapProps.className.split(' ').filter(c => c.startsWith('align')).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `prism-${attributes.theme}-theme ${alignClassnames}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
    ...props
  }));
}

/***/ }),

/***/ "./static/scripts/block-extensions/highlight/HighlightPreview.jsx":
/*!************************************************************************!*\
  !*** ./static/scripts/block-extensions/highlight/HighlightPreview.jsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);

/**
 * WordPress dependencies
 */





const HighlightPreview = ({
  attributes,
  ...props
}) => {
  const wrap = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const blockWrapProps = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('plover.highlight.previewWrapProps', (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('plover.highlight.previewClassnames', {
      [`plover-prism prism-${attributes.theme}-theme`]: true,
      [`language-${attributes.language}`]: true
    }, attributes)
  }), attributes);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (wrap && wrap.current && window.Prism) {
      window.Prism.highlightElement(wrap.current, false);
    }
  }, [wrap, attributes?.content, attributes.theme]);
  return (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('plover.highlight.previewBlockEdit', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", {
    ...blockWrapProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
    ref: wrap
  }, (0,_plover_utils__WEBPACK_IMPORTED_MODULE_4__.isString)(attributes?.content) // backwards compatible
  ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.RawHTML, null, attributes?.content) : (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__.getTextContent)(attributes?.content))), {
    attributes,
    blockWrapProps,
    ...props
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HighlightPreview);

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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["richText"];

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
/*!*************************************************************!*\
  !*** ./static/scripts/block-extensions/highlight/index.jsx ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _HighlightPreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HighlightPreview */ "./static/scripts/block-extensions/highlight/HighlightPreview.jsx");
/* harmony import */ var _HighlightEdit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HighlightEdit */ "./static/scripts/block-extensions/highlight/HighlightEdit.jsx");
/* harmony import */ var _HighlightControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HighlightControls */ "./static/scripts/block-extensions/highlight/HighlightControls.jsx");

/**
 * WordPress dependencies
 */


/**
 * Plover dependencies
 */


/**
 * Internal dependencies
 */



const defaultAttributes = {
  highlight: {
    type: 'string',
    default: 'highlight'
  },
  theme: {
    type: 'string',
    default: 'github-copilot'
  },
  language: {
    type: 'string',
    default: 'clike'
  }
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'plover/highlight-attributes', (settings, name) => {
  if ('core/code' === name) {
    settings.attributes = {
      ...settings.attributes,
      ...(0,_plover_utils__WEBPACK_IMPORTED_MODULE_2__.getExtensionSetting)('highlight', 'attributes', defaultAttributes)
    };
  }
  return settings;
});
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'plover/highlight-controls', BlockEdit => {
  return props => {
    const {
      attributes,
      isSelected,
      name
    } = props;
    if (name !== 'core/code') {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, attributes.highlight === 'none' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }) : isSelected ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HighlightEdit__WEBPACK_IMPORTED_MODULE_4__["default"], {
      BlockEdit: BlockEdit,
      ...props
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HighlightPreview__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ...props
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HighlightControls__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ...props
    }));
  };
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map