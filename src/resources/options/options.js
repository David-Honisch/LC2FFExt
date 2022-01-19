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
var extoptions = [{
        commandName: 'isDSGVO',
        value: '#isDSGVO',
        isactive: false
    },
    {
        commandName: 'isParseHTML',
        value: '#isParseHTML',
        isactive: false
    },
    {
        commandName: 'isDOMReplaced',
        value: '#isDOMReplaced',
        isactive: false
    }
];

var out = document.getElementById('localstorage');
var btnOptionSubmit = document.getElementById('btnOptionSubmit');

var htmlElem = document.querySelector('html');
// var pElem = document.querySelector('p');
// var imgElem = document.querySelector('img');
// var bgcolorForm = document.getElementById('bgcolor');
// var fontForm = document.getElementById('font');
// var imageForm = document.getElementById('image');
//main part
function printOptions(out) {
    try {

        out.innerHTML = "</br>product:" + (getItem('product'));
        out.innerHTML += "</br>title:" + (getItem('title'));

        out.innerHTML += "</br>isDSGVO:" + (getItem('isDSGVO'));
        out.innerHTML += "</br>isDOMReplaced:" + (getItem('isDOMReplaced'));
        out.innerHTML += "</br>isParseHTML:" + (getItem('isParseHTML'));
        out.innerHTML += "</br>replaceText:" + (getItem('replaceText'));

        out.innerHTML += "</br>cookie:" + getCookie();
        out.innerHTML += "</br>cookie:" + JSON.stringify(getCookie());

        var store = getItem('store')
        out.innerHTML += "</br>store" + (JSON.stringify(store));

        // for (var v in extoptions) {
        //     var key = getItem(extoptions[v]["commandName"]);
        //     var kv = getItem(extoptions[v].isactive);
        //     out.innerHTML += "</br>" + key + ":" + kv + ".";
        // }
        // alert('TEST');
    } catch (error) {
        alert(e);
        alert(e.stack);
        console.error(e.stack);
    }
}
console.log("Ext running...");
try {
    out.innerHTML = "";
    var product = browser.i18n.getMessage("product");
    var eaten = browser.i18n.getMessage("eaten");
    $('#hptitle').html(product);
    $('#title').html(product);

    $('#replaceText').html(product + eaten);

    // var store = getFromStorage();
    // alert(JSON.stringify(store));
    $('#debug').html("");
    //if (!getItem('isDSGVO') || !getItem('isParseHTML') || !getItem('isDOMReplaced')) {
    var isDSGVO = getItem('isDSGVO') == true || getItem('isDSGVO') == 'true' ? true : false;
    // alert('OPT:' + isDSGVO);
    if (isDSGVO == true) {
        $('#debug').append("populateStorage");
        populateStorage();
    } else {
        $('#debug').append("setstorage");
        setStorage();
    }

    // isParseHTML.onchange = populateStorage;

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
    setCookie(browser.i18n.getMessage("product"));

    btnOptionSubmit.addEventListener('click', populateStorage);

    printOptions(out);
} catch (e) {
    alert(e);
    alert(e.stack);
    console.error(e.stack);
}
(function() {
    //    browser.storage.onChanged.addListener(function(changes, areaName) {
    localStorage.onChanged.addListener(function(changes, areaName) {
        console.log("New item in storage", changes.visitedPages.newValue);
    })
})();