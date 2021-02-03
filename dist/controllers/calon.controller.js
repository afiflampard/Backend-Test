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
const Calon_model_1 = __importDefault(require("../models/Calon.model"));
const utils_1 = require("../utils");
const User_model_1 = __importDefault(require("../models/User.model"));
let CalonController = class CalonController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.user.id;
            const { name } = req.body;
            const user = yield User_model_1.default.findOne({
                where: {
                    id
                }
            });
            let calon;
            if (user.roleId == 1) {
                calon = yield Calon_model_1.default.create({
                    name,
                    suara: 0,
                });
            }
            else {
                return utils_1.errorResponse({ res, msg: `User with id ${id} not allowed`, statusCode: 404 });
            }
            return utils_1.successResponse({ res, data: calon });
        });
    }
    getCalons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const calons = yield Calon_model_1.default.findAll();
            if (!calons) {
                return utils_1.errorResponse({ res, msg: `Calon not Found`, statusCode: 404 });
            }
            return utils_1.successResponse({ res, data: calons });
        });
    }
    updateVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Idchoice } = req.query;
            try {
                const user = yield User_model_1.default.findOne({
                    where: {
                        id
                    },
                });
                if (!user) {
                    return utils_1.errorResponse({ res, msg: `User with ${id} not found`, statusCode: 404 });
                }
                if (!user.isChoice) {
                    let suara;
                    let array = [];
                    let calon = yield Calon_model_1.default.findOne({
                        where: {
                            id: Idchoice
                        }
                    });
                    if (calon.suaraIds != null) {
                        if (calon.suaraIds.includes(user.id)) {
                            return utils_1.errorResponse({ res, msg: `User with id ${id} already choice`, statusCode: 400 });
                        }
                        else {
                            array.push(user.id);
                            suara = calon.suara + 1;
                        }
                    }
                    else {
                        array.push(user.id);
                        suara = calon.suara + 1;
                    }
                    yield user.update({
                        isChoice: true
                    });
                    yield calon.update({
                        suaraIds: array,
                        suara: suara
                    });
                    return utils_1.successResponse({ res, msg: `Calon with id ${calon.id} sudah ditambahkan` });
                }
                else {
                    return utils_1.errorResponse({ res, msg: `User with id ${user.id} already choice`, statusCode: 401 });
                }
            }
            catch (e) {
                const err = e;
                return utils_1.errorResponse({ res, msg: err.message, statusCode: err.code | 500 });
            }
        });
    }
    updateCalon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { idCalon } = req.query;
            const { name } = req.body;
            if (!name) {
                utils_1.errorResponse({ res, msg: `Name must have writing`, statusCode: 400 });
            }
            try {
                const user = yield User_model_1.default.findOne({
                    where: {
                        id
                    },
                    include: [
                        {
                            attributes: ["id", "name"],
                            association: User_model_1.default.associations.role,
                            as: "role"
                        }
                    ]
                });
                const calon = yield Calon_model_1.default.findOne({
                    where: {
                        id: idCalon
                    }
                });
                if (user.role.name == "Staff") {
                    calon.update({
                        name: name
                    });
                }
                return utils_1.successResponse({ res, msg: `Calon with ${idCalon} sudah diupdate` });
            }
            catch (e) {
                const err = e;
                return utils_1.errorResponse({ res, msg: err.message, statusCode: 500 });
            }
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
                    schema: "Calon"
                },
            }
        ],
        request: "NewCalon"
    }, [auth_1.auth])
], CalonController.prototype, "create", null);
__decorate([
    decorators_1.Get({ path: "/" }, {
        responses: [
            {
                200: {
                    description: "Response get Object",
                    responseType: "array",
                    schema: "Calon"
                }
            }
        ]
    }, [auth_1.auth])
], CalonController.prototype, "getCalons", null);
__decorate([
    decorators_1.Put({ path: "/vote/:id" }, {
        responses: [
            {
                200: {
                    description: "Response put object",
                    responseType: "object",
                    schema: "NewCalon"
                }
            }
        ],
        parameters: [
            {
                in: "query",
                schema: {
                    type: "number"
                },
                name: "Idchoice"
            },
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
], CalonController.prototype, "updateVote", null);
__decorate([
    decorators_1.Put({ path: "/:id" }, {
        responses: [
            {
                200: {
                    description: "Response put object",
                    responseType: "object",
                    schema: "NewCalon"
                }
            }
        ],
        parameters: [
            {
                name: "idCalon",
                in: "query",
                schema: {
                    type: "number"
                }
            },
            {
                name: "id",
                in: "path",
                schema: {
                    type: "number"
                },
                required: true
            }
        ],
        request: "NewCalon"
    }, [auth_1.auth])
], CalonController.prototype, "updateCalon", null);
CalonController = __decorate([
    decorators_1.Controller("/calon")
], CalonController);
exports.default = CalonController;
