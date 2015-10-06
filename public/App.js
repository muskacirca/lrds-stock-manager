import React from 'react'
import Router from 'react-router'
import {Route, Link, RouteHandler} from 'react-router'

var App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="login">Login</Link>

        <RouteHandler/>
      </div>
    );
  }
});

var Login = React.createClass({

  render() {
    return(<div>Welcome to login</div>);
  }
});


let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={Login}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

