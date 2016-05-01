import React from 'react'
import Expire from './Expire'
import _ from 'lodash'

class Alert extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            alert: this.props.alert,
            delay: this.props.delay
        }
    }

    onAlertDismiss() {
        this.setState({alert: undefined})
    }
    
    componentWillReceiveProps(newprops) {
        if(!_.isEqual(newprops, this.props)) {
            this.setState({alert: newprops.alert})
        }
    }
    
    renderAlert() {

        if(this.state.alert !== undefined) {

            var alertType = this.state.alert.type == "success" ? "success" : "danger"
            
            var iconClassCommon  = "alert-icon fa fa-2x "
            var iconClass  = this.state.alert.type == "success" ? "fa-check" : "fa fa-times"
            
            return  <Expire delay={this.state.delay} callback={this.onAlertDismiss.bind(this)}>
                        <div className={alertType}>
                            <i className={iconClassCommon + iconClass} aria-hidden="true"></i>
                            <span className="alert-message">
                                {'  '}
                                {this.state.alert.message}
                            </span>
                        </div>
                    </Expire>
        } else {
            return <div />
        }
    }

    render() {
        return this.renderAlert()
    }
}

Alert.propTypes = {
    delay: React.PropTypes.number,
};

Alert.defaultProps = { delay: 10000, alert: undefined };

export default Alert
