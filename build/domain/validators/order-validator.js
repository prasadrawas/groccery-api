"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const OrderValidator = joi_1.default.object({
    quantity: joi_1.default.number().min(1).max(255).required(),
    expectedDelivery: joi_1.default.date(),
    totalPrice: joi_1.default.number().min(1).max(5000).required(),
    deliveryStatus: joi_1.default.string().trim().required(),
});
exports.default = OrderValidator;
