"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const WishlistValidator = joi_1.default.object({
    userId: joi_1.default.string().trim().required(),
    product: joi_1.default.string().trim().required(),
    createdAt: joi_1.default.date(),
});
exports.default = WishlistValidator;
