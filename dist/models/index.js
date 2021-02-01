"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose_mongo = exports.swaggerSchemas = void 0;
const dbConnection_1 = require("../utils/dbConnection");
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
let files = fs_1.default.readdirSync(`${__dirname}`);
files = files.filter((x) => {
    return !x.includes("index.") && !x.includes("mongo.model") && !x.includes(".map");
});
exports.swaggerSchemas = [];
const models = files.map((d) => {
    const fileName = `./${d}`.replace(".ts", "");
    const model = require(fileName);
    const schemas = model["swaggerSchemas"];
    if (typeof schemas != "undefined") {
        exports.swaggerSchemas = [...exports.swaggerSchemas, ...schemas];
    }
    return model["default"];
});
const mongoose_mongo = mongoose_1.default;
exports.mongoose_mongo = mongoose_mongo;
const modelInit = () => {
    mongoose_mongo.connect(dbConnection_1.mongoose_mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
    models.forEach((model) => {
        model.modelInit(dbConnection_1.sequelize_postgres);
    });
    models.forEach((model) => {
        model.setAssociation();
    });
};
exports.default = modelInit;
