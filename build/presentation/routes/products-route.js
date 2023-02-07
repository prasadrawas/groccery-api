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
const image_middleware_1 = __importDefault(require("../../common/middlewares/image-middleware"));
const objectid_middleware_ts_1 = __importDefault(require("../../common/middlewares/objectid-middleware.ts"));
const products_controller_1 = __importDefault(require("../../data/controllers/products-controller"));
//Creating Router instance
const productRouter = express_1.default.Router();
//Creating controller
const controller = tsyringe_1.container.resolve(products_controller_1.default);
//GET: Get all products
productRouter.get('/', auth_middleware_1.default, (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getAllProducts(response);
}));
//GET: Get hot products
productRouter.get('/hot', auth_middleware_1.default, (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getHotProducts(response);
}));
//GET: Get product by Product ID
productRouter.get('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getProductById(request.params.id, response);
}));
//POST: Add new product
productRouter.post('/', auth_middleware_1.default, image_middleware_1.default.single('image'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.createProduct(request.body, request.file, response);
}));
//PUT: Update a product
productRouter.put('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, image_middleware_1.default.single('image'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.updateProductById(request.params.id, request.body, request.file, response);
}));
//DELETE: Delete product by Product ID
productRouter.delete('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.deleteProductById(request.params.id, response);
}));
//GET: Get product list by Category ID
productRouter.get('/category/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getProductsByCategoryId(request.params.id, response);
}));
exports.default = productRouter;
