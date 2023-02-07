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
const wishlist_model_1 = __importDefault(require("../../domain/models/wishlist-model"));
class WishlistRepository {
    getAllWishlistItemsByUid(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield wishlist_model_1.default.find({ userId: userId }).populate('product');
            if (!wishlist)
                throw new NotFoundException_1.default('Wishlist not found for this user');
            return wishlist;
        });
    }
    getWishlistItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield wishlist_model_1.default.findById(id).populate('product');
            if (!wishlist)
                throw new NotFoundException_1.default('Wishlist item not found');
            return wishlist;
        });
    }
    createWishlistItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield (yield new wishlist_model_1.default(data).save()).populate('product');
            if (!wishlist)
                throw new NotFoundException_1.default('Wishlist item not found');
            return wishlist;
        });
    }
    deleteWishlistItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield wishlist_model_1.default.findByIdAndDelete(id).populate('product');
            if (!wishlist)
                throw new NotFoundException_1.default('Wishlist item not found');
            return wishlist;
        });
    }
}
exports.default = WishlistRepository;
