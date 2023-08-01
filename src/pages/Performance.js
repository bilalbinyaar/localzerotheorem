import React, { useEffect } from "react";
import Portfolio from "../components/portfolio/Portfolio";
import PerformanceGraphs from "../components/performanceGraph/PerformanceGraphs";
import PerformanceDataGrid from "../components/performanceGrid/PerformanceDataGrid";
import CurrentPortfolio from "../components/currentPortfolio/CurrentPortfolio";
import HeatmapChart from "../components/models/graphs/HeatmapChart";
import LivePNL from "../components/livepnl/LivePNL";
import PerformanceBarChart from "../graphs/PerformanceBarChart";
import ScatterPlotApexCharts from "../components/models/graphs/ScatterPlotApexCharts";
import PerformanceLineCharts from "../components/performanceLineCharts/PerformanceLineCharts";
import PortfolioDaily from "../components/portfolioDaily/PortfolioDaily";
import MarketRate from "../components/marketRate/MarketRate";
import { Helmet } from "react-helmet";
import PortfolioDaily2 from "../components/win_loss_rate/PortfolioDaily";
// import * as XLSX from "xlsx";

const Performance = () => {
  // function convertToExcel(jsonData1, jsonData2) {
  //   const workbook = XLSX.utils.book_new();

  //   const worksheet1 = XLSX.utils.json_to_sheet(jsonData1);
  //   XLSX.utils.book_append_sheet(workbook, worksheet1, "Sheet 1");

  //   const worksheet2 = XLSX.utils.json_to_sheet(jsonData2);
  //   XLSX.utils.book_append_sheet(workbook, worksheet2, "Sheet 2");

  //   const workbookOutput = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });

  //   const fileName = "data.xlsx";
  //   const blob = new Blob([workbookOutput], {
  //     type: "application/octet-stream",
  //   });

  //   if (typeof window.navigator.msSaveBlob !== "undefined") {
  //     // For IE and Edge
  //     window.navigator.msSaveBlob(blob, fileName);
  //   } else {
  //     // For other browsers
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", fileName);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // }

  // useEffect(() => {
  //   const json1 = [
  //     { name: "John", age: 25, city: "New York" },
  //     { name: "Jane", age: 30, city: "Los Angeles" },
  //   ];

  //   const json2 = [
  //     { name: "Bob", age: 35, city: "Chicago" },
  //     { name: "Alice", age: 40, city: "San Francisco" },
  //   ];

  //   convertToExcel(json1, json2);
  // }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | A proprietary Bitcoin trading fund</title>
        <meta
          name="description"
          content="An economic framework for the prediction/forecast of Bitcoin and other cryptocurrencies using AI and ML models with a comprehensive evaluation of back and forward tests."
        />
        {/* CANONICAL TAG */}
        <link rel="canonical" href="https://zerotheorem.com/" />
      </Helmet>
      <Portfolio />
      <PortfolioDaily />
      <MarketRate />
      <LivePNL />
      {/* <PortfolioDaily2 /> */}
      {/* <PerformanceGraphs /> */}
      <PerformanceDataGrid />

      {/* <CurrentPortfolio /> */}
      {/* <ScatterPlotApexCharts /> */}
      {/* <PerformanceLineCharts /> */}
      {/* <HeatmapChart model_name={"strategy_1"} /> */}
      {/* <PerformanceBarChart model_name={"live_pnls"} /> */}
    </React.Fragment>
  );
};

export default Performance;
