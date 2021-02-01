import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { RouteDefinition } from "./interfaces/RouteDefinition.interface";
import { asyncHandler } from "./utils";
import { apiDoc } from "./utils/generateApiDoc";
import { swaggerSchemas } from "./models";
import path from "path";

class App {
  public app: Application

  constructor(appInit: { middleWares: any; controllers?: any }) {
    this.app = express();
    const schemas = swaggerSchemas;
    for (const schema of schemas) {
      const routeSchemas = Object.keys(schema);
      for (const currentSchema of routeSchemas) {
        if (typeof apiDoc.components.schemas[currentSchema] == "undefined") {
          apiDoc.components.schemas[currentSchema] = schema[currentSchema];
        }
      }
    }
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {

    const convertPathToSwagger = (path: string): string => {
      const arrayPaths = path.split("/");
      if (arrayPaths.length <= 0) return path;
      const processedPath = arrayPaths.map((x: string) => {
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
      const routes: Array<RouteDefinition> = Reflect.getMetadata("routes", controller);
      routes.forEach((route) => {
        let currentPaths = `${prefix}${route.path}`;
        if (route.isIndependentRoute) {
          currentPaths = route.path;
        }
        this.app[route.requestMethod](`/api/v1${currentPaths}`, route.middlewares, asyncHandler((req: express.Request, res: express.Response) => {
          instance[route.methodName](req, res);
        }));
        const paths = route.apiDoc.paths;
        const routePaths = Object.keys(paths);

        for (const path of routePaths) {
          const currentPath = convertPathToSwagger(currentPaths);
          if (typeof apiDoc.paths[currentPath] == "undefined") {
            apiDoc.paths[currentPath] = paths[path];
          } else {
            const httpMethodKeys = Object.keys(paths[path]); 
            for (const httpMethod of httpMethodKeys) {
              if (typeof apiDoc.paths[currentPath][httpMethod] != "undefined") {
                console.error(`There are duplicate route with base route '${currentPaths}' on Method [${httpMethod.toUpperCase()}] ${controller.name}`);
              }
            }
            apiDoc.paths[currentPath] = { ...apiDoc.paths[currentPath], ...paths[path] };
          }
        }
      });
    });

    this.app.use("/explorer", swaggerUi.serve, swaggerUi.setup(apiDoc));
    this.app.use(express.static("assets"));
    this.app.use("/upload-dirs", express.static(path.normalize(`${__dirname}/../uploads`)));

    this.app.use("*", async (req: Request, res: Response) => {
      res.status(404).json({
        message: "sorry bos, alamat yang anda tuju tidak terdaftar"
      });
    });
  }
}

export default App;
