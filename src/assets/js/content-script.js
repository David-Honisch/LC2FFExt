//Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0
function HashMap(TKey, TValue) {
    var db = [];
    var keyType, valueType;

    (function() {
        keyType = TKey;
        valueType = TValue;
    })();

    var getIndexOfKey = function(key) {
        if (typeof key !== keyType)
            throw new Error('Type of key should be ' + keyType);
        for (var i = 0; i < db.length; i++) {
            if (db[i][0] == key)
                return i;
        }
        return -1;
    }

    this.add = function(key, value) {
        if (typeof key !== keyType) {
            throw new Error('Type of key should be ' + keyType);
        } else if (typeof value !== valueType) {
            throw new Error('Type of value should be ' + valueType);
        }
        var index = getIndexOfKey(key);
        if (index === -1)
            db.push([key, value]);
        else
            db[index][1] = value;
        return this;
    }

    this.get = function(key) {
        if (typeof key !== keyType || db.length === 0)
            return null;
        for (var i = 0; i < db.length; i++) {
            if (db[i][0] == key)
                return db[i][1];
        }
        return null;
    }

    this.size = function() {
        return db.length;
    }

    this.keys = function() {
        if (db.length === 0)
            return [];
        var result = [];
        for (var i = 0; i < db.length; i++) {
            result.push(db[i][0]);
        }
        return result;
    }

    this.values = function() {
        if (db.length === 0)
            return [];
        var result = [];
        for (var i = 0; i < db.length; i++) {
            result.push(db[i][1]);
        }
        return result;
    }

    this.randomize = function() {
        if (db.length === 0)
            return this;
        var currentIndex = db.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = db[currentIndex];
            db[currentIndex] = db[randomIndex];
            db[randomIndex] = temporaryValue;
        }
        return this;
    }

    this.iterate = function(callback) {
        if (db.length === 0)
            return false;
        for (var i = 0; i < db.length; i++) {
            callback(db[i][0], db[i][1]);
        }
        return true;
    }
}

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
    var regex = new RegExp(expression, "g");
    result = htmlBody.match(regex);
    if (result) {
        console.log("Successful match");
    } else {
        console.log("No match");
    }
    return result;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function reltoabs(link) {
    var a;
    return function(url) {
        if (!a) a = document.createElement('a');
        a.href = url;
        return a.href;
    };
}

function reltoabsRegex(link) {
    let absLink = location.href.split("/");
    let relLink = link;
    let slashesNum = link.match(/[.]{2}\//g) ? link.match(/[.]{2}\//g).length : 0;
    for (let i = 0; i < slashesNum + 1; i++) {
        relLink = relLink.replace("../", "");
        absLink.pop();
    }
    absLink = absLink.join("/");
    absLink += "/" + relLink;
    return absLink;
}
var resolveURL = function resolve(url, base) {
        base = base !== undefined ? base : document.baseURI;
        if ('string' !== typeof url || !url) {
            return null; // wrong or empty url
        } else if (url.match(/^[a-z]+\:\/\//i)) {
            return url; // url is absolute already 
        } else if (url.match(/^\/\//)) {
            return 'http:' + url; // url is absolute already 
        } else if (url.match(/^[a-z]+\:/i)) {
            return url; // data URI, mailto:, tel:, etc.
        } else if ('string' !== typeof base) {
            var a = document.createElement('a');
            a.href = url; // try to resolve url without base  
            if (!a.pathname) {
                return null; // url not valid 
            }
            return 'http://' + url;
        } else {
            base = resolve(base); // check base
            if (base === null) {
                return null; // wrong base
            }
        }
        var a = document.createElement('a');
        a.href = base;

        if (url[0] === '/') {
            base = []; // rooted path
        } else {
            base = a.pathname.split('/'); // relative path
            base.pop();
        }
        url = url.split('/');
        for (var i = 0; i < url.length; ++i) {
            if (url[i] === '.') { // current directory
                continue;
            }
            if (url[i] === '..') { // parent directory
                if ('undefined' === typeof base.pop() || base.length === 0) {
                    return null; // wrong url accessing non-existing parent directories
                }
            } else { // child directory
                base.push(url[i]);
            }
        }
        return a.protocol + '//' + a.hostname + base.join('/');
    }
    //todo:if dsgvo    
    //just eat the page
function getUniqueUrls(document) {
    var urls = [];
    var foundtext = "";
    for (var v in document.links) {
        urls.push("" + (reltoabs("" + document.links[v]).href));
    }
    var urls = urls.filter(onlyUnique);
    console.log("Length:" + urls.length + "");
    var foundURLs = getParsedLinks("" + document.body.innerHTML);
    for (var v in foundURLs) {
        urls.push("" + (reltoabs("" + foundURLs[v]).href));
    }
    console.log("Length:" + urls.length + " before...");
    urls = foundURLs.filter(onlyUnique);
    console.log("Length:" + urls.length + " after...");
    return urls;
}

function printReplaceContent(urls, header, foundtext, document) {
    for (var v in urls) {
        foundtext += "[url]<a href=\"" + urls[v] + "\">" + urls[v] + "</a>[/url]<br/>";
    }
    console.log("Length:" + urls.length + "");
    header.innerHTML += "<h1>URLS:</h1>" + foundtext;
    document.body.appendChild(header);
}

function replaceContent(domElement, outPutText) {
    var urls = [];
    var foundtext = "";
    var header = document.createElement(domElement);
    console.log(domElement + "" + outPutText);
    urls = getUniqueUrls(document);
    console.log("Length:" + urls.length + " after...");
    printReplaceContent(urls, header, foundtext, document);

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