const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors")
//add middlewares here
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//add routes below

const usersRoute = require('./routes/users.route')
app.use('/users', usersRoute)

const adminRoute = require('./routes/admin.route')
app.use('/admin',adminRoute)


//connection

mongoose
  .connect(process.env.DATABASE_ACCESS)
  .then(() => {
    app.listen(4000);
    console.log(
      "server running"
    );
  })
  .catch((err) => console.log(err));
