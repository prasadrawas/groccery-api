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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const auth_middleware_1 = __importDefault(require("../../common/middlewares/auth-middleware"));
const objectid_middleware_ts_1 = __importDefault(require("../../common/middlewares/objectid-middleware.ts"));
const cart_controller_1 = __importDefault(require("../../data/controllers/cart-controller"));
//Creating Router instance
const cartRouter = express_1.default.Router();
//Creating controller instance
const controller = tsyringe_1.container.resolve(cart_controller_1.default);
//GET: Get all cart items of specific user
cartRouter.get('/', auth_middleware_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = request.payload;
    yield controller.getAllCartItemsByUid(_id, response);
}));
//GET: Get cart item by cartId
cartRouter.get('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getCartItemById(request.params.id, response);
}));
//POST: Add new cart item
cartRouter.post('/', auth_middleware_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = request.payload;
    const data = request.body;
    data.userId = _id;
    yield controller.createCartItem(data, response);
}));
//PUT: Update cart item into database
cartRouter.patch('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = request.payload;
    const id = request.params.id;
    const data = request.body;
    data.userId = _id;
    yield controller.updateCartItemById(id, data, response);
}));
//DELETE: Delete a specific cart item
cartRouter.delete('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield controller.deleteCartItemById(id, response);
}));
exports.default = cartRouter;
