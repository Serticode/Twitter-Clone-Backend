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
const posts_1 = __importDefault(require("../../database/models/posts/posts"));
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
}
exports.default = PostsService;
