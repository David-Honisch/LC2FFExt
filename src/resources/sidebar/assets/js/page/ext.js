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

$(function() {
    var result = "";
    var oHome;
    var webAPI;

    try {
        oHome = new Home();
        webAPI = new WebAPI();
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
        // $('#out').append("url:" + webAPI.indexAPI);
        // webAPI._get(webAPI.staticHTML.options, '#options', true, false, '');
        // webAPI._get(webAPI.staticHTML.rssfeeds, '#rss', true, false, '');


        webAPI._getIndex(webAPI.API.indexAPI, '#foren');
        webAPI._getGames(webAPI.API.gamesAPI, '#games');
        webAPI._getTools(webAPI.API.toolsAPI, '#tools');
        webAPI._getEnv(webAPI.API.envAPI, '#env');
        webAPI._getISP(webAPI.API.ispAPI, '#isp');




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
        oHome.oHTML.setErrorPage(e);
    }
});