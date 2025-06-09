var sliderW = document.getElementById("wParameter");
var sliderB = document.getElementById("bParameter");
var inputW = document.getElementById("inputW");
var inputB = document.getElementById("inputB");
var lossOutput = document.getElementById("lossOutput");
sliderW.value = 0.8;
sliderB.value = 0;
var c = document.getElementById("graphCanvas");
var ctx = c.getContext("2d");
var table = document.getElementById("inputTable");
var inputArray = [];
for (let i = 1; i < table.rows.length; i++){
inputArray[i-1] = table.rows[i].cells[1].innerHTML;
}
let oX = 50;
let oY = 330;
let xSpace = 50;
let ySpace = 40;

function drawAxis(){
    let yAxisLength = 300;
    let xAxisLength = 500;
    ctx.beginPath();
    ctx.moveTo(oX, oY);
    ctx.lineTo(oX+xAxisLength, oY);
    ctx.lineTo(oX+xAxisLength-10, oY+10);
    ctx.moveTo(oX+xAxisLength, oY);
    ctx.lineTo(oX+xAxisLength-10, oY-10);
    ctx.moveTo(oX, oY);
    ctx.lineTo(oX, oY-yAxisLength);
    ctx.lineTo(oX+10, oY-yAxisLength+10);
    ctx.moveTo(oX, oY-yAxisLength);
    ctx.lineTo(oX-10, oY-yAxisLength+10);
    ctx.stroke();
    ctx.font = "20px Georgia";
    ctx.fillText("y", oX-20, oY-yAxisLength+40);
    ctx.fillText("x", oX+xAxisLength-40, oY+20);
    //lets draw X axis guide lines
    for(let i = xSpace; i < xAxisLength; i+=xSpace){
        ctx.moveTo(oX+i, oY - 5);
        ctx.lineTo(oX+i, oY+5);
        }
    ctx.stroke();
    }


function drawPoint(arr){
    for (i = 0; i < arr.length; i++){
        ctx.beginPath();
         ctx.fillRect(oX+(i*xSpace) - 4, oY - arr[i]*ySpace - 4, 8, 8);        
    }
    
}

let line = {
    w: sliderW.value, 
    b: sliderB.value,
    drawing: false,
    loss: 0,
    calculatingRegression: false,
    regressionCompleted: false,
    learningRate: -0.001,
    setDrawing: function(){
            this.drawing = true;
            document.getElementById("line").style.visibility = "visible";
            this.calculatingRegression = false;
    },
    render: function(){
        if(!this.calculatingRegression){
        this.w = Number(sliderW.value);
        this.b = Number(sliderB.value);
        inputW.value = this.w;
        inputB.value = this.b;
        } else{
            this.regression(inputArray);
        }
        
        
        //draw the line
        if(this.drawing){
            let lineStartX = 0;
            let lineStartY = (this.w * lineStartX) + this.b;
            let lineEndX = 10;
            let lineEndY = (this.w * lineEndX) + this.b;
            ctx.beginPath();
            ctx.moveTo(oX + lineStartX * xSpace, oY - lineStartY * ySpace );
            ctx.lineTo(lineEndX * xSpace + oX, oY - lineEndY * ySpace);
            ctx.closePath();
            ctx.stroke();
        }
        this.lossFunc(inputArray);
    },
    
    lossFunc: function(arr){
        if(this.drawing){
            this.loss = 0;
            for (let i = 0; i<arr.length; i++){
                this.loss += (arr[i] - ((this.w * i) + this.b) )**2;
            }
            this.loss /= arr.length;
            lossOutput.innerHTML = this.loss.toFixed(4);
            return this.loss;
        }
    },
    startRegression: function(){
        this.setDrawing();
        this.calculatingRegression = true;
        this.regressionCompleted = false;
        this.w = 0.3;
        this.b = 0.3;
},
    regression: function(arr){
        let dLossW = 0;
        let dLossB = 0;
        for(let i = 0; i < arr.length; i++){
            dLossW += 2 * (this.w * i + this.b - arr[i]) * i;
            dLossB += 2 * (this.w * i + this.b - arr[i]);
        }
        if(!this.regressionCompleted){
        this.w += Number(dLossW) * this.learningRate;
        this.b += Number(dLossB) * this.learningRate;
        inputW.value = this.w;
        inputB.value = this.b;
        sliderW.value = this.w;
        sliderB.value = this.w;
        }
        document.getElementById("differantials").innerHTML = "dlossW = " + dLossW + "<br>dlossb = " + dLossB + "<br>learning rate = " + this.learningRate * -1;
        if(dLossW**2 < 0.0001 && dLossB**2 < 0.0001) this.regressionCompleted = true;
    }
}


function update(){
    ctx.clearRect(0, 0, c.width, c.height);
    line.render();
    drawAxis();
    drawPoint(inputArray);
}
drawAxis();
drawPoint(inputArray);
var looping = setInterval(update, 50);