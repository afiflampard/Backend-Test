"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSchemas = exports.Calon = void 0;
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils");
const User_model_1 = __importDefault(require("./User.model"));
class Calon extends utils_1.BaseModel {
    static setAssociation() {
        this.hasMany(User_model_1.default, {
            foreignKey: "id",
            as: "voter"
        });
    }
    static modelInit(sequlize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: sequelize_1.DataTypes.STRING,
            suaraIds: new sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER()),
            suara: sequelize_1.DataTypes.INTEGER,
        }, {
            sequelize: sequlize,
            tableName: this.tableName,
            name: {
                singular: this.modelName,
                plural: this.modelNamePlural,
            },
            defaultScope: this.defaultScope,
            comment: "Model for the accessible data of Line",
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
            suaraIds: new sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER()),
            suara: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
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
exports.Calon = Calon;
Calon.tableName = "MT_Calon";
Calon.modelName = "Calon";
Calon.modelNamePlural = "Calons";
Calon.defaultScope = {};
exports.swaggerSchemas = [
    {
        NewCalon: {
            title: "",
            properties: {
                name: {
                    type: "string",
                },
            }
        },
        Calon: {
            title: "",
            properties: {
                id: {
                    type: "number"
                },
                name: {
                    type: "string"
                },
                suara: {
                    type: "number"
                }
            }
        }
    }
];
exports.default = Calon;
