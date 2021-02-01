"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let files = fs_1.default.readdirSync(`${__dirname}`);
files = files.filter((x) => {
    return !x.includes("index.") && !x.includes(".map");
});
const controllers = files.map((d) => {
    const fileName = `./${d}`.replace(".ts", "");
    const controller = require(fileName);
    return controller["default"];
});
exports.default = controllers;
