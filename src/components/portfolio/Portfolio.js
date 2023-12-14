import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import { useStateContext } from '../../ContextProvider';
import { AiFillCaretUp } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
const Portfolio = () => {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [stats, setStats] = useState([]);
  const { link } = useStateContext();

  const forColor = (total_pnl, id) => {
    try {
      if (total_pnl < 0) {
        document
          .getElementById(`${id}`)
          .setAttribute('style', 'color:#FF2E2E !important');
      } else if (total_pnl >= 0) {
        document
          .getElementById(`${id}`)
          .setAttribute('style', 'color:#16C784 !important');
      }
    } catch {}
  };
  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(link + `/get/live_returns`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};

            for (let i = 0; i < data['response'].length; i++) {
              temp_data['live_pnls'] = {
                pnl_all: data['response'][i].pnl_all,
                pnl_1: data['response'][i].pnl_1,
                pnl_7: data['response'][i].pnl_7,
                pnl_30: data['response'][i].pnl_30,
                pnl_60: data['response'][i].pnl_60,
              };
            }

            if (temp_data.length !== 0) {
              setStats(temp_data);
            }
          })
          .catch((err) => {});
      }
      setTimeout(() => {
        fetch(link + `/get/live_returns`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};

            for (let i = 0; i < data['response'].length; i++) {
              temp_data['live_pnls'] = {
                pnl_all: data['response'][i].pnl_all,
                pnl_1: data['response'][i].pnl_1,
                pnl_7: data['response'][i].pnl_7,
                pnl_30: data['response'][i].pnl_30,
                pnl_60: data['response'][i].pnl_60,
              };
            }

            if (temp_data.length !== 0) {
              setStats(temp_data);
            }
          });

        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [timer_for_current]);
  return (
    <div id="forecasts" className="forecasts">
      <div className="container">
        <div className="top-div">
          <h1>Performance</h1>
        </div>

        <div className="portfolio-stats">
          <div className="today-stats for-flex-col">
            <h2>Overall Return</h2>
            <div className="portfolio-stats-percentage" id="pnl-bg">
              {stats['live_pnls'] ? (
                stats['live_pnls'].pnl_all >= 0 ? (
                  <AiFillCaretUp
                    className=".model-details-left-top-percentage-icon-performance"
                    style={{ color: '#16c784' }}
                    size={13}
                  />
                ) : (
                  <AiFillCaretDown
                    className=".model-details-left-top-percentage-icon-performance"
                    style={{ color: '#ff2e2e' }}
                    size={13}
                  />
                )
              ) : null}
              <p
                id="pnl-color16"
                onChange={
                  stats['live_pnls']
                    ? forColor(
                        parseInt(stats['live_pnls'].pnl_all),
                        'pnl-color16'
                      )
                    : null
                }
              >
                {stats['live_pnls'] ? `${stats['live_pnls'].pnl_all}%` : null}
              </p>
            </div>
          </div>

          <div className="pnl-stats-bar for-space-between portfolio-ml">
            <div className="pnl-day-stats for-flex-col">
              <h3>Today</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats['live_pnls'] ? (
                  stats['live_pnls'].pnl_1 >= 0 ? (
                    <AiFillCaretUp
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#16c784' }}
                      size={13}
                    />
                  ) : (
                    <AiFillCaretDown
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#ff2e2e' }}
                      size={13}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color11"
                  onChange={
                    stats['live_pnls']
                      ? forColor(
                          parseFloat(stats['live_pnls'].pnl_1),
                          'pnl-color11'
                        )
                      : null
                  }
                >
                  {stats['live_pnls'] ? `${stats['live_pnls'].pnl_1}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>7-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats['live_pnls'] ? (
                  stats['live_pnls'].pnl_7 >= 0 ? (
                    <AiFillCaretUp
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#16c784' }}
                      size={13}
                    />
                  ) : (
                    <AiFillCaretDown
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#ff2e2e' }}
                      size={13}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color60"
                  onChange={
                    stats['live_pnls']
                      ? forColor(
                          parseFloat(stats['live_pnls'].pnl_7),
                          'pnl-color60'
                        )
                      : null
                  }
                >
                  {stats['live_pnls'] ? `${stats['live_pnls'].pnl_7}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>30-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats['live_pnls'] ? (
                  stats['live_pnls'].pnl_30 >= 0 ? (
                    <AiFillCaretUp
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#16c784' }}
                      size={13}
                    />
                  ) : (
                    <AiFillCaretDown
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#ff2e2e' }}
                      size={13}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color144"
                  onChange={
                    stats['live_pnls']
                      ? forColor(
                          parseFloat(stats['live_pnls'].pnl_30),
                          'pnl-color144'
                        )
                      : null
                  }
                >
                  {stats['live_pnls'] ? `${stats['live_pnls'].pnl_30}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>60-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats['live_pnls'] ? (
                  stats['live_pnls'].pnl_60 >= 0 ? (
                    <AiFillCaretUp
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#16c784' }}
                      size={13}
                    />
                  ) : (
                    <AiFillCaretDown
                      className=".model-details-left-top-percentage-icon-performance"
                      style={{ color: '#ff2e2e' }}
                      size={13}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color19"
                  onChange={
                    stats['live_pnls']
                      ? forColor(
                          parseFloat(stats['live_pnls'].pnl_60),
                          'pnl-color19'
                        )
                      : null
                  }
                >
                  {stats['live_pnls'] ? `${stats['live_pnls'].pnl_60}%` : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
