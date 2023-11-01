"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OriginalPostIdMissingError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("./custom_api_errors");
class OriginalPostIdMissingError extends custom_api_errors_1.CustomApiError {
    constructor(message = "Original post id is missing") {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.OriginalPostIdMissingError = OriginalPostIdMissingError;
