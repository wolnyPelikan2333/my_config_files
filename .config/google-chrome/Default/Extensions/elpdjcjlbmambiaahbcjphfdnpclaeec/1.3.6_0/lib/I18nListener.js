var I18nListener = (function () {
    var listening = false;
    var parent;

    var listener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-I18n.translate":
            {
                parent.calls.translate(request.data, sendResponse);
                break;
            }
            case "request-I18n.translateMany":
            {
                parent.calls.translateMany(request.data, sendResponse);
                break;
            }
        }

        return true;
    };

    parent = {
        listen: function (port) {
            if (!listening) {
                chrome.runtime.onMessage.addListener(listener);
                listening = true;
            }
        },
        close: function () {
            if (listening) {
                chrome.runtime.onMessage.removeListener(listener);
                listening = false;
            }
        },
        calls: {
            translate: function (data, callback) {
                var result = {};
                result[data] = chrome.i18n.getMessage(data);
                if (typeof(callback) === "function") {
                    callback(result);
                } else {
                    console.warn("No callback supplied for I18n.translate");
                }
            },
            translateMany: function (data, callback) {
                var result = {};
                // todo: a little bit inconsistent
                // right now it can serve also local resources..
                data.forEach(function (key) {
                    if(typeof(key) === "object") {
                        for(var i in key) {
                            if(key.hasOwnProperty(i)) {
                                result[i] = chrome.extension.getURL("/data/" + key[i]);
                            }
                        }
                    } else {
                        result[key] = chrome.i18n.getMessage(key);
                    }
                });
                if (typeof(callback) === "function") {
                    callback(result)
                } else {
                    console.warn("No callback supplied for I18n.translateMany");
                }

            }
        }
    };

    return parent;
})();

exports = module.exports = I18nListener;