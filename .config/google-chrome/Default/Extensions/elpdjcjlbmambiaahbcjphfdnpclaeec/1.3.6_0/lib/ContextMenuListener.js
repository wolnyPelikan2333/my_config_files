var ContextMenuListener = (function () {
    var listening = false;
    var parent;

    var listener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-ContextMenu.add":
            {
                parent.calls.add(request.data, sendResponse);
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
            add: function (data, callback) {
                chrome.contextMenus.create({
                    "title": data.title,
                    "contexts": data.contexts,
                    "onclick": function (e) {
                        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, {
                                type: "request-selection"
                            }, function (results) {
                                var result = {
                                    html: results.html,
                                    text: results.text,
                                    url: e.linkUrl
                                };
                                //todo: callback safe
                                callback(result);
                            })
                        });

                    }
                });
            }
        }
    };

    return parent;
})();

exports = module.exports = ContextMenuListener;