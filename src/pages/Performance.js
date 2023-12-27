import React from 'react';
import Portfolio from '../components/portfolio/Portfolio';
import PerformanceDataGrid from '../components/performanceGrid/PerformanceDataGrid';
import LivePNL from '../components/livepnl/LivePNL';
import PortfolioDaily from '../components/portfolioDaily/PortfolioDaily';
import MarketRate from '../components/marketRate/MarketRate';
import { Helmet } from 'react-helmet';

const Performance = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | A proprietary Bitcoin trading fund</title>
        <meta
          name="description"
          content="An economic framework for the prediction/forecast of Bitcoin and other cryptocurrencies using AI and ML models with a comprehensive evaluation of back and forward tests."
        />
        <link rel="canonical" href="https://zerotheorem.com/" />
      </Helmet>
      <Portfolio />
      <PortfolioDaily />
      <MarketRate />
      <LivePNL />
      {/* <PerformanceDataGrid /> */}
    </React.Fragment>
  );
};

export default Performance;
