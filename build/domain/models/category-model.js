"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Category = mongoose_1.default.model('Category', new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 255,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
}));
exports.default = Category;
