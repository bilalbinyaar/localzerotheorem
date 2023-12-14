import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../canvasjs.react';
import { useStateContext } from '../ContextProvider';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Kelly_Allocation_ApexCharts() {
  const { theme, link } = useStateContext();

  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [strategy_names, set_strategy_names] = useState([]);
  const [data_for_graph_historical, set_data_for_graph_historical] = useState(
    []
  );
  const [data_for_graph_historical2, set_data_for_graph_historical2] = useState(
    []
  );
  const [data_for_graph_historical3, set_data_for_graph_historical3] = useState(
    []
  );
  const [data_for_graph_historical4, set_data_for_graph_historical4] = useState(
    []
  );
  const [data_for_graph_historical5, set_data_for_graph_historical5] = useState(
    []
  );
  const [data_for_graph_historical6, set_data_for_graph_historical6] = useState(
    []
  );
  const [data_for_graph_historical7, set_data_for_graph_historical7] = useState(
    []
  );
  const [data_for_graph_historical8, set_data_for_graph_historical8] = useState(
    []
  );
  const [data_for_graph_historical9, set_data_for_graph_historical9] = useState(
    []
  );
  const [data_for_graph_historical10, set_data_for_graph_historical10] =
    useState([]);

  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(link + `/get/kelly_allocation`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            var list_of_names = Object.keys(data['response'][0]);
            list_of_names = list_of_names.slice(1);
            set_strategy_names(list_of_names);

            const temp_data_1 = [];
            const temp_data_2 = [];
            const temp_data_3 = [];
            const temp_data_4 = [];
            const temp_data_5 = [];
            const temp_data_6 = [];
            const temp_data_7 = [];
            const temp_data_8 = [];
            const temp_data_9 = [];
            const temp_data_10 = [];

            for (let i = 0; i < data['response'].length; i++) {
              temp_data_1.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[0]],
              });
              temp_data_2.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[1]],
              });
              temp_data_3.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[2]],
              });
              temp_data_4.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[3]],
              });
              temp_data_5.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[4]],
              });

              temp_data_6.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[5]],
              });
              temp_data_7.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[6]],
              });
              temp_data_8.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[7]],
              });
              temp_data_9.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[8]],
              });
              temp_data_10.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[9]],
              });
            }

            if (temp_data_1.length !== 0) {
              set_data_for_graph_historical(temp_data_1);
              set_data_for_graph_historical2(temp_data_2);

              set_data_for_graph_historical3(temp_data_3);
              set_data_for_graph_historical4(temp_data_4);

              set_data_for_graph_historical5(temp_data_5);
              set_data_for_graph_historical6(temp_data_6);
              set_data_for_graph_historical7(temp_data_7);
              set_data_for_graph_historical8(temp_data_8);
              set_data_for_graph_historical9(temp_data_9);
              set_data_for_graph_historical10(temp_data_10);
            }
          });
      }
      setTimeout(() => {
        fetch(link + `/get/kelly_allocation`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            var list_of_names = Object.keys(data['response'][0]);
            list_of_names = list_of_names.slice(1);
            set_strategy_names(list_of_names);

            const temp_data_1 = [];
            const temp_data_2 = [];
            const temp_data_3 = [];
            const temp_data_4 = [];
            const temp_data_5 = [];
            const temp_data_6 = [];
            const temp_data_7 = [];
            const temp_data_8 = [];
            const temp_data_9 = [];
            const temp_data_10 = [];

            for (let i = 0; i < data['response'].length; i++) {
              temp_data_1.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[0]],
              });
              temp_data_2.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[1]],
              });
              temp_data_3.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[2]],
              });
              temp_data_4.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[3]],
              });
              temp_data_5.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[4]],
              });

              temp_data_6.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[5]],
              });
              temp_data_7.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[6]],
              });
              temp_data_8.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[7]],
              });
              temp_data_9.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[8]],
              });
              temp_data_10.push({
                x: new Date(parseInt(data['response'][i].datetime) * 1000),
                y: data['response'][i][list_of_names[9]],
              });
            }

            if (temp_data_1.length !== 0) {
              set_data_for_graph_historical(temp_data_1);
              set_data_for_graph_historical2(temp_data_2);

              set_data_for_graph_historical3(temp_data_3);
              set_data_for_graph_historical4(temp_data_4);

              set_data_for_graph_historical5(temp_data_5);
              set_data_for_graph_historical6(temp_data_6);
              set_data_for_graph_historical7(temp_data_7);
              set_data_for_graph_historical8(temp_data_8);
              set_data_for_graph_historical9(temp_data_9);
              set_data_for_graph_historical10(temp_data_10);
            }
          });
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [timer_for_current]);

  const options = {
    theme: 'light2',
    height: 300,
    backgroundColor: 'transparent',

    axisX: {
      includeZero: false,
      labelFontSize: 11,
      gridColor: '#43577533',
      tickColor: '#43577533',
      lineColor: '#43577533',
      labelFontColor: theme === 'dark-theme' ? '#fff' : '#000000',
    },

    axisY: {
      includeZero: false,
      labelFontSize: 11,
      gridColor: '#43577533',
      tickColor: '#43577533',
      labelFontColor: theme === 'dark-theme' ? '#fff' : '#000000',
    },

    axisY2: {
      includeZero: true,
      gridColor: '#B5E5F5',
      tickColor: '#B5E5F5',
      labelFontSize: 11,
      labelFontColor: theme === 'dark-theme' ? '#fff' : '#000000',
    },

    data: [
      {
        type: 'line',
        color: '#16C784',
        labelFontSize: 10,
        gridColor: '#43577533',
        tickColor: '#43577533',
        showInLegend: true,

        name: strategy_names[0] ? strategy_names[0] : null,
        dataPoints: data_for_graph_historical,
      },

      {
        type: 'line',
        color: '#FF2E2E',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[1] ? strategy_names[1] : null,
        dataPoints: data_for_graph_historical2,
      },
      {
        type: 'line',
        color: '#F9A52B',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[2] ? strategy_names[2] : null,
        dataPoints: data_for_graph_historical3,
      },
      {
        type: 'line',
        color: '#4287f5',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[3] ? strategy_names[3] : null,
        dataPoints: data_for_graph_historical4,
      },
      {
        type: 'line',
        color: '#9B59B6',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[4] ? strategy_names[4] : null,
        dataPoints: data_for_graph_historical5,
      },
      {
        type: 'line',
        color: '#FFD700',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[5] ? strategy_names[5] : null,
        dataPoints: data_for_graph_historical6,
      },
      {
        type: 'line',
        color: '#00FFFF',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[6] ? strategy_names[6] : null,
        dataPoints: data_for_graph_historical7,
      },
      {
        type: 'line',
        color: '#FF1493',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[7] ? strategy_names[7] : null,
        dataPoints: data_for_graph_historical8,
      },
      {
        type: 'line',
        color: '#008080',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[8] ? strategy_names[8] : null,
        dataPoints: data_for_graph_historical9,
      },
      {
        type: 'line',
        color: '#DA6B85',
        labelFontSize: 10,
        showInLegend: true,
        name: strategy_names[9] ? strategy_names[9] : null,
        dataPoints: data_for_graph_historical10,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Kelly_Allocation_ApexCharts;
