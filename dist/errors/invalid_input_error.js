"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = require("./custom_api_errors");
class InvalidInputError extends custom_api_errors_1.CustomApiError {
    constructor(inputName, expectedValue) {
        let message = `Invalid input: ${inputName}`;
        if (expectedValue) {
            message += ` (expected ${expectedValue})`;
        }
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.InvalidInputError = InvalidInputError;
