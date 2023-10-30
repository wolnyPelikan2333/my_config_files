(function ($) {

    var url = window.location.href;
    var user = User(ServiceSettings);

    var common = {
        cache: {},
        init: function (callback) {
            I18n.translateMany(["download_icon_title", {
                "download_icon_image": "images/icon_32x32.png",
                "logo": "images/logo.png"
            }], function (data) {
                common.cache.download_icon_title = data.download_icon_title;
                common.cache.download_icon_image = data.download_icon_image;
                common.cache.logo = data.logo;
                callback();
            });
        },
        getIconHTML: function (obj, exactHeight) {
            var lineHeight;

            if(typeof(exactHeight) === "undefined") {
                var fontSize = obj.css("font-size");
                if (fontSize) {
                    lineHeight = Math.floor(parseInt(fontSize.replace("px", "")));
                } else {
                    lineHeight = 24;
                }
                lineHeight /= 1.5;
            } else {
                lineHeight = exactHeight;
            }


            return "<img class=\"DownloadIconSmall\" style=\"height: " + lineHeight + "px\" src=\"" + common.cache.download_icon_image + "\" title=\"" + common.cache.download_icon_title + "\" /> ";
        },
        insertBackgroundImage: function (obj) {
            obj.css('background', 'transparent url(' + common.cache.logo + ') no-repeat right bottom')
        },
        clearAll: function () {
            $(".DownloadIconSmall").remove();
        },
        noDuplicates: function (obj) {
            return (!(obj.children("DownloadIconSmall").length > 0 || obj.text().trim().length == 0));
        }
    };

    var parsers = {
        EmptyParser: function () {

        },
        UniversalParser: function () {
            PersistentStorage.get("hostings", function (data) {
                var hostings = data.hostings;

                hostings.forEach(function (hosting) {
                    $("pre:contains('" + hosting + "')").each(function () {
                        common.insertBackgroundImage($(this));
                    });

                    $("a[href*='" + hosting + "']").each(function () {
                        try {
                            var domain = new URL($(this).attr("href")).hostname;
                            if (domain.indexOf("www.") === 0) {
                                domain = domain.slice(4);
                            }

                            if (domain === hosting && common.noDuplicates($(this))) {
                                $(this).prepend(common.getIconHTML($(this)));
                            }
                        } catch(e){}
                    });
                });
            });
        },
        PebParser: function () {
            setInterval(function () {
                common.clearAll();
                parsers.UniversalParser();
            }, 3000);
        },
        DarkWarezParser: function () {
            PersistentStorage.get("hostings", function (data) {
                var hostings = data.hostings;

                hostings.forEach(function (hosting) {
                    $("td.code").each(function () {
                        $(this).find("script").remove();
                        var container = $(this).parent().siblings().eq(0).children().eq(0).children(0).eq(0);

                        if (common.noDuplicates(container) && $(this).is(':contains(' + hosting + ')')) {
                            container.prepend(common.getIconHTML($(this), 16.0));
                        }
                    });

                    $("a[href*='" + hosting + "']").each(function () {
                        if (common.noDuplicates($(this))) {
                            $(this).append(common.getIconHTML($(this)));
                        }
                    });
                });

            });
        },
        YouTubeParser: function () {

        }
    };

    $(document).ready(function () {
        PersistentStorage.get("settings", function (data) {
            var settings = data.settings;
            if (settings.contentParser) {
                user.content.getParserNameForURL(url, function (parserName) {
                    if (typeof(parsers[parserName]) === "function") {
                        common.init(parsers[parserName]);
                    }
                });
            }
        });
    });

})(jQuery);