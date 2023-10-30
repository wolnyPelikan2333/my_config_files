var loader = function (e) {
    setTimeout(function () {
        var divs = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < divs.length; i++) {
            (function (div) {
                var code = div.getAttribute("data-i18n");
                I18n.translate(code, function (data) {
                    var text = (div.getAttribute("data-i18n-lower") !== null ? data[code].toLowerCase() : data[code]);
                    if (typeof (div.textContent) !== "undefined") {
                        div.textContent = text;
                    } else {
                        div.innerText = text;
                    }

                });
            })(divs[i]);
        }
    }, 10);
};

window.addEventListener ?
    window.addEventListener("load", loader, false) :
window.attachEvent && window.attachEvent("onload", loader);