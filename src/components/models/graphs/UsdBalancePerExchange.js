import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../../../ContextProvider";
import { ThreeDots } from "react-loader-spinner";
import { Label } from "recharts";

const UsdBalancePerExchange = (props) => {
    // console.log("Model name -->", props.model_name);
    const [model_name, set_model_name] = useState(props.model_name);
    if (model_name != props.model_name) {
        set_model_name(props.model_name);
    }
    const [isLoaded, setIsLoaded] = useState(false);

    const [stats, setStats] = useState(null);
    const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);
    const [usdBalance, setUsdBalance] = useState([])
    const [btcBalance, setBtcBalance] = useState([])
    const { stats_cache, Set_stats_cache } = useStateContext();
    useEffect(() => {
        try {
            if (props.model_name.includes("collection")) {
                fetch(
                    "https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_exchange",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data["response"].length);
                        var model_names = [];
                        var usd_balance = [];
                        var btc_balance = [];
                        var balance = [];
                        // console.log("Here is data -->", data)
                        // for (var i = 0; i < data["response"].length; i++) {
                        // console.log(data["response"][i].btc_balances);
                        model_names.push("Bitmex");
                        model_names.push("Okx")
                        balance.push(data["response"][0].bitmex_usd_balance);
                        balance.push(data["response"][0].okx_usd_balance);
                        // btc_balance.push(data["reposnse"][i].btc_balances);

                        if (model_name.length > 0) {
                            // console.log("Sortable -->", model_names);

                            // const sorted = Object.keys(model_names)
                            //   .map((key) => {
                            //     return { ...model_names[key], key };
                            //   })
                            //   .sort((a, b) => b.total_pnl - a.total_pnl);
                            setBtcBalance(balance)
                            setUsdBalance(usd_balance)
                            setLabels(model_names);
                            setIsLoaded(true);
                            // console.log("Final output", model_names, btc_balance)
                            // console.log("Allocations ", allocations, data);
                            // setIsLoaded(true);

                            // Set_sorted_stats_cache({ sorted_stats: sorted });
                        }
                    })
                    .catch((err) => console.log(err));
            }
        } catch (error) {
            console.log("Error occured ", error);
        }
    }, [model_name]);

    const options = {
        labels: labels,
        colors: ["#666699",
            "#e600e6",],
        chart: {
            width: 380,
            height: 260,
            type: "donut",
        },
        plotOptions: {
            pie: {
                startAngle: -70,
                endAngle: 290,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: "gradient",
        },
        legend: {
            formatter: function (val, opts) {
                return (
                    val.replace(/_/g, "-") +
                    "     " +
                    opts.w.globals.series[opts.seriesIndex]

                );
            },
        },

        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <div id="chart" className="donut-chart">
            {isLoaded ? (
                <ReactApexChart
                    options={options}
                    series={btcBalance}
                    type="donut"
                    height={300}
                    width={450}
                />
            ) : (
                <div className="container loader-container">
                    <ThreeDots
                        className="backtest-loader"
                        color="#fddd4e"
                        height={80}
                        width={80}
                    />
                </div>
            )}
        </div>
    );
};

export default UsdBalancePerExchange;
