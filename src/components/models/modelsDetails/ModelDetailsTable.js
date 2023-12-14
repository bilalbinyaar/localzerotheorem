import React from 'react';
import './ModelDetails.css';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../../ContextProvider';

const ModelDetailsTable = (props) => {
  const [strategy, setStrategy] = useState({});
  const { link } = useStateContext();

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(link + `/get_strategy/${props.model_name}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var data_for_strategy = {};
        for (var i = 0; i < data['response'].length; i++) {
          data_for_strategy[data['response'][i].strategy_name] = {
            current_position: data['response'][i].current_position,
            time_horizon: data['response'][i].time_horizon,
            currency: data['response'][i].currency,
            start_time: data['response'][i].date_started,
            price: data['response'][i].entry_price,
            size: data['response'][i].size,
          };
        }
        if (JSON.stringify(data_for_strategy) !== '{}') {
          setStrategy(data_for_strategy);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      fetch(link + `/get_stat/${props.model_name}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var data_for_stat = {};
          for (var i = 0; i < data['response'].length; i++) {
            data_for_stat[data['response'][i].strategy_name] = {
              total_pnl: data['response'][i].total_pnl,
            };
          }
          if (JSON.stringify(data_for_stat) !== '{}') {
            setStats(data_for_stat);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="model-details-table">
      <div className="model-details-table-spans">
        <div className="table-spans">
          <span>Time Horizon : </span>
          <span>
            <span>
              {strategy[props.model_name]
                ? strategy[props.model_name].time_horizon
                : null}
            </span>
          </span>
        </div>
        <div className="table-spans">
          <span>Next Foercast Time : </span>
          <span>
            {strategy[props.model_name]
              ? strategy[props.model_name].start_time.slice(11)
              : null}
          </span>
        </div>
        <div className="table-spans">
          <span>Current Forcast : </span>
          <span className="for-green">
            {strategy[props.model_name]
              ? strategy[props.model_name].current_position
              : null}
          </span>
        </div>
        <div className="table-spans">
          <span>Entry Price : </span>
          <span>
            {strategy[props.model_name]
              ? `${strategy[props.model_name].price}$`
              : null}
          </span>
        </div>
        <div className="table-spans">
          <span>Current Price : </span>
          <span>$1800</span>
        </div>
        <div className="table-spans no-border">
          <span>Current PNL : </span>
          <span className="for-green">
            {stats[props.model_name]
              ? `${stats[props.model_name].total_pnl}$`
              : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsTable;
