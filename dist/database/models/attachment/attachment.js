"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AttachmentSchema = new mongoose_1.Schema({
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
    mimeType: {
        type: String,
        required: [true, "Please provide a mime type"],
    },
}, { timestamps: true });
AttachmentSchema.methods.toJSON = function () {
    return {
        id: this._id,
        mimeType: this.mimeType,
    };
};
exports.default = (0, mongoose_1.model)("Attachment", AttachmentSchema);
