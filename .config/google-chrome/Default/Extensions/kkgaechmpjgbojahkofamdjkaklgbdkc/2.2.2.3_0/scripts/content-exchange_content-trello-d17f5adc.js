(self.webpackChunk_planyway_planyway=self.webpackChunk_planyway_planyway||[]).push([[443],{51195:(e,t,n)=>{var r={"./locale-en.json":55584,"./locale-ru.json":67778};function webpackContext(e){var t=webpackContextResolve(e);return n(t)}function webpackContextResolve(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}webpackContext.keys=function webpackContextKeys(){return Object.keys(r)},webpackContext.resolve=webpackContextResolve,e.exports=webpackContext,webpackContext.id=51195},67270:(e,t,n)=>{"use strict";n.d(t,{e:()=>ngBootstrap});var r=n(62079),i=n.n(r),o=n(52020),a=n.n(o),l=n(88546),s=n.n(l),c=n(66775),d=n.n(c),u=n(2201),p=n.n(u),h=n(26171),f=n(73324),m=n.n(f),y=n(35820),g=n.n(y),w=n(91829),v=n.n(w),_=n(86981),b=n.n(_),$=n(29898),k=n.n($),S=n(61539),P=n.n(S),A=n(88946),C=n.n(A),E=n(23513),O=n.n(E),T=n(99595),D=n.n(T),x=n(88106),I=n.n(x),j=n(35293),R=n.n(j),N=n(57445),M=n.n(N),L=n(68052),z=n.n(L),F=n(48216),B=n.n(F),W=n(19755),H=n.n(W),U=n(66695),K=n.n(U),Z=n(61482),X=(n(23234),n(42562),n(89672),n(32067),n(73664),n(67131),n(28106),n(85601),n(15721),n(98710),n(27274)),q=n.n(X),V=n(16613),G=n.n(V),J=n(68924),Y=n.n(J),Q=n(66021),ee=(n(87741),n(20115)),te=n(8937),ne=n(29704),re=n(93379),ie=n.n(re),oe=n(7795),ae=n.n(oe),le=n(90569),se=n.n(le),ce=n(3565),de=n.n(ce),ue=n(19216),pe=n.n(ue),he=n(44589),fe=n.n(he),me=n(92047),ye=n.n(me),ge={};ye()&&ye().locals&&(ge.locals=ye().locals);var we,ve=0,_e={};_e.styleTagTransform=fe(),_e.setAttributes=de(),_e.insert=se().bind(null,"head"),_e.domAPI=ae(),_e.insertStyleElement=pe(),ge.use=function(e){return _e.options=e||{},ve++||(we=ie()(ye(),_e)),ge},ge.unuse=function(){ve>0&&! --ve&&(we(),we=null)};function ownKeys(e,t){var n=i()(e);if(a()){var r=a()(e);t&&(r=m()(r).call(r,(function(t){return s()(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n,r,i=null!=arguments[t]?arguments[t]:{};t%2?D()(n=ownKeys(Object(i),!0)).call(n,(function(t){(0,h.Z)(e,t,i[t])})):d()?p()(e,d()(i)):D()(r=ownKeys(Object(i))).call(r,(function(t){M()(e,t,s()(i,t))}))}return e}const be=n(51195),$e=Q.j.prototype.clear;function ngBootstrap(e){let{modules:t=[],services:n=[],controllers:r=[],directives:i=[],components:o=[],values:a={}}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:injections,l=K().module(e,["ngAnimate","ngMessages","ngMaterial","pascalprecht.translate","angular.bind.notifier","ngSanitize","ngAvatar","ng-showdown","angular-inview",...t]);!function configAngularJs(e){e.config(["$interpolateProvider",e=>{e.startSymbol("{pw{"),e.endSymbol("}pw}")}]),e.config(["$logProvider",e=>{e.debugEnabled(!1)}]),e.config(["$windowProvider",e=>{const t=e.$get;e.$get=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];let i=t.apply(this,n);const o=window.open;return i.open=function(){let e=o(...arguments);return e&&"_blank"===(arguments.length<=1?void 0:arguments[1])&&(e.opener=null),e},i}}]),e.config(["$provide",e=>{e.decorator("$rootScope",["$delegate",e=>(e.__proto__.$once=function(e,t){const n=this.$on(e,((e,r)=>{n(),t(e,r)}))},e.__proto__.$onceAsync=function(e){return new(g())((t=>this.$once(e,t)))},e)])}]),e.config(["$compileProvider",e=>{e.imgSrcSanitizationWhitelist(/^\s*(https|chrome-extension):/),e.debugInfoEnabled(!1),e.commentDirectivesEnabled(!1),e.cssClassDirectivesEnabled(!1);const t=e.$get[e.$get.length-1];e.$get[e.$get.length-1]=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];let i=t.apply(this,n);return i.$$addScopeInfo=function $$addScopeInfo(e,t,n,r){let i=n?r?"$isolateScopeNoTemplate":"$isolateScope":"$scope";e.data(i,t)},i}}]),e.config(["$sceDelegateProvider",e=>{let t=["self","https://files.planyway.com/**"];t.push("chrome-extension://**"),e.resourceUrlWhitelist(t)}]),e.config(["$ariaProvider",e=>{e.config({bindRoleForClick:!1,tabindex:!1,bindKeydown:!1})}]),e.config(["$animateProvider",e=>{e.classNameFilter(/pw-animated/)}]),e.decorator("$exceptionHandler",["$delegate","$injector","$log",(e,t,n)=>function(e){if("string"!=typeof e||!v()(e).call(e,ee.v8)){if(t.has("telemetrySrv")){t.get("telemetrySrv").logError("Planyway unhandled error",e)}n.error("Planyway unhandled error:"),n.error(e)}}])}(l),function configAngularJsTranslate(e){K().module("pascalprecht.translate").factory("planyway.localeLoaderFty",(()=>e=>{var t;let n=b()(t=k()(be).call(be)).call(t,(t=>P()(t).call(t,`locale-${e.key}.json`)));return g().resolve(n&&be(n))})),e.config(["$translateProvider",e=>{var t;e.useLoader("planyway.localeLoaderFty");let n=C()(t=k()(be).call(be)).call(t,(e=>e.match(/^\.\/locale-([a-z]{2}(-[a-zA-Z]{2,4})?)\.json$/)[1].replace("-","_")));e.registerAvailableLanguageKeys(n),e.addInterpolation("$translateMessageFormatInterpolation"),e.fallbackLanguage(ee.L2),e.preferredLanguage(ee.L2),e.useSanitizeValueStrategy(null)}])}(l),function configAngularJsMaterial(e){e.config(["$mdAriaProvider",e=>{e.disableWarnings()}]),e.config(["$mdCompilerProvider",e=>{e.respectPreAssignBindingsEnabled(!0)}]),e.config(["$mdThemingProvider",e=>{let t=e.extendPalette("blue",{50:me.locals.color50,100:me.locals.color100,200:me.locals.color200,300:me.locals.color300,400:me.locals.color400,500:me.locals.color500,600:me.locals.color600,700:me.locals.color700,800:me.locals.color800,900:me.locals.color900,A100:me.locals.colorA100,A200:me.locals.colorA200,A400:me.locals.colorA400,A700:me.locals.colorA700});e.definePalette("pwBlue",t),e.theme("default").primaryPalette("pwBlue").accentPalette("pwBlue")}]),e.config(["$provide","$mdIconProvider",(e,t)=>e.value("$mdIconProvider",t)]);const t=new(O());e.decorator("$animateCss",["$delegate",e=>function(){for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return D()(t).call(t,(e=>e(...r))),e(...r)}]),e.config(["$mdMenuProvider",e=>{const n=e.$get;e.$get=function(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];let o,a,l=n.apply(this,r),s="";const c=l.show;l.show=function show(e){var n;o||(o=document.activeElement);let r=H()(e.target).closest("md-menu"),i=e.element,l={};if(r.hasClass("pw-js-menu-autosize")){let t=(H()(e.target).closest(".pw-js-menu-autosize-target")[0]||e.target).offsetWidth;l.width=t,b()(i).call(i,"> md-menu-content").css({minWidth:t,maxWidth:t,width:t})}let d=I()(r.closest(".md-dialog-container, .md-panel-outer-wrapper, .md-open-menu-container").css("z-index"),10);if(R()(d)||(l["z-index"]=d+1e3),i.css(l),b()(n=e.element).call(n,"md-menu-content").on("keydown","input",(t=>{var n;switch(t.which){case te.VD.Up:case te.VD.Down:return void b()(n=e.element).call(n,"md-menu-content > md-menu-item:first-child").trigger("focus");case te.VD.Escape:return}t.stopPropagation()})),e.scope){e.scope.pwPatched||(e.scope.pwPatched=!0,M()(e.scope,"searchString",{get:()=>s,set:e=>s=e})),e.onComplete=()=>e.scope.$emit("$mdMenuOpened");const n=i[0],ensureScreenBound=t=>{if(r.hasClass("pw-js-menu-screen-bound-scroll-parent")){let n=e.target.getBoundingClientRect(),r=e.mdMenuCtrl.offsets().top;q()(e.target).scrollTop+=n.bottom+r-t}if(r.hasClass("pw-js-menu-screen-bound-no-parent-overlap")&&n){let r=e.target.getBoundingClientRect(),i=e.mdMenuCtrl.offsets().top,o=n.getBoundingClientRect();r.bottom+i>t&&r.top+i<t+o.height&&(t=r.top-o.height-i)}return t<0&&(t=0),t},onMenuAnimate=(n,r)=>{if(n===e.element){var i;let e=null===(i=r.from)||void 0===i?void 0:i.top;if(e){t.delete(onMenuAnimate);let n=ensureScreenBound(z()(e));r.from.top=`${n}px`}}};t.add(onMenuAnimate),n&&(a=e.scope.$watchGroup([()=>n.scrollWidth,()=>n.scrollHeight],(()=>{let e=n.getBoundingClientRect();if(0!==e.width){let t=e.right-window.innerWidth+8;if(t>0){let r=e.left-t;n.style.left=`${r}px`}}if(0!==e.height){let t=e.bottom-window.innerHeight+8;if(t>0){let r=ensureScreenBound(e.top-t);n.style.top=`${r}px`}}})))}if(e.hasBackdrop=!1,e.disableParentScroll=!1,!e.mdMenuCtrl.close.pwPatched){const t=e.mdMenuCtrl.close;e.mdMenuCtrl.close=function close(e,n){t(!0,n)},e.mdMenuCtrl.close.pwPatched=!0}return c(e)};const d=l.hide;return l.hide=function hide(e,t){var n;return null===(n=a)||void 0===n||n(),s="",o&&((0,ne.Tw)(H()(o).closest(".md-panel, md-dialog")),o=null),d(e,_objectSpread(_objectSpread({},t),{},{closeAll:!t||!t.closeTo,$destroy:!0}))},l.destroy=function(){},l},e.$get.$inject=n.$inject}]),e.config(["$mdInkRippleProvider",e=>{const t=e.$get[1];e.$get[1]=function(e){let n=t.call(this,e),r=n.attach;return n.attach=function(e,t,n){t.one("mouseover",(()=>{let i=r(e,t,n);null!=i&&i.bindEvents&&(t.on("pwMouseDown",B()(K()).call(K(),i,i.handleMousedown)),t.on("pwMouseUp",B()(K()).call(K(),i,i.handleMouseup)))}))},n}}]),e.decorator("$mdUtil",["$delegate",e=>(e.getParentWithPointerEvents=function(e){return e.parent()},e)]),e.config(["$provide",e=>{e.decorator("mdTooltipDirective",["$delegate",e=>{const t=e[0].link;return e[0].compile=function(){return function(e,n,r){void 0===e.mdDelay&&(e.mdDelay=50),t.call(this,e,n,r)}},e}])}])}(l),function configAngularJsShowdown(e){e.config(["$showdownProvider","$provide",(e,t)=>{e.loadExtension(G()).loadExtension("youtube").loadExtension((()=>[{type:"output",filter:e=>Y()(e,{whiteList:_objectSpread(_objectSpread({},Y().whiteList),{},{br:["class"],code:["class"],iframe:["src","width","height","frameborder","allowfullscreen"],img:["class","src","alt","title","width","height"],input:["type","style","disabled","checked"],li:["class","style"],p:["class"],pre:["class"],span:["class","title"],table:["style","width","border","align","valign"],td:["style","width","rowspan","colspan","align","valign"],th:["style","width","rowspan","colspan","align","valign"]})})}])).loadExtension((()=>[{type:"lang",filter:e=>e.replace(/^( {0,3}([*+-]|\d+[.])[ \t]*)(?![^\n]+?)/gm,"$&&nbsp;")}])),e.setOption("noHeaderId",!0).setOption("simplifiedAutoLink",!0).setOption("strikethrough",!0).setOption("tables",!0).setOption("tasklists",!0).setOption("simpleLineBreaks",!0).setOption("emoji",!0).setOption("youtubeWidth",532).setOption("youtubeHeight",300),t.value("$showdownProvider",e)}])}(l),function patchControllers(e){e.decorator("$controller",["$delegate","$timeout","$injector",(e,t,n)=>function(r,i,o,a){let l=e(r,i,o,a);switch(typeof r){case"string":switch(r){case"MenuBarController":l.instance.enableOpenOnHover=()=>{};break;case"mdMenuCtrl":let e;const handleMenuItemHover=function(r){const i=l.instance,o=n.get("$mdUtil");if(i.isAlreadyOpening)return;let a=r.target.querySelector("md-menu")||o.getClosest(r.target,"MD-MENU");e=t((()=>{if(a&&(a=K().element(a).controller("mdMenu")),i.currentlyOpenMenu&&i.currentlyOpenMenu!==a){var e;let t=i.nestLevel+1;i.currentlyOpenMenu.close(!0,{closeTo:t}),i.isAlreadyOpening=!!a,null===(e=a)||void 0===e||e.open()}else if(a&&!a.isOpen&&a.open){var t;i.isAlreadyOpening=!!a,null===(t=a)||void 0===t||t.open()}}),a?100:250)},handleMenuItemMouseLeave=function(){e&&(t.cancel(e),e=void 0)};M()(l.instance,"handleMenuItemHover",{get:()=>handleMenuItemHover,set:()=>{}}),M()(l.instance,"handleMenuItemMouseLeave",{get:()=>handleMenuItemMouseLeave,set:()=>{}})}break;case"function":switch(r.name){case"MdNavBarController":const e=l.instance,t=e._initTabs;e._initTabs=function(){t.apply(this),e._$scope.$watch("ctrl._navBarEl.getBoundingClientRect().width",(()=>e.updateSelectedTabInkBar()))},e.updateSelectedTabInkBar=function(){e._getTabs()&&e._updateInkBarStyles(e._getSelectedTab())},e._updateInkBarStyles=function(t,n){if(e._inkbar&&(e._inkbar.css({display:n<0?"none":""}),t)){let n=t.getButtonEl();e._inkbar.css({left:n.offsetLeft,width:n.offsetWidth})}};break;case"MdNavItemController":l.instance.setFocused=()=>{},M()(l.instance,"_focused",{get:()=>!1,set:()=>{}})}}return l}])}(l),function patchDomLogic(e){e.run(["$rootScope","$mdMenu",(e,t)=>{const n=H()("body");let r,i=!1,o=!1,a=!1,l=!1;n.on("mousedown pointerdown",(e=>{i=!1,o=!1,r=null;let t=H()(e.target);if(t.hasClass("md-input")||t.hasClass("k-input"))return r=!t.attr("readonly")&&t.closest(".pw-js-mousedown-menu")[0],void(i=!0);t.closest("md-menu-content, .pw-menu-content")[0]&&(o=!0),t.closest("md-menu-item")[0]&&(l=!0)})),n.on("mouseup pointerup",(i=>{var s;if(a=!1,o)return void(o=!1);if(l)return void(l=!1);if(!b()(n).call(n,"> .md-open-menu-container.md-active")[0])return;if(b()(n).call(n,".pw-dialog.pw-dialog--opaque")[0])return;let c=H()(i.target);c.closest("md-menu-content, .pw-menu-content")[0]||c.closest("md-menu-item")[0]||r||null!==(s=c.scope())&&void 0!==s&&s.$mdMenuIsOpen||(a=!0,i.which!==te.Jm.Right&&(t.hide(),e.$broadcast("$mdMenuClosed",{causedByEvent:i})))})),document.addEventListener("click",(e=>{if(i)i=!1;else{if(a||b()(n).call(n,"> .md-open-menu-container.md-active")[0]){let t=H()(e.target);if(t.closest("md-menu-content, .pw-menu-content")[0])return;if(t.closest("md-menu")[0])return;if(t.closest(".k-list-container")[0])return;if(t.closest(".k-input")[0])return;if(t.closest(".md-panel-is-showing")[0])return}else{if(!b()(n).call(n,"> .k-animation-container > .k-list-container.k-state-border-up")[0])return;{let t=H()(e.target);if(t.closest(".k-list-container")[0])return;if(t.closest(".k-input")[0])return}}(0,ne.Tw)(b()(n).call(n,"> .md-panel-is-showing > .md-panel-inner-wrapper > .md-panel, > .md-dialog-container md-dialog")),e.stopImmediatePropagation(),e.preventDefault()}}),!0)}])}(l);for(let e of n)l.service(e.serviceName,e);for(let e of r)l.controller(e.controllerName,e);for(let e of i)l.directive(e.directiveName,e.create);for(let e of o)l.component(e.componentName,(0,Z.F)(e,e.componentProps,e.componentInjections));l.value(_objectSpread({appModuleName:e},a)),m()(l).call(l,"trustAsHtml",["$sce",e=>t=>e.trustAsHtml(t)]),m()(l).call(l,"capitalize",[()=>e=>(0,ne.Oo)(e)]);const s=H()("body");return K().bootstrap(s,[e],{strictDi:!0})}Q.j.prototype.clear=function(){$e.apply(this);let e=0;this.traces.push=function(){if(e++<5){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];Array.prototype.push.apply(this,n)}}}},66783:(e,t,n)=>{"use strict";n.d(t,{s:()=>D});var r=n(40024),i=n.n(r),o=n(57445),a=n.n(o),l=n(51791),s=n.n(l),c=n(90143),d=n.n(c),u=n(56626),p=n.n(u),h=n(67552),f=n.n(h),m=n(86981),y=n.n(m),g=n(26881),w=n(54847),v=n.n(w),_=n(35820),b=n.n(_),$=n(88946),k=n.n($),S=n(58218),P=n.n(S),A=n(99595),C=n.n(A),E=n(19755),O=n.n(E),T=(n(87805),n(29704));function _getDecoratorsApi(){_getDecoratorsApi=function(){return e};var e={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(e,t){var n;C()(n=["method","field"]).call(n,(function(n){C()(t).call(t,(function(t){t.kind===n&&"own"===t.placement&&this.defineClassElement(e,t)}),this)}),this)},initializeClassElements:function(e,t){var n,r=e.prototype;C()(n=["method","field"]).call(n,(function(n){C()(t).call(t,(function(t){var i=t.placement;if(t.kind===n&&("static"===i||"prototype"===i)){var o="static"===i?e:r;this.defineClassElement(o,t)}}),this)}),this)},defineClassElement:function(e,t){var n=t.descriptor;if("field"===t.kind){var r=t.initializer;n={enumerable:n.enumerable,writable:n.writable,configurable:n.configurable,value:void 0===r?void 0:r.call(e)}}a()(e,t.key,n)},decorateClass:function(e,t){var n=[],r=[],i={static:[],prototype:[],own:[]};if(C()(e).call(e,(function(e){this.addElementPlacement(e,i)}),this),C()(e).call(e,(function(e){if(!_hasDecorators(e))return n.push(e);var t=this.decorateElement(e,i);n.push(t.element),n.push.apply(n,t.extras),r.push.apply(r,t.finishers)}),this),!t)return{elements:n,finishers:r};var o=this.decorateConstructor(n,t);return r.push.apply(r,o.finishers),o.finishers=r,o},addElementPlacement:function(e,t,n){var r=t[e.placement];if(!n&&-1!==s()(r).call(r,e.key))throw new TypeError("Duplicated element ("+e.key+")");r.push(e.key)},decorateElement:function(e,t){for(var n=[],r=[],i=e.decorators,o=i.length-1;o>=0;o--){var a=t[e.placement];d()(a).call(a,s()(a).call(a,e.key),1);var l=this.fromElementDescriptor(e),c=this.toElementFinisherExtras((0,i[o])(l)||l);e=c.element,this.addElementPlacement(e,t),c.finisher&&r.push(c.finisher);var u=c.extras;if(u){for(var p=0;p<u.length;p++)this.addElementPlacement(u[p],t);n.push.apply(n,u)}}return{element:e,finishers:r,extras:n}},decorateConstructor:function(e,t){for(var n=[],r=t.length-1;r>=0;r--){var i=this.fromClassDescriptor(e),o=this.toClassDescriptor((0,t[r])(i)||i);if(void 0!==o.finisher&&n.push(o.finisher),void 0!==o.elements){e=o.elements;for(var a=0;a<e.length-1;a++)for(var l=a+1;l<e.length;l++)if(e[a].key===e[l].key&&e[a].placement===e[l].placement)throw new TypeError("Duplicated element ("+e[a].key+")")}}return{elements:e,finishers:n}},fromElementDescriptor:function(e){var t={kind:e.kind,key:e.key,placement:e.placement,descriptor:e.descriptor};return a()(t,p(),{value:"Descriptor",configurable:!0}),"field"===e.kind&&(t.initializer=e.initializer),t},toElementDescriptors:function(e){var t;if(void 0!==e)return k()(t=(0,g.Z)(e)).call(t,(function(e){var t=this.toElementDescriptor(e);return this.disallowProperty(e,"finisher","An element descriptor"),this.disallowProperty(e,"extras","An element descriptor"),t}),this)},toElementDescriptor:function(e){var t=String(e.kind);if("method"!==t&&"field"!==t)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+t+'"');var n=_toPropertyKey(e.key),r=String(e.placement);if("static"!==r&&"prototype"!==r&&"own"!==r)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+r+'"');var i=e.descriptor;this.disallowProperty(e,"elements","An element descriptor");var o={kind:t,key:n,placement:r,descriptor:f()({},i)};return"field"!==t?this.disallowProperty(e,"initializer","A method descriptor"):(this.disallowProperty(i,"get","The property descriptor of a field descriptor"),this.disallowProperty(i,"set","The property descriptor of a field descriptor"),this.disallowProperty(i,"value","The property descriptor of a field descriptor"),o.initializer=e.initializer),o},toElementFinisherExtras:function(e){return{element:this.toElementDescriptor(e),finisher:_optionalCallableProperty(e,"finisher"),extras:this.toElementDescriptors(e.extras)}},fromClassDescriptor:function(e){var t={kind:"class",elements:k()(e).call(e,this.fromElementDescriptor,this)};return a()(t,p(),{value:"Descriptor",configurable:!0}),t},toClassDescriptor:function(e){var t=String(e.kind);if("class"!==t)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+t+'"');this.disallowProperty(e,"key","A class descriptor"),this.disallowProperty(e,"placement","A class descriptor"),this.disallowProperty(e,"descriptor","A class descriptor"),this.disallowProperty(e,"initializer","A class descriptor"),this.disallowProperty(e,"extras","A class descriptor");var n=_optionalCallableProperty(e,"finisher");return{elements:this.toElementDescriptors(e.elements),finisher:n}},runClassFinishers:function(e,t){for(var n=0;n<t.length;n++){var r=(0,t[n])(e);if(void 0!==r){if("function"!=typeof r)throw new TypeError("Finishers must return a constructor.");e=r}}return e},disallowProperty:function(e,t,n){if(void 0!==e[t])throw new TypeError(n+" can't have a ."+t+" property.")}};return e}function _createElementDescriptor(e){var t,n=_toPropertyKey(e.key);"method"===e.kind?t={value:e.value,writable:!0,configurable:!0,enumerable:!1}:"get"===e.kind?t={get:e.value,configurable:!0,enumerable:!1}:"set"===e.kind?t={set:e.value,configurable:!0,enumerable:!1}:"field"===e.kind&&(t={configurable:!0,writable:!0,enumerable:!0});var r={kind:"field"===e.kind?"field":"method",key:n,placement:e.static?"static":"field"===e.kind?"own":"prototype",descriptor:t};return e.decorators&&(r.decorators=e.decorators),"field"===e.kind&&(r.initializer=e.value),r}function _coalesceGetterSetter(e,t){void 0!==e.descriptor.get?t.descriptor.get=e.descriptor.get:t.descriptor.set=e.descriptor.set}function _hasDecorators(e){return e.decorators&&e.decorators.length}function _isDataDescriptor(e){return void 0!==e&&!(void 0===e.value&&void 0===e.writable)}function _optionalCallableProperty(e,t){var n=e[t];if(void 0!==n&&"function"!=typeof n)throw new TypeError("Expected '"+t+"' to be a function");return n}function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var n=e[i()];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}let D=function _decorate(e,t,n,r){var i,o=_getDecoratorsApi();if(r)for(var a=0;a<r.length;a++)o=r[a](o);var l=t((function initialize(e){o.initializeInstanceElements(e,s.elements)}),n),s=o.decorateClass(function _coalesceClassElements(e){for(var t=[],isSameElement=function(e){return"method"===e.kind&&e.key===i.key&&e.placement===i.placement},n=0;n<e.length;n++){var r,i=e[n];if("method"===i.kind&&(r=y()(t).call(t,isSameElement)))if(_isDataDescriptor(i.descriptor)||_isDataDescriptor(r.descriptor)){if(_hasDecorators(i)||_hasDecorators(r))throw new ReferenceError("Duplicated methods ("+i.key+") can't be decorated.");r.descriptor=i.descriptor}else{if(_hasDecorators(i)){if(_hasDecorators(r))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+i.key+").");r.decorators=i.decorators}_coalesceGetterSetter(i,r)}else t.push(i)}return t}(k()(i=l.d).call(i,_createElementDescriptor)),e);return o.initializeClassElements(l.F,s.elements),o.runClassFinishers(l.F,s.finishers)}([(0,T.SG)(["$injector","$compile","$log","$window"])],(function(e){return{F:class HtmlHelperService{constructor(t,n,r,i){e(this),this._$injector=t,this._$compile=n,this._$log=r,this._$window=i}},d:[{kind:"get",static:!0,key:"serviceName",value:function serviceName(){return"htmlHelperSrv"}},{kind:"field",key:"_elementStyleObservers",value:()=>new(v())},{kind:"get",key:"_telemetrySrv",value:function _telemetrySrv(){return this._telemetrySrvLazy||(this._telemetrySrvLazy=this._$injector.get("telemetrySrv")),this._telemetrySrvLazy}},{kind:"method",key:"elementAdded",value:function elementAdded(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=!1;O()(t,e).each(((e,t)=>{if(n(O()(t)),i=!0,r)return!1})),r&&i||O()(e).arrive(t,{onceOnly:r},(e=>{n(O()(e))}))}},{kind:"method",key:"elementAddedOnceAsync",value:function elementAddedOnceAsync(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=[new(b())((n=>this.elementAdded(e,t,(e=>n(e)),!0)))];return n&&r.push((0,T.$U)(n)),b().race(r)}},{kind:"method",key:"unbindElementAdded",value:function unbindElementAdded(e,t){t?O()(e).unbindArrive(t):O()(e).unbindArrive()}},{kind:"method",key:"elementRemoved",value:function elementRemoved(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];O()(e).leave(t,{onceOnly:r},(e=>{n(O()(e))}))}},{kind:"method",key:"elementRemovedOnceAsync",value:function elementRemovedOnceAsync(e,t){return new(b())((n=>this.elementRemoved(e,t,(e=>n(e)),!0)))}},{kind:"method",key:"unbindElementRemoved",value:function unbindElementRemoved(e,t){t?O()(e).unbindLeave(t):O()(e).unbindLeave()}},{kind:"method",key:"styleChanged",value:function styleChanged(e,t){let n=e[0];if(!n)return;let r=new MutationObserver((()=>{t(e)}));r.observe(n,{attributes:!0,attributeFilter:["style"]});let i=this._elementStyleObservers.get(e)||[];i.push(r),this._elementStyleObservers.set(e,i)}},{kind:"method",key:"unbindStyleChanged",value:function unbindStyleChanged(e){let t=this._elementStyleObservers.get(e);if(t){for(let e of t)e.disconnect();this._elementStyleObservers.delete(e)}}},{kind:"method",key:"isElementOnScreen",value:function isElementOnScreen(e){var t;let n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=null===(t=e[0])||void 0===t?void 0:t.getBoundingClientRect();return!(!r||0===r.width||0===r.height)&&(n?r.top>=0&&r.bottom<=this._$window.innerHeight&&r.left>=0&&r.right<=this._$window.innerWidth:r.bottom>=0&&r.top<=this._$window.innerHeight&&r.right>=0&&r.left<=this._$window.innerWidth)}},{kind:"method",key:"compileHtml",value:function compileHtml(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?t.$new():t;return this._$compile(e)(n)[0]}},{kind:"method",key:"compileElement",value:function compileElement(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?t.$new():t;return this._$compile(e)(n),n}},{kind:"method",key:"injectScript",value:function injectScript(e){try{let i=this._$window.document.createElement("script");for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];i.textContent=`(${e})(${k()(n).call(n,(e=>P()(e))).join(", ")})`,(this._$window.document.head||this._$window.document.documentElement).appendChild(i),i.parentNode.removeChild(i)}catch(e){this._$log.error("Planyway failed to inject script:"),this._$log.error(e),this._telemetrySrv.logError("Planyway inject script error",e,{class:this.constructor.name,method:this.injectScript.name})}}},{kind:"method",key:"injectExternalScript",value:function injectExternalScript(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];try{let n=this._$window.document.createElement("script");C()(t).call(t,(e=>{let{key:t,value:r}=e;return n.setAttribute(t,r)})),n.innerHTML=e.replace(/\r?\n|\r/g,""),(this._$window.document.head||this._$window.document.documentElement).appendChild(n)}catch(e){this._$log.error("Planyway failed to inject external script:"),this._$log.error(e),this._telemetrySrv.logError("Planyway inject external script error",e,{class:this.constructor.name,method:this.injectExternalScript.name})}}},{kind:"method",key:"traceDOM",value:function traceDOM(e,t){let n=this._$window.document.createElement(e.tagName);if(e.id&&(n.id=e.id),e.className&&(n.className=e.className),t>0)for(let r of e.children)"SCRIPT"!==r.tagName&&"IFRAME"!==r.tagName&&n.appendChild(this.traceDOM(r,t-1));return n}}]}}))},43386:(e,t,n)=>{"use strict";n.d(t,{m:()=>PlatformService});var r,i=n(62079),o=n.n(i),a=n(52020),l=n.n(a),s=n(73324),c=n.n(s),d=n(88546),u=n.n(d),p=n(99595),h=n.n(p),f=n(66775),m=n.n(f),y=n(2201),g=n.n(y),w=n(57445),v=n.n(w),_=n(26171),b=n(35704),$=n.n(b),k=n(54847),S=n.n(k),P=n(35820),A=n.n(P),C=n(91829),E=n.n(C),O=n(78490),T=n.n(O),D=n(39290),x=n.n(D),I=(n(61539),n(23513)),j=n.n(I),R=n(19755),N=n.n(R),M=n(80569),L=n.n(M),z=n(42689),F=n(17673),B=n(88670),W=n(95977),H=n(10239),U=n(51206),K=n.n(U),Z=n(82617),X=n(27895),q=n.n(X),V=n(8937),G=n(29704),J=n(95877);function ownKeys(e,t){var n=o()(e);if(l()){var r=l()(e);t&&(r=c()(r).call(r,(function(t){return u()(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n,r,i=null!=arguments[t]?arguments[t]:{};t%2?h()(n=ownKeys(Object(i),!0)).call(n,(function(t){(0,_.Z)(e,t,i[t])})):m()?g()(e,m()(i)):h()(r=ownKeys(Object(i))).call(r,(function(t){v()(e,t,u()(i,t))}))}return e}q()(L());const Y=$()(r="2.2.2.3".split(".")).call(r,0,3).join(".");class PlatformService{static get serviceName(){return"platformSrv"}constructor(e,t,n,r,i,o,a,l,s){(0,_.Z)(this,"_exchangeSiteDataPromises",{}),(0,_.Z)(this,"_deduplicatedRestPromises",new(S())),(0,_.Z)(this,"_signalRConnections",new(S())),(0,_.Z)(this,"_appTitleComponents",{timerTime:null,collectionName:null,baseTitle:null}),this._$injector=e,this._$rootScope=t,this._$log=n,this._$window=r,this._$interval=i,this._$timeout=o,this._$translate=a,this._htmlHelperSrv=l,this._notificationSrv=s,this._isOffline=!navigator.onLine,this._$window.addEventListener("offline",(()=>this.switchToOffline())),this._$window.addEventListener("online",(()=>{this._isOffline=!1,this._onlineResolve(),this._notificationSrv.showNotification(this._$translate.instant("NOTIFICATIONS.INTERNET_CONNECTION_RESTORED"),V.k$.Info,V.Ne.ConnectError),this._$rootScope.$broadcast(V.FK.OfflineStateChanged)})),this._isOffline?this.switchToOffline():this._onlinePromise=A().resolve();try{this._browser=K().getParser(r.navigator.userAgent)}catch{}{const e=["planywayActivityDays","planywayAppStorage","planywayCollectionLocalSettings","planywayHideCardPopup","planywayIsInstallSent","planywayIsMouseflowEnabled_2022_11_08","planywayLocale","planywayMouseflowInitDate","planywayOnboardingButtonPassed","planywayOnboardingOpenBoardPassed","planywayPlanywayToken","planywayPowerUpWindowMode","planywayPushNotificationsSubscription","planywayTotalEventsCount","planywayTrialExpirationNotified","planywayUnauthorizedId","planywayUserId","planywayUserLocalSettings"];for(let t of e){let e=J.Xb.unnamespaced().getItem(t);e&&(J.Xb.setItem(t,e),J.Xb.unnamespaced().removeItem(t))}}}get _telemetrySrv(){return this._telemetrySrvLazy||(this._telemetrySrvLazy=this._$injector.get("telemetrySrv")),this._telemetrySrvLazy}initializePlatformAsync(){}getPlatformUrl(e){return e}getAppPlatform(){}getAppType(){}getAppVersion(){return"2.2.2.3"}getAppVersionShort(){return Y}getInstallType(){}isMacOS(){var e;void 0===this._isMacOS&&(this._isMacOS=E()(e=navigator.platform.toUpperCase()).call(e,"MAC"));return this._isMacOS}isInsideElectron(){return!1}isInsideTeams(){return!1}isProfitWellRetainEnabled(){return!1}clearAppStorageAsync(){}closeAppAsync(){}reloadAppAsync(){}getTelemetryDataAsync(){}setTelemetryDataAsync(e){}getAppStorageDataAsync(){}setAppStorageDataAsync(e){}isPushNotificationsSupported(){var e;void 0===this._isPushNotificationsSupported&&(this._isPushNotificationsSupported="Safari"!==(null===(e=this._browser)||void 0===e?void 0:e.getBrowserName())&&!this.isInsideElectron()&&!this.isInsideTeams()&&"serviceWorker"in navigator&&"PushManager"in window);return this._isPushNotificationsSupported}isPushNotificationsServiceWorkerSupported(){return!1}getPushNotificationsSubscriptionAsync(){}setPushNotificationsSubscriptionAsync(e){}startAppNotificationsPollingAsync(e){}setAppUnreadNotificationsCountAsync(e){}setAppTitleAsync(e){this._appTitleComponents=_objectSpread(_objectSpread({},this._appTitleComponents),e)}isOffline(){return this._isOffline}switchToOffline(){this._isOffline||(this._isOffline=!0,this._onlinePromise=new(A())((e=>{this._onlineResolve=e})),this._notificationSrv.showNotification(this._$translate.instant("NOTIFICATIONS.INTERNET_CONNECTION_LOST"),V.k$.WarningWithReload,V.Ne.ConnectError),this._$rootScope.$broadcast(V.FK.OfflineStateChanged))}waitOnlineAsync(){return this._onlinePromise}restAsync(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{token:r,headers:i={},query:o,body:a,maxRetryCount:l=3,onRetry:s,deduplicationTag:c,throttle:d,onProgress:u,usePlanywayAuth:p,useTrelloAuth:h}=n;if(d){var f;let e=`planywayThrottle_${T()(f=d.tag).call(f," ","_")}`,t=J.Xb.getItem(e);if(t&&t>(new Date).toISOString())return;try{t=(0,G.mH)(new Date,d.delay).toISOString(),J.Xb.setItem(e,t)}catch{}}let m=3e4;if(c&&this._deduplicatedRestPromises.has(c))return this._deduplicatedRestPromises.get(c);const y=(async()=>{r&&(i.Authorization=`Bearer ${r}`);let n,c=!1;if(p)this._sessionToken&&(i[Z.Mj]=this._sessionToken),c=!0;else if(h){let e=J.Xb.planywayPlanywayToken;e&&(i["x-planyway-token"]=e)}switch((p||h)&&(i[Z.ec]=this.getAppPlatform(),i[Z.yt]=this.getAppType(),i[Z.yR]=this.getAppVersion()),e){case V.Tu.Get:n=L().get(t);break;case V.Tu.PutForm:n=L().put(t).type("form").send(a);break;case V.Tu.PostForm:n=L().post(t).type("form").send(a);break;case V.Tu.PostFile:m=0;let r=new FormData;for(let[e,t]of x()(a))if("file"===e)r.append("file",new File([new Blob([(0,B.u)(a.file)])],a.name));else r.append(e,t);n=L().post(t).send(r);break;default:n=L()[e](t).send(a)}let d=await n.withCredentials(c).set(i).query(o).timeout({response:m}).retry(l,-1,((e,t)=>{null==s||s({response:e,retries:t})})).on("progress",(e=>{null==u||u({direction:e.direction,percent:e.percent})}));if(p)d.headers[Z.Mj]&&(this._sessionToken=d.headers[Z.Mj]);else if(h){let e=d.headers["x-planyway-token"];if(e)try{J.Xb.planywayPlanywayToken=e}catch{}}return d.body||d.text})();return c&&this._deduplicatedRestPromises.set(c,y),y}buildSignalRPollingController(e,t){let n,r=new(j()),i=!1;const pollAsync=async()=>{n=null,0!==r.size?(await e(),n=this._$timeout(pollAsync,t,!1)):i=!1};return{start:()=>{let e={};return r.add(e),i||(i=!0,pollAsync()),()=>{r.delete(e)}},reschedule:()=>{n&&(this._$timeout.cancel(n),n=this._$timeout(pollAsync,t,!1))},runOnceAsync:()=>{if(!i||n)return e()}}}async subscribeSignalRAsync(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{token:n,messageType:r,messageCallback:i,errorCallback:o,pollingController:a}=t;let l,s=!1,c=!1;const onError=e=>{c=!1,null==o||o(e),a&&!s&&(()=>{if(l)return;let e=a.start();l=()=>{e(),l=null}})()};let d,u={destroy:()=>{var e;s=!0,null===(e=l)||void 0===e||e()},reschedulePolling:()=>null==a?void 0:a.reschedule(),get isSignalRActive(){return c&&!s}};const subscribeSignalRAsync=()=>{let t=this._getSignalRConnection(e,n);return c=!0,d=t.addListeners(r,i,onError),t.startAsync()},p=this._$rootScope.$on(V.FK.OfflineStateChanged,(()=>{var e,t;(null===(e=l)||void 0===e||e(),this.isOffline())?(c=!1,null===(t=d)||void 0===t||t()):(null==a||a.runOnceAsync(),subscribeSignalRAsync())}));return u.destroy=()=>{var e,t;s||(s=!0,null===(e=d)||void 0===e||e(),null===(t=l)||void 0===t||t(),p())},this.isOffline()||await subscribeSignalRAsync(),u}async exchangeSiteDataAsync(e,t,n){if(this._exchangeSiteDataPromises[e]){if(this._exchangeSiteDataPromises[e].exchangeWindow)try{this._exchangeSiteDataPromises[e].exchangeWindow.focus()}catch{}}else{const r=(0,z.Z)();let i,o,a=null;const l=[new(A())((e=>{a=t=>{var n;(null===(n=t.data)||void 0===n?void 0:n.requestId)===r&&e(t.data)}}))],onBeforeUnload=()=>{var e;return null===(e=o)||void 0===e?void 0:e.close()};this._$window.addEventListener("message",a,!1),this._$window.addEventListener("beforeunload",onBeforeUnload,!1),this._exchangeSiteDataPromises[e]=(async()=>{try{const a=`https://planyway.com/common/exchange.html?${F.stringify({request_type:e,request_id:r,return_url:this._$window.location.origin,data:t})}`;if(e===V.jj.SubscribeNotifications){let e=488,t=280,n=this._$window.screenX+(this._$window.innerWidth-e)/2,r=this._$window.screenY;if(o=this._$window.open(a,"PlanywayNotificationsEnableWindow",`width=${e},height=${t},left=${n},top=${r}`),!o)throw new Error("Cannot open Planyway notifications enable window");l.push(new(A())((e=>{const t=this._$interval((()=>{try{o.closed&&(this._$interval.cancel(t),e({success:!0}))}catch{this._$interval.cancel(t),e({success:!0})}}),200,0,!1)})))}else switch(n?(N()(n).attr("src",a),l.push((async()=>(await this._htmlHelperSrv.elementRemovedOnceAsync("body",n),{success:!1,error:{message:"Planyway exchange frame removed"}}))())):i=N()(`<iframe style="display: none" src="${a}"></iframe>`).appendTo("body"),e){case V.jj.GetAuthData:case V.jj.InjectIntercomScript:break;default:l.push(this._$timeout((()=>({success:!1,error:{message:"Planyway exchange timeout exceeded"}})),1e4,!1))}return await A().race(l)}finally{var s,c;this._exchangeSiteDataPromises[e]=null,this._$window.removeEventListener("message",a,!1),this._$window.removeEventListener("beforeunload",onBeforeUnload,!1),null===(s=i)||void 0===s||s.remove(),null===(c=o)||void 0===c||c.close()}})(),o&&(this._exchangeSiteDataPromises[e].exchangeWindow=o)}let r=await this._exchangeSiteDataPromises[e];if(!r.success){if(r.error instanceof Error)throw r.error;let e=new Error;for(let t in r.error)e[t]=r.error[t];throw e}return r.data}getCurrentCollectionId(){return this._currentCollectionId}setCurrentCollectionId(e){this._currentCollectionId=e}async openOrCreateCollectionAsync(){}canDeleteCollection(e){return!0}extractCardOptionsAsync(e){if(!e)return;let t=e.attr("data-id"),n=e.attr("data-account-type"),r=e.attr("data-account-id"),i=e.attr("data-calendar-id"),o=e.attr("data-card-type"),a=e.attr("data-card-role");return t&&n&&r&&i&&o&&a?{id:t,accountType:n,accountId:r,calendarId:i,cardType:o,cardRole:a}:void 0}fireKeydownEvent(e){}async _getLastOpenedCollectionIdAsync(){}_getSignalRConnection(e,t){let n=this._signalRConnections.get(e);if(!n){let r={withCredentials:!1};t&&(r.accessTokenFactory=()=>t);let i,o=(new W.s).configureLogging({log:(e,t)=>{if(!(e<H.i.Warning))switch(e){case H.i.Critical:this._$log.error("Planyway SignalR critical error:"),this._$log.error(t),this._telemetrySrv.logError("Planyway SignalR critical error",new Error(t),{class:this.constructor.name,method:this._getSignalRConnection.name});break;case H.i.Error:this._$log.error("Planyway SignalR error:"),this._$log.error(t),this._telemetrySrv.logError("Planyway SignalR error",new Error(t),{class:this.constructor.name,method:this._getSignalRConnection.name});break;case H.i.Warning:this._$log.warn("Planyway SignalR warning:"),this._$log.warn(t);break;default:this._$log.info("Planyway SignalR message:",t)}}}).withUrl(e,r).withAutomaticReconnect().build(),a=new(j());const onError=e=>{this._signalRConnections.delete(n);for(let t of a)t(e)};n={addListeners:(e,t,n)=>(o.on(e,t),a.add(n),()=>{o.off(e,t),a.delete(n)}),startAsync:()=>(i||(i=o.start().catch(onError)),i)},o.onclose(onError),this._signalRConnections.set(e,n)}return n}}},92047:(e,t,n)=>{(t=e.exports=n(9252)(!1)).push([e.id,"",""]),t.locals={color50:"#e5efff",color100:"#bfd7ff",color200:"#94bcff",color300:"#69a1ff",color400:"#498dff",color500:"#2979ff",color600:"#2471ff",color700:"#1f66ff",color800:"#195cff",color900:"#0f49ff",colorA100:"#ffffff",colorA200:"#f7f9ff",colorA400:"#c4d0ff",colorA700:"#abbcff"}}}]);