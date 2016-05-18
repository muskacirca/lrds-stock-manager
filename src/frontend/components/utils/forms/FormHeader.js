import React from 'react'
import Alert from '../../utils/Alert'

class FormHeader extends React.Component {

    constructor(props) {
        super(props)
    }

    onSave(e) {
        this.props.onSave(e)
    }

    render() {
        
        var saveButton = this.props.onSave 
            ? (<div className="sub-bar-component-centered col-md-1 col-sm-2 col-xs-1">
                    <button className="btn btn-primary" type="submit" onClick={this.onSave.bind(this)}>Save</button>
                </div>)
            : null;
        
        var content = this.props.content
                ?(<div className="sub-bar-component-centered col-md-1 col-sm-2 col-xs-1">
                    {this.props.content}
                  </div>)
            : null;
        
        return  <div className="sub-bar row">
                    <div className="col-md-5 col-md-offset-2 col-sm-6 col-xs-8">
                        <h2>{this.props.title}</h2>
                        <h5>{this.props.subTitle}</h5>
                    </div>
                    <div className="sub-bar-component-centered align-right col-md-3 col-sm-4 col-xs-1">
                        <Alert alert={this.props.alert} />
                    </div>
                    {content}
                    {saveButton}
                </div>

    }
}

export default FormHeader

FormHeader.propTypes = { 
    title: React.PropTypes.node,
    subTitle: React.PropTypes.node
};
