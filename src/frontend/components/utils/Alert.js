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
        
        console.log("")

        if(this.state.alert !== undefined) {

            var commonAlert = "alert "
            var alertType = this.state.alert.type == "success" ? "alert-success" : "alert-danger"
            return  <Expire delay={this.state.delay} callback={this.onAlertDismiss.bind(this)}>
                        <div className={commonAlert + alertType} role="alert">
                            {this.state.alert.message}
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

Alert.defaultProps = { delay: 30000, alert: undefined };

export default Alert
