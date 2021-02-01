"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./models"));
const controllers_1 = __importDefault(require("./controllers"));
dotenv_1.default.config();
const { app } = new app_1.default({
    controllers: controllers_1.default,
    middleWares: [
        body_parser_1.default.json({ limit: "5mb" }),
        body_parser_1.default.urlencoded({ extended: true }),
        cors_1.default(),
        morgan_1.default("combined"),
    ]
});
const PORT = +(process.env.PORT || 4000);
app.listen(PORT, "0.0.0.0", () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.default();
    console.log(`[LISTEN] 🚀🚀🚀  starting http://localhost:${PORT}/api/v1`);
}));
