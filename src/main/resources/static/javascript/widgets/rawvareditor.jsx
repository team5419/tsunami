class RawVarEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetName: this.props.variables.target,
            updateName: this.props.variables.target,
            targetValue: SocketHandler.getVariable(this.props.variables.target) || ""
        };
        this.callbackId = SocketHandler.addVariableListener(this.state.targetName, (value) => this.updateState(value));
    }

    updateState(value) {
        this.setState({targetValue: value || ""});
    }

    onSettingsSave() {
        let widget = PageUtils.getPageWidget(this.props.id);
        let newVar = $('#' + this.props.id + '_settings_variable').val();
        widget.variables.target = newVar;
        let success = PageUtils.setPageWidget(this.props.id, widget);
        SocketHandler.removeVariableListener(this.state.targetName);
        // do something with success, and also update event listener for variable changes
        this.setState({
            targetName: newVar,
            updateName: newVar,
            targetValue: SocketHandler.getVariable(newVar)
        });
        this.callbackId = SocketHandler.addVariableListener(this.state.updateName, (value) => this.updateState(value));
    }

    onVarSave() {
        let newVal = $('#' + this.props.id + '_var_display').val();
        SocketHandler.setVariable(this.state.targetName, newVal);

    }

    onFieldEdit(e) {
        this.setState({targetValue: e.target.value});
    }

    onSettingsEdit(e) {
        this.setState({updateName: e.target.value});
    }

    render() {

        let input;
        if(typeof $('#' + this.props.id + '_var_display').val() != "boolean"){
            input = <input className='form-control mb-2' type='text' id={this.props.id + '_var_display'} placeholder="value" value={this.state.targetValue} onChange={(e) => this.onFieldEdit(e)} />;
        }else{
            input = <div id={this.props.id + '_var_display'} class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">True</a>
                        <a class="dropdown-item" href="#">False</a>
                    </div>;
        }
        var vars = ["PID", "DEEK", "TEST"];

        $('#' + this.props.id + '_settings_variable').autocomplete({
            nameProperty: 'name',
            valueField: "#hidden-field",
            dataSource: vars
        });
        return (
            <WidgetContainer title={this.props.title} width={this.props.width} height={this.props.height} id={this.props.id}>
                <WidgetBody title={this.props.title} id={this.props.id}>
                    {input}
                    <button className='btn btn-primary' id={this.props.id + '_body_submit'} onClick={() => this.onVarSave()} >Submit</button>
                </WidgetBody>
                <WidgetSettings title={this.props.title} id={this.props.id} onSave={() => this.onSettingsSave()}>
                    <input className='form-control mb-2' type='text' id={this.props.id + '_settings_variable'} placeholder="variable" value={this.state.updateName} onChange={(e) => this.onSettingsEdit(e)} />
                    <input type="hidden" id="hidden-field"></input>
                </WidgetSettings>
            </WidgetContainer>
        );
    }
}

// make sure to do this for every widget
PageUtils.addWidgetClass('RawVarEditor', RawVarEditor);