$(function () {

    var user = User(ServiceSettings);

    function accountDataHandler(data) {
        $("#username").text(data.username);
        I18n.translateMany(["language", "settings", "top_up_account", "messages", "logout"], function (translations) {
            $("#valid_untill").text(
                $("#valid_untill").text().replace("%when%", ServiceSettings.utils.validityToString(data.expire, translations.language))
            );

            $("#settings-btn").attr("data-tooltip", translations.settings);
            $("#topup-btn").attr("data-tooltip", translations.top_up_account);
            $("#messages-btn").attr("data-tooltip", translations.messages);
            $("#logout-btn").attr("data-tooltip", translations.logout);

            $(".tooltipped").tooltip({delay: 50});

        });

        if (data.isPremium) {
            $("#transfer").hide();
            $("#balance").hide();
        } else {
            $("#premium").hide();
            $("#valid_untill").hide();
        }

        $("#balance").text(ServiceSettings.utils.transferToString(data.balance));

        $(".topup-btn").unbind("click").click(function () {
                user.open.topUp();
            }
        );

        $("#messages-btn").unbind("click").click(function () {
            user.open.messages();
        });

        $("#settings-btn").unbind("click").click(function () {
            user.open.settings();
        });

        $("#logout-btn").unbind("click").click(function () {
            UI.changeIcon("images/icon_64x64_gray.png");
            user.open.logout();
        });

        $("#search")
            .unbind("keypress")
            .keypress(function (e) {
                if (e.keyCode === 13) {
                    $("#search-btn").trigger("click");
                }
            });

        $("#search-btn")
            .unbind("click")
            .click(function () {
                if($("#search").val().length > 0) {
                    $("#search").removeClass("invalid");
                    user.open.search($("#search").val());
                } else {
                    $("#search").addClass("invalid")
                }
            });

        var addFilesPlaceholder = "http://catshare.net/link.html\nhttp://rapidu.net/link2.html";
        $("#add-files")
            .addClass("grey-text")
            .val(addFilesPlaceholder)
            .unbind("focus")
            .focus(function () {
                if ($(this).val() === addFilesPlaceholder) {
                    $(this).val("");
                    $(this).removeClass("grey-text");
                }
            })
            .unbind("blur")
            .blur(function () {
            if ($(this).val() === "") {
                $(this).val(addFilesPlaceholder);
                $(this).addClass("grey-text");
            }
        })
            .unbind("keypress")
            .keypress(function (e) {
            if (e.keyCode === 13 && !e.ctrlKey && !e.shiftKey) {
                $("#add-files-btn").trigger("click");
            }
        });

        $("#add-files-btn")
            .unbind("click")
            .click(function () {
                var $textarea = $("#add-files");
                if($textarea.val().length > 0 && $textarea.val() !== addFilesPlaceholder) {
                    $textarea.removeClass("invalid");
                    var links = $textarea.val().trim().split(/\s+/);
                    user.utils.filterSupportedLinks(links, function(finalLinks) {
                        $textarea.val(finalLinks.join("\n"));
                        user.open.download(finalLinks);
                    });

                } else {
                    $textarea.addClass("invalid");
                }
            });

    }

    user.getCachedData(function (data) {
        if(!data) {
            return;
        }
        accountDataHandler(data);
    });
    user.updateData(accountDataHandler , function () {
        UI.changePage("login.html");
    });

});