const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = async (username, password) => {
  const user = users.find(u => u.username === username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    return match;
  }
  return false;
};

//only registered users can login
regd_users.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!isValid(username)) {
    return res.status(400).json({ message: 'Invalid username' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});
regd_users.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password'   
 });
  }
  const isAuthenticated = await authenticatedUser(username, password);
  if (isAuthenticated) {
    const token = jwt.sign({ username }, 'your_secret_key');
    res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
