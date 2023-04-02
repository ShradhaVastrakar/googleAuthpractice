const cookieParser = require("cookie-parser");
const express = require("express");
const app=express();
const fs = require("fs");
require("dotenv").config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const GoogleStrategy = require("passport-google-oauth");
const {passport} = require("./google.outh");

var path = require('path');
// var path = require('../../../webSockets/chat.html');

// var filename = path.normalize('C:/Users/admin/Desktop/MASAI/responsible-stomach-8778/webSockets/chat.html');
// console.log(filename)

app.use(cookieParser());
app.get("/",(req,res)=>{
     res.sendFile(__dirname+"/index.html");
})

app.get("/a",(req,res)=>{
    res.sendFile(__dirname+'../../../webSockets/chat.html');
})



app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
  function(req, res) {
    // console.log(req.body);
    // Successful authentication, redirect home.
    res.redirect("https://www.google.com")
    // window.location.href = "../../../webSockets/chat.html"
  });






app.listen(`${process.env.port}`,(req,res)=>{
    console.log("Server running");
})