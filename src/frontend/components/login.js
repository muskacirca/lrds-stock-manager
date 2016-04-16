import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import Router from 'react-router'
import auth from './utils/Auth.js'
import AuthService from './utils/AuthService.js'

class LoginBox extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <div className="col-sm-2 col-sm-offset-5 col-md-2 col-md-offset-5 main">
                <Header label="Please login"/>
                <LoginForm />
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
        this.state = {error: false}
    }

    //handleSubmit(e) {
    //    e.preventDefault();
    //
    //    var email = ReactDOM.findDOMNode(this.refs.loginField).value
    //    var pass = ReactDOM.findDOMNode(this.refs.passwordField).value
    //
    //    auth.login(email, pass, (loggedIn) => {
    //        if (!loggedIn) {
    //            console.log("not authenticated")
    //            return this.setState({error: true})
    //        }
    //
    //        this.context.router.push("/")
    //    })
    //
    //    return;
    //}

    handleSubmit(e) {

        e.preventDefault();

        var email = ReactDOM.findDOMNode(this.refs.loginField).value
        var password = ReactDOM.findDOMNode(this.refs.passwordField).value

        AuthService.login(email, password)
            .then((loggedIn) => {

                if (!loggedIn) return this.setState({error: true});
                const { location } = this.props;

                if (location && location.state && location.state.nextPathname) {
                    this.context.router.replace(location.state.nextPathname)
                } else {
                    this.context.router.replace('/')
                }
            });
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

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default LoginBox
