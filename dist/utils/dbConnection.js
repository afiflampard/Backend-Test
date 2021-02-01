"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize_postgres = exports.mongoose_mongo_url = void 0;
const sequelize_1 = require("sequelize");
const postgres_config_1 = require("../config/postgres.config");
const mongo_config_1 = require("../config/mongo.config");
const envConfig_1 = require("./envConfig");
let psqlConfig, mongoConfig;
switch (envConfig_1.envConfig.NODE_ENV) {
    case "development":
        psqlConfig = postgres_config_1.development;
        mongoConfig = mongo_config_1.development;
        break;
    case "local":
        psqlConfig = postgres_config_1.local;
        mongoConfig = mongo_config_1.local;
        break;
    case "test":
        psqlConfig = postgres_config_1.test;
        mongoConfig = mongo_config_1.test;
        break;
    case "production":
        psqlConfig = postgres_config_1.production;
        mongoConfig = mongo_config_1.production;
        break;
}
const mongo_credential = {
    username: mongoConfig.username,
    password: mongoConfig.password,
    database: mongoConfig.database,
    host: mongoConfig.host,
    port: mongoConfig.port
};
const mongoose_mongo_url = `mongodb+srv://${mongo_credential.username}:${mongo_credential.password}@cluster0.kwkk2.mongodb.net/${mongo_credential.database}?retryWrites=true&w=majority`;
exports.mongoose_mongo_url = mongoose_mongo_url;
const sequelize_postgres = new sequelize_1.Sequelize(psqlConfig.database, psqlConfig.username, psqlConfig.password, {
    dialect: "postgres",
    host: psqlConfig.host,
    port: psqlConfig.port
});
exports.sequelize_postgres = sequelize_postgres;
