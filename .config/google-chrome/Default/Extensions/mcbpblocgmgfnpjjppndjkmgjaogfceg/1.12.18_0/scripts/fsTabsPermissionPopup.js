/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
document.addEventListener("DOMContentLoaded",()=>{try{i18nPrepare()}catch(a){logError(a.message)}let c=new URLSearchParams(document.location.href.split("?")[1]),d=parseInt(c.get("action")),e=parseInt(c.get("mode")),b=getExtension();document.querySelectorAll("[rel=command]").forEach(a=>a.addEventListener("click",f=>{switch(f.target.id){case "lnkReadMore":b.openPermissionsPage();window.close();break;case "btnOk":tabsPermissionRequired(()=>{b.executeGrabber(d,e);window.close()},null,!0);break;case "btnCancel":b.executeGrabber(d,
e),window.close()}}))});
