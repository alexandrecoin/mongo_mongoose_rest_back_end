import React, { Fragment } from 'react';
import MealsByCategory from './MealsByCategory';

class MealCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      url: '',
    };
  }

  handleClick = (e, data) => {
    e.preventDefault();
    this.setState({
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data.strCategory}`,
    });
  };

  componentDidMount = async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data.categories }));
  };

  render() {
    const { categories, url } = this.state;
    return (
      <Fragment>
        <ul>
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={(e) => this.handleClick(e, category)}
            >
              {category.strCategory}
            </button>
          ))}
        </ul>
        {url.length > 0 ? <MealsByCategory url={url} /> : null}
      </Fragment>
    );
  }
}

export default MealCategories;
