"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentNotFoundError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("./custom_api_errors");
class AttachmentNotFoundError extends custom_api_errors_1.CustomApiError {
    constructor(message = "Attachment not found") {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AttachmentNotFoundError = AttachmentNotFoundError;
