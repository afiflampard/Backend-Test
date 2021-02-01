"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const generateHelper_1 = require("./generateHelper");
const argv = yargs_1.default
    .option("name", {
    alias: "n",
    description: "Set the name of th seeder",
    type: "string",
})
    .help()
    .alias("help", "h").argv;
let fileName = "seeder-file";
if (argv.name) {
    fileName = argv.name;
}
else {
    console.error("name notfound");
}
const contentToWrite = [
    "import { QueryInterface } from \"sequelize\";",
    "",
    "// eslint-disable-next-line @typescript-eslint/ban-types",
    "export const up = async (query: QueryInterface): Promise<object | number> => {",
    "	try {",
    "		/**",
    "		 * code will execute to seeder process",
    "		 */",
    "		return Promise.resolve({});",
    "	} catch (error) {",
    "		return Promise.reject(error);",
    "	}",
    "};",
    "",
    "// eslint-disable-next-line @typescript-eslint/ban-types",
    "export const down = async (query: QueryInterface): Promise<object | number> => {",
    "	try {",
    "		/**",
    "		 * code will execute on revert seeder",
    "		 */",
    "		return Promise.resolve({});",
    "	} catch (error) {",
    "		return Promise.reject(error);",
    "	}",
    "};",
    "",
];
generateHelper_1.generateFile("./src/seeders/", fileName, contentToWrite);
