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
const category_controller_1 = __importDefault(require("../../data/controllers/category-controller"));
//Creating Router instance
const categoryRouter = express_1.default.Router();
//Creating controller instance
const controller = tsyringe_1.container.resolve(category_controller_1.default);
//GET: Get all categoryes of specific user
categoryRouter.get('/', auth_middleware_1.default, (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getAllCategories(response);
}));
//GET: Get categoryes by categoryId
categoryRouter.get('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getCategoryById(request.params.id, response);
}));
//POST: Add new category
categoryRouter.post('/', auth_middleware_1.default, image_middleware_1.default.single('image'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = request.body;
    const image = request.file;
    yield controller.createCategory(payload, image, response);
}));
//PUT: Update category into database
categoryRouter.put('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, image_middleware_1.default.single('image'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const data = request.body;
    const image = request.file;
    yield controller.updateCategoryById(id, data, image, response);
}));
//DELETE: Delete a specific category
categoryRouter.delete('/:id', auth_middleware_1.default, objectid_middleware_ts_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield controller.deleteCategoryById(id, response);
}));
exports.default = categoryRouter;
