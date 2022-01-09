// ../js/jsl.js
function doLoadPage(id,page) {
var handle = document.getElementById(id);
if (handle!=null) handle.src=page;
}
function jslIsString(id) {
if (document.getElementById(id).value.match("[a-zA-Z0-9_]+")!=null) return true;
return false;
}
function jslDoEliminateBlanks(text) {
var newText = text;
while ( newText.indexOf( " ") != (-1)) {
newText = newText.replace(/ /,"");
}
return newText;
}
function jslGetName (id) {
var h = document.getElementById(id);
if (h != null) return h.name;
return "";
}
function jslSetName(id, wert) {
var h1 = document.getElementById(id);
if (h1 != null) h1.name=wert;
}
function jslCopyValue(id_to, id_from) {
if (navigator.appName=='Microsoft Pocket Internet Explorer') {
eval('document.uiPostForm.'+id_to+'.value = document.uiViewForm.'+id_from+'.value');
} else {
var h1 = document.getElementById(id_to);
var h2 = document.getElementById(id_from);
if (h1 != null && h2 != null) h1.value=h2.value;
}
}
function jslGetChecked (id) {
if (navigator.appName=='Microsoft Pocket Internet Explorer') {
return eval('document.uiViewForm.'+id+'.checked');
} else {
var h = document.getElementById(id);
if (h != null) return h.checked;
}
return false;
}
function jslSetChecked (id, wert) {
if (navigator.appName=='Microsoft Pocket Internet Explorer') {
eval('document.uiViewForm.'+id+'.checked = '+wert);
} else {
var h1 = document.getElementById(id);
if (h1 != null) h1.checked = wert;
}
}
function jslSetCheckValue (to, from) {
var h1 = document.getElementById(to);
var h2 = document.getElementById(from);
if (h1 == null || h2 == null) {
return;
}
if (h2.checked) {
h1.value = "1";
} else {
h1.value = "0";
}
}
function jslGetCheckValue (to, from) {
var h1 = document.getElementById(to);
var h2 = document.getElementById(from);
if (h1 == null || h2 == null) {
return;
}
h1.checked = (h2.value != "0");
}
function jslGrayLabels(elem,color) {
var p = elem.parentNode;
if (p) p = p.parentNode;
p = p || document;
if (p) {
var labels = p.getElementsByTagName('label');
for (var i = 0, len = labels.length; i < len; i++) {
if (labels[i].htmlFor == elem.id) {
labels[i].style.color = color;
}
}
}
}
function jslDisable(id) {
var h1 = document.getElementById(id);
if (h1 != null)
{
h1.disabled=true;
jslGrayLabels(h1,"#999999");
}
}
function jslEnable(id) {
if (navigator.appName=='Microsoft Pocket Internet Explorer') {
eval('document.uiPostForm.'+id+'.disabled=false');
} else {
var h1 = document.getElementById(id);
if (h1 != null)
{
h1.disabled=false;
jslGrayLabels(h1,"#000000");
}
}
}
function jslSetEnabled (id, wert) {
var h1 = document.getElementById(id);
if (h1 != null)
{
h1.disabled = !wert;
var color="#000000";
if (h1.disabled==true)
color="#999999";
jslGrayLabels(h1,color);
}
}
function jslIsVisible(id) {
var h1 = document.getElementById(id);
if (h1 != null) {
return (h1.style.display!="none");
}
return false;
}
function jslDisplay(id, toDisplay) {
var h1 = document.getElementById(id);
if (h1 != null) {
if ( toDisplay) h1.style.display="";
else h1.style.display="none";
}
}
function jslSetClass(id, wert) {
var h1 = document.getElementById(id);
if (h1 != null) h1.className=wert;
}
function jslGoToEx(Menu, Page, Titel) {
jslGoTo(Menu,Page);
}
function jslFormSubmitEx (Menu, Page, Errorpage) {
jslSubmitFormEx(Menu, Page, Errorpage);
}
function jslSubmitFormEx (Menu, Page, Errorpage) {
if ((Menu!=null) && (Menu!="")) jslSetValue("uiPostMenu", Menu);
if ((Page!=null) && (Page!="")) {
jslSetValue("uiPostPageName", Page);
jslSetValue("uiPostErrorPageName", Page);
}
if ((Errorpage!=null) && (Errorpage!="")) {
jslSetValue("uiPostErrorPageName", Errorpage);
}
jslFormSubmit("uiPostForm");
}
function UpdateDateTime() {
var date = new Date();
jslSetValue("uiPostDateTime", Math.floor(date.getTime()/1000) + "," + date.getTimezoneOffset());
}
function jslSetSpanText(id, text) {
var elem = document.getElementById(id);
if (elem != null) elem.childNodes[0].nodeValue = text;
}
function SetSpanText(id, text) {
var elem = document.getElementById(id);
if (elem != null) elem.childNodes[0].nodeValue = text;
}
function PasswortToHex(pwValue) {
var hexString = "";
for (var i = 0; i < pwValue.length; i += 1) {
var asciiValue = pwValue.charCodeAt(i);
hexString += "%"+asciiValue.toString(16);
}
return hexString;
}
function jslSetSelection (id, text) {
var box = document.getElementById(id);
if (box == null) {
return;
}
var disabled = box.disabled; // wg. Opera box enablen
box.disabled = false;
var i=0;
var n = -1;
for (i=0; i<box.length; i++) {
if (box.options[i].value == text) n = i;
}
if (n != -1) {
for (i=0; i<box.length; i++) {
box.options[i].selected = (n == i);
}
}
box.disabled = disabled;
}
function jslAddOption (id, val, text, sel, check_double_val) {
if (navigator.appName == 'Microsoft Pocket Internet Explorer') {
var entry = new Option(text, val, false, sel);
var element = eval('document.uiViewForm.'+id);
if (element == null) return;
element.add(entry);
} else {
var element = document.getElementById(id);
if(element!=null) jslAddOption_pos (id, val, text, sel, element.length, check_double_val);
}
}
function jslAddOption_pos (id, val, text, sel, pos, check_double_val) {
// var entry = new Option(convertHTML2Text(text), val, false, sel);
var entry = new Option(text, val, false, sel);
var element = document.getElementById(id);
if (element == null) return;
if(check_double_val == true){
for (var i=0; i<element.length; i++){
if (element.options[i].value == val) return; // Wert schon vorhanden
}
}
element.options[pos] = entry;
}
function PasswortToXCode (pwValue) {
var hexString = "";
for (var i = 0; i < pwValue.length; i += 1) {
var asciiValue = pwValue.charCodeAt(i);
hexString += asciiValue.toString(16);
}
return hexString;
}
function XCodeToPasswort (hexValue) {
var str = "";
for (var i = 0; i < hexValue.length; i += 2) {
str += String.fromCharCode(parseInt(hexValue.substr(i, 2),16));
}
return str;
}
function jslIsValidPath (path) {
if ((navigator.platform == "Win32") && (navigator.appName == "Microsoft Internet Explorer") && (navigator.appVersion.indexOf("MSIE 6.") >= 0)) {
if (path.indexOf("\\") == 0) return true;
if (path.indexOf(":") == 1) return true;
return false;
}
return true;
}
function jslPrintf1 (str , p1) {
var exp = new RegExp("%1(%[a-zA-Z]+%)?","g");
return str.replace(exp, p1);
}
function jslPrintf (str) {
var i,exp;
for (i=1; i<arguments.length; ++i)
{
exp = new RegExp("%"+i+"(%[a-zA-Z]+%)?","g");
str = str.replace(exp, arguments[i]);
}
return str;
}
function jslGetCountAString(TextArray ,n){
return jslGetCountString(TextArray[0],TextArray[1],TextArray[2],n);
}
function jslGetCountString(Text0,Text1,Text2 ,n){
var ncase=n;
if(ncase>2)
ncase=2;
if(ncase<0)
ncase=2;
switch(ncase){
case 0: return jslPrintf(Text0,n);
case 1: return jslPrintf(Text1,n);
case 2: return jslPrintf(Text2,n);
default: return jslPrintf(Text2,n);
}
}
function alert1 (str, p1) {
alert(jslPrintf1(str, p1));
}
function uiSelect(id) {
var h = document.getElementById(id);
if (h != null) h.select();
}
function uiFocus(id) {
var h = document.getElementById(id);
if (h != null) {
h.focus(); h.select();
}
}
function jslChangeImage ( imageName, newSource, newTitle) {
var image = document.images[imageName];
if ( image == null) {
return;
}
image.src = newSource;
image.title = newTitle;
}
function jslZebrastreifen (id) {
var even = false;
var evenColor = arguments[1] ? arguments[1] : "#FFFFFF";
var oddColor = arguments[2] ? arguments[2] : "#EEEEEE";
var table = document.getElementById(id);
if (! table) {
return;
}
var tbodies = table.getElementsByTagName("tbody");
for (var h = 0; h < tbodies.length; h++) {
var trs = tbodies[h].getElementsByTagName("tr");
for (var i = 0; i < trs.length; i++) {
if (trs[i].style.display!="none" && !trs[i].style.backgroundColor) {
var ths = trs[i].getElementsByTagName("th");
for (var j = 0; j < ths.length; j++) {
var myth = ths[j];
if (!myth.style.backgroundColor) {
myth.style.backgroundColor = even ? evenColor : oddColor;
}
}
var tds = trs[i].getElementsByTagName("td");
for (var j = 0; j < tds.length; j++) {
var mytd = tds[j];
if (!mytd.style.backgroundColor) {
mytd.style.backgroundColor = even ? evenColor : oddColor;
}
}
even = !even;
}
}
}
}
function convertHTML2Text(str) {
if (str) {
str = str.replace(/</g,"&lt;");
str = str.replace(/>/g,"&gt;");
var tst = document.createElement('div');
tst.innerHTML = str;
str = tst.innerText || tst.textContent;
}
return str;
}
function jslSetColor(id, NewColor, FontStrength) {
var h1 = document.getElementById(id);
if (h1 != null){
h1.style.color=NewColor;
h1.style.fontWeight=FontStrength;
}
}
function jslEatWhitespace(instring){
if(!instring)
return instring;
returnstr = instring.replace(/[\s,\xa0]+/g, "");
return returnstr;
}
