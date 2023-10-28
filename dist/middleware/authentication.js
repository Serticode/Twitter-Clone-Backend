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
exports.expressAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blacklist_tokens_1 = __importDefault(require("../database/models/blacklist/blacklist_tokens"));
const errors_1 = require("../errors");
function expressAuthentication(req, securityName, _scopes) {
    return __awaiter(this, void 0, void 0, function* () {
        //! GRAB THE TOKEN OUT OF THE AUTHORIZATION HEADER
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new errors_1.UnauthorizedError();
        }
        const isBearer = authHeader.startsWith("Bearer ");
        if (!authHeader || !isBearer) {
            throw new errors_1.UnauthorizedError();
        }
        const token = authHeader.split(" ")[1];
        if (securityName == "jwt") {
            try {
                return yield jwtAuth(token, false);
            }
            catch (error) {
                throw new errors_1.UnauthorizedError();
            }
        }
        else if (securityName == "jwt_without_verification") {
            try {
                return yield jwtAuth(token, true);
            }
            catch (_a) {
                throw new errors_1.UnauthorizedError();
            }
        }
        else {
            throw new errors_1.UnauthorizedError();
        }
    });
}
exports.expressAuthentication = expressAuthentication;
function jwtAuth(token, ignoreExpiration = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: ignoreExpiration,
        });
        const jti = decoded.jti;
        //! MAKE SUER THE JTI IS NOT BLACKLISTED
        const blacklisted = yield blacklist_tokens_1.default.findOne({
            object: jti,
            kind: "jti",
        });
        if (blacklisted) {
            throw new errors_1.UnauthorizedError();
        }
        const user = {
            id: decoded.userId,
            email: decoded.email,
            jti: jti,
            iss: decoded.iss,
        };
        return user;
    });
}
