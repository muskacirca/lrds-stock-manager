import React from 'react'
import {Link} from 'react-router'


import {
    toggleClassInBody
} from '../../utils/utils'

class NavBarBox extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isUserMenuOpened: false
        }
    }

    handleClick(e) {
        e.preventDefault()
        var className = 'with--sidebar'
        toggleClassInBody(className)
        
    }

    safehandleClick() {
        var className = 'with--sidebar'
        toggleClassInBody(className)

    }

    toggleUserMenuOpening() {
        this.setState({isUserMenuOpened: !this.state.isUserMenuOpened})
    }

    render() {

        var cart = this.props.shoppingCart
        
        var userMenuStyle = this.state.isUserMenuOpened ? {display: "block"} : {}
        
        return  <header className="header">
                    <a href="#" className="header__icon" id="header__icon"
                       onClick={this.handleClick.bind(this)} href="#">
                    </a>

                    <a href="#" className="header__logo link-active" href="#">
                        <img  src="/style/images/lrds-logo-50px.png"/>
                    </a>
                    <nav className="menu">
                        <Link to="/dashboard" activeClassName="link-active" onClick={this.safehandleClick.bind(this).bind(this)}>
                            Dashboard
                        </Link>
                        <Link to="/stock" activeClassName="link-active" onClick={this.safehandleClick.bind(this).bind(this)}>
                            Stock
                        </Link>
                        <Link to="/event" activeClassName="link-active" onClick={this.safehandleClick.bind(this).bind(this)}>
                            Event
                        </Link>
                        <Link to="/admin/create" activeClassName="link-active" onClick={this.safehandleClick.bind(this).bind(this)}>
                            Admin
                        </Link>
                    </nav>
                   
                    <div className="menu-right">
                        <div onClick={this.toggleUserMenuOpening.bind(this)} className="pointer navbar-dropdown">
                            <div>
                                <i className="fa fa-2x fa-user" aria-hidden="true" />
                                {' '}hello{' '}{this.props.user.login}{' '}!
                            </div>
                        </div>
                    </div>
                    <div style={userMenuStyle} className="navbar-dropdown-content">
                        <div className="navbar-dropdown-group">
                            <Link to="/admin/create" onClick={this.toggleUserMenuOpening.bind(this)}
                                  activeClassName="link-active">
                                
                                <div className="navbar-dropdown-list">
                                    <div className="__logo__">
                                        <i className="fa fa-2x fa-cog" aria-hidden="true"/>
                                    </div>
                                    <div className="__text__">Settings</div>
                                </div>
                            </Link>
                            <Link to="/logout" onClick={this.toggleUserMenuOpening.bind(this)}
                                  activeClassName="link-active">

                                <div className="navbar-dropdown-list">
                                    <div className="__logo__">
                                        <i className="fa fa-2x fa-power-off" />
                                    </div>
                                    <div className="__text__">Logout</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <nav className="menu-right">
                        {cart}
                    </nav>
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
