import React from 'react'
import { Router, Route } from 'react-router'

var Login = require('./login');
var Products = require('./products');

class StockManagerRouter extends React.component {

  //<Route path="inbox" component={Inbox}>
  //  <Route path="messages/:id" component={Message} />
  //</Route>
  render() {
    return (
      <Router>
        <Route path="/" component={Login}>
          <Route path="products" component={Products} />
        </Route>
      </Router>
    );
  }
}

export default StockManagerRouter
