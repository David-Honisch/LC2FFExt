console.log("lc content-script running");
//just eat the page
// document.body.textContent = "";
var header = document.createElement('h1');
var title = browser.i18n.getMessage("notificationTitle");
header.textContent += browser.i18n.getMessage("eaten");
document.body.appendChild(header);
/*
Add notifyExtension() as a listener to click events.
*/
window.addEventListener("click", notifyExtension);
window.addEventListener("change", notifyExtension);
try {


    // window.webRequest.onBeforeRequest.addListener(
    //     notifyExtension, { urls: ["<all_urls>"], types: ["main_frame"] }, ["blocking"]
    // );


    //
    // browser.windows.getCurrent()
    //     .then(winInfo => browser.windows.update(winInfo.id, { titlePreface: 'Current Window: ' }));
    console.log("lc content-script done.");
} catch (error) {
    console.error(error);
    console.error(error.stack);
}