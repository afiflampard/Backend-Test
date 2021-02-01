"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.compressImage = void 0;
const Jimp = __importStar(require("jimp"));
const utils_1 = require("../utils");
const Exif = require("exif").ExifImage;
const fs = __importStar(require("fs"));
exports.compressImage = (directory) => {
    return utils_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const filename = req.file.filename;
        const mime = filename.split(".");
        if (mime[1].toLowerCase() === "jpg" || mime[1].toLowerCase() === "jpeg" || mime[1].toLowerCase() === "png") {
            const img = yield Jimp.read(directory + filename);
            yield img.quality(50);
            const exifImage = new Exif({ image: directory + filename }, (error, exifData) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    yield img.write(directory + filename);
                    if (yield fs.existsSync(directory + filename)) {
                        next();
                    }
                    else {
                        if (yield fs.existsSync(directory + filename)) {
                            next();
                        }
                        else {
                            return next(new utils_1.ErrorResponse("Upload was failed. Please try again", 400));
                        }
                    }
                }
                else {
                    if (exifData.image.Orientation) {
                        const orientation = exifData.image.Orientation;
                        if (orientation == 2) {
                            yield img.flip(true, false);
                        }
                        else if (orientation == 3) {
                            yield img.rotate(-180);
                        }
                        else if (orientation == 4) {
                            yield img.flip(false, true);
                        }
                        else if (orientation == 5) {
                            yield img.flip(true, false);
                            yield img.rotate(270);
                        }
                        else if (orientation == 6) {
                            yield img.rotate(90);
                        }
                        else if (orientation == 7) {
                            yield img.rotate(90);
                            yield img.flip(true, false);
                        }
                        else if (orientation == 8) {
                            yield img.rotate(270);
                        }
                        yield img.write(directory + filename);
                        if (yield fs.existsSync(directory + filename)) {
                            next();
                        }
                        else {
                            if (yield fs.existsSync(directory + filename)) {
                                next();
                            }
                            else {
                                return next(new utils_1.ErrorResponse("Upload was failed. Please try again", 400));
                            }
                        }
                    }
                    else {
                        yield img.write(directory + filename);
                        if (yield fs.existsSync(directory + filename)) {
                            next();
                        }
                        else {
                            if (yield fs.existsSync(directory + filename)) {
                                next();
                            }
                            else {
                                return next(new utils_1.ErrorResponse("Upload was failed. Please try again", 400));
                            }
                        }
                    }
                }
            }));
        }
        req.file.filename = filename;
        next();
    }));
};
