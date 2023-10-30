var I18n = (function (APIListeners) {

    var Listener = APIListeners && APIListeners.I18nListener || false;

    return {
        translate: function (key, callback) {
            if (Listener) {
                Listener.calls.translate(key, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-I18n.translate",
                data: key
            }, callback);
        },
        translateMany: function (keysArray, callback) {
            if (Listener) {
                Listener.calls.translateMany(keysArray, callback);
                return;
            }
            chrome.runtime.sendMessage({
                type: "request-I18n.translateMany",
                data: keysArray
            }, callback);
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));