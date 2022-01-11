<!-- begin hiding
if (document.images) {
//document.write('<p><h2>'+locationAfterPreload+'</h2></p>');
//document.write('<p><h2>Preloader v.2.0</h2></p>');
//document.write('Der Preloader wird vorgeladen. Bitte haben Sie noch etwas Geduld...<br />');
//var preloadBar = '';
var preloadBar = '';
for (i = 0; i < yourImages.length-1; i++) {
preloadBar += '<img src="' + dots[0].src + '" width="' + coverage + '" height="' + heightOfPreloadBar + '" name="img' + i + '" align="absmiddle">';
}
preloadBar += '<img src="' + dots[0].src + '" width="' + (leftOverWidth+coverage) + '" height="' + heightOfPreloadBar + '" name="img' + (yourImages.length-1) + '" align="absmiddle">';
document.write(preloadBar);
loadImages();
}
document.write('<p><h4><a href="javascript:window.location=locationAfterPreload">Vorladen &Uuml;berspringen</font></a></h4></p>');
document.write('<p><font class="ds"><a href="javascript:history.go(-1);">Zur&uuml;ck</font></a></p>');
//document.write('<p><h2>EOF Preloader...</h2></p>');
// end hiding -->
