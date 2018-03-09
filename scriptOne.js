/**
 * Created by Xaz on 2/13/2016.
 */

/*
 Author: Chris Kirchner
 Organization: OSU
 Class: CS290 Web Development
 Assignment: Week 6 - Ajax
 Date: 14Feb16
 Purpose: Weather search engine using Open Weather API
 */

//test function for zip code
function isNumber(string){
    for (var i = 0; i<string.length; i++){
        if (string.charAt(i) < '0' || string.charAt(i) > '9'){
            return false;
        }
    }
    return true;
}
/* get weather by city name */
/* i.e. api.openweathermap.org/data/2.5/weather?q=
{city name},{country code} */

/* get weather by zip code */
/* api.openweathermap.org/data/2.5/weather?zip=
{zip code},{country code} */

//weather request with open weather
function getWeather(location){
    var apikey = "f0255f9975d579d1350adf26b6e0f5fb";
    var URL = "http://api.openweathermap.org/data/2.5/weather?";
    URL = URL + (isNumber(location)?"zip=":"q=") + location;
    var req = new XMLHttpRequest();
    req.open('POST', URL + "&APPID=" + apikey, true);
    req.addEventListener('load', function(){
        var weather;
        if(req.status >= 200 && req.status < 400){
            weather = JSON.parse(req.responseText);
        }
        else {
            console.log("Error =)");
        }
        showWeather(weather);
    });
    req.send();
}

//show weather data gotten from Open Weather
function showWeather(weather){
    var weatherView = document.getElementById("weatherView");
    var header = document.createElement("h2");
    header.textContent = "Weather Data";
    weatherView.appendChild(header);
    document.body.appendChild(weatherView);
    var weatherObject = {"Meta": weather};
    printWeatherSet(weatherObject, null, weatherView);
}

//add row in weather data table
function addField(key, value, node){
    //setup rows/cells in table
    var row = document.createElement("tr");
    var field_key = document.createElement("th");
    var field_value = document.createElement("td");

    //add info to row key value pairs
    field_key.textContent = key[0].toUpperCase()+key.slice(1);
    field_value.textContent = value;

    //add rows/cells to body
    row.appendChild(field_key);
    row.appendChild(field_value);
    node.appendChild(row);
}

//add new table group for weather data
function addFieldSet(title, parentNode){
    //setup table inside field set
    var fieldSet = document.createElement("fieldset");
    var legend = document.createElement("legend");
    legend.textContent = title[0].toUpperCase()
        +title.slice(1);
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    //add table inside field set to body
    fieldSet.appendChild(legend);
    fieldSet.appendChild(table);
    table.appendChild(tbody);
    parentNode.appendChild(fieldSet);

    return tbody;
}

//print all weather data using node
function printWeatherSet(weatherSet, innerNode, outerNode){
    for (key in weatherSet){
        if (typeof weatherSet[key] != "object"){
            addField(key, weatherSet[key], innerNode);
        }
    }
    for (key in weatherSet){
        if (Array.isArray(weatherSet[key])){
            weatherSet[key] = weatherSet[key][0];
        }
        if (typeof weatherSet[key] == "object"){
            var fieldSet = addFieldSet(key, outerNode);
            //recurse through other objects
            printWeatherSet(weatherSet[key], fieldSet, outerNode);
        }
    }
}

//get location from form input
function getLocation(){
    var locationInput = document.getElementById("location");
    return locationInput.value;
}

/*
 http://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div
 */

//refresh page for additional searches
function refreshContent(content){
    while (content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }
}

//main function that starts weather search results
function onLocation(){
    var weatherForm = document.getElementById("locationSubmit");
    weatherForm.addEventListener('click', function(event){
        console.log("blah");
        refreshContent(document.getElementById("weatherView"));
        var location = getLocation();
        getWeather(location);
        event.preventDefault();
    });
}

onLocation();