var Popup = (function (APIListeners) {

    var Listener = APIListeners && APIListeners.PopupListener || false;

    return {
        show: function (icon, title, message, buttons) {
            if (typeof buttons === "undefined") {
                buttons = [];
            }

            var data = {
                icon: icon,
                title: title,
                message: message,
                buttons: buttons
            };

            var callback = function (data) {
                buttons[data].onClick();
            };

            if (Listener) {
                Listener.calls.show(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-Popup.show",
                data: data
            }, callback);
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));