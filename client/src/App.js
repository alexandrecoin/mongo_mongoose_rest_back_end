import React from 'react';
import './App.css';
import MealCategories from './components/MealCategories';
import Layout from './layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout />
        <Route exact path="/" component={MealCategories} />
      </div>
    </Router>
  );
}

export default App;
