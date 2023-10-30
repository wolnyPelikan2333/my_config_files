var PersistentStorageListener = (function () {
    var listening = false;
    var parent;

    var listener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-PersistentStorage.get":
            case "request-PersistentStorage.getMany":
            {
                parent.calls.get(request.data, sendResponse);
                break;
            }
            case "request-PersistentStorage.set":
            case "request-PersistentStorage.setMany":
            {
                parent.calls.set(request.data, sendResponse);
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
            get: function (data, callback) {
                chrome.storage.local.get(data, function (result) {
                    if (typeof(callback) == "function") {
                        try {
                            callback(result);
                        } catch (e) {

                        }
                    }
                });
            },
            set: function (data, callback) {
                chrome.storage.local.set(data, function () {
                    if (typeof(callback) == "function") {
                        try {
                            callback();
                        } catch (e) {

                        }
                    }
                });
            }
        }
    };

    return parent;
})();

exports = module.exports = PersistentStorageListener;