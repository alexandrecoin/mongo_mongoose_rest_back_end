import React, { Fragment, useState, useEffect } from 'react';

const Meals = () => {
  const [meals, setMeals] = useState([]);

  async function fetchData() {
    const result = await fetch('/meals');
    const data = await result.json();
    console.log(data);
    setMeals(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {meals.map((meal, index) => {
        return <p key={index}>{meal.name}</p>;
      })}
    </Fragment>
  );
};

export default Meals;
