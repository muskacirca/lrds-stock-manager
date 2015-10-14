import React from 'react'
import ReactDOM from 'react-dom'

import {Router, IndexRoute, Route} from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'

import LoginBox from './components/login.js'
import StockComponent from './components/stock.js'
import Profile from './components/profile.js'
import Event from './components/event.js'
import NavBarBox from './components/navbar.js'

import authService from './components/controllers/auth.js'

class App extends React.Component{

  constructor(props) {
    super(props);
  }


  componentWillMount() {
  }

  render() {
    return (
      <div>
        <NavBarBox />
        <div>
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
    <IndexRoute component={App} />
    <Route path="profile" component={Profile} onEnter={requireAuth}/>
    <Route path="stock" component={Stock} onEnter={requireAuth}/>
    <Route path="event" component={Event} onEnter={requireAuth}/>
    <Route path="login" component={LoginBox}/>
    <Route path="logout" component={LoginBox} onEnter={logout} />
  </Route>
)

ReactDOM.render(<Router history={createMemoryHistory()}>{routes}</Router>,  document.getElementById('content'))

