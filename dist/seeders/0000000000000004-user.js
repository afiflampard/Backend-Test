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
exports.down = exports.up = void 0;
const bcryptjs_1 = require("bcryptjs");
const User_model_1 = __importDefault(require("../models/User.model"));
const Role_model_1 = __importDefault(require("../models/Role.model"));
const dbConnection_1 = require("../utils/dbConnection");
exports.up = (query) => __awaiter(void 0, void 0, void 0, function* () {
    dbConnection_1.sequelize_postgres.options.logging = false;
    Role_model_1.default.modelInit(dbConnection_1.sequelize_postgres);
    try {
        const [Staff, Voter] = yield Role_model_1.default.findAll({
            where: {
                name: [
                    "Staff",
                    "Voter",
                ]
            }
        });
        const password = yield bcryptjs_1.hash("password", yield bcryptjs_1.genSalt(12));
        const now = new Date();
        const users = yield query.bulkInsert(User_model_1.default.tableName, [
            {
                username: "12345",
                password,
                firstName: "Staff",
                lastName: "Staf",
                roleId: Staff.id,
                isChoice: false,
                createdAt: now,
                updatedAt: now,
            },
            {
                username: "12344",
                password,
                firstName: "Voter",
                lastName: "vot",
                isChoice: false,
                roleId: Voter.id,
                createdAt: now,
                updatedAt: now,
            },
        ]);
        return Promise.resolve(users);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.down = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return Promise.reject(error);
    }
});
