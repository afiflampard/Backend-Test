"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const sequelize_1 = require("sequelize");
class BaseModel extends sequelize_1.Model {
    static modelInit(sequelize) {
        throw new Error("modelPrepare not implemented");
    }
    static setAssociation() {
        throw new Error("modelPrepare not implemented");
    }
}
exports.BaseModel = BaseModel;
BaseModel.defaultScope = {};
