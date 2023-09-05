const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {
  Server
} = require("socket.io");
const database = require("./Database/Database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use((error, req, res, next) => {
  const serverCode = error.status || 500;
  const message = error.message || "Internal issues.";
  res.status(serverCode).send({
    status: false,
    message,
  });
});

// CREATING HTTP SERVER
const server = http.createServer(app);

// CREATING SERVER CONNECTIONS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let socketId = "";

// CREATING SERVER ACTIONS WITH SOCKET.IO
io.on("connection", (socket) => {
  socketId = socket.id;
  console.log(socket.id);

  socket.on("join_chat", (data) => {
    socket.join(data);
    console.log("User id " + socket.id + " joined room " + data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.team).emit("receive_message", data);

    console.log(data)
  });

  socket.on("disconnect", () => {
    // console.log("user " + socket.id + " is disconnected")
  });
});

// CREATING SUPPORT TEAM TICKET OR CHAT
app.post("/create_support", (req, res, next) => {
  try {
    const {
      user_id,
      sent_message
    } = req.body;

    const ticketID = "ticket_sp" + Math.floor(10000000 + Math.random() * 99999999);

    const creatingTicket = `INSERT INTO support_tickets (user_id, ticket_id, status)
      VALUES ('${user_id}', '${ticketID}', '0')`;

    database.query(creatingTicket, (err, results) => {
      if (err) {
        res.status(400).json({
          status: false,
          message: "Having issues",
          err,
        });
      } else {
        const creatingTicketTable = ` CREATE TABLE IF NOT EXISTS ${ticketID} (
    id INT(200) AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    ticket_id VARCHAR(50) NOT NULL,
    socket_id TEXT NOT NULL,
    sent_message TEXT NOT NULL,
    status INT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;
        database.query(creatingTicketTable, (err, creatingResult) => {
          if (err) {
            res.status(400).json({
              status: false,
              message: "Having issues",
              err,
            });
          } else {
            const socketCall = ""

            const insertingTicketValues = `INSERT INTO ${ticketID} (user_id, ticket_id, socket_id, sent_message, status)
      VALUES ('${user_id}', '${ticketID}', '${socketId}', '${sent_message}', '0')`;

            database.query(insertingTicketValues, (err, results) => {
              if (err) {
                res.status(400).json({
                  status: false,
                  message: "Having issues",
                  err,
                });
              } else {
                res.status(200).json({
                  status: true,
                  message: "Successfully created ticket ",
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    next();
  }
});

// CREATING TECHNICAL TEAM TICKET OR CHAT
app.post("/create_technical", (req, res, next) => {
  try {
    const {
      user_id,
      sent_message
    } = req.body;
    const ticketID =
      "ticket_tc" + Math.floor(10000000 + Math.random() * 99999999);
    const creatingTicket = `INSERT INTO technical_tickets (user_id, ticket_id, status)
      VALUES ('${user_id}', '${ticketID}', '0')`;

    database.query(creatingTicket, (err, results) => {
      if (err) {
        res.status(400).json({
          status: false,
          message: "Having issues",
          err,
        });
      } else {
        const creatingTicketTable = ` CREATE TABLE IF NOT EXISTS ${ticketID} (
    id INT(200) AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    ticket_id VARCHAR(50) NOT NULL,
    socket_id TEXT NOT NULL,
    sent_message TEXT NOT NULL,
    status INT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;
        database.query(creatingTicketTable, (err, creatingResult) => {
          if (err) {
            res.status(400).json({
              status: false,
              message: "Having issues",
              err,
            });
          } else {
            const insertingTicketValues = `INSERT INTO ${ticketID} (user_id, ticket_id, socket_id, sent_message, status)
      VALUES ('${user_id}', '${ticketID}','${socketId}', '${sent_message}', '0')`;

            database.query(insertingTicketValues, (err, results) => {
              if (err) {
                res.status(400).json({
                  status: false,
                  message: "Having issues",
                  err,
                });
              } else {
                res.status(200).json({
                  status: true,
                  message: "Successfully created ticket ",
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    next();
  }
});

// CREATING BILLING TEAM TICKET OR CHAT
app.post("/create_billing", (req, res, next) => {
  try {
    const {
      user_id,
      sent_message
    } = req.body;
    const ticketID =
      "ticket_bl" + Math.floor(10000000 + Math.random() * 99999999);
    const creatingTicket = `INSERT INTO billing_tickets (user_id, ticket_id, status)
      VALUES ('${user_id}', '${ticketID}', '0')`;

    database.query(creatingTicket, (err, results) => {
      if (err) {
        res.status(400).json({
          status: false,
          message: "Having issues",
          err,
        });
      } else {
        const creatingTicketTable = ` CREATE TABLE IF NOT EXISTS ${ticketID} (
    id INT(200) AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    ticket_id VARCHAR(50) NOT NULL,
    socket_id TEXT NOT NULL,
    sent_message TEXT NOT NULL,
    status INT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;
        database.query(creatingTicketTable, (err, creatingResult) => {
          if (err) {
            res.status(400).json({
              status: false,
              message: "Having issues",
              err,
            });
          } else {
            const insertingTicketValues = `INSERT INTO ${ticketID} (user_id, ticket_id, socket_id, sent_message, status)
      VALUES('${user_id}', '${ticketID}', '${socketId}', '${sent_message}', '0')
      `;

            database.query(insertingTicketValues, (err, results) => {
              if (err) {
                res.status(400).json({
                  status: false,
                  message: "Having issues",
                  err,
                });
              } else {
                res.status(200).json({
                  status: true,
                  message: "Successfully created ticket ",
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    next();
  }
});

// THIS WILL INSERTS MESSAGES AND TICKET DATA AS PER UI INPUTS AND TICKET ID
app.post("/ticket/:id", (req, res, next) => {
  try {
    const {
      user_id,
      sent_message
    } = req.body;
    const insertingTicketValues = `INSERT INTO ${req.params.id} (user_id, ticket_id,socket_id, sent_message, status)
      VALUES ('${user_id}', '${req.params.id}','${socketId}', '${sent_message}', '0')`;

    database.query(insertingTicketValues, (err, results) => {
      if (err) {
        res.status(400).json({
          status: false,
          message: "Having issues",
          err,
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Successfully inserted ticket ",
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/:name/:id", (req, res, next) => {
  try {
    const fetchTickets = (table) => {
      return new Promise((resolve, reject) => {
        const checkSql = `SELECT * FROM ${table}`;
        database.query(checkSql, (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
      })
    }
    const checkSql = `SELECT * FROM ${req.params.name} WHERE user_id='${req.params.id}'`;
    database.query(checkSql, async (err, results) => {
      if (err) {
        res.status(400).json({
          status: false,
          message: "Having issues",
          err,
        });
      } else {
        for (let i = 0; i < results.length; i++) {
          results[i].ticket = await fetchTickets(results[i].ticket_id)
        }
        res.status(200).json({
          status: true,
          message: "Successful",
          results
        });
      }
    });
  } catch (error) {
    next(error)
  }
})

// SERVER LISTENING AT 3200
server.listen(3200, () => {
  console.log("Listening on 3200");
});