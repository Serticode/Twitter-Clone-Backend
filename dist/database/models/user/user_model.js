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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
//!
//! INITIAL SCHEMA / PAYLOAD OR DATA STRUCTURE FOR OUR AUTHORIZED USER
//! AS IT SHOULD BE STORED ON THE BE
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxlength: [30, "Your name cannot exceed 30 characters"],
        minlength: [3, "Your name must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Your password must be at least 6 characters long"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        trim: true,
        unique: true,
        maxlength: [30, "Your username cannot exceed 30 characters"],
        minlength: [3, "Your username must be at least 3 characters long"],
    },
});
//!
//! FOR PASSWORD - HASHING PASSWORD
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            this.password = yield bcryptjs_1.default.hash(this.password, salt);
        }
        next();
    });
});
//!
//! CREATING JWT
UserSchema.methods.createJWT = function (uuid) {
    const token = jsonwebtoken_1.default.sign({ userId: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
        issuer: process.env.JWT_ISSUER,
        jwtid: uuid,
    });
    return token;
};
//!
//! CREATING REFRESH TOKENS
UserSchema.methods.createRefresh = function (uuid) {
    const refreshToken = jsonwebtoken_1.default.sign({ userId: this._id, email: this.email }, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_EXPIRES,
        issuer: process.env.JWT_ISSUER,
        jwtid: uuid,
    });
    return refreshToken;
};
//!
//! USER SCHEMA TO JSON
UserSchema.methods.toJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        username: this.username,
    };
};
//!
//! COMPARE USER PASSWORDS
UserSchema.methods.comparePassword = function (enteredPassword) {
    return bcryptjs_1.default.compare(enteredPassword, this.password);
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
