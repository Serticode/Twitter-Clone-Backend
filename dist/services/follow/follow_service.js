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
const follow_1 = __importDefault(require("../../database/models/follow/follow"));
const errors_1 = require("../../errors");
const { max } = Math;
//!
//!
class FollowService {
    //!
    //!
    followUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { followerUserId: userId, followingUserId } = params;
            // user cannot follow self
            if (userId === followingUserId) {
                throw new errors_1.BadRequestError();
            }
            // are we already following this user?
            const existingFollow = yield follow_1.default.findOne({
                followerUserId: userId,
                followingUserId: followingUserId,
            });
            if (existingFollow) {
                throw new errors_1.BadRequestError("Already following this user");
            }
            // create follow
            const follow = yield follow_1.default.create({
                followerUserId: userId,
                followingUserId: followingUserId,
            });
            return follow.toJSON();
        });
    }
    //!
    //!
    unfollowUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedFollow = yield follow_1.default.findOneAndDelete(params);
            if (!deletedFollow) {
                throw new errors_1.BadRequestError("Not following this user");
            }
            return deletedFollow.toJSON();
        });
    }
    //!
    //!
    getUserFollowing(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = params;
            const resultsPerPage = (_a = params.resultsPerPage) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = params.page) !== null && _b !== void 0 ? _b : 0;
            const skip = resultsPerPage * page;
            const follows = yield follow_1.default.find({ followerUserId: userId }, null, {
                skip: skip,
                limit: resultsPerPage,
                sort: { createdAt: -1 },
            });
            const totalFollows = yield follow_1.default.countDocuments({
                followerUserId: userId,
            });
            const remainingCount = max(totalFollows - (page + 1) * resultsPerPage, 0);
            const remainingPages = Math.ceil(remainingCount / resultsPerPage);
            // resolve references of the follow object
            yield Promise.all(follows.map((follow) => __awaiter(this, void 0, void 0, function* () {
                yield follow.populateFollowingField();
            })));
            return {
                remainingCount: remainingCount,
                remainingPages: remainingPages,
                count: follows.length,
                follows: follows.map((follow) => follow.toJSON()),
            };
        });
    }
    //!
    //!
    getUserFollowers(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = params;
            const resultsPerPage = (_a = params.resultsPerPage) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = params.page) !== null && _b !== void 0 ? _b : 0;
            const skip = resultsPerPage * page;
            const follows = yield follow_1.default.find({ followingUserId: userId }, null, {
                skip: skip,
                limit: resultsPerPage,
                sort: { createdAt: -1 },
            });
            const totalFollows = yield follow_1.default.countDocuments({
                followingUserId: userId,
            });
            const remainingCount = max(totalFollows - (page + 1) * resultsPerPage, 0);
            const remainingPages = Math.ceil(remainingCount / resultsPerPage);
            // resolve references of the follow object
            yield Promise.all(follows.map((follow) => __awaiter(this, void 0, void 0, function* () {
                yield follow.populateFollowerField();
            })));
            return {
                remainingCount: remainingCount,
                remainingPages: remainingPages,
                count: follows.length,
                follows: follows.map((follow) => follow.toJSON()),
            };
        });
    }
}
exports.default = FollowService;
