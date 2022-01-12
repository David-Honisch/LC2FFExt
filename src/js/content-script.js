//Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0
function saveLocal(title, value) {
    localStorage.setItem(title, value);
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
    saveLocal(encodeURIComponent(target.href), encodeURIComponent(target.href));
    setCookie(target.href);
    console.log(browser.i18n.getMessage("notificationTitle") + " api:" + target.href);
    browser.runtime.sendMessage({ "url": target.href });
}

function replaceContent(k, v) {
    //just eat the page
    // document.body.textContent = "";
    var header = document.createElement(k);
    var title = browser.i18n.getMessage("notificationTitle");
    header.textContent += browser.i18n.getMessage(v);
    document.body.appendChild(header);
}
try {
    console.log("lc content-script running");
    replaceContent('h1', 'eaten')
        /*
        Add notifyExtension() as a listener to click events.
        */
    window.addEventListener("click", notifyExtension);
    console.log("lc content-script done.");
} catch (error) {
    console.error(error);
    console.error(error.stack);
}