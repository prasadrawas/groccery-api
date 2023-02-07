"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundException_1 = __importDefault(require("../../common/exceptions/NotFoundException"));
const ValidationException_1 = __importDefault(require("../../common/exceptions/ValidationException"));
const cart_model_1 = __importDefault(require("../../domain/models/cart-model"));
const cart_validator_1 = __importDefault(require("../../domain/validators/cart-validator"));
class CartRepository {
    getAllCartItemsByUid(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.find({ userId: userId }).populate('product');
            if (!cart)
                throw new NotFoundException_1.default('No cart found for the user');
            return cart;
        });
    }
    getCartItemById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findById(cartId).populate('product');
            if (!cart)
                throw new NotFoundException_1.default('Cart item not found');
            return cart;
        });
    }
    createCartItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = cart_validator_1.default.validate(data);
            if (error) {
                throw new ValidationException_1.default(error.details[0].message);
            }
            return (yield new cart_model_1.default(data).save()).populate('product');
        });
    }
    deleteCartItemById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findByIdAndDelete(cartId).populate('product');
            if (!cart)
                throw new NotFoundException_1.default('Cart item not found');
            return cart;
        });
    }
    updateCartItemById(cartId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findByIdAndUpdate(cartId, data, {
                new: true,
            }).populate('product');
            if (!cart)
                throw new NotFoundException_1.default('Cart item not found');
            return cart;
        });
    }
}
exports.default = CartRepository;
