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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FollowSchema = new mongoose_1.Schema({
    followerUserId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    followingUserId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
//!
//! FOLLOWER INFO
FollowSchema.virtual("follower", {
    ref: "User",
    localField: "followerUserId",
    foreignField: "_id",
    justOne: true,
});
//!
//! FOLLOWING
FollowSchema.virtual("following", {
    ref: "User",
    localField: "followingUserId",
    foreignField: "_id",
    justOne: true,
});
FollowSchema.methods.populateFollowerField = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.populate("follower");
    });
};
FollowSchema.methods.populateFollowingField = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.populate("following");
    });
};
FollowSchema.methods.toJSON = function () {
    return {
        id: this._id,
        followerUserId: this.followerUserId,
        follower: this.follower,
        followingUserId: this.followingUserId,
        following: this.following,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
exports.default = (0, mongoose_1.model)("Follow", FollowSchema);
