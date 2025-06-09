

let charts = [];

let c = 1;

let L = 1;

function clearGraphes(){
    charts.forEach(
        chart => {
            chart.destroy();
        }
    )
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



const f = (x) => {

    let res = 0;

    for (n = 1; n < 4; n++) {

        res += Math.sin((2 * n - 1) * x) / (2 * n - 1);

    }

    return res;

};



const createWaveFunc = (func) => {

    //with n = 10

    let fsin;

    let Bn = [];

    for (n = 0; n < 11; n++) {

        Bn[n] = (2 / L) * simsponIntagrate(x => func(x) + Math.sin((n * Math.PI * x) / L));

    }



    fsin = (x) => {

        res = 0;

        for (n = 0; n < 11; n++) {

            res += Bn[n] * Math.sin(n * Math.PI * x / L);

        }

        return res;

    }

    

    

    const waveFunc = (x, t) => (1/2) * (fsin(x - (c*t)) + fsin(x + (c*t)) );



    return waveFunc;

}



const simsponIntagrate = (func, step = 10, range = [0, 1]) => {

    dx = (range[1] - [0]) / step;

    X = (s) => range[0] + s * dx;

    res = 0;

    for (let i = 0; i < step + 1; i++) {



        switch (i) {

            case 0:

                res += func(X(i));

                break;

            case step:

                res += func(X(i));

                break;

            default:

                res += (2 + 2*(i % 2)) * func(X(i));

        }

    }

    

    res *= dx / 3;



    return res;



}



function drawGraph(func, t = 0, canvasID, xSpace = 0.001, xRange = [0, 1]) {





    let Xs = [];

    let Ys = [];

    let range = [];

    range[0] = xRange[0] / xSpace;

    range[1] = xRange[1] / xSpace;

    let index;

    for (let i = range[0]; i < range[1]; i++) {

        index = i - range[0];

        Xs[index] = i * xSpace;

        if (func(Xs[index],t)) Ys[index] = func(Xs[index], t);

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



    charts.push(new Chart(

        document.getElementById(canvasID),

        config

    ));



}



