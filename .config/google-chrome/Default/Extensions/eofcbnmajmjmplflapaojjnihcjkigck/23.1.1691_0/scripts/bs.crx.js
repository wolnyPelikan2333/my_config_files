/*******************************************************************************
 *  avast! browsers extensions
 *  (c) 2014 Avast Corp.
 *
 *  Background Browser Specific - general lib
 *
 ******************************************************************************/

(function(_) {
    'use strict';
    // Browser specific
    _.extend(AvastWRC.bs, {
        /**
         * Get Plugin version as defined in manifest file
         *
         * @return {Number}        Browser Plugin version (corresponds with the build version)
         */
        getVersion : function() {
            return chrome.runtime.getManifest().version; //chrome.app.getDetails().version;
        },

        /**
         * Get currently active tab reference
         * @param  {Function} callback Callback function with tab object as argument
         * @return {void}
         */
        getActiveTab: function(callback){              
            AvastWRC.bs.getAllTabs({active: true, currentWindow: true,}, function(tabs) {
                var tab;
                if (tabs && tabs.length > 0) {
                    tab = tabs[0];          
                    callback(tab);			
                }           
            });
        },

            /**
         * Get all tabs
         * @param  {Function} callback Callback function 
         * @return an array of tabs.Tab objects, containing infomation about each matching tab. If any error occurs, the promise will be rejected with an error message.
         */
        getAllTabs: function(queryInfo, callback){
            let browserInfo = AvastWRC.Utils.getBrowserInfo();
            if(browserInfo && browserInfo.isFirefox()){
                chrome.tabs.query(queryInfo).then( tabs => {
                    let data = [];
                    if (tabs && tabs.length > 0) {
                        data = tabs;			
                    }
                    callback(data);
                }).catch(onError => {
                    console.log("sendMessage ERROR: ", onError);
                    callback([]);
                });
            }
            else{
                chrome.tabs.query(queryInfo, function(tabs) {
                    if(chrome.runtime.lastError){
                        console.log("getAllTabs: ", chrome.runtime.lastError);
                    }
                    let data = [];
                    if (tabs && tabs.length > 0) {
                        data = tabs;			
                    }
                    callback(data);
                });
            }                
        },

        /**
         * Update all tabs on the browser
         */
        updateAllTabs: function(){    
            AvastWRC.bs.getAllTabs({},function(tabs) {
                tabs.forEach(function(tab){
                    //console.log("to update: "+tab.url);
                    if(AvastWRC.bs.checkUrl(tab.url)){
                        chrome.tabs.update(tab.id, {url: tab.url},null);
                    }
                },this);	
            });
        },
        /**
         * Retrieve attribute from Chrome request headers
         * @param  {array}  requestHeaders  request headers array
         * @param  {string} headerName      name of the header to retrieve
         * @return {string}                header value
         */
        retrieveRequestHeaderValue : function(requestHeaders, headerName) {
            if (requestHeaders) {
                for (var i = 0; i < requestHeaders.length; ++i) {
                    if (requestHeaders[i].name === headerName) {
                        return requestHeaders[i].value;
                    }
                }
            }
            return null;
        },

        /**
         * Get localization string for key
         * @param  {String} key  Key for the language string
         * @param  {String} args [optional] arguments to insert in the resource
         * @return {String}      Translated value
         */
        getLocalizedString: function(key, args) {
            if(chrome.i18n && chrome.i18n.getMessage) {
                try{
                    var msg = chrome.i18n.getMessage(key);
                    return args ? AvastWRC.Utils.aosFormat(msg, args) : msg;
                }
                catch(e){
                    return "";
                }
            }
            return "";
        },
        /**
         * Redirets a specific tab to an specific url
         */
        tabRedirectAndSetActive: function(tab, new_url) {
            chrome.tabs.update(tab.id, {url: new_url, active: true,});
        },
        getTabFromUrl: function(url, callback){
            AvastWRC.bs.getAllTabs({url: url}, function(tabs) {
                var tab = null;
                if (tabs && tabs.length > 0) {
                    tab = tabs[0];          
                    callback(tab);			
                }           
            });
        },
        /**
         * Get Tab identifier. Implemented in browser specific way.
         * @param {Object} tab object to get the id for
         */
        getTabId: function(tab) {
            return tab.id;
        },
        getTabUrl : function(tab){
            return tab.url;
        },
        /**
         * Closes a specific tab
         */
        closeTab: function(tab) {
            chrome.tabs.remove(tab.id);
        },
        /**
         * Sends a message to a specific tab
         */
        messageTab: function(tab, data) {
            //AvastWRC.Utils.throttle(function(){
                if(!tab || !tab.id) return;
                let browserInfo = AvastWRC.Utils.getBrowserInfo();
                let _tab = tab;
                if(browserInfo && browserInfo.isFirefox()){
                    chrome.tabs.sendMessage(_tab.id, data).then(response => {
                        console.log("onMessage ", data.message, " sendMessage bs.crx FF", _tab.url, response);
                    }).catch(onError => {
                        console.log("sendMessage ERROR: ", onError,  _tab.url);
                    });
                }
                else{
                    chrome.tabs.sendMessage(_tab.id, data, (response) => {                            
                        if (chrome.runtime.lastError) {
                            console.log("sendMessage ERROR: ", chrome.runtime.lastError.message,  _tab.url);
                        }
                        else{
                            console.log("onMessage  ", data.message, " sendMessage bs.crx all browsers: ", _tab.url, response);
                        }
                    });
                }
                //data = data || {};
                //data.id = tab.id;
                //chrome.runtime.sendMessage(data);
            //}, 1000)();
        },

        messageAllTabs: function (message) {
            AvastWRC.bs.getAllTabs({}, function (tabs) {
                for (let i = 0; i < tabs.length; ++i) {
                    console.log("sendMessage to all tabs", tabs[i].url);
                    if(tabs[i] && tabs[i].id){
                        AvastWRC.bs.messageTab(tabs[i], message);
                    }
                }
            });
        },

        messageOptions: function(data){
            if(chrome.runtime){
                chrome.runtime.sendMessage(data);
            }
        },

        openOptions: function(){
            chrome.runtime.openOptionsPage();
        },

        getLocalImageURL: function(file) {
            return chrome.extension.getURL("common/ui/icons/"+ file);
        },

        getLocalResourceURL: function(file) {
            return chrome.extension.getURL(file);
        },

        /* Open page in a new tab (to force open in tab instead of window - Safari specific).
        * @param {String} target url
        */
        openInNewTab: function(url, callback) {
            chrome.tabs.create({ url: url, active: true, }, callback);
        },

        /* Open page in a new tab but not set to active.
        * @param {String} target url
        */
        openInNewTabInactive: function(url, callback) {
            chrome.tabs.create({ url: url, active: false, }, callback);
        },

        /**
         * Copy text provided into clipboard.
         * @param {String} text to copy to clipboard
         */
        copyToClipboard : function (text) {
            var body = document.getElementsByTagName("body");
            if (body.length > 0) {
                body = body[0];
                var copyFrom = document.createElement("textarea");
                copyFrom.value = text;
                body.appendChild(copyFrom);
                copyFrom.select();
                document.execCommand("copy", true);
                copyFrom.parentNode.removeChild(copyFrom);
            }
        },
        /**
         * Load templates, css and inject libraries, scripts into the page
         * @param  {Object} opt       Options with value :
         * @option {String} tpl_file Template path relative to extension
         * @option {String} css_file CSS path relative to extension
         * @option {Array} libs      Array of JS library fil pathes required (relative to extension)
         * @option {String} script   Path of the script that is going to intialized at the end
         * @option {Object} data     Data object that is going to be passed to the page
         * @option {String} varname  [optional] Name of the variable where the passed data is going to be stored (default = avast_data)
         * @return {void}
         */
        inject : function(opt){

            var options = _.extend({
                data : {},
                varname : "avast_data",
            }, opt);

            var tabId = options.tab.id;
            var libs = (options.libs || []).slice();
            var css = (options.css || []).slice();
            function injectLib(libs) {
                if (libs.length > 0) {
                    chrome.tabs.executeScript(tabId, { file: libs[0], allFrames: false,}, function() {
                        if (chrome.runtime.lastError) {
                            console.log("LOG: " + chrome.runtime.lastError.message);
                        }else{
                            libs.shift();
                            injectLib(libs);
                        }
                    });
                } else {                        
                    chrome.tabs.executeScript(tabId, {code: options.varname +" = '"+ JSON.stringify(options.data) +"';",}, function() {
                        if (chrome.runtime.lastError) {
                            console.log("LOG: " + chrome.runtime.lastError.message);
                        }else{
                            if(options.script !== ""){
                                chrome.tabs.executeScript(tabId, {file: options.script,}, function() {
                                    if (chrome.runtime.lastError) {
                                        console.log("LOG: " + chrome.runtime.lastError.message);
                                    }else{
                                        options.callback();
                                    }
                                });
                            }
                            else{
                                options.callback();
                            }                                       
                        }
                    });
                }
            }

            function injectCss(css) {
                if (css.length > 0) {
                    chrome.tabs.insertCSS(tabId, { file: css[0], }, function() {
                        if (chrome.runtime.lastError) {
                            console.log("LOG: " + chrome.runtime.lastError.message);
                        }else{
                            css.shift();
                            injectCss(css);
                        }                            
                    });
                } else {
                    injectLib(libs);
                }
            }

            this.tabExists(tabId, function() {
                if (options.tpl) {
                    AvastWRC.bs.loadFile(options.tpl, function(tpl) {
                        options.data.tpl = escape(tpl);
                        injectCss(css);
                    });
                } else {
                    injectCss(css);
                }
            });
        },
        /**
         * Check if URL is not in the ignore list
         *
         * @param  {String}   url       Url including protocol (http,https, ftp)
         * @return {boolean}       true - allow url, false - ignored
         */
        checkUrl: function (url) {
            if (url === "") return false;

            let tabsToIgnore = AvastWRC.Shepherd.getIgnoredTabs() ? AvastWRC.Shepherd.getIgnoredTabs() : AvastWRC.DEFAULTS.IGNORE_TABS;

            if (tabsToIgnore instanceof Array) tabsToIgnore = AvastWRC.DEFAULTS.IGNORE_TABS; // Support for old Shepherd Config

            for (let key in tabsToIgnore) {
                if (ignoreForCurrentBrowser(tabsToIgnore[key]) && url.match(new RegExp(key, "i"))) return false;
            }

            return true;

            function ignoreForCurrentBrowser(browserCodes) {
                let currentBrowserFunctions = {
                    "ALL": function () {
                        return true;
                    },
                    "FF": AvastWRC.Utils.getBrowserInfo().isFirefox,
                    "CH": AvastWRC.Utils.getBrowserInfo().isChrome,
                    "ASB": AvastWRC.Utils.getBrowserInfo().isAvast,
                    "ED": AvastWRC.Utils.getBrowserInfo().isEdge
                };

                for (let i = 0; i < browserCodes.length; i++) {
                    if (currentBrowserFunctions[browserCodes[i]]()) return true;
                }

                return false;
            }
        },

        /**
         * Check if the tab is still opened
         *
         * @param  {Number}   tabId    Tab ID
         * @param  {Function} callback Function to executed if tab exists
         * @return {void}
         */
        tabExists : function (tabId, callback) {
            // assume that this method was called through .call() to maintain context
            var self = this;
            chrome.windows.getAll({populate: true,}, function(windows) {
                var exists = false;
                loop:
                for(var w=0; w < windows.length; w++) {
                    for(var t=0; t < windows[w].tabs.length; t++){
                        if(windows[w].tabs[t].id === tabId) {
                            exists = true;
                            break loop;
                        }
                    }
                }
                // TODO - condition for tabs with blank URL
                if(exists && callback) {
                    // maintain context for the callback
                    callback.call(self);
                }
            });
        },

        /**
         * Check if the tab is still opened
         *
         * @param  {Number}   url  URL or a part of it
         * @param  {Function} callback Function retrieve tab
         * @return {void}
         */
        tabExistsWithUrl : function (url, callback) {
            // assume that this method was called through .call() to maintain context
            if(!callback) {
                return;
            }
            chrome.windows.getAll({populate: true,}, function(windows) {                   
                for(var w=0; w < windows.length; w++) {
                    for(var t=0; t < windows[w].tabs.length; t++){
                        if(windows[w].tabs[t].url && windows[w].tabs[t].url.indexOf(url) !== -1) {                    
                            callback(windows[w].tabs[t]);                           
                            return;
                        }
                    }
                }
                callback(false);
            });               
        },

        getLocalStorage(key, callback) {
            chrome.storage.local.get(key, function (result) {
                if (typeof result === "object" && result[key]) {
                    callback(result[key]);
                }
                else {
                    callback(null);
                }
            });
            return;
        },

        setLocalStorage(key, data) {
            var storage = {};
            storage[key] = data;
            chrome.storage.local.set(storage);
        },

        accessContent(tab, data) {
            AvastWRC.bs.messageTab(tab, data);
        }
    });

}).call(this, _);
