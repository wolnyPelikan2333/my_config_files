var UIListener = (function () {
    var listening = false;
    var parent;

    var onChangeCallbacks = [];

    var listener = function (request, sender, sendResponse) {
        switch (request.type) {
            case "request-changePage":
            {
                parent.calls.changePage(request.data.to);
                break;
            }
            case "request-changeIcon":
            {
                parent.calls.changeIcon(request.data.icon);
                break;
            }

            case "request-changeBadge":
            {
                parent.calls.changeBadge(request.data.badge.text);
                break;
            }
            case "request-changeTitle":
            {
                parent.calls.changeTitle(request.data.title);
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
        setSizeMapping: function () {

        },
        onChangePage: function (callback) {
            onChangeCallbacks.push(callback);
        },
        _callOnChangePage: function () {
            // todo: to private
            for (var callback in onChangeCallbacks) {
                if (onChangeCallbacks.hasOwnProperty(callback)) {
                    onChangeCallbacks[callback]();
                }
            }
        },
        calls: {
            changePage: function (to) {
                chrome.browserAction.setPopup({
                    popup: "/data/html/" + to
                });
                parent._callOnChangePage();
                return false;
            },
            changeIcon: function (icon) {
                chrome.browserAction.setIcon({
                    path: "/data/" + icon
                });
            },
            changeBadge: function (badge) {
                chrome.browserAction.setBadgeText({
                    text: badge
                });
            },
            changeTitle: function(title) {
                chrome.browserAction.setTitle({
                    title: title
                });
            }
        }
    };

    return parent;
})();

exports = module.exports = UIListener;