//Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0
function saveLocal(title, value) {
    localStorage.setItem(title, value);
}

function getItem(title) {
    return localStorage.getItem(title);
}

function setCookie(title) {
    document.cookie = encodeURIComponent(title) + "=" + encodeURIComponent(title) + "; SameSite=None; Secure";
}

function notifyExtension(e) {
    var target = e.target;
    while ((target.tagName != "A" || !target.href) && target.parentNode) {
        target = target.parentNode;
    }
    if (target.tagName != "A")
        return;
    //todo:if dsgvo    
    saveLocal(encodeURIComponent(target.href), encodeURIComponent(target.href));
    setCookie(target.href);
    //
    console.log(browser.i18n.getMessage("notificationTitle") + " api:" + target.href);
    browser.runtime.sendMessage({ "url": target.href });
}

//todo:if dsgvo    
//just eat the page
function replaceContent(k, v) {
    var header = document.createElement(k);
    console.log(k + "" + v);
    header.textContent = v;
    document.body.appendChild(header);
}

try {
    console.log("lc content-script running");

    var visited = window.location.href;
    var time = +new Date();
    // browser.storage.sync.set({ 'visitedPages': { pageUrl: visited, time: time } }, function() {
    //saveLocal({ 'visitedPages': { pageUrl: visited, time: time } });
    saveLocal(JSON.stringify({
        'key': { url: visited },
        'value': { url: visited, time: time }
    }), JSON.stringify({ 'value': { pageUrl: visited, time: time } }));


    var replaceCnt = getItem('replaceText');
    replaceCnt = (replaceCnt !== undefined && replaceCnt !== null) ? replaceCnt : browser.i18n.getMessage("eaten");
    replaceContent('h1', replaceCnt);
    /*
    Add notifyExtension() as a listener to click events.
    */
    window.addEventListener("click", notifyExtension);
    console.log("lc content-script done.");
} catch (error) {
    console.error(error);
    console.error(error.stack);
}
// (function() {
//     var visited = window.location.href;
//     var time = +new Date();
//     // browser.storage.sync.set({ 'visitedPages': { pageUrl: visited, time: time } }, function() {
//     localStorage.sync.set({ 'visitedPages': { pageUrl: visited, time: time } }, function() {
//         console.log("Just visited", visited)
//     });
// })();
// (function() {
//     browser.storage.onChanged.addListener(function(changes, areaName) {
//         console.log("New item in storage", changes.visitedPages.newValue);
//     })
// })();