var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var MenuItem = ReactBootstrap.MenuItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var NavItem = ReactBootstrap.NavItem;

var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;

var Glyphicon = ReactBootstrap.Glyphicon;

var NavBarBox = React.createClass({

    getInitialState() {
        return {
            isModalOpen: false
        };
    },

    handleToggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
        this.showModal
    },


    showModal() {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return {modalInstance};
    },

    
    render: function() {
        return (
            <Navbar brand="LRDS" fixedBottom>
                
                <Nav>
                    <NavItem eventKey={2} onClick={this.handleToggle}>Add</NavItem>
                    <NavDropdown eventKey={3} title="Parameters" id="basic-nav-dropdown">
                        <MenuItem eventKey="1">User management</MenuItem>
                        <MenuItem eventKey="2">Stock management</MenuItem>
                        <MenuItem eventKey="3">Todo list</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Profile modification</MenuItem>
                    </NavDropdown>
                </Nav>
                <SearchInput/>
            </Navbar>
        );
    }
});

var SearchInput = React.createClass({
    render: function() {
        return (
            <form action="">
                <div className="nav navbar-nav">
                    <Input class type="text" placeholder="search" />
                </div>
                <div className="nav navbar-nav">
                    <Button href={this.props.href}><Glyphicon glyph="search" /> Search</Button>
                </div>
            </form>
        );
    }
});

var modalInstance = React.createClass({
    render: function() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body>
                    One fine body...
                    </Modal.Body>
        
                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
        
                </Modal.Dialog>
            </div>
        );
    }
});

React.render(
    <NavBarBox/>,
    document.getElementById('navbar')
)