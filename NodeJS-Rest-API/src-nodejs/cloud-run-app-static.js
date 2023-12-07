/**
 * Cloud Run application that generates and delivers dynamiocally generated content.
 */

const express = require("express");
const cors = require("cors");
const redis = require("redis");
require('dotenv').config();
const app = express();
app.use(cors({
    origin: "http://zt.neurog.ai",
    methods: ["GET", "POST"]
}));

const mysql = require("mysql");
var flag_for_redis_client = true;
// var ledgers_listeners_objs = [];
const db = mysql.createConnection({
    host: "192.168.18.123",
    user: "sorez",
    password: "Pak123@@@",
    port: "3306",
    database: "zero_theorem_mysql",

});

// const db = mysql.createPool({
//     host: '203.175.73.20',
//     user: 'sorez',
//     password: 'Pak123@@@',
//     database: 'zero_theorem_mysql',
//     connectionLimit: 10, // Adjust this number based on your needs
// });

// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     if (connection) {
//         console.log('Database connection successful'); // Add this line

//     }

// });

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');

    // You can perform database operations here

    // Don't forget to close the connection when done
    // db.end((err) => {
    //     if (err) {
    //         console.error('Error closing MySQL connection:', err);
    //     } else {
    //         console.log('MySQL connection closed');
    //     }
    // });
});

app.get("/", (req, res) => {
    res.send(`
      <html>
        <head>
        </head>
        <body>
          <p>Database successfully connected ${process.env.API_KEY}</p>
        </body>
      </html>
      `);
});
app.get("/get_strategies", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            try {
                const query = "SELECT * FROM Strategies";
                db.query(query, async function (err, result) {
                    if (err) {
                        console.error(err);
                        res.json({ response: err });
                    } else {
                        res.json({ response: result, cached: false });
                    }
                });
            } catch (error) {
                console.error(error);
                res.json({ response: "An error occurred" });
            }
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});



// Your database setup (e.g., MySQL) and environment variables should be configured here.

app.get("/get_stats", async function (req, res) {
    console.log("I am here to listen you bro")
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            const query = "select * from Stats";
            db.query(query, async function (err, result) {
                if (err) {
                    console.error(err);
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_stats_backtest/:ledger", async function (req, res) {
    const ledger = req.params.ledger;

    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            const query = `SELECT * FROM ${ledger}`;
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_twitter_stats", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            const query = "select * from twitter_stats";
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_7d_pnl/:ledger", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `SELECT * FROM ${req.params.ledger} ORDER BY LPAD(lower(ledger_key), 6,0) desc limit 1;`;
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_date_added_ledger/:ledger", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `SELECT * FROM ${req.params.ledger} ORDER BY LPAD(lower(ledger_key), 6,0) asc limit 1;`;
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_strategy/:name", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from Strategies where strategy_name = '${req.params.name}'`;
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_stat/:name", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from Stats where strategy_name = '${req.params.name}'`;
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get_btc_minute_data/:date", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from bitmex_minute_xbtusd where timestamp >= ${req.params.date}`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/get_okx_minute_data/:date", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from okx_minute where timestamp >= ${req.params.date}`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/get/position_percentage", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = "select * from position_percentage";
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/get/current_position", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = "select * from current_position";
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/:ledger", async function (req, res) {
    const ledger = req.params.ledger;

    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            const query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
            db.query(query, async function (err, result) {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/get/live_returns", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = "select * from live_returns";
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get/live_pnls", async function (req, res) {
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = "select * from live_pnls";
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/get/live_stats", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_stats`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get/live_stats/:name", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_stats where strategy_name = '${req.params.name}'`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get/live_strategies", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_strategies`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get/live_strategies/:name", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_strategies where strategy_name = '${req.params.name}'`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});
app.get("/get/live_correlations", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_correlations`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});
app.get("/get/kelly_allocation", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from kelly_allocation`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});
app.get("/get/kelly_growth", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from kelly_growth`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});
app.get("/get/live_risk_metrics", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_risk_metrics`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});


app.get("/get/live_accounts", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_accounts`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

app.get("/get/live_exchange", async function (req, res) {
    // console.log("I am here to print query", req.params.ledger);
    // console.log(req.params.name);
    if (req.headers.authorization) {
        const secretKey = req.headers.authorization.replace("Bearer ", "");
        if (secretKey == process.env.API_KEY) {
            var query = `select * from live_exchange`;
            db.query(query, (err, result) => {
                if (err) {
                    res.json({ response: err });
                } else {
                    res.json({ response: result, cached: false });
                }
            });
        } else {
            res.json({ response: "Unauthorized access" });
        }
    } else {
        res.json({ response: "Unauthorized access" });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
