import React from 'react';
import CurrentPortfolio from '../components/currentPortfolio/CurrentPortfolio';
import RiskManagementModelDetails from '../components/riskManagementModelDetails/RiskManagementModelDetails';
import PortfolioDaily from '../components/win_loss_rate/PortfolioDaily';
const RiskManagement = () => {
  return (
    <div className="risk-management">
      <div className="container">
        <div className="top-div">
          <h1>Risk Management</h1>
        </div>
      </div>
      <CurrentPortfolio />
      <RiskManagementModelDetails />
      <PortfolioDaily />
    </div>
  );
};

export default RiskManagement;
