class PrinciplDimensions extends React.Component {

    constructor(props) {

        super(props);

        this.updateValues = this.updateValues.bind(this);

        this.state = {
            defaultDisplacement: data.shipValues.displacement,
            defaultName : data.shipValues.name,
        }

    }


    updateValues() {
        
    }

    render() {
        return (
            <table className="dimensions">
                <thead>
                    <tr >
                        <th>Project Name</th>
                        <th><CacheInputsText name="inp-shipName" triggeractionfunc={data.shipValues.setProjectName} type="text" defaultValue={this.state.defaultName} /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DİSPLACEMENT:</td>
                        <td><CacheInputsNumber name="inp-displacement" triggeractionfunc={data.shipValues.setDisplacement} type="number" defaultValue={this.state.defaultDisplacement} /></td>
                    </tr>
                </tbody>
            </table>

        );

    }
}

ReactDOM.render(
    <ClosableFrameWithCross pagename="prinsiple-dimensions-page" className="prinsiple-dimensions-frame print-page" pageheader="PRINCIPLE DIMENSIONS">
        <PrinciplDimensions />
    </ClosableFrameWithCross>,
    document.getElementById('prinsiple-dimensions-page')
);
