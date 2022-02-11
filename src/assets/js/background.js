"use strict";
var tabId;
var targetPage = "https://www.letztechance.org/*";
showMsg("Welcome to LetzteChance.Org", "LC2FFExt is running...");
//Get Option
var isParseHTML = document.getElementById('isParseHTML');
console.log("lc background.js running...");
addAppBrowserAction();
// console.log(isParseHTNL);
var ReceiveMessage = {
    receiveMessage: function(msg, sender, sendResponse) {
        if (msg && msg.action && Background.hasOwnProperty(msg.action)) {
            return Background[msg.action](msg, sender, sendResponse);
        } else {
            console.warn('No handler for message: ' + JSON.stringify(msg));
        }
    },
    ping: function(msg, sender, sendResponse) {
        sendResponse('pong');
        return true;
    }
};

browser.runtime.onMessage.addListener(ReceiveMessage.receiveMessage);
/**
 * Show a notification when we get messages from the content script.
 */
browser.runtime.onMessage.addListener((message) => {
    var msg = JSON.stringify(message.content);
    browser.notifications.create({
        type: "basic",
        title: "Message from the page",
        message: msg
    });
    // alert('Listener end');
});

//
// browser.windows.getCurrent()
//     .then(winInfo => browser.windows.update(winInfo.id, { titlePreface: 'Current Window: ' }));

var browserButtonStates = {
    defaultState: 'on',
    on: {
        //icon         : '/ui/is-on.png'
        badgeText: 'On',
        badgeColor: 'green',
        title: 'Turn Off',
        action: function(tab) {
            browser.webNavigation.onCommitted.removeListener(onTabLoad);
        },
        nextState: 'off'
    },
    off: {
        //icon         : '/ui/is-off.png'
        badgeText: 'Off',
        badgeColor: 'red',
        title: 'Turn On',
        action: function(tab) {
            browser.webNavigation.onCommitted.addListener(onTabLoad);
        },
        nextState: 'on'
    }
}

//This moves the Browser Action button between states and executes the action
//  when the button is clicked. With two states, this toggles between them.
browser.browserAction.onClicked.addListener(function(tab) {
    browser.browserAction.getTitle({ tabId: tab.id }, function(title) {
        //After checking for errors, the title is used to determine
        //  if this is going to turn On, or Off.
        if (browser.runtime.lastError) {
            console.log('browserAction:getTitle: Encountered an error: ' +
                browser.runtime.lastError);
            return;
        }
        //Check to see if the current button title matches a button state
        let newState = browserButtonStates.defaultState;
        Object.keys(browserButtonStates).some(key => {
            if (key === 'defaultState') {
                return false;
            }
            let state = browserButtonStates[key];
            if (title === state.title) {
                newState = state.nextState;
                setBrowserActionButton(browserButtonStates[newState]);
                if (typeof state.action === 'function') {
                    //Do the action of the matching state
                    state.action(tab);
                }
                //Stop looking
                return true;
            }
        });
        setBrowserActionButton(browserButtonStates[newState]);
    });
});

function addAppBrowserAction() {
    showMsg("Welcome to LetzteChance.Org", "LC2FFExt is running...");
    /*
    On startup, connect to the "ping_pong" app.
    */
    var app = browser.runtime.connectNative("ping_pong");
    showMsg("LetzteChance.Org Service:", app);
    /*
    Listen for messages from the app.
    */
    app.onMessage.addListener((response) => {
        showMsg("received:", response);
        console.log("Received: " + response);
    });

    /*
    On a click on the browser action, send the app a message.
    */
    browser.browserAction.onClicked.addListener(() => {
        console.log("Sending:  ping");
        app.postMessage("ping");
    });
}

function setBrowserActionButton(tabId, details) {
    if (typeof tabId === 'object' && tabId !== null) {
        //If the tabId parameter is an object, then no tabId was passed.
        details = tabId;
        tabId = null;
    }
    let icon = details.icon;
    let title = details.title;
    let text = details.badgeText;
    let color = details.badgeColor;

    //Supplying a tabId is optional. If not provided, changes are to all tabs.
    let tabIdObject = {};
    if (tabId !== null && typeof tabId !== 'undefined') {
        tabIdObject.tabId = tabId;
    }
    if (typeof icon === 'string') {
        //Assume a string is the path to a file
        //  If not a string, then it needs to be a full Object as is to be passed to
        //  setIcon().
        icon = { path: icon };
    }
    if (icon) {
        Object.assign(icon, tabIdObject);
        browser.browserAction.setIcon(icon);
    }
    if (title) {
        let detailsObject = { title };
        Object.assign(detailsObject, tabIdObject);
        browser.browserAction.setTitle(detailsObject);
    }
    if (text) {
        let detailsObject = { text };
        Object.assign(detailsObject, tabIdObject);
        browser.browserAction.setBadgeText(detailsObject);
    }
    if (color) {
        let detailsObject = { color };
        Object.assign(detailsObject, tabIdObject);
        browser.browserAction.setBadgeBackgroundColor(detailsObject);
    }
}

//Set the starting button state to the default state
setBrowserActionButton(browserButtonStates[browserButtonStates.defaultState]);
//eof button
//events

browser.tabs.onCreated.addListener(
    tabId => {
        updateCount(tabId, false);
        console.log("tab:" + tabId)
        showMsg("LC2FFExt", "created tab:" + JSON.stringify(tabId));
    });
browser.tabs.onRemoved.addListener(
    tabId => {
        updateCount(tabId, true);
        console.log("removing tab:" + tabId)
        showMsg("LC2FFExt", "removed tab:" + JSON.stringify(tabId));
    });