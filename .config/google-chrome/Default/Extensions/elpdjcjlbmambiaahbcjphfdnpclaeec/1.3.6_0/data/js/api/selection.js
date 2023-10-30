chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if (request.type == "request-selection")
    {
        try {
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            var container = range.commonAncestorContainer;
            var html = container.outerHTML;
            sendResponse({html: html, text: selection.toString(), url: null});
        } catch (e) {
            sendResponse({html: null, text: null, url: null});
        }

    }
});