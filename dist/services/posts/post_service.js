"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const utils_1 = require("../../controllers/utils/utils");
const attachment_1 = __importDefault(require("../../database/models/attachment/attachment"));
const posts_1 = __importDefault(require("../../database/models/posts/posts"));
const reaction_1 = __importDefault(require("../../database/models/reactions/reaction"));
const errors_1 = require("../../errors");
const post_model_1 = require("../models/post_model");
class PostsService {
    //!
    //! CREATE POST
    createPost(userId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (params.type) {
                case post_model_1.PostType.post: {
                    const newPost = yield posts_1.default.create({
                        userId,
                        text: params.text,
                        type: params.type,
                    });
                    return newPost.toJSON();
                }
                case post_model_1.PostType.repost:
                case post_model_1.PostType.reply: {
                    if (!params.originalPostId || params.originalPostId === "") {
                        throw new errors_1.OriginalPostIdMissingError();
                    }
                    const newPost = yield posts_1.default.create({
                        userId,
                        text: params.text,
                        type: params.type,
                        originalPostId: params.originalPostId,
                    });
                    return newPost.toJSON();
                }
                default:
                    throw new errors_1.InvalidInputError("type", "PostType");
            }
        });
    }
    //!
    //! REACT TO POST - LIKE A POST
    reactToPost(userId, postId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_1.default.findById(postId);
            if (!post) {
                throw new errors_1.PostNotFoundError();
            }
            const query = { userId, postId };
            const reaction = yield reaction_1.default.findOneAndUpdate(query, {
                userId,
                postId,
                type: params.type,
            }, { upsert: true, new: true });
            return reaction.toJSON();
        });
    }
    //!
    //! UNREACT TO POST - UNLIKE A POST
    unreactToPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield reaction_1.default.findOneAndDelete({ userId, postId });
            if (!reaction) {
                throw new errors_1.ReactionNotFoundError();
            }
            return reaction.toJSON();
        });
    }
    //!
    //! ATTACH TO POST
    attachToPost(userId, postId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            reposts cannot have attachments or patched later
            user can only attach to their own posts
        
            find a post or reply (not a repost), with a given ID
            that is made by the current user and has no attachments
            */
            const post = yield posts_1.default.findOne({ _id: postId, userId: userId })
                .where("type")
                .in(["post", "reply"])
                .where("attachmentId")
                .equals(null);
            if (!post) {
                throw new errors_1.PostNotFoundError();
            }
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new errors_1.NoPhotoUploadedError();
            }
            const { photo } = req.files;
            if (photo.mimetype !== "image/jpeg") {
                throw new errors_1.InvalidMimeTypeError();
            }
            //! CREATE NEW ATTACHMENT
            const attachment = yield attachment_1.default.create({
                userId,
                postId,
                mimeType: photo.mimetype,
            });
            const attachmentId = attachment._id;
            const uploadRootDir = (0, utils_1.getAttachmentsRootDir)();
            const uploadPath = (0, utils_1.getAttachmentPath)(attachmentId);
            try {
                yield (0, promises_1.mkdir)(uploadRootDir, { recursive: true });
                yield photo.mv(uploadPath);
                //! UPDATE ORIGINAL POST WITH ATTACHMENT ID
                post.attachmentId = attachmentId;
                yield post.save();
                return attachment.toJSON();
            }
            catch (err) {
                //! IN CASE OF ERROR, DELETE ATTACHMENT
                yield attachment_1.default.findByIdAndDelete(attachmentId);
                throw new errors_1.InternalServerError();
            }
        });
    }
    //!
    //! FETCH POST ATTACHMENT
    getPostAttachment(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            // find a post the given post ID that has an attachment
            const post = yield posts_1.default.findOne({ _id: postId })
                .where("attachmentId")
                .ne(null); // ne = not-equal
            if (!post) {
                throw new errors_1.PostNotFoundError();
            }
            const attachment = yield attachment_1.default.findOne({ _id: post.attachmentId });
            if (!attachment) {
                throw new errors_1.AttachmentNotFoundError();
            }
            const attachmentId = attachment._id;
            const photoPath = (0, utils_1.getAttachmentPath)(attachmentId);
            try {
                const status = yield (0, promises_1.stat)(photoPath);
                const isFile = status.isFile();
                if (!isFile) {
                    throw new Error();
                }
                const photoName = (0, utils_1.getAttachmentPhotoName)(attachmentId);
                const options = {
                    root: (0, utils_1.getAttachmentsRootDir)(),
                    dotfiles: "deny",
                    headers: {
                        "x-timestamp": Date.now(),
                        "x-sent": true,
                    },
                };
                return {
                    photoName,
                    options,
                };
            }
            catch (_a) {
                throw new errors_1.AttachmentNotFoundError();
            }
        });
    }
    //!
    //!
    deletePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            // can only delete own posts
            // find the post, with a given ID, that is made by the given user
            const post = yield posts_1.default.findOne({ _id: postId, userId: userId });
            if (!post) {
                throw new errors_1.PostNotFoundError();
            }
            // first delete all the reposts of this post where the repost
            // doesn't have its own text. Keep all replies intact.
            yield posts_1.default.deleteMany({
                originalPostId: postId,
                type: "repost",
                text: null,
            });
            // delete the attachment if it exists
            const attachmentId = post.attachmentId;
            if (attachmentId) {
                const path = (0, utils_1.getAttachmentPath)(attachmentId.toString());
                try {
                    yield (0, promises_1.unlink)(path);
                }
                catch (err) {
                    // silently fail
                }
            }
            // delete the post
            yield posts_1.default.findByIdAndDelete(postId);
            return post.toJSON();
        });
    }
}
exports.default = PostsService;
