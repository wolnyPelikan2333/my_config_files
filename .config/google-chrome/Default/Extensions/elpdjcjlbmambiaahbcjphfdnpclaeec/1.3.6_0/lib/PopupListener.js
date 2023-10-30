var PopupListener = (function () {

    var listening = false;
    var parent;

    var convertButtons = function (buttons) {
        var result = [];
        for (var button in buttons) {
            if (buttons.hasOwnProperty(button)) {
                var newButton = {};
                newButton.title = buttons[button].title;
                newButton.iconUrl = chrome.extension.getURL("/data/" + buttons[button].icon);

                result.push(newButton);
            }
        }

        return result;
    };

    var listener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-Popup.show":
            {
                parent.calls.show(request.data, sendResponse);
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
            show: function (data, callback) {
                var nid = "id-" + Math.round(Math.random() * 1000);
                chrome.notifications.create(nid, {
                    type: "basic",
                    title: data.title,
                    message: data.message,
                    iconUrl: chrome.extension.getURL("/data/" + data.icon),
                    buttons: convertButtons(data.buttons)
                });

                chrome.notifications.onButtonClicked.addListener(function (nid, btn) {
                    if (typeof(callback) !== "undefined") {
                        callback(btn);
                    }
                });
            }
        }
    };

    return parent;
})();

exports = module.exports = PopupListener;