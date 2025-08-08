const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const session=require("express-session")
const flash=require("connect-flash")

// MongoDB connection
const connect = require("./config/connect");
// const LoginDBconnection=require("./config/LoginSigupConnection")

dotenv.config();
const app = express();
connect();
// LoginDBconnection()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("views", path.join(__dirname, "views")); // corrected: 'view' ➝ 'views'
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')))

hbs.registerHelper("removepublic", function (filePath) {
  return filePath.replace(/^public\//, "");
});





// FLASH SETUP

app.use(session({
  secret:"12345",
  resave:false,
  saveUninitialized:false
  
}))

// flash messages
app.use(flash())

// flash Middleware

app.use((req,res,next)=>{

  res.locals.success_msg=req.flash("success_msg")
  res.locals.error_msg=req.flash("error_msg")
  next()

})



// Routes
const Route = require("./Routers/index");
app.use("/api", Route);

// PORT
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});