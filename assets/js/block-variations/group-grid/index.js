(()=>{"use strict";var r={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return r.d(o,{a:o}),o},d:(e,o)=>{for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},o:(r,e)=>Object.prototype.hasOwnProperty.call(r,e)};const e=window.wp.blocks,o=window.wp.domReady;var t=r.n(o);const i=window.wp.i18n;t()((()=>{(0,e.getBlockVariations)("core/group").some((r=>"group-grid"===r.name))||(0,e.registerBlockVariation)("core/group",{name:"group-grid",title:(0,i.__)("Grid","plover"),icon:"grid-view",description:(0,i.__)("Arrange blocks in a grid.","plover"),attributes:{layout:{type:"grid"}},scope:["block","inserter","transform"],isActive:r=>"grid"===r.layout?.type})}))})();