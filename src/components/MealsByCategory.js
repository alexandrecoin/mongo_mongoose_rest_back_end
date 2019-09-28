import React, { Fragment, useState, useEffect } from 'react';
import DetailedMeal from './DetailedMeal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const MealsByCategory = (url) => {
  const [mealsByCategory, setMealsByCategory] = useState([]);
  const [detailedMealUrl, setDetailedMealUrl] = useState('');

  async function fetchApiData(props) {
    const response = await fetch(props.url);
    const data = await response.json();
    setMealsByCategory(data.meals);
  }

  async function handleClick(data) {
    setDetailedMealUrl(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.idMeal}`,
    );
  }

  useEffect(
    (e, data) => {
      fetchApiData(url);
      if (data) {
        handleClick(e, data);
      }
    },
    [url],
  );

  // useEffect((e, data) => {
  //   handleClick(e, data);
  // });

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.url !== this.props.url) {
  //     this.fetchData();
  //   }
  // };

  return (
    <Fragment>
      <Grid container spacing={3}>
        {mealsByCategory.map((mealByCategory) => (
          <Grid item xs={3} key={mealByCategory.idMeal}>
            <StyledCard>
              <CardContent>
                <StyledTypo color="textSecondary" gutterBottom>
                  {mealByCategory.strMeal}
                </StyledTypo>
                <img
                  alt="meal"
                  src={mealByCategory.strMealThumb}
                  style={{ maxWidth: '100px' }}
                ></img>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleClick(mealByCategory)}
                  style={{ paddingLeft: '50px' }}
                >
                  Learn More
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
        {detailedMealUrl.length > 0 ? (
          <DetailedMeal detailedMealUrl={detailedMealUrl} />
        ) : null}
      </Grid>
    </Fragment>
  );
};

const StyledCard = styled(Card)`
  background: white;
  border-radius: 3px;
  border: 0;
  height: 100%;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  max-width: 200px;
  text-align: center;
`;

const StyledTypo = styled(Typography)`
  color: white;
`;

export default MealsByCategory;
