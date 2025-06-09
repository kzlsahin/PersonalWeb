
let chart;

function drawFourierGraph(func, canvasID, xSpace = 0.001, xRange= [-4,4]) {

    if(chart) chart.destroy();

    let Xs = [];
    let Ys = [];
    let range = [];
    range[0] = xRange[0] / xSpace;
    range[1] = xRange[1] / xSpace;
    let index;
    for(let i = range[0]; i < range[1]; i++){
        index = i - range[0];
        Xs[index] = i * xSpace;
        if(func(Xs[index])) Ys[index] = func(Xs[index]);
    }

    console.log(Xs.length);

    
    

    let graphData = {


        labels: Xs,

        datasets: [{
            label: 'Func',
            backgroundColor: 'rgb(90, 99, 132)',
            data: Ys,
            pointBackgroundColor: 'rgb(90, 99, 132)',
            pointStyle: 'rectRot',
            pointRadius: '3',
            fill: false,
            showLine: true //<- set this
        }]
    };
    

    let config = {
        type: 'scatter',
        data: graphData,
       
    };

    chart = new Chart(
        document.getElementById(canvasID),
        config
    );

}


function formatDecimal(str, opt = { seperator: ".", decimal: 3 }) {
    let seperatorChar = opt.seperator || ".";
    let decimalNum = opt.decimal || 3;
    if (typeof str !== 'string') str = str.toString();
    if (isNaN(str)) throw "formatDecimal requires number format, but input is " + str;

    let numParts = str.split(seperatorChar);
    if (!numParts[1]) {
        let ext = ".";
        for (let i = 0; i < decimalNum; i++) {
            ext += "0";
        }
        return numParts[0] + ext;
    }
    numParts[1] = numParts[1].slice(0, decimalNum);
    return numParts[0] + seperatorChar + numParts[1];
}

const f = (x) =>
{  let res = 0; 
    for(n = 1; n < 4; n++){ 
        res += Math.sin((2*n - 1)*x)/(2*n-1); } 
         return res; 
        };