var PersistentStorage = (function (APIListeners) {

    var Listener = APIListeners && APIListeners.PersistentStorageListener || false;

    return {
        get: function (key, callback) {
            var data = key;

            if (Listener) {
                Listener.calls.get(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-PersistentStorage.get",
                data: data
            }, callback);

        },
        getMany: function (keys, callback) {
            var data = keys;

            if(Listener) {
                Listener.calls.get(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-PersistentStorage.getMany",
                data: data
            }, callback);
        },
        set: function (key, value, callback) {
            var data = {};
            data[key] = value;

            if(Listener) {
                Listener.calls.set(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-PersistentStorage.set",
                data: data
            }, callback);
        },
        setMany: function (array, callback) {
            var data = array;

            if(Listener) {
                Listener.calls.set(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-PersistentStorage.setMany",
                data: data
            }, callback);
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));