"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("./custom_api_errors");
class UnauthorizedError extends custom_api_errors_1.CustomApiError {
    constructor(message = "Invalid Credentials") {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
