// index.js
const express = require("express");
const connectDB = require("./db"); // Change the path as needed
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;


const { authenticateToken } = require('./middlewares/authenticateToken');


// Connect to MongoDB
connectDB();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Your routes and other middleware go here...
app.get('/api', function (req, res) {
  res.type('text/plain');
  res.status(200);
  res.send('Welcome to MongoDB AUTH API');

})


// LOGIN
const loginRouter = require('./routers/loginRoutes');

app.use('/api',loginRouter);

const tokenRouter = require('./routers/tokenRoutes');
app.use('/api', tokenRouter);

const logoutRouter = require('./routers/logoutRoutes');
app.use('/api', logoutRouter);

// applying middleware to all routes
// app.use(authenticateToken);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


