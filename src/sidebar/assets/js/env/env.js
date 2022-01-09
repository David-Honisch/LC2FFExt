var browserName = navigator.appName;
var browserVersion = navigator.appVersion;
var browserVersionNum = parseFloat(browserVersion);
var agt = navigator.userAgent;
var yourOS = navigator.platform;
var availheight = "unknown";
var availwidth = "unknown";
var bufferdepth = "unknown";
var colordepth = "unknown";
var height = "unknown";
var width = "unknown";
var javaOK = "unknown";
var cookiesOK = "unknown";
var majorVers = "unknown";
var minorVers = "unknown";
var cpu = "unknown";
var browsLang = "unknown";
if (agt != null && agt != undefined) {
	//
	if ((agt.indexOf("Win16") != -1) || (agt.indexOf("Windows 3.1") != -1)) {
		yourOS = 'Windows 3.<i>x</i>';
	}
	if ((agt.indexOf("Win95") != -1) || (agt.indexOf("Windows 95") != -1)) {
		yourOS = 'Windows 95';
	}
	if ((agt.indexOf("Win98") != -1) || (agt.indexOf("Windows 98") != -1)) {
		yourOS = 'Windows 98';
	}
	if ((agt.indexOf("Win 9x 4.90") != -1)
			|| (agt.indexOf("Windows 9x 4.90") != -1)) {
		yourOS = 'Windows ME';
	}
	if ((agt.indexOf("WinNT 5.0") != -1)
			|| (agt.indexOf("Windows NT 5.0") != -1)) {
		yourOS = 'Windows 2000';
	}
	if ((agt.indexOf("WinNT 5.1") != -1)
			|| (agt.indexOf("Windows NT 5.1") != -1)) {
		yourOS = 'Windows XP';
	}
	if ((agt.indexOf("WinNT 5.2") != -1)
			|| (agt.indexOf("Windows NT 5.2") != -1)) {
		yourOS = 'Windows Server 2003';
	}
	if ((agt.indexOf("Windows NT 6.0") != -1)
			|| (agt.indexOf("Windows Vista") != -1)) {
		yourOS = 'Windows Vista';
	}
	if ((agt.indexOf("Windows NT 6.1") != -1)
			|| (agt.indexOf("Windows 7") != -1)) {
		yourOS = 'Windows 7';
	}
	if ((agt.indexOf("Windows NT 8.0") != -1)
			|| (agt.indexOf("Windows 8") != -1)) {
		yourOS = 'Windows 8';
	}
	if ((agt.indexOf("Windows NT 8.1") != -1)
			|| (agt.indexOf("Windows 8.1") != -1)) {
		yourOS = 'Windows 8.1';
	}
	if ((agt.indexOf("Windows NT 10.0") != -1)
			|| (agt.indexOf("Windows 10.0") != -1)) {
		yourOS = 'Windows 10';
	}
	if (agt.indexOf("Macintosh") != -1) {
		if (agt.indexOf("PC)") != -1) {
			yourOS = 'Mac PPC';
		} else {
			yourOS = 'Mac 68K';
		}
	}
	if (agt.indexOf("SunOS") != -1) {
		yourOS = 'Unix Sun';
	}
	if (agt.indexOf("IRIX") != -1) {
		yourOS = 'Unix SGI';
	}
	if (agt.indexOf("HP-UX") != -1) {
		yourOS = 'Unix HP';
	}
	if (agt.indexOf("AIX") != -1) {
		yourOS = 'Unix IBM';
	}
	if (agt.indexOf("Android") != -1) {
		yourOS = 'Android';
	}
}
// // -- Assign initial values for browser settings to global variables.

//
// -- If browser is version 4 or better we can take a deeper look.
if (browserVersionNum >= 4) {
	var availheight = screen.availHeight;
	var availwidth = screen.availWidth;
	var colordepth = screen.colorDepth + " bit";
	var height = screen.height;
	var width = screen.width;
	// document.write(navigator.javaEnabled());
	if (navigator.javaEnabled() == true) {
		javaOK = "Yes";
	} else {
		javaOK = "No";
	}
	// -- cookieEnabled only works in MSIE.
	if (browserName == "Microsoft Internet Explorer") {
		if (navigator.cookieEnabled == true) {
			cookiesOK = "Yes";
		} else {
			cookiesOK = "No";
		}
	}
	// -- These all end up as unknowns in Navigator 4.05.
	var majorVers = navigator.appVersion;
	// var minorVers = navigator.appMinorVersion;
	var cpu = navigator.cpuClass;
	browsLang = typeof navigator.browserLanguage !== 'undefined' ? navigator.browserLanguage
			: navigator.language;
	// document.write('Language'+browsLang);
	if (browsLang != undefined && browsLang != null) {
		if (browsLang.indexOf("en") > -1) {
			browsLang = "english";
		} else if (browsLang.indexOf("de") > -1) {
			browsLang = "Deutsch";
		} else if (browsLang.indexOf("us") > -1) {
			browsLang = "U.S.";
		} else if (browsLang.indexOf("fr") > -1) {
			browsLang = "France";
		} else if (browsLang.indexOf("pl") > -1) {
			browsLang = "Poland";
		} else if (browsLang.indexOf("ru") > -1) {
			browsLang = "Rucia";
		}

	}
}