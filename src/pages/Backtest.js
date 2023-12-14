// THIS COMPONENT IS BEING USED
import React from 'react';
import BacktestComponent from '../components/backtest/BacktestComponent';
import { Helmet } from 'react-helmet';

const Backtest = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Models Backtest</title>
        <meta name="description" content="Models Backtest" />
      </Helmet>
      <BacktestComponent model_name={props.model_name} Flag={props.Flag} />
    </React.Fragment>
  );
};

export default Backtest;
