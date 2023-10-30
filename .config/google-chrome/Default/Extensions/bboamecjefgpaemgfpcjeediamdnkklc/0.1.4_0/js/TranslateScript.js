/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/// /////inject translate script to html////////
const getExecutiveCode = language =>
    `
(function(){(function StartServ() {

let SelectedLang ='${language}';

function TranslateElementF() {
let Telem = new google.translate.TranslateElement({
autoDisplay: false,
floatPosition: 0,
multilanguagePage: true
});
return Telem;
}

let UserId = ''; //Ignore User ID 
let TranslateID = 'TE_' + UserId;
let TECBId = 'TECB_' + UserId;

function show() {
window.setTimeout(function() {
window[TranslateID].showBanner(true);
}, 10);
}

if (window[TranslateID]) {
show();
} else {
if (!window.google || !google.translate || !google.translate.TranslateElement) {
if (!window[TECBId]) {
window[TECBId] = function() {
window[TranslateID] = TranslateElementF();
show();
};
}
let linkappend = document.createElement('script');
linkappend.id = 'id_translate_google_com'
linkappend.src = 'https://translate.google.com/translate_a/element.js?cb=' + encodeURIComponent(TECBId) + '&client=tee&hl=' + SelectedLang;
document.getElementsByTagName('head')[0].appendChild(linkappend);
}
}
})();})();`;

function configLanguage(language) {
    const executiveCode = getExecutiveCode(language);
    // eslint-disable-next-line no-undef
    document.documentElement.setAttribute('onreset', executiveCode);
    // eslint-disable-next-line no-undef
    document.documentElement.dispatchEvent(new CustomEvent('reset'));
    // eslint-disable-next-line no-undef
    document.documentElement.removeAttribute('onreset');
}

(function () {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get(['storedLanguage'], function (settings) {
        configLanguage(settings.storedLanguage);
    });
})();

/******/ })()
;