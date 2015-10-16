import React from 'react'
import Router from 'react-router'
import auth from './controllers/auth.js'

class LoginBox extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.history = props.history
    }

    render() {
        return (
            <div className="col-sm-2 col-sm-offset-5 col-md-2 col-md-offset-5 main">
                <Header label="Please login"/>
                <LoginForm history={this.history}/>
            </div>);
    }
}

class Header extends React.Component {

    render() {
        return <div>{this.props.label}</div>
    }
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.history = props.history,
        this.state = {error: false}
    }

    handleSubmit(e) {
        e.preventDefault();

        var email = React.findDOMNode(this.refs.loginField).value
        var pass = React.findDOMNode(this.refs.passwordField).value

        console.log("email: " + email)
        console.log("pass: " + pass)

        auth.login(email, pass, (loggedIn) => {
            if (!loggedIn) {
                console.log("not authenticated")
                return this.setState({error: true})
            }

            console.log("authenticated, redirecting to profile");
            this.history.replaceState(null, '/profile')
        })

        return;
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">@</span>
                    <input type="text" className="form-control" ref="loginField" placeholder="login"
                           aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">?</span>
                    <input type="password" className="form-control" ref="passwordField" placeholder="password"
                           aria-describedby="basic-addon1"/>
                </div>
                <SubmitButton label="Login"/>
                {this.state.error && (
                    <p>Bad login information</p>
                )}
            </form>
        );
    }
}

class SubmitButton extends React.Component {
    render() {
        return <button type="submit" className="btn btn-default primary">{this.props.label}</button>
    }
}

export default LoginBox
