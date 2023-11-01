"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostNotFoundError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("./custom_api_errors");
class PostNotFoundError extends custom_api_errors_1.CustomApiError {
    constructor(message = "Post not found") {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.PostNotFoundError = PostNotFoundError;
