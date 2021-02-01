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
const auth_1 = require("../middleware/auth");
const bcryptjs_1 = require("bcryptjs");
const User_model_1 = __importDefault(require("../models/User.model"));
const utils_1 = require("../utils");
let UserController = class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, firstName, lastName, roleId, } = req.body;
            try {
                if (!req.body.username || !req.body.password) {
                    throw "username and password is required";
                }
                const currentUser = yield User_model_1.default.findOne({
                    where: {
                        username
                    }
                });
                if (currentUser)
                    throw "user exist";
                const salt = yield bcryptjs_1.genSalt(12);
                const hashPassword = yield bcryptjs_1.hash(password, salt);
                let user;
                if (req.user.role.name == "Staff") {
                    user = yield User_model_1.default.create({
                        firstName,
                        lastName,
                        username,
                        password: hashPassword,
                        roleId,
                        isChoice: false,
                        avatarUrl: "",
                    });
                }
                if (!user)
                    throw "cant create user";
                return utils_1.successResponse({ res, data: user });
            }
            catch (e) {
                return res.status(500).json({
                    sucess: false,
                    message: e
                });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_model_1.default.findAll({
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        attributes: ["id", "name"],
                        association: User_model_1.default.associations.role,
                        as: "role"
                    },
                ]
            });
            return utils_1.successResponse({ res, data: users });
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield User_model_1.default.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ["password"]
                }
            });
            if (!user)
                return utils_1.errorResponse({ res, msg: `User with id ${id} not found`, statusCode: 404 });
            return utils_1.successResponse({ res, data: user });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, firstName, lastName, roleId, avatarUrl, } = req.body;
            const { id } = req.params;
            try {
                const user = yield User_model_1.default.findOne({
                    where: {
                        id
                    },
                    include: [
                        {
                            association: User_model_1.default.associations.role
                        }
                    ]
                });
                if (!user)
                    throw { code: 404, message: `User with id ${id} not found` };
                if (user.role.name == "Staff") {
                    yield user.update({
                        firstName: firstName !== null && firstName !== void 0 ? firstName : user.firstName,
                        lastName: lastName !== null && lastName !== void 0 ? lastName : user.lastName,
                        roleId: roleId !== null && roleId !== void 0 ? roleId : user.roleId,
                        avatarUrl: avatarUrl !== null && avatarUrl !== void 0 ? avatarUrl : user.avatarUrl,
                    });
                }
                else {
                    yield user.update({
                        firstName: firstName !== null && firstName !== void 0 ? firstName : user.firstName,
                        lastName: lastName !== null && lastName !== void 0 ? lastName : user.lastName,
                        roleId: roleId !== null && roleId !== void 0 ? roleId : user.roleId,
                        avatarUrl: avatarUrl !== null && avatarUrl !== void 0 ? avatarUrl : user.avatarUrl,
                    });
                }
                return utils_1.successResponse({ res, msg: `User with id ${id} successfully updated` });
            }
            catch (e) {
                console.error(e);
                const err = e;
                return utils_1.errorResponse({ res, msg: err.message, statusCode: err.code | 500 });
            }
        });
    }
    changePassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { oldPassword, newPassword } = req.body;
            const { id } = req.params;
            try {
                const user = yield User_model_1.default.findOne({
                    where: {
                        id
                    },
                });
                if (!user)
                    throw { code: 404, message: `User with id ${id} not found` };
                const isValidPassword = yield bcryptjs_1.compare(oldPassword, user.password);
                if (!isValidPassword)
                    throw { code: 400, message: "Your password is wrong" };
                const salt = yield bcryptjs_1.genSalt(12);
                const hashPassword = yield bcryptjs_1.hash(newPassword, salt);
                yield user.update({
                    password: hashPassword
                });
                return utils_1.successResponse({ res, msg: `Password User with id ${id} successfully updated` });
            }
            catch (e) {
                console.error(e);
                const err = e;
                return utils_1.errorResponse({ res, msg: err.message, statusCode: (_a = err.code) !== null && _a !== void 0 ? _a : 500 });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield User_model_1.default.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ["password"]
                }
            });
            if (!user)
                return utils_1.errorResponse({ res, msg: `User with id ${id} not found`, statusCode: 404 });
            yield user.destroy();
            return utils_1.successResponse({ res, data: null });
        });
    }
};
__decorate([
    decorators_1.Post({ path: "/" }, {
        responses: [
            {
                200: {
                    description: "Response post object",
                    responseType: "object",
                    schema: "User"
                },
            }
        ],
        request: "NewUser"
    }, [auth_1.auth])
], UserController.prototype, "create", null);
__decorate([
    decorators_1.Get({ path: "/" }, {
        responses: [
            {
                200: {
                    description: "Response get object",
                    responseType: "array",
                    schema: "User"
                }
            }
        ]
    })
], UserController.prototype, "getUsers", null);
__decorate([
    decorators_1.Get({ path: "/:id" }, {
        responses: [
            {
                200: {
                    description: "Response get object",
                    responseType: "object",
                    schema: "User"
                }
            }
        ],
        parameters: [
            {
                in: "path",
                name: "id",
                schema: {
                    id: {
                        type: "number"
                    }
                },
                required: true
            }
        ]
    })
], UserController.prototype, "getUserById", null);
__decorate([
    decorators_1.Put({ path: "/:id" }, {
        responses: [
            {
                200: {
                    description: "Response put object",
                    responseType: "object",
                    schema: "User"
                }
            }
        ],
        request: "UpdateUser",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    type: "number",
                },
                required: true
            }
        ]
    }, [auth_1.auth])
], UserController.prototype, "update", null);
__decorate([
    decorators_1.Patch({ path: "/:id" }, {
        responses: [
            {
                200: {
                    description: "Response put object",
                    responseType: "object",
                    schema: {
                        properties: {
                            success: {
                                type: "boolean"
                            },
                            msg: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        ],
        request: {
            type: "object",
            properties: {
                oldPassword: {
                    type: "string"
                },
                newPassword: {
                    type: "string"
                }
            }
        },
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    type: "number",
                },
                required: true
            }
        ]
    }, [auth_1.auth])
], UserController.prototype, "changePassword", null);
__decorate([
    decorators_1.Delete({ path: "/:id" }, {
        responses: [
            {
                200: {
                    description: "Response delete array",
                    responseType: "object",
                    schema: {
                        properties: {
                            success: {
                                type: "boolean"
                            }
                        }
                    }
                }
            }
        ]
    }, [auth_1.auth])
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    decorators_1.Controller("/users")
], UserController);
exports.default = UserController;
