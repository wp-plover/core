(()=>{"use strict";var e,t={668:()=>{const e=window.React,t=window.wp.hooks,r=window.plover.utils,n=window.wp.element,l=window.wp.components,o=window.wp.blockEditor,a=window.wp.i18n;function s({value:t,onChange:r}){const l=(0,n.useRef)(null);return(0,n.useEffect)((()=>{wp.CodeMirror&&l.current&&wp.CodeMirror.fromTextArea(l.current,{mode:"javascript",lineNumbers:!0}).on("change",((e,t)=>{r(e.getValue())}))}),[]),(0,e.createElement)("textarea",{ref:l,defaultValue:t})}function i({label:t,...r}){const[o,a]=(0,n.useState)(!1);return(0,e.createElement)(e.Fragment,null,o&&(0,e.createElement)(l.Modal,{title:t,onRequestClose:()=>a(!1),className:"plover-code-editor-modal"},(0,e.createElement)(s,{...r})),(0,e.createElement)(l.Button,{variant:"secondary",onClick:()=>a(!0)},t))}function c({support:t,attributes:s,setAttributes:c}){var u;const{defaultControls:p,...v}=t,d=null!==(u=(0,r.getCustomBlockSupportConfig)("eventHandler",{})?.allowedEvents)&&void 0!==u?u:{},m=Object.keys(d).filter((e=>!!v[e])).map((e=>({event:e,...d[e]})));if(!m||m.length<=0)return null;const[f,w]=(0,n.useState)({});return(0,e.createElement)(o.InspectorAdvancedControls,null,(0,e.createElement)(l.__experimentalToolsPanel,{resetAll:()=>{w({})},label:(0,a.__)("JavaScript Event Handler","plover"),className:"plover-event-handler-settings-panel"},(0,e.createElement)("div",{style:{gridColumn:"span 2"}},(0,a.__)("Add custom JavaScript to the corresponding events of this block.","plover")),m.map((({event:t,label:r})=>{var n;return(0,e.createElement)(l.__experimentalToolsPanelItem,{key:t,hasValue:()=>!!f[t],label:r,onDeselect:()=>(e=>{w({...f,[e]:void 0})})(t),isShownByDefault:p[t]||s[t]},(0,e.createElement)(i,{label:(0,a.__)("Edit","plover")+" "+r,value:null!==(n=s[t])&&void 0!==n?n:"",onChange:e=>{c({[t]:e})}}))}))))}(0,t.addFilter)("blocks.registerBlockType","plover/event-handler-attributes",((e,t)=>{var n;const l=(0,r.getPloverSupport)(t,"ploverEventHandler");if(!l)return e;let o={};const a=null!==(n=(0,r.getCustomBlockSupportConfig)("eventHandler",{})?.allowedEvents)&&void 0!==n?n:{};return Object.keys(a).forEach((e=>{l[e]&&(o[e]={type:"string"})})),e.attributes={...e.attributes,...o},e})),(0,t.addFilter)("editor.BlockEdit","plover/event-handler-controls",(t=>n=>{const{isSelected:l,name:o}=n;return(e=>(0,r.hasPloverSupport)(e,"ploverEventHandler"))(o)?(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t,{...n}),l&&(0,e.createElement)(c,{...n,support:{...(0,r.getPloverSupport)(n.name,"ploverEventHandler")}})):(0,e.createElement)(t,{...n})}))}},r={};function n(e){var l=r[e];if(void 0!==l)return l.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,l,o)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,l,o]=e[u],s=!0,i=0;i<r.length;i++)(!1&o||a>=o)&&Object.keys(n.O).every((e=>n.O[e](r[i])))?r.splice(i--,1):(s=!1,o<a&&(a=o));if(s){e.splice(u--,1);var c=l();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,l,o]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={434:0,105:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var l,o,[a,s,i]=r,c=0;if(a.some((t=>0!==e[t]))){for(l in s)n.o(s,l)&&(n.m[l]=s[l]);if(i)var u=i(n)}for(t&&t(r);c<a.length;c++)o=a[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=globalThis.webpackChunkplover_core=globalThis.webpackChunkplover_core||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=n.O(void 0,[105],(()=>n(668)));l=n.O(l)})();