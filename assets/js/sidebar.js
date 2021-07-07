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