"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: 4,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        dropDups: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        trim: true,
        required: true,
    },
    userType: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
    },
    phone: {
        type: String,
        trim: true,
        length: 10,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
