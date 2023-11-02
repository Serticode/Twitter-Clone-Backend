"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.QueriesController = void 0;
const express = __importStar(require("express"));
const http_status_codes_1 = require("http-status-codes");
const tsoa_1 = require("tsoa");
const post_model_1 = require("../../services/models/post_model");
const query_service_1 = __importDefault(require("../../services/query/query_service"));
let QueriesController = class QueriesController extends tsoa_1.Controller {
    //!
    //!
    /**
     * Retrieves posts with given parameters, with pagination.
     */
    queryPosts(request, userId, resultsPerPage, page, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const resolvedUserId = userId !== null && userId !== void 0 ? userId : user.id;
            return new query_service_1.default().queryPosts({
                userId: resolvedUserId,
                resultsPerPage,
                page,
                type,
            }, resolvedUserId);
        });
    }
    //!
    //!
    /**
     * Retrieves replies to a post with given parameters, with pagination.
     */
    getReplies(postId, resultsPerPage, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return new query_service_1.default().getReplies({
                postId,
                resultsPerPage,
                page,
            });
        });
    }
    //!
    //!
    /**
     * Retrieves reactions made by a user, with pagination.
     */
    getReactions(request, userId, resultsPerPage, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const requestUserId = user.id;
            return new query_service_1.default().getReactions({
                userId,
                resultsPerPage,
                page,
            }, requestUserId);
        });
    }
    //!
    //!
    /**
     * Retrieves stats for a post: number of reactions, replies and reposts.
     */
    getPostStats(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new query_service_1.default().getPostStats(postId);
        });
    }
};
exports.QueriesController = QueriesController;
__decorate([
    (0, tsoa_1.Get)("/posts"),
    (0, tsoa_1.OperationId)("queryPosts"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], QueriesController.prototype, "queryPosts", null);
__decorate([
    (0, tsoa_1.Get)("/replies/{postId}"),
    (0, tsoa_1.OperationId)("getReplies"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], QueriesController.prototype, "getReplies", null);
__decorate([
    (0, tsoa_1.Get)("/reactions/{userId}"),
    (0, tsoa_1.OperationId)("getReactions"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], QueriesController.prototype, "getReactions", null);
__decorate([
    (0, tsoa_1.Get)("/stats/{postId}"),
    (0, tsoa_1.OperationId)("getPostStats"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueriesController.prototype, "getPostStats", null);
exports.QueriesController = QueriesController = __decorate([
    (0, tsoa_1.Route)("/api/v1/query"),
    (0, tsoa_1.Tags)("Queries")
], QueriesController);
