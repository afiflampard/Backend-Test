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
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletePlugin = void 0;
const softDeletePlugin = (schema) => {
    schema.add({
        deletedAt: {
            type: Date,
            default: null,
        },
    });
    const typesFindQueryMiddleware = [
        "count",
        "find",
        "findOne",
        "findOneAndDelete",
        "findOneAndRemove",
        "findOneAndUpdate",
        "update",
        "updateOne",
        "updateMany",
    ];
    const setDocumentIsDeleted = (doc) => __awaiter(void 0, void 0, void 0, function* () {
        doc.deletedAt = new Date();
        doc.$isDeleted(true);
        yield doc.save();
    });
    const excludeInFindQueriesIsDeleted = function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.where({ deletedAt: null });
            next();
        });
    };
    const excludeInDeletedInAggregateMiddleware = function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pipeline().unshift({ $match: { deletedAt: null } });
            next();
        });
    };
    schema.pre("remove", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield setDocumentIsDeleted(this);
            next();
        });
    });
    typesFindQueryMiddleware.forEach((type) => {
        schema.pre(type, excludeInFindQueriesIsDeleted);
    });
    schema.pre("aggregate", excludeInDeletedInAggregateMiddleware);
};
exports.softDeletePlugin = softDeletePlugin;
