import React from 'react';
import Login from './components/Login';
import Meals from './components/Meals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" component={Login} />
        <Route exact path="/meals" component={Meals} />
      </div>
    </Router>
  );
}

export default App;
