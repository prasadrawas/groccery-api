"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationValidator = exports.userLoginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userLoginValidator = joi_1.default.object({
    email: joi_1.default.string().trim().email().required(),
    password: joi_1.default.string().trim().min(5).max(255).required(),
});
exports.UserRegistrationValidator = joi_1.default.object({
    name: joi_1.default.string().trim().min(4).max(100).required(),
    email: joi_1.default.string().trim().email().required(),
    phone: joi_1.default.string().trim().required(),
    password: joi_1.default.string().trim().min(5).max(255).required(),
    userType: joi_1.default.string(),
});
