let weightFrameNode = "";
let momentTableNode = "";
let weightTableNode = "";

const NumberOfWeigthShifts = 8;
const charts = {};


const data = {

    shipValues: {
        name: "MAJESTY 120#2",
        displacement: "175",

        setDisplacement(e) {
            data.shipValues.displacement = Number(e.target.value);
            console.log("disp set");
        },
        setProjectName(e) {
            data.shipValues.name = e.target.value;
            document.getElementById("project-name").innerText = data.shipValues.name;
        },

    },
    testWeightData: {
        NumberOfWeightShifts: 8,
        weightNumber: 4,
        weights: [1.3, 1.3, 1.3, 1.3],
        weightPoses: [
            [0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 4, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 2, 0, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0],
        ],
        weightMoments: [-3, -4, -5, 0, 7, 8, 2, 0],
        setWeightPos: (wNum, posNum, pos) => {
            data.testWeightData.weightPoses[wNum][posNum] = pos;
        },
        calculateMoments: () => {
            for (let i = 1; i < data.testWeightData.NumberOfWeightShifts + 1; i++) {
                let momentIndex = i - 1;
                data.testWeightData.weightMoments[momentIndex] = 0;
                for (let w = 0; w < data.testWeightData.weightNumber; w++) {
                    data.testWeightData.weightMoments[momentIndex] += data.testWeightData.weightPoses[w][i] * data.testWeightData.weights[w];
                }
            }
        },
        setWeights: (valArr) => {
            data.testWeightData.weights = [...valArr];
        }
    },

    pendulumData: {
        numberOfPendulums: 2,
        pendulums: [
            {
                deflection: [-61, -127, -72, -4, 53, 121, 69, -2],
                length: [3180, 3180, 3180, 3180, 3180, 3180, 3180, 3180],
                tan: [-0.019182389937106917, -0.03993710691823899, -0.022641509433962263, -0.0012578616352201257, 0.016666666666666666, 0.038050314465408804, 0.02169811320754717, -0.0006289308176100629],
            },
            {
                deflection: [-61, -127, -72, -4, 53, 121, 69, -2],
                length: [3180, 3180, 3180, 3180, 3180, 3180, 3180, 3180],
                tan: [-0.019182389937106917, -0.03993710691823899, -0.022641509433962263, -0.0012578616352201257, 0.016666666666666666, 0.038050314465408804, 0.02169811320754717, -0.0006289308176100629],
            }
        ],

        changePendulumValue: (pendNum, wsNum, value) => {
            // value = {deflection: .... , length : ....}
            let pendI = pendNum - 1;
            let wsI = wsNum - 1;
            data.pendulumData.pendulums[pendI].deflection[wsI] = value.deflection;
            data.pendulumData.pendulums[pendI].length[wsI] = value.length;
            data.pendulumData.pendulums[pendI].tan[wsI] = value.tan;
        }

    },
}


function drawPendulumGraph(pendI, canvasID) {

    if (charts[canvasID]) {

        charts[canvasID].destroy();

    }



    let graphData = {
        labels: data.testWeightData.weightMoments,
        datasets: [{
            label: 'Measurements',
            backgroundColor: 'rgb(90, 99, 132)',
            data: data.pendulumData.pendulums[pendI].tan,
            pointBackgroundColor: 'rgb(90, 99, 132)',
            pointStyle: 'rectRot',
            pointRadius: '4',
            fill: false,
            showLine: false //<- set this
        }]
    };


    let [lineFitted, m, n] = fitLine(graphData.labels, graphData.datasets[0].data);
    let lineLabel = "" +  formatDecimal(m) +  "*X + " +  formatDecimal(n);
    let linearGraphYs = graphData.labels.map(x => lineFitted(x));
    graphData.datasets.push({ label: lineLabel, backgroundColor: 'rgb(140,33,50)', borderColor: 'rgb(140,33,50)', data: linearGraphYs, showLine: true });

    let config = {
        type: 'scatter',
        data: graphData,
        options: {
            scales: {
                yaxis: {
                    position: 'left',
                    title : {
                        display : 'true',
                        text : 'tangents',
                        align: 'end',
                        font:{
                            size: 14,
                        }
                    }
                },
                xaxis: {
                    position: 'center',
                    title : {
                        display : 'true',
                        text : 'moments',
                        align: 'end',
                        font:{
                            size: 14,
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Moment Chart of Pendulum ' + (pendI + 1),
                    padding: {
                        top: 10,
                        bottom: 10,
                    },
                    font : {
                        size: 16,
                    }
                }
            }
        }
    };

    charts[canvasID] = new Chart(
        document.getElementById(canvasID),
        config
    );
    return lineFitted;
}

function fitLine(Xs, Ys) {
    if (!Xs.length > 1 || !Ys.length > 1) throw 'inputs of fitLine function should be array type';
    if (Xs.length != Ys.length) throw 'length of the inputs of fitLine function should have equal length';
    let Xsum = Xs.reduce((a, b) => a + b) / Xs.length;
    let Ysum = Ys.reduce((a, b) => a + b) / Ys.length;

    let m = 0;
    let dividend = 0;
    let devider = 0;

    for (let i = 0; i < Xs.length; i++) {
        dividend += (Xs[i] - Xsum) * (Ys[i] - Ysum);
        devider += Math.pow((Xs[i] - Xsum), 2);
    }
    m = dividend / devider;
    let n = Ysum - (m * Xsum);
    function func(inp) {
        let x = Number(inp);
        if (isNaN(x)) throw 'input should be number';

        return (x * m) + n;
    }
    return [func, m, n];
}


const downloadData = (exportingString, exportName, extension) => {

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportingString);

    let downLoadAnchorNode = document.createElement('a');

    downLoadAnchorNode.setAttribute("href", dataStr);

    downLoadAnchorNode.setAttribute("download", exportName + extension);

    document.body.appendChild(downLoadAnchorNode);

    downLoadAnchorNode.click();

    downLoadAnchorNode.remove();

    //End of downloadData()
}



const dataBuffer = {

    projectName: "MAJESTY 120#2",

    shipValues: {
        name: "MAJESTY 120#2",
        displacement: "175",
    },
    testWeightData: {
        NumberOfWeightShifts: 0,
        weightNumber: 0,
        weights: [],
        weightPoses: [],
        weightMoments: [],
    },

    pendulumData: {
        numberOfPendulums: 2,
        pendulums: [],

    },
}

function updateDataBuffer() {

    dataBuffer.projectName = data.shipValues.name;

    for (let dat in dataBuffer.shipValues) {
        if (dat instanceof Function) continue;
        dataBuffer.shipValues[dat] = copyDataExceptFunctions(data.shipValues[dat]);

    }

    for (let dat in dataBuffer.testWeightData) {
        if (dat instanceof Function) continue;
        dataBuffer.testWeightData[dat] = copyDataExceptFunctions(data.testWeightData[dat]);

    }

    for (let dat in dataBuffer.pendulumData) {
        if (dat instanceof Function) continue;
        dataBuffer.pendulumData[dat] = copyDataExceptFunctions(data.pendulumData[dat]);
    }

}

function copyDataExceptFunctions(dat) {
    let result;
    if (dat instanceof Object) {
        result = Array.isArray(dat) ? [] : {};
        for (let i in dat) {
            if (i instanceof Function) continue;
            result[i] = copyDataExceptFunctions(dat[i]);
        }
    }
    else {
        result = dat;
    }
    return result;

}

function saveDataToLocal() {
    updateDataBuffer();
    let dataJSON = JSON.stringify(dataBuffer);
    downloadData(dataJSON, dataBuffer.projectName + ".inc", ".json");
}


function formatDecimal(str, seperatorChar = "."){
    if(isNaN(str) )throw "formatDecimal requires number format";
    if(typeof str !== 'string') str = str.toString();
    let numParts = str.split(seperatorChar);
    if(numParts[1]) numParts[1] = numParts[1].slice(0,4);
    return numParts[0] + seperatorChar + numParts[1];
}