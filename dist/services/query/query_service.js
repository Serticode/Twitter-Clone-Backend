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
const reaction_1 = __importDefault(require("../../database/models/reactions/reaction"));
const post_model_1 = require("../models/post_model");
const { max, min } = Math;
//!
//!
class QueriesService {
    //!
    //!
    queryPosts(params, requestUserId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = params.userId || requestUserId;
            const resultsPerPage = min((_a = params.resultsPerPage) !== null && _a !== void 0 ? _a : 10, 100);
            const page = (_b = params.page) !== null && _b !== void 0 ? _b : 0;
            const type = params.type || post_model_1.PostType.post;
            const skip = resultsPerPage * page;
            const posts = yield posts_1.default.find({ userId, type }, null, {
                skip: skip,
                limit: resultsPerPage,
                sort: { createdAt: -1 },
            });
            const totalPosts = yield posts_1.default.countDocuments({ userId, type });
            const remainingCount = max(totalPosts - (page + 1) * resultsPerPage, 0);
            const remainingPages = Math.ceil(remainingCount / resultsPerPage);
            return {
                remainingCount: remainingCount,
                remainingPages: remainingPages,
                count: posts.length,
                posts: posts.map((post) => post.toJSON()),
            };
        });
    }
    //!
    //!
    getReplies(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const postId = params.postId;
            const resultsPerPage = min((_a = params.resultsPerPage) !== null && _a !== void 0 ? _a : 10, 100);
            const page = (_b = params.page) !== null && _b !== void 0 ? _b : 0;
            const skip = resultsPerPage * page;
            const type = "reply";
            const posts = yield posts_1.default.find({ type, originalPostId: postId }, null, {
                skip: skip,
                limit: resultsPerPage,
            });
            const totalPosts = yield posts_1.default.countDocuments({
                type,
                originalPostId: postId,
            });
            const remainingCount = max(totalPosts - (page + 1) * resultsPerPage, 0);
            const remainingPages = Math.ceil(remainingCount / resultsPerPage);
            return {
                remainingCount: remainingCount,
                remainingPages: remainingPages,
                count: posts.length,
                posts: posts.map((post) => post.toJSON()),
            };
        });
    }
    //!
    //!
    getReactions(params, requestUserId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = params.userId || requestUserId;
            const resultsPerPage = min((_a = params.resultsPerPage) !== null && _a !== void 0 ? _a : 10, 100);
            const page = (_b = params.page) !== null && _b !== void 0 ? _b : 0;
            const skip = resultsPerPage * page;
            const reactions = yield reaction_1.default.find({ userId }, null, {
                skip: skip,
                limit: resultsPerPage,
                sort: { createdAt: -1 },
            });
            const totalReactions = yield reaction_1.default.countDocuments({ userId });
            const remainingCount = max(totalReactions - (page + 1) * resultsPerPage, 0);
            const remainingPages = Math.ceil(remainingCount / resultsPerPage);
            return {
                remainingCount: remainingCount,
                remainingPages: remainingPages,
                count: reactions.length,
                reactions: reactions.map((reaction) => reaction.toJSON()),
            };
        });
    }
    //!
    //!
    getPostStats(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactionCount = yield reaction_1.default.countDocuments({ postId });
            const replyCount = yield posts_1.default.countDocuments({
                originalPostId: postId,
                type: "reply",
            });
            const repostCount = yield posts_1.default.countDocuments({
                originalPostId: postId,
                type: "repost",
            });
            return { reactionCount, replyCount, repostCount };
        });
    }
}
exports.default = QueriesService;
