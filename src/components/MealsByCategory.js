import React, { Fragment } from 'react';
import DetailedMeal from './DetailedMeal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
          <Card
            key={mealByCategory.idMeal}
            style={{ maxWidth: '200px', textAlign: 'center' }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {mealByCategory.strMeal}
              </Typography>
              <img
                alt="meal"
                src={mealByCategory.strMealThumb}
                style={{ maxWidth: '100px' }}
              ></img>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={(e) => this.handleClick(e, mealByCategory)}
                style={{ paddingLeft: '50px' }}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
        {detailedMealUrl.length > 0 ? (
          <DetailedMeal detailedMealUrl={detailedMealUrl} />
        ) : null}
      </Fragment>
    );
  }
}

export default MealsByCategory;
