/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
const fsPreferences={storage:localStorage,init:a=>a(),getOption:(a,b)=>{try{const c=localStorage[a];return void 0===c?b:c}catch(c){return b}},setOption:(a,b)=>{localStorage[a]=b}};
