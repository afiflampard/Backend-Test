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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const dbConnection_1 = require("../utils/dbConnection");
const Role_model_1 = require("../models/Role.model");
exports.up = (query) => __awaiter(void 0, void 0, void 0, function* () {
    dbConnection_1.sequelize_postgres.options.logging = false;
    Role_model_1.Role.modelInit(dbConnection_1.sequelize_postgres);
    const roleKeys = [
        "Staff",
        "Voter"
    ];
    try {
        for (const role of roleKeys) {
            yield Role_model_1.Role.create({
                name: role,
            });
        }
        return Promise.resolve(1);
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
