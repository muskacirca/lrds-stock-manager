import React from 'react'
import {Link} from 'react-router'


import {
    toggleClassInBody
} from '../../utils/utils'

class NavBarBox extends React.Component {

    handleClick(e) {
        e.preventDefault()
        var className = 'with--sidebar'
        toggleClassInBody(className)

    }

    render() {

        var cart = this.props.shoppingCart
        
        return  <header className="header">
                    <a href="#" className="header__icon" id="header__icon"
                       onClick={this.handleClick.bind(this)} href="#">
                    </a>

                    <a href="#" className="header__logo link-active" href="#">
                        <img  src="/style/images/lrds-logo-50px.png"/>
                    </a>
                    <nav className="menu">
                        <Link to="/stock" activeClassName="link-active">Stock</Link>
                        <Link to="/event" activeClassName="link-active">Event</Link>
                    </nav>
                    <nav className="menu-right">
                        <Link to="/logout" activeClassName="link-active"><i className="fa fa-2x fa-power-off"></i></Link>
                    </nav>
                    <nav className="menu-right">
                        {cart}
                    </nav>

                    <nav className="menu-right">
                        <Link to="/admin/create" activeClassName="link-active"><i className="fa fa-2x fa-cog" aria-hidden="true"></i></Link>
                    </nav>

                    <div className="menu-right">
                        {this.props.user.login}
                    </div>
                </header>


    }
}

export default NavBarBox

// <nav className="navbar navbar-inverse navbar-fixed-top">
//     <div className="container-fluid">
//     <div className="header__icon navbar-header">
//     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
// data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
//     <span className="sr-only">Toggle navigation</span>
// <span className="icon-bar"></span>
//     <span className="icon-bar"></span>
//     <span className="icon-bar"></span>
//     </button>
//     </div>
//     <a className="navbar-brand" href="#">LRDS</a>
//
//     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//     <ul className="nav navbar-nav">
//     <li role="presentation">
//     <Link to="/" activeClassName="link-active">Home</Link>
//     </li>
//     <li role="presentation">
//     <Link to="/stock" activeClassName="link-active">Stock</Link>
//     </li>
//     <li role="presentation">
//     <Link to="/admin/create" activeClassName="link-active">Admin</Link>
//     </li>
//     </ul>
//     </div>
//     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//
//     </div>
//     </div>
//     </nav>
