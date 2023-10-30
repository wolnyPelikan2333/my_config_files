/*
##
##  Enhancer for YouTube™
##  =====================
##
##  Author: Maxime RF <https://www.mrfdev.com>
##
##  This file is protected by copyright laws and international copyright
##  treaties, as well as other intellectual property laws and treaties.
##
##  All rights not expressly granted to you are retained by the author.
##  Read the license.txt file for more details.
##
##  © MRFDEV.com - All Rights Reserved
##
*/
(function(w,d){if(!w.efyt){w.efyt=!0;var A="true"===(new URLSearchParams(d.currentScript.src.split("?")[1])).get("incognito");function p(){try{var e=c.getAvailableQualityLevels(),b=d.fullscreenElement?a.qualityembedsfullscreen:a.qualityembeds;0<=e.indexOf(b)?c.setPlaybackQualityRange(b,b):c.setPlaybackQualityRange(e[0],e[0]);5!==c.getPlayerState()&&(t=!0)}catch(f){}}function x(){k.setAttribute("style","display:block!important");clearTimeout(B);B=setTimeout(function(){k.setAttribute("style",
"display:none!important")},1500)}function C(){var e=d.querySelector(".ytp-popup.ytp-contextmenu");e&&0<e.getBoundingClientRect().height&&(e.style.display="none");d.body.classList.remove("ytp-contextmenu-hidden")}function D(){var e=d.createElement("style");e.type="text/css";e.textContent="#efyt-player-info{background-color:rgba(0,0,0,0.3);color:#fff;display:none;font-size:17px;left:0;padding:7px 0;position:absolute;text-align:center;top:0;width:100%;z-index:2147483647} body.ytp-contextmenu-hidden .ytp-contextmenu{visibility:hidden!important} .ytp-pause-overlay-hidden .ytp-pause-overlay{display:none!important}";
d.head.appendChild(e);k=d.createElement("div");k.id="efyt-player-info";c.appendChild(k);c.addEventListener("onStateChange",function(b){1!==b||!a.pausevideos||a.ignorepopupplayer||d.hidden||y||(y=!0,d.dispatchEvent(new Event("efyt-pause-videos")),setTimeout(function(){y=!1},1E3));1!==b&&3!==b||!a.selectquality||t||p();1===b?h.classList.add("ytp-pause-overlay-hidden"):2===b?setTimeout(function(){c.classList.remove("ytp-expand-pause-overlay");h.classList.remove("ytp-pause-overlay-hidden")},1E3):0===
b&&(t=!1)});h.classList.add("ytp-pause-overlay-hidden");h.addEventListener("wheel",function(b){if(!c.classList.contains("ytp-settings-shown")&&!c.classList.contains("ytp-menu-shown"))if(b.ctrlKey&&a.controlspeed&&(a.controlspeedmousebutton&&q||!a.controlspeedmousebutton)){b.preventDefault();try{if(a.overridespeeds){var f=g.playbackRate;if(!a.reversemousewheeldirection&&0<b.deltaY||a.reversemousewheeldirection&&0>b.deltaY)f=parseFloat((f-a.speedvariation).toFixed(2)),0>=f&&(f=a.speedvariation),g.playbackRate=
f;else if(!a.reversemousewheeldirection&&0>b.deltaY||a.reversemousewheeldirection&&0<b.deltaY)f=parseFloat((f+a.speedvariation).toFixed(2)),g.playbackRate=f}else{var r=c.getAvailablePlaybackRates();f=c.getPlaybackRate();var u=r.indexOf(f);(!a.reversemousewheeldirection&&0<b.deltaY||a.reversemousewheeldirection&&0>b.deltaY)&&0<u?(f=r[u-1],c.setPlaybackRate(f)):(!a.reversemousewheeldirection&&0>b.deltaY||a.reversemousewheeldirection&&0<b.deltaY)&&u<r.length-1&&(f=r[u+1],c.setPlaybackRate(f))}m=!0;k.textContent=
f+"x";x()}catch(F){}}else if(a.controlvolume&&(a.controlvolumemousebutton&&q||!a.controlvolumemousebutton)){b.preventDefault();try{var l=c.getVolume();!a.reversemousewheeldirection&&0<b.deltaY||a.reversemousewheeldirection&&0>b.deltaY?(l-=a.volumevariation,0>l&&(l=0)):(l+=a.volumevariation,100<l&&(l=100),c.isMuted()&&c.unMute());n=!0;c.setVolume(l);k.textContent=l;x()}catch(F){}}});h.addEventListener("mousedown",function(b){2===b.button&&(a.controlvolumemousebutton||a.controlspeedmousebutton)&&(q=
!0,d.body.classList.add("ytp-contextmenu-hidden"))},!0);h.addEventListener("mouseup",function(b){2===b.button&&(a.controlvolumemousebutton||a.controlspeedmousebutton)&&(q=!1,E?n||m?setTimeout(C,500):d.body.classList.remove("ytp-contextmenu-hidden"):(n||m?(v=!0,setTimeout(C,500)):(v=!1,d.body.classList.remove("ytp-contextmenu-hidden")),n=m=!1))},!0);h.addEventListener("mouseleave",function(){q=n=m=!1;d.body.classList.remove("ytp-contextmenu-hidden")});h.addEventListener("contextmenu",function(b){if(E&&
(a.controlvolumemousebutton&&n||a.controlspeedmousebutton&&m))return b.stopPropagation(),b.preventDefault(),n=m=!1;if((a.controlvolumemousebutton||a.controlspeedmousebutton)&&v)return b.preventDefault(),v=!1},!0);g.addEventListener("click",function(b){if(b.ctrlKey){b.preventDefault();try{var f=b.shiftKey?1:a.speed;a.overridespeeds?g.playbackRate=f:c.setPlaybackRate(f);k.textContent=f+"x";x()}catch(r){}}});a.defaultvolume&&c.setVolume(a.volume);a.overridespeeds?(g.playbackRate=a.speed,g.defaultPlaybackRate=
a.speed):c.setPlaybackRate(a.speed)}d.addEventListener("efyt-update-preferences",function(e){a=e.detail.prefs;c&&(a.selectquality&&(t=!1,p()),a.defaultvolume&&c.setVolume(a.volume),a.overridespeeds?(g.playbackRate=a.speed,g.defaultPlaybackRate=a.speed):c.setPlaybackRate(a.speed))});d.addEventListener("efyt-pause-video",function(e){a.ignorepopupplayer||c.pauseVideo()});var z;"onfullscreenchange"in d?z="fullscreenchange":"onmozfullscreenchange"in d&&(z="mozfullscreenchange");d.addEventListener(z,function(e){setTimeout(function(){c&&
d.fullscreenElement&&a.selectquality&&a.selectqualityfullscreenon?p():c&&!d.fullscreenElement&&a.selectquality&&a.selectqualityfullscreenoff&&p()},500)});var E="Win32"===navigator.platform||"Win64"===navigator.platform,q=!1,m=!1,n=!1,t,y,v,B,k,g;try{var a=JSON.parse(localStorage.getItem("enhancer-for-youtube"))||{}}catch(e){a={},A||d.dispatchEvent(new Event("efyt-get-preferences"))}A&&d.dispatchEvent(new Event("efyt-get-preferences"));"undefined"===typeof a.controlspeed&&(a.controlspeed=!0);"undefined"===
typeof a.ignorepopupplayer&&(a.ignorepopupplayer=!0);"undefined"===typeof a.overridespeeds&&(a.overridespeeds=!0);"undefined"===typeof a.pausevideos&&(a.pausevideos=!0);a.qualityembeds||(a.qualityembeds="medium");a.qualityembedsfullscreen||(a.qualityembedsfullscreen="hd1080");a.speed||(a.speed=1);a.speedvariation||(a.speedvariation=.1);a.volume||(a.volume=50);a.volumevariation||(a.volumevariation=5);if("complete"===d.readyState)if(g=d.querySelector(".html5-main-video")){var c=g.parentNode.parentNode;
var h=c.parentNode;D()}else d.location.reload();HTMLVideoElement.prototype.play=function(e){return function(){!this.hasAttribute("efyt")&&this.classList.contains("html5-main-video")&&(this.setAttribute("efyt",""),g=this,c=this.parentNode.parentNode,h=c.parentNode,a.selectquality&&p(),D());return e.apply(this,arguments)}}(HTMLVideoElement.prototype.play);w.MediaSource&&(MediaSource.isTypeSupported=function(e){return function(b){return a.blockhfrformats&&/framerate=([4-6]\d|\d{3,})/.test(b)||a.blockwebmformats&&
/video\/webm/.test(b)?!1:e(b)}}(MediaSource.isTypeSupported))}})(window,document);