const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const $console = require("Console");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const { errorHandler } = require("./middleware/errorHandler");
const { routeNotFound, connectionLost } = require("./middleware/middleware");
const loadDatabase = require("./loaders/db");
loadDatabase().catch((error) => {
  $console.error(error.message);
});

const app = express();

app.use(cors());
app.use(connectionLost);
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use(routeNotFound);
app.use(errorHandler);

mongoose.connection.on("disconnected", function () {
  $console.error(new Date().toUTCString(), "\tDisconnected from database.");
});
mongoose.connection.on("connected", function () {
  $console.log(new Date().toUTCString(), "\tConnected to database.");
});

app.listen(PORT, () => {
  $console.log(
    new Date().toUTCString(),
    `\tApp listening at port http://localhost:${PORT}.`
  );
});

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

function cleanup(event) {
  $console.log(new Date().toUTCString(), "\nBye!");
  mongoose.connection.close();
  process.exit();
}

module.exports = app;
