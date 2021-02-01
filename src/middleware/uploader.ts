import multer from "multer";
import path from "path";

// upload file path
const FILE_PATH = "uploads";

const generateFileName = (file: Express.Multer.File): string => {
  const filename: string = file.originalname;
  const arrFilename = filename.split(".");
  return `file-${Date.now()}.${arrFilename[arrFilename.length - 1]}`;
};

const storageMachine = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/machines`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageForm = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/forms`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageFormImage = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/form-images`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageFloorReport = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/floor-report`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageIssueReport = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/issue-report`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageElearning = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/elearning`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageFundamentalLibrary = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/fundamental-library`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageAvatar = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/avatar`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

const storageProFile = multer.diskStorage({
  destination: path.normalize(`${FILE_PATH}/pro-files`),
  filename: (req, file, cb) => {
    const filename = generateFileName(file);
    cb(null, filename);
  }
});

export const upload = {
  uploadMachine: multer({storage: storageMachine}),
  uploadForm: multer({storage: storageForm}),
  uploadFormImage: multer({storage: storageFormImage}),
  uploadFloorReport: multer( {storage: storageFloorReport}),
  uploadIssueReport: multer( {storage: storageIssueReport}),
  uploadElearning: multer( {storage: storageElearning}),
  uploadFundamentalLibrary: multer({storage: storageFundamentalLibrary}),
  updateAvatar: multer({storage: storageAvatar}),
  uploadProFile: multer({storage: storageProFile}),
};
