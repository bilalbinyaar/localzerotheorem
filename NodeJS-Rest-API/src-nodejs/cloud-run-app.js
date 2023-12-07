/**
 * Cloud Run application that generates and delivers dynamiocally generated content.
 */

const express = require("express");
const cors = require("cors");
const redis = require("redis");

const app = express();
app.use(cors());
const mysql = require("mysql");
var flag_for_redis_client = true;
// var ledgers_listeners_objs = [];
const db = mysql.createPool({
  connectionLimit: 100,
  host: "34.134.161.148",
  user: "sorez",
  waitForConnections: true,
  password: "sorez",
  database: "zero_theorem_mysql",
});

db.getConnection((err, con) => {
  if (err) {
    console.log(err.code);
  } else {
    console.log("Database is connected successfully");
  }
});
const redisClient = redis.createClient({
  host: process.env.REDIS_IP,
});
redisClient.on("error", function (error) {
  console.error(error);
});

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  redisClient.set("key", "value!", redis.print);
  redisClient.get("key", (err, reply) => {
    res.send(`
    <html>
      <head>
      </head>
      <body>
        <p>Connecting to Redis at: ${process.env.REDIS_IP}</p>
        <p>Value of key just read: ${reply}</p>
      </body>
    </html>
    `);
  });
});
app.get("/get_strategies", async function (req, res) {
  if (req.headers.authorization) {
    const secretKey = req.headers.authorization.replace("Bearer ", "");
    if (secretKey == process.env.API_KEY) {
      try {
        redisClient.get("strategies", async function (err, data) {
          if (err) {
            console.error(err);
            throw err;
          }
          if (data != null) {
            // Return cached data
            redisClient.ttl(`strategies`, function (err, ttl) {
              if (err) {
                console.error(err);
                throw err;
              }
              res.json({
                response: JSON.parse(data),
                cached: true,
                ttl: ttl,
              });
            });
          } else {
            // Query the database and cache the result for 1 hour
            const query = "select * from Strategies";
            db.query(query, async function (err, result) {
              if (err) {
                console.error(err);
                throw err;
              } else {
                const resultStr = JSON.stringify(result);
                const now = new Date();
                const minutesToNextHour = 60 - now.getMinutes() + 13;
                const expiry = new Date(
                  now.getTime() + minutesToNextHour * 60 * 1000
                ); // Set expiry time to the next starting hour (UTC time)
                const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                redisClient.setex("strategies", timeToLive, resultStr);
                res.json({
                  response: result,
                  timer: timeToLive,
                  cached: false,
                });
              }
            });
          }
        });
      } catch (error) {
        // If redisClient or db.query fails, fallback to direct SQL query
        const query = "select * from Strategies";
        db.query(query, async function (err, result) {
          if (err) {
            console.error(err);
            res.json({ response: err });
          } else {
            res.json({ response: result, cached: false });
          }
        });
      }
    } else {
      res.json({ response: "Unauthorized access" });
    }
  } else {
    res.json({ response: "Unauthorized access" });
  }
});

app.get("/get_stats", async function (req, res) {
  if (req.headers.authorization) {
    const secretKey = req.headers.authorization.replace("Bearer ", "");
    if (secretKey == process.env.API_KEY) {
      try {
        redisClient.get("get_stats", async function (err, data) {
          if (err) {
            console.error(err);
            throw err;
          }
          if (data != null) {
            // Return cached data
            res.json({ response: JSON.parse(data), cached: true });
          } else {
            // Query the database and cache the result for 1 hour
            const query = "select * from Stats";
            db.query(query, async function (err, result) {
              if (err) {
                console.error(err);
                throw err;
              } else {
                const resultStr = JSON.stringify(result);
                const now = new Date();
                const minutesToNextHour = 60 - now.getMinutes() + 13;
                const expiry = new Date(
                  now.getTime() + minutesToNextHour * 60 * 1000
                ); // Set expiry time to the next starting hour (UTC time)
                const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                redisClient.setex("get_stats", timeToLive, resultStr);
                res.json({
                  response: result,
                  cached: false,
                  timer: timeToLive,
                });
              }
            });
          }
        });
      } catch (error) {
        console.error("Redis error:", error);
        // If redisClient fails, fallback to direct SQL query
        const query = "select * from Stats";
        db.query(query, async function (err, result) {
          if (err) {
            console.error(err);
            res.json({ response: err });
          } else {
            res.json({ response: result, cached: false });
          }
        });
      }
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
      try {
        redisClient.get(
          `get_stats_backtest:${ledger}`,
          async function (err, data) {
            if (err) {
              console.error(err);
              throw err;
            }
            if (data != null) {
              // Return cached data
              res.json({ response: JSON.parse(data), cached: true });
            } else {
              // Query the database and cache the result for 1 hour
              const query = `SELECT * FROM ${ledger}`;
              db.query(query, async function (err, result) {
                if (err) {
                  res.json({ response: err });
                } else {
                  const resultStr = JSON.stringify(result);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(
                    `get_stats_backtest:${ledger}`,
                    timeToLive,
                    resultStr
                  );
                  res.json({
                    response: result,
                    cached: false,
                    timer: timeToLive,
                  });
                }
              });
            }
          }
        );
      } catch (error) {
        // If Redis is unable to connect, fallback to querying the database directly
        console.error("Redis error:", error);
        const query = `SELECT * FROM ${ledger}`;
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({
              response: result,
              cached: false,
              timer: 0,
            });
          }
        });
      }
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
      try {
        redisClient.get("get_twitter_stats", async function (err, data) {
          if (err) {
            console.error(err);
            throw err;
          }
          if (data != null) {
            // Return cached data
            res.json({ response: JSON.parse(data), cached: true });
          } else {
            // Query the database and cache the result for 1 hour
            const query = "select * from twitter_stats";
            db.query(query, async function (err, result) {
              if (err) {
                res.json({ response: err });
                throw err;
              } else {
                const resultStr = JSON.stringify(result);
                const now = new Date();
                const minutesToNextHour = 60 - now.getMinutes() + 13;
                const expiry = new Date(
                  now.getTime() + minutesToNextHour * 60 * 1000
                ); // Set expiry time to the next starting hour (UTC time)
                const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                redisClient.setex(
                  "get_twitter_stats",
                  timeToLive,
                  resultStr,
                  function (err) {
                    if (err) {
                      console.error(err);
                      throw err;
                    }
                  }
                );
                res.json({
                  response: result,
                  cached: false,
                  timer: timeToLive,
                });
              }
            });
          }
        });
      } catch (error) {
        console.error(error);
        const query = "select * from twitter_stats";
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({ response: result, cached: false });
          }
        });
      }
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
      try {
        redisClient.get(
          `get_7d_pnl:${req.params.ledger}`,
          async function (err, data) {
            if (err) {
              console.error(err);
              throw err;
            }
            if (data != null) {
              // Return cached data
              res.json({ response: JSON.parse(data), cached: true });
            } else {
              // Query the database and cache the result for 1 hour
              var query = `SELECT * FROM ${req.params.ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) desc limit 1;`;
              db.query(query, async function (err, result) {
                if (err) {
                  res.json({ response: err });
                } else {
                  const resultStr = JSON.stringify(result);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(
                    `get_7d_pnl:${req.params.ledger}`,
                    timeToLive,
                    resultStr
                  );
                  res.json({
                    response: result,
                    cached: false,
                    timer: timeToLive,
                  });
                }
              });
            }
          }
        );
      } catch (error) {
        console.error(error);
        var query = `SELECT * FROM ${req.params.ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) desc limit 1;`;
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({ response: result });
          }
        });
      }
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
      try {
        redisClient.get(
          `get_date_added_ledger:${req.params.ledger}`,
          async function (err, data) {
            if (err) {
              console.error(err);
              throw err;
            }
            if (data != null) {
              // Return cached data
              res.json({ response: JSON.parse(data), cached: true });
            } else {
              // Query the database and cache the result for 1 hour
              var query = `SELECT * FROM ${req.params.ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc limit 1;`;
              db.query(query, async function (err, result) {
                if (err) {
                  res.json({ response: err });
                } else {
                  const resultStr = JSON.stringify(result);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13 + 15;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(
                    `get_date_added_ledger:${req.params.ledger}`,
                    timeToLive,
                    resultStr
                  );
                  res.json({
                    response: result,
                    cached: false,
                    timer: timeToLive,
                  });
                }
              });
            }
          }
        );
      } catch (e) {
        console.error(e);
        // Respond directly from SQL in case of an error with Redis
        var query = `SELECT * FROM ${req.params.ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc limit 1;`;
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({ response: result });
          }
        });
      }
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
      try {
        redisClient.get(
          `get_strategy_${req.params.name}`,
          async function (err, data) {
            if (err) {
              console.error(err);
              throw err;
            }
            if (data != null) {
              // Return cached data
              res.json({ response: JSON.parse(data), cached: true });
            } else {
              // Query the database and cache the result for 1 hour
              var query = `select * from Strategies where strategy_name = '${req.params.name}'`;
              db.query(query, async function (err, result) {
                if (err) {
                  res.json({ response: err });
                } else {
                  const resultStr = JSON.stringify(result);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(
                    `get_strategy_${req.params.name}`,
                    timeToLive,
                    resultStr
                  );
                  res.json({
                    response: result,
                    cached: false,
                    timer: timeToLive,
                  });
                }
              });
            }
          }
        );
      } catch (e) {
        console.error(e);
        // Respond directly from database
        var query = `select * from Strategies where strategy_name = '${req.params.name}'`;
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({ response: result });
          }
        });
      }
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
      try {
        redisClient.get(
          `get_stat_${req.params.name}`,
          async function (err, data) {
            if (err) {
              console.error(err);
              throw err;
            } else if (data != null) {
              // Return cached data
              res.json({ response: JSON.parse(data), cached: true });
            } else {
              // Query the database and cache the result for 1 hour
              var query = `select * from Stats where strategy_name = '${req.params.name}'`;
              db.query(query, async function (err, result) {
                if (err) {
                  res.json({ response: err });
                } else {
                  const resultStr = JSON.stringify(result);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(
                    `get_stat_${req.params.name}`,
                    timeToLive,
                    resultStr
                  );
                  res.json({
                    response: result,
                    cached: false,
                    timer: timeToLive,
                  });
                }
              });
            }
          }
        );
      } catch (error) {
        console.error(error);
        // Fallback to SQL in case of Redis errors
        var query = `select * from Stats where strategy_name = '${req.params.name}'`;
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({ response: result, cached: false });
          }
        });
      }
    } else {
      res.json({ response: "Unauthorized access" });
    }
  } else {
    res.json({ response: "Unauthorized access" });
  }
});

app.get("/get_btc_minute_data/:date", async function (req, res) {
  // console.log("I am here to print query", req.params.ledger);
  // console.log(req.params.name);
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
  // console.log("I am here to print query", req.params.ledger);
  // console.log(req.params.name);
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

// app.get("/get_btc_minute_data/:date", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       redisClient.get(
//         `btc_minute_data_${req.params.date}`,
//         async function (err, data) {
//           if (err) {
//             console.error(err);
//           }
//           if (data != null) {
//             // Return cached data
//             // Return cached data and remaining TTL in seconds
//             redisClient.ttl(
//               `btc_minute_data_${req.params.date}`,
//               function (err, ttl) {
//                 if (err) {
//                   console.error(err);
//                 }
//                 res.json({
//                   response: JSON.parse(data),
//                   cached: true,
//                   ttl: ttl,
//                 });
//               }
//             );
//           } else {
//             // Query the database and cache the result for 1 hour
//             var query = `select * from bitmex_minute_xbtusd where timestamp >= ${req.params.date}`;
//             db.query(query, async function (err, result) {
//               if (err) {
//                 res.json({ response: err });
//               } else {
//                 const resultStr = JSON.stringify(result);
//                 const now = new Date();
//                 const minutesToNextHour = 60  - now.getMinutes() + 13;
//                 const expiry = new Date(
//                   now.getTime() + minutesToNextHour * 60 * 1000
//                 ); // Set expiry time to the next starting hour (UTC time)
//                 const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//                 redisClient.setex(
//                   `btc_minute_data_${req.params.date}`,
//                   timeToLive,
//                   resultStr
//                 );
//                 res.json({
//                   response: result,
//                   cached: false,
//                   timer: timeToLive,
//                 });
//               }
//             });
//           }
//         }
//       );
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });

// app.get("/get/position_percentage", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       redisClient.get("position_percentage", async function (err, data) {
//         if (err) {
//           console.error(err);
//         }
//         if (data != null) {
//           // Return cached data
//           res.json({ response: JSON.parse(data), cached: true });
//         } else {
//           // Query the database and cache the result for 1 hour
//           var query = `select * from position_percentage`;
//           db.query(query, async function (err, result) {
//             if (err) {
//               res.json({ response: err });
//             } else {
//               const resultStr = JSON.stringify(result);
//               const now = new Date();
//               const minutesToNextHour = 60  - now.getMinutes() + 13;
//               const expiry = new Date(
//                 now.getTime() + minutesToNextHour * 60 * 1000
//               ); // Set expiry time to the next starting hour (UTC time)
//               const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//               redisClient.setex("position_percentage", timeToLive, resultStr);
//               res.json({ response: result, cached: false, timer: timeToLive });
//             }
//           });
//         }
//       });
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });

// app.get("/get/current_position", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       redisClient.get("current_position", async function (err, data) {
//         if (err) {
//           console.error(err);
//         }
//         if (data != null) {
//           // Return cached data
//           res.json({ response: JSON.parse(data), cached: true });
//         } else {
//           // Query the database and cache the result for 1 hour
//           var query = "select * from current_position";
//           db.query(query, async function (err, result) {
//             if (err) {
//               res.json({ response: err });
//             } else {
//               const resultStr = JSON.stringify(result);
//               const now = new Date();
//               const minutesToNextHour = 60  - now.getMinutes() + 13;
//               const expiry = new Date(
//                 now.getTime() + minutesToNextHour * 60 * 1000
//               ); // Set expiry time to the next starting hour (UTC time)
//               const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//               redisClient.setex("current_position", 3600, resultStr);
//               res.json({ response: result, cached: false, timer: timeToLive });
//             }
//           });
//         }
//       });
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });

app.get("/get/position_percentage", async function (req, res) {
  // console.log("I am here to print query", req.params.ledger);
  // console.log(req.params.name);

  if (req.headers.authorization) {
    const secretKey = req.headers.authorization.replace("Bearer ", "");
    if (secretKey == process.env.API_KEY) {
      var query = `select * from position_percentage`;
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
  // console.log("I am here to print query", req.params.ledger);
  // console.log(req.params.name);
  if (req.headers.authorization) {
    const secretKey = req.headers.authorization.replace("Bearer ", "");
    if (secretKey == process.env.API_KEY) {
      var query = `select * from current_position`;
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
      try {
        redisClient.get(ledger, async function (err, data) {
          if (err) {
            console.error(err);
            throw err; // Throw the error to catch block
          }
          if (data != null) {
            // Return cached data
            // console.log("Here is date for ledger -->", )
            // res.json({ response: JSON.parse(data), cached: true });
            const query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
            db.query(query, async function (err, result) {
              if (err) {
                res.json({ response: err });
              } else {
                res.json({ response: result, cached: false });
              }
            });
          } else {
            // Query the database and cache the result for 1 hour
            // const query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
            // db.query(query, async function (err, result) {
            //   if (err) {
            //     res.json({ response: err });
            //   } else {
            //     const resultStr = JSON.stringify(result);
            //     const now = new Date();
            //     const minutesToNextHour = 60 - now.getMinutes() + 13;
            //     const expiry = new Date(
            //       now.getTime() + minutesToNextHour * 60 * 1000
            //     ); // Set expiry time to the next starting hour (UTC time)
            //     const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
            //     redisClient.setex(ledger, timeToLive, resultStr);
            //     res.json({
            //       response: result,
            //       cached: false,
            //       timer: timeToLive,
            //     });
            //   }
            // });

            if (ledger.includes("R")) {
              var curr_timeH = parseInt(ledger.split("R")[1].split("B")[0]);
              // Cache the ledger if it is not already in Redis
              const ledger_query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
              db.query(ledger_query, async function (error, queryResult) {
                if (error) {
                  console.error(error);
                  return;
                } else {
                  const resultStr = JSON.stringify(queryResult);
                  const utcNow = new Date();
                  const hours = utcNow.getUTCHours();
                  const minutes = utcNow.getUTCMinutes();
                  const seconds = utcNow.getUTCSeconds();
                  if (curr_timeH == 1) {
                    remaining_minutes = 60 - minutes;
                    remaining_seconds = 60 - seconds;
                    total_seconds = remaining_minutes * 60 + remaining_seconds;
                    const timeToLive = total_seconds;

                    redisClient.set(
                      ledger,
                      resultStr,
                      "NX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            } time horizon ${curr_timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            }time horizon ${curr_timeH} time to live ${timeToLive} redis message ${redisResult} on client side`
                          );
                          res.json({
                            response: queryResult,
                            cached: false,
                            timer: timeToLive,
                          });
                        }
                      }
                    );
                  } else {
                    const nextOccurrenceHours =
                      Math.floor(hours / curr_timeH) * curr_timeH + curr_timeH;
                    const remainingHours = nextOccurrenceHours - hours - 1;

                    remaining_minutes = 60 - minutes;
                    remaining_seconds = 60 - seconds;
                    total_seconds =
                      remaining_minutes * 60 +
                      remaining_seconds +
                      remainingHours * 60 * 60;
                    const timeToLive = total_seconds;

                    redisClient.set(
                      ledger,
                      resultStr,
                      "NX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            } time horizon ${curr_timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            } time horizon ${curr_timeH} time to live ${timeToLive} redis message ${redisResult}`
                          );
                          res.json({
                            response: queryResult,
                            cached: false,
                            timer: timeToLive,
                          });
                        }
                      }
                    );
                  }
                }
              });
            } else if (ledger.includes("M")) {
              var curr_timeH = parseInt(ledger.split("M")[1].split("B")[0]);
              // Cache the ledger if it is not already in Redis
              const ledger_query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
              db.query(ledger_query, async function (error, queryResult) {
                if (error) {
                  console.error(error);
                  return;
                } else {
                  const resultStr = JSON.stringify(queryResult);
                  const utcNow = new Date();
                  const hours = utcNow.getUTCHours();
                  const minutes = utcNow.getUTCMinutes();
                  const seconds = utcNow.getUTCSeconds();
                  if (curr_timeH == 1) {
                    remaining_minutes = 60 - minutes;
                    remaining_seconds = 60 - seconds;
                    total_seconds = remaining_minutes * 60 + remaining_seconds;
                    const timeToLive = total_seconds;

                    redisClient.set(
                      ledger,
                      resultStr,
                      "NX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            } time horizon ${curr_timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            }time horizon ${curr_timeH} time to live ${timeToLive} redis message ${redisResult} on client side`
                          );
                          res.json({
                            response: queryResult,
                            cached: false,
                            timer: timeToLive,
                          });
                        }
                      }
                    );
                  } else {
                    const nextOccurrenceHours =
                      Math.floor(hours / curr_timeH) * curr_timeH + curr_timeH;
                    const remainingHours = nextOccurrenceHours - hours - 1;

                    remaining_minutes = 60 - minutes;
                    remaining_seconds = 60 - seconds;
                    total_seconds =
                      remaining_minutes * 60 +
                      remaining_seconds +
                      remainingHours * 60 * 60;
                    const timeToLive = total_seconds;

                    redisClient.set(
                      ledger,
                      resultStr,
                      "NX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            } time horizon ${curr_timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger} with length ${queryResult.length
                            } time horizon ${curr_timeH} time to live ${timeToLive} redis message ${redisResult} on client side`
                          );
                          res.json({
                            response: queryResult,
                            cached: false,
                            timer: timeToLive,
                          });
                        }
                      }
                    );
                  }
                }
              });
            } else {
              const query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
              db.query(query, async function (err, result) {
                if (err) {
                  res.json({ response: err });
                } else {
                  res.json({ response: result, cached: false });
                }
              });
            }
          }
        });
      } catch (error) {
        // Handle Redis error by fetching data from SQL database directly
        const query = `SELECT * FROM ${ledger}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
        db.query(query, async function (err, result) {
          if (err) {
            res.json({ response: err });
          } else {
            res.json({ response: result, cached: false });
          }
        });
      }
    } else {
      res.json({ response: "Unauthorized access" });
    }
  } else {
    res.json({ response: "Unauthorized access" });
  }
});

// app.get("/get/live_returns", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       try {
//         redisClient.get("live_returns", async function (err, data) {
//           if (err) {
//             console.error(err);
//             throw err;
//           }
//           if (data != null) {
//             // Return cached data
//             redisClient.ttl(`live_returns`, function (err, ttl) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               }
//               res.json({
//                 response: JSON.parse(data),
//                 cached: true,
//                 ttl: ttl,
//               });
//             });
//           } else {
//             // Query the database and cache the result for 1 hour
//             const query = "select * from live_returns";
//             db.query(query, async function (err, result) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               } else {
//                 const resultStr = JSON.stringify(result);
//                 const now = new Date();
//                 const minutesToNextHour = 60 - now.getMinutes() + 13;
//                 const expiry = new Date(
//                   now.getTime() + minutesToNextHour * 60 * 1000
//                 ); // Set expiry time to the next starting hour (UTC time)
//                 const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//                 redisClient.setex("live_returns", timeToLive, resultStr);
//                 res.json({
//                   response: result,
//                   timer: timeToLive,
//                   cached: false,
//                 });
//               }
//             });
//           }
//         });
//       } catch (error) {
//         // If redisClient or db.query fails, fallback to direct SQL query
//         const query = "select * from live_returns";
//         db.query(query, async function (err, result) {
//           if (err) {
//             console.error(err);
//             res.json({ response: err });
//           } else {
//             res.json({ response: result, cached: false });
//           }
//         });
//       }
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });

app.get("/get/live_returns", async function (req, res) {
  // console.log("I am here to print query", req.params.ledger);
  // console.log(req.params.name);
  if (req.headers.authorization) {
    const secretKey = req.headers.authorization.replace("Bearer ", "");
    if (secretKey == process.env.API_KEY) {
      var query = `select * from live_returns`;
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
  // console.log("I am here to print query", req.params.ledger);
  // console.log(req.params.name);
  if (req.headers.authorization) {
    const secretKey = req.headers.authorization.replace("Bearer ", "");
    if (secretKey == process.env.API_KEY) {
      var query = `select * from live_pnls`;
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
// app.get("/get/live_pnls", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       try {
//         redisClient.get("live_pnls", async function (err, data) {
//           if (err) {
//             console.error(err);
//             throw err;
//           }
//           if (data != null) {
//             // Return cached data
//             redisClient.ttl(`live_pnls`, function (err, ttl) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               }
//               res.json({
//                 response: JSON.parse(data),
//                 cached: true,
//                 ttl: ttl,
//               });
//             });
//           } else {
//             // Query the database and cache the result for 1 hour
//             const query = "select * from live_pnls";
//             db.query(query, async function (err, result) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               } else {
//                 const resultStr = JSON.stringify(result);
//                 const now = new Date();
//                 const minutesToNextHour = 60 - now.getMinutes() + 13;
//                 const expiry = new Date(
//                   now.getTime() + minutesToNextHour * 60 * 1000
//                 ); // Set expiry time to the next starting hour (UTC time)
//                 const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//                 redisClient.setex("live_pnls", timeToLive, resultStr);
//                 res.json({
//                   response: result,
//                   timer: timeToLive,
//                   cached: false,
//                 });
//               }
//             });
//           }
//         });
//       } catch (error) {
//         // If redisClient or db.query fails, fallback to direct SQL query
//         const query = "select * from live_pnls";
//         db.query(query, async function (err, result) {
//           if (err) {
//             console.error(err);
//             res.json({ response: err });
//           } else {
//             res.json({ response: result, cached: false });
//           }
//         });
//       }
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });

// app.get("/get/live_stats", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       try {
//         redisClient.get("live_stats", async function (err, data) {
//           if (err) {
//             console.error(err);
//             throw err;
//           }
//           if (data != null) {
//             // Return cached data
//             redisClient.ttl(`live_stats`, function (err, ttl) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               }
//               res.json({
//                 response: JSON.parse(data),
//                 cached: true,
//                 ttl: ttl,
//               });
//             });
//           } else {
//             // Query the database and cache the result for 1 hour
//             const query = "select * from live_stats";
//             db.query(query, async function (err, result) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               } else {
//                 const resultStr = JSON.stringify(result);
//                 const now = new Date();
//                 const minutesToNextHour = 60 - now.getMinutes() + 13;
//                 const expiry = new Date(
//                   now.getTime() + minutesToNextHour * 60 * 1000
//                 ); // Set expiry time to the next starting hour (UTC time)
//                 const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//                 redisClient.setex("live_stats", timeToLive, resultStr);
//                 res.json({
//                   response: result,
//                   timer: timeToLive,
//                   cached: false,
//                 });
//               }
//             });
//           }
//         });
//       } catch (error) {
//         // If redisClient or db.query fails, fallback to direct SQL query
//         const query = "select * from live_stats";
//         db.query(query, async function (err, result) {
//           if (err) {
//             console.error(err);
//             res.json({ response: err });
//           } else {
//             res.json({ response: result, cached: false });
//           }
//         });
//       }
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });
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
// app.get("/get/live_strategies", async function (req, res) {
//   if (req.headers.authorization) {
//     const secretKey = req.headers.authorization.replace("Bearer ", "");
//     if (secretKey == process.env.API_KEY) {
//       try {
//         redisClient.get("live_strategies", async function (err, data) {
//           if (err) {
//             console.error(err);
//             throw err;
//           }
//           if (data != null) {
//             // Return cached data
//             redisClient.ttl(`live_strategies`, function (err, ttl) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               }
//               res.json({
//                 response: JSON.parse(data),
//                 cached: true,
//                 ttl: ttl,
//               });
//             });
//           } else {
//             // Query the database and cache the result for 1 hour
//             const query = "select * from live_strategies";
//             db.query(query, async function (err, result) {
//               if (err) {
//                 console.error(err);
//                 throw err;
//               } else {
//                 const resultStr = JSON.stringify(result);
//                 const now = new Date();
//                 const minutesToNextHour = 60 - now.getMinutes() + 13;
//                 const expiry = new Date(
//                   now.getTime() + minutesToNextHour * 60 * 1000
//                 ); // Set expiry time to the next starting hour (UTC time)
//                 const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
//                 redisClient.setex("live_strategies", timeToLive, resultStr);
//                 res.json({
//                   response: result,
//                   timer: timeToLive,
//                   cached: false,
//                 });
//               }
//             });
//           }
//         });
//       } catch (error) {
//         // If redisClient or db.query fails, fallback to direct SQL query
//         const query = "select * from live_strategies";
//         db.query(query, async function (err, result) {
//           if (err) {
//             console.error(err);
//             res.json({ response: err });
//           } else {
//             res.json({ response: result, cached: false });
//           }
//         });
//       }
//     } else {
//       res.json({ response: "Unauthorized access" });
//     }
//   } else {
//     res.json({ response: "Unauthorized access" });
//   }
// });
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

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
