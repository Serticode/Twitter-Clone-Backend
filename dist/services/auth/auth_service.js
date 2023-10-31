"use strict";
//!
//!THIS IS SIMPLY THE REPOSITORY THAT DOES THE MAIN FUNCTIONS.
//! ALL FUNCTIONS IN HERE ARE CALLED BY THE CONTROLLERS
//!
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
const uuid_1 = require("uuid");
const blacklist_tokens_1 = __importDefault(require("../../database/models/blacklist/blacklist_tokens"));
const user_model_1 = __importDefault(require("../../database/models/user/user_model"));
const errors_1 = require("../../errors");
class AuthService {
    //!
    //! REGISTER USER
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.create(params);
            const uuid = (0, uuid_1.v4)();
            const token = user.createJWT(uuid);
            const refresh = user.createRefresh(uuid);
            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                },
                token,
                refresh,
            };
        });
    }
    //!
    //! LOGIN
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: params.email });
            if (!user) {
                throw new errors_1.UnauthorizedError();
            }
            const isCorrectPassword = yield user.comparePassword(params.password);
            if (!isCorrectPassword) {
                throw new errors_1.UnauthorizedError();
            }
            const uuid = (0, uuid_1.v4)();
            const token = user.createJWT(uuid);
            const refresh = user.createRefresh(uuid);
            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                },
                token,
                refresh,
            };
        });
    }
    //!
    //! LOG OUT
    logout(jti) {
        return __awaiter(this, void 0, void 0, function* () {
            yield blacklist_tokens_1.default.create({ object: jti, kind: "jti" });
        });
    }
}
exports.default = AuthService;