"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendToaFile = exports.generateFileWithoutTs = exports.generateFile = void 0;
const fs_1 = require("fs");
const moment_1 = __importDefault(require("moment"));
const fileNameGenerator = (nameArgs) => {
    return `${moment_1.default().format("YYYYMMDDHHmmssSS")}-${nameArgs}.ts`;
};
exports.generateFile = (fileDestination, nameArgs, content) => {
    const filesGenerated = fileNameGenerator(nameArgs);
    fs_1.writeFileSync(`${fileDestination + filesGenerated}`, content.join("\n"));
    console.log(`file ${filesGenerated} successfully generated at ${fileDestination}`);
};
exports.generateFileWithoutTs = (fileDestination, nameArgs, content) => {
    fs_1.writeFileSync(`${fileDestination + nameArgs}`, content.join("\n"));
    console.log(`file ${nameArgs} successfully generated at ${fileDestination}`);
};
exports.appendToaFile = (fileTarget, content) => {
    fs_1.appendFileSync(fileTarget, content);
    console.log(`file ${fileTarget} succeefully append`);
};
