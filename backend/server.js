const express = require("express");
const app = express();
app.use(express.json());

const ServerRoutes = require('./route/ServerRoutes');
require('./model/connection/ConnectionDB');


const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', ServerRoutes);

module.exports = app.listen(4000, () => {
  console.log("Listening on 4000");
});
