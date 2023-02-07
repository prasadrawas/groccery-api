"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const AddressValidator = joi_1.default.object({
    userId: joi_1.default.string().trim().required(),
    fullName: joi_1.default.string().trim().min(4).max(30).required(),
    phone: joi_1.default.string().trim().length(10).trim().required(),
    pincode: joi_1.default.string().trim().length(6).required(),
    city: joi_1.default.string().trim().min(3).max(20).required(),
    house: joi_1.default.string().trim().min(5).max(20).required(),
    area: joi_1.default.string().trim().min(5).max(20).required(),
});
exports.default = AddressValidator;
