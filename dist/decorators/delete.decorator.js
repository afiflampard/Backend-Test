"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const utils_1 = require("../utils");
exports.Delete = (properties, payload, middlewares = []) => {
    const isIndependentRoute = typeof properties.isIndependentRoute == "undefined" ? false : properties.isIndependentRoute;
    return (target, propertyKey) => {
        if (typeof properties.tag == "undefined") {
            properties.tag = target.constructor.name;
        }
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        const routes = Reflect.getMetadata("routes", target.constructor);
        const apiDoc = utils_1.GenerateApiDoc(Object.assign(Object.assign({}, properties), { method: "delete" }), [], payload);
        routes.push({
            requestMethod: "delete",
            path: properties.path,
            methodName: propertyKey,
            apiDoc,
            middlewares,
            isIndependentRoute
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
};
