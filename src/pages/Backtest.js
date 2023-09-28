import React from "react";
import BacktestComponent from "../components/backtest/BacktestComponent";
import { Helmet } from "react-helmet";
import GraphsTable from "../components/models/graphsTable/GraphsTable";
import InDepth from "../components/models/inDepth/InDepth";
import RecentlyViewed from "../components/recentlyViewed/RecentlyViewed";
import CanvasjsSplineAreaChartWithRangeSelecetor from "../components/models/graphs/CanvasjsSplineAreaChartWithRangeSelecetor";
import CanvasjsDrawdownWithSliderRange from "../components/models/graphs/CanvasjsDrawdownWithSliderRange";
import CumulativePNL from "../components/models/cumulativePNL/CumulativePNL";

const Backtest = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Models Backtest</title>
        <meta name="description" content="Models Backtest" />
      </Helmet>
      <BacktestComponent model_name={props.model_name} Flag={props.Flag} />
      {/* <div>
            <CumulativePNL />
            <CanvasjsSplineAreaChartWithRangeSelecetor  />
            <InDepth  />
            <CanvasjsDrawdownWithSliderRange  />
            <GraphsTable  />
            <RecentlyViewed  />
        </div> */}
    </React.Fragment>
  );
};

export default Backtest;
