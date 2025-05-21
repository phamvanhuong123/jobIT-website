const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors())
const dotenv = require("dotenv").config();
const port = dotenv.parsed.POR || 5000;

// Kết nối đến MongoDB
const URL_MONGO = dotenv.parsed.URL_MONGO;
const database = require("./config/database");
database.connectMongoDB(URL_MONGO);

//Router
const routeClient = require("./routes/client/index.route");
routeClient(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
