"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReactionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user id"],
    },
    postId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Post",
        required: [true, "Please provide a post id"],
    },
    type: {
        type: String,
        enum: ["like"],
        default: "like",
        required: [true, "Please provide a reaction type"],
    },
}, { timestamps: true });
ReactionSchema.methods.toJSON = function () {
    return {
        id: this._id,
        userId: this.userId,
        postId: this.postId,
        type: this.type,
    };
};
var ReactionType;
(function (ReactionType) {
    ReactionType["like"] = "like";
})(ReactionType || (ReactionType = {}));
exports.default = (0, mongoose_1.model)("Reaction", ReactionSchema);
