const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = dotenv.parsed.POR || 5000;

// cấu hình cors
const cors = require('cors');
app.use(cors())

// Kết nối đến MongoDB
const URL_MONGO = dotenv.parsed.URL_MONGO;
const database = require("./config/database");
database.connectMongoDB(URL_MONGO);

// xử lí dự liệu body của http request
app.use(express.json())

//định nghĩa Router
const routeClient = require("./routes/index.route");
routeClient(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
