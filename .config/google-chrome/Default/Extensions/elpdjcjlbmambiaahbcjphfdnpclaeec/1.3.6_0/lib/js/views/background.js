window.onload = function () {

    Tabs.attachAlways([
        "vendor/jquery.js",
        "js/classes/ServiceSettings.js",
        "js/classes/User.js",
        "js/classes/Parsers.js",
        "vendor/bs2.min.js",
        "bugsnag.js"
    ], []);

    Tabs.attachOnURLMatch("settings.html", [
        "vendor/md5.js",
        "vendor/sha1.js",
        "vendor/moment-with-locales.js",
        "js/api/api.js",
        "vendor/jquery.js",
        "vendor/materialize/js/materialize.min.js",
        "js/classes/ServiceSettings.js",
        "js/classes/User.js",
        "js/views/settings.js"
    ], [], true);

    Tabs.attachOnURLMatch("messages.html", [
        "vendor/md5.js",
        "vendor/sha1.js",
        "vendor/moment-with-locales.js",
        "js/api/api.js",
        "vendor/jquery.js",
        "vendor/materialize/js/materialize.min.js",
        "js/classes/ServiceSettings.js",
        "js/classes/User.js",
        "js/views/messages.js"
    ], [], true);

    var currentPage = ServiceSettings.urls.login();

    UI.changePage(currentPage, false);
    UI.changeTitle(ServiceSettings.settings.service);

    var user = User(ServiceSettings);
    var service = Service(ServiceSettings);

    user.settings.init();


    I18n.translate("download_with", function (downloadWithText) {
        downloadWithText = downloadWithText.download_with;
        ContextMenu.add(downloadWithText, "images/icon_16x16.png", ["selection", "link"], function (data) {
            service.utils.linksFromObject(data, function (links) {
                user.open.download(links);
            });
        });
    });

    var processHostings = function (domains) {
        Tabs.clearAttachBucket("hostings");
        var disabled = ["youtube.com", "youtube.pl", "youtu.be"];
        domains.forEach(function (domain) {
            if (disabled.indexOf(domain) !== -1) {
                return;
            }
            Tabs.attachOnURLMatch(domain, [
                "vendor/jquery.js",
                "vendor/materialize/js/materialize.min.js",
                "js/views/content/hosting.js"
            ], [
                "css/content/hosting.css"
            ], false, "hostings");
        });
    };

    var updateHostingsHandler = function () {
        service.updateHostings(processHostings);
    };

    var preloadDefaultHostingsHandler = function () {
        PersistentStorage.get("hostings", function (data) {
            var hostings = data.hostings;
            if(!hostings) {
                hostings = [
                    "uploaded.net", "uploaded.to", "ul.to", "filefactory.com", "turbobit.net",
                    "turbobit.pl", "youtube.com", "youtube.pl", "youtu.be", "redtube.com", "tube8.com",
                    "letitbit.net", "4shared.com", "mediafire.com", "megashares.com", "rapidgator.net", "rg.to",
                    "hitfile.net", "catshare.net", "fastshare.cz", "fastshare.pl", "zippyshare.com", "hugefiles.net",
                    "1fichier.com", "mega.co.nz", "mega.nz", "co.nz", "rapidu.net", "rapidu.pl", "unibytes.com",
                    "xup.pl", "fileshark.pl", "tusfiles.net", "uptobox.com", "nowvideo.li", "youporn.com",
                    "pornhub.com", "inclouddrive.com", "vidto.me", "uploadrocket.net", "clicknupload.com",
                    "clicknupload.me", "clicknupload.link", "rockfile.eu", "vodlocker.com", "lunaticfiles.com",
                    "openload.io", "openload.co", "streamin.to", "anafile.com", "vidbull.com", "ozofiles.com",
                    "junocloud.me", "gboxes.com", "sharehost.eu", "alfafile.net", "uploading.site", "dailyfiles.net",
                    "kingfile.pl"
                ];
            }

            processHostings(hostings);
        });
    };

    var revalidateUserHandler = function () {
        user.updateData(function (data) {
            if (currentPage != ServiceSettings.urls.main()) {
                UI.changePage(ServiceSettings.urls.main(), false)
            }
        }, function () {
            if (currentPage != ServiceSettings.urls.login()) {
                UI.changePage(ServiceSettings.urls.login(), false);
            }
        });
    };

    var serviceMessagesHandler = function () {
        service.checkServiceMessage(function (params) {

            if (typeof(params.type) === "undefined") {
                return;
            }

            switch (params.type) {
                case "page":
                {
                    PersistentStorage.get("messages", function (messages) {
                        messages = messages.messages;
                        if (!(Array.isArray(messages))) {
                            messages = [];
                        }

                        messages.unshift(params);
                        messages = messages.slice(0, 5);

                        PersistentStorage.set("messages", messages, function () {
                            PersistentStorage.get("settings", function (data) {
                                if (data && data.settings && (data.settings.serviceMessages)) {
                                    user.open.messages();
                                }
                            });
                        });
                    });
                    break;
                }
                case "popup":
                {
                    PersistentStorage.get("settings", function (data) {
                        if (data && data.settings && (data.settings.serviceMessages)) {
                            Popup.show("images/icon_64x64.png",
                                params.message.title,
                                params.message.body);
                        }
                    });

                    break;
                }
            }
        });
    };

    var lowAccountBalanceHandler = function () {
        // todo: save information about intervals in persistentstorage
        PersistentStorage.get("settings", function (data) {
            if (!(data && data.settings && data.settings.lowAccountNotifications)) {
                return;
            }

            user.updateData(function (data) {
                if (data.expires) {
                    I18n.translateMany([
                            "account_expires_premium_header",
                            "account_expires_premium_body",
                            "account_expires_transfer_header",
                            "account_expires_transfer_body",
                            "top_up_account"],
                        function (translations) {
                            var header, body;
                            if (data.isPremium) {
                                header = translations.account_expires_premium_header;
                                body = translations.account_expires_premium_body;

                            } else {
                                header = translations.account_expires_transfer_header;
                                body = translations.account_expires_transfer_body;
                            }

                            Popup.show("images/icon_64x64.png",
                                header, body, [
                                    {
                                        icon: "images/icon_32x32.png",
                                        title: translations.top_up_account,
                                        onClick: function () {
                                            user.open.topUp();
                                        }
                                    }
                                ]);
                        });
                }
            });
        });
    };

    preloadDefaultHostingsHandler();
    updateHostingsHandler();
    revalidateUserHandler();
    serviceMessagesHandler();

    setInterval(updateHostingsHandler, ServiceSettings.intervals.hostings);
    setInterval(revalidateUserHandler, ServiceSettings.intervals.revalidate);
    setInterval(serviceMessagesHandler, ServiceSettings.intervals.messages);
    setInterval(lowAccountBalanceHandler, ServiceSettings.intervals.accountBalance);
};