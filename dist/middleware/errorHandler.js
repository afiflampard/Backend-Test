"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../utils");
exports.errorHandler = (err, _, res, _2) => {
    let error = Object.assign(Object.assign({}, err), { statusCode: 500 });
    error.message = err.message;
    switch (err.name) {
        case "JsonWebTokenError":
            error = new utils_1.ErrorResponse("Invalid token", 422);
            break;
        case "TokenExpiredError":
            error = new utils_1.ErrorResponse("Token Invalid", 401);
            break;
    }
    res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "Internal Server Error",
    });
};
