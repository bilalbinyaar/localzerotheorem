// THIS COMPONENT IS BEING USED
import React, { useState } from 'react';
// eslint-disable-next-line
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'highlight.js/styles/default.css';
import { PrismCode } from 'react-prism';
import 'prismjs/themes/prism.css';
import Swal from 'sweetalert2';
import { FiCopy } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

function Documentation() {
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedHeadingIndex(index);
    hamClickRes();
    handleiamClickRes();
  };

  const [toggleRes, setToggleRes] = useState(false);
  const hamClickRes = () => setToggleRes(!toggleRes);

  const [iamClickRes, setiamClickRes] = useState(false);
  const handleiamClickRes = () => setiamClickRes(!iamClickRes);

  function oneClickRes() {
    hamClickRes();
    handleiamClickRes();
  }

  const headings = [];
  const pythonCode = [
    `!pip install zerotheorem-python\nimport zerotheorem-python as zt`,
    "import zerotheorem-python as zt \nauth_token = 'your authentication token'\nzt.authenticate(auth_token)\n",
    "import zerotheorem-python as zt \nauth_token = 'your authentication token'\nzt.authenticate(auth_token)\nzt.get_forecast('strategy name')\n",
    "import zerotheorem-python as zt \nauth_token = 'your authentication token'\nzt.authenticate(auth_token)\nzt.get_stats('strategy name')\n",
    "import zerotheorem-python as zt \nauth_token = 'your authentication token'\nzt.authenticate(auth_token)\nzt.get_ledger('strategy name')\n",
    "import zerotheorem-python as zt \nauth_token = 'your authentication token'\nzt.authenticate(auth_token)\nzt.get_historical_forecasts('strategy name')\n",
  ];
  const contents = [
    <div className="content-main-div">
      <h1 className="lineheight-docs">
        Installing the zerotheorem-python Package
      </h1>
      <p className="lineheight-docs">
        To install the zerotheorem-python package, you can use pip, which is a
        package manager for Python. If you don't have pip installed already, you
        can install it by following the instructions in the official
        documentation at
        <a href="https://pip.pypa.io/en/stable/installation/">
          https://pip.pypa.io/en/stable/installation/
        </a>
      </p>
      <br />
      <p className="lineheight-docs">
        Once you have pip installed, you can install the zerotheorem-python
        package by running the following command in your terminal:
      </p>
      <pre className="lineheight-docs prism-style">
        pip install zerotheorem-python
      </pre>
      <br />
      <p className="lineheight-docs">
        This will download and install the latest version of the
        zerotheorem-python package and its dependencies.
      </p>
      <br />

      <p className="lineheight-docs">
        After installation, you can import the package into your Python script
        or interactive shell using the following command:
      </p>
      <pre className="lineheight-docs">import zerotheorem as zt</pre>
      <br />

      <p className="lineheight-docs">
        This will allow you to use the functions and classes provided by the
        zerotheorem package in your code.
      </p>
      <h3 className="lineheight-docs for-mt-secondary">Python Code</h3>
    </div>,

    <div className="content-main-div">
      <h1 className="lineheight-docs">API Authentication</h1>
      <h2 className="lineheight-docs">Function Name</h2>
      <p className="lineheight-docs">authenticate</p>
      <h2 className="lineheight-docs for-mt-secondary">Description</h2>
      <p className="lineheight-docs">
        This function does not return anything, but it sets the authentication
        credentials for the user session.
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Parameters</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>
            <code>auth_token</code>
          </strong>{' '}
          (string): The authentication token obtained from the API key.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Return Value</h2>
      <p className="lineheight-docs">
        This function does not return anything, but it sets the authentication
        credentials for the user session.{' '}
      </p>
      <h3 className="lineheight-docs for-mt-secondary">Python Code</h3>
    </div>,

    <div className="content-main-div">
      <h1 className="lineheight-docs">Get Forecast</h1>
      <h2 className="lineheight-docs">Function Name</h2>
      <p className="lineheight-docs"> get_forecast</p>
      <h2 className="lineheight-docs for-mt-secondary">Description</h2>
      <p className="lineheight-docs">
        This function takes a strategy name as input and returns forecast for
        that strategy..
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Parameters</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>strategy_name</strong> (string): The name of the strategy for
          which forecast is requested. This is a required parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Return Value</h2>
      <p className="lineheight-docs">
        The function returns a list of dictionaries with the following keys and
        values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>forecast_timestamp</strong> (int): The timestamp of the
          forecast in Unix time.
        </li>
        <li>
          <strong>prediction</strong> (string): The prediction made by the
          strategy for this forecast, either "long" or "short".
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Example Usage</h2>
      <p className="lineheight-docs">
        To get the forecast for a strategy named "ZT1-0M24BTC1", you can call
        the function like this:
      </p>
      <pre className="lineheight-docs">zt.get_forecast("ZT1-0M24BTC1")</pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the historical
        forecasts for the specified strategy, which will look something like
        this:
      </p>
      <h3 className="lineheight-docs for-mt-secondary">Python Code</h3>
    </div>,
    <div className="content-main-div">
      <h1 className="lineheight-docs">Get Stats</h1>
      <h2 className="lineheight-docs">Function Name</h2>
      <p className="lineheight-docs">get_stats</p>
      <h2 className="lineheight-docs for-mt-secondary">Description</h2>
      <p className="lineheight-docs">
        This function takes a strategy name as input and returns a dictionary
        with stats for that strategy. <br />
        The stats include data such as the current drawdown, average drawdown,
        maximum drawdown, <br /> R-squared score, Sharpe ratio, Sortino ratio,
        total profit and loss, win-loss ratio, win percentage, <br />
        loss percentage, consecutive wins and losses, and profit and loss sums
        over different time periods.
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Parameters</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>strategy_name</strong> (string): The name of the strategy for
          which stats are requested. This is a required parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Return Value</h2>
      <p className="lineheight-docs">
        The function returns a dictionary with the following keys and values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>rank</strong> (int): The rank of the strategy based on its
          performance.
        </li>
        <li>
          <strong>strategy_name</strong> (string): The name of the strategy used
          by the strategy.
        </li>
        <li>
          <strong>current_drawdown</strong> (float): The current drawdown for
          the strategy, as a percentage.
        </li>
        <li>
          <strong>curr_drawdown_duration</strong> (int): The duration of the
          current drawdown, in days.
        </li>
        <li>
          <strong>average_drawdown</strong> (float): The average drawdown for
          the strategy, as a percentage.
        </li>
        <li>
          <strong>average_drawdown_duration</strong> (float): The average
          duration of drawdowns, in days.
        </li>
        <li>
          <strong>max_drawdown</strong> (float): The maximum drawdown for the
          strategy, as a percentage.
        </li>
        <li>
          <strong>max_drawdown_duration</strong> (int): The duration of the
          maximum drawdown, in days.
        </li>
        <li>
          <strong>r2_score</strong> (float): The R-squared score for the
          strategy.
        </li>
        <li>
          <strong>sharpe</strong> (float): The Sharpe ratio for the strategy.
        </li>
        <li>
          <strong>sortino</strong> (float): The Sortino ratio for the strategy.
        </li>
        <li>
          <strong>total_pnl</strong> (float): The total profit or loss for the
          strategy, as a percentage.
        </li>
        <li>
          <strong>average_daily_pnl</strong> (float): The average daily profit
          or loss for the strategy, as a percentage.
        </li>
        <li>
          <strong>win_loss_ratio</strong> (float): The win-loss ratio for the
          strategy.
        </li>
        <li>
          <strong>total_positive_pnl</strong> (float): The total profit for the
          strategy, as a percentage.
        </li>
        <li>
          <strong>total_negative_pnl</strong> (float): The total loss for the
          strategy,as a percentage.!pip install numpy pandas zerotheorem-python
          import os import datetime import numpy as np import pandas as pd
          import zerotheorem-python as zt auth_token = 'your authentication
          token' zt.authenticate(auth_token)
          zt.get_historical_forecasts('strategy name')
        </li>
        <li>
          <strong>total_wins</strong> (int): The total number of winning trades
          for the strategy.
        </li>
        <li>
          <strong>total_losses</strong> (int): The total number of losing trades
          for the strategy.
        </li>
        <li>
          <strong>consecutive_wins</strong> (int): The longest streak of
          consecutive winning trades for the strategy.
        </li>
        <li>
          <strong>consecutive_losses</strong> (int): The longest streak of
          consecutive losing trades for the strategy.
        </li>
        <li>
          <strong>win_percentage</strong> (float): The percentage of winning
          trades for the strategy.
        </li>
        <li>
          <strong>loss_percentage</strong> (float): The percentage of losing
          trades for the strategy.
        </li>
        <li>
          <strong>pnl_sum_1</strong> (float): The sum of the strategy's profit
          and loss over the last 1 day, as a percentage.
        </li>
        <li>
          <strong>pnl_sum_7</strong> (float): The sum of the strategy's profit
          and loss over the last 7 days, as a percentage.
        </li>
        <li>
          <strong>pnl_sum_15</strong> (float): The sum of the strategy's profit
          and loss over the last 15 days, as a percentage.
        </li>
        <li>
          <strong>pnl_sum_30</strong> (float): The sum of the strategy's profit
          and loss over the last 30 days, as a percentage.
        </li>
        <li>
          <strong>pnl_sum_45</strong> (float): The sum of the strategy's profit
          and loss over the last 45 days, as a percentage.
        </li>
        <li>
          <strong>pnl_sum_60</strong> (float): The sum of the strategy's profit
          and loss over the last 60 days, as a percentage.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Example Usage</h2>
      <p className="lineheight-docs">
        To get stats for a strategy named "strategy name", you can call the
        function like this:
      </p>
      <pre className="lineheight-docs">zt.get_stats("ZT1-0M24BTC1")</pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the strategy stats.
      </p>

      <h3 className="lineheight-docs for-mt-secondary">Python Code</h3>
    </div>,

    <div className="content-main-div">
      <h1 className="lineheight-docs">Get Ledger</h1>
      <h2 className="lineheight-docs">Function Name</h2>
      <p className="lineheight-docs">get_ledger</p>
      <h2 className="lineheight-docs for-mt-secondary">Description</h2>
      <p className="lineheight-docs">
        This function takes a strategy name as input and returns a dictionary
        with information on the ledger for that strategy. The ledger includes
        data such as the timestamp of the last transaction, the action taken
        (long or short), the buy and sell prices, the profit and loss (PNL), the
        current balance, the total PNL, the ledger key, and the drawdown.
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Parameters</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>strategy_name</strong> (string): The name of the strategy for
          which the ledger information is requested. This is a required
          parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Return Value</h2>
      <p className="lineheight-docs">
        The function returns a dictionary with the following keys and values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>ledger_timestamp</strong> (int): The timestamp of the last
          transaction in the ledger, in Unix time.
        </li>
        <li>
          <strong>action</strong> (string): The action taken in the last
          transaction, either "long" or "short".
        </li>
        <li>
          <strong>buy_price</strong> (int): The buy price of the last
          transaction.
        </li>
        <li>
          <strong>sell_price</strong> (int): The sell price of the last
          transaction. If no sell transaction has been made yet, this value will
          be 0.
        </li>
        <li>
          <strong>pnl</strong> (float): The profit or loss from the last
          transaction, as a percentage.
        </li>
        <li>
          <strong>balance</strong> (float): The current balance of the strategy.
        </li>
        <li>
          <strong>pnl_sum</strong> (float): The total profit or loss for all
          transactions made by the strategy, as a percentage.
        </li>
        <li>
          <strong>ledger_key</strong> (int): A unique identifier for the ledger
          entry.
        </li>
        <li>
          <strong>drawdown</strong> (float): The current drawdown for the
          strategy, as a percentage.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Example Usage</h2>
      <p className="lineheight-docs">
        To get the ledger information for a strategy named "ZT1-0M24BTC1", you
        can call the function like this:
      </p>
      <pre className="lineheight-docs">zt.get_ledger("ZT1-0M24BTC1")</pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the ledger for the
        specified strategy.
      </p>
      <h3 className="lineheight-docs for-mt-secondary">Python Code</h3>
    </div>,
    <div className="content-main-div">
      <h1 className="lineheight-docs">Get Historical Forecasts</h1>
      <h2 className="lineheight-docs">Function Name</h2>
      <p className="lineheight-docs">get_historical_forecasts</p>
      <h2 className="lineheight-docs for-mt-secondary">Description</h2>
      <p className="lineheight-docs">
        This function takes a strategy name as input and returns a dictionary
        with information on the historical forecasts for that strategy. The
        historical forecasts include data such as the timestamp of the forecast,
        and the prediction made by the strategy (long or short).
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Parameters</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>strategy_name</strong> (string): The name of the strategy for
          which the historical forecasts are requested. This is a required
          parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Return Value</h2>
      <p className="lineheight-docs">
        The function returns a list of dictionaries with the following keys and
        values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>forecast_timestamp</strong> (int): The timestamp of the
          forecast in Unix time.
        </li>
        <li>
          <strong>prediction</strong> (string): The prediction made by the
          strategy for this forecast, either "long" or "short".
        </li>
      </ul>
      <h2 className="lineheight-docs for-mt-secondary">Example Usage</h2>
      <p className="lineheight-docs">
        To get the historical forecasts for a strategy named "ZT1-0M24BTC1", you
        can call the function like this:
      </p>
      <pre className="lineheight-docs">
        zt.get_historical_forecasts("ZT1-0M24BTC1")
      </pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the historical
        forecasts for the specified strategy, which will look something like
        this:
      </p>
      <h3 className="lineheight-docs for-mt-secondary">Python Code</h3>
    </div>,
    <div className="content-main-div">
      <h1 className="lineheight-docs">
        Run a Backtest on the Forecasts of any Strategy
      </h1>
      <h2 className="lineheight-docs">Install dependencies</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode>
            {'!pip install numpy pandas zerotheorem-python'}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Import Libraries</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode>
            {
              'import os\nimport datetime\nimport numpy as np\nimport pandas as pd\nimport zerotheorem-python as zt'
            }
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Read Data</h2>
      <p>
        In order to run the backtest, you should have a minute level candles
        file for BTC covering the duration on which you want to run the
        backtest. Required columns are datetime, open, high, low, and close
      </p>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {"df_minute = pd.read_csv('path_to_your_btc_minute_data_file.csv')"}
          </PrismCode>
        </pre>
      </p>
      <p>Fetch the forecasts of the strategy you want to backtest</p>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`auth_token = 'your authentication token'
zt.authenticate(auth_token)
strategy_name = 'strategy_name'
df_forecasts = pd.DataFrame(zt.get_historical_forecasts(strategy_name))`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Backtest Class</h2>
      <p>Below is the backtest class that can be used to run the backtest</p>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`class Backtest:
    def __init__(self, df_preds, df_minute, time_horizon, starting_balance, transaction_fee, take_profit_percent, stop_loss_percent):
        self.df_preds = df_preds
        self.df_minute = df_minute
        self.balance = starting_balance
        self.transaction_fee = transaction_fee
        self.order_delay_minutes = order_delay_minutes
        self.time_horizon = time_horizon
        self.current_hour = -1
        self.sell_on_same_direction = sell_on_same_direction
        self.take_profit_percent = take_profit_percent / 100
        self.stop_loss_percent = stop_loss_percent / 100

        self.np_directions = np.array([])
        self.np_direction_change_indexes = np.array([])
        self.np_minute_datetime = np.array([])
        self.np_minute_open = np.array([])
        self.np_minute_high = np.array([])
        self.np_minute_low = np.array([])
        self.np_minute_close = np.array([[]])

        self.in_position = False
        self.current_direction = ""
        self.buy_index = 0
        self.buy_price = 0
        self.ledger_list = []
        self.hit_take_profit = False
        self.take_profit_hour = -1

    def data_pre_processing(self):
        start_date, end_date = self.df_preds.iloc[0]['date'], self.df_preds.iloc[-1]['date']
        self.df_minute = self.df_minute[(self.df_minute.date >= start_date) & (self.df_minute.date <= (end_date))]

        assert start_date in self.df_minute['date'].values, "start date is not in minute data"
        assert end_date in self.df_minute['date'].values, "end date is not in minute data"

    def dfs_to_np(self):
        # convert required df columns to np
        self.np_directions = self.df_preds['predicted_direction'].to_numpy()
        self.np_minute_datetime = self.df_minute['date'].to_numpy()
        self.np_minute_open = self.df_minute['open'].to_numpy()
        self.np_minute_high = self.df_minute['high'].to_numpy()
        self.np_minute_low = self.df_minute['low'].to_numpy()
        self.np_minute_close = self.df_minute['close'].to_numpy()

        # create direction change indexes np
        self.np_direction_change_indexes = np.zeros(self.np_directions.size)
        self.np_direction_change_indexes[np.where(self.np_directions[:-1] != self.np_directions[1:])[0] + 1] = 1

        # create 2D minutes data nps according to the time_horizon, e.g. [5400 x 60]
        self.np_minute_datetime = np.array([np.array(self.np_minute_datetime[i:i+self.time_horizon]) 
                                     for i in range(0, len(self.np_minute_datetime), self.time_horizon)])

        self.np_minute_open = np.array([np.array(self.np_minute_open[i:i+self.time_horizon]) 
                                     for i in range(0, len(self.np_minute_open), self.time_horizon)])

        self.np_minute_high = np.array([np.array(self.np_minute_high[i:i+self.time_horizon]) 
                                     for i in range(0, len(self.np_minute_high), self.time_horizon)])

        self.np_minute_low = np.array([np.array(self.np_minute_low[i:i+self  .time_horizon)])

        self.np_minute_close = np.array([np.array(self.np_minute_close[i:i+self.time_horizon]) 
                                     for i in range(0, len(self.np_minute_close), self.time_horizon)])

    def calculate_pnl(self, sell_price):
        pnl_percent = 0.0
        if self.current_direction == "long":
            pnl_percent = ((sell_price - self.buy_price) / self.buy_price) * 100
        elif self.current_direction == "short":
            pnl_percent = ((self.buy_price - sell_price) / self.buy_price) * 100

        pnl_percent = pnl_percent - self.transaction_fee

        self.balance = self.balance + (self.balance * (pnl_percent / 100))

        return pnl_percent

    def check_take_profit_stop_loss(self):
        if self.hit_take_profit:
            self.check_trailing_stop_loss(0)
            return
        
        tp_index = sl_index = self.time_horizon + 1
        tp_indexes = sl_indexes = np.array([])
        if self.np_directions[self.current_hour] > 0:    # long
            take_profit_value = self.buy_price + (self.buy_price * self.take_profit_percent)
            stop_loss_value = self.buy_price - (self.buy_price * self.stop_loss_percent)

            tp_indexes = np.where(self.np_minute_high[self.current_hour][self.buy_index::] > take_profit_value)[0]
            sl_indexes = np.where(self.np_minute_low[self.current_hour][self.buy_index::] < stop_loss_value)[0]

        else:   # short
            take_profit_value = self.buy_price - (self.buy_price * self.take_profit_percent)
            stop_loss_value = self.buy_price + (self.buy_price * self.stop_loss_percent)
            
            tp_indexes = np.where(self.np_minute_low[self.current_hour][self.buy_index::] < take_profit_value)[0]
            sl_indexes = np.where(self.np_minute_high[self.current_hour][self.buy_index::] > stop_loss_value)[0]
        
        if tp_indexes.size != 0:   # hit take_profit
            tp_index = tp_indexes[0]

        if sl_indexes.size != 0:   # hit stop_loss
            sl_index = sl_indexes[0]
        
        if tp_index < sl_index:    # take_profit before stop_loss
            if self.np_directions[self.current_hour] > 0:    # long
                sale_price = self.np_minute_high[self.current_hour][tp_index + self.buy_index]
            else:
                sale_price = self.np_minute_low[self.current_hour][tp_index + self.buy_index]

            sale_datetime = self.np_minute_datetime[self.current_hour][tp_index + self.buy_index]

            if self.in_position:
                # pnl_percent = self.calculate_pnl(sale_price)
                pnl_percent = self.take_profit_percent
                self.balance = self.balance + (self.balance * pnl_percent)  # remove this line if uncommenting above calculate_pnl function
                self.ledger_list.append([sale_datetime, "take_profit", self.buy_price, sale_price, pnl_percent * 100, self.balance])

                self.in_position = False
                self.buy_price = 0
        
        elif sl_index < tp_index:
            if self.np_directions[self.current_hour] > 0:    # long
                sale_price = self.np_minute_low[self.current_hour][sl_index + self.buy_index]
            else:
                sale_price = self.np_minute_high[self.current_hour][sl_index + self.buy_index]

            sale_datetime = self.np_minute_datetime[self.current_hour][sl_index + self.buy_index]

            # pnl_percent = self.calculate_pnl(sale_price)
            pnl_percent = self.stop_loss_percent + self.slippage_percent
            self.balance = self.balance - (self.balance * pnl_percent)  # remove this line if uncommenting above calculate_pnl function
            self.ledger_list.append([sale_datetime, "stop_loss", self.buy_price, sale_price, pnl_percent*-100, self.balance])

            self.in_position = False
            self.buy_price = 0

    def buy(self):
        self.buy_index = self.order_delay_minutes
        action = 'long' if self.np_directions[self.current_hour] > 0 else 'short'
        buy_datetime = self.np_minute_datetime[self.current_hour][self.buy_index]
        self.buy_price = self.np_minute_open[self.current_hour][self.buy_index]
        self.balance = self.balance - (self.balance * (self.transaction_fee / 100))
        self.ledger_list.append([buy_datetime, action, self.buy_price, 0.0, self.transaction_fee * -1, self.balance])

        self.current_direction = action
        self.hit_take_profit = False
        self.in_position = True
        self.take_profit_hour = -1

    def sell(self):
        sale_index = self.order_delay_minutes
        sale_datetime = self.np_minute_datetime[self.current_hour][sale_index]
        sale_price = self.np_minute_open[self.current_hour][sale_index]

        pnl_percent = self.calculate_pnl(sale_price)

        self.ledger_list.append([sale_datetime, "sell", self.buy_price, sale_price, pnl_percent, self.balance])

        self.in_position = False
        self.buy_price = 0
        self.hit_take_profit = False
        self.take_profit_hour = -1

    def run(self):
        self.data_pre_processing()
        self.dfs_to_np()

        for i in range(0, self.np_directions.size):
            if self.balance <= 100:
                ledger = pd.DataFrame(self.ledger_list, columns=["date", "action", "buy_price", "sell_price", "pnl_percent", "balance"])
                return ledger, -100, -100, -100, -100

            if i == 0:
                self.current_direction = self.previous_direction = self.np_directions[i]
            
            self.current_hour = i

            if self.sell_on_same_direction and i != 0:
                if self.in_position:
                    self.sell()

            if self.np_direction_change_indexes[i] == 1:
                if self.in_position:
                    self.sell()

            if not self.in_position:
                self.buy()
            
            self.check_take_profit_stop_loss()

        ledger = pd.DataFrame(self.ledger_list, columns=["date", "action", "buy_price", "sell_price", "pnl_percent", "balance"])

        return ledger


`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">
        Define Backtest Parameters and run the backtest
      </h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`time_horizon = 'time_horizon_of_the_strategy_in_minutes'  # e.g. 24h equates to 1440
starting_balance = 'starting_balance_of_the_backtest' # e.g. 1000
transaction_fee = 'transaction_fee_in_percent_per_transaction' # e.g. 0.05
take_profit_percent = 'take_profit_percecntage' # e.g. 3, if no take_profit then set this to 100
stop_loss_percent = 'stop_loss_percent' # e.g. 3, if no stop_loss then set this to 100

`}
          </PrismCode>
        </pre>
      </p>
      <p>Now define backtest object, run the backtest, and save the results</p>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`obj_backtest = OneKindBacktest(df_forecasts, df_minute, time_horizon, starting_balance, trasnaction_fee, \ntake_profit_percent, stop_loss_percent)
df_ledger = obj_backtest.run()
df_ledger.to_csv('path_where_to_save_the_output_ledger.csv')


`}
          </PrismCode>
        </pre>
      </p>
      <p>
        You can view the backtest output in the CSV format (datetime, direction,
        buy_price, sell_price, pnl_percent, pnl_sum, balance on each interval)
        at the path where you saved df_ledger above
      </p>
    </div>,
    <div className="content-main-div">
      <h1 className="lineheight-docs">
        Trade on an Ensemble of the Forecasts of Multiple Strategies
      </h1>
      <h2 className="lineheight-docs">Install dependencies</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`!pip install pandas zerotheorem-python
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Import Libraries</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`import zerotheorem-python as zt
import pandas as pd
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Ensemble Method</h2>

      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`def get_ensembled_forecast(rule, list_forecasts):
    ensembled_forecast = 0
    list_forecasts = [1 if item == 'long' else -1 if item == 'short' else item for item in the_list]

    if rule.lower() == "majority":
        count_1 = list_forecasts.count(1)
        count_neg_1 = list_forecasts.count(-1)

        if count_1 > count_neg_1:
            ensembled_forecast = 1

        elif count_1 < count_neg_1:
            ensembled_forecast = -1

        else:
            ensembled_forecast = 0  # No clear majority

    elif rule.lower() == "unanimous":
        if all(forecast == 1 for forecast in list_forecasts):
            ensembled_forecast = 1
        elif all(forecast == -1 for forecast in list_forecasts):
            ensembled_forecast = -1
        else:
            value = 0
    
    else:
        print("Invalid rule!")
    
    return ensembled_forecast
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">
        Initialize and Get Ensembled Forecasts
      </h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`auth_token = 'your authentication token'
zt.authenticate(auth_token)
list_strategies = ['strategy_1', 'strategy_2', 'strategy_3']   # names of the strategies you want to create an ensemble for
list_forecasts = []

for strategy_name in list_strategies:
    df_forecast = pd.DataFrame(zt.get_forecast(strategy_name))
    list_forecasts.append(df_forecast['prediction'])

ensemble_rule = "majority"   # majority or unanimous

ensembled_forecast = get_ensembled_forecast(ensemble_rule, list_forecasts)

print("Ensembled Forecast: ", ensembled_forecast)`}
          </PrismCode>
        </pre>
      </p>
    </div>,
    <div className="content-main-div">
      <h1 className="lineheight-docs">
        Listen and be Alerted When a new Forecast of a Strategy Arrives
      </h1>
      <h2 className="lineheight-docs">Install dependencies</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`!pip install pandas zerotheorem-python
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Import Libraries</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`import zerotheorem-python as zt
import pandas as pd
import threading
import time
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Define the Listener</h2>

      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`def listen_new_forecasts(strategy_name)
    df_prev_forecast = None
    While True:
        try:
            df_forecast = pd.DataFrame(zt.get_forecast(strategy_name))
        except:
            time.sleep(10)
            continue

        if df_prev_forecast not None:
            if df_forecast['timestamp'] > df_prev_forecast['timestamp']:   # new forecast
                # PERFORM ANY OPERATION ON THE NEWW FORECAST HERE
                new_forecast = df_forecast['prediction']
                print(strategy_name, new_forecast)
        
        df_prev_forecast = df_forecast

        time.sleep(2)    # Check after every 2 seconds, this can be increased/decreased
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">
        Initialize and Run the Listener for a Single Strategy
      </h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`auth_token = 'your authentication token'
zt.authenticate(auth_token)
strategy_name = 'strategy_name'   # name of the strategy you want to listen to

listen_new_forecasts(strategy_name)`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">
        Initialize and Run the Listeners for a Multiple Strategies
      </h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`auth_token = 'your authentication token'
zt.authenticate(auth_token)
list_strategies = ['strategy_1', 'strategy_2', 'strategy_3']   # names of the strategies you want to listen to

for strategy_name in list_strategies:
    threading.Thread(target=listen_new_forecasts, args=(strategy_name,)).start()`}
          </PrismCode>
        </pre>
      </p>
      <p>Listener for each strategy will be running in its own thread</p>
    </div>,
    <div className="content-main-div">
      <h1 className="lineheight-docs">
        Listen and be Alerted When a new Forecast of a Strategy Arrives
      </h1>
      <h2 className="lineheight-docs">Install dependencies</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`!pip install pandas zerotheorem-python
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">Import Libraries</h2>
      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`import pandas as pd
import zerotheorem-python as zt
`}
          </PrismCode>
        </pre>
      </p>
      <h2 className="lineheight-docs for-mt-secondary">
        Define the Best Metric and Get Stats of all Strategies
      </h2>

      <p className="lineheight-docs">
        <pre className="language-python">
          <PrismCode language="python">
            {`best_metric = "r2_score"     # The metric you want to sort by, it can be any metric, e.g. shaarpe, alpha, beta, sortino, total_pnl, etc.

list_strategies = ["strategy_1", "strategy_2", "strategy_3", "strategy_4", "strategy_5"]

auth_token = 'your authentication token'
zt.authenticate(auth_token)
strategy_name = 'strategy_name'
list_stats = []

for strategy_name in list_strategies:
    list_stats.append(pd.DataFrame(zt.get_stats(strategy_name)))

indices = [i for i, df in sorted(enumerate(dataframes), key=lambda x: x[1][best_metric].iloc[0])]

# Print the indices of the sorted dataframes
rank = 1
for idx in indices:
    print(f"Rank {rank} | {list_strategies[idx]}")
    rank += 1
`}
          </PrismCode>
        </pre>
      </p>

      <p>
        The above code will print the best strategies based on the best_metric,
        e.g. best strategies based on r2_score are
      </p>
      <br></br>
      <p>Rank 1 | Strategy 5</p>
      <br></br>
      <p>Rank 2 | Strategy 1</p>
      <br></br>
      <p>Rank 3 | Strategy 3</p>
      <br></br>
      <p>Rank 4 | Strategy 2</p>
      <br></br>
      <p>Rank 5 | Strategy 4</p>
    </div>,
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode[selectedHeadingIndex]).then(() => {
      Swal.fire({
        title: 'Code copied!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
    });
  };

  return (
    <div className="documentation">
      <div className="container">
        {/* SIDEBAR FOR MOBILE VIEW */}
        <div className="heading-mob" onClick={oneClickRes}>
          <h1>Documentation</h1>
          <div>{iamClickRes ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
        </div>

        {toggleRes && (
          <div id="for-mob-sidebar" className="side-bar side-bar-api-mobile">
            <div className="for-hr sidebar-hr"></div>

            <div className="sidebar-navigator">
              <ul className="documentation-items">
                <li
                  className={selectedHeadingIndex === 0 ? 'active' : ''}
                  onClick={() => handleClick(0)}
                >
                  Installation
                </li>
                <li
                  className={selectedHeadingIndex === 1 ? 'active' : ''}
                  onClick={() => handleClick(1)}
                >
                  API Authentication
                </li>
                <li
                  className={selectedHeadingIndex === 2 ? 'active' : ''}
                  onClick={() => handleClick(2)}
                >
                  Get Forecast
                </li>
                <li
                  className={selectedHeadingIndex === 3 ? 'active' : ''}
                  onClick={() => handleClick(3)}
                >
                  Get Stats
                </li>

                <li
                  className={selectedHeadingIndex === 4 ? 'active' : ''}
                  onClick={() => handleClick(4)}
                >
                  Get Ledger
                </li>
                <li
                  className={selectedHeadingIndex === 5 ? 'active' : ''}
                  onClick={() => handleClick(5)}
                >
                  Get Historical Forecasts
                </li>
                <li
                  className={selectedHeadingIndex === 6 ? 'active' : ''}
                  onClick={() => handleClick(6)}
                >
                  Use Case: Run Backtest
                </li>
                <li
                  className={selectedHeadingIndex === 7 ? 'active' : ''}
                  onClick={() => handleClick(7)}
                >
                  Use Case: Ensemble Forecasts
                </li>
                <li
                  className={selectedHeadingIndex === 8 ? 'active' : ''}
                  onClick={() => handleClick(8)}
                >
                  Use Case: Forecast Listener
                </li>
                <li
                  className={selectedHeadingIndex === 9 ? 'active' : ''}
                  onClick={() => handleClick(9)}
                >
                  Use Case: Sort by any Metric
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SIDEBAR FOR WEB */}
        <div className="side-bar-api">
          <div className="sidebar-head">
            <h1>Documentation</h1>
          </div>
          <div className="for-hr sidebar-documentation"></div>
          <ul className="documentation-items">
            <li
              className={selectedHeadingIndex === 0 ? 'active' : ''}
              onClick={() => handleClick(0)}
            >
              Installation
            </li>
            <li
              className={selectedHeadingIndex === 1 ? 'active' : ''}
              onClick={() => handleClick(1)}
            >
              API Authentication
            </li>
            <li
              className={selectedHeadingIndex === 2 ? 'active' : ''}
              onClick={() => handleClick(2)}
            >
              Get Forecast
            </li>
            <li
              className={selectedHeadingIndex === 3 ? 'active' : ''}
              onClick={() => handleClick(3)}
            >
              Get Stats
            </li>

            <li
              className={selectedHeadingIndex === 4 ? 'active' : ''}
              onClick={() => handleClick(4)}
            >
              Get Ledger
            </li>
            <li
              className={selectedHeadingIndex === 5 ? 'active' : ''}
              onClick={() => handleClick(5)}
            >
              Get Historical Forecasts
            </li>
            <li
              className={selectedHeadingIndex === 6 ? 'active' : ''}
              onClick={() => handleClick(6)}
            >
              Use Case: Run Backtest
            </li>
            <li
              className={selectedHeadingIndex === 7 ? 'active' : ''}
              onClick={() => handleClick(7)}
            >
              Use Case: Ensemble Forecasts
            </li>
            <li
              className={selectedHeadingIndex === 8 ? 'active' : ''}
              onClick={() => handleClick(8)}
            >
              Use Case: Forecast Listener
            </li>
            <li
              className={selectedHeadingIndex === 9 ? 'active' : ''}
              onClick={() => handleClick(9)}
            >
              Use Case: Sort by any Metric
            </li>
          </ul>
        </div>

        <div className="content-wrapper">
          <div className="content">
            <h1 className="documentation-heading">
              {headings[selectedHeadingIndex]}
            </h1>
            <p>{contents[selectedHeadingIndex]}</p>
          </div>
          {selectedHeadingIndex + 1 > pythonCode.length ? null : (
            <div className="code-container">
              <div className="copy">
                <IconContext.Provider value={{ className: 'copy-icon' }}>
                  <FiCopy onClick={handleCopy} />
                </IconContext.Provider>
              </div>
              <pre className="language-python">
                <PrismCode>{pythonCode[selectedHeadingIndex]}</PrismCode>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Documentation;
