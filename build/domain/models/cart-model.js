"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Cart = mongoose_1.default.model('Cart', new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
        max: 255,
    },
}));
exports.default = Cart;
