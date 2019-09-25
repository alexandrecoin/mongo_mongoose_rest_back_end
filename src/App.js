import React from 'react';
import './App.css';
import MealCategories from './components/MealCategories';
import Layout from './layout';

function App() {
  return (
    <div className="App">
      <Layout />
      <MealCategories />
    </div>
  );
}

export default App;
