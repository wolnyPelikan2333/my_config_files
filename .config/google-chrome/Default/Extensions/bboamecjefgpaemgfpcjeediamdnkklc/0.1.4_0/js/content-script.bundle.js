/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
    var textFileAsBlob = new Blob([textToWrite], { type: fileType });
    var downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}
function onClick() {
    chrome.runtime
        .sendMessage({ type: 'getSub', link: window.location.href })
        .then(function (dataContent) {
        saveTextAsFile(dataContent, "Sub video", 'text/plain');
    });
}
var createButtonGetSub = function () {
    var btn = document.createElement('button');
    btn.className =
        'yt-spec-button-shape-next yt-spec-button-shape-next--size-m';
    btn.textContent = 'Download sub';
    btn.style.maxWidth = 'fit-content';
    btn.style.marginLeft = '6px';
    btn.style.backgroundColor = '#0056db';
    btn.style.color = 'white';
    btn.onclick = onClick;
    return btn;
};
function getElement(path) {
    return new Promise(function (resolve, reject) {
        function executive(count) {
            if (count === void 0) { count = 0; }
            var el = document.querySelector(path);
            if (el)
                resolve(el);
            else if (count < 100) {
                setTimeout(function () {
                    // eslint-disable-next-line no-param-reassign
                    count += 1;
                    executive(count);
                }, 100);
                // eslint-disable-next-line prefer-promise-reject-errors
            }
            else
                reject(null);
        }
        executive();
    });
}
var config = {};
function checkSocial() {
    chrome.runtime.sendMessage({ type: 'checkSocial' }).then(function (r) {
        if (r) {
            config = {
                fb: r === null || r === void 0 ? void 0 : r.fb,
                tw: r === null || r === void 0 ? void 0 : r.tw,
                li: r === null || r === void 0 ? void 0 : r.li,
            };
        }
    });
}
checkSocial();
getElement('#owner').then(function (r) {
    if (r) {
        var btn = createButtonGetSub();
        r.appendChild(btn);
    }
});

/******/ })()
;