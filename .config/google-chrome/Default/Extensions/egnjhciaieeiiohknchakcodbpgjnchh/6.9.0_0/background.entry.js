!function(e){function t(t){for(var n,s,a=t[0],c=t[1],u=t[2],f=0,d=[];f<a.length;f++)s=a[f],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(l&&l(t);d.length;)d.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var c=r[a];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},o={1:0},i=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;i.push([218,0]),r()}({101:function(e,t,r){var n,o,i;!function(r,s){"use strict";"object"==typeof e.exports?e.exports=s():(o=[],void 0===(i="function"==typeof(n=s)?n.apply(t,o):n)||(e.exports=i))}(0,(function(){"use strict";var e=Object.prototype.toString,t=Object.prototype.hasOwnProperty;function r(e){if(!e)return!0;if(a(e)&&0===e.length)return!0;if(!i(e)){for(var r in e)if(t.call(e,r))return!1;return!0}return!1}function n(t){return e.call(t)}function o(e){return"number"==typeof e||"[object Number]"===n(e)}function i(e){return"string"==typeof e||"[object String]"===n(e)}function s(e){return"object"==typeof e&&"[object Object]"===n(e)}function a(e){return"object"==typeof e&&"number"==typeof e.length&&"[object Array]"===n(e)}function c(e){var t=parseInt(e);return t.toString()===e?t:e}function u(e,t,n,s){if(o(t)&&(t=[t]),r(t))return e;if(i(t))return u(e,t.split(".").map(c),n,s);var a=t[0];if(1===t.length){var l=e[a];return void 0!==l&&s||(e[a]=n),l}return void 0===e[a]&&(o(t[1])?e[a]=[]:e[a]={}),u(e[a],t.slice(1),n,s)}var l=function(e){return Object.keys(l).reduce((function(t,r){return"function"==typeof l[r]&&(t[r]=l[r].bind(l,e)),t}),{})};return l.has=function(e,n){if(r(e))return!1;if(o(n)?n=[n]:i(n)&&(n=n.split(".")),r(n)||0===n.length)return!1;for(var c=0;c<n.length;c++){var u=n[c];if(!s(e)&&!a(e)||!t.call(e,u))return!1;e=e[u]}return!0},l.ensureExists=function(e,t,r){return u(e,t,r,!0)},l.set=function(e,t,r,n){return u(e,t,r,n)},l.insert=function(e,t,r,n){var o=l.get(e,t);n=~~n,a(o)||(o=[],l.set(e,t,o)),o.splice(n,0,r)},l.empty=function(e,c){if(r(c))return e;if(!r(e)){var u,f;if(!(u=l.get(e,c)))return e;if(i(u))return l.set(e,c,"");if(function(e){return"boolean"==typeof e||"[object Boolean]"===n(e)}(u))return l.set(e,c,!1);if(o(u))return l.set(e,c,0);if(a(u))u.length=0;else{if(!s(u))return l.set(e,c,null);for(f in u)t.call(u,f)&&delete u[f]}}},l.push=function(e,t){var r=l.get(e,t);a(r)||(r=[],l.set(e,t,r)),r.push.apply(r,Array.prototype.slice.call(arguments,2))},l.coalesce=function(e,t,r){for(var n,o=0,i=t.length;o<i;o++)if(void 0!==(n=l.get(e,t[o])))return n;return r},l.get=function(e,t,n){if(o(t)&&(t=[t]),r(t))return e;if(r(e))return n;if(i(t))return l.get(e,t.split("."),n);var s=c(t[0]);return 1===t.length?void 0===e[s]?n:e[s]:l.get(e[s],t.slice(1),n)},l.del=function(e,t){return function e(t,n){if(o(n)&&(n=[n]),!r(t)){if(r(n))return t;if(i(n))return e(t,n.split("."));var s=c(n[0]),u=t[s];if(1===n.length)void 0!==u&&(a(t)?t.splice(s,1):delete t[s]);else if(void 0!==t[s])return e(t[s],n.slice(1));return t}}(e,t)},l}))},218:function(e,t,r){"use strict";r.r(t);var n=r(17),o=r(65),i="persist:",s="persist/FLUSH",a="persist/REHYDRATE",c="persist/PAUSE",u="persist/PERSIST",l="persist/PURGE",f="persist/REGISTER",d=-1,p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function g(e,t,r,n){n.debug;var o=b({},r);return e&&"object"===(void 0===e?"undefined":p(e))&&Object.keys(e).forEach((function(n){"_persist"!==n&&t[n]===r[n]&&(o[n]=e[n])})),o}function h(e){var t=e.blacklist||null,r=e.whitelist||null,n=e.transforms||[],o=e.throttle||0,s=""+(void 0!==e.keyPrefix?e.keyPrefix:i)+e.key,a=e.storage,c=!1===e.serialize?function(e){return e}:v,u={},l={},f=[],d=null,p=null;function b(){if(0===f.length)return d&&clearInterval(d),void(d=null);var e=f.shift(),t=n.reduce((function(t,r){return r.in(t,e,u)}),u[e]);if(void 0!==t)try{l[e]=c(t)}catch(e){console.error("redux-persist/createPersistoid: error serializing state",e)}else delete l[e];0===f.length&&(Object.keys(l).forEach((function(e){void 0===u[e]&&delete l[e]})),p=a.setItem(s,c(l)).catch(g))}function g(e){0}return{update:function(e){Object.keys(e).forEach((function(n){(function(e){return(!r||-1!==r.indexOf(e)||"_persist"===e)&&(!t||-1===t.indexOf(e))})(n)&&u[n]!==e[n]&&-1===f.indexOf(n)&&f.push(n)})),Object.keys(u).forEach((function(t){void 0===e[t]&&f.push(t)})),null===d&&(d=setInterval(b,o)),u=e},flush:function(){for(;0!==f.length;)b();return p||Promise.resolve()}}}function v(e){return JSON.stringify(e)}function y(e){var t=e.transforms||[],r=""+(void 0!==e.keyPrefix?e.keyPrefix:i)+e.key,n=e.storage,o=(e.debug,!1===e.serialize?function(e){return e}:m);return n.getItem(r).then((function(e){if(e)try{var r={},n=o(e);return Object.keys(n).forEach((function(e){r[e]=t.reduceRight((function(t,r){return r.out(t,e,n)}),o(n[e]))})),r}catch(e){throw e}}))}function m(e){return JSON.parse(e)}function O(e){0}var T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};var w=5e3;function S(e,t){var r=void 0!==e.version?e.version:d,n=(e.debug,void 0===e.stateReconciler?g:e.stateReconciler),o=e.getStoredState||y,f=void 0!==e.timeout?e.timeout:w,p=null,b=!1,v=!0,m=function(e){return e._persist.rehydrated&&p&&!v&&p.update(e),e};return function(d,g){var y=d||{},w=y._persist,S=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(y,["_persist"]);if(g.type===u){var j=!1,P=function(t,r){j||(g.rehydrate(e.key,t,r),j=!0)};if(f&&setTimeout((function(){!j&&P(void 0,new Error('redux-persist: persist timed out for persist key "'+e.key+'"'))}),f),v=!1,p||(p=h(e)),w)return d;if("function"!=typeof g.rehydrate||"function"!=typeof g.register)throw new Error("redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.");return g.register(e.key),o(e).then((function(t){(e.migrate||function(e,t){return Promise.resolve(e)})(t,r).then((function(e){P(e)}),(function(e){P(void 0,e)}))}),(function(e){P(void 0,e)})),T({},t(S,g),{_persist:{version:r,rehydrated:!1}})}if(g.type===l)return b=!0,g.result(function(e){var t=e.storage,r=""+(void 0!==e.keyPrefix?e.keyPrefix:i)+e.key;return t.removeItem(r,O)}(e)),T({},t(S,g),{_persist:w});if(g.type===s)return g.result(p&&p.flush()),T({},t(S,g),{_persist:w});if(g.type===c)v=!0;else if(g.type===a){if(b)return T({},S,{_persist:T({},w,{rehydrated:!0})});if(g.key===e.key){var E=t(S,g),k=g.payload,_=!1!==n&&void 0!==k?n(k,d,E,e):E,I=T({},_,{_persist:T({},w,{rehydrated:!0})});return m(I)}}if(!w)return t(d,g);var A=t(S,g);return A===S?d:(A._persist=w,m(A))}}"function"==typeof Symbol&&Symbol.iterator,Object.assign;var j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function P(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var E={registry:[],bootstrapped:!1},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1];switch(t.type){case f:return j({},e,{registry:[].concat(P(e.registry),[t.key])});case a:var r=e.registry.indexOf(t.key),n=[].concat(P(e.registry));return n.splice(r,1),j({},e,{registry:n,bootstrapped:0===n.length});default:return e}};function _(e,t,r){var o=r||!1,i=Object(n.d)(k,E,t?t.enhancer:void 0),d=function(e){i.dispatch({type:f,key:e})},p=function(t,r,n){var s={type:a,payload:r,err:n,key:t};e.dispatch(s),i.dispatch(s),o&&b.getState().bootstrapped&&(o(),o=!1)},b=j({},i,{purge:function(){var t=[];return e.dispatch({type:l,result:function(e){t.push(e)}}),Promise.all(t)},flush:function(){var t=[];return e.dispatch({type:s,result:function(e){t.push(e)}}),Promise.all(t)},pause:function(){e.dispatch({type:c})},persist:function(){e.dispatch({type:u,register:d,rehydrate:p})}});return b.persist(),b}function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){x(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var D={installDate:Date.now(),savedTabs:[],totalTabsRemoved:0,totalTabsUnwrangled:0,totalTabsWrangled:0};function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function W(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var R={paused:!1,theme:"system"};function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(Object(r),!0).forEach((function(t){N(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var U={commands:[],sessions:[]};function V(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(o){return"function"==typeof o?o(r,n,e):t(o)}}}}var G=V();G.withExtraArgument=V;var q=G;function H(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var z=["installDate","savedTabs","totalTabsRemoved","totalTabsUnwrangled","totalTabsWrangled"],J={key:"localStorage",migrate:function(e){return null==e?new Promise((function(t){chrome.storage.local.get(z,(function(r){z.some((function(e){return"installDate"!==e&&null==r[e]}))?t(e):(chrome.storage.local.remove(Object.keys(r)),t(r))}))})):Promise.resolve(e)},serialize:!1,storage:o.localStorage,timeout:0,version:2},Q={key:"settings",migrate:function(e){if(null==e)return Promise.resolve(e);switch(e._persist.version){case 1:return new Promise((function(t){chrome.storage.sync.get("paused",(function(r){Object.prototype.hasOwnProperty.call(r,"paused")?(console.log("migrating! found paused",r.paused),t(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?H(Object(r),!0).forEach((function(t){F(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):H(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e,{paused:r.paused}))):t(e)}))}));default:return Promise.resolve(e)}},serialize:!1,storage:o.syncStorage,timeout:0,version:2},Y=Object(n.c)({localStorage:S(J,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE_ALL_SAVED_TABS":return A({},e,{savedTabs:[]});case"REMOVE_SAVED_TABS":var r=new Set(t.tabs),n=e.savedTabs.filter((function(e){return!r.has(e)}));return A({},e,{savedTabs:n});case"SET_SAVED_TABS":return A({},e,{savedTabs:t.savedTabs});case"SET_TOTAL_TABS_REMOVED":return A({},e,{totalTabsRemoved:t.totalTabsRemoved});case"SET_TOTAL_TABS_UNWRANGLED":return A({},e,{totalTabsUnwrangled:t.totalTabsUnwrangled});case"SET_TOTAL_TABS_WRANGLED":return A({},e,{totalTabsWrangled:t.totalTabsWrangled});default:return e}})),settings:S(Q,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PAUSED_SETTING":return W({},e,{paused:t.value});case"SET_THEME_SETTING":return W({},e,{theme:t.value});default:return e}})),tempStorage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLEAR_TEMP_STORAGE":return{commands:[],sessions:[]};case"SET_COMMANDS":return B({},e,{commands:t.commands});case"FETCH_SESSIONS_REQUEST":return B({},e,{sessions:[]});case"FETCH_SESSIONS_SUCCESS":return B({},e,{sessions:t.sessions});default:return e}}}),K=r(44),X=r.n(K),Z=r(36),$=r(11),ee={tabTimes:{},closedTabs:{clear:function(){TW.store.dispatch(Object($.a)())},findPositionById:function(e){for(var t=TW.store.getState().localStorage.savedTabs,r=0;r<t.length;r++)if(t[r].id===e)return r;return null},findPositionByURL:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return TW.store.getState().localStorage.savedTabs.findIndex((function(t){return t.url===e&&null!=e}))},findPositionByHostnameAndTitle:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=new URL(e).hostname;return TW.store.getState().localStorage.savedTabs.findIndex((function(e){return new URL(e.url||"").hostname===r&&e.title===t}))},unwrangleTabs:function(e){var t=TW.store.getState().localStorage,r=t.installDate,n=0;e.forEach((function(e){null==e.session||null==e.session.tab?chrome.tabs.create({active:!1,url:e.tab.url}):chrome.sessions.restore(e.session.tab.sessionId),e.tab.closedAt>=r&&n++})),TW.store.dispatch(Object($.b)(e.map((function(e){return e.tab}))));var o=t.totalTabsUnwrangled;TW.store.dispatch(Object($.e)(o+n))},getURLPositionFilterByWrangleOption:function(e){return"hostnameAndTitleMatch"===e?function(e){return ee.closedTabs.findPositionByHostnameAndTitle(e.url,e.title)}:"exactURLMatch"===e?function(e){return ee.closedTabs.findPositionByURL(e.url)}:function(){return-1}},wrangleTabs:function(e){for(var t=TW.settings.get("maxTabs"),r=TW.store.getState().localStorage.totalTabsWrangled,n=TW.settings.get("wrangleOption"),o=this.getURLPositionFilterByWrangleOption(n),i=TW.store.getState().localStorage.savedTabs.slice(),s=0;s<e.length;s++){null===e[s]&&console.log("Weird bug, backtrace this...");var a=o(e[s]),c=(new Date).getTime();a>-1&&i.splice(a,1),e[s].closedAt=c,i.unshift(e[s]),r+=1,chrome.tabs.remove(e[s].id)}i.length-t>0&&(i=i.splice(0,t)),TW.store.dispatch(Object($.c)(i)),TW.store.dispatch(Object($.f)(r))}},initTabs:function(e){for(var t=0;t<e.length;t++)ee.updateLastAccessed(e[t])},exportData:Z.a,importData:Z.c,getAll:function(){return ee.getOlderThen()},getOlderThen:function(e){var t=[];for(var r in this.tabTimes)Object.prototype.hasOwnProperty.call(this.tabTimes,r)&&(!e||this.tabTimes[r]<e)&&t.push(parseInt(r,10));return t},getWhitelistMatch:function(e){for(var t=TW.settings.get("whitelist"),r=0;r<t.length;r++)if(-1!==e.indexOf(t[r]))return t[r];return!1},isLocked:function(e){return-1!==TW.settings.get("lockedIds").indexOf(e)},isWhitelisted:function(e){return!1!==this.getWhitelistMatch(e)},lockTab:function(e){var t=TW.settings.get("lockedIds");e>0&&-1===t.indexOf(e)&&t.push(e),TW.settings.set("lockedIds",t)},removeTab:function(e){var t=TW.store.getState().localStorage.totalTabsRemoved;TW.store.dispatch(Object($.d)(t+1)),delete ee.tabTimes[String(e)]},replaceTab:function(e,t){ee.removeTab(t),ee.updateLastAccessed(e)},unlockTab:function(e){var t=TW.settings.get("lockedIds");t.indexOf(e)>-1&&t.splice(t.indexOf(e),1),TW.settings.set("lockedIds",t)},updateClosedCount:function(){var e;if(TW.settings.get("showBadgeCount")){var t=TW.store.getState().localStorage.savedTabs.length;e=0===t.length?"":t.toString()}else e="";chrome.browserAction.setBadgeText({text:e})},updateLastAccessed:function(e){var t;Array.isArray(e)?e.map(ee.updateLastAccessed.bind(this)):"number"==typeof(t="number"==typeof e?e:e.id)?ee.tabTimes[String(t)]=(new Date).getTime():console.log("Error: `tabId` is not an number",t)}},te=ee;var re={cache:{},defaults:{checkInterval:5e3,corralTabSortOrder:null,debounceOnActivated:!1,filterAudio:!0,filterGroupedTabs:!1,lockedIds:[],lockTabSortOrder:null,maxTabs:100,minTabs:5,minutesInactive:20,purgeClosedTabs:!1,secondsInactive:0,showBadgeCount:!1,whitelist:["about:","chrome://"],wrangleOption:"withDupes"},init:function(){var e=this,t=[];for(var r in this.defaults)Object.prototype.hasOwnProperty.call(this.defaults,r)&&(this.cache[r]=this.defaults[r],t.push(r));chrome.storage.sync.get(t,(function(t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e.cache[r]=t[r],"showBadgeCount"===r&&te.updateClosedCount())}))},get:function(e){return"function"==typeof this[e]?this[e]():this.cache[e]},set:function(e,t){"function"==typeof this["set"+e]?this["set"+e](t):re.setValue(e,t)},setmaxTabs:function(e){if(isNaN(parseInt(e,10))||parseInt(e,10)<1||parseInt(e,10)>1e3)throw Error(chrome.i18n.getMessage("settings_setmaxTabs_error")||"Error: settings.setmaxTabs");re.setValue("maxTabs",e)},setminTabs:function(e){if(isNaN(parseInt(e,10))||parseInt(e,10)<0)throw Error(chrome.i18n.getMessage("settings_setminTabs_error")||"Error: settings.setminTabs");re.setValue("minTabs",e)},setminutesInactive:function(e){var t=parseInt(e,10);if(isNaN(t)||t<0)throw Error(chrome.i18n.getMessage("settings_setminutesInactive_error")||"Error: settings.setminutesInactive");te.tabTimes={},chrome.tabs.query({windowType:"normal"},te.initTabs),re.setValue("minutesInactive",e)},setsecondsInactive:function(e){var t=parseInt(e,10);if(isNaN(t)||t<0||t>59)throw Error(chrome.i18n.getMessage("settings_setsecondsInactive_error")||"Error: setsecondsInactive");te.tabTimes={},chrome.tabs.query({windowType:"normal"},te.initTabs),re.setValue("secondsInactive",e)},setshowBadgeCount:function(e){re.setValue("showBadgeCount",e),te.updateClosedCount()},setValue:function(e,t,r){this.cache[e]=t,chrome.storage.sync.set(function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}({},e,t),r)},stayOpen:function(){return 6e4*parseInt(this.get("minutesInactive"),10)+1e3*parseInt(this.get("secondsInactive"),10)}},ne=re;function oe(e){var t=e.match(/[^:]+:\/\/([^/]+)\//);return null==t?null:t[1]}var ie,se={lockActionId:null,pageSpecificActions:{lockTab:function(e,t){null!=t.id&&te.lockTab(t.id)},lockDomain:function(e,t){if(null!=t.url){var r=oe(t.url);if(null!=r){var n=ne.get("whitelist");n.push(r),ne.set("whitelist",n)}}},corralTab:function(e,t){te.closedTabs.wrangleTabs([t])}},createContextMenus:function(){var e={type:"checkbox",title:chrome.i18n.getMessage("contextMenu_lockTab")||"",onclick:this.pageSpecificActions.lockTab},t={type:"checkbox",title:chrome.i18n.getMessage("contextMenu_lockDomain")||"",onclick:this.pageSpecificActions.lockDomain},r={type:"normal",title:chrome.i18n.getMessage("contextMenu_corralTab")||"",onclick:this.pageSpecificActions.corralTab};this.lockTabId=chrome.contextMenus.create(e),this.lockDomainId=chrome.contextMenus.create(t),chrome.contextMenus.create(r)},updateContextMenus:function(e){var t=this;chrome.tabs.get(e,(function(e){try{if(null==e.url)return;var r=oe(e.url);if(null==r)return;chrome.contextMenus.update(t.lockDomainId,{title:chrome.i18n.getMessage("contextMenu_lockSpecificDomain",r)||""})}catch(t){throw console.log(e,"Error in updating menu"),t}})),chrome.contextMenus.update(this.lockTabId,{checked:te.isLocked(e)})}},ae=r(67),ce=r.n(ae),ue=window.TW={},le=function(e){try{e=e||(new Date).getTime()-ne.get("stayOpen");var t=ne.get("minTabs"),r=ne.get("lockedIds"),n=te.getOlderThen(e);ue.store.getState().settings.paused||(chrome.tabs.query({active:!0,lastFocusedWindow:!0},te.updateLastAccessed),!0===ne.get("filterAudio")&&chrome.tabs.query({audible:!0},te.updateLastAccessed),chrome.windows.getAll({populate:!0},(function(e){var o=[];e.forEach((function(e){if(null!=(o=e.tabs)){o=o.filter((function(e){return!1===e.pinned})),o=ne.get("filterAudio")?o.filter((function(e){return!e.audible})):o;var i=(o=ne.get("filterGroupedTabs")?o.filter((function(e){return!("groupId"in e)||e.groupId<=0})):o).filter((function(e){return null==e.id||-1!==n.indexOf(e.id)}));if(o.length-t<=0)for(var s=0;s<o.length;s++){var a=o[s].id;null!=a&&e.focused&&te.updateLastAccessed(a)}else if(0!==(i=i.splice(0,o.length-t)).length)for(var c=0;c<i.length;c++){var u=i[c].id;null!=u&&(-1===r.indexOf(u)?de(i[c]):te.updateLastAccessed(u))}}}))})))}finally{fe()}};function fe(){null!=ie&&window.clearTimeout(ie),ie=window.setTimeout(le,ne.get("checkInterval"))}var de=function(e){!0!==e.pinned&&(ne.get("filterAudio")&&e.audible||null!=e.url&&te.isWhitelisted(e.url)||te.closedTabs.wrangleTabs([e]))},pe=function(e){null!=e.id&&te.updateLastAccessed(e.id)};!function(){var e=function(){var e=Object(n.d)(Y,Object(n.a)(q));return{persistor:_(e),store:e}}(),t=e.persistor,r=e.store;ue.store=r,ue.persistor=t,function(e){var t=ce()(e.getState,"localStorage.savedTabs");e.subscribe(t((function(){te.updateClosedCount()})))}(r),function(e){var t=ce()(e.getState,"settings.paused");e.subscribe(t((function(e){e?chrome.browserAction.setIcon({path:"img/icon-paused.png"}):(chrome.browserAction.setIcon({path:"img/icon.png"}),chrome.tabs.query({windowType:"normal"},te.initTabs))})))}(r),ne.init(),ue.settings=ne,ue.tabmanager=te,!1!==ne.get("purgeClosedTabs")&&te.closedTabs.clear(),ne.set("lockedIds",[]);var o=X()(te.updateLastAccessed.bind(te),1e3);chrome.tabs.query({windowType:"normal"},te.initTabs),chrome.tabs.onCreated.addListener(pe),chrome.tabs.onRemoved.addListener(te.removeTab),chrome.tabs.onReplaced.addListener(te.replaceTab),chrome.tabs.onActivated.addListener((function(e){se.updateContextMenus(e.tabId),ne.get("debounceOnActivated")?o(e.tabId):te.updateLastAccessed(e.tabId)})),fe(),se.createContextMenus(),chrome.commands.onCommand.addListener((function(e){switch(e){case"wrangle-current-tab":chrome.tabs.query({active:!0,currentWindow:!0},(function(e){te.closedTabs.wrangleTabs(e)}))}}))}()},65:function(e,t,r){"use strict";var n=i(r(98)),o=i(r(99));function i(e){return e&&e.__esModule?e:{default:e}}e.exports={localStorage:n.default,syncStorage:o.default}},67:function(e,t,r){"use strict";var n=r(101).get;function o(e,t){return e===t}e.exports=function(e,t,r){r=r||o;var i=n(e(),t);return function(o){return function(){var s=n(e(),t);if(!r(i,s)){var a=i;i=s,o(s,a,t)}}}}},69:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{getItem:function(t){return new Promise((function(r,n){chrome.storage[e].get(t,(function(e){null==chrome.runtime.lastError?r(e[t]):n()}))}))},removeItem:function(t){return new Promise((function(r,n){chrome.storage[e].remove(t,(function(){null==chrome.runtime.lastError?r():n()}))}))},setItem:function(t,r){return new Promise((function(n,o){chrome.storage[e].set(function(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r;return e}({},t,r),(function(){null==chrome.runtime.lastError?n():o()}))}))}}}},98:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(69),i=(n=o)&&n.__esModule?n:{default:n};t.default=(0,i.default)("local")},99:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(69),i=(n=o)&&n.__esModule?n:{default:n};t.default=(0,i.default)("sync")}});