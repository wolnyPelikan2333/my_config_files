var LocalRequest = (function () {

    return {
        get: function (key, data, callback) {
            if(!data) {
                data = {};
            }

            chrome.runtime.sendMessage({
                type: "request-LocalRequest.get." + key,
                data: data
            }, callback);

        }
    }
})();