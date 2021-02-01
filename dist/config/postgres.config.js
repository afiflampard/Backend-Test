"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.production = exports.local = exports.development = void 0;
const utils_1 = require("../utils");
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DIALECT, } = utils_1.envConfig;
const config = {
    "local": {
        "username": "postgres",
        "password": "laniuslab",
        "database": "dummy",
        "host": "192.168.1.50",
        "port": 5432
    },
    "test": {
        "username": "postgres",
        "password": "laniuslab",
        "database": "dummy",
        "host": "192.168.1.50",
        "port": 5432
    },
    "production": {
        "username": "postgres",
        "password": "laniuslab",
        "database": "dummy",
        "host": "192.168.1.50",
        "port": 5432
    }
};
exports.development = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_NAME,
    dialect: DB_DIALECT ? "postgres" : "postgres",
    seederStorage: "sequelize",
};
exports.local = Object.assign(Object.assign({}, config.local), { dialect: DB_DIALECT ? "postgres" : "postgres", seederStorage: "sequelize" });
exports.production = Object.assign(Object.assign({}, config.production), { dialect: DB_DIALECT ? "postgres" : "postgres", seederStorage: "sequelize" });
exports.test = Object.assign(Object.assign({}, config.test), { dialect: DB_DIALECT ? "postgres" : "postgres", seederStorage: "sequelize" });
