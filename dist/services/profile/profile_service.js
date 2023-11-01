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
const profile_model_1 = __importDefault(require("../../database/models/profile/profile_model"));
const profile_not_found_1 = require("../../errors/profile_not_found");
class ProfileService {
    //!
    //! FETCHING USER PROFILE
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_model_1.default.findOne({ userId });
            if (!profile) {
                throw new profile_not_found_1.UserProfileNotFoundError();
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
}
exports.default = ProfileService;
