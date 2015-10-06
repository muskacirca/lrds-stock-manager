var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var PageHeader = ReactBootstrap.PageHeader;

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
var LoginBox = React.createClass({

  render: function() {
    return (
        <div className="well" style={wellStyles}>
          <Header label="Please login"/>
          <LoginForm/>
        </div>
    );
  }


});

var Header = React.createClass({

  render: function() {
    return (
        <PageHeader>{this.props.label}</PageHeader>
    );
  }
});

var LoginForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    return;
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <InputField type="text" pla="login" reference="login" /><br/>
        <InputField type="password" pla="password" reference="password" /><br/>
        <SubmitButton value="Login"/>
          <a href="/products">Products</a>
      </form>
    );
  }
});


var InputField = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  validationState() {
    var length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  render() {
    return (
        <Input type={this.props.type}
            value={this.state.value}
            placeholder={this.props.pla}
            label={this.props.label}
            bsStyle={this.validationState()}
            hasFeedback
            ref={this.props.reference}
            groupClassName="group-class"
            labelClassName="label-class"
            onChange={this.handleChange}></Input>
    );
  }
});

var SubmitButton = React.createClass({
  render: function() {
    return (
          <Button bsStyle="primary" bsSize="large" block>{this.props.value}</Button>
    );
  }
});


React.render(
  <LoginBox/>,
  document.getElementById('content')
)
