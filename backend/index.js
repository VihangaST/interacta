const express = require("express");
const app = express();
const dbConnection = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const questionRoutes = require("./routes/questionRoutes");

app.use(cors({ origin: true, Credentials: true }));

dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/questions", questionRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
