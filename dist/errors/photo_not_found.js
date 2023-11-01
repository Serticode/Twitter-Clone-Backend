"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoNotFoundError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("../errors/custom_api_errors");
class PhotoNotFoundError extends custom_api_errors_1.CustomApiError {
    constructor(message = "Photo not found") {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.PhotoNotFoundError = PhotoNotFoundError;
