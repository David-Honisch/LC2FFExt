"use strict";
var tabId;
var targetPage = "https://www.letztechance.org/*";
showMsg("Welcome to LetzteChance.Org", "LC2FFExt is running...");
//Get Option
var isParseHTML = document.getElementById('isParseHTML');
console.log("lc background.js running...");
// console.log(isParseHTNL);
//events

browser.tabs.onCreated.addListener(
    tabId => {
        updateCount(tabId, false);
        // tabId.innerHTML = "tab:" + tabId;
        showMsg("LC2FFExt", "created tab:" + JSON.stringify(tabId));
    });
browser.tabs.onRemoved.addListener(
    tabId => {
        updateCount(tabId, true);
        showMsg("LC2FFExt", "removed tab:" + JSON.stringify(tabId));
    });
//
// browser.windows.getCurrent()
//     .then(winInfo => browser.windows.update(winInfo.id, { titlePreface: 'Current Window: ' }));