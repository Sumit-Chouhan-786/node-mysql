const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

// MySQL connection
const con = mysql.createConnection({
  host: "193.203.184.7",
  user: "u223830212_sumit786",
  password: "TenC@1234",
  database: "u223830212_sumit",
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  }
  console.log("Connected to MySQL!");
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
  };

  var insertData = `INSERT INTO student (name, address, phone,email, id, password) VALUES (?, ?, ?, ?, ?, ?)`;

  con.query(
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
  const id = req.body.id;
  const password = req.body.password;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      if (users[i].password === password) {
        res.json(users[i]);
        return;
      } else {
        res.json({ message: "Invalid Password" });
        return;
      }
    }
  }

  res.json({ message: "User not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
