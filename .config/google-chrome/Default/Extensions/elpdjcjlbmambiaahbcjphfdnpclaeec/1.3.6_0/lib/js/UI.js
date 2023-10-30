var UI = (function (APIListeners) {
    var Listener = APIListeners && APIListeners.UIListener || false;

    return {
        changePage: function (to, close) {
            if (Listener) {
                Listener.calls.changePage(to);
            } else {
                chrome.runtime.sendMessage({
                    type: "request-changePage",
                    data: {
                        to: to
                    }
                });
            }

            if (typeof(close) === "undefined" || close) {
                window.close();
            }

        },
        changeIcon: function (icon) {
            if (Listener) {
                Listener.calls.changeIcon(icon);
            } else {
                chrome.runtime.sendMessage({
                    type: "request-changeIcon",
                    data: {
                        icon: icon
                    }
                });
            }
        },
        changeBadge: function (text) {
            if (Listener) {
                Listener.calls.changeBadge(text);
            } else {
                chrome.runtime.sendMessage({
                    type: "request-changeBadge",
                    data: {
                        badge: {
                            text: text
                        }
                    }
                })
            }
        },
        changeTitle: function (title) {
            if (Listener) {
                Listener.calls.changeTitle(title);
            } else {
                chrome.runtime.sendMessage({
                    type: "request-changeTitle",
                    data: {
                        title: title
                    }
                });
            }
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));