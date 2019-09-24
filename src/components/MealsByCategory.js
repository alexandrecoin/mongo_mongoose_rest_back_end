import React, { Fragment } from 'react';
import DetailedMeal from './DetailedMeal';

class MealsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealsByCategory: [],
      detailedMealUrl: '',
    };
  }

  fetchData = () => {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((data) => this.setState({ mealsByCategory: data.meals }));
  };

  handleClick = async (e, data) => {
    this.setState({
      detailedMealUrl: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.idMeal}`,
    });
    console.log(this.state.detailedMealUrl);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  };

  componentDidMount = () => {
    this.fetchData();
  };

  render() {
    const { mealsByCategory, detailedMealUrl } = this.state;
    return (
      <Fragment>
        {mealsByCategory.map((mealByCategory, index) => (
          <div key={mealByCategory.idMeal}>
            <p>{mealByCategory.strMeal}</p>
            <img
              alt="meal"
              src={mealByCategory.strMealThumb}
              style={{ maxWidth: '100px' }}
              onClick={(e) => this.handleClick(e, mealByCategory)}
            ></img>
          </div>
        ))}
        {detailedMealUrl.length > 0 ? (
          <DetailedMeal detailedMealUrl={detailedMealUrl} />
        ) : null}
      </Fragment>
    );
  }
}

export default MealsByCategory;
