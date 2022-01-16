'use strict'
console.log('WebAPI loaded...');
$('#error').append('WebAPI loaded....')

function WebAPI() {
    $('#error').append('WebAPI running....')


    this.API = {
        indexAPI: "https://www.letztechance.org/webservices/client.php?q=getFullIndexJSON&value1=0&l=",
        gamesAPI: "https://www.letztechance.org/webservices/client.php?q=getGames",
        toolsAPI: "https://www.letztechance.org/webservices/client.php?q=getListJSON&value1=22&l=",
        envAPI: "https://www.letztechance.org/webservices/client.php?q=getLog&query=",
        ispAPI: "https://www.letztechance.org/webservices/client.php?q=getGeoLocation&value1={}&value2=de"
    };



    this._get = function _get(url, id, isAppend, isFilter, pattern) {

        $.get(url, function(data) {
            data = isFilter ? $(data).find(pattern) : data; //use .filter() instead.
            if (isAppend) {
                $(id).append(data);
            } else {
                $(id).html(data);
            }
        });
    }
    this.getPageAsync = async function getPageAsync(api) {
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

    this._getIndex = function _getIndex(url, id) {
        var result = "";
        console.log(url);
        // $('#error').append('Reading:' + url)
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

    this._getGames = function _getGames(url, id) {
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

    this._getTools = function _getTools(url, id) {
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

    this._getEnv = function _getEnv(url, id) {
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

    this._getISP = function _getISP(url, id) {
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
}