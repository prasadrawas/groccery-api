"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ProductValidator = joi_1.default.object({
    title: joi_1.default.string().trim().min(3).max(255).required(),
    category: joi_1.default.string().trim().min(3).max(255).required(),
    description: joi_1.default.string().trim().min(3).max(255).required(),
    brand: joi_1.default.string().trim().min(3).max(255).required(),
    image: joi_1.default.string().trim().uri().required(),
    weight: joi_1.default.string().trim().min(3).max(255).required(),
    salePrice: joi_1.default.number().min(1).max(1000).required(),
    retailPrice: joi_1.default.number().min(1).max(1000),
    rating: joi_1.default.number().min(0).max(5),
    reviews: joi_1.default.number().min(0),
    stock: joi_1.default.number().min(0),
    createdAt: joi_1.default.date(),
    modifiedAt: joi_1.default.date(),
});
exports.default = ProductValidator;
