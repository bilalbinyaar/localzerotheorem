import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useState } from 'react';
import { useStateContext } from '../../../ContextProvider';

const TradingViewSplineArea = (props) => {
  const { spline_graph_cache, Set_spline_graph_cache, link } =
    useStateContext();
  const [data_for_pnl_graph, set_data_for_pnl_graph] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!spline_graph_cache[props.model_name]) {
      fetch(link + `/${props.model_name}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          var cum_pnl = [];
          for (var index = 0; index < data['response'].length; index++) {
            cum_pnl.push({
              time: index,
              value: parseInt(data['response'][index].pnl_sum),
            });
          }

          if (cum_pnl.length !== 0) {
            set_cum_pnl(cum_pnl);
            Set_spline_graph_cache({ [props.model_name]: cum_pnl });
          }
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(spline_graph_cache[props.model_name]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (cummulative_pnl.length !== 0) {
      set_data_for_pnl_graph(cummulative_pnl);
    }
  }, [cummulative_pnl]);

  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (data_for_pnl_graph.length === 0) {
      return;
    } else {
      if (data_for_pnl_graph && chartContainerRef.current) {
        chartRef.current = createChart(chartContainerRef.current, {
          priceLineVisible: false,
          rightPriceScale: {
            visible: false, // Set to false to hide the y-axis
          },
          handleScroll: false, // Set to false to disable scrolling
          handleZoom: false,
          handleScale: {
            visible: false,
            axisPressedMouseMove: {
              time: false,
              price: false,
            },
          },
          layout: {
            background: { color: 'transparent' }, // Set background color to transparent
            textColor: '#000000',
          },
          crosshair: {
            visible: false,
          },
          grid: {
            vertLines: {
              visible: false,
              color: '#000000', // Set vertical grid lines color to transparent
            },
            horzLines: {
              visible: false,
              color: '#000000', // Set horizontal grid lines color to transparent
            },
          },
          priceScale: {
            visible: false,
            priceLineVisible: false,
          },
          timeScale: {
            visible: false,
            borderColor: '#000000',
            borderWidth: 1, // Set a fixed width for the time scale borders
            maxBarSpacing: 20, // Set a maximum bar spacing to prevent bars from becoming too wide
          },
          containerBackground: '#000000',
        });

        // Add the area series
        const areaSeries = chartRef.current.addAreaSeries({
          priceLineVisible: false,
        });

        const mappedData = data_for_pnl_graph.map(({ time, value }) => ({
          time,
          value,
          topColor: value >= 0 ? '#16c784' : '#ff2e2e',
          lineColor: value >= 0 ? '#16c784' : '#ff2e2e',
        }));

        areaSeries.setData(mappedData);

        // Set up the viewport
        chartRef.current.timeScale().fitContent();
      }

      return () => {
        if (chartRef.current) {
          chartRef.current.remove();
        }
      };
    }
  }, [data_for_pnl_graph]);

  return (
    <div
      className="best-performing-spline"
      ref={chartContainerRef}
      style={{ width: '150px', height: '50px' }} // Set a fixed width and height
    />
  );
};

export default TradingViewSplineArea;
