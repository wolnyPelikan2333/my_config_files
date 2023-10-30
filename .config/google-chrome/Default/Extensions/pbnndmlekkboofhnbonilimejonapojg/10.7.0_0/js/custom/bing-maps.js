/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

let mapTypeSelect;
const classObserver = new MutationObserver(classObserverCallback), classObserverConfig = { attributes: true, attributeFilter: ["class"] };
const interval = setInterval(() => {
    mapTypeSelect = document.getElementById("MicrosoftNav");
    if (mapTypeSelect) {
        clearInterval(interval);
        classObserver.observe(mapTypeSelect, classObserverConfig);
        if (mapTypeSelect.classList.contains("Dark")) {
            classObserverCallback(null, null);
        }
    }
}, 100);
function classObserverCallback(mutations, observer) {
    const canvasArr = document.querySelectorAll("#tileCanvasId,#labelCanvasId");
    const noInvert = mapTypeSelect.classList.contains("Dark");
    if (canvasArr && canvasArr.length > 0) {
        const parent = canvasArr[0].parentElement;
        if (noInvert) {
            parent.style.setProperty("--ml-no-invert", noInvert.toString());
            parent.style.setProperty("--ml-background-background-color", "Text");
        }
        else {
            parent.style.removeProperty("--ml-background-background-color");
            parent.style.removeProperty("--ml-no-invert");
        }
        for (const canvas of canvasArr) {
            canvas.classList.toggle("ml-fix");
            canvas.setAttribute("ml-timestamp", Date.now().toString(16));
        }
    }
}

/******/ })()
;