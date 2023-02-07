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
const reviews_controller_1 = __importDefault(require("../../data/controllers/reviews-controller"));
//Creating Router instance
const addressRouter = express_1.default.Router();
//Creating controller instance
const controller = tsyringe_1.container.resolve(reviews_controller_1.default);
//GET: Get a review by review id
addressRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.get(request.params.id, response);
}));
//POST: Add new address
addressRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    yield controller.add(data, response);
}));
//PUT: Update address into database
addressRouter.put('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const data = request.body;
    yield controller.update(id, data, response);
}));
//DELETE: Delete a specific address
addressRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield controller.delete(id, response);
}));
exports.default = addressRouter;
