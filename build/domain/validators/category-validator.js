"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const CategoryValidator = joi_1.default.object({
    title: joi_1.default.string().min(3).max(255).required(),
    image: joi_1.default.string().trim().uri().required(),
    createdAt: joi_1.default.date(),
    modifiedAt: joi_1.default.date(),
});
exports.default = CategoryValidator;
