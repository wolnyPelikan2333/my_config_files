(globalThis.webpackChunkmomentum=globalThis.webpackChunkmomentum||[]).push([[8544,9437],{99437:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});var o=n(20144),s=n(88026),i=n(51726),a=n.n(i),r=n(34952),d=n(7838),l=n(35174);let c={};const u={bind:function(e,t){m.utils.isTouchDevice()&&(e.dataset.justBoundMobileClickHandler=!0,setTimeout((()=>{e.dataset.justBoundMobileClickHandler=!1}),100),e.dataset.mobileClickHandlerId=Math.random().toString(36).substring(7),c[e.dataset.mobileClickHandlerId]=t.value,e.addEventListener("click",t.value))},unbind:function(e){m.utils.isTouchDevice()&&(e.removeEventListener("click",c[e.dataset.mobileClickHandlerId]),delete c[e.dataset.mobileClickHandlerId],delete e.dataset.mobileClickHandlerId,delete e.dataset.justBoundMobileClickHandler)}};var p=n(28692),v=n(64398),g=n(77197);o.ZP.use(s.Z,{name:"unreactive"}),o.ZP.use(a()),o.ZP.use(r.InlineSvgPlugin),o.ZP.use(p.og),o.ZP.use(g.Z),o.ZP.prototype.$xhr=l.Z,o.ZP.prototype.$e=d.Z,o.ZP.directive("mobile-click",u),new o.ZP({bb:()=>({conditionalFeatures:m.conditionalFeatures,teamInfo:m.models.teamInfo,date:m.models.date,balance:m.models.balanceMode,bookmarksSettings:m.models.bookmarksSettings})}),o.ZP.mixin({unreactive:()=>({$touch:m.utils.isTouchDevice()}),computed:{$mobile:()=>m.reactive.windowDimensions.width<=450,$plus:()=>m.conditionalFeatures.featureEnabled("plus"),$team:()=>m.conditionalFeatures.featureEnabled("team"),$admin:()=>m.models.teamInfo&&m.models.teamInfo.get("team")&&m.models.teamInfo.get("team").userIsAdmin},pinia:v.Z});const h=o.ZP},18267:(e,t,n)=>{"use strict";function o({appKey:e,hideEvents:t,closeFunctionName:n,eventTriggerProperty:o}){return{created(){e&&t&&n&&o?(this.$watch(o,(n=>{n&&t.forEach((t=>m.trigger(t,e)))})),t.forEach((e=>{m.on(e,this.onHideEvent)}))):console.warn("Missing hideEventsMixin Arguments: ",e?"":"appKey",t?"":"hideEvents",n?"":"closeFunctionName",o?"":"eventTriggerProperty")},destroyed(){t.forEach((e=>{m.off(e,this.onHideEvent)}))},methods:{onHideEvent(t){t!==e&&this[n]()}}}}n.d(t,{Z:()=>o})},40531:(e,t,n)=>{"use strict";n.d(t,{Fl:()=>i,Jr:()=>d,ax:()=>r});var o=n(99437);const s=new o.Z.observable({}),i=new Proxy(s,{get:(e,t)=>(e.hasOwnProperty(t)||o.Z.set(e,t,m.models.customization.getComputedSetting(t)),e[t]),set:()=>(console.warn('Computed settings cannot be set by reactiveCustomization. Instead set persistent settings with "persistent"'),!1)}),a=new o.Z.observable({}),r=new Proxy(a,{get:(e,t)=>(e.hasOwnProperty(t)||o.Z.set(e,t,m.models.customization.get(t)),e[t]),set:(e,t,n)=>(m.models.customization.save(t,n),o.Z.set(e,t,n),!0)});function d(e={}){Object.entries(e).forEach((([e,t])=>o.Z.set(a,e,t))),m.models.customization.save(e)}m.models.customization.on("change",(e=>{e&&("balanceModeStr"in e.changed&&Object.entries(m.models.customization.attributes).forEach((([e,t])=>o.Z.set(s,e,t))),Object.entries(e.changed).forEach((([e,t])=>{s[e]=m.models.customization.getComputedSetting(e),o.Z.set(a,e,t)})))})),m.on("customization:update",(e=>{e.forEach((e=>{const t=m.models.customization.getComputedSetting(e);o.Z.set(s,e,t),o.Z.set(a,e,t)}))}))},50871:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});var o=n(8081),s=n.n(o),i=n(23645),a=n.n(i)()(s());a.push([e.id,"\n/* stylelint-disable */\n.app-dash.hidden[data-v-2b5d17f6] { opacity: 0;\n}\n",""]);const r=a},28544:(e,t,n)=>{"use strict";n.r(t);var o=n(99437),s=function(){var e=this,t=e._self._c;return t("app-container",{attrs:{"app-name":"notes","visible-setting":"notesVisible",hotkey:"N","data-test":"notes",overlay:e.popupActive},on:{toggle:e.togglePopupAndCaptureIfOpen}},[t("app-dash",{class:{hidden:e.popupActive&&e.fullscreen},on:{click:function(t){return e.togglePopupAndCaptureIfOpen({source:"click"})}}},[e._v("\n\t\tNotes\n\t")]),e._v(" "),t("transition",{attrs:{name:"slide-up-fade"}},[e.popupActive?t("notes-app"):e._e()],1)],1)};s._withStripped=!0;var i=n(4623),a=n(94828),r=n(18267),d=n(84722),l=n(28692),c=n(81405),u=n(48494),p=n(40531);const v=new c.ZP({feature:"notes"}),g={name:"Notes",components:{AppDash:a.Z,NotesApp:()=>Promise.all([n.e(8725),n.e(9980),n.e(5757),n.e(464),n.e(4643),n.e(3418),n.e(6970),n.e(3498),n.e(6283),n.e(5678),n.e(9300),n.e(9443),n.e(4817),n.e(4411),n.e(2622),n.e(4442),n.e(6432)]).then(n.bind(n,86432)),AppContainer:i.default},mixins:[(0,r.Z)({appKey:"notes",hideEvents:["globalEvent:toggle:bottom-right"],closeFunctionName:"closePopup",eventTriggerProperty:"popupActive"}),(0,u.Z)({useViewStateStore:d.V,analytics:v})],provide(){return{viewStateStore:this.notesViewStateStore}},computed:{...(0,l.Kc)(d.V),popupActive(){return this.notesViewStateStore.popupActive},fullscreen:()=>p.Fl.notesFullscreen},mounted(){m.widgetManager.appReady("notes")}};n(2050);const h=(0,n(51900).Z)(g,s,[],!1,null,"2b5d17f6",null).exports,b=document.querySelector(".region.bottom-right"),f=document.createElement("div");b&&b.prepend(f),new o.Z({render:e=>e(h)}).$mount(f)},84722:(e,t,n)=>{"use strict";n.d(t,{V:()=>o});const o=(0,n(95756).v)("notes",{list:{defaultView:!0,order:1},deleted:{order:2}})},2050:(e,t,n)=>{var o=n(50871);o.__esModule&&(o=o.default),"string"==typeof o&&(o=[[e.id,o,""]]),o.locals&&(e.exports=o.locals),(0,n(45346).Z)("29650af2",o,!1,{ssrId:!0})}}]);