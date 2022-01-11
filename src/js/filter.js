"use strict";
/*FILTER*/

console.log("filterjs");

function showMessage(msg,title) {
  msg = msg!==undefined ? msg : "DEFAULT";
  title = title!==undefined ? title : "DEFAULTITLE";
  browser.notifications.create({
    "type": "basic",
    "title": msg,
    "message": title
  });
}

function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    // Just change any instance in the HTTP response    
    str = str.replace(/login/g, 'Games WebExtension');
    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  return {};
}


function getRequestMsg(details) {
  showMessage("msg","REQUESTMSG");

  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();
  console.log("getRequestMsg");
  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    console.log(JSON.stringify(str));
    // Just change any instance in the HTTP response    
    str = str.replace(/login/g, 'Games WebExtension');
    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  return {};
}


// browser.webRequest.onBeforeRequest.addListener(
//   showMessage(),
//   {urls: ["https://www.letztechance.org/*"], types: ["main_frame"]},
//   ["blocking"]
// );

browser.webRequest.onBeforeRequest.addListener(
  getRequestMsg,
  {urls: ["https://www.letztechance.org/*"], types: ["main_frame"]},
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  getRequestMsg,
  {urls: ["https://www.letztechance.org/*"], types: ["main_frame"]},
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  getRequestMsg({}),
  {urls: ["https://www.letztechance.org/*"], types: ["main_frame"]},
  ["blocking"]
);

// browser.webRequest.onBeforeRequest.addListener(
//   listener,
//   {urls: ["https://www.letztechance.org/*"], types: ["main_frame"]},
//   ["blocking"]
// );

// browser.webRequest.onBeforeRequest.addListener(
//   showMsg("Message","testtype","testtitle")
//   // {urls: ["https://www.letztechance.org/*"], types: ["main_frame"]},
//   // ["blocking"]
// );
