"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const decorators_1 = require("../decorators");
const utils_1 = require("../utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const User_model_1 = __importDefault(require("../models/User.model"));
const auth_1 = require("../middleware/auth");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET, JWT_EXPIRE } = utils_1.envConfig;
let AuthController = class AuthController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyLogin = req.body;
            let user, hashResult, token;
            try {
                if (!bodyLogin.username || !bodyLogin.password) {
                    throw { code: 400, message: "User credential not found" };
                }
                user = yield User_model_1.default.findOne({
                    where: {
                        username: bodyLogin.username
                    }
                });
                if (!user)
                    throw { code: 404, message: "User Not found" };
                hashResult = yield bcryptjs_1.compare(bodyLogin.password, user.password);
                if (!hashResult)
                    throw { code: 400, message: "Password didn't match" };
                yield user.update({
                    lastLoginAt: new Date()
                });
                token = jsonwebtoken_1.sign({
                    claims: { user: user.id }
                }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRE
                });
                if (!token)
                    throw { code: 400, message: "Failed to generate token" };
                return utils_1.successResponse({
                    res,
                    data: { token }
                });
            }
            catch (e) {
                const error = e;
                return res.status(error.code || 500).json({
                    success: false,
                    message: error.message
                });
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = auth_1.tokenExtractor(req.headers["authorization"]);
                const tokenDecode = jsonwebtoken_2.default.verify(token, JWT_SECRET);
                if (!tokenDecode)
                    throw "invalid token";
                const userId = tokenDecode.claims.user;
                const newToken = jsonwebtoken_1.sign({
                    claims: { user: userId }
                }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRE
                });
                return utils_1.successResponse({
                    res,
                    data: {
                        token: newToken
                    }
                });
            }
            catch (e) {
                console.error(e);
                return res.status(500).json({
                    success: false,
                    message: e
                });
            }
        });
    }
};
__decorate([
    decorators_1.Post({ path: "/login", tag: "Login" }, {
        responses: [
            {
                200: {
                    description: "Response token",
                    responseType: "object",
                    schema: {
                        properties: {
                            token: {
                                type: "string"
                            }
                        }
                    }
                },
            }
        ],
        request: {
            properties: {
                username: {
                    type: "string"
                },
                password: {
                    type: "string"
                }
            },
            required: ["username", "password"]
        }
    })
], AuthController.prototype, "index", null);
__decorate([
    decorators_1.Post({ path: "/refresh-token", tag: "Refresh-token" }, {
        responses: [
            {
                200: {
                    description: "Response token",
                    responseType: "object",
                    schema: "User"
                },
                500: {
                    description: "Response post object",
                    responseType: "object",
                    schema: "User"
                },
            }
        ]
    }, [auth_1.auth])
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    decorators_1.Controller("/auths")
], AuthController);
exports.default = AuthController;
