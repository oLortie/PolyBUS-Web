
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

var graphDiv = document.getElementById('graph');

function createGraph(){

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

    Plotly.newPlot(graphDiv, [{y:[], type: 'scatter'}], layout);
}

function extendGraph(valueY){

    Plotly.extendTraces(graphDiv, {y:[[valueY]]}, [0]);
}

function update_respiration()
{
    const http = new XMLHttpRequest();
    const url='http://192.168.1.10/cmd/respiration';

    http.open("GET", url);
    http.send();
    var resp_obj;
    var respi;
    
    http.onreadystatechange = function() 
    {
        console.log("Respiration voltage: " + http.responseText);
        document.getElementById("respiration").innerHTML = http.responseText;
        resp_obj = JSON.parse(http.responseText);
        respi = resp_obj.respiration;
        Plotly.extendTraces(graphDiv, {y:[[respi]]}, [0]);
        console.log(respi)
    }
    
}

//----------------------------------------------------------------

createGraph();
setInterval(function() { update_respiration(); }, 100);
// setInterval( function() { funca(10,3); }, 500 );

