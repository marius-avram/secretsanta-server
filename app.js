"use strict";

var express = require("express");
var body_parser = require("body-parser");
var mongoose = require("mongoose");
var user = require("./services/user");
var group = require("./services/group");


mongoose.connect('mongodb://marius:123456@ds051655.mongolab.com:51655/secretsanta-project');


var app = express();

app.use(body_parser());

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

