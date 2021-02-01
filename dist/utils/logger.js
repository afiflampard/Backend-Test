"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const morgan_1 = __importDefault(require("morgan"));
const winstontLoggerOption = {
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.transports.File({
            filename: "./logs/all-logs.log",
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston_1.transports.Console(),
    ],
};
exports.logger = winston_1.createLogger(winstontLoggerOption);
exports.default = morgan_1.default("combined");
