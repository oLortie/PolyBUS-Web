//-------------------------------------------------------------------------------------------------------------------------------
// Gestion des info du suspect

var selectSuspect = document.getElementById("selectSuspect");
selectSuspect.onselect = function() {
    console.log("function");
    id = selectSuspect.value;
    const suspect = [];
    fetch("URL pour get by ID", {method: 'GET', mode:'cors'}) 
      .then(blob => blob.json())
      .then(data => suspect.push(...data))
    
    document.getElementById("sidebar_suspect_first_name_label").innerHTML = suspect.name
    document.getElementById("sidebar_suspect_last_name_label").innerHTML = suspect.lastname
    document.getElementById("sidebar_suspect_birthdate_label").innerHTML = suspect.birthdate
    document.getElementById("sidebar_suspect_number_label").innerHTML = suspect.caseNumber
    document.getElementById("sidebar_suspect_gender_label").innerHTML = suspect.gender
}

//-------------------------------------------------------------------------------------------------------------------------------
// Gestion du demarrage de la simulation
var simulationState = 0;

var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");

startBtn.onclick = function() {
    simulationState = 1;
    console.log(simulationState);
};

stopBtn.onclick = function() {
    simulationState = 0;
    console.log(simulationState);
};

// ================================================================
// Gestion du signal de respiration
const RespirationSelect = {
    respi025 : 0,
    respi05  : 1, 
}
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

    http.open("POST", url, false);
    http.send();
}

// ================================================================
//Choix de la perspiration
const PerspirationSelect = {
    level1 : 0,
    level2 : 1,
}

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

    http.open("POST", url, false);
    http.send();
}

//Paramètres extraits des signaux
var parameter_interval = 100;

var bpm_label = document.getElementById("sidebar_bpm_label");
var respiration_label = document.getElementById("sidebar_respiration_label");
var pressure_label = document.getElementById("sidebar_pressure_label");
var perspiration_label = document.getElementById("sidebar_perspiration_label");
var certitude_label = document.getElementById("sidebar_certitude_label");

function updateAllParameters() {
    if (simulationState == 1) {
        const http = new XMLHttpRequest();
        const url='http://192.168.1.10/cmd/parameters';
    
        http.open("GET", url, true);
        http.send();
        var parameters_obj;
    
        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200 && http.responseText) {
                parameters_obj = JSON.parse(http.responseText);
        
                bpm_label.innerHTML = parameters_obj.bpm + " BPM";
                respiration_label.innerHTML = parameters_obj.respiration + " Hz";
                pressure_label.innerHTML = parameters_obj.bloodPressure + " mmHg";
                perspiration_label.innerHTML = parameters_obj.perspiration + " V";
                certitude_label.innerHTML = parameters_obj.certitude + " %";
            }
        }
    }
}

function setInfoSuspect(caseNumber) {
    console.log("Allo les tchoins!")
    fetch("https://localhost:44318/api/PolyBUSAPI/caseNumber?caseNumber=" + caseNumber, {method: 'GET', mode:'cors'}) 
        .then(blob => blob.json())
        .then(data => {
            document.getElementById("sidebar_suspect_first_name_label").innerHTML = data.name;
            document.getElementById("sidebar_suspect_last_name_label").innerHTML = data.lastName;
            document.getElementById("sidebar_suspect_birthdate_label").innerHTML = data.Birthdate;
            document.getElementById("sidebar_suspect_number_label").innerHTML = data.caseNumber;
            document.getElementById("sidebar_suspect_gender_label").innerHTML = data.Gender;            
         });
}

setInterval(updateAllParameters, parameter_interval);