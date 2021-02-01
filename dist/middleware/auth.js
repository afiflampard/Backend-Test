"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const User_model_1 = __importDefault(require("../models/User.model"));
function tokenExtractor(token) {
    const extracted = token.split(" ")[1];
    if (!extracted)
        throw "Error no Bearer auth token provided";
    return extracted;
}
exports.tokenExtractor = tokenExtractor;
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authHeader;
    let token;
    try {
        authHeader = req.headers["authorization"];
        if (!authHeader)
            throw "Error no authorization header";
        token = tokenExtractor(authHeader);
        jsonwebtoken_1.default.verify(token, utils_1.envConfig.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    return res.status(500).json({
                        sucess: false,
                        message: "Token expired"
                    });
                }
            }
            if (err)
                throw err;
            const user = yield User_model_1.default.findOne({
                where: {
                    id: decoded.claims.user
                },
                attributes: {
                    exclude: ["password", "roleId"]
                },
                include: [
                    {
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"]
                        },
                        association: User_model_1.default.associations.role,
                        as: "role"
                    },
                ]
            });
            req.user = user;
            next();
        }));
    }
    catch (e) {
        return res.status(500).json({
            sucess: false,
            message: e
        });
    }
});
