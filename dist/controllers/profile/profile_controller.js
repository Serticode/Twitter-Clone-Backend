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
exports.ProfileController = void 0;
const http_status_codes_1 = require("http-status-codes");
const tsoa_1 = require("tsoa");
const profile_service_1 = __importDefault(require("../../services/profile/profile_service"));
let ProfileController = class ProfileController extends tsoa_1.Controller {
    //!
    //! FETCH USER PROFILE DETAILS
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(http_status_codes_1.StatusCodes.OK);
            return new profile_service_1.default().get(userId);
        });
    }
    //!
    //! SET / SAVE USER PROFILE DETAILS
    setProfile(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(http_status_codes_1.StatusCodes.OK);
            const user = request.user;
            return new profile_service_1.default().set(user.id, requestBody);
        });
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Get)("info/{userId}"),
    (0, tsoa_1.OperationId)("getProfile"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "get", null);
__decorate([
    (0, tsoa_1.Response)(http_status_codes_1.StatusCodes.OK),
    (0, tsoa_1.Post)("info"),
    (0, tsoa_1.OperationId)("setProfile"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, tsoa_1.Route)("/api/v1/profile"),
    (0, tsoa_1.Tags)("Profile")
], ProfileController);
