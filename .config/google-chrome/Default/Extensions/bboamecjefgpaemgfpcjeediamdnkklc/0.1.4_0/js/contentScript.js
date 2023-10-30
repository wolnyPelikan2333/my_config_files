/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/* unused harmony export default */
// eslint-disable-next-line no-undef
document.body.classList.add('notranslate');
let keyisdown = false; // Switch
let doubleClick = false;

/// ///// The Hole Process ////////
function Process(eventos) {
    let translatecl = false;
    const el = eventos.target;
    const parel = el.parentElement;
    const parparel = parel.parentElement;
    // console.log(parparel);

    // In Normal DIV
    // eslint-disable-next-line no-plusplus
    for (let n = 0; n < el.classList.length; n += 1) {
        try {
            // console.log( el.classList[n]);

            if (el.classList[n] === 'translate') {
                el.classList.remove('translate');
                translatecl = true;
                // eslint-disable-next-line no-undef
                window.alert('Orginal Language');
            }
        } catch (err) {
            console.log('Error.');
        }
    }
    // In Normal DIV

    // In Translated DIV
    for (let n = 0; n < parparel.classList.length; n += 1) {
        try {
            // console.log( parparel.classList[n]);

            if (parparel.classList[n] === 'translate') {
                parparel.classList.remove('translate');
                translatecl = true;
                // eslint-disable-next-line no-undef
                window.alert('Orginal Language');
            }
        } catch (err) {
        }
    }
    // In Translated DIV

    if (!translatecl) {
        el.classList.add('translate');
        // eslint-disable-next-line no-undef
        window.alert('Translated Language');
    }

    // Refresh
    try {
        // eslint-disable-next-line no-undef
        const iframe = document.getElementById(':0.container');
        const btn = iframe.contentWindow.document.getElementById(':0.confirm');
        btn.click();
    } catch (err) {
        console.log('Update failed');
    }
    // Refresh
}
/// ///// The Hole Process ////////
function autoTranslatePage() {
    /// ///// listen to the Ctrl Key ////////
    // eslint-disable-next-line no-undef
    document.addEventListener(
        'keydown',
        event => {
            // console.log(event.key);
            // right click
            if (event.key !== 'Control') {
                return;
            }

            keyisdown = true;

            setTimeout(() => {
                keyisdown = false;
            }, 450);
        },
        true,
    );
    /// ///// listen to the Ctrl Key ////////

    /// ///// listen to the left click ////////
    // eslint-disable-next-line no-undef
    document.addEventListener(
        'mousedown',
        function (event) {
            // right click
            if (event.button !== 0) {
                return;
            }
            if (!keyisdown) {
                return;
            }
            Process(event);
        },
        true,
    );
    /// ///// listen to the left click ////////

    /// ///// listen to the double click ////////
    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', function (event) {
        // trap only right double click
        if (doubleClick) {
            const DLclick = 0;
            if (event.button !== DLclick) {
                return;
            }

            event.preventDefault();
            doubleClick = false;
            // console.log("Double Click Dedected");
            Process(event);
        } else {
            doubleClick = true;

            setTimeout(function () {
                doubleClick = false;
            }, 350);
        }
    });
    /// ///// listen to the double click ////////
}
autoTranslatePage();

/******/ })()
;