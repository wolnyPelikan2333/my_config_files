$(function() {
    PersistentStorage.get("settings", function(data) {
        var settings = data && data.settings;

        var saveSettings = function() {
            PersistentStorage.set("settings", settings);
        };

        var bindSwitch = function(bindedSwitch, param) {
            bindedSwitch.attr("checked", settings[param]);
            bindedSwitch.change(function() {
                settings[param] = this.checked;
                saveSettings();
            });
        };

        var hostingsButton = $("#settings-show-hostings-button");
        var serviceMessages = $("#settings-service-messages");
        var contentParser = $("#settings-content-parser");
        var lowAccountNotifications = $("#low-account-notifications");

        bindSwitch(hostingsButton, "hostingsButton");
        bindSwitch(serviceMessages, "serviceMessages");
        bindSwitch(contentParser, "contentParser");
        bindSwitch(lowAccountNotifications, "lowAccountNotifications");

    });
});