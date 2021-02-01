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
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const utils_1 = require("./utils");
const generateApiDoc_1 = require("./utils/generateApiDoc");
const models_1 = require("./models");
const path_1 = __importDefault(require("path"));
class App {
    constructor(appInit) {
        this.app = express_1.default();
        const schemas = models_1.swaggerSchemas;
        for (const schema of schemas) {
            const routeSchemas = Object.keys(schema);
            for (const currentSchema of routeSchemas) {
                if (typeof generateApiDoc_1.apiDoc.components.schemas[currentSchema] == "undefined") {
                    generateApiDoc_1.apiDoc.components.schemas[currentSchema] = schema[currentSchema];
                }
            }
        }
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }
    middlewares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        const convertPathToSwagger = (path) => {
            const arrayPaths = path.split("/");
            if (arrayPaths.length <= 0)
                return path;
            const processedPath = arrayPaths.map((x) => {
                if (x.includes(":")) {
                    const tokenizedPath = x.replace(":", "");
                    x = `{${tokenizedPath}}`;
                }
                return x;
            });
            return processedPath.join("/");
        };
        controllers.forEach(controller => {
            const instance = new controller();
            const prefix = Reflect.getMetadata("prefix", controller);
            const routes = Reflect.getMetadata("routes", controller);
            routes.forEach((route) => {
                let currentPaths = `${prefix}${route.path}`;
                if (route.isIndependentRoute) {
                    currentPaths = route.path;
                }
                this.app[route.requestMethod](`/api/v1${currentPaths}`, route.middlewares, utils_1.asyncHandler((req, res) => {
                    instance[route.methodName](req, res);
                }));
                const paths = route.apiDoc.paths;
                const routePaths = Object.keys(paths);
                for (const path of routePaths) {
                    const currentPath = convertPathToSwagger(currentPaths);
                    if (typeof generateApiDoc_1.apiDoc.paths[currentPath] == "undefined") {
                        generateApiDoc_1.apiDoc.paths[currentPath] = paths[path];
                    }
                    else {
                        const httpMethodKeys = Object.keys(paths[path]);
                        for (const httpMethod of httpMethodKeys) {
                            if (typeof generateApiDoc_1.apiDoc.paths[currentPath][httpMethod] != "undefined") {
                                console.error(`There are duplicate route with base route '${currentPaths}' on Method [${httpMethod.toUpperCase()}] ${controller.name}`);
                            }
                        }
                        generateApiDoc_1.apiDoc.paths[currentPath] = Object.assign(Object.assign({}, generateApiDoc_1.apiDoc.paths[currentPath]), paths[path]);
                    }
                }
            });
        });
        this.app.use("/explorer", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(generateApiDoc_1.apiDoc));
        this.app.use(express_1.default.static("assets"));
        this.app.use("/upload-dirs", express_1.default.static(path_1.default.normalize(`${__dirname}/../uploads`)));
        this.app.use("*", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(404).json({
                message: "sorry bos, alamat yang anda tuju tidak terdaftar"
            });
        }));
    }
}
exports.default = App;
