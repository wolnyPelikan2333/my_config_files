/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
const backgroundPage=getExtension();
function downloadInstaller(){backgroundPage.removeDeterminingFilenameHandler();fetch(chrome.runtime.getURL("native/fireshot-chrome-plugin.dat")).then(b=>b.blob()).then(b=>{var a=document.createElement("a");a.download="fireshot-chrome-plugin.exe";a.href=window.URL.createObjectURL(b);a.textContent="";a.dataset.downloadurl=["application/octet-stream",a.download,a.href].join(":");document.documentElement.appendChild(a);a.click();document.documentElement.removeChild(a)})}
document.addEventListener("DOMContentLoaded",function(){function b(){backgroundPage.fsNativePlugin.ready?(gaTrack("UA-1025658-9","DLL","NativeHostInstalled"),backgroundPage.updateContextMenu(),backgroundPage.doTrial(),window.close()):(getConsolePtr()("check"),backgroundPage.fsNativePlugin.autoReconnect||backgroundPage.fsNativePlugin.updating||backgroundPage.fsNativePlugin.portBusy||(getConsolePtr()("connecting from page"),backgroundPage.fsNativePlugin.init()),setTimeout(function(){b()},1E3))}downloadInstaller();
isOpera()?($("#img-step1-opera").toggle(),$("#download-image").addClass("opera-download")):($("#img-step1").toggle(),$("#download-image").addClass("chrome-download"));b()});
