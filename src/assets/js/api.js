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

//notify
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

function showMSG(msg) {
    browser.notifications.create(msg);

}
//eonotify
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
//deprecated api - use object as param
function getFromFormStorage() {
    return [{
            commandName: 'title',
            value: document.getElementById('title').value,
            isactive: document.getElementById('title').value
        },
        {
            commandName: 'isDSGVO',
            value: (document.getElementById('isDSGVO').checked === true ? true : false),
            isactive: (document.getElementById('isDSGVO').checked === true ? true : false)
        },
        {
            commandName: 'isParseHTML',
            value: (document.getElementById('isParseHTML').checked === true ? true : false),
            isactive: (document.getElementById('isParseHTML').checked === true ? true : false)
        },
        {
            commandName: 'isDOMReplaced',
            value: (document.getElementById('isDOMReplaced').checked === true ? true : false),
            isactive: (document.getElementById('isDOMReplaced').checked === true ? true : false)
        }
    ];
}

function getFromStorage() {
    return [{
            commandName: 'title',
            value: getItem('title'),
            isactive: getItem('title')
        },
        {
            commandName: 'isDSGVO',
            value: getItem('isDSGVO'),
            isactive: (getItem('isDSGVO').checked === true ? true : false)
        },
        {
            commandName: 'isParseHTML',
            value: getItem('isParseHTML'),
            isactive: (getItem('isParseHTML').checked === true ? true : false)
        },
        {
            commandName: 'isDOMReplaced',
            value: getItem('isDOMReplaced'),
            isactive: (getItem('isDOMReplaced').checked === true ? true : false)
        }
    ];
}

function populateStorage() {
    console.log("populateStorage");
    // $('#debug').html("");
    var title = $('#title').val();
    var isDSGVO = ($('#isDSGVO').prop('checked') === true ? true : false); //(getItem('isDSGVO') === true ? true : false);
    var isParseHTML = ($('#isParseHTML').prop('checked') === true ? true : false);
    var isDOMReplaced = ($('#isDOMReplaced').prop('checked') === true ? true : false);
    var replaceText = $('#replaceText').val();
    // $('#debug').append('<br>Populate:isDSGVO:' + isDSGVO + '<br>isDOMReplaced:' + isDOMReplaced + '<br>isParseHTML:' + isParseHTML);
    //checkboxes
    saveLocal('isDSGVO', isDSGVO);
    saveLocal('isParseHTML', isParseHTML);
    saveLocal('isDOMReplaced', isDOMReplaced);
    //values
    saveLocal('domreplaceText', replaceText);
    saveLocal('replaceText', replaceText);
    saveLocal('store', JSON.stringify(getFromFormStorage()));
    saveLocal('title', title);
    saveLocal('product', product);
    setStorage();
}

function setStorage() {
    console.log("setStorage");
    try {
        var title = getItem('title');
        var isDSGVO = getItem('isDSGVO') == 'true' ? true : false; //(getItem('isDSGVO') === true ? true : false);
        var isParseHTML = getItem('isParseHTML') == 'true' ? true : false;
        var isDOMReplaced = getItem('isDOMReplaced') == 'true' ? true : false;
        var replaceText = getItem('replaceText');
        // $('#debug').append('<br>Storage:' + isDSGVO + '<br>isDOMReplaced:' + isDOMReplaced + '<br>isParseHTML:' + isParseHTML);
        //checkboxes
        $('#isDSGVO').prop('checked', isDSGVO);
        $('#isParseHTML').prop('checked', isParseHTML);
        $('#isDOMReplaced').prop('checked', isDOMReplaced);
        //values
        $('#title').val(title);
        $('#replaceText').val(replaceText);
        $('#domreplaceText').html(replaceText);
        printOptions(document.getElementById('localstorage'));


    } catch (error) {
        alert(error);
    }
}
//main part