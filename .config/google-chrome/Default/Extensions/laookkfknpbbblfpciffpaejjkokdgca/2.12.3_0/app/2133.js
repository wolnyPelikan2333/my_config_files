(globalThis.webpackChunkmomentum=globalThis.webpackChunkmomentum||[]).push([[2133,9437,9662],{99437:(e,t,n)=>{"use strict";n.d(t,{Z:()=>g});var i=n(20144),s=n(88026),d=n(51726),a=n.n(d),o=n(34952),r=n(7838),l=n(35174);let u={};const c={bind:function(e,t){m.utils.isTouchDevice()&&(e.dataset.justBoundMobileClickHandler=!0,setTimeout((()=>{e.dataset.justBoundMobileClickHandler=!1}),100),e.dataset.mobileClickHandlerId=Math.random().toString(36).substring(7),u[e.dataset.mobileClickHandlerId]=t.value,e.addEventListener("click",t.value))},unbind:function(e){m.utils.isTouchDevice()&&(e.removeEventListener("click",u[e.dataset.mobileClickHandlerId]),delete u[e.dataset.mobileClickHandlerId],delete e.dataset.mobileClickHandlerId,delete e.dataset.justBoundMobileClickHandler)}};var p=n(28692),k=n(64398),h=n(77197);i.ZP.use(s.Z,{name:"unreactive"}),i.ZP.use(a()),i.ZP.use(o.InlineSvgPlugin),i.ZP.use(p.og),i.ZP.use(h.Z),i.ZP.prototype.$xhr=l.Z,i.ZP.prototype.$e=r.Z,i.ZP.directive("mobile-click",c),new i.ZP({bb:()=>({conditionalFeatures:m.conditionalFeatures,teamInfo:m.models.teamInfo,date:m.models.date,balance:m.models.balanceMode,bookmarksSettings:m.models.bookmarksSettings})}),i.ZP.mixin({unreactive:()=>({$touch:m.utils.isTouchDevice()}),computed:{$mobile:()=>m.reactive.windowDimensions.width<=450,$plus:()=>m.conditionalFeatures.featureEnabled("plus"),$team:()=>m.conditionalFeatures.featureEnabled("team"),$admin:()=>m.models.teamInfo&&m.models.teamInfo.get("team")&&m.models.teamInfo.get("team").userIsAdmin},pinia:k.Z});const g=i.ZP},40063:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});let i={};const s={bind:function(e,t){let n,s;e.dataset.justBoundClickOutsideHandler=!0,setTimeout((()=>{e.dataset.justBoundClickOutsideHandler=!1}),100);const d=e=>{s=!1,(e=>e&&e.clientX>window.innerWidth)(e)?s=!0:n=e.target},a=i=>{s||(t.modifiers.bubble||!e.contains(n)&&!e.contains(i.target)&&e!==n&&e!==i.target&&"true"!==e.dataset.justBoundClickOutsideHandler)&&t.value(i)};e.dataset.clickOutsideMouseupHandlerId=Math.random().toString(36).substring(7),e.dataset.clickOutsideMousedownHandlerId=Math.random().toString(36).substring(7),i[e.dataset.clickOutsideMouseupHandlerId]=a,i[e.dataset.clickOutsideMousedownHandlerId]=d,document.addEventListener("mouseup",a),document.addEventListener("mousedown",d)},unbind:function(e){var t,n;null!==(t=e.dataset)&&void 0!==t&&t.clickOutsideMouseupHandlerId&&null!==(n=e.dataset)&&void 0!==n&&n.clickOutsideMousedownHandlerId&&(document.removeEventListener("mouseup",i[e.dataset.clickOutsideMouseupHandlerId]),document.removeEventListener("mousedown",i[e.dataset.clickOutsideMousedownHandlerId]),delete i[e.dataset.clickOutsideMouseupHandlerId],delete i[e.dataset.clickOutsideMousedownHandlerId],delete e.dataset.clickOutsideMouseupHandlerId,delete e.dataset.clickOutsideMousedownHandlerId,delete e.dataset.justBoundClickOutsideHandler)}}},40531:(e,t,n)=>{"use strict";n.d(t,{Fl:()=>d,Jr:()=>r,ax:()=>o});var i=n(99437);const s=new i.Z.observable({}),d=new Proxy(s,{get:(e,t)=>(e.hasOwnProperty(t)||i.Z.set(e,t,m.models.customization.getComputedSetting(t)),e[t]),set:()=>(console.warn('Computed settings cannot be set by reactiveCustomization. Instead set persistent settings with "persistent"'),!1)}),a=new i.Z.observable({}),o=new Proxy(a,{get:(e,t)=>(e.hasOwnProperty(t)||i.Z.set(e,t,m.models.customization.get(t)),e[t]),set:(e,t,n)=>(m.models.customization.save(t,n),i.Z.set(e,t,n),!0)});function r(e={}){Object.entries(e).forEach((([e,t])=>i.Z.set(a,e,t))),m.models.customization.save(e)}m.models.customization.on("change",(e=>{e&&("balanceModeStr"in e.changed&&Object.entries(m.models.customization.attributes).forEach((([e,t])=>i.Z.set(s,e,t))),Object.entries(e.changed).forEach((([e,t])=>{s[e]=m.models.customization.getComputedSetting(e),i.Z.set(a,e,t)})))})),m.on("customization:update",(e=>{e.forEach((e=>{const t=m.models.customization.getComputedSetting(e);i.Z.set(s,e,t),i.Z.set(a,e,t)}))}))},13001:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var i=n(8081),s=n.n(i),d=n(23645),a=n.n(d)()(s());a.push([e.id,".links-dash[data-v-6d9b1d4a]{order:3}.links-dash.column[data-v-6d9b1d4a]{max-width:15rem;max-height:100%}.links-dash.row[data-v-6d9b1d4a]{min-width:0;flex-shrink:2}.base-item-list.row[data-v-6d9b1d4a]{height:100%}.base-item-list.row .link-list-item[data-v-6d9b1d4a]{width:3.5rem;padding:1.0625rem .25rem}@media screen and (max-width: 1000px){.links-dash.column[data-v-6d9b1d4a]{max-width:10rem}}@media screen and (max-width: 800px){.links-dash.column[data-v-6d9b1d4a]{max-width:5rem}}@media screen and (max-width: 450px){.links-dash[data-v-6d9b1d4a]{display:none}}",""]);const o=a},77722:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var i=n(8081),s=n.n(i),d=n(23645),a=n.n(d)()(s());a.push([e.id,"\n/* stylelint-disable */\n.links[data-v-43bcce92] { order: 2;\n}\n",""]);const o=a},55040:(e,t,n)=>{"use strict";var i;n.d(t,{O:()=>i,k:()=>s}),function(e){e.Row="row",e.Column="column"}(i||(i={}));const s=3},62133:(e,t,n)=>{"use strict";n.r(t);var i=n(99437),s=n(69662),d=n(24749),a=function(){var e=this,t=e._self._c;return e.activeMode===e.mode&&e.totalPinnedLinks?t("app-container",{ref:"pinnedLinks",staticClass:"links-dash",class:[e.direction],attrs:{"app-name":"pinned-links","data-test":"links-dash","visible-setting":"linksVisible"}},[t("overflow-carousel",{staticClass:"add-shadow",attrs:{direction:e.direction,"content-ready":e.linksLoadedAndMounted}},[e.teamPinnedLinks.length>0?t("base-item-list",{attrs:{direction:e.direction}},e._l(e.teamPinnedLinks,(function(n){return t("links-list-item",{key:n.id,attrs:{"link-group":n,"is-on-dash":!0,"is-tile":e.mode===e.LinksMode.Tile,"is-team-link":!0},on:{"hook:mounted":e.onLinkGroupMounted}})})),1):e._e(),e._v(" "),e.pinnedLinks.length>0?t("base-item-list",{attrs:{direction:e.direction},model:{value:e.pinnedLinksOrderIds,callback:function(t){e.pinnedLinksOrderIds=t},expression:"pinnedLinksOrderIds"}},e._l(e.pinnedLinks,(function(n){return t("links-list-item",{key:n.id,attrs:{"link-group":n,"is-on-dash":!0,"is-tile":e.mode===e.LinksMode.Tile},on:{"hook:mounted":e.onLinkGroupMounted}})})),1):e._e()],1)],1):e._e()};a._withStripped=!0;var o=n(55040),r=n(28692),l=n(89968),u=n(23370),c=n(40531),p=n(42223);const k=new(n(81405).ZP)({feature:"links"}),h={name:"LinksDash",components:{OverflowCarousel:()=>n.e(1027).then(n.bind(n,41027)),AppContainer:()=>Promise.resolve().then(n.bind(n,4623)),LinksListItem:()=>Promise.all([n.e(8725),n.e(3498),n.e(9217),n.e(5598)]).then(n.bind(n,14433)),BaseItemList:()=>n.e(4493).then(n.bind(n,14493))},mixins:[p.Z],provide(){return{viewStateStore:this.linksViewStateStore,itemStore:this.linksStore,capture:k.capture.bind(k),batchCapture:k.batchCapture}},props:{mode:{type:String,default:d.LS.List,validator:e=>Object.values(d.LS).some((t=>t===e))}},data:()=>({mountedLinkGroups:0}),unreactive:()=>({BaseItemListDirection:o.O,LinksMode:d.LS}),computed:{...(0,r.Kc)(l.useLinksViewStateStore,u.useLinksStore),activeMode:()=>c.ax.linksMode,teamPinnedLinks(){return this.linksStore.getPinnedTeamItems},pinnedLinks(){return this.linksStore.getPinnedItems},pinnedLinksOrderIds:{get(){return this.pinnedLinks.map((e=>e.id))},async set(e){await this.linksStore.updatePartialRootLinksOrderIds(e)}},totalPinnedLinks(){return this.teamPinnedLinks.length+this.pinnedLinks.length},direction(){return this.mode===d.LS.Tile?o.O.Row:o.O.Column},linksLoadedAndMounted(){return this.linksStore.loaded&&this.totalPinnedLinks===this.mountedLinkGroups}},methods:{onAllComponentsMountedOverride(){this.$e.$emit(d.o1[this.mode])},onLinkGroupMounted(){this.mountedLinkGroups+=1}}};n(62154);const g=(0,n(51900).Z)(h,a,[],!1,null,"6d9b1d4a",null).exports;var I=n(7838);const v=document.querySelector(".region.top-left"),M=document.querySelector(".region.sidebar-left");Promise.all(Object.values(d.o1).map((e=>new Promise((t=>{I.Z.$on(e,t)}))))).then((()=>{m.widgetManager.appReady("links")})).catch(console.error);const b=document.createElement("div"),L=document.createElement("div");v&&(v.prepend(L),v.prepend(b)),new i.Z({render:e=>e(s.default)}).$mount(b),new i.Z({render:e=>e(g,{props:{mode:d.LS.Tile}})}).$mount(L);const w=document.createElement("div");M&&M.prepend(w),new i.Z({render:e=>e(g,{props:{mode:d.LS.List}})}).$mount(w)},89968:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s,useLinksViewStateStore:()=>i});const i=(0,n(95756).v)("links",{list:{defaultView:!0,order:1},form:{order:2}}),s=i},69662:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>v});var i=function(){var e=this,t=e._self._c;return t("app-container",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.closeIfKeepOpenDisabled,expression:"closeIfKeepOpenDisabled"}],attrs:{"app-name":"links","visible-setting":"linksVisible",overlay:e.popupActive,"data-test":"links",hotkey:"L"},on:{toggle:e.togglePopupAndCaptureIfOpen}},[t("app-dash",{attrs:{src:e.$team?n(45231):""},on:{click:function(t){return e.togglePopupAndCaptureIfOpen({source:"click"})}}},[e._v("\n\t\tLinks\n\t")]),e._v(" "),t("transition",{attrs:{name:"slide-down-fade"},on:{"after-enter":e.afterAppOpen}},[e.popupActive?t("links-app"):e._e()],1)],1)};i._withStripped=!0;var s=n(4623),d=n(94828),a=n(89968),o=n(23370),r=n(28692),l=n(40063),u=n(42223),c=n(40531),p=n(24749),k=n(81405),h=n(48494);const g=new k.ZP({feature:"links"}),I={name:"Links",directives:{ClickOutside:l.Z},components:{LinksApp:()=>Promise.all([n.e(8725),n.e(3418),n.e(6970),n.e(3498),n.e(5678),n.e(9300),n.e(9217),n.e(9761)]).then(n.bind(n,9761)),AppDash:d.Z,AppContainer:s.default},mixins:[u.Z,(0,h.Z)({useViewStateStore:a.useLinksViewStateStore,analytics:g})],provide(){return{viewStateStore:this.linksViewStateStore,itemStore:this.linksStore}},computed:{...(0,r.Kc)(a.useLinksViewStateStore,o.useLinksStore)},watch:{popupActive(e){e?localStorage.setItem(p.hg,e):localStorage.removeItem(p.hg)},"linksStore.loaded"(){m.trigger("links:updated")}},created(){this.linksStore.refresh(),c.ax.linksKeepOpen&&!this.$touch&&localStorage.getItem(p.hg)&&this.togglePopup(!0)},methods:{closeIfKeepOpenDisabled(){c.ax.linksKeepOpen||this.togglePopup(!1)},onAllComponentsMountedOverride(){this.$e.$emit(p.o1.base)},afterAppOpen(){m.trigger("links:updated")}}};n(10708);const v=(0,n(51900).Z)(I,i,[],!1,null,"43bcce92",null).exports},62154:(e,t,n)=>{var i=n(13001);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,n(45346).Z)("7c2350d0",i,!1,{})},10708:(e,t,n)=>{var i=n(77722);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,n(45346).Z)("1ff98dd8",i,!1,{ssrId:!0})},45231:e=>{"use strict";e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRDb2xvciIgdmlld0JveD0iMCAwIDY0IDY0Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMyAxNS42NThhMi41IDIuNSAwIDAgMC0yLjUtMi41SDE1YTggOCAwIDAgMC04IDh2MjhhOCA4IDAgMCAwIDggOGgyOGE4IDggMCAwIDAgOC04VjMzLjVhMi41IDIuNSAwIDAgMC01IDB2MTUuNjU4YTMgMyAwIDAgMS0zIDNIMTVhMyAzIDAgMCAxLTMtM3YtMjhhMyAzIDAgMCAxIDMtM2gxNS41YTIuNSAyLjUgMCAwIDAgMi41LTIuNVoiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Mi42OCA3LjY1N2EyLjUgMi41IDAgMCAxIDIuNS0yLjVoMTEuMzE1YTIuNDk2IDIuNDk2IDAgMCAxIDIuNSAyLjVWMTguOTdhMi41IDIuNSAwIDEgMS01IDB2LTUuMjc3bC0xMy40MSAxMy40MWEyLjUgMi41IDAgMSAxLTMuNTM2LTMuNTM2bDEzLjQxLTEzLjQxaC01LjI3OGEyLjUgMi41IDAgMCAxLTIuNS0yLjVaIi8+PC9zdmc+"}}]);