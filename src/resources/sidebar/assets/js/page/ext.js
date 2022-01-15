'use strict'
//var isDebug = false;
var FastClick = function(FastClick) {
    FastClick.attach(document.body);
};
var hostName = "./";
//var hostName = "http://localhost/cms5/";
//var hostName = "http://www.letztechance.org/";
var openLink = this.hostName + "openlink?";
var isDebug = true;
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
var tabs = ["home", "rss feeds", "info", "export"];
// var dropdown1 = ["Chat", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp"];
// var dropdown2 = ["EXCEL", "PDF", "WORD", "ZIP"];

var dropdown1 = ["Chat", "Flickr", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp"];
var dropdown2 = ["EXCEL", "PDF", "WORD", "ZIP"];
var LIST = {};
var json_events = {};

function Home() {
    this.oHTML = new HTML();
    this.oCharts = new Charts();


    this.getTabHead = function getTabHead(tabs) {
        var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#home\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">" +
            msg(tabs[0]) + "</a></li>";
        tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#options\" role=\"tab\" id=\"profile-tab\" data-toggle=\"tab\" aria-controls=\"options\" aria-expanded=\"false\">" +
            msg("options") + "</a></li>";
        tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#rss\" id=\"rss-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">" +
            msg(tabs[1]) + "</a></li>";

        tabHeader += this.oHTML.createDropDown("info", dropdown1);
        tabHeader += this.oHTML.createDropDown("export", dropdown2);
        return tabHeader;
    }
    this.getTabBody = function getTabBody() {
        var tabContent = "";
        tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
        tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"home\" aria-labelledby=\"home-tab\">";
        tabContent += this.oHTML.getHomeExtensionMenu();
        tabContent += "</div>";

        tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"options\" aria-labelledby=\"options-tab\">";
        tabContent += "Loading...";
        tabContent += "</div>";
        tabContent += "</div>";

        tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"rss\" aria-labelledby=\"profile-tab\">";
        tabContent += this.oHTML.getRSSExtensionMenu();
        tabContent += "</div>";
        tabContent += "</div>";
        return tabContent;
    }




}

function _get(url, id, isAppend, isFilter, pattern) {

    $.get(url, function(data) {
        data = isFilter ? $(data).find(pattern) : data; //use .filter() instead.
        if (isAppend) {
            $(id).append(data);
        } else {
            $(id).html(data);
        }
    });
}
async function getPageAsync(api) {
    console.log('get:' + api);
    return $.ajax({
            url: api,
            type: 'get',
            dataType: 'json',
            crossDomain: true,
        })
        // .then(response => response.data);
        .then(response => response);
}

function _getIndex(url, id) {
    var result = "";
    console.log(url);
    try {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(getPageAsync(url)), 300);
        });
        p1.then(
            function(data) {
                // $('#home').append('COUNT:' + data.list);
                for (var v in data.list) {
                    result += "<li><a href=\"https://www.letztechance.org/list-" + data.list[v].id + "-1.html\">" + data.list[v].name + "</a></li>";
                }
                $(id).append(result);
            });



    } catch (error) {
        console.error(error);
        console.error(error.stack);
    }
}

function _getGames(url, id) {
    var result = "";
    console.log(url);
    try {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(getPageAsync(url)), 300);
        });
        p1.then(
            function(data) {
                for (var v in data) {
                    result += "<li><a href=\"https://www.letztechance.org/games/" + data[v] + "\">" + data[v] + "</a></li>";
                }
                $(id).append(result);
            });
    } catch (error) {
        console.error(error);
        console.error(error.stack);
    }
}

function _getTools(url, id) {
    var result = "";
    console.log(url);
    try {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(getPageAsync(url)), 300);
        });
        p1.then(
            function(data) {
                for (var v in data.row) {
                    result += '<li><a href="https://www.letztechance.org/read-22-' + data.row[v].id + '.html">' + data.row[v].subject + '</a></li>';
                }
                $(id).append(result);
            });
    } catch (error) {
        console.error(error);
        console.error(error.stack);
    }
}

function _getEnv(url, id) {
    var result = "";
    console.log(url);
    try {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(getPageAsync(url)), 300);
        });
        p1.then(
            function(data) {
                // $("#home").append(JSON.stringify(data));
                for (var v in data.page.log) {
                    result += '<li>' + JSON.stringify(data.page.log[v]) + '</a></li>';
                }
                $(id).append(result);
            });
    } catch (error) {
        console.error(error);
        console.error(error.stack);
    }
}

function _getISP(url, id) {
    var result = "";
    console.log(url);
    try {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(getPageAsync(url)), 300);
        });
        p1.then(
            function(data) {
                for (var v in data) {
                    result += '<li>' + data[v] + '</li>';
                }
                $(id).append(result);
            });
    } catch (error) {
        console.error(error);
        console.error(error.stack);
    }
}
$(function() {

    var result = "";
    var index = 1;
    var page = 1;
    var html;
    var oHome;
    var indexAPI = "https://www.letztechance.org/webservices/client.php?q=getFullIndexJSON&value1=0&l=";
    var gamesAPI = "https://www.letztechance.org/webservices/client.php?q=getGames";
    var toolsAPI = "https://www.letztechance.org/webservices/client.php?q=getListJSON&value1=22&l=";
    var envAPI = "https://www.letztechance.org/webservices/client.php?q=getLog&query=";
    var ispAPI = "https://www.letztechance.org/webservices/client.php?q=getGeoLocation&value1={}&value2=de";
    var optionsHTML = "options.html";
    try {
        html = new HTML();
        oHome = new Home();
        getPreloader("home", "#out");

        var title = "<h3>LetzteChance.Org</h3><h2 style=\"margin-top:0;\">LC2FFExt</h2> \n";
        title += "<p>v.0.1a</p>\n";
        title += "<p>More than links...</p>\n";
        // title += "<p id=\"marquee\" class=\"microsoft marquee\"></p>\n";

        result += getBoxFluid(title);
        // tabs
        var tabHeader = oHome.getTabHead(tabs);
        var tabContent = oHome.getTabBody();
        result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
        // eof tbs
        printOut("#out", result);
        printOut("#cnt", getBoxFluid("(c) by LetzteChance.Org", "", ""));
        _get(optionsHTML, '#rss', true, false, '');
        _getIndex(indexAPI, '#foren');
        _getGames(gamesAPI, '#games');
        _getTools(toolsAPI, '#tools');
        _getEnv(envAPI, '#env');
        _getISP(ispAPI, '#isp');



        $(".cm-flex").on("click", function() {
            $("#cm-search-btn").click();
            $("#cm-search-btn").focus();
        });
        $(".cm-flex").keypress(
            function(e) {
                if (e.which == 13) {
                    var url = new API().hostName + "index.html?q=search&query=" +
                        $("#btnquery").val() + "";
                    alert(url);
                    window.open(url, '_blank');
                }
            });

    } catch (e) {
        new HTML().setErrorPage(e);
    }
});