document.cookie = "name=lc-options; SameSite=None; Secure";
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
//main part
console.log("Ext running...");
try {

    if (!getItem('isParseHTML')) {
        populateStorage();
    } else {
        setStorage();
    }
    out.innerHTML = "";

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

    out.innerHTML += "</br>product:" + browser.i18n.getMessage("product");
    out.innerHTML += "</br>isParseHTML:" + (getItem('isParseHTML').cheched === true ? 'True' : 'False');
    out.innerHTML += "</br>title:" + (getItem('title'));
    out.innerHTML += "</br>cookie:" + getCookie();
    setCookie('test');
    out.innerHTML += "</br>cookie:" + JSON.stringify(getCookie());

} catch (e) {
    alert(e);
    alert(e.stack);
    console.error(e.stack);
}

// alert('Welcome to ' + title + ' Browser Extension.');