"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, _req, res, _next) => {
    let customError = {
        message: err.message,
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    };
    // user exists
    if (err.name === "MongoServerError" && err.code === 11000) {
        customError.message = "User already exists!";
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    return res
        .status(customError.statusCode)
        .json({ code: customError.statusCode, message: customError.message });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
