import React from 'react'
import {Link} from 'react-router'

class NavBarBox extends React.Component{

    render() {
        return (
          <nav className="navbar navbar-inverse navbar-fixed-top">
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
                    <Link to="/jeestock" activeClassName="link-active">Home</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/jeestock/profile" activeClassName="link-active">Profile</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/jeestock/stock" activeClassName="link-active">Stock</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/jeestock/event" activeClassName="link-active">Events</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/jeestock/logout" activeClassName="link-active">Log out</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}

export default NavBarBox
