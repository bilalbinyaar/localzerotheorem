// THIS COMPONENT IS BEING USED
import React, { useEffect, memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModelDetails from '../components/models/modelsDetails/ModelDetails';
import CandleGraphCanvasjs from '../components/models/graphs/CandleGraphCanvasjs';
import { Helmet } from 'react-helmet';
import Backtest from './Backtest';
const Models = () => {
  const location = useLocation();
  const name = location.pathname.replace('/', '').replace(/-/g, '_');

  const [model_name, set_model_name] = useState(name);
  if (name !== model_name) {
    set_model_name(name);
  }

  // SCROLL TO TOP
  const locationToTop = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationToTop.pathname]);
  // SCROLL TO TOP
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Forecast Model Details</title>
        <meta
          name="description"
          content="Detailed information about this AI-based Bitcoin prediction model's current position and historical performance including several metrics like sharpe, r2, sortino, win/loss etc."
        />
      </Helmet>
      <ModelDetails model_name={model_name} />
      <CandleGraphCanvasjs model_name={model_name} />
      <Backtest model_name={model_name} />
    </React.Fragment>
  );
};

export default memo(Models);
