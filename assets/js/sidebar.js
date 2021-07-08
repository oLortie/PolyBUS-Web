const RespirationSelect = {
    respi025 : 0,
    respi05  : 1, 
}

const PerspirationSelect = {
    level1 : 0,
    level2 : 1,
}

// Choix de la respiration
var respiration025 = document.getElementById("025Hz_radio");
var respiration05 = document.getElementById("05Hz_radio");

respiration025.onchange = function() {
    if (respiration025.checked = true) {
        sendRespirationSelect(RespirationSelect.respi025);
    }
}

respiration05.onchange = function() {
    if (respiration05.checked = true) {
        sendRespirationSelect(RespirationSelect.respi05);
    }
}

function sendRespirationSelect(selection) {
    const http = new XMLHttpRequest();
    var url = '';

    switch (selection) {
        case RespirationSelect.respi025:
            console.log("envoi de la respiration 0.25Hz");
            url='http://192.168.1.10/cmd/respirationSelect/0';
            break;
        case RespirationSelect.respi05:
            console.log("envoi de la respiration 0.5Hz");
            url='http://192.168.1.10/cmd/respirationSelect/1';
            break;
        default:
            break;
    }

    http.open("POST", url);
    http.send();
}

//Choix de la perspiration
var perspiration1 = document.getElementById("perspiration1_radio");
var perspiration2 = document.getElementById("perspiration2_radio");

perspiration1.onchange = function() {
    if (perspiration1.checked = true) {
        sendPerspirationSelect(PerspirationSelect.level1);
    }
}

perspiration2.onchange = function() {
    if (perspiration2.checked = true) {
        sendPerspirationSelect(PerspirationSelect.level2);
    }
}

function sendPerspirationSelect(selection) {
    const http = new XMLHttpRequest();
    var url = '';

    switch (selection) {
        case PerspirationSelect.level1:
            console.log("envoi de la prespiration nniveau 1");
            url='http://192.168.1.10/cmd/perspirationSelect/0';
            break;
        case PerspirationSelect.level2:
            console.log("envoi de la perspiration niveau 2");
            url='http://192.168.1.10/cmd/perspirationSelect/1';
            break;
        default:
            break;
    }

    http.open("POST", url);
    http.send();
}

//Paramètres extraits des signaux
var parameter_interval = 100;

var bpm_label = document.getElementById("sidebar_bpm_label");
var respiration_label = document.getElementById("sidebar_respiration_label");
var systolic_label = document.getElementById("sidebar_systolic_label");
var diastolic_label = document.getElementById("sidebar_diastolic_label");
var perspiration_label = document.getElementById("sidebar_perspiration_label");
var lie_label = document.getElementById("sidebar_lie_label");

function updateAllParameters() {
    const http = new XMLHttpRequest();
    const url='http://192.168.1.10/cmd/parameters';

    http.open("GET", url);
    http.send();
    var parameters_obj;

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200 && http.responseText)
      {
        parameters_obj = JSON.parse(http.responseText);

        bpm_label.innerHTML = parameters_obj.bpm + " BPM";
        respiration_label.innerHTML = parameters_obj.respiration + " Hz";
        systolic_label.innerHTML = parameters_obj.systolic + " mmHg";
        diastolic_label.innerHTML = parameters_obj.diastolic + " mmHg";
        perspiration_label.innerHTML = parameters_obj.perspiration + " V";

        if (parameters_obj.lie == 1) 
        {
            lie_label.text = "OUI";
        }
        else
        {
            lie_label.text = "NON";
        }
        
      }
    }
}

setInterval(updateAllParameters, parameter_interval);