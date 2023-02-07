"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Order = mongoose_1.default.model('Order', new mongoose_1.default.Schema({
    user: {
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
    expectedDelivery: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 3),
    },
    totalPrice: {
        type: Number,
        default: 1,
        min: 1,
        max: 5000,
    },
    deliveryStatus: {
        type: String,
        enum: ['Preparing', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Preparing',
    },
    address: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
}));
exports.default = Order;
