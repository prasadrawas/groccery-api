"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_route_1 = __importDefault(require("./address-route"));
const auth_route_1 = __importDefault(require("./auth-route"));
const cart_route_1 = __importDefault(require("./cart-route"));
const category_route_1 = __importDefault(require("./category-route"));
const orders_route_1 = __importDefault(require("./orders-route"));
const products_route_1 = __importDefault(require("./products-route"));
const wishlist_route_1 = __importDefault(require("./wishlist-route"));
//Creating router instance
const router = express_1.default.Router();
router.use('/api/auth', auth_route_1.default);
router.use('/api/category', category_route_1.default);
router.use('/api/products', products_route_1.default);
router.use('/api/cart', cart_route_1.default);
router.use('/api/wishlist', wishlist_route_1.default);
router.use('/api/address', address_route_1.default);
router.use('/api/orders', orders_route_1.default);
exports.default = router;
