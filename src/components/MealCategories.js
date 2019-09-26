import React, { Fragment, useState, useEffect } from 'react';
import MealsByCategory from './MealsByCategory';

const MealCategories = () => {

  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState('');

  async function fetchApiData() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const data = await response.json()
    setCategories(data.categories)
  }
  useEffect(() => {
    fetchApiData()
  }, [])

  async function handleClick(e, data) {
    e.preventDefault();
    setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data.strCategory}`);
  };

    return (
      <Fragment>
        <ul>
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={(e) => handleClick(e, category)}
            >
              {category.strCategory}
            </button>
          ))}
        </ul>
        {url.length > 0 ? <MealsByCategory url={url} /> : null}
      </Fragment>
    );
  }

export default MealCategories;
