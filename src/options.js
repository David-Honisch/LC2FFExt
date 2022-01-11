const title = 'LC2FFExt';
const options = [{
        commandName: 'toggle-feature',
        value: '#shortcut'
    },
    {
        commandName: 'IsDSGVO',
        value: '#IsDSGVO'
    }
];
var isParseHTML = document.getElementById('isParseHTML');
var out = document.getElementById('localstorage');

var htmlElem = document.querySelector('html');
// var pElem = document.querySelector('p');
// var imgElem = document.querySelector('img');
// var bgcolorForm = document.getElementById('bgcolor');
// var fontForm = document.getElementById('font');
// var imageForm = document.getElementById('image');





function populateStorage() {
    localStorage.setItem('title', title);
    localStorage.setItem('isParseHTML', isParseHTML.checked === true ? true : false);

    // localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
    // localStorage.setItem('font', document.getElementById('font').value);
    // localStorage.setItem('image', document.getElementById('image').value);
    setStorage();
}

function setStorage() {
    document.getElementById('title').value = localStorage.getItem('title');
    document.getElementById('isParseHTML').checked = localStorage.getItem('isParseHTML') === true ? true : false;
    // document.getElementById('bgcolor').value = localStorage.getItem('bgcolor');
    // document.getElementById('font').value = localStorage.getItem('font');
    // document.getElementById('image').value = localStorage.getItem('image');
    // htmlElem.style.backgroundColor = '#' + currentColor;
    // pElem.style.fontFamily = currentFont;
    isParseHTML.cheched = localStorage.getItem('isParseHTML') === true ? true : false;
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
console.log("Ext running...");
try {

    if (!localStorage.getItem('isParseHTML')) {
        populateStorage();
    } else {
        setStorage();
    }
    out.innerHTML = "";
    out.innerHTML += "isParseHTML:" + (localStorage.getItem('isParseHTML').cheched === true ? 'True' : 'False');

    isParseHTML.onchange = populateStorage;
    // bgcolorForm.onchange = populateStorage;
    // fontForm.onchange = populateStorage;
    // imageForm.onchange = populateStorage;

    /**
     * Update the UI when the page loads.
     */
    document.addEventListener('DOMContentLoaded', updateUI);

    /**
     * Handle update and reset button clicks
     */
    document.querySelector('#update').addEventListener('click', updateShortcut);
    document.querySelector('#reset').addEventListener('click', resetShortcut);
} catch (e) {
    alert(e);
    alert(e.stack);
    console.error(e.stack);
}

// alert('Welcome to ' + title + ' Browser Extension.');