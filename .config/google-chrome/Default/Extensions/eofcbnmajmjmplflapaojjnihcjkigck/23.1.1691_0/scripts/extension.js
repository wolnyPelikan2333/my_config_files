/*******************************************************************************
 *
 *  avast! Online Security plugin
 *  (c) 2013 Avast Corp.
 *
 *  @author: Lucian Corlaciu
 *
 *  Injected specifics - Google Chrome
 *
 ******************************************************************************/

(function() {
  "use strict";
  if (typeof AvastWRC === 'undefined') { AvastWRC = {}; }

  //avoid multiple injections
  if(AvastWRC.bs === undefined){
    var ial = null; //AvastWRC.ial instance - browser agnostic
    AvastWRC.bs = {
      init: function() {
        ial = AvastWRC.ial.init(this);
        if(chrome.runtime){
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                console.log("onMessage extension");
                ial.messageHub(request.message, request.data, sendResponse);
                return sendResponse({response: "message received"}) || Promise.resolve({response: "message received"});
            });
        }
      },
      messageHandler: function(functionName, data) {
        data = data || {};
        data.message = functionName;
        if(chrome.runtime){
          chrome.runtime.sendMessage(data);
        }
      },
      getLocalImageURL: function(file) {
        return chrome.extension.getURL('common/ui/icons/'+ file);
      },
      getLocalResourceURL: function(file) {
        return chrome.extension.getURL(file);
      }
    };

    AvastWRC.bs.init();
  }

}).call(this);

//$.noConflict(true);
