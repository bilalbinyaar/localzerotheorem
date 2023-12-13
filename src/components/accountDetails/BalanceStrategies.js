import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../canvasjs.stock.react';
import { useStateContext } from '../../ContextProvider';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const BalanceStrategies = (props) => {
  const { theme, link } = useStateContext();

  var flag = false;

  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name !== props.model_name) {
    set_model_name(props.model_name);
  }
  const [dataPoints, setDataPoints] = useState([]);
  // eslint-disable-next-line
  const [isLoaded, setIsLoaded] = useState(false);
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  // eslint-disable-next-line
  const [colors, setColors] = useState([
    '#16C784',
    '#FF2E2E',
    '#F9A52B',
    '#4287f5',
    '#9B59B6',
    '#FFD700',
    '#00FFFF',
    '#FF1493',
    '#008080',
    '#DA6B85',
  ]);
  useEffect(() => {
    try {
      fetch(link + `/get/live_risk_metrics`, {
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
              label: data['response'][index].name,
              y: parseFloat(data['response'][index].models),
              color: colors[index],
            });
          }

          if (cum_pnl.length !== 0) {
            set_cum_pnl(cum_pnl);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [model_name]);

  useEffect(() => {
    try {
      if (cummulative_pnl.length !== 0) {
        setDataPoints(cummulative_pnl);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log('Error occured');
    }
  }, [cummulative_pnl]);
  const options = {
    theme: 'light2',
    height: 300,
    dataPointWidth: 10,

    backgroundColor: 'transparent',

    rangeSelector: {
      enabled: false,
    },

    charts: [
      {
        zoomEnabled: false,
        dataPointWidth: 30,

        axisX: {
          labelFontSize: 11,
          labelAngle: 70,
          labelFontColor: theme === 'dark-theme' ? '#fff' : '#000000',
        },
        axisY: {
          gridColor: '#43577533',
          tickColor: '#43577533',
          labelFontSize: 11,
          labelFontColor: theme === 'dark-theme' ? '#fff' : '#000000',
          crosshair: {
            enabled: false,

            snapToDataPoint: false,
            valueFormatString: '$#,###.##',
          },
        },
        toolTip: {
          shared: true,
          fontSize: 10,

          contentFormatter: (e) => {
            let content = ``;

            e.entries.forEach((entry) => {
              content += `
              <span style="color: ${entry.dataPoint.label};">Name: </span>${entry.dataPoint.label}<br/>
              <span style="color: ${entry.dataPoint.label};">Number of Models: </span>${entry.dataPoint.y}<br/>
              
              `;
            });

            return content;
          },
        },
        data: [
          {
            showInLegend: false,
            yValueFormatString: '#,##0',
            dataPointWidth: 20,

            dataPoints: dataPoints.map((point) => ({
              ...point,
            })),
          },
        ],
      },
    ],
    navigator: {
      enabled: flag,
      axisX: {
        labelFontSize: 10,
      },
    },
  };

  const containerProps = {
    margin: 'auto',
  };
  return (
    <div className="balance-details balance-details-strategies">
      <div className="container">
        <h2 className="balance-details-strategies-heading">
          Strategies on Different Exchanges
        </h2>
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      </div>
    </div>
  );
};

export default BalanceStrategies;
