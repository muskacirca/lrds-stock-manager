var Example = React.createClass({
    getInitialState: function()
    {
        return ({
            data: 'test'
        });
    },
    render: function() {
        return (
            <div>
                <C1 onUpdate={this.onUpdate}/>
                <C2 data={this.state.data}/>
            </div>
        )
    },
    onUpdate: function(val){
        this.setState({
            data: val
        });
    }
});

var C1 = React.createClass({
    render: function()
    {
        return (
            <div>
                <input type="text" ref="myInput" />
                <input type="button" onClick={this.update} value="Update C2"/>
            </div>
        )
    },
    update: function()
    {
        var theVal = this.refs.myInput.getDOMNode().value;
        this.props.onUpdate(theVal);
    }
});

var C2 = React.createClass({
    render: function()
    {
        return (
            <div>
                {this.props.data}
            </div>
        )
    }
});

React.renderComponent(<Example/>, document.body);
