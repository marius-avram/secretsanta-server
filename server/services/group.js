"use strict";

var Group = require("../models/group");
var async = require("async");

/**
 * @api {post} /member/group/create Create a new group
 * @apiVersion 1.0.0
 * @apiName GroupCreate
 * @apiGroup Group
 * @apiPermission none
 *
 * @apiDescription Create a new group identified by name and memberLimit
 *
 * @apiHeader {String} username Nickname of the user making the request.
 * @apiHeader {String} hash Hash of the user password.
 * 
 * @apiParam {String} name Name of group.
 * @apiParam {Number} memberLimit Member limit.
 *
 * @apiSuccess {String} success Determines if call was succesful or not. 
 * @apiSuccess {Object} error {text: "Error message", "error": call_stack_obj}
 * @apiSuccess {Object} group {name: "Nasty people", memberLimit: 20, members[username], giveTo: []}
 *
 * @apiSuccessExample {json} Success-Response:
 *                  { success : true, group: { name: "Nasty people", memberLimit: 20, members[username], giveTo: []}}
 * @apiErrorExample {json} Error-Response:
 *                  { success : false, error: { text: "Group name mandatory."}}
 */
 
 
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
};

/**
 * @api {post} /member/groups/own Get own groups
 * @apiVersion 1.0.0
 * @apiName GroupOwn
 * @apiGroup Group
 * @apiPermission none
 *
 * @apiDescription Get groups in which you are a member.
 *
 *
 * @apiHeader {String} username Nickname of the user making the request.
 * @apiHeader {String} hash Hash of the user password.
 * 
 * @apiParam {String} name Name of group.
 * @apiParam {Number} memberLimit Member limit.
 *
 * @apiSuccess {String} success Determines if call was succesful or not. 
 * @apiSuccess {Object} error {text: "Error message", "error": call_stack_obj}
 * @apiSuccess {List} groups [{name: "Nasty people", memberLimit: 20, members[username], giveTo: []}]
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *                  { success : true, groups: [{ name: "Nasty people", memberLimit: 20, members[username], giveTo: []}]}
 * @apiErrorExample {json} Error-Response:
 *                  { success : false, error: { text: "Error while getting own groups.", error: call_stack_obj}}
 */
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
};


/**
 * @api {post} /member/group/join Join a new group
 * @apiVersion 1.0.0
 * @apiName GoupJoin
 * @apiGroup Group
 * @apiPermission none
 *
 * @apiDescription Join an existing group. members array from response group should
 * contain the name of the username making the call in case of success.
 *
 * @apiHeader {String} username Nickname of the user making the request.
 * @apiHeader {String} hash Hash of the user password.
 * 
 * @apiParam {String} id Mongo _id of the group
 *
 * @apiSuccess {String} success Determines if call was succesful or not. 
 * @apiSuccess {Object} error {text: "Error message", "error": call_stack_obj}
 * @apiSuccess {Object} group {name: "Nasty people", memberLimit: 20, members[username], giveTo: []}
 *
 * @apiSuccessExample {json} Success-Response:
 *                  { success : true, group: { name: "Nasty people", memberLimit: 20, members: [username], giveTo: []}}
 * @apiErrorExample {json} Error-Response:
 *                  { success : false, error: { text: "Group not found."}}
 */
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
                        next({text: "Member limit reached."});
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
                            });
                        }
                    }
                }
                
            });
        }
    ], function(err) {
        res.send({success: false, error: err});
    });
};

/**
 * @api {get} /member/groups/search Search group by keyword
 * @apiVersion 1.0.0
 * @apiName GroupOwn
 * @apiGroup Group
 * @apiPermission none
 * 
 * 
 * @apiDescription Search group by keyword
 *
 * @apiHeader {String} username Nickname of the user making the request.
 * @apiHeader {String} hash Hash of the user password.
 * 
 * @apiParam {String} keyword Search term use as as regular expresion .*keyword.* to find groups.
 * Search is case insensitve.
 *
 * @apiSuccess {String} success Determines if call was succesful or not. 
 * @apiSuccess {Object} error {text: "Error message", "error": call_stack_obj}
 * @apiSuccess {Object} group {name: "Nasty people", memberLimit: 20, members[username], giveTo: []}
 *
 * @apiSuccess {String} success Determines if call was succesful or not. 
 * @apiSuccess {Object} error {text: "Error message", "error": call_stack_obj}
 * @apiSuccess {List} groups [{name: "Nasty people", memberLimit: 20, members[username], giveTo: []}]
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *                  { success : true, groups: [{ name: "Nasty people", memberLimit: 20, members[username], giveTo: []}]}
 * @apiErrorExample {json} Error-Response:
 *                  { success : false, error: { text: "Error while getting own groups.", error: call_stack_obj}}
 *
 */
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
};


/**
 * @api {post} /member/group/shuffle Shuffle giving array
 * @apiVersion 1.0.0
 * @apiName GroupShuffle
 * @apiGroup Group
 * @apiPermission none
 *
 * @apiDescription Shuffle the members from members array into the giveTo. The 
 * username from the same index between the two arrays must be different. Can be
 * called multiple times.
 *
 * @apiHeader {String} username Nickname of the user making the request.
 * @apiHeader {String} hash Hash of the user password.
 * 
 * @apiParam {String} id Mongo _id of the group
 *
 * @apiSuccess {String} success Determines if call was succesful or not. 
 * @apiSuccess {Object} error {text: "Error message", "error": call_stack_obj}
 * @apiSuccess {Object} group {name: "Nasty people", memberLimit: 20, members[username1, username2], giveTo: [username2, username1]}
 *
 * @apiSuccessExample {json} Success-Response:
 *                  { success : true, group: { name: "Nasty people", members[username1, username2], giveTo: [username2, username1]}}
 * @apiErrorExample {json} Error-Response:
 *                  { success : false, error: { text: "Group not found."}}
 */
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
};

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}