import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import './RecentlyViewed.css';
import {
  AiFillCaretUp,
  AiOutlineFieldTime,
  AiOutlineDollarCircle,
  AiFillCaretDown,
} from 'react-icons/ai';
import ModelDetailsRightGraph from '../models/modelsDetails/modelDetailsRightGraphs/ModelDetailsRightGraph';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../ContextProvider';
import { BiLinkExternal } from 'react-icons/bi';
import { BsArrowRightShort } from 'react-icons/bs';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { set_scroll_recently } from '../../store';
import { ThreeDots } from 'react-loader-spinner';

const RecentlyViewed = (props) => {
  const dispatch = useDispatch();
  const persistant_states = useSelector((state) => state.scrollRecently);
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

  const {
    stats_cache,
    strategies_cache,
    sorted_stats_cache,
    Set_strategies_cache,
    Set_sorted_stats_cache,
    Set_stats_cache,
    Set_coin_search_selection_cache,
    Set_model_search_selection_cache,
    // authCheckLoginInvestor,
    link,
  } = useStateContext();

  const [topPerformerModels, setTopPerformersModels] = useState([]);
  // useEffect(() => {
  //   try {
  //     if (authCheckLoginInvestor === 'True') {
  //       fetch(link + '/get/live_stats', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  //           'ngrok-skip-browser-warning': 'true',
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           var model_names = {};
  //           for (var i = 0; i < data['response'].length; i++) {
  //             model_names[data['response'][i].strategy_name] = {
  //               strategy_name: data['response'][i].strategy_name.replace(
  //                 '-',
  //                 '_'
  //               ),
  //               current_drawdown: data['response'][i].current_drawdown,
  //               curr_drawdown_duration:
  //                 data['response'][i].curr_drawdown_duration,
  //               average_drawdown: data['response'][i].average_drawdown,
  //               average_drawdown_duration:
  //                 data['response'][i].average_drawdown_duration,
  //               max_drawdown: data['response'][i].max_drawdown,
  //               max_drawdown_duration:
  //                 data['response'][i].max_drawdown_duration,
  //               r2_score: data['response'][i].r2_score,
  //               sharpe: data['response'][i].sharpe,
  //               sortino: data['response'][i].sortino,
  //               total_pnl: data['response'][i].total_pnl,
  //               total_positive_pnl: data['response'][i].total_positive_pnl,
  //               total_negative_pnl: data['response'][i].total_negative_pnl,
  //               total_wins: data['response'][i].total_wins,
  //               total_losses: data['response'][i].total_losses,
  //               consective_wins: data['response'][i].consective_wins,
  //               consective_losses: data['response'][i].consective_losses,
  //               win_percentage: data['response'][i].win_percentage,
  //               loss_percentage: data['response'][i].loss_percentage,
  //               pnl_sum_1: data['response'][i].pnl_sum_1,
  //               pnl_sum_7: data['response'][i].pnl_sum_7,
  //               pnl_sum_15: data['response'][i].pnl_sum_15,
  //               pnl_sum_30: data['response'][i].pnl_sum_30,
  //               pnl_sum_45: data['response'][i].pnl_sum_45,
  //               pnl_sum_60: data['response'][i].pnl_sum_60,
  //               average_daily_pnl: data['response'][i].average_daily_pnl,
  //               win_loss_ratio: data['response'][i].win_loss_ratio,

  //               rank: data['response'][i].rank,
  //             };
  //           }
  //           if (JSON.stringify(model_names) !== '{}') {
  //             const sorted = Object.keys(model_names)
  //               .map((key) => {
  //                 return { ...model_names[key], key };
  //               })
  //               .sort((a, b) => b.total_pnl - a.total_pnl);
  //             setTopPerformersModels(sorted);
  //             Set_stats_cache({ stats: model_names });

  //             Set_sorted_stats_cache({ sorted_stats: sorted });
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       try {
  //         if (Object.keys(stats_cache).length === 0) {
  //           fetch(link + '/get_stats', {
  //             method: 'GET',
  //             headers: {
  //               Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  //               'ngrok-skip-browser-warning': 'true',
  //             },
  //           })
  //             .then((response) => response.json())
  //             .then((data) => {
  //               var model_names = {};
  //               for (var i = 0; i < data['response'].length; i++) {
  //                 model_names[data['response'][i].strategy_name] = {
  //                   strategy_name: data['response'][i].strategy_name.replace(
  //                     '-',
  //                     '_'
  //                   ),
  //                   current_drawdown: data['response'][i].current_drawdown,
  //                   curr_drawdown_duration:
  //                     data['response'][i].curr_drawdown_duration,
  //                   average_drawdown: data['response'][i].average_drawdown,
  //                   average_drawdown_duration:
  //                     data['response'][i].average_drawdown_duration,
  //                   max_drawdown: data['response'][i].max_drawdown,
  //                   max_drawdown_duration:
  //                     data['response'][i].max_drawdown_duration,
  //                   r2_score: data['response'][i].r2_score,
  //                   sharpe: data['response'][i].sharpe,
  //                   sortino: data['response'][i].sortino,
  //                   total_pnl: data['response'][i].total_pnl,
  //                   total_positive_pnl: data['response'][i].total_positive_pnl,
  //                   total_negative_pnl: data['response'][i].total_negative_pnl,
  //                   total_wins: data['response'][i].total_wins,
  //                   total_losses: data['response'][i].total_losses,
  //                   consective_wins: data['response'][i].consective_wins,
  //                   consective_losses: data['response'][i].consective_losses,
  //                   win_percentage: data['response'][i].win_percentage,
  //                   loss_percentage: data['response'][i].loss_percentage,
  //                   pnl_sum_1: data['response'][i].pnl_sum_1,
  //                   pnl_sum_7: data['response'][i].pnl_sum_7,
  //                   pnl_sum_15: data['response'][i].pnl_sum_15,
  //                   pnl_sum_30: data['response'][i].pnl_sum_30,
  //                   pnl_sum_45: data['response'][i].pnl_sum_45,
  //                   pnl_sum_60: data['response'][i].pnl_sum_60,
  //                   average_daily_pnl: data['response'][i].average_daily_pnl,
  //                   win_loss_ratio: data['response'][i].win_loss_ratio,

  //                   rank: data['response'][i].rank,
  //                   alpha: data['response'][i].alpha,
  //                   beta: data['response'][i].beta,
  //                 };
  //               }
  //               if (JSON.stringify(model_names) !== '{}') {
  //                 const sorted = Object.keys(model_names)
  //                   .map((key) => {
  //                     return { ...model_names[key], key };
  //                   })
  //                   .sort((a, b) => b.total_pnl - a.total_pnl);
  //                 setTopPerformersModels(sorted);
  //                 Set_stats_cache({ stats: model_names });

  //                 Set_sorted_stats_cache({ sorted_stats: sorted });
  //               }
  //             })
  //             .catch((err) => console.log(err));
  //         } else {
  //           setTopPerformersModels(sorted_stats_cache['sorted_stats']);
  //         }
  //       } catch (error) {
  //         console.log('Error occured');
  //       }
  //     }
  //   } catch (error) {
  //     console.log('Error occured');
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    try {
      if (Object.keys(stats_cache).length === 0) {
        fetch(link + '/get_stats', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            var model_names = {};
            for (var i = 0; i < data['response'].length; i++) {
              model_names[data['response'][i].strategy_name] = {
                strategy_name: data['response'][i].strategy_name.replace(
                  '-',
                  '_'
                ),
                current_drawdown: data['response'][i].current_drawdown,
                curr_drawdown_duration:
                  data['response'][i].curr_drawdown_duration,
                average_drawdown: data['response'][i].average_drawdown,
                average_drawdown_duration:
                  data['response'][i].average_drawdown_duration,
                max_drawdown: data['response'][i].max_drawdown,
                max_drawdown_duration:
                  data['response'][i].max_drawdown_duration,
                r2_score: data['response'][i].r2_score,
                sharpe: data['response'][i].sharpe,
                sortino: data['response'][i].sortino,
                total_pnl: data['response'][i].total_pnl,
                total_positive_pnl: data['response'][i].total_positive_pnl,
                total_negative_pnl: data['response'][i].total_negative_pnl,
                total_wins: data['response'][i].total_wins,
                total_losses: data['response'][i].total_losses,
                consective_wins: data['response'][i].consective_wins,
                consective_losses: data['response'][i].consective_losses,
                win_percentage: data['response'][i].win_percentage,
                loss_percentage: data['response'][i].loss_percentage,
                pnl_sum_1: data['response'][i].pnl_sum_1,
                pnl_sum_7: data['response'][i].pnl_sum_7,
                pnl_sum_15: data['response'][i].pnl_sum_15,
                pnl_sum_30: data['response'][i].pnl_sum_30,
                pnl_sum_45: data['response'][i].pnl_sum_45,
                pnl_sum_60: data['response'][i].pnl_sum_60,
                average_daily_pnl: data['response'][i].average_daily_pnl,
                win_loss_ratio: data['response'][i].win_loss_ratio,

                rank: data['response'][i].rank,
                alpha: data['response'][i].alpha,
                beta: data['response'][i].beta,
              };
            }
            if (JSON.stringify(model_names) !== '{}') {
              const sorted = Object.keys(model_names)
                .map((key) => {
                  return { ...model_names[key], key };
                })
                .sort((a, b) => b.total_pnl - a.total_pnl);
              setTopPerformersModels(sorted);
              Set_stats_cache({ stats: model_names });

              Set_sorted_stats_cache({ sorted_stats: sorted });
            }
          })
          .catch((err) => console.log(err));
      } else {
        setTopPerformersModels(sorted_stats_cache['sorted_stats']);
      }
    } catch (error) {
      console.log('Error occured');
    }

    // eslint-disable-next-line
  }, []);
  const [strategies, setStrategies] = useState({});

  // useEffect(() => {
  //   try {
  //     if (authCheckLoginInvestor === 'True') {
  //       fetch(link + '/get/live_strategies', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  //           'ngrok-skip-browser-warning': 'true',
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           var data_for_strategies = {};
  //           var model_names = [];
  //           var coin_names = [];
  //           var unique_coins = {};
  //           var index = 0;
  //           for (var i = 0; i < data['response'].length; i++) {
  //             model_names.push({
  //               label: data['response'][i].strategy_name.replace(/_/g, '-'),
  //               value: data['response'][i].time_horizon,
  //               currency: data['response'][i].currency,
  //             });
  //             if (!unique_coins[data['response'][i].currency]) {
  //               unique_coins[data['response'][i].currency] = 1;
  //               coin_names.push({
  //                 label: data['response'][i].currency,
  //               });
  //             }
  //             var dt = new Date(
  //               parseInt(data['response'][i].forecast_time) * 1000
  //             ).toLocaleString();
  //             var year = dt.split('/')[2].split(',')[0];
  //             var month = dt.split('/')[0];
  //             if (month.length === 1) {
  //               month = '0' + month;
  //             }
  //             var day = dt.split('/')[1];
  //             if (day.length === 1) {
  //               day = '0' + day;
  //             }
  //             var hours = dt.split(', ')[1].split(':')[0];
  //             if (hours.length === 1) {
  //               hours = '0' + hours;
  //             }
  //             var minutes = dt.split(':')[1];
  //             if (minutes.length === 1) {
  //               minutes = '0' + minutes;
  //             }
  //             var curr_time_version = dt.split(' ')[2];
  //             if (curr_time_version === 'PM') {
  //               hours = parseInt(hours) + 12;
  //             }
  //             var dt_str =
  //               year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

  //             data_for_strategies[data['response'][i].strategy_name] = {
  //               current_position: data['response'][i].current_position,
  //               time_horizon: data['response'][i].time_horizon,
  //               currency: data['response'][i].currency,
  //               date_started: data['response'][i].date_started,
  //               entry_price: data['response'][i].entry_price,
  //               forecast_time: dt_str,
  //               next_forecast: data['response'][i].next_forecast,
  //               current_price: data['response'][i].current_price,
  //               strategy_name: data['response'][i].strategy_name,
  //               current_pnl: data['response'][i].current_pnl,
  //               position_start_time: data['response'][i].position_start_time,
  //             };
  //             // eslint-disable-next-line
  //             index++;
  //           }
  //           if (JSON.stringify(data_for_strategies) !== '{}') {
  //             setStrategies(data_for_strategies);
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       if (Object.keys(strategies_cache).length === 0) {
  //         fetch(link + '/get_strategies', {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  //             'ngrok-skip-browser-warning': 'true',
  //           },
  //         })
  //           .then((response) => response.json())
  //           .then((data) => {
  //             var data_for_strategies = {};
  //             var model_names = [];
  //             var coin_names = [];
  //             var unique_coins = {};
  //             var index = 0;
  //             for (var i = 0; i < data['response'].length; i++) {
  //               model_names.push({
  //                 label: data['response'][i].strategy_name.replace(/_/g, '-'),
  //                 value: data['response'][i].time_horizon,
  //                 currency: data['response'][i].currency,
  //               });
  //               if (!unique_coins[data['response'][i].currency]) {
  //                 unique_coins[data['response'][i].currency] = 1;
  //                 coin_names.push({
  //                   label: data['response'][i].currency,
  //                 });
  //               }
  //               var dt = new Date(
  //                 parseInt(data['response'][i].forecast_time) * 1000
  //               ).toLocaleString();
  //               var year = dt.split('/')[2].split(',')[0];
  //               var month = dt.split('/')[0];
  //               if (month.length === 1) {
  //                 month = '0' + month;
  //               }
  //               var day = dt.split('/')[1];
  //               if (day.length === 1) {
  //                 day = '0' + day;
  //               }
  //               var hours = dt.split(', ')[1].split(':')[0];
  //               if (hours.length === 1) {
  //                 hours = '0' + hours;
  //               }
  //               var minutes = dt.split(':')[1];
  //               if (minutes.length === 1) {
  //                 minutes = '0' + minutes;
  //               }
  //               var curr_time_version = dt.split(' ')[2];
  //               if (curr_time_version === 'PM') {
  //                 hours = parseInt(hours) + 12;
  //               }
  //               var dt_str =
  //                 year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

  //               data_for_strategies[data['response'][i].strategy_name] = {
  //                 current_position: data['response'][i].current_position,
  //                 time_horizon: data['response'][i].time_horizon,
  //                 currency: data['response'][i].currency,
  //                 date_started: data['response'][i].date_started,
  //                 entry_price: data['response'][i].entry_price,
  //                 forecast_time: dt_str,
  //                 next_forecast: data['response'][i].next_forecast,
  //                 current_price: data['response'][i].current_price,
  //                 strategy_name: data['response'][i].strategy_name,
  //                 current_pnl: data['response'][i].current_pnl,
  //                 position_start_time: data['response'][i].position_start_time,
  //               };
  //               // eslint-disable-next-line
  //               index++;
  //             }
  //             if (JSON.stringify(data_for_strategies) !== '{}') {
  //               setStrategies(data_for_strategies);
  //               Set_strategies_cache({ strategies: data_for_strategies });
  //               Set_coin_search_selection_cache({
  //                 coin_names: coin_names,
  //               });
  //               Set_model_search_selection_cache({
  //                 model_names: model_names,
  //               });
  //             }
  //           })
  //           .catch((err) => console.log(err));
  //       } else {
  //         setStrategies(strategies_cache['strategies']);
  //       }
  //     }
  //   } catch (error) {
  //     console.log('Error occured');
  //   }
  //   // eslint-disable-next-line
  // }, [topPerformerModels]);

  useEffect(() => {
    try {
      if (Object.keys(strategies_cache).length === 0) {
        fetch(link + '/get_strategies', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            var data_for_strategies = {};
            var model_names = [];
            var coin_names = [];
            var unique_coins = {};
            var index = 0;
            for (var i = 0; i < data['response'].length; i++) {
              model_names.push({
                label: data['response'][i].strategy_name.replace(/_/g, '-'),
                value: data['response'][i].time_horizon,
                currency: data['response'][i].currency,
              });
              if (!unique_coins[data['response'][i].currency]) {
                unique_coins[data['response'][i].currency] = 1;
                coin_names.push({
                  label: data['response'][i].currency,
                });
              }
              var dt = new Date(
                parseInt(data['response'][i].forecast_time) * 1000
              ).toLocaleString();
              var year = dt.split('/')[2].split(',')[0];
              var month = dt.split('/')[0];
              if (month.length === 1) {
                month = '0' + month;
              }
              var day = dt.split('/')[1];
              if (day.length === 1) {
                day = '0' + day;
              }
              var hours = dt.split(', ')[1].split(':')[0];
              if (hours.length === 1) {
                hours = '0' + hours;
              }
              var minutes = dt.split(':')[1];
              if (minutes.length === 1) {
                minutes = '0' + minutes;
              }
              var curr_time_version = dt.split(' ')[2];
              if (curr_time_version === 'PM') {
                hours = parseInt(hours) + 12;
              }
              var dt_str =
                year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

              data_for_strategies[data['response'][i].strategy_name] = {
                current_position: data['response'][i].current_position,
                time_horizon: data['response'][i].time_horizon,
                currency: data['response'][i].currency,
                date_started: data['response'][i].date_started,
                entry_price: data['response'][i].entry_price,
                forecast_time: dt_str,
                next_forecast: data['response'][i].next_forecast,
                current_price: data['response'][i].current_price,
                strategy_name: data['response'][i].strategy_name,
                current_pnl: data['response'][i].current_pnl,
                position_start_time: data['response'][i].position_start_time,
              };
              // eslint-disable-next-line
              index++;
            }
            if (JSON.stringify(data_for_strategies) !== '{}') {
              setStrategies(data_for_strategies);
              Set_strategies_cache({ strategies: data_for_strategies });
              Set_coin_search_selection_cache({
                coin_names: coin_names,
              });
              Set_model_search_selection_cache({
                model_names: model_names,
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        setStrategies(strategies_cache['strategies']);
      }
    } catch (error) {
      console.log('Error occured');
    }
    // eslint-disable-next-line
  }, [topPerformerModels]);

  const containerRef = useRef(null);
  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollLeft > 0) {
      if (persistant_states.scrollRecently === 'True') {
        document.getElementById('toHidePopular').style.display = 'none';
        dispatch(set_scroll_recently());
      }
    }
  };

  return (
    <div className="container recently-viewd">
      {persistant_states.scrollRecently === 'True' ? (
        <div className="swipe-right-popular" id="toHidePopular">
          <BsArrowRightShort className="swipe-right-icon" />
        </div>
      ) : null}

      <div>
        <h2>Popular Models</h2>
      </div>
      <div className="model-details-right">
        <div
          className="model-details-right-cards mobile-version"
          ref={containerRef}
          style={{ overflowX: 'scroll' }}
          onScroll={handleScroll}
        >
          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[0].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[0].strategy_name.replace(/_/g, '-')}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>

              <div className="model-details-right-percentage">
                <AiFillCaretUp className="model-details-right-percentage-icon" />
                <p>
                  {Object.values(topPerformerModels)[0] &&
                  strategies[Object.values(topPerformerModels)[0].strategy_name]
                    ? `${Object.values(topPerformerModels)[0].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <div className="model-details-left-body-stats for-recent-margin hours">
                    <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                    <p>
                      {Object.values(topPerformerModels)[0] &&
                      strategies[
                        Object.values(topPerformerModels)[0].strategy_name
                      ]
                        ? `${
                            strategies[
                              Object.values(topPerformerModels)[0].strategy_name
                            ].time_horizon
                          }`
                        : null}
                    </p>
                  </div>
                  {/* CURRENCY */}
                  <div className="model-details-left-body">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[0] &&
                        strategies[
                          Object.values(topPerformerModels)[0].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[0]
                                  .strategy_name
                              ].currency
                            }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[0] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[0].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[1].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[1].strategy_name.replace(/_/g, '-')}{' '}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                <AiFillCaretUp className="model-details-right-percentage-icon" />
                <p>
                  {Object.values(topPerformerModels)[1] &&
                  strategies[Object.values(topPerformerModels)[1].strategy_name]
                    ? `${Object.values(topPerformerModels)[1].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              {/* <h2>64%</h2> */}
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <div className="model-details-left-body-stats for-recent-margin hours">
                    <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                    <p>
                      {Object.values(topPerformerModels)[1] &&
                      strategies[
                        Object.values(topPerformerModels)[1].strategy_name
                      ]
                        ? `${
                            strategies[
                              Object.values(topPerformerModels)[1].strategy_name
                            ].time_horizon
                          }`
                        : null}
                    </p>
                  </div>
                  {/* CURRENCY */}
                  <div className="model-details-left-body">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[1] &&
                        strategies[
                          Object.values(topPerformerModels)[1].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[1]
                                  .strategy_name
                              ].currency
                            }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[1] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[1].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[2].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[2].strategy_name.replace(/_/g, '-')}{' '}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                <AiFillCaretUp className="model-details-right-percentage-icon" />
                <p>
                  {Object.values(topPerformerModels)[2] &&
                  strategies[Object.values(topPerformerModels)[2].strategy_name]
                    ? `${Object.values(topPerformerModels)[2].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <div className="model-details-left-body-stats for-recent-margin hours">
                    <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                    <p>
                      {Object.values(topPerformerModels)[2] &&
                      strategies[
                        Object.values(topPerformerModels)[2].strategy_name
                      ]
                        ? `${
                            strategies[
                              Object.values(topPerformerModels)[2].strategy_name
                            ].time_horizon
                          }`
                        : null}
                    </p>
                  </div>
                  {/* CURRENCY */}
                  <div className="model-details-left-body">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[2] &&
                        strategies[
                          Object.values(topPerformerModels)[2].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[2]
                                  .strategy_name
                              ].currency
                            }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[2] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[2].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[3].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[3].strategy_name.replace(/_/g, '-')}{' '}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                <AiFillCaretUp className="model-details-right-percentage-icon" />
                <p>
                  {Object.values(topPerformerModels)[3] &&
                  strategies[Object.values(topPerformerModels)[3].strategy_name]
                    ? `${Object.values(topPerformerModels)[3].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <div className="model-details-left-body-stats for-recent-margin hours">
                    <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                    <p>
                      {Object.values(topPerformerModels)[3] &&
                      strategies[
                        Object.values(topPerformerModels)[3].strategy_name
                      ]
                        ? `${
                            strategies[
                              Object.values(topPerformerModels)[3].strategy_name
                            ].time_horizon
                          }`
                        : null}
                    </p>
                  </div>
                  {/* CURRENCY */}
                  <div className="model-details-left-body">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[3] &&
                        strategies[
                          Object.values(topPerformerModels)[3].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[3]
                                  .strategy_name
                              ].currency
                            }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[3] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[3].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[4].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[4].strategy_name.replace(/_/g, '-')}{' '}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                <AiFillCaretUp className="model-details-right-percentage-icon" />
                <p>
                  {Object.values(topPerformerModels)[4] &&
                  strategies[Object.values(topPerformerModels)[4].strategy_name]
                    ? `${Object.values(topPerformerModels)[4].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <div className="model-details-left-body-stats for-recent-margin hours">
                    <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                    <p>
                      {Object.values(topPerformerModels)[4] &&
                      strategies[
                        Object.values(topPerformerModels)[4].strategy_name
                      ]
                        ? `${
                            strategies[
                              Object.values(topPerformerModels)[4].strategy_name
                            ].time_horizon
                          }`
                        : null}
                    </p>
                  </div>
                  {/* CURRENCY */}
                  <div className="model-details-left-body">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[4] &&
                        strategies[
                          Object.values(topPerformerModels)[4].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[4]
                                  .strategy_name
                              ].currency
                            }`
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[4] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[4].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="model-details-right-cards web-version">
          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[0].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[0].strategy_name.replace(/_/g, '-')}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>

              <div className="model-details-right-percentage">
                {Object.values(topPerformerModels)[0] &&
                strategies[
                  Object.values(topPerformerModels)[0].strategy_name
                ] ? (
                  Object.values(topPerformerModels)[0].total_pnl >= 0 ? (
                    <AiFillCaretUp
                      className="model-details-right-percentage-icon"
                      style={{ color: '#16c784' }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="model-details-right-percentage-icon"
                      style={{ color: '#ff2e2e' }}
                    />
                  )
                ) : null}

                <p
                  id="pnl-color23"
                  onChange={
                    Object.values(topPerformerModels)[0] &&
                    strategies[
                      Object.values(topPerformerModels)[0].strategy_name
                    ]
                      ? forColor(
                          parseFloat(
                            Object.values(topPerformerModels)[0].total_pnl
                          ),
                          'pnl-color23'
                        )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[0] &&
                  strategies[Object.values(topPerformerModels)[0].strategy_name]
                    ? `${Object.values(topPerformerModels)[0].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <Tooltip title="Time Horizon">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[0] &&
                        strategies[
                          Object.values(topPerformerModels)[0].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[0]
                                  .strategy_name
                              ].time_horizon
                            }`
                          : null}
                      </p>
                    </div>
                  </Tooltip>
                  {/* CURRENCY */}
                  <Tooltip title="Currency">
                    <div className="model-details-left-body">
                      <div className="model-details-left-body-stats for-recent-margin hours">
                        <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                        <p>
                          {Object.values(topPerformerModels)[0] &&
                          strategies[
                            Object.values(topPerformerModels)[0].strategy_name
                          ]
                            ? `${
                                strategies[
                                  Object.values(topPerformerModels)[0]
                                    .strategy_name
                                ].currency
                              }`
                            : null}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[0] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[0].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[1].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[1].strategy_name.replace(/_/g, '-')}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                {Object.values(topPerformerModels)[1] &&
                strategies[
                  Object.values(topPerformerModels)[1].strategy_name
                ] ? (
                  Object.values(topPerformerModels)[1].total_pnl >= 0 ? (
                    <AiFillCaretUp
                      className="model-details-right-percentage-icon"
                      style={{ color: '#16c784' }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="model-details-right-percentage-icon"
                      style={{ color: '#ff2e2e' }}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color22"
                  onChange={
                    Object.values(topPerformerModels)[1] &&
                    strategies[
                      Object.values(topPerformerModels)[1].strategy_name
                    ]
                      ? forColor(
                          parseFloat(
                            Object.values(topPerformerModels)[1].total_pnl
                          ),
                          'pnl-color22'
                        )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[1] &&
                  strategies[Object.values(topPerformerModels)[1].strategy_name]
                    ? `${Object.values(topPerformerModels)[1].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <Tooltip title="Time Horizon">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[1] &&
                        strategies[
                          Object.values(topPerformerModels)[1].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[1]
                                  .strategy_name
                              ].time_horizon
                            }`
                          : null}
                      </p>
                    </div>
                  </Tooltip>
                  {/* CURRENCY */}
                  <Tooltip title="Currency">
                    <div className="model-details-left-body">
                      <div className="model-details-left-body-stats for-recent-margin hours">
                        <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                        <p>
                          {Object.values(topPerformerModels)[1] &&
                          strategies[
                            Object.values(topPerformerModels)[1].strategy_name
                          ]
                            ? `${
                                strategies[
                                  Object.values(topPerformerModels)[1]
                                    .strategy_name
                                ].currency
                              }`
                            : null}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[1] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[1].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[2].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[2].strategy_name.replace(/_/g, '-')}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                {Object.values(topPerformerModels)[2] &&
                strategies[
                  Object.values(topPerformerModels)[2].strategy_name
                ] ? (
                  Object.values(topPerformerModels)[2].total_pnl >= 0 ? (
                    <AiFillCaretUp
                      className="model-details-right-percentage-icon"
                      style={{ color: '#16c784' }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="model-details-right-percentage-icon"
                      style={{ color: '#ff2e2e' }}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color21"
                  onChange={
                    Object.values(topPerformerModels)[2] &&
                    strategies[
                      Object.values(topPerformerModels)[2].strategy_name
                    ]
                      ? forColor(
                          parseFloat(
                            Object.values(topPerformerModels)[2].total_pnl
                          ),
                          'pnl-color21'
                        )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[2] &&
                  strategies[Object.values(topPerformerModels)[2].strategy_name]
                    ? `${Object.values(topPerformerModels)[2].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <Tooltip title="Time Horizon">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[2] &&
                        strategies[
                          Object.values(topPerformerModels)[2].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[2]
                                  .strategy_name
                              ].time_horizon
                            }`
                          : null}
                      </p>
                    </div>
                  </Tooltip>
                  {/* CURRENCY */}
                  <Tooltip title="Currency">
                    <div className="model-details-left-body">
                      <div className="model-details-left-body-stats for-recent-margin hours">
                        <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                        <p>
                          {Object.values(topPerformerModels)[2] &&
                          strategies[
                            Object.values(topPerformerModels)[2].strategy_name
                          ]
                            ? `${
                                strategies[
                                  Object.values(topPerformerModels)[2]
                                    .strategy_name
                                ].currency
                              }`
                            : null}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[2] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[2].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[3].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[3].strategy_name.replace(/_/g, '-')}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                {Object.values(topPerformerModels)[3] &&
                strategies[
                  Object.values(topPerformerModels)[3].strategy_name
                ] ? (
                  Object.values(topPerformerModels)[3].total_pnl >= 0 ? (
                    <AiFillCaretUp
                      className="model-details-right-percentage-icon"
                      style={{ color: '#16c784' }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="model-details-right-percentage-icon"
                      style={{ color: '#ff2e2e' }}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color20"
                  onChange={
                    Object.values(topPerformerModels)[3] &&
                    strategies[
                      Object.values(topPerformerModels)[3].strategy_name
                    ]
                      ? forColor(
                          parseFloat(
                            Object.values(topPerformerModels)[3].total_pnl
                          ),
                          'pnl-color20'
                        )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[3] &&
                  strategies[Object.values(topPerformerModels)[3].strategy_name]
                    ? `${Object.values(topPerformerModels)[3].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <Tooltip title="Time Horizon">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[3] &&
                        strategies[
                          Object.values(topPerformerModels)[3].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[3]
                                  .strategy_name
                              ].time_horizon
                            }`
                          : null}
                      </p>
                    </div>
                  </Tooltip>
                  {/* CURRENCY */}
                  <Tooltip title="Currency">
                    <div className="model-details-left-body">
                      <div className="model-details-left-body-stats for-recent-margin hours">
                        <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                        <p>
                          {Object.values(topPerformerModels)[3] &&
                          strategies[
                            Object.values(topPerformerModels)[3].strategy_name
                          ]
                            ? `${
                                strategies[
                                  Object.values(topPerformerModels)[3]
                                    .strategy_name
                                ].currency
                              }`
                            : null}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[3] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[3].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="model-details-right-card for-recent-card-margin">
            <div className="model-details-right-card-inner-recent">
              <div
                className="link-model-names-div"
                style={{ cursor: 'pointer' }}
              >
                {Object.keys(topPerformerModels).length > 0 ? (
                  <div>
                    <Link
                      to={`/${Object.values(
                        topPerformerModels
                      )[4].strategy_name.replace(/_/g, '-')}`}
                    >
                      <h3>
                        {Object.values(
                          topPerformerModels
                        )[4].strategy_name.replace(/_/g, '-')}
                        <BiLinkExternal className="model-link-icon" />
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <h3>Loading model</h3>
                )}
              </div>
              <div className="model-details-right-percentage">
                {Object.values(topPerformerModels)[4] &&
                strategies[
                  Object.values(topPerformerModels)[4].strategy_name
                ] ? (
                  Object.values(topPerformerModels)[4].total_pnl >= 0 ? (
                    <AiFillCaretUp
                      className="model-details-right-percentage-icon"
                      style={{ color: '#16c784' }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="model-details-right-percentage-icon"
                      style={{ color: '#ff2e2e' }}
                    />
                  )
                ) : null}
                <p
                  id="pnl-color19"
                  onChange={
                    Object.values(topPerformerModels)[4] &&
                    strategies[
                      Object.values(topPerformerModels)[4].strategy_name
                    ]
                      ? forColor(
                          parseFloat(
                            Object.values(topPerformerModels)[4].total_pnl
                          ),
                          'pnl-color19'
                        )
                      : null
                  }
                >
                  {Object.values(topPerformerModels)[4] &&
                  strategies[Object.values(topPerformerModels)[4].strategy_name]
                    ? `${Object.values(topPerformerModels)[4].total_pnl}%`
                    : null}
                </p>
              </div>
            </div>
            <div className="model-details-right-card-inner-body-recent">
              <div className="model-details-right-percentage-recent">
                <div className="model-details-left-body-recent">
                  {/* TIME HORIZON */}
                  <Tooltip title="Time Horizon">
                    <div className="model-details-left-body-stats for-recent-margin hours">
                      <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                      <p>
                        {Object.values(topPerformerModels)[4] &&
                        strategies[
                          Object.values(topPerformerModels)[4].strategy_name
                        ]
                          ? `${
                              strategies[
                                Object.values(topPerformerModels)[4]
                                  .strategy_name
                              ].time_horizon
                            }`
                          : null}
                      </p>
                    </div>
                  </Tooltip>
                  {/* CURRENCY */}
                  <Tooltip title="Currency">
                    <div className="model-details-left-body">
                      <div className="model-details-left-body-stats for-recent-margin hours">
                        <AiOutlineDollarCircle className="model-details-left-body-stats-icon para-margin" />
                        <p>
                          {Object.values(topPerformerModels)[4] &&
                          strategies[
                            Object.values(topPerformerModels)[4].strategy_name
                          ]
                            ? `${
                                strategies[
                                  Object.values(topPerformerModels)[4]
                                    .strategy_name
                                ].currency
                              }`
                            : null}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="model-details-right-card-inner-graph">
              {Object.values(topPerformerModels)[4] ? (
                <ModelDetailsRightGraph
                  model_name={
                    Object.values(topPerformerModels)[4].strategy_name
                  }
                />
              ) : (
                <div className="best-performing-spline">
                  <div className="container loader-container">
                    <ThreeDots
                      className="backtest-loader"
                      color="#fddd4e"
                      height={80}
                      width={80}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
