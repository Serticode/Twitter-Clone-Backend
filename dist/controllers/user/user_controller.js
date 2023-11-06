"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const tsoa_1 = require("tsoa");
const auth_service_1 = __importDefault(require("../../services/auth/auth_service"));
const user_service_1 = __importDefault(require("../../services/user/user_service"));
let UserController = class UserController extends tsoa_1.Controller {
    //!
    //!
    /**
     * Set the username of the authenticated user.
     */
    setUsername(request, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = request.user;
            return new user_service_1.default().setUsername(userId, params);
        });
    }
    //!
    //!
    /**
     * deletes a user and all their data.
     */
    deleteUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId, jti } = request.user;
            const result = new user_service_1.default().deleteUser(userId);
            // also log the user out
            yield new auth_service_1.default().logout(jti);
            return result;
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)("/setUsername"),
    (0, tsoa_1.OperationId)("setUsername"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Bad Request"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setUsername", null);
__decorate([
    (0, tsoa_1.Delete)("deleteUser"),
    (0, tsoa_1.OperationId)("deleteUser"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("/api/v1/user"),
    (0, tsoa_1.Tags)("User")
], UserController);
