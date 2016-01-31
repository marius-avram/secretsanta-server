"use strict";

var User = require("../models/user");
var async = require("async");
var crypto = require("crypto");
var validator = require("validator");


module.exports.create = function(req, res, done) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    
    async.series([
        function(next) {
            // Check email address
            if (validator.isEmail(email)) {
                next(null);   
            }
            else {
                // Go to error handling function
                next("Email is not valid.");
            }
        },
        function(next) {
            // Create new user
            var user = new User();
            user.username = username;
            user.password = password;
            user.email = email;
            user.firstname = firstname;
            user.lastname = lastname;
            // Save it
            user.save(function(err, savedUser) {
               if (err) {
                   next(err);
               }
               else {
                   // Send email and hash as an answer
                   var md5sum = crypto.createHash("md5");
                   var hash = md5sum.update(password).digest("hex");
                   console.log(hash);
                   res.send({success: true, user: {username: username, hash: hash }});
               }
            });
        }
    ], function(err) {
        res.send({success: false, error: {text: "There was an error while creating user.", error: err}});
    });
}

module.exports.login = function(req, res, done) {
    var username = req.body.username;
    var password = req.body.password;

    var md5sum = crypto.createHash("md5");
    User.findOne({username: username}, function(err, foundUser) {
       if (err) {
           res.send({success: false, error: {text: "There was an error on login.", error: err}});
       }
       else if (!foundUser) {
           res.send({success: false, error: {text: "User does not exist."}});
       }
       else {
            if (foundUser.password == password) {
                var hash = md5sum.update(foundUser.password).digest("hex");
                res.send({success: true, user: {username: username, hash: hash}});
            }
            else {
                res.send({success: false, error: {text: "Wrong password."}});
            }
       }
    });
}

module.exports.doLogin = function(req, res, done) {
    // GET parameters
    var username;
    var hash;
    
    if (req.query) {
        username = req.query.username;
        hash = req.query.hash;
    }
    
    // POST parameters
    if (req.body) {
        if (!username || !hash) {
            username = req.body.username;
            hash = req.body.hash;
        }
    }
    
    // HTTP headers
    if (!username || !hash) {
        username = req.headers["username"];
        hash = req.headers["hash"];
    }
    
    if (username && hash) {
        // Check them in the database
        User.findOne({username: username}, function(err, foundUser) {
            if (foundUser) {
                var md5sum = crypto.createHash("md5");
                var dbHash = md5sum.update(foundUser.password).digest("hex");
                if (dbHash == hash) {
                    // save the user into the request object
                    req.user = foundUser;
                    done();    
                }
                else {
                    done();
                }
            }
            else {
                done();
            }
        })
    }
    else {
        done();
    }
    
}

module.exports.test = function(req, res, done) {
    if (req.user) {
        res.send({success: true, message: "Authenticated as " + req.user.username + ", email address: " + req.user.email});
    }
    else {
        res.send({success: true, message: "No user authenticated"});
    }
}

module.exports.me = function(req, res, done) {
    if (req.user) {
        var user = req.user;
        var userObject = user.toObject();
        // Remove password from answer
        userObject["password"] = undefined;
        res.send({success: true, user: userObject});
    }
    else {
        res.send({success: false, error: {text: "User not authenticated."}});
    }
}

module.exports.get = function(req, res, done) {
    var username = req.query.username;
    
    async.series([
        function(next) {
            if (!req.user) {
                res.send({success: false, error: {text: "User not authenticated."}});
            }
            else {
                next(null);
            }
        },
        function(next) {
            User.findOne({username: username}, function(err, foundUser) {
                if (err) {
                    res.send({success: false, error: {text: "Error while getting user profile.", err: err}});
                }
                else if (!foundUser) {
                    res.send({success: false, error: {text: "User not found."}})
                }
                else {
                    var userObject = foundUser.toObject();
                    userObject["password"] = undefined;
                    res.send({success: true, user: userObject});
                }
            });   
        }
    ]);
}
