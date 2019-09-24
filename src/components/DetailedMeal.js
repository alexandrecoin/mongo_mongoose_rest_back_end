import React, { Fragment } from 'react';

class DetailedMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedMeal: [],
    };
  }

  fetchData = () => {
    fetch(this.props.detailedMealUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ detailedMeal: data.meals }));
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.detailedMealUrl !== this.props.detailedMealUrl) {
      this.fetchData();
    }
  };

  componentDidMount = () => {
    this.fetchData();
  };

  render() {
    const { detailedMeal } = this.state;
    console.log(detailedMeal[0])
    return (
      <Fragment>
        {detailedMeal.length > 0 ? <div>{detailedMeal[0].strArea}</div> : null}
      </Fragment>
    );
  }
}

// OBJECTIF : Réussir à display la data du detailedMeal quand on clique sur l'image du composant parent

export default DetailedMeal;
