function API() {
//	this.hostName = "./";
//	this.hostName = hostName;
	this.hostName = "http://letztechance.org/";	
	this.openLink = this.hostName+openLink;
	
	this.doGetAuth = function doGetAuth(user, pass) {
		var api = this.hostName+"webservices/client.php?q=getAuth&user="+ user+"&pass="+ pass+"";
		return getJSON(api);	
	}
	this.doIsAuth = function doIsAuth(session) {
		var api = this.hostName+"webservices/client.php?q=isAuth&token="+ session+"";
		return getJSON(api);	
	}
	this.getLogout = function getLogout(session) {
		var api = this.hostName+"webservices/client.php?q=delToken&token="+session;
		return getJSON(api);		
	}
	this.doGetEvents = function doGetEvents() {
		var url = this.hostName+"webservices/client.php?q=getFullCalendar&IsSort=0&cdate=2017-04-18 15:23:09&value1=1&value2=1";
		return getJSON(url);
	}
	
	this.getIndex = function getIndex(page) {
		var url = this.hostName+"webservices/client.php?q=getFullIndexJSON&l=" + lang+ "";
		return getJSON(url);
	}
	
	this.getList = function getList(index, page) {
		var url = this.hostName+"webservices/client.php?q=getListJSON&value1="+ index + "&value2=" + page + "";
		var rs = getJSON(url);
		return JSON.parse(JSON.stringify(rs));	
	}
	
	this.getRead = function getRead( index, page) {
		var url = this.hostName+"webservices/client.php?q=getReadJSON&value1="+ index + "&value2=" + page + "";
		var rs = getJSON(url);
		return JSON.parse(JSON.stringify(rs));
	}
	
	this.getLastContent = function getLastContent(lang) {
		var api = this.hostName+"webservices/client.php?q=getLang&value1=" + lang + "";
		return getJSON(api);
	}
	
	this.getSearch = function getSearch(query, index, page) {
		var api = this.hostName+"webservices/client.php?q=getSearch" + "&query="+ query + "&value1=" + index + "&value2="+page;
		return getJSON(api);
	}
	this.getTags = function getTags(query, index, page) {
		var url = this.hostName+"webservices/client.php?q=getTags";		
		return getJSON(url);		
	}
	this.getLang = function getLang(lang) {
		var api = this.hostName+"webservices/client.php?q=getLang&value1=" + lang + "";
		return getJSON(api);
	}
	this.getFullCalendar = function getFullCalendar(lang) {
		var api = this.hostName+"webservices/client.php?q=getLang&value1=" + lang + "";
		return getJSON(api);
	}	 
}
function HTMLParser() {
	this.getURLsFromString = function getURLsFromString(str) {
		  var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm; 
		  var m;
		  var arr = [];
		  while ((m = re.exec(str)) !== null) {
		    if (m.index === re.lastIndex) {
		        re.lastIndex++;
		    }
		    arr.push(m[0]);
		  }
		  return arr;
		}
}
function addExportEvents() {
	this.addEvents = function addEvents(index, page) {
		$.getScript('./assets/js/plugins/export/export.js',	function() {
			var oExportEvent =new Export();
		});
	}	
}
function Charts() {
	this.getTD = function getTD(value, title) {
		var title = title !== undefined ? title : "N/A";
		var value = value !== undefined ? value : 0;
		var result = "<tr>";
		result += "<td style=\"white-space:nowrap\">" + title + "</td>";
		result += "<td>";
		result += "<div class=\"progress\">";
		result += "<div class=\"progress-bar progress-bar-danger\" style=\"width:"
				+ value + "%\"></div>";
		result += "</div>";
		result += "</td>";
		result += "<td>" + value + "%</td>";
		result += "</tr>";
		return result;
	}
	this.getProgressBars = function getProgressBars(res) {
		var result = "";
		try {			
		
		result = "<table class=\"table table-bordered\"> ";
		var list = {};
		$("#panelprogressData").html();
		for ( var v in res) {
			var t = res[v].url.split("-")[1];
			if (t !== undefined) {
				if (list[t] !== undefined) {
					var c = parseInt(list[t]);
					list[t] = (+1 + c);
				} else {
					list[t] = 0;
				}
			}
		}
		var max = 0;
		for ( var v in list) {
			max = +max + list[v];
		}
		var onePercent = +(+max / 100);
		for ( var v in list) {
			var val = list[v];
			// $("#panelprogressData").append(onePercent);
			var currentPercent = ((+onePercent * +val) / 100);
			// $("#panelprogressData").append("<hr>val "+val+" 1%:"+onePercent+"
			// Max:"+max+"<hr>"+currentPercent+" %<hr>");
			var td = this.getTD(currentPercent, catindex.list[v - 1].name)
			result += td;
			// $("#panelprogressData").append(td);
		}
		result += "</table> ";
		} catch (e) {
			console.log(e+e.stack);
		}
		return result;
	}

}
function UTIL() {
	this.uniq = function uniq(a) {
		   return Array.from(new Set(a));
	}	
	this.getEventsByDate = function getEventsByDate(eventsResult) {
		var i = 0;
		var cyear = new Date().getFullYear();
		var g = [];
		for ( var s in eventsResult) {
			if ((eventsResult[s].start).includes(cyear)) {
				var str = "" + eventsResult[s].start.substring(0, 10) + "";
				if (str !== null && str !== "null" && !g.includes(str)) {
					g[i] = str.toString();
					i++;
				}
			}
		}
		g = new UTIL().uniq(g);
		return g.reverse();
	}

	this.setEventsSorted = function setEventsSorted(g, grid) {		
		grid[0][1] = g.toString();
		return grid;
	}
	
	this.setEventsNumbers = function setEventsNumbers(g, grid, eventsResult) {
		var i = 0;
		var news = [];
		var security = [];
//		$("#cnt").append(getBoxFluid("Set Number:" + JSON.stringify(grid) + "<hr>"));
		var lv = 0;
		for (var v in g)
		{
			var cdate = g[v];
			for (var p in eventsResult )
			{
				if (cdate == eventsResult[p].start.substring(0, 10))
				{
					if (eventsResult[p].url.includes("read-1-"))
					{
						news[v] = lv;
						lv++;
						i++;
					}
					if (eventsResult[p].url.includes("read-2-"))
					{
						security[v] = lv;
						lv++;
						i++;
					}
				}
			}
		}
//		$("#cnt").append(getBoxFluid("Event:" + JSON.stringify(news) + "<hr>"));		
		grid[1][1] = ""+news.toString();
		grid[2][1] = ""+security.toString();
		return grid;
	}
}
function HTML() {
	this.getExtensionMenu = function getExtensionMenu()
	{
		var result = "";
		result +=" <div class=\"cm-flex\"><a href=\"index.html\" class=\"cm-logo\"> </a></div> "; 
		result +="  "; 
		result +=" <ul>"; 
		result +=" <li><a href=\"https://letztechance.org\"  data-toggle=\"cm-menu\">Letztechance.org</a></li> "; 
		result +=" <li><a href=\"https://www.letztechance.org/read-22-4.html\">Webparser Forum v1.0</a></li> "; 
		result +=" <li><a href=\"https://www.letztechance.org/read-22-5.html\">LC2SRC2SRC - Javascript Source Convert v.1.0</a></li> "; 
		result +=" <li><a href=\"https://www.letztechance.org/read-22-6.html?from=berlin&to=bonn\">LC2GoogleRoute View v.1.0</a></li> "; 
		result +=" <li><a href=\"https://www.letztechance.org/read-22-7.html\">LC2Google Dual Street View v.1.0</a></li> "; 
		result +=" <li><a href=\"https://www.letztechance.org/contact.html\">Contact</a></li> "; 
		result +=" <li><a href=\"https://www.letztechance.org/contact.html\">Imprint</a></li> "; 
		result +=" </ul>"; 
		return result;
	}
	
	this.getLoginForm = function getLoginForm() {
		var result = "";
		result += " <form action=\""+new API().hostName+"?q=login\" method=\"get\" rel=\"external\" target=\"_parent\"> "; 
		result += " <input name=\"q\" id=\"q\" value=\"login\" type=\"hidden\"> "; 
		result += " <label>Benutzer:</label><input name=\"user\" id=\"user\" value=\"\" type=\"text\"> "; 
		result += " <label>Passwort:</label><input name=\"pass\" id=\"pass\" value=\"\" type=\"password\"><label>Passwort speichern:</label> "; 
		result += " <input name=\"spass\" id=\"spass\" value=\"\" type=\"checkbox\"><label>Hochladen:</label><input name=\"file\" id=\"file\" type=\"file\"> "; 
		result += " <input name=\"login\" id=\"login\" value=\"Login\" type=\"submit\" class=\"btn btn-default\"> "; 
		result += " </form> ";
		return result;
	}
	
	this.getSearchTables = function getSearchTables(index, page, catindex, query) {
		var result = "";
		var res = [];
		page = page >=1?page:0;
		for (var index = page; index < catindex.list.length; index++) {
		 var cnt = +page+1;
		 if (index == cnt){break;}
		 $("#search").html(getPreloaderIMG()+"<h2>Loading database index:</h2>" +index+".<h3>Please wait paitently while scanning...</h3>");
		 	res = new API().getSearch(query, index, page);
			if (res !== null && res !== undefined) {
				result += this.printSearchTables(index, page, query, res);				
			}
		}
		result += this.getPagination("search", index, page, 100, query);
		setPage("#search", result,false);
	}
	this.printSearchTables = function printSearchTables(index, page, query, res) {
		var i = 0;
		var result = "";
		try {
//			alert(JSON.stringify(res));
			result += "<table class=\"table\"><thead>";
		for ( var v in res) {			
				var va = JSON.parse(JSON.stringify(res[v]));
				
				result += "<tr>";
				result += "<th>";
				if (va != undefined)
				{
					var id = va["id"];
					var subject = va["subject"];	
					result += "<div class=\"md-folder icon24\"></div>";	
					result += "" + id + "-";
					result += "<a href=\""+new API().hostName+"read-" + index + "-" + id + ".html\">";
					result += "" + utf8_decode(subject) + "";
					result += "</a>";					
				}
				else{
					result += msg("notfound");
				}
				result += "</th>";
				result += "</tr>";			
			i++;
		}
		} catch (e) {
			this.setErrorPage(e);
		}
		result += "</table>";
		return result;
	}
	
	
	this.addTabs = function addTabs() {	
		$.getScript('./assets/js/plugins/tab/tab.js',	function() {
			var oTabs =new Tabs();
		});
	}
	this.getULDropDown = function getULDropDown(list, subject, id, lbl, cls) {
		return "<li role=\"presentation\" class=\"dropdown\">"
				+ "<a href=\"#\" id=\"myTabDrop1\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-controls=\"myTabDrop1-contents\" aria-expanded=\"false\">"
				+ msg(""+subject+"")
				+ "...<span class=\"caret\"></span></a>"
				+ "<ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\""
				+ lbl + "\" id=\"" + id + "\">" + list + "</ul></li>";
	}
	this.getLIDropDown = function getLIDropDown(subject, url, id) {
		return "<li><a href=\"" + url + "\" tabindex=\"-1\" role=\"tab\" id=\""
				+ id + "-tab\" data-toggle=\"tab\" aria-controls=\"" + id
				+ "\">" + subject + "</a></li>";
	}
	this.createDropDown = function createDropDown(id, rs) {
		var result = "";		
		for ( var v in rs) {
			result += this.getLIDropDown(rs[v], "#"+rs[v], rs[v])
		}
		result = this.getULDropDown(result, id, id, id+"lbl","");
		return result;
	}
	this.getNavigation = function getNavigation() {
		var result = "";
		for (var v in catindex.list)
		{
			result 	+= "<li><a href=\"list-"+catindex.list[v].id+"-1.html\">"+catindex.list[v].name+"</a></li>";	
		}
		$("#foren li:last").after(result);	
	}
	
	this.DLApi = function DLApi(){
		return "<div id=\"dyncontent\"><a onmouseover=\"jQuery('#dyncontent').effect('shake');return false;\" href=\""+new API().openLink+"./upload/dl.php?id=376\" rel=\"external\"><img src=\"http://www.letztechance.org/img/download/ldisc.jpg\" /></a></div>";
	}
	this.YTApi = function YTApi(){
		return "<center><div id=\"player\"></div><script>var vId = \"LmDZqp1i9vk\";</script><script src=\"./assets/js/plugins/google/ythtml5.js\"></script></center>";
	}
	
	this.getPostForm = function getPostForm(isAuthorized, value1, value2) {
		var result = "";
		try {
			if (isAuthorized) {
				var body = "";
				result += "";
				result += "<input type=\"button\" value=\"Add Url\" onclick=\"$('#body').val($('#body').val()+'[url][/url]\\n');\"></input>";
				result += "<input type=\"button\" value=\"Add Img\" onclick=\"$('#body').val($('#body').val()+'[img]http://www.letztechance.org/img/download/ldisc.jpg[/img]');\"></input>";
				result += "<input type=\"button\" value=\"Add YTApi\" onclick=\"$('#body').val($('#body').val()+$('#ytsrc').val());\"></input>";
				result += "<input type=\"button\" value=\"Add DLApi\" onclick=\"$('#body').val($('#body').val()+$('#dlsrc').val());\"></input>";				
				
				result += "<textarea id=\"ytsrc\" rows=\"1\" cols=\"20\">";
				result += this.YTApi();
				result += "</textarea>";
				
				result += "<textarea id=\"dlsrc\" rows=\"1\" cols=\"20\">";
				result += this.DLApi();
				result += "</textarea>"
				
				result += "<input type=\"button\" value=\"Clear\" onclick=\"$('#body').val('');\">";
				result += "<form method=\"POST\" id=\"insertForm\" name=\"insertForm\">";

				result += "<fieldset>";
				result += "<legend>" + msg("forum") + "</legend>";
				result += "<select name=\"value1\" id=\"value1\">\n";
				result += "<option value=\"-1\">All</option>\n";
				for ( var v in catindex.list) {
					var isFound = false;
					if (v) {
						if (v == value1) {
							isFound = true;
						}
					}
					// alert(JSON.stringify(v));
					if (isFound) {
						result += "<option value=\"" + v.id
								+ "\" selected=\"selected\">"
								+ catindex.list[v] + "</option>\n";
					} else {

						result += "<option value=\"" + catindex.list[v].id
								+ "\">" + catindex.list[v].name + "</option>\n";
					}
				}
				result += "</select>\n";
				result += "</fieldset>";
				result += "<fieldset>";
				result += "<legend>" + msg("timestamp") + "</legend>";
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------
				var df = getFormattedDate(new Date());

				result += "<input name=\"cdate\" id=\"cdate\" type=\"date\" value=\""
						+ df
						// + "\" data-date-format=\"yy-mm-dd\"
						// data-role=\"date\"'/>";
						+ "\" data-date-format=\"yy-mm-dd\" data-role=\"date\"/>";
				result += "</fieldset>";
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------
				result += "<fieldset>";
				// ----------------------------------------------------------------
				result += "<legend>" + msg("subject") + "</legend>";
				result += "<input type=\"text\" id=\"subject\" name=\"subject\" value=\""
						+ msg("subject")
						+ "\" title=\""
						+ msg("subject")
						+ "\" size=\"110;\"><br />";
				result += "</fieldset>";
				// ----------------------------------------------------------------
				result += getPostBody(body);
				// ----------------------------------------------------------------
				// //
				// ----------------------------------------------------------------
				result += "<fieldset>";
				result += "<select name=\"isProtected\" id=\"isProtected\">";
				result += "<option value=\"0\">no protection</option>";
				result += "<option value=\"1\">protection</option>";
				result += "<option value=\"2\">require admin rights</option>";
				result += "<option value=\"99\">hidden</option>";
				result += "</select>";

				result += "<select name=\"isPHPCode\" id=\"isPHPCode\">";
				result += "<option value=\"0\">is no code</option >";
				result += "<option value=\"1\">is code</option>";
				result += "</select>";
				result += "</fieldset>";

				result += "<fieldset>";
				result += "<input type=\"button\" id=\"btnSubmit\" name=\"btnSubmit\" value=\"submit\"><br />";
				result += "</fieldset>";
				result += "</form>";
				result += "<fieldset>";
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------
				result += "</fieldset>";
				result += "<div id=\"msg\"></div>";
			}
		} catch (e) {
			alert(e.stack);
			$("#error").html(JSON.stringify(e) + e.stack);
			result = JSON.stringify(e) + e.stack;
		}
		return result;
	}
	
	this.getIndex = function getIndex(index, page) {
		var result = "<div class=\"container-fluid cm-container-white\">\n";
		result += "<table class=\"table\"><thead>";
		
		for (var v in catindex.list)
		{
			result += "<tr>";
			if (catindex.list[v].id != undefined || catindex.list[v].subject != undefined)
			result 	+= "<th><div class=\"md-folder icon24\"></div></th><th><a href=\"list-"+ catindex.list[v].id+"-1.html\" rel=\"external\">"+utf8_decode(catindex.list[v].name)+"</a></th><th><a href=\"rssreader-"+ catindex.list[v].id+"-1.html\" rel=\"external\"><div class=\"rss icon2436\"></div></a></th>";
			result += "</tr>";
		}
		result += "</thead></table>";
		result += "</div>";
		result += this.getPagination("index", index, page);
		return result;
	}
	this.printRead = function printRead(id, read, index, page) {
		var result = "";
		result += "<h1>"+utf8_decode(getSubject(read, false))+"</h1>";	
		result += "<div id=\"bodycontent\">";
		var b = read.body != undefined ?read.body:"N/A";
		if (b.includes("[target]"))
		{
			var s = 'plugins-'+index+'-'+page+'.html?l=de';
			result += getJSON(s,true);
		}
		else
		{
			result += b;
		}
		result += "</div>";
		result += "<div id=\"plugins\"></div>";
		result += this.getPagination("read", index, page, read.size !== undefined?read.size:1);
		$(id).html(result);
	}
	this.parseURLs = function parseURLs(page) {
		var result = "";
		var links = new HTMLParser().getURLsFromString(page)
		for (var v in links)
		{
			var link = links[v];
			if (!link.includes("openlink.letztechance.org"))
			result += "<a href=\""+new API().openLink+""+ links[v]+"\">"+ links[v]+"</a><br>";
		}
		return result;
	}
	
	this.printReadQuery = function printReadQuery(id, read, index, page) {
		var result = "";
// result += "<h1>"+getSubject(read, false)+"</h1>";
		result += "<div id=\""+id+"bodycontent\">";
		var b = read.body != undefined ?read.body:"N/A";
		if (b.includes("[target]"))
		{
			var s = 'plugins-'+index+'-'+page+'.html?l=de';
			result += getJSON(s,true);
		}
		else
		{
			result += this.parseURLs(b);
		}
		result += "</div>";
		result += "<div id=\"plugins\"></div>";
		result += this.getPagination("read", index, page, read.size !== undefined?read.size:1);
		$(id).html(result);
	}
	
	this.getTags = function getTags(id) {
		var q = 40;
		var rs = Array();
		var result = "";
		var rs = new API().getTags();
		getPreloader("Intializing:"+rs.length+" elements",id);
		for (var i = 0;i<rs.length;i++)
		{
			result += "<div class=\"tagy\">";
			result += "<a style=\"font-size:"+ (q) + "px;\" class=\"tag\" href=\"./?q=read&query=" + utf8_encode (rs[i].query ) + "&value2=19&value1=22\" rel=\"external\">";
			result += utf8_decode ( rs[i].query) + "";
			result += "</a>";
			result += "</div> ";
			if (q > 7)
			q--;
		}
		$(id).html("<div class=\"lbltag\"><hr><h1>"+msg("query tags")+"</h1><hr></div>");
		$(id).append( result);
	}
	
	this.getModalDialog = function getModalDialog()
	{
		return "<div class=\"modal-dialog unvisibleUI\" id=\"eventContent\" title=\"Event Details\" class=\"unvisibleUI\"><a id=\"eventTitleLink\" href=\"\" target=\"_parent\"><h1 id=\"modalTitle\"></h1></a><br><span id=\"startTime\"></span><br><span id=\"endTime\"></span><br><br><p id=\"modalBody\"></p><p><strong><a id=\"eventLink\" href=\"\" target=\"_parent\">Mehr lesen</a></strong></p><br/><p id=\"modalBodyNav\"></p></div>";
	}
	
	this.doCreateMarquee = function doCreateMarquee() {
		var result = "";
	var text = "";
	for (index = 0; index < catindex.length; index++) {
		text = catindex[index];
		result += "&nbsp;" + "<a rel=\"external\" href=\"./list-" + (index + 1)
				+ ".html\">" + text + "</a>" + "";
	}
	result += "<a href=\"contact.html\">webmaster@letztechance.org</a> of";
	result += "<a href=\"http://contact.letztechance.org\">sysop@letztechance.org</a>";
	$("#marquee").append(result);
	}
	
	this.getAlerts = function getAlerts(events)
	{
		var result = "";
		
		getPreloader('<p>Validating response...</p>',"#list-group");
		
		events.sort(function (a, b) { return a.url.localeCompare(b.url); });
		events = events.reverse();
		events.sort(function (a, b) { return a.id.localeCompare(b.id); });
		events = events.reverse();
		
		var i = 0;
		for (var v in events)
		{
			result += "<a href=\""+events[v].url+"\" class=\"list-group-item\" rel=\"external\">\n";
			result += "<h4 class=\"list-group-item-heading text-overflow\">\n";
			result += "<i class=\"fa fa-fw fa-envelope\"></i>"+events[v].title;
			result += "</h4>\n";
			result += "<p class=\"list-group-item-text text-overflow\">"+events[v].title+"</p>\n";
			result += "</a>\n";
			i++;
			if (i >= 10){break;};
		}
		$("#list-group").html(result);
// getLeftCalendar("#list-group");
	}	
	
	this.doPrintEnv = function doPrintEnv(id) {
		getPreloader('Initialising...',id);		
		var result = "";
		result += "Betriebssystem:<br /><b>" + yourOS + "</b><br>";
		result += "Javascript aktiviert: <b> " + javaOK + "</b><br>";
		result += "Cookies annehmbar: <b> " + cookiesOK + "</b><br>";
		result += "Browser Sprache:<b> " + browsLang + "</b><br>";
		result += "Browser Version: <b>" + majorVers + "" + "" + "</b><br>";
		result += "Bildschirmaufl&ouml;sung: <b>" + width + " </b>x<b> " + height+ "</b><br>";
		result += "Farbtiefe: <b>" + colordepth + "</b>";
		getPreloader('Rendering...',id);
		$(id).html(result);
	}
	
	this.doPrintISP = function doPrintISP(id) {
		getPreloader('<p>Initialising...</p>',id);
	var coord = [];
	var data = [];
	$.getJSON(new API().hostName+'webservices/client.php?q=getGeoLocation', function(data) {
		getPreloader('<p>Validating response...</p>',id);
		$(id).html('');
		$(id).append('<br>' + data.countryName);
		$(id).append('<br>' + data.regionName);
		$(id).append('<br>' + data.city);
		$(id).append('<br>' + data.isp);
		$(id).append('<br>' + coord);
		$(id).append('<br>' + data.timezone);		
		});
	}
	
	this.doGetGames = function doGetGames() {	
		var result = "";
	$.getJSON(new API().hostName+"webservices/client.php?q=getGames&value1=24&value2=1",
	function(data) {
		result +="";
	$.each(
				data,
				function() {
					result += getLI(this, 
							"", 
							this,						 
							" target=\"_blank\"",
							"/games/"+this+"/index.html");
			});
	if (!isGamesLoaded){
		$("#games li:last").after(result);
		isGamesLoaded = true;
	}
	});
	}
	
	this.doGetPlugins = function doGetPlugins() {
		var result = "";	
		var i = 1;
		$.getJSON(new API().hostName+"webservices/client.php?q=getListJSON&value1=22&value2=1",
		function(data) {
		result += getLI("All", "#", "", "listmenu ui-shadow ui-btn ui-corner-all","rel=\"external\" onclick=\"jQuery.fancybox.open({href : './list-22-1.html',	type : 'iframe',padding : 5,height:600,width : 800,autoSize: true,changeSpeed : 0});\"");
		for (var v in data.row)
		{
			if (data.row[v].subject !== undefined)
			{
			var name = data.row[v].subject;
			var id = data.row[v].id;
			var url = new API().hostName+"read-22-"+id+".html";
			result += getLI(v+""+name, url, name, "",url);
			}
		}
		if (!isPluginsLoaded){		
			$("#tools li:last").after(result);
			isPluginsLoaded = true;
		}
						});
	}
	
	this.printList = function printList(index, page, rs) {
		var result = "";
		result += this.getPagination("list", index, page, rs.size);
		result += "<table class=\"table\"><thead>";
		for (var v in rs.row)
		{
			result += "<tr>";
			if (rs.row[v].id != undefined || rs.row[v].subject != undefined){
				result 	+= "<th><a href=\""+new API().hostName+""+new API().hostName+"read-"+ index + "-"+rs.row[v].id+".html\" rel=\"external\">"+utf8_decode(rs.row[v].subject)+"</a></th>";
				if (isAuthorized) {
					result 	+= "<th><a href=\"edit-"+ index + "-"+rs.row[v].id+".html\">Edit</a></th>";
				}
			}
			result += "</tr>";
		}
		result += "</thead></table>";
		result += this.getPagination("list", index, page, rs.size);
		result += "";	
		return result;
	}
	
	this.createList = function createList(index, page) {
		var result = "";
		var url = new API().hostName+"webservices/client.php?q=getListJSON&value1=" + index
				+ "&value2=" + page + "";
		var rs = getJSON(url);
		result += "<table class=\"table\"><thead>";
		for ( var v in rs.row) {
			if (rs.row[v].id != undefined || rs.row[v].subject != undefined) {
				result += "<tr>";
				result += "<th data-toggle=\"popover\" data-trigger=\"focus\" title=\""
						+ utf8_decode(unescape(rs.row[v].subject))
						+ "\"><a href=\""+new API().hostName+"read-"
						+ index
						+ "-"
						+ rs.row[v].id
						+ ".html\" rel=\"external\">"
						+ utf8_decode(rs.row[v].subject) + "</a></th>";
				if (isAuthorized) {
					result += "<th data-toggle=\"popover\" data-trigger=\"focus\" title=\""
							+ utf8_decode(unescape(rs.row[v].subject))
							+ "\"><a href=\"edit-"
							+ index
							+ "-"
							+ rs.row[v].id
							+ ".html\">Edit</a></th>";
				}
				result += "</tr>";
			}

		}

		result += "</thead></table>";
		result += this.getPagination("list",index, page);
		return result;
	}
	
	this.printListSearch = function printListSearch(index, page, rs) {
		var result = "";
		result += this.getPagination("list", index, page, rs.size);
		result += "<table class=\"table\"><thead>";
		for (var v in rs.row)
		{
			
			if (rs.row[v].id != undefined || rs.row[v].subject != undefined){
				var read = getRead(index, rs.row[v].id);
				var links = new HTMLParser().getURLsFromString(''+read.body);
				for (var link in links)
				{
					var l = links[link];
					if (!l.includes("openlink") && l.includes("http")){
					result += "<tr>";
					result 	+= "<th><a href=\""+new API().openLink+""+l+"\" rel=\"external\">"+l+"</a></th>";
					result += "</tr>";
					}
				}
			}
			
		}
		result += "</thead></table>";
		result += this.getPagination("list", index, page, rs.size);
		result += "";	
		return result;
	}
	
	this.getPagination = function getPagination(type, index, page, size, query) {
		var start = +page;
		var end = (+page+4);
		var before = (+page-1);
		var next = (+page+1);
		var search = "query="+query;
		var diff = (+size-page);
	// alert(size+' - '+diff);
		if (start <=0 && start >=size && end <=0 && end >=size )
		{
			start = 1;
			end = 5;
		}
		else
		{
			if (start <=0  )
			{
				start = 1;			
			}
			if (start >=size )
			{
				start = size;			
			}
			if (end <=0 )
			{			
				end = 5;
			}
			if ( end >=size )
			{
				end = size;
			}
		}
		type = type == "index" || type == "list" || type == "read" || type == "search" ?type:index;
	    var result = "<center><nav>\n";
	    result += "<ul class=\"pagination\">\n";    
	    result += "<li>\n";    
	    if (type == "search" ){    
	    	result += "<a href=\""+new API().hostName+"?query="+query+"&q=search&value1=" + before+ "&value2="+before+"\" rel=\"external\">\n";    	
	    }
	    else{    
	    	result += "<a href=\""+type+"-"+index+"-"+before+".html\"\" rel=\"external\">\n";    	
	    }
	    result += "<span><i class=\"fa fa-angle-left\"></i></span>\n";
		result += "</a>\n";    
	    if (type == "search" ){
	    	var cnt = page;
	    	for (var i = start; i <= end;i++)
	    	{
	    		result += getLIS(query,  i);
	    		if (i == size)break;
	    	}
	    }
	    else {

	    	for (var i = start; i <= end;i++)
	    	{
	    		result +=getLI(type, index, i, "rel=\"external\"","","#");
	    		if (i == size)break;
	    	}  	
	    }
	    if (next <= size && next > 0){
	    result += "<li>\n";    
	    if (type == "search" ){    
	    	result += "<a href=\""+new API().hostName+"?query="+query+"&q=search&value1=" + next+ "&value2=" + page+ "\" rel=\"external\">\n";
	    }
	    else{    
	    	result += "<a href=\""+new API().hostName+""+type+"-"+index+"-"+next+".html\" rel=\"external\">\n";
	    }    
	    result += "<span><i class=\"fa fa-angle-right\"></i></span>\n";
	    result += "</a>\n";
	    result += "</li>\n";
	    }
	    
	    result += "</ul>\n";
	    result += "</nav></center>";
	// result += "</div>\n";
	    return result;
	}
	
	this.setErrorPage = function setErrorPage(e) {
		printOut("#error", getBoxFluid(e.message + "<br>" + e.stack, true));
		alert(e.name+" - "+e.message+""+e.stack);		
	}

}
jQuery.cachedScript = function( url, options ) {
    options = $.extend( options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });
    return jQuery.ajax( options );
};
(function () {
    $.getScript = function(url, callback, cache)
    {
        $.ajax({
                type: "GET",
                url: url,
                success: callback,
                dataType: "script",
                cache: cache
        });
    };
})();
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
function b64toBlob(b64Data, contentType, sliceSize) {
	  contentType = contentType || '';
	  sliceSize = sliceSize || 512;

	  var byteCharacters = atob(b64Data);
	  var byteArrays = [];

	  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    var slice = byteCharacters.slice(offset, offset + sliceSize);

	    var byteNumbers = new Array(slice.length);
	    for (var i = 0; i < slice.length; i++) {
	      byteNumbers[i] = slice.charCodeAt(i);
	    }

	    var byteArray = new Uint8Array(byteNumbers);

	    byteArrays.push(byteArray);
	  }
	    
	  var blob = new Blob(byteArrays, {type: contentType});
	  return blob;
	}
function doGetUploadFile(id, i) {
	var oJson = {};
	if (id !== undefined){
		var api = new API().hostName+"webservices/client.php?q=getFile&file="+i;
		oJson = getJSON(api,false);
		$(id).html(oJson.db == true?"true":"false");
		$(id).append("<hr>");
		$(id).append(oJson.fileName);
		$(id).append("<hr>");
		$(id).append(oJson.type);
		$(id).append("<hr>");
		$(id).append(oJson.length);
// var blobFile = b64toBlob(oJson.content, oJson.type);
// download(blobFile, oJson.fileName,oJson.type);
		var title = oJson.fileName;
		var target = "./?q=uploadfiles&file="+i+"&name"+oJson.fileName;
// alert(target);
// var text = utf8_decode(atob(oJson.content));
		
		window.location = ""+new API().openLink+""+target;

	}
	else{		
		$(id).append("No Id found. Please try again...");
	}
}
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toUTCString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
function ClipBoard(){
	Copied = $('#ytsrc').val();
	Copied.execCommand("Copy");
}
var matched, browser;
jQuery.uaMatch = function(ua) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec(ua)
		|| /(webkit)[ \/]([\w.]+)/.exec(ua)
		|| /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
		|| /(msie)[\s?]([\w.]+)/.exec(ua)
		|| /(trident)(?:.*? rv:([\w.]+)|)/.exec(ua)
		|| ua.indexOf("compatible") < 0
		&& /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

return {
	browser : match[1] || "",
	version : match[2] || "0"
	};
};
matched = jQuery.uaMatch(navigator.userAgent);
// IE 11+ fix (Trident)
matched.browser = matched.browser == 'trident' ? 'msie' : matched.browser;
browser = {};

if (matched.browser) {
	browser[matched.browser] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if (browser.chrome) {
	browser.webkit = true;
} else if (browser.webkit) {
	browser.safari = true;
}

jQuery.browser = browser;
// log removed - adds an extra dependency
// log(jQuery.browser)
function utf8_encode(s) {
	  return unescape(encodeURIComponent(s));
}
function utf8_decode2(s) {
	  return decodeURIComponent(escape(s));
}
function utf8_decode(s) {
	var result;
	try {
		result = decodeURIComponent(escape(s));
	} catch (e) {
// console.log(e);
	}
	result = (result !== null && result !== undefined && result.length > 0)?result:s;
	return result;
}
function treeView(str) {
	$(str).treeview();
}
function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,'&gt;').replace(/"/g, '&quot;');
}
function googleCustomAPI() {
	  gapi.client.init({
	    'apiKey': 'ABQIAAAAQXTIzdhlW9J36-Fb8ktnfxTF5S45Cxg0OhlO4HEaXNRIxdvytBQlyrGfN_i7ztm4wEufIVQakZSsNg',
	    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
	    'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
	    'scope': 'profile',
	  }).then(function() {
	    return gapi.client.people.people.get({
	      'resourceName': 'people/me',
	      'requestMask.includeField': 'person.names'
	    });
	  }).then(function(response) {
	    console.log(response.result);
	    $("#yt").html(response.result);
	  }, function(reason) {
	    console.log('Error: ' + reason.result.error.message);
	    $("#yt").html('Error: ' + reason.result.error.message);
	  });
}
function collectData(arrayElements) {	
    var main = [];
    if (arrayElements === undefined )return main;
    for (var i = 0; i < arrayElements.length; i++) {
        var data = {};
        this.e = arrayElements[i];            
        data.text = arrayElements[i].text;
        data.val = arrayElements[i].value;
        main[i] = data;
    }
    return main;
}
function getJSON(url,isAsync, dataType) {
	isAsync = (isAsync !== null && isAsync !== undefined && isAsync == true)?true:false;
	var dataType =  (dataType !== null && dataType !== undefined)?dataType:'json';
	var result = [];
	$.ajax({
	  url: url,
	  async: isAsync,
	  dataType: dataType,
	  success: function (json) {
		  result = json;
	  }
	});
	return result;
}
function getHref(title, url, isExternal, attrib, id) {
	url = url != undefined?url:"./";
	id = id != undefined?"id=\""+id+"\"":"";
	attrib = attrib != undefined?attrib:"";
	isExternal = isExternal != undefined?"rel=\"external\"":"";
	return "<a href=\""+url+"\" "+id+" "+attrib+" "+isExternal+">"+title+"</a>";	
}
// upload_records
function doCalcGridWidth() {
	var win = $(window);
	var cwidth = win.width();
	var barrier = 940;	
	if (win.width() >= 1920) {
		cwidth = ((win.width() / 100)*55);
	}
	if (win.width() <= 1920) {
		cwidth = ((win.width() / 100)*55);
	}
	if (win.width() <= 1600) {
		cwidth = ((win.width() / 100)*50);
	}
	if (win.width() <= 1280) {
		cwidth = ((win.width() / 100)*50);
	}
	if (win.width() <= 1024 && win.width() >= 940) {
		cwidth = ((win.width() / 100)*50);
	}
	if (win.width() <= 940) {
		cwidth = ((win.width() / 100)*90);
	}
	if (win.width() <= 760) {
		cwidth = ((win.width() / 100)*80);
	}
	if (win.width() <= 356) {
		cwidth = ((win.width() / 100)*70);
	}
	if (win.width() <= 290) {
		cwidth = ((win.width() / 100)*70);
	}
// $('#out').append('DEBUG!:'+win.width()+'#'+cwidth+"#"+barrier+'<br/>');
	return cwidth;
}

function fitTable(grid) {
	if (grid !== null && grid !== undefined) {
		grid.setGridWidth(doCalcGridWidth());		
	}
}
function coreformatOperations(cellvalue, options, rowObject) {
	var id = 0;
	return "<a href=\"/upload/dl.php?id="+options.rowId+"\" rel=\"external\" target=\"_blank\"><u>"+utf8_decode(cellvalue.trimLeft())+"</u></a>";
}
function getTextArea(text, style)
{
	return "<textarea "+style+">"+text+"</textarea>" ;
}
function getSourceCode() {
	window.location = 'view-source:' + window.location.href;
	return
}
function moddate(){
	update= new Date(document.lastModified);
	document.writeln("<br /><div style=\"text-align:center;\">Diese Seite wurde aktualisiert am:" + update.toLocaleString(update) +".</div><br />");
}
function jumpMenu(targ,selObj,restore){
	  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
	  if (restore) selObj.selectedIndex=0;
}
function jumpMenuAjax(targ,selObj,restore){
	ajax(selObj.options[selObj.selectedIndex].value);
}
function path(){
	var path = "";
	var href = document.location.href;
	var s = href.split("/"); 
	for (var i=2;i<(s.length-1);i++) {
	path+="<A HREF=\""+href.substring(0,href.indexOf(s[i])+s[i].length)+"/\" target=\"_parent\">"+s[i]+"</A> / ";
	}
	i=s.length-1;
	path+="<A HREF=\""+href.substring(0,href.indexOf(s[i])+s[i].length)+"\">"+s[i]+"</A>";
	var url = window.location.protocol + "//" + path;
	return url;
}
function host(){
	var path = "";
	var href = document.location.href;
	var s = href.split("/"); 
	var i=2;
	path+="<A HREF=\""+href.substring(0,href.indexOf(s[i])+s[i].length)+"/\">"+s[i]+"</A>/";
	i=s.length-1;
	var url = window.location.protocol + "//"+path;
	return url;
}
function panel_Header(x, isCollapsed) {
	isCollapsed = typeof isCollapsed !== 'undefined' ? isCollapsed : 'true';
	document.writeln('<!-- Content DIV-->\n');
	document.writeln('<div data-role=\"collapsible\" data-collapsed=\"'+isCollapsed+'\">\n');
	document.writeln('<h3>'+x+'</h3>');
}
function panel_Footer() {
	document.writeln('</div>\n');
}
function panel_Head(x) {
	document.writeln('<!-- Content DIV-->\n');
	document.writeln('<div data-role=\"collapsible\" data-collapsed=\"false\">\n');
	document.writeln('<h3>'+x+'</h3>');

}
function panel_Foot() {
	document.writeln('</div>\n');
}
function createListTable(id, divid, idrec, cssClass) {
	var result = "";
	result += "<div class=\"jspage\">";
	result += getPagingMenu (id, divid + "headpaging" );
	result += "</div>";
	result += "<table id=\""+divid+"\" class=\"positions-table\"><tr><td></td></tr></table>"+
	"<div id=\""+idrec+"\" class=\""+cssClass+" pages\"></div>";
	result += "<div id=\""+divid+"-out\" style=\"display:none;color:#333333;\">"+id+"</div>";
	result += "<div class=\"jspage\">";
	result += getPagingMenu (id, divid +"footpaging" );
	result += "</div>";
	return result;
}
function getPagingMenu(_id, divid) {
	var result = "";
	var pageid = 1;
	result += "<fieldset>";
	result += "<a href=\"listindex.html\" rel=\"external\">Index</a>&nbsp;|&nbsp;";
	result += "<a href=\"list-"+ _id + "-1.html\" rel=\"external\">List</a>";
	result += "<div class=\"indexpaging\">";
	result += "<ul id=\"" + divid + "\" class=\"paging\">";
	result += "<li>" + msg ( "previous" ) + "</li>";
	result += "<li>" + msg ( "page" ) + "&nbsp;#n</li>";
	result += "<li>#n</li>";
	result += "<li>#c</li>";
	result += "<li>" + msg ( "page" ) + "&nbsp;#n</li>";
	result += "<li>" + msg ( "next" ) + "</li>";
	result += "</ul>";
	result += "</div>";
	result += "</fieldset>";
	return result;
}

function getRSSLinks() {
	document
			.writeln("[<a class=\"submenu\" onclick=\"cFCW('./?q=srss&amp;query=http://www.radiobonn.de/inc/rss/lokales.rss',410,700,10,200);return false\" href=\"#\">Radio Bonn/Rhein-Sieg RSS</a>]"
				+ "&nbsp;[<a class=\"submenu\" onclick=\"cFCW('./?q=srss&amp;query=http://www.spiegel.de/schlagzeilen/index.rss',410,2110,10,10);return false\" href=\"#\">Spiegel RSS</a>]"
				+ "&nbsp;[<a class=\"submenu\" onclick=\"cFCW('./?q=srss&amp;query=http://yigg.de/atom/beste-nachrichten',410,700,10,10);return false\" href=\"#\">Yigg RSS</a>][<a class=\"submenu\" onclick=\"cFCW('./?q=srss&amp;query=http://www.heise.de/newsticker/heise.rdf',410,1000,10,10);return false\" href=\"#\">Heise RSS</a>]"
				+ "&nbsp;[<a class=\"submenu\" onclick=\"cFCW('./?q=srss&amp;query=http://rss.golem.de/rss.php?feed=RSS2.0',410,1000,10,10);return false\" href=\"#\">Golem RSS</a>]");
}
function getMenu() {
	jQuery("#treeview").treeview();
var s = "<div id=\"leftmenucontent\">\n";
var t = getTreeView();
s += "" + t + "";
s += "</div>";
jQuery("#lmenucontent").html("" + s);
}
function getDebug(id, text) {
	jQuery(id).html(jQuery(id).html() + text);
}
function getTreeView() {
	this.serverList = SERVERLIST;
	this.serverId = null;
	var s = "<ul class=\"filetree treeview\" id=\"jbrowser\">";
for ( var serverId in this.serverList) {
	s += "<li class=\"closed\"><span class=\"folder\">" + serverId
			+ "</span>";
	s += "<ul>";
	for ( var siteId in this.serverList[serverId]) {
		s += "<li><a href=\"" + serverList[serverId][siteId]
				+ "\"><span class=\"file\">" + siteId + "</span></a></li>";

	}
	s += "</ul></li>";
}
return "" + s + "</ul>";
}
function getGallery(id) {
	jQuery.noConflict();
	// alert(id);
var s = "";
for (i = 1; i < 24; i++) {
	s += "<a href=\"" + ImagePath + i
			+ ".jpg\" rel=\"lightbox\"><img src=\"" + ImagePath + i
			+ ".jpg\" width=\"100\" height=\"100\"></a>";
}
s += "<br />";
for (i = 1; i < 24; i++) {
	s += "[<a href=\"" + ImagePath + i + ".jpg\" rel=\"lightbox\">" + i
			+ "</a>]";
}
}
function toggleDiv(id) {
	if (isOpen == false) {
		// Effect.Appear('registeruser');
	$("#" + id).toggle()
	isOpen = true;
} else {
	// Effect.Fade('registeruser');
	$("#" + id).toggle()
		isOpen = false;
	}
}

function createIFrame(url, id) {
id = id !== null && id !== undefined?id:"timermsg";
ifrm = document.createElement("IFRAME");
ifrm.setAttribute("src", "" + url + "");
ifrm.style.width = "100%";
ifrm.style.height = 480 + "px";
ifrm.style.border = 0 + "";
ifrm.style.frameborder = 0 + "";
return ifrm;
// $(id).html(ifrm);
// $("html, body").delay(2000).animate({scrollTop: $(id).offset().top }, 300);
}
function prepareFrame(url) {
ifrm = document.createElement("IFRAME");
ifrm.setAttribute("src", "" + url + "");
ifrm.style.width = 640 + "px";
ifrm.style.height = 480 + "px";
document.body.appendChild(ifrm);
}
function getColbsedHeader(hptitle) {
	var result = "";
result = "<div data-role=\"panel\" class=\"jqm-navmenu-panel\" data-position=\"left\" data-display=\"overlay\" data-theme=\"a\">\n";
result = "<ul class=\"jqm-list ui-alt-icon ui-nodisc-icon\">\n";
result = "<li data-role=\"collapsible\" data-enhanced=\"true\" data-collapsed-icon=\"carat-d\" data-expanded-icon=\"carat-u\" data-iconpos=\"right\" data-inset=\"false\" class=\"ui-collapsible ui-collapsible-themed-content ui-collapsible-collapsed\">\n";
result = "<h3 class=\"ui-collapsible-heading ui-collapsible-heading-collapsed\">\n";
result = "<a href=\"#\" class=\"ui-collapsible-heading-toggle ui-btn ui-btn-icon-right ui-btn-inherit ui-icon-carat-d\">\n";
result = ""
		+ hptitle
		+ "<span class=\"ui-collapsible-heading-status\">Click to Expand</span>\n";
result = "</a>\n";
result = "</h3>\n";
result = "<div class=\"ui-collapsible-content ui-body-inherit ui-collapsible-content-collapsed\" aria-hidden=\"true\">\n";
result = "<ul>\n";
	return result;
}

function getColbsedFooter() {
	var result = "";
result = "</ul>";
result = "</div>";
result = "</li>";
	return result;
}
function addToULList(url) {
jQuery(document).ready(function() {
$.getJSON("" + url,
function(data) {
var html = "";
var items = [];
html += "<div data-role=\"collapsible\" data-collapsed=\"true\">\n";
html += "<h3 style=\"min-width:90%;width:auto;\"><a style=\"width:auto;\" href=\"#\">RSS</a></h3>";
html += "<li class=\"ui-shadow ui-btn ui-corner-all\" data-filtertext=\">";
html += "<a href=\"#\" onclick=\"cFCW("+new API().hostName+"'sread-28-224.html?RSS%20Feeds',410,640,10,10);\">RSS Links</a>";
html += "</li>";
for (var i = 0; i < data.length; i++) {
	html += "<li class=\"ui-shadow ui-btn ui-corner-all\" data-filtertext=\">";
html += "<a href=\"#\">1"
+ data[i].value
+ "</a>";
html += "</li>";
}
html += "</div>";
$("#rssfeeds").html(html);
});
});
}
function doCreateSearchLinks() {
	var result = "";
result += "<ul id=\"jqm-list\" class=\"jqm-list\" data-filter-placeholder=\"Bitte geben Sie einen Suchbegriff ein...\" data-filter-reveal=\"true\">";
var i = 1;
var text = "";
for (index = 0; index < catindex.length; index++) {
	text = catindex[index];
	result += "<li data-filtertext=\""
			+ text
			+ "\" data-icon=\"home\" class=\"ui-screen-hidden\"><a rel=\"external\" href=\"./list-"
			+ (index + 1) + ".html\">" + text + "</a></li>";
}
result += "</ul>";
$("#jqm-list").append(result);
}
function doCreateSocialMediaLinks(id, url, title) {
	var Text = "<ul class=\"social-buttons cf\">"
		+ "<li>"
		+ "<a href=\"http://twitter.com/share\" class=\"socialite twitter-share\" data-text=\""
		+ title
		+ "\" data-url=\""
		+ url
		+ "\" data-count=\"vertical\" rel=\"nofollow\" target=\"_blank\"><span class=\"vhidden\">Share on Twitter</span></a>"
		+ "</li><li>"
		+ "<a href=\"https://plus.google.com/share?url="
		+ url
		+ "\" class=\"socialite googleplus-one\" data-size=\"tall\" data-href=\""
		+ url
		+ "\" rel=\"nofollow\" target=\"_blank\"><span class=\"vhidden\">Share on Google+</span></a>"
		+ "</li>"
		+ "<li>"
		+ "<a href=\"http://www.facebook.com/sharer.php?u="
		+ url
		+ "&t="
		+ url
		+ "\" class=\"socialite facebook-like\" data-href=\""
		+ title
		+ "\" data-send=\"false\" data-layout=\"box_count\" data-width=\"60\" data-show-faces=\"false\" rel=\"nofollow\" target=\"_blank\"><span class=\"vhidden\">Share on Facebook</span></a> "
		+ "</li>"
		+ "<li>"
		+ "<a href=\"http://www.linkedin.com/shareArticle?mini=true&url="
		+ url
		+ "&title="
		+ title
		+ "\" class=\"socialite linkedin-share\" data-url=\"http://socialitejs.com\" data-counter=\"top\" rel=\"nofollow\" target=\"_blank\"><span class=\"vhidden\">Share on LinkedIn</span></a>"
		+ "</li>"
		+ "<li>"
		+ "<a href=\"http://www.linkedin.com/shareArticle?mini=true&url="
		+ url
		+ "&title="
		+ title
		+ "\" class=\"socialite linkedin-share\" data-url=\"http://socialitejs.com\" data-counter=\"top\" rel=\"nofollow\" target=\"_blank\"><span class=\"vhidden\">Share on LinkedIn</span></a>"
		+ "</li></ul>";
		return Text;
}
function getFormattedDate(dateStr) {
    var date = new Date();
    if (dateStr !== undefined && dateStr !== null){var date = new Date(dateStr);}
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;
    return str;
}
function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  
  // copy the selection
  var succeed;
  try {
  	  succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }
  
  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  return succeed;
}
function doAjaxPage(id, url) {
	$("#" + id).html("Initializing module. Please wait while loading...");
$.ajax({
	url : "" + url,
	success : function(result) {
		$("#" + id).html(result);
		}
	});
}
function printJSONTable(json, url, target) {
	 url = url !== null && url !== undefined?url:"/upload/dl.php?id=";
	 target = (target !== null && target !== undefined)?target:"_parent";
	 var result = "<ul>";
	 for (var i = 0;i< json.length;i++)
	 {
	 result += getLi(json[i]["subject"], url+json[i]["id"], "",
	 "listmenu ui-shadow ui-btn ui-corner-all","rel=\"media-gallery\"",
	 "target=\""+target+"\"");
	 }
	 result += "</ul>";
	 return result;	
}
function getUploads() {
	var divid = "#upload";
	jQuery(document).ready(function() {	
	var result = "";	
	$(divid).html("Initializing module. Please wait while loading...");
	var api = "./webservices/client.php?q=getUploads&value1=24&value2=1";
	var json = getJSON(api,true);
	// upload_records
	getJsonGrid(json, "json", "#upload_records", "#uploadperpage", "1","", api);
	$(divid).html(result);
});
	doCoreNavigation("#upload_records", 1 , false);
	doCoreNavigation("#upload_records", 1 , true);
}
function doCoreNavigation(divid, id , isFoot)
{		  
	  var itemId = divid+"headpaging";
	  isFoot = typeof isFoot !== 'undefined' && isFoot !== 'null' && isFoot == true ?  true : false;
	  if (isFoot)
	  {
		  itemId = divid+"footpaging";
	  }
  $(itemId)
			.easyPaging(
					parseInt(1000),
					{
						onSelect : function(page) {
							jQuery(divid)
									.jqGrid(
											'setGridParam',
							{
								url : "./webservices/client.php?q=getUploads&value1="
										+ page
										+ "",
								datatype : "json",		
							}).trigger(
							"reloadGrid");
			}
	});
}
function getVideoLinks() {
	var result = "";
	var api = "./webservices/media.json";
	var json = getJSON(api,false);
	result += "<ul class=\"mediamenu\"> ";
	for (v in json)
	{
		result += "<li><a data-role=\"button\" rel=\"media-gallery\" class=\"fancybox-media\" href=\""+json[v]+"\" rel=\"\external\">"+v+"</a></li>";
	}
result += "</ul> ";
$("#media_menu").html(result);
}
function getVideoClipOfTheDay(id) {
	$(document).ready(function() {
		$(id).append("Initializing video of the day...");
		$.getJSON(new API().hostName+"webservices/client.php?q=getLastContent&value1=21&value2=1",
				function(data) {
					$(id).html( data[0].body);
		});
	});
}

function doCreateTopMenu() {
	var text = "";
for (index = 0; index < catindex.length; index++) {
	text = catindex[index];
	$("#TopList").append(
			"<li class=\"level2\">" + "<a rel=\"external\" href=\"./list-"
					+ (index + 1) + ".html\">" + text + "</a>" + "</li>");
	}
}
// function doCreateMarquee() {
// var result = "";
// var text = "";
// for (index = 0; index < catindex.length; index++) {
// text = catindex[index];
// result += "&nbsp;" + "<a rel=\"external\" href=\"./list-" + (index + 1)
// + ".html\">" + text + "</a>" + "";
// }
// result += "<a href=\"contact.html\">webmaster@letztechance.org</a> of";
// result += "<a
// href=\"http://contact.letztechance.org\">sysop@letztechance.org</a>";
// $("#marquee").append(result);
// }
// e.g.:'./?q=srss&query=http://rss.bild.de/bild.xml'
function doLoadAjaxPage(id, url) {
	$("#" + id).html("Loading..." + url);
$.ajax({
	url : "" + url,
	success : function(result) {
		$("#" + id).html(result);
		}
	});
}
// EOF Menu
// Plugins
function JQueryAudioPlayer() {
	jQuery(document)
			.ready(
					function() {

						jQuery("#jquery_jplayer_1")
							.jPlayer(
									{
										ready : function() {
											jQuery(this)
													.jPlayer(
															"setMedia",
															{
																mp3 : "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3"
															});
										},
										swfPath : "./plugins/tools/lc2jplayer/js",
										supplied : "mp3",
										wmode : "window"
										});
					});
}
function JQueryVideoPlayer() {
$(document)
		.ready(
				function() {

					$("#jquery_jplayer_1")
.jPlayer(
		{
			ready : function() {
				$(this)
						.jPlayer(
								"setMedia",
{
	m4v : "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
ogv : "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
webmv : "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
poster : "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
					});
},
swfPath : "js",
supplied : "webmv, ogv, m4v",
size : {
	width : "640px",
height : "360px",
cssClass : "jp-video-360p"
						}
					});

});
}
function getNavPanelLeft(divid, subject, body) {
	getPanel_Header("" + divid, decode_utf8(subject), false);
// $("#indexpagingout").append("<h3>"+index+"</h3>");
$("" + divid + "out").append("<h5>" + decode_utf8(subject) + "</h5>");
$("" + divid + "out").append("<h4>" + decodeURIComponent(body) + "</h4>");
getPanel_Footer("" + divid);
}
function getRoute(id) {
	var result = "";	
	result += "<form action=\"./?value2=502&q=read&value1=22\" method=\"get\" rel=\"external\" target=\"_parent\">";
	
	result += "<table>";
	result += "<tr><td>";
	result += "<label>Von&nbsp;:</label>";
	result += "</td><td>";
	result += "<input type=\"text\" width=\"50px;\" name=\"from\" title=\"from\" value=\"GERMANY,Cologne\" role=\"textbox\" autocomplete=\"off\" class=\"ui-autocomplete-input\"/></br>";
	result += "</td></tr>";
	result += "<tr><td>";
	result += "<label>Nach:</label>";
	result += "</td><td>";
	result += "<input	type=\"text\" width=\"50px;\" name=\"to\" title=\"to\" value=\"Berlin\" role=\"textbox\" autocomplete=\"off\" class=\"ui-autocomplete-input\" />";
	result += "</td></tr>";
	result += "</table>";
	
	result += "<input	type=\"hidden\" name=\"q\" value=\"read\" /></br>";
	result += "<input	type=\"hidden\" name=\"value1\" value=\"22\" /></br>";
	result += "<input	type=\"hidden\" name=\"value2\" value=\"502\" /></br>";
	result += "<input	type=\"hidden\" name=\"plugin\" value=\"googleroute\" />";
	result += "<input type=\"submit\"	value=\"Route suchen\" rel=\"external\"/></br>";
	
	result += "</form>";
	$(id).html(result);
}
function getGeoLocation(id)
{
	$(id).html("<iframe src=\"./geolocation.html?l=de_DE\" height=\"250px\" width=\"auto\" frameborder=\"0\" scrolling=\"no\" style=\"border:0px;\"></iframe>");
}
function getLeftCalendar(id)
{
	$.getScript('./assets/js/fullcalendar/moment.min.js', function()
	{
// $(id).append("moment.min.js...");
		$.getScript('fullcalendar.min.js', function()
		{
					$.getScript('./assets/js/fullcalendar/lang/de.js', function()
							{
								$(id).fullCalendar({
							        events: new API().hostName+'webservices/client.php?q=getFullCalendar',
							        selectable : true,
							        header: {
							            left: 'today',
							            center: 'prev title next',
							            right: ''
							        },
							        dayClick: function(date, allDay, jsEvent, view) {
							        	$(this).css('background-color', 'green');
							            if (allDay) {
							           	
							            $(id).fullCalendar('changeView', 'basicDay')
							                .fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());
							            }
							            $(this).css('background-color', 'white');

							        },
							        eventRender:  function(event, element) {
							        	var js = "javascript:showModalDialog('"+event.title+"','"+moment(event.start).format('DD MMM YYYY hh:mm:ss a')+"','"+event.url+"');";
							        	element.attr('href', js);
							        	$('#eventTitleLink').attr("href",event.url);
							        	$('#modalTitle').html(event.title);        	
							       	 	$('#startTime').html(event.start);
							            $('#eventLink').attr('href',event.url);
							       },
							        eventClick:  function(event, jsEvent, view) {        	
							// $('#eventContent').toggleClass("visibleUI");
							        }
							    });
							});
		});
	});
// $("#out").fadeIn(2000, function(){$.loader('close');});
}
function showModalDialog(title,start, url)
{
// $('#modal-body').html("<div id=\"eventContent\" title=\"Event Details\"
// class=\"unvisibleUI\"><a id=\"eventTitleLink\" href=\"\"
// target=\"_parent\"><h1 id=\"modalTitle\"></h1></a><br><span
// id=\"startTime\"></span><br><span id=\"endTime\"></span><br><br><p
// id=\"modalBody\"></p><p><strong><a id=\"eventLink\" href=\"\"
// target=\"_parent\">Mehr lesen</a></strong></p><br/><p
// id=\"modalBodyNav\"></p></div>");
// $('#modal-body').toggleClass("visibleUI");
	
	$('#eventContent').toggleClass("visibleUI");
	 $('#modalTitle').html(utf8_decode(title));
	 $('#eventTitleLink').attr("href",url);
	 $("#startTime").html(start);
	 $("#endTime").html(start.replace("00:00","00:30"));
     $('#eventLink').attr('href',url);
     
     $('#modalBodyNav').html("<input id=\"modalclose\" type=\"button\" value=\""+msg("close")+"\">");
     $( "#modalclose" ).click(function() {
    	 $('#eventContent').toggleClass("visibleUI");
     });
// $("#eventContent").dialog({ modal: true, title: title, width:350,
// height:480})
// $("html, body").delay(2000).animate({scrollTop: $('#modalTitle').offset().top
// }, 2000);
     $("html, body").delay(2000).animate({scrollTop: $('#modalTitle').offset().top }, 2000);
}
function getStartPage() {
	var result = "";
	result += "" + "<ul>" + ""
	+ getLi("Home", "index.html", "", "listmenu ui-shadow ui-btn ui-corner-all")
	+ ""
	+ getLi("Start", "start.html", "", "listmenu ui-shadow ui-btn ui-corner-all")
	+ ""
	+ getLi("RSS Feeds", "#","","listmenu ui-shadow ui-btn	ui-corner-all","onclick=\"cFCW('"+new API().hostName+"sread-28-224.html?RSS%20Feeds',410,1400,10,10);\"") 
	+ "</ul>";
	$("#startpage").html(result);
}
function createDIV(id, cssClass) {
	return "<div id=\"" + id + "\" class=\"" +cssClass+"\"></div>";
}
function createColapsableItem(title, out, IsColapsed)
{
	var result = "";
	result += "<li data-role=\"collapsible\" data-enhanced=\"" + IsColapsed + "\" data-collapsed-icon=\"carat-d\" data-expanded-icon=\"carat-u\" data-iconpos=\"right\" data-inset=\"false\" class=\"ui-collapsible ui-collapsible-themed-content ui-collapsible-collapsed\">\n";
	result += "	<h3 class=\"ui-collapsible-heading ui-collapsible-heading-collapsed\">\n";
	result += "" + title+ "<span class=\"ui-collapsible-heading-status\">"+msg ( "clicktoexpand" )+"</span>\n";
	result += "</a>\n";
	result += "</h3>\n";
	result += out;
	result += "</li>\n";
	return result;
}
function getAccordionHeader(text, content, isOpen) {
	return "<div data-role=\"collapsible\" data-collapsed=\"" +isOpen + "\">" +
	"<h3 style=\"min-width:90%;width:auto;\"><a style=\"width:auto;\" href=\"#\">" + text + "</h3>";
}
function getAccordionFooter() {
	return "</div>";
}

function getNavigationList() {
	// add some elements with animate effect
$(".box").hover(function() {
	$(this).find('span.badge').addClass("animated fadeInLeft");
	$(this).find('.ico').addClass("animated fadeIn");
}, function() {
	$(this).find('span.badge').removeClass("animated fadeInLeft");
	$(this).find('.ico').removeClass("animated fadeIn");
});

(function() {
	var $menu = $('.navigation nav'), optionsList = '<option value="" selected>Go to..</option>';
	$menu
			.find('li')
			.each(
					function() {
						var $this = $(this), $anchor = $this.children('a'), depth = $this
								.parents('ul').length - 1, indent = '';
						if (depth) {
							while (depth > 0) {
								indent += ' - ';
								depth--;
							}

						}
						$(".nav li").parent().addClass("bold");
						optionsList += '<option value="'
								+ $anchor.attr('href') + '">' + indent
								+ ' ' + $anchor.text() + '</option>';
					}).end().after(
					'<select class="selectmenu">' + optionsList
							+ '</select>');
	$('select.selectmenu').on('change', function() {
		window.location = $(this).val();
	});

})();

// Navi hover
$('ul.nav li.dropdown').hover(function() {
	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
}, function() {
	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
	});

}
function getLang(pattern) {
	return($.getUrlVars()[pattern] !== null && $.getUrlVars()[pattern] !== undefined)?$.getUrlVars()[pattern]:"de_DE";
}
function msg(pattern) {
    pattern = pattern !== "NaN" && pattern != "NaN" && pattern != undefined ?pattern:null;
// alert("Debug:"+pattern);
    if (pattern.length == 0)return null;
	var isFound = false;
	var result = "";
	var lang = (lang !== null || lang !== undefined || lang != "undefined")?lang:"de_DE";	
	lang = (lang === undefined || lang === "undefined")?"de_DE":lang;
	lang = getLang("l");
	if (!isLangLoaded)
	{
		isLangLoaded = true;
		msgList = getLang(lang);
	}
	var i = 0;
	for (var k in msgList)
	{	
		if (k == pattern.toString().toLowerCase())
		{
			result = msgList[k];
			break;
		}
		i++;
	}	
	return ""+result !== null && result !== undefined && result.trim() != "" ?result:pattern;
}
function ajaxUrl(divid, url, params) {	
    $.post(url,	params,
    	    function(data, status){
    	    $("#footout").html("<br>Reading:"+url+" done.</br></br>");
    	    $("#footout").append("Status: " + status+"<hr>");
    	    $("#footout").append("Result:<br>");
	        $("#footout").append("" + data);
	        
	        
    	    });
}
function addAjaxLoader() {
	return "<div class=\"loader\"></div>";
}
function addWebserviceFormEvent() {
// $("#footout").css("display", "none");
// createLoader("preloader","Loading webservice data...");
	// ws client !!
	var url = "./webservices/client.php?";
	var turl = "";
	var ids = {};
	var names = {};
	var values = {};
// setLoader("preloader","Initializing...");
	$( "#jssubmit" ).click(function() {
		$("#out").html(addAjaxLoader());
		$("#footout").html(addAjaxLoader());
		turl = url;
		var $inputs = $("form#webClient :input");
		var ids = {};
		var i = 0;
	    $inputs.each(function (index)
	    {
	        ids[$(this).attr('id')] = $(this).attr('id');
	        names[$(this).attr('name')] = $(this).attr('name');
	        var attrib = $(this).attr('name');
// $("#out").append(""+attrib+",</br>");
	        switch(attrib)
	        {
	        	case "q":
	        		values[$(this).attr('value')] = $("form#webClient #q :selected").text();
		        	turl += $(this).attr('name')+"="+$("form#webClient #q :selected").text()+"";
// setLoader("preloader","Adding "+index);
		        	break;
	        	case "user":
// $("#out").append("User:"+attrib+",</br>");
	        		values[attrib] = $(this).val();
		        	turl += attrib+"="+$(this).val()+"";
// setLoader("preloader","Reading user");
		        	break;
	        	case "pass":
	        		values[attrib] = $(this).val();
		        	turl += attrib+"="+$(this).val()+"";
// setLoader("preloader","Reading password");
		        	break;	
	        	case "subject":
	        		values[attrib] = $(this).val();
		        	turl += attrib+"="+$(this).val()+"";
// setLoader("preloader","Reading subject");
		        	break;	
	        	case "body":
	        		values[attrib] = $(this).html();
		        	turl += attrib+"="+$(this).html()+"";
// setLoader("preloader","Reading text");
		        	break;	
	        	case "isDebug":
// values[$(this).attr('value')] = $("form#webClient #q :selected").text();
// turl += $(this).attr('name')+"="+$("form#webClient #q :selected").text()+"";
// setLoader("Adding "+index);
		        	break;	
	        	default:
	        	if (attrib != "isDebug" )
	        	{	
	        		values[$(this).attr('value')] = $(this).attr('value');
	        		turl += $(this).attr('name')+"="+$(this).attr('value')+"";
	        	}
		        break;
	        	
	        }
	        // add
	        if ($inputs.length != i+1)
	        {
	        	turl += 	"&";
	        }
// setLoader("preloader","is Debug mode");
	        if ($(this).attr('name')== "isDebug" )	        	
	        {
	        	var isDebug = $("#isDebug").is(':checked');
	        	turl += 	"&isDebug="+isDebug+"&";
	        }
// setLoader("preloader","Adding done");
	        if ($(this).attr('name')== "isSort" )	        	
	        {
	        	var isSort = $("#isSort").is(':checked');
	        	turl += 	"&isSort="+isSort+"&";
	        }
// setLoader("preloader","Adding done");
	        i++;
// setLoader("preloader","Adding done");
	        $("#out").html("");
	        $("#footout").html("");
	    });
// setLoader("preloader","Rendering Output");
	    ajaxUrl("#out", turl, null);
// $('#footout').fadeIn(1000, function(){$.loader('close');});
	});
	// eof ws client !!
}
function getRouteForm(){
	return "<form action=\"./?value2=7&amp;q=read&amp;value1=22\" method=\"get\" rel=\"external\" target=\"_parent\"><table><tbody><tr><td><label>Von&nbsp;:</label></td><td><input name=\"from\" title=\"from\" value=\"GERMANY,Cologne\" role=\"textbox\" autocomplete=\"off\" class=\"ui-autocomplete-input\" width=\"50px;\" type=\"text\"><br></td></tr><tr><td><label>Nach:</label></td><td><input name=\"to\" title=\"to\" value=\"Berlin\" role=\"textbox\" autocomplete=\"off\" class=\"ui-autocomplete-input\" width=\"50px;\" type=\"text\"></td></tr></tbody></table><input name=\"q\" value=\"read\" type=\"hidden\"><br><input name=\"value1\" value=\"22\" type=\"hidden\"><br><input name=\"value2\" value=\"7\" type=\"hidden\"><br><input name=\"plugin\" value=\"googleroute\" type=\"hidden\"><input value=\"Route suchen\" rel=\"external\" type=\"submit\"><br></form>";
}

function setPage(id, result, isAppend)
{
	isAppend = isAppend !== undefined && isAppend == true?true:false;
	printOut(id,result+ "<div =\"plugin\"></div><div =\"error\"></div><div =\"subfoot\"></div>",isAppend);
}
function printOut(id, result, isAppend) {
	if (!isAppend){
		$(id).html(result);
	}
	else{
		$(id).append(result);
	}
}
function getRead( index, page) {
	var url = "./webservices/client.php?q=getReadJSON&value1="+ index + "&value2=" + page + "";
	var rs = getJSON(url);
	return JSON.parse(JSON.stringify(rs));
}
function addPageElements() {
	$("#footpath").append("<center>"+host()+"</center>");
	$("#footpath").append("<center>"+path()+"</center>");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function getTabs(id, body, content) {
	var result = "<ul id=\""+id+"\" class=\"nav nav-tabs\" role=\"tablist\">";
	result += body;
	result += "</ul>";
	result += "<br>"+getTabsContent(content);
	return result;
}
function getTabsContent(content) {
	var result = "";
	result = content != undefined && content.length>0?content:getReadTabsContent(content);
	return result;
}
function getReadTabsContent(content) {
	var result = "";
	result += "<div id=\"myTabContent\" class=\"tab-content\"> ";
	result += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"home\" aria-labelledby=\"home-tab\"> ";
	result += "<p>Home</p> ";
	result += "</div> ";
	result += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"profile\" aria-labelledby=\"profile-tab\"> ";
	result += "<p>More..</p> ";
	result += "</div> ";	
	result += "</div> ";
	result = content != undefined && content.length>0?content:result;
	return result;
}
function getRouteForm()
{
	return "<form action=\"./?value2=6&amp;q=read&amp;value1=22\" method=\"get\" rel=\"external\" target=\"_parent\"><table><tbody><tr><td><label>Von&nbsp;:</label></td><td><input name=\"from\" title=\"from\" value=\"GERMANY,Cologne\" role=\"textbox\" autocomplete=\"off\" class=\"ui-autocomplete-input\" width=\"50px;\" type=\"text\"><br></td></tr><tr><td><label>Nach:</label></td><td><input name=\"to\" title=\"to\" value=\"Berlin\" role=\"textbox\" autocomplete=\"off\" class=\"ui-autocomplete-input\" width=\"50px;\" type=\"text\"></td></tr></tbody></table><input name=\"q\" value=\"read\" type=\"hidden\"><br><input name=\"value1\" value=\"22\" type=\"hidden\"><br><input name=\"value2\" value=\"6\" type=\"hidden\"><br><input name=\"plugin\" value=\"googleroute\" type=\"hidden\"><input value=\"Route suchen\" rel=\"external\" type=\"submit\"><br></form>";
}
function doGetUrlData(id, url, dataType) {
	dataType = dataType !== undefined?dataType:'text';
	return $.ajax({url: url, dataType: dataType ,success: function(result){
		return result;
    }});
}
function doGetUrlLocalData(id, url) {
	$.ajax({url: url, dataType: 'text' ,success: function(result){
		var path = url.replace("index.html","");
		result = replaceAll(result,"./",path);
        printOut(id, result, false);
    }});
}
function doReadCookieSession(){
	return readCookie("PHPSESSID");
}
function IsAdmin(user) {
	return user !== undefined && user.data !== undefined && user.data.isAdmin == 1 ? true : false;
}
function IsAuthorized(user) {
	var isLoggedIn = user.login == true || user.login == "true"?true:false;
	if (isLoggedIn){
	   if (user !== undefined && user.data !== undefined && user.data.data !== undefined && user.data.data[0] !== undefined && user.data.data[0].name !== undefined){
	   userName = user.data.data[0].name;
	   }	   
	}
	printOut("#conntected",name+" is logged in:<strong>"+isLoggedIn+"</strong>",false);
	return isLoggedIn;	
}
function doLogout(session){	
	var IsErased = false;
	var j =  new API().getLogout(session);
	if (j.status == true)
	{
		if (IsErased){
			eraseCookie("PHPSESSID");
			IsErased = true;
		}
	}
	return IsErased;
}
function doGetQuery(api) {
	var api = api != undefined ?api:"./webservices/client.php?q=getQuery";
	return getJSON(api);	
}
function getPreloaderIMG() {
	return "<center><div id=\"preloader\" class=\"preloader\"></div></center>\n";
}
function getPreloader(type, id, isAppending) {
	var text = "Loading data. Please wait paitently...";
	var preload = getPreloaderIMG();
	isAppending = isAppending !== undefined?isAppending:false;
	if (type == "search")text = "Loading data. Please wait paitently";
	preload += "<h2 style=\"margin-top:0;\">"+text+"</h2> \n";
	preload += "<p>Reading:"+type+"</p>\n";
	preload += "<p id=\"marquee\" class=\"microsoft marquee\">Loading data...</p>\n";
	preload = getBoxFluid(preload);
	printOut(id, preload, isAppending);
}
function breadCrumb(pType, index, page)
{

	var result ="";
	var clsActive = "class=\"active\"";
	try {	
	index = index != undefined ?index:1;
	index = index <= 0 ?0:index;
	page = page != undefined ?page:1;
	pType = pType != undefined ?pType:'home';
	var result = " <div class=\"cm-breadcrumb-container\"> "; 
	result += "<ol class=\"breadcrumb\"> ";
	if (pType == "home" || pType == "start"){
		result += "<li><a href=\"./\" "+clsActive+" rel=\"external\">Home</a></li> ";
	}
	else 
	{
		result += "<li><a href=\"./\" rel=\"external\">Home</a></li> ";
	}
	if (pType == "imprint" || pType == "Imprint"){
		result += "<li><a href=\"imprint.html\" "+clsActive+" rel=\"external\">"+msg("imprint")+"</a></li> ";
	}
	if (pType == "login" || pType == "post"){
		result += "<li><a href=\"post.html\" "+clsActive+" rel=\"external\">Post</a></li> ";
	}
	if (pType == "index" || pType == "list" || pType == "read"){
		result += "<li><a href=\"listindex.html\" rel=\"external\">Index</a></li> ";
	}
	if (pType == "list" || pType == "read"){
		var vName = catindex.list != undefined && catindex.list[index-1] != undefined && catindex.list[index-1].name != undefined ?catindex.list[index-1].name:"N/A";
		result += "<li><a href=\"list-"+(+index)+"-1.html\" rel=\"external\">"+vName+"</a></li> ";
	}
	if (pType == "read"){
		result += "<li><a href=\""+new API().hostName+"read-"+index+"-"+page+".html\" class=\"active\" rel=\"external\">"+page+"</a></li> ";
	} 
	result += "</ol> "; 
	result += "</div> ";
	} catch (e) {
		result = e+"\n"+e.stack;		
	}	
	return result;
}

function getPostBody(body) {
	var result = "<fieldset>";
	result += "<legend>Body</legend>";
	result += "<textarea name=\"body\" id=\"body\" rows=\"10\" style=\"min-width:100%;width:100%;\">"
			+ body + "</textarea>";
	result += "</fieldset>";
	return result;
}
function getBoxFluid(body) {
	var result = "<div class=\"container-fluid cm-container-white\">";    
    result += body;
    result += "</div>";
    return result;
}
function getRow(body) {
	var result = "<div class=\"container-fluid\">\n";
    result += "<div class=\"row cm-fix-height\">\n";    
    result += body;
    result += "</div>\n";
    result += "</div>\n";
    return result;
}
function getBox3(title, body) {
    var result = "<div class=\"col-sm-4\">";
    result += " <div class=\"panel panel-default\">";
    result += "  <div class=\"panel-heading\">"+title+"</div>";
    result += "   <div class=\"panel-body\">";
    result += body;    
    result += "  </div>";
    result += " </div>";
    result += "</div>";
    return result;
}
function getSubject(read, isShortened){
	var text = read != undefined&& read.subject != undefined?read.subject:"No subject.";	
	text = isShortened == true && text.length >60?text.substring(0,60)+"...":text;
	return text;
}
function getLIS(query, page){
	return "<li><a href=\""+new API().hostName+"query="+query+"&q=search&value1=" + page+ "&value2=" + page+ "\" rel=\"external\">" + page+ "</a></li>\n";;
}
function getLI(type, index, page, attrib, url){
	try {
	var targetUrl = type+"-"+index+"-"+page+".html";
	var attrib = attrib != undefined && attrib.length >0 ? " "+attrib:"";
	var url = (url !== undefined && url.length == 1 && url=="#")?url:url.length > 1?url:targetUrl;
	url = (url !== undefined && url.length > 1 )?url:targetUrl;
	var page = url=="#"?type:page;
	} catch (e) {
		printOut('#out','Exception:'+e.stack,true);
	}
	return "<li><a href=\""+url+"\""+attrib+">"+page+"</a></li>\n";
}
function getLiHref(name, url, id, cls, attrib, hrefattrib) {
	{
		hrefattrib = typeof hrefattrib !== 'undefined' ? hrefattrib : '';
		cls = typeof cls !== 'undefined' ? cls : '';
	attrib = typeof attrib !== 'undefined' ? attrib : '';
	return "" + "<li id=\"" + id + "\" class=\"" + cls + "\" " + attrib + ">"
			+ "<a href=\"" + url + "\" rel=\"external\" "+hrefattrib+">" + name + "</a>" + "</li>" + "";
	}
}
function getJSScript(script) {
	$.getScript(script);
}
function getWiki(query) {
	try {
	$.ajax({
		  url: '//de.wikipedia.org/w/api.php',
		  data: {
		    action: 'query',
		    list: 'search',
		    srsearch: query,
		    format: 'json',
		    formatversion: 2
		  },
		  dataType: 'jsonp',
		  success: function (x) {
		    $("#wikicnt").html();   
		    for (var v in x.query.search)
		    {
		    	var title = x.query.search[v].title;
		    	var pageId = x.query.search[v].pageid;
		    	var snippet = x.query.search[v].snippet;
		    	$("#wikicnt").append("<h4>"+title+"</h4>");
		    	
// var href = "<a href=\"#\"
// onclick=\"getWikiLink('"+title+"');\">"+title+"</a>";
		    	var func = "onclick=\"getWikiLink('"+title+"');\"";
		    	var href = getHref(title,"#",true, func);
			    $("#wikicnt").append(href+"<br>");
			    
		    	// var href2 = "<a
				// href=\"./openlink?https://de.wikipedia.org/wiki/"+title+"\">Wikipedia</a>";
		    	var href2 = getHref("Wikipedia",""+new API().openLink+"https://de.wikipedia.org/wiki/"+title);
			    $("#wikicnt").append(href2+"<br>");
			    $("#wikicnt").append(snippet+"<br>");
			    
// $("#wiki").append(JSON.stringify(x)+"<br>");
			    getWikiLink(query);
		    }		    
// $("#wiki").append("<hr>"+JSON.stringify(x.query.search));
		  }
		});
	} catch (e) {
		$("#error").append("<br>"+e.stack);
	}
}
//
function getWikiLink(query) {
	try {
	var xapi = "https://de.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page="+query;
	$("#wikiarticle").html("<h1>Wikipedia:</h1>"+ query+"<hr>");
	$.ajax({url: xapi, dataType: 'json' ,success: function(result){
		if (result !== null && result !== undefined)
		{
			$("#wikiarticle").html("<h1>"+result.parse.title+"</h1><p>"+result.parse.text["*"]+"<p>");
			for (var v in result.parse.langlinks)
			{
// $("#wikicnt").append("<p>"+JSON.stringify(result.parse.langlinks[v].url)+"<p><hr>");
				var url = result.parse.langlinks[v].url;
				$("#wikiarticle").append(getHref(url,url)+"<br>");
			}
		}
		else
		{
			$("#wikiarticle").html("<h1>Wikipedia:</h1>Nothing requested... Please try again...<hr>");
		}
        
    }});
	$("html, body").delay(100).animate({scrollTop: $("#wikiarticle").offset().top }, 300);
	} catch (e) {
		$("#error").append(e.stack);
	}
}
function initYTClient(query) {
// var gapi;
// // Initializes the client with the API key and the Translate API.
// gapi.client.init({
// 'apiKey': 'YOUR_API_KEY',
// 'discoveryDocs':
// ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
// }).then(function() {
// // Executes an API request, and returns a Promise.
// // The method name `language.translations.list` comes from the API discovery.
// return gapi.client.language.translations.list({
// q: query,
// source: 'en',
// target: 'de',
// });
// }).then(function(response) {
// console.log(response.result.data.translations[0].translatedText);
// $("yt").append("<pre>" + response.result.data.translations[0].translatedText
// + "</pre>");
// }, function(reason) {
// console.log('Error: ' + reason.result.error.message);
// });
// };
// // Loads the JavaScript client library and invokes `start` afterwards.
// gapi.load('client', start);
	// Initializes the client with the API key and the Translate API.
    gapi.client.init({
      'apiKey': 'ABQIAAAAQXTIzdhlW9J36-Fb8ktnfxTF5S45Cxg0OhlO4HEaXNRIxdvytBQlyrGfN_i7ztm4wEufIVQakZSsNg',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
    }).then(function() {
      // Executes an API request, and returns a Promise.
      // The method name `language.translations.list` comes from the API
		// discovery.
      return gapi.client.language.translations.list({
        q: 'hello world',
        source: 'en',
        target: 'de',
      });
    }).then(function(response) {
      console.log(response.result.data.translations[0].translatedText);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
// };

  // Loads the JavaScript client library and invokes `start` afterwards.
// gapi.load('client', start);

}
function getYT(query) {
	$.getScript('https://apis.google.com/js/client.js?onload=googleApiClientReady', function() {
		initYTClient(query);
// googleCustomAPI();
		  var request = gapi.client.youtube.search.list({
		    q: query,
		    part: "snippet"
		  });

		  request.execute(function(response) {
		    var str = JSON.stringify(response.result);
		    $("yt").append("<pre>" + str + "</pre>");
		  });

	});
	  
}
function getOpenIMDB(query)
{
	var result = "<form class=\"well form-search\" id=\"search-by-title-form\" onsubmit=\"return false;\"><fieldset><legend>By Title</legend></fieldset><div><label class=\"control-label\" for=\"t\">Title:</label><input type=\"text\" id=\"t\" name=\"t\" class=\"input-small\">&nbsp;&nbsp;<label class=\"control-label\" for=\"y\">Year:</label><input type=\"text\" id=\"y\" name=\"y\" class=\"input-small\" style=\"width: 100px;\">&nbsp;&nbsp;<label class=\"control-label\">Plot:</label><select name=\"plot\" style=\"width: 100px;\"><option value=\"\" selected=\"\">Short</option><option value=\"full\">Full</option></select>&nbsp;&nbsp;<label class=\"control-label\">Response:</label><select name=\"r\" style=\"width: 100px;\"><option value=\"\">JSON</option><option value=\"xml\">XML</option></select>&nbsp;&nbsp;<button id=\"search-by-title-button\" type=\"button\" class=\"btn-sm btn-primary\">Search</button><button id=\"search-by-title-reset\" type=\"reset\" class=\"btn-sm\">Reset</button></div><div class=\"hide\" id=\"search-by-title-request\"><br/><p>Request:</p><pre class=\"alert alert-box\"><a href=\"javascript:;\" target=\"_blank\"></a></pre></div><div id=\"search-by-title-progress\" class=\"hide progress progress-info progress-striped active\"><div class=\"progress-bar\" style=\"width: 100%;\"></div></div><div class=\"hide\" id=\"search-by-title-response\"><p>Response:</p><pre class=\"alert alert-success\" style=\"margin-bottom: 0px; white-space: normal;\"></pre></div></form><hr><form class=\"well form-search\" id=\"search-by-id-form\" onsubmit=\"return false;\"><fieldset><legend>By ID</legend></fieldset><div><label class=\"control-label\" for=\"i\">ID:</label><input type=\"text\" id=\"i\" name=\"i\" class=\"input-small\" placeholder=\"IMDb ID\">&nbsp;&nbsp;<label class=\"control-label\">Plot:</label><select name=\"plot\" style=\"width: 100px;\"><option value=\"\" selected=\"\">Short</option><option value=\"full\">Full</option></select>&nbsp;&nbsp;<label class=\"control-label\">Response:</label><select name=\"r\" style=\"width: 100px;\"><option value=\"\">JSON</option><option value=\"xml\">XML</option></select>&nbsp;&nbsp;<button id=\"search-by-id-button\" type=\"button\" class=\"btn-sm btn-primary\">Search</button><button id=\"search-by-id-reset\" type=\"reset\" class=\"btn-sm\">Reset</button></div><div class=\"hide\" id=\"search-by-id-request\"><br/><p>Request:</p><pre class=\"alert alert-box\"><a href=\"javascript:;\" target=\"_blank\"></a></pre></div><div id=\"search-by-id-progress\" class=\"hide progress progress-info progress-striped active\"><div class=\"progress-bar\" style=\"width: 100%;\"></div></div><div class=\"hide\" id=\"search-by-id-response\"><p>Response:</p><pre class=\"alert alert-success\" style=\"margin-bottom: 0px; white-space: normal;\"></pre></div></form><div id=\"oimdbout\"></div><hr> ";
	return result;
}
$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}
$.extend({
	getUrlVars : function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(
				window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar : function(name) {
		return $.getUrlVars()[name];
	}
});
String.format = function(str, arr) {
    var i = -1;
    function callback(exp, p0, p1, p2, p3, p4) {
        if (exp=='%%') return '%';
        if (arr[++i]===undefined) return undefined;
        exp  = p2 ? parseInt(p2.substr(1)) : undefined;
        var base = p3 ? parseInt(p3.substr(1)) : undefined;
        var val;
        switch (p4) {
            case 's': val = arr[i]; break;
            case 'c': val = arr[i][0]; break;
            case 'f': val = parseFloat(arr[i]).toFixed(exp); break;
            case 'p': val = parseFloat(arr[i]).toPrecision(exp); break;
            case 'e': val = parseFloat(arr[i]).toExponential(exp); break;
            case 'x': val = parseInt(arr[i]).toString(base?base:16); break;
            case 'd': val = parseFloat(parseInt(arr[i], base?base:10).toPrecision(exp)).toFixed(0); break;
        }
        val = typeof(val)=='object' ? JSON.stringify(val) : val.toString(base);
        var sz = parseInt(p1); /* padding size */
        var ch = p1 && p1[0]=='0' ? '0' : ' '; /* isnull? */
        while (val.length<sz) val = p0 !== undefined ? val+ch : ch+val; /* isminus? */
       return val;
    }
    var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
    return str.replace(regex, callback);
}

String.prototype.$ = function() {
    return String.format(this, Array.prototype.slice.call(arguments));
}