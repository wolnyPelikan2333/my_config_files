var Tabs = (function (APIListeners) {

    var Listener = APIListeners && APIListeners.TabsListener || false;

    return {
        open: function (url) {
            var data = {
                url: url
            };

            if (Listener) {
                Listener.open(data);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-Tabs.open",
                data: data
            });
        },
        attachAlways: function (scripts, css, bucket) {
            if (Listener) {
                Listener.attachAlways(scripts, css, bucket);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-Tabs.attachAlways",
                data: {
                    scripts: scripts,
                    css: css,
                    bucket: bucket
                }
            });
        },
        attachOnURLMatch: function (url, scripts, css, local, bucket) {
            if (Listener) {
                Listener.attachOnURLMatch(url, scripts, css, local, bucket);
                return;
            }
            chrome.runtime.sendMessage({
                type: "request-Tabs.attachOnURLMatch",
                data: {
                    url: url,
                    scripts: scripts,
                    css: css,
                    local: local,
                    bucket: bucket
                }
            });
        },
        clearAttachBucket: function (bucket) {
            if (Listener) {
                Listener.clearAttachBucket(bucket);
                return;
            }
            chrome.runtime.sendMessage({
                type: "request-Tabs.clearAttachBucket",
                data: bucket
            });
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));