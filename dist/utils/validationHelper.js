"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationResultHelper = exports.validationFailResponse = void 0;
const express_validator_1 = require("express-validator");
const errorResponse_1 = require("./errorResponse");
exports.validationFailResponse = (res, errorMessage) => {
    return res.status(422).json({
        message: "Validation Fail",
        data: errorMessage,
    });
};
exports.validationResultHelper = (req, next) => {
    const error = express_validator_1.validationResult(req);
    if (error) {
        return next(new errorResponse_1.ErrorResponse("Validation Fail", 422));
    }
    next();
};
