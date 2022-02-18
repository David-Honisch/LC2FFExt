var apiParseAPI = "https://www.letztechance.org/?q=read&value1=22&value2=3&plugin=webparser&proxy=&port=&Submit=Submit&query=";

function getDocument(msg) {
    return {
        title: msg.title,
        body: msg.body,
        links: getLinks(msg)
    }

}

function getLinks(doc) {
    var result = "";
    for (var v in doc.links) {
        result += "[url]<a href=\"" + apiParseAPI + doc.links[v] + "\" target=\"_blank\">" + doc.links[v] + "</a>[url]<br/>";
    }
    return result;

}
/**
 * Define a function in the content script's scope, then export it
 * into the page script's scope.
 */
function notify(msg) {
    var out = document.querySelector('#lc-script-out');
    var doc = getDocument(msg);
    console.log('notify:' + doc.title);
    var result = doc.links;
    out.innerHTML = result;
    browser.runtime.sendMessage({ content: "Function call: " + msg });
}
exportFunction(notify, window, { defineAs: 'notify' });
/**
 * Create an object that contains functions in the content script's scope,
 * then clone it into the page script's scope.
 *
 * Because the object contains functions, the cloneInto call must include
 * the `cloneFunctions` option.
 */
var messenger = {
    notify: function(msg) {
        var out = document.querySelector('#lc-script-out');
        var doc = getDocument(msg);
        console.log('messenger notify:' + doc.title);
        var result = doc.links;
        out.innerHTML = result;

        //doc.body += "<h1>blah</h1>";
        browser.runtime.sendMessage({ content: "Object method call: " + msg });
    }
};

window.wrappedJSObject.messenger = cloneInto(messenger, window, { cloneFunctions: true });
// /**
//  * Show a notification when we get messages from the content script.
//  */
// browser.runtime.onMessage.addListener((message) => {
//   browser.notifications.create({
//     type: "basic",
//     title: "Message from the page",
//     message: message.content
//   });
// });


// const button1 = document.querySelector("#function-notify");

// button1.addEventListener("click", () => {
//   window.notify("Message from the page script!");
// });

// const button2 = document.querySelector("#object-notify");

// button2.addEventListener("click", () => {
//   window.messenger.notify("Message from the page script!");
// });