"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user id"],
    },
    text: {
        type: String,
        maxlength: [500, "Your post cannot exceed 500 characters"],
        trim: true,
        required: false, //! NOT REQUIRED FOR REPOSTS
    },
    type: {
        type: String,
        enum: ["post", "repost", "reply"],
        default: "post",
        required: [true, "Please provide a post type"],
    },
    originalPostId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Post",
        required: false,
    },
    attachmentId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Attachment",
        required: false,
    },
}, { timestamps: true });
PostSchema.methods.toJSON = function () {
    return {
        id: this._id,
        userId: this.userId,
        text: this.text,
        type: this.type,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        attachmentId: this.attachmentId,
    };
};
var PostType;
(function (PostType) {
    PostType["post"] = "post";
    PostType["repost"] = "repost";
    PostType["reply"] = "reply";
})(PostType || (PostType = {}));
exports.default = (0, mongoose_1.model)("Post", PostSchema);
