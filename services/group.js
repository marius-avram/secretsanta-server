"use strict";

var Group = require("../models/group");
var async = require("async");


module.exports.create = function(req, res, done) {
    var name = req.body.name;
    var memberLimit = req.body.memberLimit;
    
    async.series([
        function(next) {
            if (!req.user) {
                next({text: "User not authenticated."});
                
            }
            else {
                next(null);
            }
        },
        function(next) {
            if (!name) {
                next({text: "Group name mandatory."});
            }
            else {
                next(null);
            }
        },
        function(next) {
            if (memberLimit) {
                memberLimit = Number(memberLimit);
                
                var group = new Group();
                group.name = name;
                group.memberLimit = memberLimit;
                
                // Automatically join in it
                group.members = [req.user.username];
                
                group.save(function(err, savedGroup) {
                    if (err || !savedGroup) {
                        next({text: "Error while saving group", error: err});
                    }
                    else {
                        res.send({success: true, group: savedGroup});
                    }
                });
            }
        }
    ], function(err) {
        res.send({success: false, error: err});
    });
}


module.exports.get = function(req, res, done) {
    
     async.series([
        function(next) {
            if (!req.user) {
                next({text: "User not authenticated."});
                
            }
            else {
                next(null);
            }
        },
        function(next) {
            Group.find({members: req.user.username}, function(err, foundGroups) {
                if (err || !foundGroups) {
                    next({text: "Error while getting own groups", error: err});
                }
                else {
                    res.send({success: true, groups: foundGroups});
                }
            });
        }
    ], function(err) {
        res.send({success: false, error: err});
    });
}

module.exports.join = function(req, res, done) {
    var id = req.body.id;
    
    async.series([
        function(next) {
            if (!req.user) {
                next({text: "User not authenticated."});
                
            }
            else {
                next(null);
            }
        },
        function(next) {
            Group.findOne({_id: id}, function(err, foundGroup) {
                if (err) {
                    next({text: "Error while searching for group.", error: err});
                }
                else if (!foundGroup) {
                    next({text: "Group not found."});
                }
                else {
                    // Check if you are not in the group already
                    if (!foundGroup.members) {
                        foundGroup.members = [];
                    }

                    if (foundGroup.members.length >= foundGroup.memberLimit) {
                        next({text: "Member limit reached."})
                    }
                    else {
                        var found = false;
                        for (var i=0; i<foundGroup.members.length; i++) {
                            if (foundGroup.members[i] == req.user.username) {
                                next({text: "User already member of this group."});
                                found = true;
                                break;
                            }
                        }
                        
                        if (!found) {
                            foundGroup.members.push(req.user.username);
                            foundGroup.save(function(err, savedGroup) {
                                if (err) {
                                    next({text: "Error while saving group.", error: err});
                                }
                                else {
                                    res.send({success: true, group: savedGroup});
                                }
                            })
                        }
                    }
                }
                
            });
        }
    ], function(err) {
        res.send({success: false, error: err});
    });
}


module.exports.search = function(req, res, done) {
    var keyword = req.query.keyword;
    
    async.series([
        function(next) {
            if (!req.user) {
                next({text: "User not authenticated."});
            }
            else {
                next(null);
            }
        },
        function(next) {
            Group.find({name: new RegExp(".*" + keyword + ".*", "i")}, function(err, foundGroups) {
                if (err) {
                    next({text: "Error while searching groups.", error: err});
                }
                else {
                    res.send({success: true, groups: foundGroups});
                }
            });
        }
    ],  function(err) {
        res.send({success: false, error: err});
    });
}


module.exports.shuffle = function(req, res, done) {
    var id = req.body.id;
    var givenGroup = null;
    
    async.series([
        function(next) {
            if (!req.user) {
                next({text: "User not authenticated."});
            }
            else {
                next(null);
            }
        },
        function(next) {
            // Search group
            Group.findOne({_id: id}, function(err, foundGroup) {
                if (err) {
                    next({text: "Error while getting group.", error: err});
                }
                else if (!foundGroup) {
                    next({text: "Group not found."});
                }
                else {
                    givenGroup = foundGroup;
                    if (foundGroup.members.length > 1) {
                        next(null);
                    }
                    else {
                        next({text: "Only one member in group."});
                    }
                }
            });
        },
        function(next) {
            var randomStep = randomInt(1, givenGroup.members.length);
            var shuffleList = [];
            for (var i=0; i<givenGroup.members.length; i++) {
                var newIndex = (i + randomStep) % givenGroup.members.length;
                shuffleList.push(givenGroup.members[newIndex]);
            }

            givenGroup.giveTo = shuffleList;
            givenGroup.save(function(err, savedGroup) {
               if (err) {
                   next({text: "Error while saving group", error: err});
               }
               else {
                   res.send({success: true, group: savedGroup});
               }
            });
        }
    ],  function(err) { 
        res.send({success: false, error: err});
    });
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}