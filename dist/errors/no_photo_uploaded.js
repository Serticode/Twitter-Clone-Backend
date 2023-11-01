"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoPhotoUploadedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("../errors/custom_api_errors");
class NoPhotoUploadedError extends custom_api_errors_1.CustomApiError {
    constructor(message = "No photo uploaded") {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NoPhotoUploadedError = NoPhotoUploadedError;
