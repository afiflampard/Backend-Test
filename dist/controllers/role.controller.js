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
const Role_model_1 = __importDefault(require("../models/Role.model"));
const utils_1 = require("../utils");
let RoleController = class RoleController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, } = req.body;
            try {
                if (!name) {
                    throw "name is required";
                }
                const role = yield Role_model_1.default.create({
                    name,
                });
                return utils_1.successResponse({ res, data: role });
            }
            catch (e) {
                return res.status(500).json({
                    sucess: false,
                    message: e
                });
            }
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield Role_model_1.default.findAll();
            return utils_1.successResponse({ res, data: roles });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const role = yield Role_model_1.default.findOne({
                where: {
                    id
                },
            });
            if (!role)
                return utils_1.errorResponse({ res, msg: `Role with id ${id} not found`, statusCode: 404 });
            return utils_1.successResponse({ res, data: role });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, lineId } = req.body;
            const area = yield Role_model_1.default.findOne({
                where: {
                    id
                },
            });
            if (!area)
                return utils_1.errorResponse({ res, msg: `Role with id ${id} not found`, statusCode: 404 });
            const newArea = yield area.update({
                name,
                lineId
            });
            return utils_1.successResponse({ res, data: newArea });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const role = yield Role_model_1.default.findOne({
                where: {
                    id
                },
            });
            if (!role)
                return utils_1.errorResponse({ res, msg: `Role with id ${id} not found`, statusCode: 404 });
            yield role.destroy();
            return utils_1.successResponse({ res, data: null });
        });
    }
};
__decorate([
    decorators_1.Post({ path: "/", tag: "RoleController" }, {
        responses: [
            {
                200: {
                    description: "Response post object",
                    responseType: "object",
                    schema: "Role"
                },
            }
        ],
        request: "NewRole"
    }, [])
], RoleController.prototype, "create", null);
__decorate([
    decorators_1.Get({ path: "/", tag: "RoleController" }, {
        responses: [
            {
                200: {
                    description: "Response get object",
                    responseType: "array",
                    schema: "Role"
                }
            }
        ]
    })
], RoleController.prototype, "gets", null);
__decorate([
    decorators_1.Get({ path: "/:id", tag: "RoleController" }, {
        responses: [
            {
                200: {
                    description: "Response get object",
                    responseType: "object",
                    schema: "Role"
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
], RoleController.prototype, "getById", null);
__decorate([
    decorators_1.Put({ path: "/:id", tag: "RoleController" }, {
        responses: [
            {
                200: {
                    description: "Response put object",
                    responseType: "object",
                    schema: "Role"
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
        ],
        request: {
            properties: {
                name: {
                    type: "string"
                },
                lineId: {
                    type: "number"
                }
            }
        }
    })
], RoleController.prototype, "edit", null);
__decorate([
    decorators_1.Delete({ path: "/:id", tag: "RoleController" }, {
        responses: [
            {
                200: {
                    description: "Response delete",
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
    }, [auth_1.auth])
], RoleController.prototype, "delete", null);
RoleController = __decorate([
    decorators_1.Controller("/roles")
], RoleController);
exports.default = RoleController;
