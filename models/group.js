"use strict";

var mongoose = require("mongoose");

module.exports = mongoose.model("Group", {
    name: {
        type: String,
        required: true,
        unique: true
    },
    memberLimit: {
        type: Number
    },
    members: [String],
    giveTo: [String]
});

