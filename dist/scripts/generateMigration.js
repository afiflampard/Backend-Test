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
    description: "Set the name of th migration",
    type: "string",
})
    .help()
    .alias("help", "h").argv;
let fileName = "migration-file";
if (argv.name) {
    fileName = argv.name;
}
const contentToWrite = [
    "import { QueryInterface, DataTypes } from \"sequelize\";",
    "",
    "export const up = async (query: QueryInterface): Promise<void> => {",
    "	try {",
    "		/**",
    "		 * code for migration to run",
    "		 */",
    "		return query.createTable(Model.tableName, {",
    "			id: {",
    "				type: DataTypes.INTEGER,",
    "				primaryKey: true,",
    "				allowNull: false,",
    "				autoIncrement: true,",
    "			},",
    "			createdAt: {",
    "				type: DataTypes.DATE,",
    "			},",
    "			updatedAt: {",
    "				type: DataTypes.DATE,",
    "			},",
    "		});",
    "	} catch (error) {",
    "		return Promise.reject(error);",
    "	}",
    "};",
    "",
    "export const down = async (query: QueryInterface): Promise<void> => {",
    "	try {",
    "		/**",
    "		 * code wher migration revert to run",
    "		 */",
    "	} catch (error) {",
    "		return Promise.reject(error);",
    "	}",
    "};",
    "",
];
generateHelper_1.generateFile("./src/migrations/", fileName, contentToWrite);
