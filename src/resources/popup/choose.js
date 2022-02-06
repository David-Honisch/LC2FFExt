// $('#title').append('blah');;
try {
    var errorCnt = document.getElementById("error");
    var choose = document.getElementById("choose");
    var choices = document.getElementsByClassName("ua-choices");
    // var isParseHTML = document.getElementsByClassName("isParseHTML");
    // choose.innerHTML += "<h1>Loading...</h1>";
    setStorage();

    document.addEventListener("click", (e) => {
        console.log("href=" + e.target.href);
        // choose.innerHTML += "href=" + e.target.href;
        if (!e.target.classList.contains("ua-choice")) {
            return;
        }
        var chosenUa = e.target.textContent;
        var backgroundPage = browser.extension.getBackgroundPage();
        backgroundPage.setUaString(chosenUa);
        console.log("" + chosenUa + " done.");
    });
    // choose.addEventListener("click", (e) => {
    //     console.log("href=" + e.target.href);
    //     console.log("" + chosenUa + " done.");
    // });
    // isParseHTML.checked = getItem("isParseHTML");
    choose.innerHTML += JSON.stringify(getItem('title'));
} catch (error) {
    errorCnt.innerHTML += JSON.stringify(error);
    console.error(error);
    console.error(error.stack);
}