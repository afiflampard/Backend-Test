"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSchemas = exports.Role = void 0;
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils");
class Role extends utils_1.BaseModel {
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
exports.Role = Role;
Role.tableName = "MT_Role";
Role.modelName = "Role";
Role.modelNamePlural = "Roles";
Role.defaultScope = {};
exports.swaggerSchemas = [
    {
        Role: {
            title: "",
            properties: {
                id: {
                    type: "number",
                },
                name: {
                    type: "string",
                },
                menus: {
                    type: "array",
                    items: {
                        properties: {
                            id: {
                                type: "number"
                            },
                            url: {
                                type: "string"
                            },
                            label: {
                                type: "string"
                            },
                            subMenus: {
                                type: "array",
                                items: {
                                    properties: {
                                        id: {
                                            type: "number"
                                        },
                                        url: {
                                            type: "string"
                                        },
                                        label: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        NewRole: {
            title: "",
            properties: {
                name: {
                    type: "string",
                },
                menuIds: {
                    type: "array",
                    items: {
                        type: "number"
                    }
                }
            },
        },
    }
];
exports.default = Role;
