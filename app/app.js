"use strict";

// 모듈
const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
// const logger = require("./src/config/logger");

const app = express();
dotenv.config();

const accessLogStream = require("./src/config/log");

// 라우팅
const home = require('./src/routes/home');

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함도리 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
// 로그관리 morgan
app.use(morgan("common", { stream: accessLogStream }));
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// winston이랑 morgan을 같이 사용할 경우 사용
// app.use(morgan("tiny", { stream: logger.stream }));
app.use('/', home);

module.exports = app;