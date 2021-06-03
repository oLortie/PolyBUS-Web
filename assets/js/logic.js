
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

function extendGraph(valueY){
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
// Function for Graph X
var graph_X = document.getElementById('graph_X');

function createGraphX(){
    var layout = {
        title: 'X',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'Volume Air Poumon',
          showline: false
        }
      };
    Plotly.newPlot(graph_X, [{y:[], type: 'scatter'}], layout);
}

//----------------------------------------------------------------------------------------------------------------------------
// Function for Graph Y
var graph_Y = document.getElementById('graph_Y');

function createGraphY(){
    var layout = {
        title: 'Y',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'Volume Air Poumon',
          showline: false
        }
      };
    Plotly.newPlot(graph_Y, [{y:[], type: 'scatter'}], layout);
}

//----------------------------------------------------------------------------------------------------------------------------
// Function for Graph Z
var graph_Z = document.getElementById('graph_Z');

function createGraphZ(){
    var layout = {
        title: 'Z',
        xaxis: {
          title: 't (ms)',
          showgrid: true
        },
        yaxis: {
          title: 'Volume Air Poumon',
          showline: false
        }
      };
    Plotly.newPlot(graph_Z, [{y:[], type: 'scatter'}], layout);
}

//----------------------------------------------------------------

createGraphRespiration();
createGraphX();
createGraphY();
createGraphZ();

setInterval(function() { update_respiration(); }, 100);
// setInterval( function() { funca(10,3); }, 500 );

