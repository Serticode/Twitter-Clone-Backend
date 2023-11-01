"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//!
//! MONGO DB SCHEMA
const ProfileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user id"],
    },
    bio: {
        type: String,
        maxlength: [500, "Your bio cannot exceed 500 characters"],
        trim: true,
        required: false,
    },
    location: {
        type: String,
        maxlength: [60, "Your location cannot exceed 60 characters"],
        trim: true,
        required: false,
    },
    website: {
        type: String,
        maxlength: [200, "Your website cannot exceed 200 characters"],
        trim: true,
        required: false,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            "Please provide a valid URL",
        ],
    },
}, { timestamps: true });
//!
//! JSON FORMAT
ProfileSchema.methods.toJSON = function () {
    return {
        bio: this.bio,
        location: this.location,
        website: this.website,
    };
};
exports.default = (0, mongoose_1.model)("Profile", ProfileSchema);
