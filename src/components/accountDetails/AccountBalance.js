import { useState, useEffect } from "react";
import React from 'react';

const AccountBalance = () => {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(process.env.REACT_APP_API + `/get/live_exchange`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data["account_info"] = {
                bitmex_btc_balance: data["response"][i].bitmex_btc_balance,
                bitmex_usd_balance: data["response"][i].bitmex_usd_balance,
                okx_btc_balance: data["response"][i].okx_btc_balance,
                okx_usd_balance: data["response"][i].okx_usd_balance,
              };
            }

            if (temp_data.length != 0) {
              setStats(temp_data);
              console.log("Here is stats -->", temp_data)
              // console.log("Here is stats -->", temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          })
          .catch((err) => {
            // alert("Error occured");
          });
      }
      setTimeout(() => {
        fetch(process.env.REACT_APP_API + `/get/live_exchange`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = {};
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data["account_info"] = {
                bitmex_btc_balance: data["response"][i].bitmex_btc_balance,
                bitmex_usd_balance: data["response"][i].bitmex_usd_balance,
                okx_btc_balance: data["response"][i].okx_btc_balance,
                okx_usd_balance: data["response"][i].okx_usd_balance,
              };
            }

            if (temp_data.length != 0) {
              setStats(temp_data);
              // console.log("Here is stats -->", temp_data)
              // console.log("Here is stats -->", temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          })
          .catch((err) => {
            // alert("Error occured");
          });
        // .catch((err) => alert("Error occured"));
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);

  return (
    <div className="balance-details">
      <div className="container">
        <div className="top-div heading-accounts">
          <h1>Account Detail</h1>
        </div>
        <div className="balance-details-wrapper">
          <div className="balance-details-content">
            <h3>Total BTC Balance</h3>
            {stats["account_info"] ? <h2>
              {(stats["account_info"].okx_btc_balance + stats["account_info"].bitmex_btc_balance).toFixed(5)} <strong>BTC</strong>
            </h2> : null}

          </div>
          <div className="balance-details-content">
            <h3>Total USD Balance</h3>
            {stats["account_info"] ? <h2>
              {(stats["account_info"].okx_usd_balance + stats["account_info"].bitmex_usd_balance).toFixed(1)} <strong>USD</strong>
            </h2> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
