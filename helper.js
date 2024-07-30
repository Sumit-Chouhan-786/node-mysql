const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "193.203.184.7",
  user: "u223830212_sumit786",
  password: "TenC@1234",
  database: "u223830212_sumit",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql =
    "CREATE TABLE products (name VARCHAR(255), id VARCHAR(255), price VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
