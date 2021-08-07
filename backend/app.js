const express = require("express");
const logger = require("morgan");
const router = express.Router();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const { HttpCode } = require("./helpers/constants");
const authRouter = require("./auth/auth.router");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());

require("dotenv").config();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  const code = err.status || HttpCode.INTERVAL_SERVER_ERROR;
  const status = err.status ? "error" : "fail";
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
