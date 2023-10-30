var User = (function (ServiceSettings) {

    var parent;

    var parsers = {
        "peb.pl": "PebParser",
        "youtube.com": "YouTubeParser",
        "darkwarez.pl": "DarkWarezParser"
    };

    var showPopup = function (title, body) {
        I18n.translateMany([title, body], function (translations) {
            Popup.show("images/icon_64x64.png",
                translations[title],
                translations[body]);
        });
    };

    var makeAuthRequest = function (credentials, hashPassword, callback) {
        Request.post(ServiceSettings.urls.auth(), ServiceSettings.auth.getQueryParams(credentials, hashPassword), function (data) {
            var result = {};
            result.username = credentials.username || "";

            if (data !== null &&
                typeof(data) !== "undefined" &&
                typeof(data.errno) === "undefined") {
                result.result = true;
                result.balance = data.balance;
                result.expire = data.expire || false;
                result.isPremium = result.expire && true;

            } else {
                result.result = false;
                result.message = (data !== null ? data.errstring : "");
            }

            callback(result)
        });
    };

    var getSession = function (callback) {
        PersistentStorage.get("credentials", function (data) {
            var credentials = data && data.credentials && Object.keys(data.credentials).length !== 0 && data.credentials || null;
            if (credentials == null) {
                callback(null);
                return;
            }
            ServiceSettings.auth.getSession(credentials, function (session) {
                callback(session);
            });
        });
    };

    parent = {
        settings: {
            init: function () {
                PersistentStorage.get("settings", function (data) {
                    if (!(data && data.settings)) {
                        ServiceSettings.settings.init();
                    }
                });
            }
        },
        content: {
            getDomain: function (url) {

                var domain;
                try {
                    domain = new URL(url).hostname;
                } catch (e) {
                    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
                    domain = matches && matches[1] || "";
                }
                if (domain.indexOf("www.") === 0) {
                    domain = domain.slice(4);
                }

                return domain;
            },
            getParserNameForURL: function (url, callback) {
                var found = false;
                var i;

                var domain = parent.content.getDomain(url);

                PersistentStorage.get("hostings", function (data) {

                    var hostings = data.hostings;

                    for (i in parsers) {
                        if (!found && i === domain) {
                            callback(parsers[i]);
                            found = true;
                        }
                    }

                    for (i in hostings) {
                        if (!found && hostings[i] === domain) {
                            callback("EmptyParser");
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        callback("UniversalParser");
                    }
                });
            }
        },

        verifyCredentials: function (data, callback) {
            makeAuthRequest(data, true, callback);
        },
        persistCredentials: function (data, callback) {
            data.password = ServiceSettings.auth.hashPassword(data.password);
            PersistentStorage.set("credentials", data, callback);
        },
        getCachedData: function (callback) {
            PersistentStorage.get("accountDetails", function (data) {
               if(typeof(callback) == "function") {
                   callback(data.accountDetails ? data.accountDetails : {});
               }
            });
        },
        updateData: function (callbackPositive, callbackNegative) {
            PersistentStorage.get("credentials", function (data) {
                var credentials = data && data.credentials || null;
                if (credentials == null || !credentials.username || !credentials.password) {
                    if (typeof(callbackNegative) === "function") {
                        UI.changeIcon("images/icon_64x64_gray.png");
                        callbackNegative({
                            result: false
                        });
                    }
                    return;
                }

                makeAuthRequest(credentials, false, function (result) {
                    if (!result.result) {

                        UI.changeIcon("images/icon_64x64_gray.png");
                        PersistentStorage.set("credentials", null);
                        if (typeof(callbackNegative) === "function") {
                            callbackNegative(result);
                        }
                    } else {
                        UI.changeIcon("images/icon_64x64.png");

                        if (result.isPremium) {
                            result.expires = result.expire < ServiceSettings.utils.time.nowPlusHoursTimestamp(72);
                        } else {
                            result.expires = result.balance < 4194304;
                        }

                        PersistentStorage.set("accountDetails", result);

                        if (typeof(callbackPositive) === "function") {
                            callbackPositive(result);
                        }
                    }
                })
            });
        },
        open: {
            any: function(url, includeSession) {
              getSession(function(session) {
                  if(session === null && includeSession) {
                      return;
                  }

                  if (includeSession) {
                      if(url.indexOf("?") > -1) {
                          url = url + "&session=" + session;
                      } else {
                          url = url + "?session=" + session;
                      }
                  }

                  Tabs.open(url);
              });
            },
            topUp: function () {
                getSession(function (session) {
                    Tabs.open(ServiceSettings.urls.topUp(session));
                })

            },
            search: function (phrase) {
                getSession(function (session) {
                    if (session === null) {
                        showPopup("not_logged_title", "not_logged_body");
                        return;
                    }
                    var url = ServiceSettings.urls.search(session, phrase);
                    Tabs.open(url);
                });
            },
            download: function (links) {
                if (links.length == 0) {
                    showPopup("no_links_title", "no_links_body");
                    return;
                }

                getSession(function (session) {
                    if (session === null) {
                        showPopup("not_logged_title", "not_logged_body");
                        return;
                    }

                    var url = ServiceSettings.urls.download(session, links);
                    Tabs.open(url);

                });
            },
            messages: function () {
                Tabs.open(ServiceSettings.urls.messages());
            },
            settings: function () {
                Tabs.open(ServiceSettings.urls.settings());
            },
            logout: function () {
                UI.changeIcon("images/icon_64x64_gray.png");
                PersistentStorage.set("credentials", null);
                PersistentStorage.set("accountDetails", {});
                UI.changePage("login.html");
            }
        },
        utils: {
            filterSupportedLinks: function (links, callback) {
                PersistentStorage.get("hostings", function (data) {
                    var hostings = data.hostings;
                    var finalLinks = [];

                    links.forEach(function (link) {
                        var domain = parent.content.getDomain(link);
                        var found = false;
                        hostings.forEach(function (hosting) {
                            if (!found && domain.indexOf(hosting) > -1) {
                                found = true;
                                finalLinks.push(link);
                            }
                        });
                    });

                    if (typeof(callback) === "function") {
                        callback(finalLinks);
                    }

                });
            }
        }

    };

    return parent;
});