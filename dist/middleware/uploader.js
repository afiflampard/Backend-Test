"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const FILE_PATH = "uploads";
const generateFileName = (file) => {
    const filename = file.originalname;
    const arrFilename = filename.split(".");
    return `file-${Date.now()}.${arrFilename[arrFilename.length - 1]}`;
};
const storageMachine = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/machines`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageForm = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/forms`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageFormImage = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/form-images`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageFloorReport = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/floor-report`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageIssueReport = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/issue-report`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageElearning = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/elearning`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageFundamentalLibrary = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/fundamental-library`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageAvatar = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/avatar`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
const storageProFile = multer_1.default.diskStorage({
    destination: path_1.default.normalize(`${FILE_PATH}/pro-files`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});
exports.upload = {
    uploadMachine: multer_1.default({ storage: storageMachine }),
    uploadForm: multer_1.default({ storage: storageForm }),
    uploadFormImage: multer_1.default({ storage: storageFormImage }),
    uploadFloorReport: multer_1.default({ storage: storageFloorReport }),
    uploadIssueReport: multer_1.default({ storage: storageIssueReport }),
    uploadElearning: multer_1.default({ storage: storageElearning }),
    uploadFundamentalLibrary: multer_1.default({ storage: storageFundamentalLibrary }),
    updateAvatar: multer_1.default({ storage: storageAvatar }),
    uploadProFile: multer_1.default({ storage: storageProFile }),
};
