var ServiceSettings = (function () {

    var _for = "Rapideo.pl";
    var _url = "https://rapideo.pl";

    var authParams = {
        site: "newrd",
        output: "json",
        username: "",
        password: "",
        loc: "1",
        info: "1"
    };

    var urls = {
        external: {
            auth: "https://enc.rapideo.pl/",
            hostings: "https://rapideo.pl/clipboard.php?json=3",
            topUp: "https://rapideo.pl/dodaj_transfer",
            search: "https://rapideo.pl/wyszukiwarka",
            download: "https://rapideo.pl/twoje_pliki",
            messages: "https://www.rapideo.pl/plugin_msg_v2"
        },
        local: {
            login: "login.html",
            main: "main.html",
            settings: "settings.html",
            messages: "messages.html"
        }
    };

    return {
        settings: {
            service: "Rapideo.pl",
            url: _url,
            init: function() {
                var settings = {
                    hostingsButton: true,
                    serviceMessages: true,
                    contentParser: true,
                    lowAccountNotifications: true
                };

                PersistentStorage.set("settings", settings);
            }
        },
        auth: {
            hashPassword: function (password) {
                return hex_md5(password);
            },
            getQueryParams: function (data, hash) {
                authParams.username = "";
                authParams.password = "";

                authParams.username = data.username || "";
                if (hash) {
                    authParams.password = this.hashPassword(data.password || "");
                } else {
                    authParams.password = data.password || "";
                }
                return authParams;
            },
            getSession: function (data, callback) {
                var session = encodeURIComponent(window.btoa(data.username + ":" + data.password));
                callback(session);
            }
        },
        urls: {
            auth: function() {
                return urls.external.auth;
            },
            hostings: function() {
                return urls.external.hostings;
            },
            topUp: function (session) {
                return urls.external.topUp + "?session=" + session;
            },
            search: function(session, phrase) {
                return urls.external.search + "?session=" + session + "&keyword=" + encodeURIComponent(phrase);
            },
            download: function(session, links) {
                return urls.external.download + "?session=" + session + "&apilinks=" + encodeURIComponent(window.btoa(links.join("&")));
            },
            login: function() {
                return urls.local.login;
            },
            main: function() {
                return urls.local.main;
            },
            settings: function () {
                return urls.local.settings;
            },
            checkNewMessages: function() {
                return urls.external.messages;
            },
            messages: function() {
                return urls.local.messages;
            }
        },
        utils: {
            transferToString: function (transfer) {
                transfer = parseInt(transfer);
                var sizes = ["KB", "MB", "GB", "TB", "PB"];
                var i = 0;
                while (transfer > 1024 && i <= sizes.length - 1) {
                    i++;
                    transfer /= 1024
                }

                return (Math.round(transfer * 100) / 100).toString() + " " + sizes[i];
            },
            validityToString: function (expire, locale) {
                if (typeof(locale) === "undefined") {
                    locale = "en";
                }
                moment.locale(locale);
                return moment.unix(expire).format("lll");
            },
            time: {
                nowTimestamp: function() {
                    return Math.round (new Date().getTime() / 1000);
                },
                nowPlusHoursTimestamp: function(hours) {
                    Math.round ((new Date().getTime() + 1000 * 60 * hours )/ 1000);
                }
            }
        },
        intervals: {
            revalidate: 1000 * 60 * 30, // 30 minutes
            hostings: 1000 * 60 * 5, // 5 minutes
            messages: 1000 * 60 * 15, // 15 minutes
            accountBalance: 1000 * 60 * 60 * 48 // 2 days
        }
    }
})();