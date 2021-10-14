const express = require("express");

const ServerRoutes = require('./route/ServerRoutes');
require('./model/connection/ConnectionDB');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', ServerRoutes);

module.exports = app.listen(4000, () => {
  console.log("Listening on 4000");
});
