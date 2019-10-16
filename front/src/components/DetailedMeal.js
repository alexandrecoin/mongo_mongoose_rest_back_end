import React, { Fragment, useState, useEffect } from 'react';

const DetailedMeal = ({ detailedMealUrl }) => {
  const [detailedMeal, setDetailedMeal] = useState([]);

  useEffect(() => {
    async function fetchApiData() {
      const response = await fetch(detailedMealUrl);
      const data = await response.json();
      setDetailedMeal(data.meals);
    }
    fetchApiData();
  }, [detailedMealUrl]);

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.detailedMealUrl !== this.props.detailedMealUrl) {
  //     this.fetchData();
  //   }
  // };

  return (
    <Fragment>
      {detailedMeal.length > 0 ? (
        <div>
          <p>{detailedMeal[0].strArea}</p>
          <p>{detailedMeal[0].strInstructions}</p>
          <p>
            More info on :{' '}
            <a
              href={detailedMeal[0].strSource}
              alt="external_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {detailedMeal[0].strSource}
            </a>
          </p>
        </div>
      ) : null}
    </Fragment>
  );
};

// OBJECTIF : Réussir à display la data du detailedMeal quand on clique sur l'image du composant parent

export default DetailedMeal;
