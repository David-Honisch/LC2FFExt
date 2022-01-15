'use strict';
document.cookie = "name=lc-api; SameSite=None; Secure";
document.cookie = "lc-api=lc-api; SameSite=None; Secure";

function getCookie() {
    return document.cookie;
}

function setCookie(title) {
    document.cookie = encodeURIComponent("name=" + title + "; SameSite=None; Secure");
}

function saveLocal(title, value) {
    localStorage.setItem(title, value);
}

function getItem(title) {
    return localStorage.getItem(title);
}

function notifyExtension(e) {
    var target = e.target;
    while ((target.tagName != "A" || !target.href) && target.parentNode) {
        target = target.parentNode;
    }
    if (target.tagName != "A")
        return;

    console.log("lc2ffext api content script sending message");
    browser.runtime.sendMessage({ "url": target.href });
}

function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}


function onRemoved() {
    console.log("Item removed successfully");
}

function onError(error) {
    console.log(`Error: ${error}`);
}

/*
Add notifyExtension() as a listener to click events.
*/
// window.addEventListener("click", notifyExtension);
//browser.runtime.sendMessage({ "text": "TESTETEST" });

function getMsgBox(message) {
    console.log("background script received message");
    var title = browser.i18n.getMessage("notificationTitle");
    var content = browser.i18n.getMessage("notificationContent", message.url);
    console.log('BGJS:' + content);
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/link-48.png"),
        "title": title,
        "message": content
    });
}
// getMsgBox("blasldas");

function showMsg(msg, title) {
    browser.notifications.create({
        "type": "basic",
        "title": msg,
        "message": title
    });

}
/**
 * TODO:Update the UI: set the value of the shortcut textbox.
 */
async function updateUI() {
    let commands = await browser.commands.getAll();
    for (command of commands) {
        // for (v of options) {
        //     switch (command.name) {
        //         case 'IsDSGVO':
        //             document.querySelector('#IsDSGVO').value = command.shortcut;
        //             break;
        //         case 'toggle-feature':
        //             document.querySelector('#shortcut').value = command.shortcut;
        //             break;

        //         default:
        //             console.log(command.name);
        //             break;
        //     }
        if (command.name === v.commandName) {
            document.querySelector('#shortcut').value = command.shortcut;
        }
    }
}

/**
 * Update the shortcut based on the value in the textbox.
 */
async function updateShortcut() {
    await browser.commands.update({
        name: commandName,
        shortcut: document.querySelector('#shortcut').value
    });
}
/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcut() {
    await browser.commands.reset(commandName);
    updateUI();
}
//deprecated api - use object as param
function populateStorage() {
    // alert("populateStorage");
    console.log("populateStorage");
    saveLocal('title', title);
    var isParseHTML = (document.getElementById('isParseHTML').checked === true ? true : false);
    // alert(isParseHTML);
    saveLocal('isParseHTML', isParseHTML);

    // localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
    // localStorage.setItem('font', document.getElementById('font').value);
    // localStorage.setItem('image', document.getElementById('image').value);
    setStorage();
    // alert("populateStorage done");
}
//deprecated api - use object as param
function setStorage() {
    // alert("setStorage");
    console.log("setStorage");
    document.getElementById('title').value = getItem('title');
    var isParseHTML = (document.getElementById('isParseHTML').checked === true ? true : false);
    // alert(isParseHTML);
    document.getElementById('isParseHTML').checked = (getItem('isParseHTML') === true ? true : false);
    // document.getElementById('bgcolor').value = localStorage.getItem('bgcolor');
    // document.getElementById('font').value = localStorage.getItem('font');
    // document.getElementById('image').value = localStorage.getItem('image');
    // htmlElem.style.backgroundColor = '#' + currentColor;
    // pElem.style.fontFamily = currentFont;
    document.getElementById('isParseHTML').checked = getItem('isParseHTML');
    // imgElem.setAttribute('src', currentImage);
    // alert(isParseHTML);
    // alert("setStorage done");
}
//main part