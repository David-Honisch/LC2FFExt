'use strict'
var isDebug = false;
var myWindowId;
var FastClick = function(FastClick) {
    FastClick.attach(document.body);
};
var hostName = "./";
//var hostName = "http://localhost/cms5/";
//var hostName = "http://www.letztechance.org/";
var openLink = this.hostName + "openlink?";
var isAuthorized = false;
var isAdmin = false;
var isOpen = false;
var isLangLoaded = false;
var isGamesLoaded = false;
var isPluginsLoaded = false;
var userName = "anonymous";
var msgList = [];
var ImagePath = "./img/";
var lang = "";
var catindex = {};
var eventList = {};
var TokenPREFIX = "LC2Token-RSA-a22343sZIA4C22211sTB33331112";
var session;
var user;
var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
var pathArray = window.location.pathname.split('/');
var secondLevelLocation = pathArray[0];
var tabsList = ["home", "edit", "replace", "news", "rssfeeds", "options"];
var dropdowns = ["info", "export"];
// var dropdown1 = ["Chat", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp"];
// var dropdown2 = ["EXCEL", "PDF", "WORD", "ZIP"];

var dropdown1 = ["Chat", "Flickr", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp"];
var dropdown2 = ["EXCEL", "PDF", "WORD", "ZIP"];
var LIST = {};
var json_events = {};
var editContentBox;

function Home() {
    this.oHTML = new HTML();
    this.oCharts = new Charts();


    this.getTabHead = function getTabHead(tabs, dropdown1, dropdown2) {
        var result = "";
        var i = 0;
        for (var v in tabs) {
            var ActiveTab = i == 0 ? ' class=\"active\"' : '';
            result += "<li role=\"presentation\"" + ActiveTab + "><a href=\"#" + tabs[v] + "\" id=\"" + tabs[v] + "-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">" +
                msg(tabs[v]) + "</a></li>";
            i++;
        }
        result += this.oHTML.createDropDown("info", dropdown1);
        result += this.oHTML.createDropDown("export", dropdown2);
        return result;
    }
    this.getTabBody = function getTabBody(tabs) {
        var tabContent = "";
        var i = 0;
        tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
        for (var v in tabs) {
            var ActiveTab = i == 0 ? 'tab-pane fade active in' : 'tab-pane fade in';
            tabContent += "<div role=\"tabpanel\" class=\"" + ActiveTab + "\" id=\"" + tabs[v] + "\" aria-labelledby=\"" + tabs[v] + "-tab\">";
            // tabContent += "<p>Loading...</p>";
            tabContent += "</div>";
            i++;
        }
        tabContent += "</div>";
        return tabContent;
    }
}

// $(function() {
var result = "";
var oHome;
var webAPI;
try {

    oHome = new Home();
    webAPI = new WebAPI();
    getPreloader("home", "#out");

    var title = "<h4>LetzteChance.Org</h4><h5 style=\"margin-top:0;\">LC2FFExt v.1.0</h5> \n";
    title += "<p>More than links...</p>\n";
    // title += "<p id=\"marquee\" class=\"microsoft marquee\"></p>\n";

    result += getBoxFluid(title);
    // tabs
    var tabHeader = oHome.getTabHead(tabsList, dropdown1, dropdown2);
    var tabContent = oHome.getTabBody(tabsList);
    result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
    // eof tbs
    printOut("#out", result);
    printOut("#cnt", getBoxFluid("(c) by LetzteChance.Org", "", ""));
    // $('#out').append("url:" + webAPI.indexAPI);
    webAPI._get(webAPI.staticHTML.home, '#home', true, false, '');

    webAPI._get(webAPI.staticHTML.news, '#news', true, false, '');
    webAPI._get(webAPI.staticHTML.options, '#options', true, false, '');
    webAPI._get(webAPI.staticHTML.rssfeeds, '#rss', true, false, '');


    webAPI._getIndex(webAPI.API.indexAPI, '#foren');
    webAPI._getGames(webAPI.API.gamesAPI, '#games');
    webAPI._getTools(webAPI.API.toolsAPI, '#tools');
    webAPI._getEnv(webAPI.API.envAPI, '#env');
    webAPI._getISP(webAPI.API.ispAPI, '#isp');

    webAPI._getLIST(webAPI.API.listAPI.replace('%s1', '22'), 22, '#exttools');

    webAPI._getLIST(webAPI.API.listAPI.replace('%s1', '1'), 1, '#newslist');
    webAPI._getLIST(webAPI.API.listAPI.replace('%s1', '2'), 2, '#securitynews');

    webAPI._getREAD(webAPI.API.readAPI.replace('%s1', '28').replace('%s2', '224'), 28, '#rssfeeds');
    //annotate tabs !!
    $('#edit').append("<div id=\"editcnt\"></div><p>Annotate tab url</p>");
    $('#edit').append("<div id=\"site-list\"></div>");
    editContentBox = document.querySelector("#editcnt");
    //optionslist
    /*
    Make the content box editable as soon as the user mouses over the sidebar.
    */
    window.addEventListener("mouseover", () => {
        editContentBox.setAttribute("contenteditable", true);
    });

    /*
    When the user mouses out, save the current contents of the box.
    */
    window.addEventListener("mouseout", () => {
        console.log('mouseout');
        editContentBox.setAttribute("contenteditable", false);
        browser.tabs.query({ windowId: myWindowId, active: true }).then((tabs) => {
            let contentToStore = {};
            contentToStore[tabs[0].url] = editContentBox.textContent;
            browser.storage.local.set(contentToStore);
        });
    });

    /*
    Update the sidebar's content.
    
    1) Get the active tab in this sidebar's window.
    2) Get its stored content.
    3) Put it in the content box.
    */
    function updateContent() {
        console.log('updateContent');
        browser.tabs.query({ windowId: myWindowId, active: true })
            .then((tabs) => {
                return browser.storage.local.get(tabs[0].url);
            })
            .then((storedInfo) => {
                editContentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
            });
    }

    // /*
    // Update content when a new tab becomes active.
    // */
    if (browser.tabs !== undefined)
        browser.tabs.onActivated.addListener(updateContent);

    /*
    Update content when a new page is loaded into a tab.
    */
    if (browser.tabs !== undefined)
        browser.tabs.onUpdated.addListener(updateContent);

    /*
    When the sidebar loads, get the ID of its window,
    and update its content.
    */
    if (browser.windows !== undefined)
        browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
            myWindowId = windowInfo.id;
            updateContent();
        });

    //eo annotate
    // browser.topSites.get()
    //     .then((sites) => {
    //         var div = document.getElementById('site-list');

    //         if (!sites.length) {
    //             div.innerText = 'No sites returned from the topSites API.';
    //             return;
    //         }

    //         let ul = document.createElement('ul');
    //         ul.className = 'list-group';
    //         for (let site of sites) {
    //             let li = document.createElement('li');
    //             li.className = 'list-group-item';
    //             let a = document.createElement('a');
    //             a.href = site.url;
    //             a.innerText = site.title || site.url;
    //             li.appendChild(a);
    //             ul.appendChild(li);
    //         }

    //         div.appendChild(ul);
    //     });
    //
    $(".cm-flex").on("click", function() {
        $("#cm-search-btn").click();
        $("#cm-search-btn").focus();
    });
    $(".cm-flex").keypress(
        function(e) {
            if (e.which == 13) {
                var url = new API().hostName + "index.html?q=search&query=" +
                    $("#btnquery").val() + "";
                // alert(url);
                window.open(url, '_blank');
            }
        });


} catch (e) {
    oHome.oHTML.setErrorPage(e);
}