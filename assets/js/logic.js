
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
          title: 't (s)',
          showgrid: true
        },
        yaxis: {
          title: 'VOLUME POUMONS? (A CHANGER)',
          showline: false
        }
      };

    Plotly.newPlot(graphDiv, [{y:[], type: 'line', line:{shape: 'spline'}}], layout);
}

function extendGraph(valueY){

    Plotly.extendTraces(graphDiv, {y:[[valueY]]}, [0]);
}

//----------------------------------------------------------------

createGraph();
setInterval(function() { extendGraph(Math.random()); }, 100);
// setInterval( function() { funca(10,3); }, 500 );

