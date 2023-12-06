import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useStateContext } from "../../../ContextProvider";
import { ClassNames } from "@emotion/react";

am4core.useTheme(am4themes_animated);

const AreaLineChart = (props) => {
  const { negative_graph_cache, Set_negative_graph_cache } = useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState(null);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    try {
      if (!negative_graph_cache[props.model_name]) {
        // console.log("I received model name for graph -->", props.model_name);

        fetch(
          link + `/${props.model_name}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            // console.log("I received data for each series -->", data["response"]);
            var cum_pnl = [];
            for (var index = 0; index < data["response"].length; index++) {
              cum_pnl.push({
                category: new Date(
                  parseInt(data["response"][index].ledger_timestamp) * 1000
                ).toLocaleString(),
                value: parseInt(data["response"][index].pnl_sum),
              });
            }

            // await delay(1000);
            if (cum_pnl.length != 0) {
              set_cum_pnl(cum_pnl);
              Set_negative_graph_cache({ [props.model_name]: cum_pnl });
            }
            // console.log("Cum pnl -->", cum_pnl);
          })
          .catch((err) => console.log(err));
      } else {
        set_cum_pnl(negative_graph_cache[props.model_name]);

        // console.log(
        //   "I am using cached value for straight spline graph -->",
        //   straight_spline_graph_cache[props.model_name]
        // );
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, []);

  useEffect(() => {
    try {
      if (cummulative_pnl.length != 0) {
        set_data_for_pnl_graph(cummulative_pnl);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [cummulative_pnl]);

  useEffect(() => {
    try {
      if (data_for_pnl_graph == null) {
        return;
      } else {
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = data_for_pnl_graph;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;
        categoryAxis.renderer.labels.template.rotation = 315;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
        series.strokeWidth = 2;
        series.tensionX = 0.8;
        series.fillOpacity = 0.5;

        // Set colors based on values
        let range = valueAxis.createSeriesRange(series);
        range.value = 0;
        range.endValue = Number.MAX_VALUE;
        range.contents.stroke = am4core.color("#16C784");
        range.contents.fill = am4core.color("#16C784");
        range.contents.fillOpacity = 0.5;

        range = valueAxis.createSeriesRange(series);
        range.value = -Number.MAX_VALUE;
        range.endValue = 0;
        range.contents.stroke = am4core.color("#FF2E2E");
        range.contents.fill = am4core.color("#FF2E2E");
        range.contents.fillOpacity = 0.5;

        //disable vertical lines
        categoryAxis.renderer.grid.template.strokeWidth = 0;

        // Enable ClassNames for CSS
        am4core.options.autoSetClassName = true;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomXY";

        return () => {
          chart.dispose();
        };
      }
    } catch (error) {
      console.log("Error occured");
    }
  }, [data_for_pnl_graph]);

  return (
    <div
      className="container"
      id="chartdiv"
      style={{ width: "100%", height: "600px" }}
    ></div>
  );
};

export default AreaLineChart;
