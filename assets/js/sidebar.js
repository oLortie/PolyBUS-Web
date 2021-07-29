//-------------------------------------------------------------------------------------------------------------------------------
// Gestion des info du suspect
var idSupsect;
var selectSuspect = document.getElementById("selectSuspect");
selectSuspect.onchange = function() {
    caseNumber = selectSuspect.value;
    fetch("https://localhost:44318/api/PolyBUSAPI/case?caseNumber=" + caseNumber, {method: 'GET', mode:'cors'}) 
      .then(blob => blob.json())
      .then(data => {
        idSupsect = data.id
        console.log(idSupsect);
        document.getElementById("sidebar_suspect_first_name_label").innerHTML = data.name;
        document.getElementById("sidebar_suspect_last_name_label").innerHTML = data.lastName
        document.getElementById("sidebar_suspect_birthdate_label").innerHTML = data.birthdate;
        document.getElementById("sidebar_suspect_number_label").innerHTML = data.caseNumber
        document.getElementById("sidebar_suspect_gender_label").innerHTML = data.gender;
        console.log(JSON.stringify(data));
      });
}
// --------------------------------------------------------------------------------------------------------------------
//
var boutonSave = document.getElementById("saveBtn");
boutonSave.onclick = async function(){
    var id = idSupsect;
    var freq = document.getElementById("sidebar_bpm_label").innerHTML;
    var pressure = document.getElementById("sidebar_pressure_label").innerHTML;
    var respi = document.getElementById("sidebar_respiration_label").innerHTML;
    var perspi = document.getElementById("sidebar_perspiration_label").innerHTML;

    // format the data
    const data = {Pulse: parseFloat(freq), Systolic: parseFloat(pressure), Diastolic: 0, Respiration: parseFloat(respi), Perspiration: parseFloat(perspi), IdSuspect: idSupsect};
    console.log(data)

    await fetch("https://localhost:44318/api/PolyBUSAPI/CreateData/",{ method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, mode:'cors', body: JSON.stringify(data)});
}
//---------------------------------------------------------------------------------------------------------------------
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

// --------------------------------------------------------------------------------------------------------------------
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

// --------------------------------------------------------------------------------------------------------------------
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
                console.log(parameters_obj.bloodPressure);
                bpm_label.innerHTML = parameters_obj.bpm;
                respiration_label.innerHTML = parameters_obj.respiration;
                pressure_label.innerHTML = parameters_obj.bloodPressure;
                perspiration_label.innerHTML = parameters_obj.perspiration;
                certitude_label.innerHTML = parameters_obj.certitude;
            }
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------------------
// 
var dataSuspect = document.getElementById("dataHistorique")
dataSuspect.onclick = function () {
    console.log("test");
    var selectSuspect = document.getElementById("selectSuspect");
    var caseNumber = selectSuspect.value;
    var name = document.getElementById("sidebar_suspect_first_name_label").innerHTML;
    var lname = document.getElementById("sidebar_suspect_last_name_label").innerHTML;
    var casenumber = document.getElementById("sidebar_suspect_number_label").innerHTML
    fetch("https://localhost:44318/api/PolyBUSAPI/caseNumber?caseNumber="+ caseNumber, {method: 'GET', mode:'cors'}) 
      .then(blob => blob.json())
      .then(data => {
        document.getElementById("data_fname").innerHTML = name;
        document.getElementById("data_lname").innerHTML = lname;
        document.getElementById("data_caseNum").innerHTML = casenumber;
        document.getElementById("data_cardiaque").innerHTML = data.pulse;
        document.getElementById("data_pressure").innerHTML = data.systolic;
        document.getElementById("data_respiration").innerHTML = data.respiration;
        document.getElementById("data_perspiration").innerHTML = data.perspiration;
        console.log(data)
      })
}

function setInfoSuspect(caseNumber) {
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