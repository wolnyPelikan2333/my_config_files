var RequestListener = (function () {

    var listening = false;
    var parent;

    var getXMLHTTP = function (callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                var response;
                try {
                    response = JSON.parse(xmlhttp.responseText);
                } catch (e) {
                    if(typeof(Bugsnag) !== "undefined") {
                        Bugsnag.notifyException(e, "Request error", xmlhttp.responseText);
                    }
                    response = xmlhttp.responseText;
                }
                callback(response);
            }
        };

        return xmlhttp;
    };

    var joinParams = function (params) {
        var paramsArray = [];
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                paramsArray.push([param, encodeURIComponent(params[param])].join("="));
            }
        }
        return paramsArray.join("&");
    };

    var listener = function (request, sender, sendResponse) {

        switch (request.type) {
            case "request-Request.get":
            {
                parent.calls.get(request.data, sendResponse);
                break;
            }
            case "request-Request.post":
            {
                parent.calls.post(request.data, sendResponse);
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
                var requestToSend = getXMLHTTP(callback);
                var glue = (data.url.indexOf("?") > -1) ? "&" : "?";
                var params = joinParams(data.params);
                var url = data.url + (params ? glue + params : "");

                requestToSend.open("GET", url, true);
                requestToSend.send();
            },
            post: function (data, callback) {
                var requestToSend = getXMLHTTP(callback);
                requestToSend.open("POST",
                    data.url,
                    true);
                requestToSend.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                requestToSend.send(joinParams(data.params));
            }
        }
    };

    return parent;
})();

exports = module.exports = RequestListener;