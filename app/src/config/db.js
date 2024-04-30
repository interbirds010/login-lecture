const mysql = require("mysql");

const db = mysql.createConnection({
    host: "login-lecture.c3imaoo24fot.ap-northeast-2.rds.amazonaws.com",
    user: "root",
    password: "tkfkdgo0118",
    database: "login_lecture"
});

db.connect();

module.exports = db;