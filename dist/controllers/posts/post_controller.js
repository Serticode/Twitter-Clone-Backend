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
exports.PostsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const post_service_1 = __importDefault(require("../../services/posts/post_service"));
const tsoa_1 = require("tsoa");
//!
//! HANDLES POSTS ENDPOINT
let PostsController = class PostsController extends tsoa_1.Controller {
    //!
    //! SMALL NOTE TO SELF
    /*
     * Creates a new post, allows you to reply to an existing post or simply repost the original post.
     * For replies and reposts, the original post ID must be specified.
     * For a new post, the original post ID will be ignored.
     */
    createPost(request, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            return new post_service_1.default().createPost(user.id, body);
        });
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, tsoa_1.Post)(""),
    (0, tsoa_1.OperationId)("createPost"),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.CREATED),
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Original post ID is missing"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
exports.PostsController = PostsController = __decorate([
    (0, tsoa_1.Route)("/api/v1/posts"),
    (0, tsoa_1.Tags)("Posts")
], PostsController);
