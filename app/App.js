import React from 'react'
import Router from 'react-router'
import {Lifecycle} from 'react-router'
import {Route, Link, RouteHandler, IndexRoute} from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'

import LoginBox from './components/login.js'
import StockComponent from './components/stock.js'
import Profile from './components/profile.js'
import Event from './components/event.js'

import authService from './components/auth.js'

class App extends React.Component{

  constructor(props) {
    super(props);
  }


  componentWillMount() {
  }

  render() {
    return (
      <div className="mainContainer">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">LRDS</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li role="presentation">
                  <Link to="/" activeClassName="link-active">Home</Link>
                </li>
                <li role="presentation">
                  <Link to="/profile" activeClassName="link-active">Profile</Link>
                </li>
                <li role="presentation">
                <Link to="/stock" activeClassName="link-active">Stock</Link>
                </li>
                <li role="presentation">
                  <Link to="/event" activeClassName="link-active">Events</Link>
                </li>
                <li role="presentation">
                <Link to="/logout" activeClassName="link-active">Log out</Link>
                </li>
              </ul>

              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
          <div>

          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


var Stock = React.createClass({
  render: function() {
    return ( <StockComponent url="products.json" />);
  }
});

function requireAuth(nextState, replaceState) {
  if(!authService.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}

function logout(nextState, replaceState) {
    authService.logout()
    replaceState({ nextPathname: nextState.location.pathname }, '/')
}


let routes = (
  <Route path="/" component={App}>
    <Route path="profile" component={Profile} onEnter={requireAuth}/>
    <Route path="stock" component={Stock} onEnter={requireAuth}/>
    <Route path="event" component={Event} onEnter={requireAuth}/>
    <Route path="login" component={LoginBox}/>
    <Route path="logout" component={LoginBox} onEnter={logout} />
  </Route>
)

React.render(<Router history={createMemoryHistory()}>{routes}</Router>,  document.getElementById('app'))

