import React,  {Fragment} from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.email);
    event.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </label>
          <label>
            password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}

export default Login;
