import React from 'react';
import AverageR2Score from './AverageR2Score';
import AverageSharpe from './AverageSharpe';
import NumberOfModels from './NumberOfModels';
function RiskManagementModelDetails() {
  return (
    <div className="riskModelDetails">
      <div className="container">
        <NumberOfModels />
        <AverageR2Score />
        <AverageSharpe />
      </div>
    </div>
  );
}

export default RiskManagementModelDetails;
