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
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const tsoa_1 = require("tsoa");
const auth_service_1 = __importDefault(require("../../services/auth/auth_service"));
//! ENFORCING THE ROUTE USING TSOA @ROUTE
let AuthController = class AuthController extends tsoa_1.Controller {
    //! STATING THAT THE METHOD BELOW IS A POST METHOD. IT CAN BE A GET, PUT OR DELETE
    register(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(http_status_codes_1.StatusCodes.CREATED);
            return new auth_service_1.default().register(requestBody);
        });
    }
    //!
    //! LOGIN USER
    login(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(http_status_codes_1.StatusCodes.OK);
            return new auth_service_1.default().login(requestBody);
        });
    }
    //! DELETE / LOGOUT END POINT
    logout(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
            const user = request.user;
            yield new auth_service_1.default().logout(user.jti);
        });
    }
    // TODO: remove this dummy endpoint later when
    // we have proper endpoints that use our
    // authentication mechanism
    dummy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(http_status_codes_1.StatusCodes.OK);
            return Promise.resolve();
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)("register")
    //! ID FOR THE OPERATION
    ,
    (0, tsoa_1.OperationId)("registerUser")
    //!
    //! REGISTER USER
    ,
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, tsoa_1.Post)("login"),
    (0, tsoa_1.OperationId)("loginUser"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Delete)(),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.OperationId)("logoutUser"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, tsoa_1.Post)("dummy"),
    (0, tsoa_1.OperationId)("dummy"),
    (0, tsoa_1.Security)("jwt"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "dummy", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/api/v1/auth")
    //! ENFORCING A ROUTE TAG
    ,
    (0, tsoa_1.Tags)("Auth")
    //!
    //! CONTROLLER STARTS HERE
], AuthController);
