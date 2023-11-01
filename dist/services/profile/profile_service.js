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
const profile_model_1 = __importDefault(require("../../database/models/profile/profile_model"));
const errors_1 = require("../../errors");
class ProfileService {
    //!
    //! FETCHING USER PROFILE
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_model_1.default.findOne({ userId });
            if (!profile) {
                throw new errors_1.UserProfileNotFoundError();
            }
            return profile.toJSON();
        });
    }
    //!
    //! STORING / SAVING USER PROFILE
    set(userId, profileModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_model_1.default.findOneAndUpdate({ userId }, {
                userId,
                bio: profileModel.bio,
                location: profileModel.location,
                website: profileModel.website,
            }, { upsert: true, new: true, runValidators: true });
            return profile.toJSON();
        });
    }
    //!
    //! SAVE PROFILE PHOTO
    setPhoto(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { photo } = req.files;
            if (photo.mimetype !== "image/jpeg") {
                throw new errors_1.InvalidMimeTypeError();
            }
            const uploadDir = (0, utils_1.getProfilePhotosRootDir)();
            const uploadPath = (0, utils_1.getUserIdProfilePhotoPath)(userId);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, promises_1.mkdir)(uploadDir, { recursive: true });
                    yield photo.mv(uploadPath);
                    resolve();
                }
                catch (_a) {
                    reject();
                }
            }));
        });
    }
    //!
    //! GET PROFILE PHOTO
    getPhoto(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photoPath = (0, utils_1.getUserIdProfilePhotoPath)(userId);
            try {
                const status = yield (0, promises_1.stat)(photoPath);
                const isFile = status.isFile();
                if (!isFile) {
                    throw new Error();
                }
                const photoName = (0, utils_1.getUserIdProfilePhotoName)(userId);
                const options = {
                    root: (0, utils_1.getProfilePhotosRootDir)(),
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
                throw new errors_1.PhotoNotFoundError();
            }
        });
    }
}
exports.default = ProfileService;
