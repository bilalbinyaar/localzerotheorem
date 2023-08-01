import React from "react";
import PerformanceGraphs from "../performanceGraph/PerformanceGraphs";
import PerformanceMultiLine from "../../graphs/PerformanceMultiLine";
import { RiCheckboxBlankFill } from "react-icons/ri";
import WinRate from "../../graphs/WinRate";
const WR = () => {
  return (
    <div className="test-dr">
      <div className="for-mb-returns">
        <h2>30d Rolling Win Rate</h2>

        {/* <div className="inter-grad-indicators">
          <div className="inter-grad-sep">
            <h3 className="c-pnl">--- </h3>
            <p className="ml-inner-inter-grad">PNL Sum</p>
          </div>
          <div className="inter-grad-sep ml-inter-grad mr-inter-grad">
            <h3 className="c-moving">--- </h3>
            <p className="ml-inner-inter-grad">30d Moving Average</p>
          </div>
        </div> */}
      </div>

      {/* <div className="overview-indicators for-performance-legends">
        <div className="indicator">
          <RiCheckboxBlankFill className="indicator-long" />
          <p>PNL Sum</p>
        </div>
        <div className="indicator">
          <RiCheckboxBlankFill className="indicator-smooth" />
          <p>Smooth PNL Sum</p>
        </div>
      </div> */}
      <WinRate model_name={"ZT1_0M24BTC1"} />
    </div>
  );
};

export default WR;
