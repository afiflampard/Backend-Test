"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSchemas = exports.User = void 0;
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils");
const Role_model_1 = __importDefault(require("./Role.model"));
class User extends utils_1.BaseModel {
    static setAssociation() {
        this.belongsTo(Role_model_1.default, { foreignKey: "roleId", as: "role" });
    }
    static modelInit(sequlize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: new sequelize_1.DataTypes.STRING(),
            },
            password: new sequelize_1.DataTypes.STRING(),
            firstName: new sequelize_1.DataTypes.STRING(),
            lastName: new sequelize_1.DataTypes.STRING(),
            avatarUrl: new sequelize_1.DataTypes.STRING(),
            roleId: new sequelize_1.DataTypes.INTEGER(),
            isChoice: sequelize_1.DataTypes.BOOLEAN,
            lastLoginAt: new sequelize_1.DataTypes.DATE()
        }, {
            sequelize: sequlize,
            tableName: this.tableName,
            name: {
                singular: this.modelName,
                plural: this.modelNamePlural,
            },
            defaultScope: this.defaultScope,
            comment: "Model for the accessible data of user",
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
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING,
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING
            },
            avatarUrl: sequelize_1.DataTypes.STRING,
            roleId: sequelize_1.DataTypes.INTEGER,
            isChoice: sequelize_1.DataTypes.BOOLEAN,
            lastLoginAt: {
                type: sequelize_1.DataTypes.DATE,
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
exports.User = User;
User.tableName = "MT_User";
User.modelName = "User";
User.modelNamePlural = "Users";
User.defaultScope = {};
exports.swaggerSchemas = [
    {
        User: {
            title: "",
            properties: {
                id: {
                    type: "number",
                },
                username: {
                    type: "string",
                },
                firstName: {
                    type: "string",
                },
                lastName: {
                    type: "string",
                },
                avatarUrl: {
                    type: "string"
                },
                isChoice: {
                    type: "boolean"
                },
                lastLoginAt: {
                    type: "string",
                },
            },
        },
        NewUser: {
            title: "",
            properties: {
                username: {
                    type: "string",
                },
                password: {
                    type: "string"
                },
                firstName: {
                    type: "string",
                },
                lastName: {
                    type: "string",
                },
                avatarUrl: {
                    type: "string"
                },
                roleId: {
                    type: "number",
                }
            },
        },
        UpdateUser: {
            title: "",
            properties: {
                firstName: {
                    type: "string",
                },
                lastName: {
                    type: "string",
                },
                avatarUrl: {
                    type: "string"
                },
                roleId: {
                    type: "number",
                },
            },
        },
    }
];
exports.default = User;
