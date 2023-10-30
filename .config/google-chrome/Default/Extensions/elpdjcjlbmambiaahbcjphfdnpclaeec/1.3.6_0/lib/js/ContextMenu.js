var ContextMenu = (function (APIListeners) {

    var Listener = APIListeners && APIListeners.ContextMenuListener || false;

    return {
        add: function (title, icon, contexts, callback) {
            var data = {
                title: title,
                contexts: contexts
            };

            if (Listener) {
                Listener.calls.add(data, callback);
                return;
            }

            chrome.runtime.sendMessage({
                type: "request-ContextMenu.add",
                data: data
            }, callback);
        }
    }
})((typeof (APIListeners) !== "undefined" ? APIListeners : false));