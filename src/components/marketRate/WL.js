// THIS COMPONENT IS BEING USED
import React from 'react';
import GradientDonut from '../models/graphs/GradientDonut';
const WL = (props) => {
  return (
    <div className="doughnut-dr">
      <h2 className="for-mb-returns">Daily Win/Loss</h2>
      <GradientDonut model_name={'DailyWinsLosses'} />
    </div>
  );
};

export default WL;
