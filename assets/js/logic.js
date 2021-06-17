
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
          title: 't (s)',
          showgrid: true
        },
        yaxis: {
          title: 'Volume Air Poumon',
          showline: false
        }
      };
    Plotly.newPlot(graph_respiration, [{x:[], y:[], type: 'scatter'}], layout, {displayModeBar: false});
}

// function extendGraphRespiration(valueY){
//     Plotly.extendTraces(graph_respiration, {y:[[valueY]]}, [0]);
// }

function update_respiration(){
    const http = new XMLHttpRequest();
    const url='http://192.168.1.10/cmd/respiration';

    http.open("GET", url);
    http.send();
    var resp_obj;
    var respi;
    var data_time;

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200 && http.responseText)
      {
        console.log("Respiration voltage: " + http.responseText);
        document.getElementById("respiration").innerHTML = http.responseText;
        resp_obj = JSON.parse(http.responseText);
        respi = resp_obj.respiration;
        data_time = resp_obj.time;
        Plotly.extendTraces(graph_respiration, {x: [[data_time]], y:[[respi]]}, [0]);
        console.log(respi);
      }
    }
}

//----------------------------------------------------------------------------------------------------------------------------
// Function for perspiration Graph 
var graph_perspiration = document.getElementById('graph_perspiration');

function createGraphPerspiration(){
    var layout = {
        title: 'Perspiration de l\'individu',
        xaxis: {
          title: 't (s)',
          showgrid: true
        },
        yaxis: {
          title: 'Conductance sur la peau',
          showline: false
        }
      };
    Plotly.newPlot(graph_perspiration, [{x:[], y:[], type: 'scatter'}], layout, {displayModeBar: false});
}

// function extendGraphPerspiration(valueY){
//   Plotly.extendTraces(graph_perspiration, {y:[[valueY]]}, [0]);
// }

function update_perspiration(){
  const http = new XMLHttpRequest();
  const url='http://192.168.1.10/cmd/perspiration';

  http.open("GET", url);
  http.send();
  var persp_obj;
  var perspi;
  
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200 && http.responseText)
    {
      console.log("Perspiration voltage: " + http.responseText);
      //document.getElementById("perspiration").innerHTML = http.responseText;
      persp_obj = JSON.parse(http.responseText);
      perspi = resp_obj.perspiration;
      Plotly.extendTraces(graph_perspiration, {y:[[perspi]]}, [0]);
      console.log(perspi)
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------
// Function for pulse graph
var graph_pouls = document.getElementById('graph_pouls');

function createGraphPouls(){
    var layout = {
        title: 'Pouls de l\'individu',
        xaxis: {
          title: 't (s)',
          showgrid: true
        },
        yaxis: {
          title: 'Battements de coeur par minute',
          showline: false
        }
      };
    Plotly.newPlot(graph_pouls, [{x:[], y:[], type: 'scatter'}, {displayModeBar: false}], layout);
}

// function extendGraphPouls(valueY){
//   Plotly.extendTraces(graph_pouls, {y:[[valueY]]}, [0]);
// }

function update_pouls(){
  const http = new XMLHttpRequest();
  const url='http://192.168.1.10/cmd/pouls';

  http.open("GET", url);
  http.send();
  var pouls_obj;
  var pouls;
  
  if (http.readyState == 4 && http.status == 200 && http.responseText)
  {
    console.log("Pouls voltage: " + http.responseText);
    //document.getElementById("pouls").innerHTML = http.responseText;
    pouls_obj = JSON.parse(http.responseText);
    pouls = pouls_obj.pouls;
    Plotly.extendTraces(graph_pouls, {y:[[pouls]]}, [0]);
    console.log(pouls)
  }
}

//----------------------------------------------------------------------------------------------------------------------------
// Function for blood pressure graph
var graph_pression = document.getElementById('graph_pression');

function createGraphPression(){
    var layout = {
        template: "plotly_dark",
        title: 'Pression sanguine de l\'individu',
        xaxis: {
          title: 't (s)',
          showgrid: true
        },
        yaxis: {
          title: 'Pression en millimètres de mercure',
          showline: false
        }
      };
    Plotly.newPlot(graph_pression, [{x:[], y:[], /*type: 'scatter'*/}, {displayModeBar: false}], layout);
}

// function extendGraphPression(valueY){
//   Plotly.extendTraces(graph_pression, {y:[[valueY]]}, [0]);
// }

function update_pression(){
  const http = new XMLHttpRequest();
  const url='http://192.168.1.10/cmd/pression';

  http.open("GET", url);
  http.send();
  var press_obj;
  var press;
  
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200 && http.responseText)
    {
      console.log("Pression voltage: " + http.responseText);
      //document.getElementById("pression").innerHTML = http.responseText;
      press_obj = JSON.parse(http.responseText);
      press = press_obj.pression;
      Plotly.extendTraces(graph_pression, {y:[[press]]}, [0]);
      console.log(press)
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------
//Function for graphs update

var data_interval = 10; //The interval in ms between 2 data requests

//The total number of data points in each graph
var data_count = 0;

//The maximum range of the X axis in seconds that can be displayed at once
const MAX_X_DISPLAY_RANGE = 15;
//The maximum range of the X axis in data count that can be displayed at once
// const MAX_X_DISPLAY_COUNT = 100 * MAX_X_DISPLAY_RANGE;

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
    var data_time;

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200 && http.responseText)
      {

        console.log("length : ", http.responseText.length);

        if(http.responseText.length != 0)
        {
          console.log("raw data : " + http.responseText);
          rawData_obj = JSON.parse(http.responseText);
          respiration = rawData_obj.respiration;
          perspiration = rawData_obj.perspiration;
          pouls = rawData_obj.pouls;
          pression = rawData_obj.pression;
          data_time = rawData_obj.time;

          console.log("data_time : " + data_time);
  
          Plotly.extendTraces(graph_respiration, {x: [[data_time]], y:[[respiration]]}, [0]);
          Plotly.extendTraces(graph_perspiration, {x: [[data_time]], y:[[perspiration]]}, [0]);
          Plotly.extendTraces(graph_pouls, {x: [[data_time]], y:[[pouls]]}, [0]);
          Plotly.extendTraces(graph_pression, {x: [[data_time]], y:[[pression]]}, [0]);
          data_count++;

          console.log(data_count);
  
          //TODO: Fix axis title disappearing
          // if (data_count >= MAX_X_DISPLAY_COUNT) {
             Plotly.relayout(graph_respiration, {xaxis: {range: [data_time-MAX_X_DISPLAY_RANGE, data_time]}});
             Plotly.relayout(graph_perspiration, {xaxis: {range: [data_time-MAX_X_DISPLAY_RANGE, data_time]}});
             Plotly.relayout(graph_pouls, {xaxis: {range: [data_time-MAX_X_DISPLAY_RANGE, data_time]}});
             Plotly.relayout(graph_pression, {xaxis: {range: [data_time-MAX_X_DISPLAY_RANGE, data_time]}});
          // }
        }
      }
    }
}
//----------------------------------------------------------------------------------------------------------------------------

createGraphRespiration();
createGraphPerspiration();
createGraphPouls();
createGraphPression();

setInterval(updateAllGraphs, data_interval);

// setInterval(update_respiration, data_interval);
/*setTimeout(setInterval(update_perspiration, 100), 10);
setTimeout(setInterval(update_pouls, 100), 20);
setTimeout(setInterval(update_pression, 100), 30);*/
