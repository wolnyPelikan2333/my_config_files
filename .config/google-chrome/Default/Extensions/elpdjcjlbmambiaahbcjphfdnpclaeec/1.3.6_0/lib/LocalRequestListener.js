var LocalRequestListener = (function () {
    var listening = false;
    var parent;

    var listenerCallbackMap = {};

    var listener = function (request, sender, sendResponse) {

        if(request.type.indexOf("request-LocalRequest.get.") !== 0) {
            return true;
        }

        parent.calls.execute(request.type, request.data, sendResponse);
        return true;
    };

    parent = {
        listen: function (port) {
            if(!listening) {
                chrome.runtime.onMessage.addListener(listener);
                listening = true;
            }
        },
        close: function() {
            if(listening) {
                chrome.runtime.onMessage.removeListener(listener);
                listening = false;
            }
        },
        addListener: function(key, callback) {
            listenerCallbackMap["request-LocalRequest.get." + key] = callback;
        },
        calls: {
            execute: function (key, data, sendResponse) {
                if(key.indexOf("request-LocalRequest.get.") !== 0) {
                    key = "request-LocalRequest.get." + key;
                }

                if(typeof(listenerCallbackMap[key]) === "function") {
                    listenerCallbackMap[key](data, sendResponse);
                }
            }
        }
    };

    return parent;
})();

exports = module.exports = LocalRequestListener;