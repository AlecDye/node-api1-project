const express = require("express");
const shortid = require("shortid");

const server = express();

// Example of shortid
// console.log(shortid.generate());
// shortid: zQjKYAdpw

// User array for .get and .post requests
let users = [
  {
    id: "zQjKYAdpw",
    name: "Alec",
    bio: "The guy who wrote this code",
  },
];

// Middleware
server.use(express.json());

// Endpoints

// Testing API
// server.get("/", (req, res) => {
//   res.json({ api: "active" });
// });

// POST users
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  const { name, bio } = req.body;
  //   console.log(`${name} and ${bio}`);
  // name and bio are required
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else {
    users.push(userInfo);
    const savedUser = users.find((user) => user.name === name);
    // if POST user is in the users array send http 200
    if (savedUser) {
      res.status(201).json(users);
    } else {
      res.status(500).json({
        message: "There was an error while saving the user to the database.",
      });
    }
  }
});

// GET users
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved." });
  }
});

// GET users/:id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(200).json(user);
    const savedUser = users.find((user) => user.name === name);
    // if POST user is in the users array send http 200
    if (savedUser) {
      res.status(201).json(users);
    } else {
      res.status(500).json({
        message: "There was an error while saving the user to the database.",
      });
    }
  }
});

// DELETE users/:id
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.filter((contact) => user.id == id);
});

// PUT users/:id
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
});

const port = 5000;
server.listen(port, () => console.log(`\n = server is live = \n`));
