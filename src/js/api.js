'use strict';

function saveLocal(title, value) {
    localStorage.setItem(title, value);
}

function getItem(title) {
    return localStorage.getItem(title);
}

function populateStorage() {
    saveLocal('title', title);
    saveLocal('isParseHTML', isParseHTML.checked ? true : false);

    // localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
    // localStorage.setItem('font', document.getElementById('font').value);
    // localStorage.setItem('image', document.getElementById('image').value);
    setStorage();
}

function setStorage() {
    document.getElementById('title').value = getItem('title');
    document.getElementById('isParseHTML').checked = getItem('isParseHTML') === true ? true : false;
    // document.getElementById('bgcolor').value = localStorage.getItem('bgcolor');
    // document.getElementById('font').value = localStorage.getItem('font');
    // document.getElementById('image').value = localStorage.getItem('image');
    // htmlElem.style.backgroundColor = '#' + currentColor;
    // pElem.style.fontFamily = currentFont;
    isParseHTML.cheched = getItem('isParseHTML') === true ? true : false;
    // imgElem.setAttribute('src', currentImage);
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
//main part