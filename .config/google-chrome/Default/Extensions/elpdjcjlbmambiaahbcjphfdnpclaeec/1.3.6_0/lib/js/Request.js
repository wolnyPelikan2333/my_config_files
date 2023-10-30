var Request = (function (APIListeners) {

    var Listener = APIListeners && APIListeners.RequestListener || false;

    return {
        get: function (url, params, callback) {
            var data = {
                url: url,
                params: params
            };

            if (Listener) {
                Listener.calls.get(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-Request.get",
                data: data
            }, callback);
        },
        post: function (url, params, callback) {
            var data = {
                url: url,
                params: params
            };

            if (Listener) {
                Listener.calls.post(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-Request.post",
                data: data
            }, callback);
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));