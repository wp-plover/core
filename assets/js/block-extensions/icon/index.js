(()=>{"use strict";var e,t={593:()=>{const e=window.React,t=window.wp.hooks,n=window.wp.compose;function o(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var l=e.length;for(t=0;t<l;t++)e[t]&&(n=o(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}const r=function(){for(var e,t,n=0,r="",l=arguments.length;n<l;n++)(e=arguments[n])&&(t=o(e))&&(r&&(r+=" "),r+=t);return r},l=window.plover.utils,i=window.wp.blockEditor,c=window.wp.components,a=window.wp.i18n,s=window.wp.element,u=window.plover.components,p=window.plover.api;function v({current:t,icons:n,onChange:o}){const[l,i]=(0,s.useState)(""),u=Object.keys(n).filter((e=>{var t;return""===l.trim()||((null!==(t=n[e]?.t)&&void 0!==t?t:[]).join("|")+"|"+e).toLowerCase().includes(l.trim().toLowerCase())}));return(0,e.createElement)(c.__experimentalDropdownContentWrapper,{paddingSize:"none",className:"plover-icon-settings-panel__popover-content"},(0,e.createElement)(c.__experimentalVStack,{spacing:"12px"},(0,e.createElement)(c.TextControl,{label:(0,a.__)("Filter","plover"),value:l,onChange:i}),u.length?(0,e.createElement)("div",{className:"plover-icon-settings-panel__icon-list"},u.map(((l,i)=>(0,e.createElement)("button",{key:i,"aria-label":l,className:r({"plover-icon-settings-panel__icon-preview":!0,active:t===l}),dangerouslySetInnerHTML:{__html:n[l].s},onClick:()=>{o({icon:l,svg:n[l].s})}})))):(0,e.createElement)("p",{className:"plover-icon-settings-panel__no-result"},(0,a.__)("No icons","plover"))))}function g({attributes:t,setAttributes:n}){const{iconLibrary:o,iconSlug:r,iconSvgString:i}=t,[g,m]=(0,s.useState)(!1),[_,b]=(0,s.useState)(null),[d,S]=(0,s.useState)([]);return(0,s.useEffect)((()=>{if(!o||"none"===o)return void S([]);m(!0),_?.cancel();const e=(0,p.fetchIcons)(o);b(e),e.then((e=>{var t;S(null!==(t=e?.icons)&&void 0!==t?t:[])})).catch((()=>{S([])})).finally((()=>{m(!1)}))}),[o]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(c.SelectControl,{label:(0,a.__)("Icon library","plover"),value:null!=o?o:"none",options:[{label:"None",value:"none"},{label:"Plover",value:"plover"}],onChange:e=>{n({iconLibrary:"none"===e?null:e,iconSlug:null,iconSvgString:null})}}),(0,e.createElement)(c.BaseControl,{label:(0,a.__)("Select icon","plover")},g?(0,e.createElement)("div",null,(0,e.createElement)(c.Spinner,null)):(0,e.createElement)(u.Popover,{className:"plover-icon-settings-panel__icon-picker",toggle:{icon:i,label:(o?(0,l.titleCase)(o)+" / ":"")+(r?(0,l.titleCase)(r):(0,a.__)("None","none"))},renderContent:()=>(0,e.createElement)(v,{current:r,icons:d,onChange:({icon:e,svg:t})=>{n({iconSlug:e,iconSvgString:t})}})})))}function m({attributes:t,setAttributes:n}){return(0,e.createElement)(i.InspectorControls,null,(0,e.createElement)(c.PanelBody,{title:(0,a.__)("Icon","plover"),className:"block-editor-plover-inspector__icons"},(0,e.createElement)(g,{attributes:t,setAttributes:n}),(0,e.createElement)(c.__experimentalToggleGroupControl,{isBlock:!0,label:(0,a.__)("Icon position","plover"),value:t.iconPosition,onChange:e=>{n({iconPosition:e})}},(0,e.createElement)(c.__experimentalToggleGroupControlOption,{value:"left",label:(0,a.__)("Left","plover")}),(0,e.createElement)(c.__experimentalToggleGroupControlOption,{value:"right",label:(0,a.__)("Right","plover")})),(0,e.createElement)(u.UnitSlider,{label:(0,a.__)("Icon Size","plover"),value:t.iconSize,onChange:e=>{n({iconSize:e})}}),(0,e.createElement)(c.Button,{variant:"tertiary",onClick:()=>{n({iconLibrary:null,iconSlug:null,iconSvgString:null})}},(0,a.__)("Clear icon","plover"))))}const _={iconLibrary:{type:"string"},iconSlug:{type:"string"},iconPosition:{type:"string",default:"right"},iconSize:{type:"string",default:"18px"},iconSvgString:{type:"string"}};(0,t.addFilter)("blocks.registerBlockType","plover/icons-attributes",((e,t)=>((0,l.getExtensionSetting)("icon","blocks",[]).includes(t)&&(e.attributes={...e.attributes,...(0,l.getExtensionSetting)("icon","attributes",_)}),e))),(0,t.addFilter)("editor.BlockListBlock","plover/with-icon-styles",(0,n.createHigherOrderComponent)((t=>n=>{const{attributes:o,name:l,clientId:i}=n;if("core/button"!==l)return(0,e.createElement)(t,{...n});const c=r(n?.className,{[`has-icon__${o?.iconSlug}`]:o?.iconSlug,[`has-icon-position__${o?.iconPosition}`]:o?.iconPosition});let a="";return o?.iconSvgString&&(a+=`--wp--custom--icon--url: url('data:image/svg+xml;utf8,${o.iconSvgString}');`,o?.iconSize&&(a+=`--wp--custom--icon--size: ${o.iconSize};`)),(0,e.createElement)(e.Fragment,null,a&&(0,e.createElement)("style",null,"#block-"+i+"{"+a+"}"),(0,e.createElement)(t,{...n,className:c}))}),"withIcon")),(0,t.addFilter)("editor.BlockEdit","plover/icon-controls",(t=>n=>{const{name:o}=n;return"core/button"!==o?(0,e.createElement)(t,{...n}):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t,{...n}),(0,e.createElement)(m,{...n}))}))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,o),l.exports}o.m=t,e=[],o.O=(t,n,r,l)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,r,l]=e[u],c=!0,a=0;a<n.length;a++)(!1&l||i>=l)&&Object.keys(o.O).every((e=>o.O[e](n[a])))?n.splice(a--,1):(c=!1,l<i&&(i=l));if(c){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,r,l]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={480:0,313:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,l,[i,c,a]=n,s=0;if(i.some((t=>0!==e[t]))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(a)var u=a(o)}for(t&&t(n);s<i.length;s++)l=i[s],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(u)},n=globalThis.webpackChunkplover_core=globalThis.webpackChunkplover_core||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[313],(()=>o(593)));r=o.O(r)})();