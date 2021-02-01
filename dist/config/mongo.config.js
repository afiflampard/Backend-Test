"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.production = exports.local = exports.development = void 0;
const utils_1 = require("../utils");
const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME, } = utils_1.envConfig;
const config = {
    "local": {
        "username": "mongo",
        "password": "laniuslab",
        "database": "dummy",
        "host": "192.168.100.71",
        "port": "27017"
    },
    "test": {
        "username": "mongo",
        "password": "laniuslab",
        "database": "dummy",
        "host": "192.168.100.71",
        "port": "27017"
    },
    "production": {
        "username": "lanius",
        "password": "12345",
        "database": "boilerplate",
        "host": "dryblend-mongo",
        "port": "27017"
    }
};
exports.development = {
    username: MONGO_DB_USERNAME,
    password: MONGO_DB_PASSWORD,
    host: MONGO_DB_HOST,
    port: +MONGO_DB_PORT,
    database: MONGO_DB_NAME,
};
exports.local = config.local;
exports.production = config.production;
exports.test = config.test;
