import React from 'react'

class NavBarBox extends React.Component{

    render() {
        return (
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

                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" />
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
              </div>
            </div>
          </nav>
        );
    }
}

React.render(
    <NavBarBox/>,
    document.getElementById('navbar')
)
