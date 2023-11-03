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
exports.FollowController = void 0;
const http_status_codes_1 = require("http-status-codes");
const tsoa_1 = require("tsoa");
const follow_service_1 = __importDefault(require("../../services/follow/follow_service"));
//!
//!
let FollowController = class FollowController extends tsoa_1.Controller {
    //!
    //!
    /**
     * allows a user to follow another user.
     */
    followUser(request, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const followerUserId = user.id;
            const followingUserId = userId;
            return new follow_service_1.default().followUser({ followerUserId, followingUserId });
        });
    }
    //!
    //!
    /**
     * Deletes a follow relationship between two users.
     */
    unfollowUser(request, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const followerUserId = user.id;
            const followingUserId = userId;
            return new follow_service_1.default().unfollowUser({
                followerUserId,
                followingUserId,
            });
        });
    }
    //!
    //!
    /**
     * Retrieves the list of users that the specified user is following.
     */
    getUserFollowing(userId, resultsPerPage, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return new follow_service_1.default().getUserFollowing({
                userId,
                resultsPerPage,
                page,
            });
        });
    }
    //!
    //!
    /**
     * Retrieves the list of users that are following the specified user.
     */
    getUserFollowers(userId, resultsPerPage, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return new follow_service_1.default().getUserFollowers({
                userId,
                resultsPerPage,
                page,
            });
        });
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, tsoa_1.Post)("/{userId}"),
    (0, tsoa_1.OperationId)("followUser"),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Bad Request"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "followUser", null);
__decorate([
    (0, tsoa_1.Delete)("/{userId}"),
    (0, tsoa_1.OperationId)("unfollowUser"),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Bad Request"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollowUser", null);
__decorate([
    (0, tsoa_1.Get)("/{userId}/following"),
    (0, tsoa_1.OperationId)("getUserFollowing"),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getUserFollowing", null);
__decorate([
    (0, tsoa_1.Get)("/{userId}/followers"),
    (0, tsoa_1.OperationId)("getUserFollowers"),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getUserFollowers", null);
exports.FollowController = FollowController = __decorate([
    (0, tsoa_1.Route)("/api/v1/follow"),
    (0, tsoa_1.Tags)("Follow")
], FollowController);
