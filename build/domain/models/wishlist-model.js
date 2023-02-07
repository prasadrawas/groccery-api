"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Wishlist = mongoose_1.default.model('Wishlist', new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}));
exports.default = Wishlist;
