<!-- begin hiding
//page after preload finishes
	var locationAfterPreload = "./loggedin.html";
	var lengthOfPreloadBar = 600; // Length of preload bar (in pixels)
	var heightOfPreloadBar = 20; // Height of preload bar (in pixels)
	// Put the URLs of images that you want to preload below (as many as you want)
	var yourImages = new Array(
    "./images/preload/gpanel.gif",
	"./images/preload/lpanel.gif",
    "./images/bg.png",
    "./images/t.jpg",
    "./images/t.gif",
	"./images/iframe.jpg",
	"./images/slice.gif"
);

// Do not modify anything beyond this point!
if (document.images) {
	var dots = new Array() 
	dots[0] = new Image(1,1)
	dots[0].src = "/cms/images/preload/lpanel.gif" 
	dots[1] = new Image(1,1)
	dots[1].src = "/cms/images/preload/gpanel.gif" 
	var preImages = new Array(),coverage = Math.floor(lengthOfPreloadBar/yourImages.length),currCount = 0
	var loaded = new Array(),i,covered,timerID
	var leftOverWidth = lengthOfPreloadBar%coverage
}
function loadImages() { 
	for (i = 0; i < yourImages.length; i++) { 
		preImages[i] = new Image()
		preImages[i].src = yourImages[i]
	}
	
//        document.write('<br>Lade Bild:');
        for (i = 0; i < preImages.length; i++) { 
//        document.write('&nbsp, ',yourImages[i],'');

		loaded[i] = false
	}

        checkLoad()
}


function checkLoad() {
	if (currCount == preImages.length) { 
		location.replace(locationAfterPreload)
		return
	}
	for (i = 0; i <= preImages.length; i++) {
		if (loaded[i] == false && preImages[i].complete) {
			loaded[i] = true
			eval("document.img" + currCount + ".src=dots[1].src")
			currCount++
		}
	}
	timerID = setTimeout("checkLoad()",10) 
}
// end hiding -->

