function Upload() {
	this.getTabHeader = function getTabHeader() {
		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#article\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg("upload") + "</a></li>";
		if (isAuthorized) {
			tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#upload\" role=\"tab\" id=\"upload-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
					+ msg("upload") + "</a></li>";
			tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#uploadedfilestab\" role=\"tab\" id=\"uploadedfiles-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
					+ msg("uploadedfiles") + "</a></li>";

			tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"more-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
					+ msg("more") + "</a></li>";
		}
		return tabHeader;
	}
	this.getTabContent = function getTabContent(isAuthorized, value1, value2) {
		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"article\" aria-labelledby=\"home-tab\"> ";
		if (isAuthorized) {
			tabContent += "<h1>LoggedIn</h1>";
			var usr = $.getUrlVars()["user"];
			var pwd = $.getUrlVars()["pass"];
			var auth = doGetAuth(usr, pwd);
			user = doIsAuth(token);
			tabContent += getPostForm(isAuthorized, value1, value2);

		} else {
			tabContent += "<div id=\"download\"></div>";
			tabContent += "<div id=\"articlecnt\">Loading...</div>";

		}
		tabContent += "</div> ";

		if (isAuthorized) {
			tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"upload\" aria-labelledby=\"profile-tab\"> ";
			// tabContent += "<p>More..</p> ";
			tabContent += this.getUploadForm();
			tabContent += "<div id=\"uploadedfiles\"></div> ";
			tabContent += "</div> ";

			tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"uploadedfilestab\" aria-labelledby=\"profile-tab\"> ";
			tabContent += "<div id=\"uploadedfilescnt\">Loading files. Please wait</div> ";
			tabContent += "</div> ";

			tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\"> ";
			tabContent += "<div id=\"morecnt\">More..</div> ";
			tabContent += "</div> ";
		}
		return tabContent;
	}

	this.getUploadForm = function getUploadForm() {
		return "<fieldset><form method=\"post\" action=\"upload.php\" enctype=\"multipart/form-data\"><table width=\"350\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" class=\"box\"><tr><td width=\"246\"><input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"10000000000\"><input name=\"userfile\" type=\"file\" id=\"userfile\"></td><td width=\"80\"><input name=\"upload\" type=\"submit\"class=\"box\" id=\"upload\" value=\" Upload\"></td></tr></table></form></fieldset>"
				+ this.getUploadDiv();
	}
	this.getUploadDiv = function getUploadDiv() {
		return "<div id=\"mulitplefileuploader\">Upload</div>";
	}

	this.initPostForm = function initPostForm(e, data) {
		var value1 = $("#value1").val();
		var dtValue = $("#cdate").val();
		var udate = (new Date(dtValue).getTime() / 1000);
		var cdate = getFormattedDate($("#cdate").val());

		var subject = $("#subject").val();
		var body = utf8_encode($("#body").val());
		// alert(body);
		// $(".note-editable").html(utf8_encode($("#body").html());
		// note-editable
		var url = "./webservices/client.php?q=doInsert&token=" + token
				+ "&value1=" + value1 + "cdate=" + cdate + "&subject="
				+ subject + "&body=" + body + "";
		var ser = $("#insertForm").serialize();
		var oSer = {
			"ser" : JSON.parse(JSON.stringify(ser))
		};
		oSer.udate = "" + oSer.cdate;
		oSer.cdate = "" + udate;
		oSer.title = "--!!--";
		alert(JSON.stringify(oSer));
		$.ajax({
			type : "POST",
			url : url,
			data : ser, // serializes the form's elements.
			success : function(data) {
				$('#msg').html(JSON.stringify(data));
				$('#msg').append(url);
			}
		});

		e.preventDefault(); // avoid to execute the actual submit of the form.
	}

this.loadUploadTab = function loadUploadTab(id) {
	$.ajax({
		url : "./webservices/client.php?q=getUploads&value1=1&value2=1",
		cache : false
			})
	.done(
			function(oJson) {
				$(id).html("");
	oJson = JSON.parse(oJson);
	for ( var o in oJson) {
		var title = oJson[o].subject;		
		var hr = "doGetUploadFile('#download','"+oJson[o].id+"',title)";
		$(id).append(""+ oJson[o].id+ "-<a href=\"#\" onclick=\""+ hr + "\">"+ title	+ "</a><br>");
		}
	});
	}

	this.addEvents = function addEvents() {		
		var that = this;
		
		
		$('#btnSubmit').on('click', function(e) { // use on if jQuery 1.7+
			e.preventDefault(); // prevent form from submitting
			var data = $("#insertForm :input").serializeArray();
			that.initPostForm(e, data);
			return false;
		});		

		$("#upload-tab").on("click", function() {
			$.getScript('./assets/js/plugins/dl/download2.js', function() {				
			that.loadUploadTab("#uploadedfiles");			
			});
		});
		$("#uploadedfiles-tab").on("click",	function() {
			$("#uploadedfilescnt").append('.');
		});
		$.getScript('./assets/js/summernote.min.js', function() {
			$("head").append("<link>");
			var css = $("head").children(":last");
			css.attr({
				rel : "stylesheet",
				type : "text/css",
				href : "assets/css/summernote.css"
			});

			$('#body2').summernote(
					{
						// height : ($(window).height() - 440),
						height : 400,
						width : 480,
						toolbar : [
								[ 'style', [ 'style' ] ],
								[
										'font',
										[ 'bold', 'italic', 'underline',
												'clear' ] ],
								[ 'color', [ 'color' ] ],
								[ 'id', [ 'bodycnt' ] ],
								[ 'para', [ 'ul', 'ol', 'paragraph' ] ],
								[ 'height', [ 'height' ] ],
								[ 'table', [ 'table' ] ],
								[ 'insert', [ 'link', 'picture', 'hr' ] ],
								[ 'view', [ 'fullscreen', 'codeview' ] ] ]

					});
		});

		$(document)
				.ready(
						function() {
//							try {
//								$
//										.getScript(
//												'./assets/js/jquery.uploadfile/jquery.uploadfile.min.js',
//												function() {
//													$("head").append("<link>");
//													var css = $("head")
//															.children(":last");
//													css
//															.attr({
//																rel : "stylesheet",
//																type : "text/css",
//																href : "./assets/css/uploadfile.css"
//															});
//													var settings = {
//														url : "_upload.php",
//														dragDrop : true,
//														fileName : "myfile",
//														allowedTypes : "jar,jpg,png,gif,doc,pdf,zip,mp3,nfo,sql,txt,cmd,com,bat,exe,dll,ct,js",
//														maxFileSize : 10000000000 * 1024,
//														returnType : "json",
//														onSuccess : function(
//																files, data,
//																xhr) {
//															// alert((data));
//														},
//														showDelete : true,
//														deleteCallback : function(
//																data, pd) {
//															for (var i = 0; i < data.length; i++) {
//																$
//																		.post(
//																				"delete.php",
//																				{
//																					op : "delete",
//																					name : data[i]
//																				},
//																				function(
//																						resp,
//																						text,
//																						jqXHR) {
//																					// Show
//																					// Message
//																					$(
//																							"#")
//																							.append(
//																									"<div>File Deleted</div>");
//																				});
//															}
//															pd.bar.hide(); // You
//															// choice
//															// to
//															// hide/not.
//
//														}
//													}
//													var uploadObj = $(
//															"#mulitplefileuploader")
//															.uploadFile(
//																	settings);
//												});
//							} catch (e) {
//								setPage("#error", getBoxFluid(e + "<hr>"
//										+ e.stack));
//							}
							$("#uploadedfilestab").click(function(event) {
								alert('Click');

							});

						});
	}
	
	

}

$(function() {
	var result = "";
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var index = value1 !== null && value1 !== undefined && value1 !== null
			&& Number.isInteger(value1) ? value1 : 1;
	var page = value2 !== null && value2 !== undefined && value2 !== null
			&& Number.isInteger(value2) ? value2 : 1;

	var upload = new Upload();

	getPreloader("login", "#out");
	//
	var title = breadCrumb("Upload", index, page);
	setPage("#out", title);
	var tabHeader = upload.getTabHeader();
	var tabContent = upload.getTabContent(isAuthorized, value1, value2);
	result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
	setPage("#out", result);
	setPage("#plugins", "",false);
	setPage("#error", "",false);
	// register events
	upload.addEvents();
	upload.loadUploadTab("#articlecnt");	
});