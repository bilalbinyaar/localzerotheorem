import React from 'react';
import CompareComponent from '../components/compare/CompareComponent';
import { Helmet } from 'react-helmet';

const Compare = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Comparison between Models</title>
        <meta
          name="description"
          content="Compare the information and performance metrics of different AI and ML models used in forecasting by applying different filters on time horizons, cryptocurrencies, and model names."
        />
      </Helmet>
      <CompareComponent />
    </React.Fragment>
  );
};

export default Compare;
