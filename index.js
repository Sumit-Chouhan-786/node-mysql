const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(express.json());

const users = [];
const allItems = [];

// MySQL connection
const pool = mysql.createPool({
  host: "193.203.184.7",
  user: "u223830212_sumit786",
  password: "TenC@1234",
  database: "u223830212_sumit",
});

pool.getConnection(function (err) {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// Signup route
app.post("/signup", (req, res) => {
  const { name, address, email, phone, id, password } = req.body;

  const dummy = {
    name: name,
    address: address,
    phone: phone,
    id: id,
    email: email,
    password: password,
    purchases: [],
  };

  const insertData = `INSERT INTO student (name, address, phone, email, id, password) VALUES (?, ?, ?, ?, ?, ?)`;

  pool.query(
    insertData,
    [name, address, phone, email, id, password],
    function (err) {
      if (err) {
        console.error("Error inserting data: ", err);
        res.json({ error: "Error inserting data" });
        return;
      }
      console.log("Data inserted into student table");
      users.push(dummy);
      res.json(users);
    }
  );
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;

  pool.query(
    "SELECT * FROM student WHERE id = ? AND password = ?",
    [id, password],
    function (err, results) {
      if (err) {
        console.error("Error querying data: ", err);
        res.json({ error: "Error querying data" });
        return;
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.json({ message: "Invalid ID or Password" });
      }
    }
  );
});

app.post("/purchase", (req, res) => {
  const { id, password, iId } = req.body;

  pool.query(
    "SELECT * FROM student WHERE id = ? AND password = ?",
    [id, password],
    function (err, results) {
      if (err) {
        console.error("Error querying data: ", err);
        res.json({ error: "Error querying data" });
        return;
      }
      if (results.length > 0) {
        const user = results[0];
        for (let j = 0; j < allItems.length; j++) {
          if (allItems[j].id === iId) {
            user.purchases = user.purchases || [];
            user.purchases.push(allItems[j]);
            res.json(user);
            return;
          }
        }
        res.json({ message: "Item not found" });
      } else {
        res.json({ message: "Invalid ID or Password" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
