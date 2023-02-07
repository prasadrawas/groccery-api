"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Review = mongoose_1.default.model('Review', new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User',
    },
    message: {
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
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}));
exports.default = Review;
