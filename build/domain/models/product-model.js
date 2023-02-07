"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product = mongoose_1.default.model('Product', new mongoose_1.default.Schema({
    title: {
        type: String,
        minlength: 4,
        trim: true,
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        trim: true,
        required: true,
    },
    brand: {
        type: String,
        minlength: 4,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    weight: {
        type: String,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    retailPrice: {
        type: Number,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4,
    },
    reviews: {
        type: Number,
        min: 0,
        default: 0,
    },
    stock: {
        type: Number,
        min: 0,
        default: 10,
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
exports.default = Product;
