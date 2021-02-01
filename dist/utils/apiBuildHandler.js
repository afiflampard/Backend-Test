"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaRequest = exports.getSchemaResponse = exports.errorResponse = exports.successResponse = void 0;
const index_1 = require("./index");
exports.successResponse = (result) => {
    var _a;
    return result.res.status(200).json({
        success: true,
        data: result.data || undefined,
        message: (_a = result.msg) !== null && _a !== void 0 ? _a : "Process was Successfully"
    });
};
exports.errorResponse = (result) => {
    const error = new index_1.ErrorResponse(result.msg, result.statusCode);
    return result.res.status(result.statusCode).json({
        success: false,
        message: error.message
    });
};
exports.getSchemaResponse = (title, schemaName, typeDataResp) => {
    title = typeDataResp === "array" ? title + "s" : title;
    const data = typeDataResp === "array"
        ? {
            type: "array",
            items: {
                $ref: "#/components/schemas/" + schemaName,
            },
        }
        : { $ref: "#/components/schemas/" + schemaName };
    return {
        type: "object",
        title: title + ".Response",
        properties: {
            success: {
                type: "boolean"
            },
            message: {
                type: "string",
            },
            data,
        },
    };
};
exports.getSchemaRequest = (schemaName) => {
    return {
        $ref: "#/components/schemas/" + schemaName,
    };
};
