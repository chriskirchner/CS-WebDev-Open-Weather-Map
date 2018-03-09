/**
 * Created by Xaz on 2/14/2016.
 */
/**
 * Created by Xaz on 2/13/2016.
 */

/*
 Author: Chris Kirchner
 Organization: OSU
 Class: CS290 Web Development
 Assignment: Week 6 - Ajax
 Date: 14Feb16
 Purpose: I really have no idea
 */

//get information from HttpBin
function getEcho(data){
    var URL = "https://httpbin.org/post";
    var req = new XMLHttpRequest();
    var payload = {"payload": data};
    req.open('POST', URL, true);
    req.setRequestHeader('content-type', 'application/json');
    req.addEventListener('load', function(){
        var echo;
        if(req.status >= 200 && req.status < 400){
            echo = req.responseText;
            console.log(echo);
        }
        else {
            console.log("Error =)");
        }
        console.log(echo);
        echo = JSON.parse(echo);
        showEcho(echo);
    });
    req.send(JSON.stringify(data));
}

//show data gotten from HttpBin
function showEcho(echo){
    var echoView = document.getElementById("echoView");
    var header = document.createElement("h2");
    header.textContent = "Echo";
    //echoView.appendChild(header);
    document.body.appendChild(echoView);
    var echoObject = {"Meta": echo};
    printEchoSet(echoObject, null, echoView);
}

//add row to data table
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

//add table group for data results
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

//print entire data set from HttpBin
function printEchoSet(echoSet, innerNode, outerNode){
    for (key in echoSet){
        if (typeof echoSet[key] != "object"){
            addField(key, echoSet[key], innerNode);
        }
    }
    for (key in echoSet){
        if (Array.isArray(echoSet[key])){
            echoSet[key] = echoSet[key][0];
        }
        if (typeof echoSet[key] == "object"){
            var fieldSet = addFieldSet(key, outerNode);
            //recurse through other objects
            printEchoSet(echoSet[key], fieldSet, outerNode);
        }
    }
}


/*
 http://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div
 */

//refresh contents for additional entries
function refreshContent(content){
    while (content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }
}

//get data from form
function getData(){
    var dataInput = document.getElementById("data");
    return dataInput.value;
}

//main function for getting data
function onData(){
    var dataForm = document.getElementById("dataSubmit");
    dataForm.addEventListener('click', function(event){
        refreshContent(document.getElementById("echoView"));
        var data = getData();
        getEcho(data);
        event.preventDefault();
    });
}

onData();