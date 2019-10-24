import React from 'react';
import Login from './components/Login';
import Meals from './components/Meals';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  state = {
    loggedIn: false,
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() =>
              this.state.loggedIn ? <Redirect to="/meals" /> : <Redirect to="/login" />
            }
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/meals" component={Meals} />
        </div>
      </Router>
    );
  }
}

export default App;
