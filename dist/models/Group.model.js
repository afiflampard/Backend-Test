"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSchemas = exports.Group = void 0;
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils");
class Group extends utils_1.BaseModel {
    static setAssociation() { }
    static modelInit(sequlize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: sequelize_1.DataTypes.STRING,
        }, {
            sequelize: sequlize,
            tableName: this.tableName,
            name: {
                singular: this.modelName,
                plural: this.modelNamePlural,
            },
            defaultScope: this.defaultScope,
            comment: "Model for the accessible data of Group",
            paranoid: true
        });
    }
    static createTable(query) {
        return query.createTable(this.tableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            deletedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        });
    }
    static dropTable(query) {
        return query.dropTable(this.tableName);
    }
}
exports.Group = Group;
Group.tableName = "MT_Group";
Group.modelName = "Group";
Group.modelNamePlural = "Groups";
Group.defaultScope = {};
exports.swaggerSchemas = [
    {
        Group: {
            title: "",
            properties: {
                id: {
                    type: "number",
                },
                name: {
                    type: "string",
                },
            },
        },
        NewGroup: {
            title: "",
            properties: {
                name: {
                    type: "string",
                },
            },
        },
    }
];
exports.default = Group;
