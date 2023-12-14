// THIS COMPONENT IS BEING USED
import React from 'react';
import { Helmet } from 'react-helmet';
import CompareComponentStrategies from '../components/compare/CompareComponentStrategies';
const CompareStrategies = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Comparison between Models</title>
        <meta
          name="description"
          content="Compare the information and performance metrics of different AI and ML models used in forecasting by applying different filters on time horizons, cryptocurrencies, and model names."
        />
      </Helmet>
      <CompareComponentStrategies />
    </React.Fragment>
  );
};

export default CompareStrategies;
