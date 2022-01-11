$(function() {
	var result = "";		
	try {	
	getPreloader("imprint", "#out");
	result += getBoxFluid(breadCrumb("Imprint", 1, 1));
	result += getBoxFluid(getImprint());
	setPage("#out", result);
	} catch (e) {
		printOut("#error",getBoxFluid( e + "<br>" + e.stack));
	}
	function getImprint()
	{
		var result = "";
		result += " <form method=\"post\" action=\"./?q=sendmail\" target=\"_parent\"> "; 
		result += " <h2>E-Mail adress:</h2><div class=\"ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset\"> "; 
		result += " <input name=\"from\" size=\"40\" value=\"peter.mustermann@t-online.de\" type=\"text\"></div> "; 
		result += " <h2>E-Mail Antwort an:</h2><div class=\"ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset\"> "; 
		result += " <input name=\"replyto\" size=\"40\" value=\"reply_to@reply_to.net\" type=\"text\"></div> "; 
		result += " <input name=\"recipients\" value=\"webmaster@letztechance.org\" type=\"hidden\"> "; 
		result += " <input name=\"ccaddress\" value=\"webmaster@letztechance.org\" type=\"hidden\"> "; 
		result += " <h2>Subjekt:</h2><div class=\"ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset\"> "; 
		result += " <input name=\"subject\" size=\"40\" type=\"text\"></div><h2>Nachricht:</h2> "; 
		result += " <textarea rows=\"6\" name=\"message\" cols=\"80\" class=\"ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow\" style=\"height: 52px;\"></textarea> "; 
		result += " <br><h2>Key:</h2><div class=\"ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset\"> "; 
		result += " <input name=\"key\" type=\"text\"></div><br><img src=\"./captcha.html\" alt=\"CAPTCHA\"><br> "; 
		result += "  <div class=\"ui-btn ui-input-btn ui-corner-all ui-shadow\">Versenden<input value=\"Versenden\" type=\"submit\"></div>oder  "; 
		result += " <div class=\"ui-btn ui-input-btn ui-corner-all ui-shadow\">Reset<input value=\"Reset\" type=\"reset\"></div></form> ";
		return result;
	}
});
