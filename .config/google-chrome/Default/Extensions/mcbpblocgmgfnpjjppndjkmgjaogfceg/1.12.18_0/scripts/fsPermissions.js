/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
var permissionsObject={permissions:["tabs"],origins:["<all_urls>"]};
function addHandlers(){$("#btnAddPermissions").click(()=>{addPermissions(permissionsObject,()=>{alert(chrome.i18n.getMessage("alert_thanks_for_granting_permissions"));window.close()})});$("#btnAddGMailPermission").click(function(){addGmailPermission(function(){chrome.extension.getBackgroundPage().openGmailComposer();window.close()},function(){alert("Permission not granted, FireShot will not be able to create Gmail attachments.")})})}
chrome.runtime.onMessage.addListener((a,b,c)=>{"setRequiredPermissions"===a.topic&&a.data&&(permissionsObject=a.data)});document.addEventListener("DOMContentLoaded",function(){$(isSafari()?"imgPermisionsDialogMac":"#imgPermisionsDialogWindows").show();addHandlers()});window.addEventListener("unload",function(){getExtension().fPermissionsPageOpened=!1});
