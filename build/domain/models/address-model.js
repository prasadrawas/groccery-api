"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Address = mongoose_1.default.model('Address', new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
        min: 4,
        max: 50,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        length: 10,
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
        length: 6,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        trim: true,
    },
    house: {
        type: String,
        required: true,
        min: 5,
        max: 20,
        trim: true,
    },
    area: {
        type: String,
        required: true,
        min: 5,
        max: 20,
        trim: true,
    },
}));
exports.default = Address;
