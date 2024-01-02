// index.js
const express = require("express");
const connectDB = require("./db"); // Change the path as needed
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const { authenticateToken } = require('./middlewares/authenticateToken');


// Connect to MongoDB
connectDB();


app.use(express.json());
app.use(cors());




// Your routes and other middleware go here...
app.get('/', function (req, res) {
  res.type('text/plain');
  res.status(200);
  res.send('Welcome to MongoDB API');

})


// applying middleware to all routes
app.use(authenticateToken);

// USERS
const userRouter = require('./routers/usersRoutes');
app.use('/users', userRouter);

// ROLES
const roleRouter = require('./routers/roleRoutes');
app.use('/roles', roleRouter);

//Professions
const professionRouter = require('./routers/professionRoutes');
app.use('/professions', professionRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


