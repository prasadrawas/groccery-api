"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const tsyringe_1 = require("tsyringe");
const NotFoundException_1 = __importDefault(require("../../common/exceptions/NotFoundException"));
const ValidationException_1 = __importDefault(require("../../common/exceptions/ValidationException"));
const order_model_1 = __importDefault(require("../../domain/models/order-model"));
const order_validator_1 = __importDefault(require("../../domain/validators/order-validator"));
let OrderRepository = class OrderRepository {
    getAllOrdersByUid(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = order_model_1.default.find({ userId: userId });
            if (!order)
                throw new NotFoundException_1.default('Order list not found for the user');
            return order;
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = order_model_1.default.findById(id);
            if (!order)
                throw new NotFoundException_1.default('Order not found');
            return order;
        });
    }
    createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = order_validator_1.default.validate(data);
            if (error) {
                throw new ValidationException_1.default(error.details[0].message);
            }
            return yield new order_model_1.default(data).save();
        });
    }
    deleteOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = order_model_1.default.findByIdAndDelete(id);
            if (!order)
                throw new NotFoundException_1.default('Order not found');
            return order;
        });
    }
    updateOrderById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findByIdAndUpdate(id, data, { new: true });
            if (!order)
                throw new NotFoundException_1.default('Order not found');
            return order;
        });
    }
};
OrderRepository = __decorate([
    (0, tsyringe_1.autoInjectable)()
], OrderRepository);
exports.default = OrderRepository;
