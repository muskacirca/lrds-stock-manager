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
                       onClick={this.handleClick.bind(this)} href="#"></a>

                    <div href="#" className="header__logo link-active" href="#">
                        LRDS
                    </div>
                    <nav className="menu">
                        <Link to="/" activeClassName="link-active">Home</Link>
                        <Link to="/stock" activeClassName="link-active">Stock</Link>
                        <Link to="/admin/create" activeClassName="link-active">Admin</Link>
                    </nav>
                    <div className="menu-right">
                        {cart}
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
