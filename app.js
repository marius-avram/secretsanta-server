"use strict";

var express = require("express");
var body_parser = require("body-parser");
var mongoose = require("mongoose");
var user = require("./services/user");
var group = require("./services/group");


mongoose.connect('mongodb://marius:123456@ds051655.mongolab.com:51655/secretsanta-project');


var app = express();

app.use(body_parser());

//HTML frontend forms

app.get('/login', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-login.html" );
});

app.get('/register', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-register.html" );
});

app.get('/auth-get', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-auth-get.html" );
});

app.get('/auth-headers', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-auth-headers.html" );
});

app.get('/auth-post', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-auth-post.html" );
});

app.get('/myprofile', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-myprofile.html" );
});

app.get('/getprofile', function (req, res) {
   res.sendFile( __dirname + "/frontend/" + "user-getprofile.html" );
});



app.use("/member/*", function(req, res, next) {
    user.doLogin(req, res, next);
});

// REST api routes

// New user creation
app.post("/user/create", user.create);

// Login existing user
app.post("/user/login", user.login);

// Member test (get)
app.get("/member/test", user.test);

// Member test (post)
app.post("/member/test", user.test);

// Info about me
app.get("/member/me", user.me);

// Info about other user
app.get("/member/get", user.get);

// Create new group
app.post("/member/group/create", group.create);

// Get own groups
app.get("/member/groups/own", group.get);

// Search groups
app.get("/member/groups/search", group.search);

// Join a group
app.post("/member/group/join", group.join);

// Shuffle group for presents
app.post("/member/group/shuffle", group.shuffle);


// Default route returns error
app.use(function(req, res) {
    res.send({success: false, error: {text: "Page not found."}});
});


console.log("Server running on address " + process.env.IP + ":" + process.env.PORT);
app.listen(process.env.PORT);

// Avoid getting the server stopped on error
process.on ('uncaughtException', function (err)
{
    console.log('Error found:');
    console.log(err); 
});