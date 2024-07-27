const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(session({   
 secret: "fingerprint_customer",   
 resave: true, saveUninitialized: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // No token provided, allow public routes
    if (req.url.startsWith('/')) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);   


app.listen(PORT, () => console.log("Server  is running"));