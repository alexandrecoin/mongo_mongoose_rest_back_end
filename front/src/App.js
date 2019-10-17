import React from 'react';
import Login from './components/Login';
import Meals from './components/Meals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Route path="/login" component={Login} />
          <Route exact path="/meals" component={Meals} />
        </header>
      </div>
    </Router>
  );
}

export default App;
