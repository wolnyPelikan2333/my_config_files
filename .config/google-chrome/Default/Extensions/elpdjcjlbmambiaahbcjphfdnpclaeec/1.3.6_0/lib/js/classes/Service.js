var Service = (function (ServiceSettings) {

    var getSession = function (callback) {
        PersistentStorage.get("credentials", function (data) {
            var credentials = data && typeof(data.credentials) !== "undefined" &&
                Object.keys(data.credentials).length !== 0 && data.credentials || null;

            if (credentials == null) {
                callback(null);
                return;
            }
            ServiceSettings.auth.getSession(credentials, function (session) {
                callback(session);
            });
        });
    };

    var parent = {
        checkServiceMessage: function (callback) {
            getSession(function (session) {
                if (session === null) {
                    return;
                }
                Request.get(ServiceSettings.urls.checkNewMessages(), {session: session}, function (params) {
                    if (params !== null && Object.keys(params).length > 0 && typeof(params.message) !== "undefined") {

                        var title = params.message.title;
                        var body = params.message.body;

                        if (typeof(params.message.variables) !== "undefined") {
                            for (var variable in params.message.variables) {
                                if (params.message.variables.hasOwnProperty(variable)) {
                                    params.message.title = title.replace(variable, params.message.variables[variable]);
                                    params.message.body = body.replace(variable, params.message.variables[variable]);
                                }
                            }
                            delete params.message.variables;
                        }

                        callback(params);
                    }
                });
            });
        },
        updateHostings: function (callback) {
            Request.get(ServiceSettings.urls.hostings(), null, function (data) {
            	if(!data) {
                    // in case of failed fetch, use the old data
                    PersistentStorage.get("hostings", function (record) {
                        callback(record.hostings);
                    });
                    return;
                }

                var domains = [];
                data.forEach(function (element) {
                    element.domains.forEach(function (domain) {
                        domains.push(domain);
                    });
                });
                PersistentStorage.set("hostings", domains);
                callback(domains);
            });
        },
        utils: {
            linksFromObject: function (obj, callback) {
                var arrayUnique = function (links) {

                    var sharedStart = function(array) {
                        var A = array.concat().sort(),
                            a1 = A[0], a2 = A[A.length - 1], L = a1.length, i = 0;
                        while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
                        return a1.substring(0, i);
                    };

                    var results = [];
                    links.forEach(function (element) {

                        var last = element.trim().replace(/<(?:.|\n)*?>/gm, "");
                        var current = decodeURIComponent(last);
                        while (last !== current) {
                            last = current;
                            current = decodeURIComponent(element);
                        }

                        var realCurrent = sharedStart([element, current]);

                        if (results.indexOf(realCurrent) === -1) {
                            results.push(realCurrent);
                        }
                    });

                    return results;
                };

                var links = [];
                var finalLinks = [];
                PersistentStorage.get("hostings", function (hostings) {
                    hostings = hostings.hostings;
                    // obj.text, obj.url, obj.html
                    Array.prototype.push.apply(links, parent.utils.linksFromURL(obj.url));
                    Array.prototype.push.apply(links, parent.utils.linksFromText(obj.text));
                    Array.prototype.push.apply(links, parent.utils.linksFromText(obj.html));
                    Array.prototype.push.apply(links, parent.utils.linksFromHTML(obj.html));

                    links.forEach(function (link) {
                        var present = false;
                        hostings.forEach(function (hosting) {
                            if (link.indexOf(hosting) !== -1) {
                                present = true;
                            }
                        });
                        if (present) {
                            finalLinks.push(link);
                        }
                    });

                    if (typeof(callback) == "function") {
                        callback(arrayUnique(finalLinks));
                    }
                });


            },
            linksFromURL: function (url) {
                if (!url || Object.keys(url.match(/^(http|https|www)/)).length === 0) {
                    return [];
                }

                return [url];

            },
            linksFromHTML: function (html) {
                if (!html) {
                    return [];
                }
                var result = [];
                try {
                    var element = new DOMParser().parseFromString(html, "text/html");
                    Array.prototype.forEach.call(element.getElementsByTagName("a"), function (el) {
                        var attr = el.getAttribute("href");
                        var match = attr.match(/^(http|https|www)/);
                        if (match !== null && Object.keys(match).length > 0) {
                            result.push(attr);
                        }
                    });
                } catch (e) {
                    
                }

                return result;
            },
            linksFromText: function (text) {
                if (!text) {
                    return [];
                }

                var result = [];
                var texts = text.trim().split(/\s+/);
                texts.forEach(function (element) {
                    var match = element.match(/^(http|https|www)/);
                    if (match !== null && Object.keys(match).length > 0) {
                        result.push(element);
                    }
                });

                return result;
            }
        }

    };

    return parent;
});