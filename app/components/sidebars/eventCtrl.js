import React from 'react'
import Router from 'react-router'
var Button = ReactBootstrap.Button;
var PageHeader = ReactBootstrap.PageHeader;
import auth from './auth.js'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

class EventSideBar extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.history = props.history
    }

    render() {
        return (
            <div style={wellStyles}>
                <Header label="Please login"/>
                <LoginForm history={this.history}/>
            </div>);
    }
}

export default LoginBox
