"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDoc = exports.GenerateApiDoc = void 0;
const index_1 = require("./index");
exports.GenerateApiDoc = (properties, schemas, payload) => {
    const paths = {};
    const responses = {};
    let requestBody;
    if (payload.request) {
        if (typeof payload.request == "string") {
            requestBody = {
                content: {
                    "application/json": {
                        schema: index_1.getSchemaRequest(payload.request)
                    }
                }
            };
        }
        else {
            const formEncode = typeof payload.request.formEncode == "undefined" ? "json" : payload.request.formEncode;
            delete payload.request.formEncode;
            if (formEncode == "json") {
                requestBody = {
                    content: {
                        "application/json": {
                            schema: payload.request
                        }
                    }
                };
            }
            else {
                requestBody = {
                    content: {
                        "multipart/form-data": {
                            schema: payload.request
                        }
                    }
                };
            }
        }
    }
    for (const response of payload.responses) {
        const statusCodes = Object.keys(response);
        const responseBodies = Object.values(response);
        for (let i = 0; i < statusCodes.length; i++) {
            let schema;
            if (typeof responseBodies[i].schema == "string") {
                schema = index_1.getSchemaResponse(responseBodies[i].description, responseBodies[i].schema, responseBodies[i].responseType);
            }
            else {
                schema = responseBodies[i].schema;
            }
            responses[Number(statusCodes[i])] = {
                description: responseBodies[i].description,
                content: {
                    "application/json": {
                        schema
                    }
                }
            };
        }
    }
    paths[properties.path] = {};
    paths[properties.path][properties.method] = {
        tags: [properties.tag],
        responses,
        requestBody,
        parameters: payload.parameters
    };
    const apiDoc = {
        paths,
        schemas
    };
    return apiDoc;
};
exports.apiDoc = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "MV BE Boilerplate",
        description: "This starting point to develop be using TS",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
        },
    },
    servers: [
        {
            url: "/api/v1",
        },
    ],
    authAction: {
        JWT: {
            name: "JWT",
            schema: {
                type: "apiKey",
                in: "header",
                name: "Authorization",
                description: "sda",
            },
            value: "Bearer <JWT>",
        },
    },
    security: [
        {
            Bearer: [""],
        },
    ],
    paths: {},
    components: {
        schemas: {
            ErrorResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
        },
        securitySchemes: {
            Bearer: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};
