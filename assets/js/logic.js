
// function update_switches()
// {
//     const http = new XMLHttpRequest();
//     const url='http://192.168.1.10/cmd/sws';

//     http.open("GET", url);
//     http.send();

//     http.onreadystatechange = function() {
//         console.log("Switch state: " + http.responseText);
//         document.getElementById("switches").innerHTML = http.responseText;
//     }
// }


// window.setInterval(update_switches, 1000);


//-------------------------------------------------------------------------------------------------------------------------------
// Function for respiration Graph
var graph_respiration = document.getElementById('graph_respiration');

function createGraphRespiration(){
    var layout = {
        title: 'Respiration de l\'individu',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'Volume Air Poumon',
          showline: false
        }
      };
    Plotly.newPlot(graph_respiration, [{y:[], type: 'scatter'}], layout);
}

function extendGraphRespiration(valueY){
    Plotly.extendTraces(graph_respiration, {y:[[valueY]]}, [0]);
}

function update_respiration(){
    const http = new XMLHttpRequest();
    const url='http://192.168.1.10/cmd/respiration';

    http.open("GET", url);
    http.send();
    var resp_obj;
    var respi;
    
    http.onreadystatechange = function() {
        console.log("Respiration voltage: " + http.responseText);
        document.getElementById("respiration").innerHTML = http.responseText;
        resp_obj = JSON.parse(http.responseText);
        respi = resp_obj.respiration;
        Plotly.extendTraces(graph_respiration, {y:[[respi]]}, [0]);
        console.log(respi)
    }
}

//----------------------------------------------------------------------------------------------------------------------------
// Function for perspiration Graph 
var graph_perspiration = document.getElementById('graph_perspiration');

function createGraphPerspiration(){
    var layout = {
        title: 'Perspiration de l\'individu',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'Conductance sur la peau',
          showline: false
        }
      };
    Plotly.newPlot(graph_perspiration, [{y:[], type: 'scatter'}], layout);
}

function extendGraphPerspiration(valueY){
  Plotly.extendTraces(graph_perspiration, {y:[[valueY]]}, [0]);
}

function update_perspiration(){
  const http = new XMLHttpRequest();
  const url='http://192.168.1.10/cmd/perspiration';

  http.open("GET", url);
  http.send();
  var persp_obj;
  var perspi;
  
  http.onreadystatechange = function() {
      console.log("Perspiration voltage: " + http.responseText);
      //document.getElementById("perspiration").innerHTML = http.responseText;
      persp_obj = JSON.parse(http.responseText);
      perspi = resp_obj.perspiration;
      Plotly.extendTraces(graph_perspiration, {y:[[perspi]]}, [0]);
      console.log(perspi)
  }
}
//----------------------------------------------------------------------------------------------------------------------------
// Function for pulse graph
var graph_pouls = document.getElementById('graph_pouls');

function createGraphPouls(){
    var layout = {
        title: 'Pouls de l\'individu',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'Battements de coeur par minute',
          showline: false
        }
      };
    Plotly.newPlot(graph_pouls, [{y:[], type: 'scatter'}], layout);
}

function extendGraphPouls(valueY){
  Plotly.extendTraces(graph_pouls, {y:[[valueY]]}, [0]);
}

function update_pouls(){
  const http = new XMLHttpRequest();
  const url='http://192.168.1.10/cmd/pouls';

  http.open("GET", url);
  http.send();
  var pouls_obj;
  var pouls;
  
  http.onreadystatechange = function() {
      console.log("Pouls voltage: " + http.responseText);
      //document.getElementById("pouls").innerHTML = http.responseText;
      pouls_obj = JSON.parse(http.responseText);
      pouls = pouls_obj.pouls;
      Plotly.extendTraces(graph_pouls, {y:[[pouls]]}, [0]);
      console.log(pouls)
  }
}
//----------------------------------------------------------------------------------------------------------------------------
// Function for pressure graph
var graph_pression = document.getElementById('graph_pression');

function createGraphPression(){
    var layout = {
        title: 'Pression sanguine de l\'individu',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'pression en millimètres de mercure',
          showline: false
        }
      };
    Plotly.newPlot(graph_pression, [{y:[], type: 'scatter'}], layout);
}

function extendGraphPression(valueY){
  Plotly.extendTraces(graph_pression, {y:[[valueY]]}, [0]);
}

function update_pression(){
  const http = new XMLHttpRequest();
  const url='http://192.168.1.10/cmd/pression';

  http.open("GET", url);
  http.send();
  var press_obj;
  var press;
  
  http.onreadystatechange = function() {
      console.log("Pression voltage: " + http.responseText);
      //document.getElementById("pression").innerHTML = http.responseText;
      press_obj = JSON.parse(http.responseText);
      press = press_obj.pression;
      Plotly.extendTraces(graph_pression, {y:[[press]]}, [0]);
      console.log(press)
  }
}

function updateAllGraphs() {
    const http = new XMLHttpRequest();
    const url='http://192.168.1.10/cmd/rawData';

    http.open("GET", url);
    http.send();
    var rawData_obj;
    var respiration;
    var perspiration;
    var pouls;
    var pression;

    http.onreadystatechange = function() {
        console.log("raw data : " + http.responseText);
        rawData_obj = JSON.parse(http.responseText);
        respiration = rawData_obj.respiration;
        perspiration = rawData_obj.perspiration;
        pouls = rawData_obj.pouls;
        pression = rawData_obj.pression;
        Plotly.extendTraces(graph_respiration, {y:[[respiration]]}, [0]);
        Plotly.extendTraces(graph_perspiration, {y:[[perspiration]]}, [0]);
        Plotly.extendTraces(graph_pouls, {y:[[pouls]]}, [0]);
        Plotly.extendTraces(graph_pression, {y:[[pression]]}, [0]);
    }
}
//--------------------------------------------------------------s--------------------------------------------------------------

createGraphRespiration();
createGraphPerspiration();
createGraphPouls();
createGraphPression();

setInterval(updateAllGraphs, 10);

/*setInterval(update_respiration, 100);
setTimeout(setInterval(update_perspiration, 100), 10);
setTimeout(setInterval(update_pouls, 100), 20);
setTimeout(setInterval(update_pression, 100), 30);*/
