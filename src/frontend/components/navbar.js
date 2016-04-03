import React from 'react'
import {Link} from 'react-router'

class NavBarBox extends React.Component{

    render() {
        return (
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
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
                    <Link to="/stock" activeClassName="link-active">Stock</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/admin/create" activeClassName="link-active">Admin</Link>
                  </li>
                </ul>
                  <ul className="nav navbar-nav">
                      <li role="presentation">
                          <Link to="/admin/create" className="navbar-right" activeClassName="link-active">
                              <i className="fa fa-2x fa-shopping-cart"></i>
                          </Link>

                      </li>
                  </ul>
              </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                </div>
            </div>
          </nav>
        )
    }
}

export default NavBarBox
