class PendulumCharts extends React.Component {

    constructor(props) {

        super(props);

        this.updateValues = this.updateValues.bind(this);
        this.initCanvases = this.initCanvases.bind(this);

        this.state = {
            counter : 0,
            numberOfPendulums : data.pendulumData.numberOfPendulums,
            canvases : [],
        }

        this.initCanvases();

        chartsNode = this;
        

    }

    initCanvases(num = data.pendulumData.numberOfPendulums){
        let canvasID = "";
        
        for(let pendI = 0; pendI < num; pendI++){
            canvasID = "pendulum-chart-" + (pendI+1);
            this.state.canvases.push( <div key={"key-"+ canvasID} className="chart-container" >
                <canvas id={canvasID} className="chart pendulum-chart" ></canvas>
                </div>)
                ;
        }

    }

    changeCanvases(num = data.pendulumData.numberOfPendulums){
        let canvasID = "";
        let canvases = [];
        for(let pendI = 0; pendI < num; pendI++){
            canvasID = "pendulum-chart-" + (pendI+1);
            canvases.push( <div key={"key-"+ canvasID + this.state.counter} className="chart-container" >
                <canvas id={canvasID} className="chart pendulum-chart" ></canvas>
                </div>);
        }
        this.setState( { counter: ++this.state.counter, numberOfPendulums : num, canvases: canvases}, () => this.updateValues());
    }

    updateValues() {
        let numberOfPendulums = data.pendulumData.numberOfPendulums;
        let canvasID = "";
        
        for(let pendI = 0; pendI < numberOfPendulums; pendI++){
            canvasID = "pendulum-chart-" + (pendI+1);
            drawPendulumGraph(pendI, canvasID);
        }
    }


    render() {
        return (
            <div className="charts-group">
                <button onClick={() => {this.updateValues()}} className="graph-drawer">Generate/Update Charts</button>
                {this.state.canvases}
            </div>

        );

    }
}

ReactDOM.render(
    <ClosableFrameWithCross pagename="pendulum-charts-page" className="pendulum-charts-frame print-page" pageheader="PENDULUM CHARTS">
        <PendulumCharts />
        <div className="foot-note">
        <p>Pendulum charts are used to infer the test has been conducted properly</p>
        <p className="not-print">The line fitted to points shall cross the origine and points should be aligned with the line. Otherwise the possible cause may be one of these; </p>
        <ul>
            <li>A steady wind from port or starboard side, if the line croses the tangent axis above or below the origin despite the points are aligned with the line,</li>
            <li>Ship is restrained (by mooring lines etc.) if the points spread away from the line in a single region (port side or starboard side),</li>
            <li>Exessive free liquids if the points spread away from the line more towards to the endpoints,</li>
            <li>A gusty wind if singular diversities observed among the points.</li>
        </ul>
        </div>
    </ClosableFrameWithCross>,
    document.getElementById('page_pendulum-charts')
);

//from dataHandler


