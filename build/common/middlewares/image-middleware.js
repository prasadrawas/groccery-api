"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multerStorage = multer_1.default.diskStorage({
// destination: (_request, _file, callback) => {
//   callback(null, __dirname);
// },
// filename: (_request, file, callback) => {
//   callback(null, file.originalname);
// },
});
const upload = (0, multer_1.default)({ storage: multerStorage });
exports.default = upload;
