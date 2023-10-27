"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//! THE TYPE OF BLACKLIST
var BlacklistKind;
(function (BlacklistKind) {
    BlacklistKind["jti"] = "jti";
    BlacklistKind["refresh"] = "refresh";
    BlacklistKind["token"] = "token";
})(BlacklistKind || (BlacklistKind = {}));
const BlacklistSchema = new mongoose_1.Schema({
    object: {
        type: String,
        required: [true, "Please provide an object"],
        unique: true,
    },
    kind: {
        type: String,
        enum: ["jti", "refresh", "token"],
        default: "jti",
        required: [true, "Please provide a kind"],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Blacklist", BlacklistSchema);
