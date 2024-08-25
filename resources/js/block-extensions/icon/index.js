/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/scripts/block-extensions/icon/IconControls.jsx":
/*!***************************************************************!*\
  !*** ./static/scripts/block-extensions/icon/IconControls.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IconControls)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _plover_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @plover/components */ "@plover/components");
/* harmony import */ var _plover_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_plover_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "./static/scripts/block-extensions/icon/utils.js");

/**
 * WordPress dependencies
 */






/**
 * Plover dependencies
 */



/**
 * External dependencies
 */


/**
 * Internal dependencies
 */

const ICONS_PRE_ROW = 5;
function IconPicker({
  current,
  icons,
  onChange
}) {
  const [keyword, setKeyword] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const filteredIcons = icons.filter(({
    tags,
    slug,
    name
  }) => {
    if (keyword.trim() === '') {
      return true;
    }
    const keys = (tags !== null && tags !== void 0 ? tags : []).join('') + slug + name;
    return keys.toLowerCase().includes(keyword.trim().toLowerCase());
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalDropdownContentWrapper, {
    paddingSize: "none",
    className: "plover-icon-settings-panel__popover-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
    spacing: "12px"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter', 'plover'),
    value: keyword,
    onChange: setKeyword
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "plover-icon-settings-panel__icon-list",
    style: {
      width: '300px',
      height: '240px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_6__.AutoSizer, null, ({
    width,
    height
  }) => {
    // Pay attention to the width of sidebar
    const ICONS_PREVIEW_SIZE = Math.floor((width - 16) / ICONS_PRE_ROW);
    const COLUMN_WIDTH = ICONS_PREVIEW_SIZE;
    const ROW_HEIGHT = ICONS_PREVIEW_SIZE;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_6__.FixedSizeGrid, {
      itemData: filteredIcons,
      columnCount: ICONS_PRE_ROW,
      columnWidth: COLUMN_WIDTH,
      rowCount: Math.ceil(filteredIcons.length / ICONS_PRE_ROW),
      rowHeight: ROW_HEIGHT,
      height: height,
      width: width
    }, ({
      columnIndex,
      rowIndex,
      style
    }) => {
      const i = ICONS_PRE_ROW * rowIndex + columnIndex;
      const icon = filteredIcons[i];
      if (!icon) {
        return null;
      }
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: style,
        className: "plover-icon-settings-panel__icon-preview-wrap"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        "aria-label": icon.name,
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_8__["default"])({
          'plover-icon-settings-panel__icon-preview': true,
          'active': (0,_utils__WEBPACK_IMPORTED_MODULE_9__.isSlugEqual)(current, icon.slug)
        }),
        dangerouslySetInnerHTML: {
          __html: icon.svg
        },
        onClick: () => {
          onChange({
            icon: String(icon.slug),
            svg: icon.svg
          });
        }
      }));
    });
  })), filteredIcons.length <= 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "plover-icon-settings-panel__no-result"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No icons', 'plover'))));
}
function IconSelector({
  attributes,
  setAttributes
}) {
  var _libraries$find, _currentLibrary$slug;
  const {
    iconSlug,
    iconSvgString,
    iconLibrary
  } = attributes;
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [icons, setIcons] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
  const libraries = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_7__.getExtensionSetting)('icon', 'libraries', {});
  const currentLibrary = (_libraries$find = libraries.find(({
    slug
  }) => (0,_utils__WEBPACK_IMPORTED_MODULE_9__.isSlugEqual)(slug, iconLibrary))) !== null && _libraries$find !== void 0 ? _libraries$find : {};
  const currentIcon = icons.find(({
    slug
  }) => (0,_utils__WEBPACK_IMPORTED_MODULE_9__.isSlugEqual)(slug, iconSlug));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!currentLibrary?.slug || currentLibrary?.slug === 'none') {
      setIcons([]);
      return;
    }
    setLoading(true);
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.resolveSelect)('plover/icons').getIcons(currentLibrary?.slug).then(({
      library,
      icons
    }) => {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_9__.isSlugEqual)(library, iconLibrary)) {
        setIcons(icons !== null && icons !== void 0 ? icons : []);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [iconLibrary]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon library', 'plover'),
    value: (_currentLibrary$slug = currentLibrary?.slug) !== null && _currentLibrary$slug !== void 0 ? _currentLibrary$slug : 'none',
    options: [{
      label: 'None',
      value: 'none'
    }, ...libraries.map(({
      name,
      slug
    }) => {
      return {
        label: name,
        value: slug
      };
    })],
    onChange: value => {
      setAttributes({
        iconLibrary: value === 'none' ? null : value,
        iconSlug: null,
        iconSvgString: null
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select icon', 'plover')
  }, loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_6__.Popover, {
    className: "plover-icon-settings-panel__icon-picker",
    toggle: {
      icon: currentLibrary?.slug ? iconSvgString : '',
      label: currentLibrary?.name ? currentLibrary?.name + ' / ' + (currentIcon ? (0,_plover_utils__WEBPACK_IMPORTED_MODULE_7__.titleCase)(currentIcon?.name) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'plover')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'plover')
    },
    renderContent: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(IconPicker, {
      current: iconSlug,
      icons: icons,
      onChange: ({
        icon,
        svg
      }) => {
        setAttributes({
          iconSlug: icon,
          iconSvgString: svg
        });
      }
    })
  })));
}
function IconControls({
  attributes,
  setAttributes,
  position = true,
  clear = true
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon', 'plover'),
    className: "block-editor-plover-inspector__icons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(IconSelector, {
    attributes: attributes,
    setAttributes: setAttributes
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_6__.Tips, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use the %s plugin to get more icons from the Icon Library.', 'plover'), '<a href="https://wpplover.com/plugins/plover-kit/" target="_blank">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Plover Kit', 'plover') + '</a>')
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wpplover.com/docs/plover-kit/modules/icon-library/",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Documentation ↗', 'plover')))), position && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
    isBlock: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon position', 'plover'),
    value: attributes.iconPosition,
    onChange: position => {
      setAttributes({
        iconPosition: position
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
    value: "left",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'plover')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
    value: "right",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'plover')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_plover_components__WEBPACK_IMPORTED_MODULE_6__.UnitSlider, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon Size', 'plover'),
    value: attributes.iconSize,
    min: 10,
    onChange: value => {
      setAttributes({
        iconSize: value
      });
    }
  }), clear && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "tertiary",
    onClick: () => {
      setAttributes({
        iconLibrary: null,
        iconSlug: null,
        iconSvgString: null
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear icon', 'plover'))));
}

/***/ }),

/***/ "./static/scripts/block-extensions/icon/IconVariationEdit.jsx":
/*!********************************************************************!*\
  !*** ./static/scripts/block-extensions/icon/IconVariationEdit.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IconVariationEdit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _IconControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IconControls */ "./static/scripts/block-extensions/icon/IconControls.jsx");

/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */


/**
 * Internal dependencies
 */

function IconVariationEdit(props) {
  const {
    attributes,
    setAttributes,
    className,
    isSelected,
    isRTL
  } = props;
  const {
    align,
    iconSize,
    iconSvgString
  } = attributes;
  const blockEditingMode = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockEditingMode)();
  const classes = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(className, {
    [`has-text-align-${align}`]: align
  });
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: classes
  });
  const controls = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, blockEditingMode === 'default' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
    group: "block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.AlignmentControl, {
    value: align,
    onChange: newAlign => setAttributes({
      align: newAlign,
      dropCap: false
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_IconControls__WEBPACK_IMPORTED_MODULE_4__["default"], {
    position: false,
    clear: false,
    ...props,
    setAttributes: attrs => {
      setAttributes(attrs?.iconSvgString === undefined ? attrs : {
        ...attrs,
        content: ''
      });
    }
  }));
  let showRightHandle = false;
  let showLeftHandle = false;
  if (align === 'center') {
    // When the image is centered, show both handles.
    showRightHandle = true;
    showLeftHandle = true;
  } else if (isRTL) {
    // In RTL mode the image is on the right by default.
    // Show the right handle and hide the left handle only when it is aligned left.
    // Otherwise, always show the left handle.
    showRightHandle = align === 'left';
    showLeftHandle = align !== 'left';
  } else {
    // Show the left handle and hide the right handle only when the image is aligned right.
    // Otherwise always show the right handle.
    showLeftHandle = align === 'right';
    showRightHandle = align !== 'right';
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, controls, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ResizableBox, {
    enable: {
      bottom: true,
      left: showLeftHandle,
      right: showRightHandle,
      top: false
    },
    lockAspectRatio: true,
    showHandle: isSelected,
    style: {
      display: 'inline-block'
    },
    size: {
      width: iconSize,
      height: iconSize
    },
    onResizeStop: (_event, _direction, _elt, delta) => {
      const newValue = parseInt(parseInt(iconSize) + delta.width, 10) + 'px';
      setAttributes({
        iconSize: newValue
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: iconSvgString
    }
  }))));
}

/***/ }),

/***/ "./static/scripts/block-extensions/icon/index.jsx":
/*!********************************************************!*\
  !*** ./static/scripts/block-extensions/icon/index.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @plover/utils */ "@plover/utils");
/* harmony import */ var _plover_utils__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_plover_utils__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _plover_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @plover/icons */ "@plover/icons");
/* harmony import */ var _plover_icons__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_plover_icons__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _IconControls__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./IconControls */ "./static/scripts/block-extensions/icon/IconControls.jsx");
/* harmony import */ var _IconVariationEdit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./IconVariationEdit */ "./static/scripts/block-extensions/icon/IconVariationEdit.jsx");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./store */ "./static/scripts/block-extensions/icon/store.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils */ "./static/scripts/block-extensions/icon/utils.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./style.scss */ "./static/scripts/block-extensions/icon/style.scss");

/**
 * WordPress dependencies
 */







/**
 * External dependencies
 */


/**
 * Plover dependencies
 */



/**
 * Internal dependencies
 */





const defaultIcon = {
  'library': 'plover-core',
  'slug': 'star',
  'size': '24px',
  'svg': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path></svg>'
};
const defaultAttributes = {
  iconLibrary: {
    type: 'string'
  },
  iconSlug: {
    type: 'string'
  },
  iconPosition: {
    type: 'string',
    default: 'right'
  },
  iconSize: {
    type: 'string',
    default: '18px'
  },
  iconSvgString: {
    type: 'string'
  }
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'plover/icon-attributes', (settings, name) => {
  const supported_blocks = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_8__.getExtensionSetting)('icon', 'blocks', []);
  if (supported_blocks.includes(name)) {
    settings.attributes = {
      ...settings.attributes,
      ...(0,_plover_utils__WEBPACK_IMPORTED_MODULE_8__.getExtensionSetting)('icon', 'attributes', defaultAttributes)
    };
  }
  return settings;
});
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'plover/icon-controls', BlockEdit => {
  return props => {
    const {
      name,
      attributes
    } = props;
    const supported_blocks = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_8__.getExtensionSetting)('icon', 'blocks', []);
    if (!supported_blocks.includes(name)) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    if (name === 'core/paragraph') {
      // normal paragraph
      if (!attributes?.className?.includes('is-style-icon')) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
          ...props
        });
      }

      // plover icon variation
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_IconVariationEdit__WEBPACK_IMPORTED_MODULE_11__["default"], {
        ...props
      });
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_IconControls__WEBPACK_IMPORTED_MODULE_10__["default"], {
      ...props
    }));
  };
}, 5);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockListBlock', 'plover/with-icon-styles', (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    const supported_blocks = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_8__.getExtensionSetting)('icon', 'blocks', []);
    const {
      attributes,
      name,
      clientId
    } = props;
    const icon_libraries = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_8__.getExtensionSetting)('icon', 'libraries', {});
    if (!supported_blocks.includes(name)) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
        ...props
      });
    }
    const classes = (0,clsx__WEBPACK_IMPORTED_MODULE_7__["default"])(props?.className, {
      ['icon-library-not-available']: !icon_libraries.find(({
        slug
      }) => (0,_utils__WEBPACK_IMPORTED_MODULE_13__.isSlugEqual)(slug, attributes?.iconLibrary)),
      [`has-icon__${attributes?.iconSlug}`]: attributes?.iconSlug,
      [`has-icon-position__${attributes?.iconPosition}`]: attributes?.iconPosition
    });
    let css = '';
    if (attributes?.iconSvgString) {
      css += `--wp--custom--icon--url: url('data:image/svg+xml;utf8,${attributes.iconSvgString}');`;
      if (attributes?.iconSize) {
        css += `--wp--custom--icon--size: ${attributes.iconSize};`;
      }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, css && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, '#block-' + clientId + '{' + css + '}'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
      ...props,
      className: classes
    }));
  };
}, 'withIcon'));
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default()(() => {
  const supported_blocks = (0,_plover_utils__WEBPACK_IMPORTED_MODULE_8__.getExtensionSetting)('icon', 'blocks', []);
  if (!supported_blocks.includes('core/paragraph')) {
    return;
  }
  const variations = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.getBlockVariations)('core/paragraph');
  if (!variations.some(variation => 'plover-icon' === variation.name)) {
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.registerBlockVariation)('core/paragraph', {
      name: 'plover-icon',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Plover: Icon', 'plover'),
      icon: _plover_icons__WEBPACK_IMPORTED_MODULE_9__.starOutline,
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Insert a SVG icon.', 'plover'),
      category: 'media',
      keywords: ['icon', 'plover', 'svg'],
      attributes: {
        className: 'is-style-icon',
        align: 'center',
        iconLibrary: defaultIcon.library,
        iconSlug: defaultIcon.slug,
        iconSize: defaultIcon.size,
        iconSvgString: defaultIcon.svg,
        content: ''
      },
      scope: ['block', 'inserter', 'transform'],
      isActive: blockAttributes => {
        return blockAttributes && blockAttributes?.className?.includes('is-style-icon');
      }
    });
  }
});
if (_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.register) {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.register)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.createReduxStore)(_store__WEBPACK_IMPORTED_MODULE_12__["default"].name, _store__WEBPACK_IMPORTED_MODULE_12__["default"].options));
} else {
  // WP 5.4 - WP5.6
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.registerStore)(_store__WEBPACK_IMPORTED_MODULE_12__["default"].name, _store__WEBPACK_IMPORTED_MODULE_12__["default"].options);
}

/***/ }),

/***/ "./static/scripts/block-extensions/icon/store.js":
/*!*******************************************************!*\
  !*** ./static/scripts/block-extensions/icon/store.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _plover_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @plover/api */ "@plover/api");
/* harmony import */ var _plover_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plover_api__WEBPACK_IMPORTED_MODULE_0__);


/*
Example data structure

const state = {
    libraries: {
        lib_slug: {
            icon_slug: {s:'svg raw string', t:['tags']}
        }
    }
}
 */
const DEFAULT_STATE = {
  libraries: {}
};
const actions = {
  fetchIconsFromAPI(library) {
    return {
      type: 'FETCH_ICONS_FROM_API',
      library
    };
  },
  setIcons: (library, {
    icons
  }) => {
    return {
      type: 'SET_LIBRARY_ICONS',
      library,
      icons
    };
  }
};
const iconsStore = {
  name: 'plover/icons',
  options: {
    reducer(state = DEFAULT_STATE, action) {
      switch (action.type) {
        case 'SET_LIBRARY_ICONS':
          {
            state = {
              ...state,
              libraries: {
                ...state.libraries,
                [action.library]: action.icons
              }
            };
          }
      }
      return state;
    },
    actions,
    selectors: {
      getIcons: (state, library) => {
        var _state$libraries$libr;
        const icons = (_state$libraries$libr = state.libraries[library]) !== null && _state$libraries$libr !== void 0 ? _state$libraries$libr : {};
        return {
          library,
          icons
        };
      }
    },
    controls: {
      FETCH_ICONS_FROM_API({
        library
      }) {
        return (0,_plover_api__WEBPACK_IMPORTED_MODULE_0__.fetchIcons)(library);
      }
    },
    resolvers: {
      *getIcons(library) {
        const data = yield actions.fetchIconsFromAPI(library);
        return actions.setIcons(library, data);
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (iconsStore);

/***/ }),

/***/ "./static/scripts/block-extensions/icon/utils.js":
/*!*******************************************************!*\
  !*** ./static/scripts/block-extensions/icon/utils.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSlugEqual: () => (/* binding */ isSlugEqual)
/* harmony export */ });
/**
 * Utils for checking slug
 *
 * @param l
 * @param r
 * @returns {boolean}
 */
function isSlugEqual(l, r) {
  if (typeof l === 'number' || typeof r === 'number') {
    return Number(l) === Number(r);
  }
  return l === r;
}

/***/ }),

/***/ "./static/scripts/block-extensions/icon/style.scss":
/*!*********************************************************!*\
  !*** ./static/scripts/block-extensions/icon/style.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@plover/api":
/*!*********************************!*\
  !*** external ["plover","api"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["plover"]["api"];

/***/ }),

/***/ "@plover/components":
/*!****************************************!*\
  !*** external ["plover","components"] ***!
  \****************************************/
/***/ ((module) => {

module.exports = window["plover"]["components"];

/***/ }),

/***/ "@plover/icons":
/*!***********************************!*\
  !*** external ["plover","icons"] ***!
  \***********************************/
/***/ ((module) => {

module.exports = window["plover"]["icons"];

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

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

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

/***/ "./node_modules/clsx/dist/clsx.mjs":
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"block-extensions-icon": 0,
/******/ 			"./style-block-extensions-icon": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkplover_core"] = globalThis["webpackChunkplover_core"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-block-extensions-icon"], () => (__webpack_require__("./static/scripts/block-extensions/icon/index.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map