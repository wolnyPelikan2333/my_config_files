import * as SentryLib from './sentry.js';


const environment = 'production';


function initVariables(extensionRootTabId, extensionId, extensionPath, env) {
  function setGlobalProperty(name, value) {
    if (typeof window.wrappedJSObject === 'undefined') {
      window[name] = value;
    } else {
      window.wrappedJSObject[name] = value;
    }
  }

  setGlobalProperty('extensionRootTabId', extensionRootTabId);
  setGlobalProperty('extensionId', extensionId);
  setGlobalProperty('extensionPath', extensionPath);

  if (env === 'development') {
    setGlobalProperty('pfstyle', 'lbk');
    var host = 'https://v.printfriendly.com';
    setGlobalProperty('pfOptions', {
      hosts: {
        cdn: host,
        pdf: host,
        pf: host,
        ds: host,
        email: host
      },
      environment: 'development'
    });
  } else {
    setGlobalProperty('pfstyle', 'cbk');
  }
}

async function start(tab) {
  try {
    if (environment === 'production') {
      await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['/sentry.original.js']
      })
      await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['init-sentry.js']
      })
    }
  } catch (e) {}
  finally {
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: initVariables,
      args: [tab.id, chrome.runtime.id, chrome.runtime.getURL("/").replace(/\/$/, ""), environment]
    })
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['/assets/printfriendly.js']
    });
  }
}

// Called when the user clicks on the browser action.
chrome.storage.local.get(["pf_icon"], ({ pf_icon }) => {
  if (pf_icon) { chrome.action.setIcon({ path: "images/" + pf_icon + ".png" }); }
});

chrome.action.onClicked.addListener(function(tab) {
  recordGAEvent({ name: "extension_navbar_start", params: {} });
  start(tab);
});

function initSentry(env) {
  if(env === 'production') {
    SentryLib.Sentry.init({
      dsn: 'https://3069916c1a6d41a49f4c663f36b1903e@o11096.ingest.sentry.io/6190364',
      tracesSampleRate: 1.0,
    });
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "printfriendly",
    title: "Print Friendly and PDF",
    contexts: ["page", "selection", "link", "editable", "image", "frame"]
  });

  initSentry(environment);
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "printfriendly")
    recordGAEvent({ name: "context_menu_start", params: {} });
    start(tab);
  }
);

chrome.runtime.setUninstallURL("https://printfriendly.com/extension_feedback/new")

var PORT_NAME_MAPPINGS = {
  '': 'root',
  'pf-core': 'core',
  'algo': 'algo',
  'serviceWorker': 'serviceWorker',
};

var openConnections = {};

function connected(p) {
  if (!openConnections[p.sender.tab.id]) {
    openConnections[p.sender.tab.id] = { root: null, core: null, algo: null };
  }
  var connectedPorts = openConnections[p.sender.tab.id];

  var portName = PORT_NAME_MAPPINGS[p.name];
  connectedPorts[portName] = p

  p.onDisconnect.addListener(function(port) {
    delete connectedPorts[portName];
  });

  p.onMessage.addListener(function(m) {
    connectedPorts[m.destination].postMessage(m);
  });
}

chrome.runtime.onConnect.addListener(connected);

function sendMessageToPort(connectedPorts, request, retry = 0) {
  const port = connectedPorts[request.destination];
  if (port) {
    port.postMessage(request);
  } else {
    if (retry < 10) {
      const baseDelayMs = 100;
      const delayMs = baseDelayMs * 2 ** retry;
      setTimeout(() => sendMessageToPort(connectedPorts, request, retry + 1), delayMs);
    } else {
      console.error(`Could not send message to port ${request.destination}`);
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.destination === 'serviceWorker') {
    handleServiceWorkerMessage(request, sender, sendResponse);
    return;
  }
  const connectedPorts = openConnections[sender.tab.id];
  sendMessageToPort(connectedPorts, request);
});

async function recordGAEvent(data = {}) {
  const measurement_id = "G-BLWBW4RJE2";
  const api_secret = "sN8DehDvT46i0AnXGJUOLg";

  return await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
    method: "POST",
    body: JSON.stringify({
      client_id: 'chrome-extension.3.4.6',
      events: [data]
    })
  });
}

function handleServiceWorkerMessage(request, sender, sendResponse) {
}
