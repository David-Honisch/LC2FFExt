//Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0
function setSessionItem(k, v) {
    sessionStorage.setItem(k, v);
}

function getSessionItem(k) {
    return sessionStorage.getItem(k);
}

function delSessionItem(k) {
    sessionStorage.removeItem(k);
}

function clearSessionItems() {
    sessionStorage.clear();
}

function saveLocal(title, value) {
    localStorage.setItem(title, value);
}

function getCookie() {
    return document.cookie;
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

function getLinks(urls) {
    var result = "";
    for (var v in urls) {
        result += "[url]<a href=\"" + apiParseAPI + urls[v] + "\" target=\"_blank\">" + urls[v] + "</a>[url]<br/>";
    }
    return result;

}

function getParsedLinks(htmlBody) {
    var result = "";
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    // return htmlBody.match(regex);
    // var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression, "g");

    result = htmlBody.match(regex);
    if (result) {
        console.log("Successful match");
    } else {
        console.log("No match");

    }
    return result;
}
//todo:if dsgvo    
//just eat the page
function replaceContent(domElement, v) {
    var allURLs = document.links;
    var header = document.createElement(domElement);
    console.log(domElement + "" + v);
    // header.textContent = v;
    header.innerHTML = v;

    var linksText = getLinks(allURLs);
    header.innerHTML += "<h1>Static URLS:</h1>" + linksText;
    var body = document.body.innerHTML;
    console.log("OUT:\n" + JSON.stringify(body));
    var foundURLs = getParsedLinks("" + body);
    var foundtext = "";
    for (var v in foundURLs) {
        foundtext += "<a href=\"" + foundURLs[v] + "\">" + foundURLs[v] + "</a>";
    }
    header.innerHTML += "<h1>URLS:</h1>" + foundtext;

    document.body.appendChild(header);

}
window.addEventListener("message", (event) => {
    if (event.source == window &&
        event.data &&
        event.data.direction == "from-page-script") {
        alert("Content script received message: \"" + event.data.message + "\"");
    }
});

/*
Send a message to the page script.
*/
function messagePageScript() {
    window.postMessage({
        direction: "from-content-script",
        message: "Message from the content script"
    }, "https://mdn.github.io");
}


try {
    console.log("lc content-script running");
    var visited = window.location.href;
    var time = +new Date();
    // browser.storage.sync.set({ 'visitedPages': { pageUrl: visited, time: time } }, function() {
    //saveLocal({ 'visitedPages': { pageUrl: visited, time: time } });
    saveLocal(JSON.stringify({
        'key': { url: visited },
        'value': { url: visited, time: time },
        'cookie': { cookie: getCookie(), time: time }
    }), JSON.stringify({ 'value': { pageUrl: visited, time: time } }));

    // var replaceCnt = getSessionItem('replaceText');    
    var replaceCnt = getItem("replaceText");

    replaceCnt = (replaceCnt !== undefined && replaceCnt !== null) ? replaceCnt : browser.i18n.getMessage("eaten");
    replaceContent('div', replaceCnt);
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