(()=>{"use strict";var e,n={294:()=>{const e=window.React,n=window.wp.hooks,t=window.wp.compose,o=window.wp.data;function r(e){var n,t,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e)){var i=e.length;for(n=0;n<i;n++)e[n]&&(t=r(e[n]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}const i=function(){for(var e,n,t=0,o="",i=arguments.length;t<i;t++)(e=arguments[t])&&(n=r(e))&&(o&&(o+=" "),o+=n);return o},l=window.plover.utils,c=window.wp.blockEditor,a=window.wp.components,s=window.wp.i18n,u=window.wp.element,p=window.plover.components;function g(e,n){return"number"==typeof e||"number"==typeof n?Number(e)===Number(n):e===n}const m=6;function v({current:n,icons:t,onChange:o}){const[r,l]=(0,u.useState)(""),c=t.filter((({tags:e,slug:n,name:t})=>""===r.trim()||((null!=e?e:[]).join("")+n+t).toLowerCase().includes(r.trim().toLowerCase())));return(0,e.createElement)(a.__experimentalDropdownContentWrapper,{paddingSize:"none",className:"plover-icon-settings-panel__popover-content"},(0,e.createElement)(a.__experimentalVStack,{spacing:"12px"},(0,e.createElement)(a.TextControl,{label:(0,s.__)("Filter","plover"),value:r,onChange:l}),c.length?(0,e.createElement)("div",{className:"plover-icon-settings-panel__icon-list"},(0,e.createElement)(p.FixedSizeGrid,{itemData:c,columnCount:m,columnWidth:Math.ceil(280/(m+1)),height:280,rowCount:Math.ceil(c.length/m),rowHeight:Math.ceil(280/m),width:280},(({columnIndex:t,rowIndex:r,style:l})=>{const a=c[m*r+t];return a?(0,e.createElement)("div",{style:l,className:"plover-icon-settings-panel__icon-preview-wrap"},(0,e.createElement)("button",{"aria-label":a.name,className:i({"plover-icon-settings-panel__icon-preview":!0,active:g(n,a.slug)}),dangerouslySetInnerHTML:{__html:a.svg},onClick:()=>{o({icon:String(a.slug),svg:a.svg})}})):null}))):(0,e.createElement)("p",{className:"plover-icon-settings-panel__no-result"},(0,s.__)("No icons","plover"))))}function _({attributes:n,setAttributes:t}){var r,i;const{iconSlug:c,iconSvgString:m,iconLibrary:_}=n,[b,d]=(0,u.useState)(!1),[S,w]=(0,u.useState)([]),f=(0,l.getExtensionSetting)("icon","libraries",{}),h=null!==(r=f.find((({slug:e})=>g(e,_))))&&void 0!==r?r:{},E=S.find((({slug:e})=>g(e,c)));return(0,u.useEffect)((()=>{h?.slug&&"none"!==h?.slug?(d(!0),(0,o.resolveSelect)("plover/icons").getIcons(h?.slug).then((({library:e,icons:n})=>{g(e,_)&&w(null!=n?n:[])})).finally((()=>{d(!1)}))):w([])}),[_]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.SelectControl,{label:(0,s.__)("Icon library","plover"),value:null!==(i=h?.slug)&&void 0!==i?i:"none",options:[{label:"None",value:"none"},...f.map((({name:e,slug:n})=>({label:e,value:n})))],onChange:e=>{t({iconLibrary:"none"===e?null:e,iconSlug:null,iconSvgString:null})}}),(0,e.createElement)(a.BaseControl,{label:(0,s.__)("Select icon","plover")},b?(0,e.createElement)("div",null,(0,e.createElement)(a.Spinner,null)):(0,e.createElement)(p.Popover,{className:"plover-icon-settings-panel__icon-picker",toggle:{icon:h?.slug?m:"",label:h?.name?h?.name+" / "+(E?(0,l.titleCase)(E?.name):(0,s.__)("None","plover")):(0,s.__)("None","plover")},renderContent:()=>(0,e.createElement)(v,{current:c,icons:S,onChange:({icon:e,svg:n})=>{t({iconSlug:e,iconSvgString:n})}})})))}function b({attributes:n,setAttributes:t}){return(0,e.createElement)(c.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,s.__)("Icon","plover"),className:"block-editor-plover-inspector__icons"},(0,e.createElement)(_,{attributes:n,setAttributes:t}),(0,e.createElement)(a.__experimentalToggleGroupControl,{isBlock:!0,label:(0,s.__)("Icon position","plover"),value:n.iconPosition,onChange:e=>{t({iconPosition:e})}},(0,e.createElement)(a.__experimentalToggleGroupControlOption,{value:"left",label:(0,s.__)("Left","plover")}),(0,e.createElement)(a.__experimentalToggleGroupControlOption,{value:"right",label:(0,s.__)("Right","plover")})),(0,e.createElement)(p.UnitSlider,{label:(0,s.__)("Icon Size","plover"),value:n.iconSize,min:10,onChange:e=>{t({iconSize:e})}}),(0,e.createElement)(a.Button,{variant:"tertiary",onClick:()=>{t({iconLibrary:null,iconSlug:null,iconSvgString:null})}},(0,s.__)("Clear icon","plover"))))}const d=window.plover.api,S={libraries:{}},w={fetchIconsFromAPI:e=>({type:"FETCH_ICONS_FROM_API",library:e}),setIcons:(e,{icons:n})=>({type:"SET_LIBRARY_ICONS",library:e,icons:n})},f={name:"plover/icons",options:{reducer:(e=S,n)=>("SET_LIBRARY_ICONS"===n.type&&(e={...e,libraries:{...e.libraries,[n.library]:n.icons}}),e),actions:w,selectors:{getIcons:(e,n)=>{var t;return{library:n,icons:null!==(t=e.libraries[n])&&void 0!==t?t:{}}}},controls:{FETCH_ICONS_FROM_API:({library:e})=>(0,d.fetchIcons)(e)},resolvers:{*getIcons(e){const n=yield w.fetchIconsFromAPI(e);return w.setIcons(e,n)}}}},h={iconLibrary:{type:"string"},iconSlug:{type:"string"},iconPosition:{type:"string",default:"right"},iconSize:{type:"string",default:"18px"},iconSvgString:{type:"string"}};(0,n.addFilter)("blocks.registerBlockType","plover/icons-attributes",((e,n)=>((0,l.getExtensionSetting)("icon","blocks",[]).includes(n)&&(e.attributes={...e.attributes,...(0,l.getExtensionSetting)("icon","attributes",h)}),e))),(0,n.addFilter)("editor.BlockListBlock","plover/with-icon-styles",(0,t.createHigherOrderComponent)((n=>t=>{const o=(0,l.getExtensionSetting)("icon","blocks",[]),{attributes:r,name:c,clientId:a}=t,s=(0,l.getExtensionSetting)("icon","libraries",{});if(!o.includes(c))return(0,e.createElement)(n,{...t});const u=i(t?.className,{"icon-library-not-available":!s.find((({slug:e})=>g(e,r?.iconLibrary))),[`has-icon__${r?.iconSlug}`]:r?.iconSlug,[`has-icon-position__${r?.iconPosition}`]:r?.iconPosition});let p="";return r?.iconSvgString&&(p+=`--wp--custom--icon--url: url('data:image/svg+xml;utf8,${r.iconSvgString}');`,r?.iconSize&&(p+=`--wp--custom--icon--size: ${r.iconSize};`)),(0,e.createElement)(e.Fragment,null,p&&(0,e.createElement)("style",null,"#block-"+a+"{"+p+"}"),(0,e.createElement)(n,{...t,className:u}))}),"withIcon")),(0,n.addFilter)("editor.BlockEdit","plover/icon-controls",(n=>t=>{const{name:o}=t;return"core/button"!==o?(0,e.createElement)(n,{...t}):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n,{...t}),(0,e.createElement)(b,{...t}))})),o.register?(0,o.register)((0,o.createReduxStore)(f.name,f.options)):(0,o.registerStore)(f.name,f.options)}},t={};function o(e){var r=t[e];if(void 0!==r)return r.exports;var i=t[e]={exports:{}};return n[e](i,i.exports,o),i.exports}o.m=n,e=[],o.O=(n,t,r,i)=>{if(!t){var l=1/0;for(u=0;u<e.length;u++){for(var[t,r,i]=e[u],c=!0,a=0;a<t.length;a++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](t[a])))?t.splice(a--,1):(c=!1,i<l&&(l=i));if(c){e.splice(u--,1);var s=r();void 0!==s&&(n=s)}}return n}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[t,r,i]},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={829:0,138:0};o.O.j=n=>0===e[n];var n=(n,t)=>{var r,i,[l,c,a]=t,s=0;if(l.some((n=>0!==e[n]))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(a)var u=a(o)}for(n&&n(t);s<l.length;s++)i=l[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},t=globalThis.webpackChunkplover_core=globalThis.webpackChunkplover_core||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var r=o.O(void 0,[138],(()=>o(294)));r=o.O(r)})();