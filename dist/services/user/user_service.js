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
const follow_1 = __importDefault(require("../../database/models/follow/follow"));
const posts_1 = __importDefault(require("../../database/models/posts/posts"));
const profile_model_1 = __importDefault(require("../../database/models/profile/profile_model"));
const reaction_1 = __importDefault(require("../../database/models/reactions/reaction"));
const user_model_1 = __importDefault(require("../../database/models/user/user_model"));
const errors_1 = require("../../errors");
class UserService {
    //!
    //!
    setUsername(userId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByIdAndUpdate(userId, { username: params.username }, { new: true, runValidators: true, select: "-password" });
            if (!user) {
                throw new errors_1.BadRequestError();
            }
            return {
                user: user.toJSON(),
            };
        });
    }
    //!
    //!
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete all reactions for a user
            const { deletedCount: reactionsDeleted } = yield reaction_1.default.deleteMany({
                userId,
            });
            // delete profile photo (if any)
            const profilePhotoPath = (0, utils_1.getUserIdProfilePhotoPath)(userId);
            try {
                yield (0, promises_1.unlink)(profilePhotoPath);
            }
            catch (err) {
                // no profile photo found
            }
            // delete all attachments for all posts the user has made
            const attachments = yield attachment_1.default.find({ userId });
            for (const attachment of attachments) {
                const attachmentPath = (0, utils_1.getAttachmentPath)(attachment._id);
                try {
                    yield (0, promises_1.unlink)(attachmentPath);
                }
                catch (err) {
                    // silently fail
                }
            }
            const { deletedCount: attachmentsDeleted } = yield attachment_1.default.deleteMany({
                userId,
            });
            // delete all posts, reposts and replies the user has made
            const { deletedCount: postsDeleted } = yield posts_1.default.deleteMany({ userId });
            // delete profile
            const { deletedCount: profilesDeleted } = yield profile_model_1.default.deleteOne({
                userId,
            });
            // delete all follows where the user is the follower
            const { deletedCount: followsDeleted } = yield follow_1.default.deleteMany({
                followerUserId: userId,
            });
            // delete user
            const { deletedCount: usersDeleted } = yield user_model_1.default.deleteOne({
                _id: userId,
            });
            return {
                reactionsDeleted,
                attachmentsDeleted,
                postsDeleted,
                profilesDeleted,
                followsDeleted,
                usersDeleted,
            };
        });
    }
}
exports.default = UserService;
