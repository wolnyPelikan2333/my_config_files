/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
var removeMethod;
function insertScreenshots(b){function g(a,d){return new Promise(e=>{fetch(d.data).then(c=>c.blob()).then(c=>{c.name=decodeURIComponent(d.name);a.push(c);e()})})}removeMethod&&removeMethod();chrome.runtime.sendMessage({message:"getScreenshotsForGmail"},function(a){a=JSON.parse(a);var d=[],e=[],c=[];b.setToRecipients(decodeURIComponent(a.to).split(","));b.setSubject(decodeURIComponent(a.subject));for(var f=0;f<a.files.length;++f)d.push(g("yes"===a.files[f].inline?e:c,a.files[f]));Promise.all(d).then(()=>
{0<e.length&&b.attachInlineFiles(e);0<c.length&&(setTimeout(function(){b.attachFiles(c)},1E3),b.getBodyElement().focus())})})}InboxSDK.load("2","sdk_FireShot_c30c6a0127").then(function(b){removeMethod=b.Compose.registerComposeViewHandler(function(g){insertScreenshots(g)});b.Compose.openNewComposeView()});
