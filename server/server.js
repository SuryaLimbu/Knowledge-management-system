// index.js
const express = require("express");
const connectDB = require("./db"); // Change the path as needed
const cors = require("cors");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

const { authenticateToken } = require('./middlewares/authenticateToken');


// Connect to MongoDB
connectDB();


app.use(express.json());
app.use(cors());

// const DATABASE_URL = process.env.DATABASE_URL;


// Your routes and other middleware go here...
app.get('/', function (req, res) {
  res.type('text/plain');
  res.status(200);

  // res.send('Welcome to MongoDB API');
  if (connectDB()) {
    res.send('DB connected.')
  }
  else {
    res.send('DB connection fail!')
  }

})
///

// LOGIN
const loginRouter = require('./routers/loginRoutes');

app.use('/api',loginRouter);

const tokenRouter = require('./routers/tokenRoutes');
app.use('/api', tokenRouter);

const logoutRouter = require('./routers/logoutRoutes');
app.use('/api', logoutRouter);


// applying middleware to all routes
// app.use(authenticateToken);

// USERS
const userRouter = require('./routers/usersRoutes');
app.use('/users', userRouter);

// ROLES
const roleRouter = require('./routers/roleRoutes');
app.use('/roles', roleRouter);

//Professions
const professionRouter = require('./routers/professionRoutes');
app.use('/professions', professionRouter);

// Branchs
const branchRouter = require('./routers/branchRoutes');
app.use('/branch', branchRouter);

// Branchs
const clientRouter = require('./routers/clientRoutes');
app.use('/client', clientRouter);


// task
const taskRouter = require('./routers/taskRoutes');
app.use('/task', taskRouter);



// 
const projectRouter = require('./routers/projectRoutes');
app.use('/project', projectRouter);
// 

const announcementRouter = require('./routers/announcementRoutes');
app.use('/announcement', announcementRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


