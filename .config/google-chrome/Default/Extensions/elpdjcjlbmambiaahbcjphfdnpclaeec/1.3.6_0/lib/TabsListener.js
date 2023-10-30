var TabListener = (function () {

    var listening = false;
    var parent;

    var getDomain = function (url) {
        var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        var domain = matches && matches[1];
        if(domain.indexOf("www.") === 0) {
            return domain.slice(4);
        }
        return domain;
    };

    var attachAlwaysArray = {};
    var attachOnURLMatchArray = {};

    var attachListener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-Tabs.attachAlways":
            {
                parent.attachAlways(request.data.scripts, request.data.css);
                break;
            }
            case "request-Tabs.attachOnURLMatch":
            {
                parent.attachOnURLMatch(request.data.url, request.data.scripts, request.data.css);
                break;
            }
            case "request-Tabs.clearAttachBucket":
            {
                parent.clearAttachBucket(request.data);
                break;
            }
        }

        return true;
    };

    var openListener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-Tabs.open":
            {
                parent.open(request.data);
                break;
            }
        }

        return true;
    };

    var tabsListener = function (tabId, info, tab) {
        if (info.status == "complete" && tab.url.indexOf("http") === 0) {

            var bucket;
            var scripts = [];
            var css = [];

            for (bucket in attachAlwaysArray) {
                if (attachAlwaysArray.hasOwnProperty(bucket)) {
                    attachAlwaysArray[bucket].scripts.forEach(function (script) {
                        if (scripts.indexOf(script) === -1) {
                            scripts.push(script);
                        }
                    });
                    attachAlwaysArray[bucket].css.forEach(function (css1) {
                        if (css.indexOf(css1) === -1) {
                            css.push(css1);
                        }
                    });
                }
            }

            for (bucket in attachOnURLMatchArray) {
                for (var url in attachOnURLMatchArray[bucket]) {
                    if (getDomain(tab.url) == url && attachOnURLMatchArray[bucket].hasOwnProperty(url)) {

                        attachOnURLMatchArray[bucket][url].scripts.forEach(function (script) {
                            if (scripts.indexOf(script) === -1) {
                                scripts.push(script);
                            }
                        });

                        attachOnURLMatchArray[bucket][url].css.forEach(function (css1) {
                            if (css.indexOf(css1) === -1) {
                                css.push(css1);
                            }
                        });
                    }
                }
            }

            scripts = convertToLocalUrls(scripts);
            css = convertToLocalUrls(css);

            console.log(scripts);

            scripts.forEach(function (element) {
                chrome.tabs.executeScript(tabId, {
                    file: element
                });
            });

            css.forEach(function (element) {
                chrome.tabs.insertCSS(tabId, {
                    file: element
                });
            });
        }
    };

    var convertToLocalUrls = function (array) {
        var newArray = [];
        array.forEach(function (element) {
            newArray.push("/data/" + element);
        });

        return newArray;
    };

    parent = {
        listen: function (port) {
            if (!listening) {
                chrome.tabs.onUpdated.addListener(tabsListener);
                chrome.runtime.onMessage.addListener(openListener);
                chrome.runtime.onMessage.addListener(attachListener);
                listening = true;
            }
        },
        close: function (port) {
            if (listening) {
                chrome.tabs.onUpdated.removeListener(tabsListener);
                chrome.runtime.onMessage.removeListener(openListener);
                chrome.runtime.onMessage.removeListener(attachListener);
                listening = false;
            }
        },
        open: function (data) {
            var url = data.url;
            if (!(url.indexOf("http") === 0)) {
                url = chrome.extension.getURL("/data/html/" + url);
            }

            chrome.tabs.create({url: url});
        },
        onAttach: function (callback) {

        },
        onDetach: function (callback) {

        },
        _callOnAttach: function (port) {

        },
        _callOnDetach: function (port) {

        },
        attachAlways: function (scripts, css, bucket) {
            if (typeof(bucket) === "undefined") {
                bucket = "default";
            }
            if (typeof(attachAlwaysArray[bucket]) === "undefined") {
                attachAlwaysArray[bucket] = {
                    scripts: [],
                    css: []
                };
            }

            scripts.forEach(function (element) {
                if (attachAlwaysArray[bucket].scripts.indexOf(element) === -1) {
                    attachAlwaysArray[bucket].scripts.push(element);
                }
            });

            css.forEach(function (element) {
                if (attachAlwaysArray[bucket].css.indexOf(element) === -1) {
                    attachAlwaysArray[bucket].css.push(element);
                }
            });

        },
        attachOnURLMatch: function (url, scripts, css, local, bucket) {
            if(typeof(local) === "undefined") {
                local = false;
            }

            if (typeof(bucket) === "undefined") {
                bucket = "default";
            }
            if (typeof(attachOnURLMatchArray[bucket]) === "undefined") {
                attachOnURLMatchArray[bucket] = {};
            }

            if(local) {
                url = chrome.extension.getURL("/data/html/" + url);
            }

            var record = attachOnURLMatchArray[bucket][url] || {
                    scripts: [],
                    css: []
                };

            scripts.forEach(function (element) {
                if (record.scripts.indexOf(element) === -1) {
                    record.scripts.push(element);
                }
            });
            css.forEach(function (element) {
                if (record.css.indexOf(element) === -1) {
                    record.css.push(element);
                }
            });

            attachOnURLMatchArray[bucket][url] = record;
        },
        clearAttachBucket: function (bucket) {
            if (typeof (attachAlwaysArray[bucket]) !== "undefined") {
                delete attachAlwaysArray[bucket];
            }
            if (typeof(attachOnURLMatchArray[bucket]) !== "undefined") {
                delete attachOnURLMatchArray[bucket];
            }
        }
    };

    return parent;
})();

exports = module.exports = TabListener;