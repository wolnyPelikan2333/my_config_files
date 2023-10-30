$(function () {

    console.log("hosting here");

    var initButton = function () {
        $("#service-download-btn").dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false,
            hover: false,
            gutter: 0,
            belowOrigin: false
        });
    };

    PersistentStorage.getMany(["hideDownloadButton", "settings"], function (data) {
        var user = User(ServiceSettings);
        if(data.settings && (!data.settings.hostingsButton)) {
            return
        }

        if (data.hideDownloadButton && ServiceSettings.utils.time.nowTimestamp() < parseInt(data.hideDownloadButton)) {
            return;
        }

        I18n.translateMany(["extension_name", "download", "hide_24h", "settings"], function (translations) {
            var div = $("<div style=\"z-index:99999;\"><a style=\"; position: absolute; top: 100px; right: 40px;\" id=\"service-download-btn\" class=\'service-dropdown-button service-btn\' href=\'#\' data-activates=\'service-dropdown-default\'>" + translations.extension_name + "</a>\n<ul id=\'service-dropdown-default\' class=\'dropdown-content\' style='padding: 0px;'>\n    <li><a id=\"service-download\" href=\"#!\">" + translations.download + "</a></li>\n    <li><a id=\"service-hide-24h\" href=\"#!\">" + translations.hide_24h + "</a></li>\n    <li class=\"divider\"></li>\n    <li><a id=\"service-settings\"href=\"#!\">" + translations.settings + "</a></li>\n</ul></div>");

            if ($("#service-download-btn").length === 0) {
                $("body").append(div);

                initButton();


                $("#service-download").click(function () {
                    user.open.download([window.location.href]);
                    initButton();
                });

                $("#service-hide-24h").click(function () {
                    var until = ServiceSettings.utils.time.nowPlusHoursTimestamp(24);
                    PersistentStorage.set("hideDownloadButton", until, function () {
                        $("#service-download-btn").hide();
                    });
                });
                $("#service-settings").click(function () {
                    user.open.settings();
                    initButton();
                });
            }
        });

    });

});