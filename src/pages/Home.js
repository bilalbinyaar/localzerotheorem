import React, { useState, useEffect, memo } from "react";
import Forecasts from "../components/forecasts/Forecasts";
import ModelDataGrid from "../components/modelDataGrid/ModelDataGrid";
import Overview from "../components/overview/Overview";
import Horizon from "../components/timeHorizon/Horizon";
import { useStateContext } from "../ContextProvider";
import { Helmet } from 'react-helmet';


const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
        <Helmet>
          <title>Zero Theorem | An Economic Framework for Valuing (forecasting) Bitcoin Price</title>
          <meta
            name="description"
            content="An economic framework for the prediction/forecast of Bitcoin and other cryptocurrencies using AI and ML models with a comprehensive evaluation of back and forward tests."
          />
           <link rel="canonical" href="https://zerotheorem.com/" />
        </Helmet>

      <Forecasts />
      <ModelDataGrid />
      <Overview />
    </React.Fragment>
  );
};

export default memo(Home);
