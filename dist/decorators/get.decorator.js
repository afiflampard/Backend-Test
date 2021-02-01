"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const utils_1 = require("../utils");
exports.Get = (properties, payload, middlewares = []) => {
    const isIndependentRoute = typeof properties.isIndependentRoute == "undefined" ? false : properties.isIndependentRoute;
    return (target, propertyKey) => {
        if (typeof properties.tag == "undefined") {
            properties.tag = target.constructor.name;
        }
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        const routes = Reflect.getMetadata("routes", target.constructor);
        const apiDoc = utils_1.GenerateApiDoc(Object.assign(Object.assign({}, properties), { method: "get" }), [], payload);
        routes.push({
            requestMethod: "get",
            path: properties.path,
            methodName: propertyKey,
            apiDoc,
            middlewares,
            isIndependentRoute
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
};
