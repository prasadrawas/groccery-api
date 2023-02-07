"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const request_handler_1 = require("../../common/helpers/request-handler");
const order_repository_1 = __importDefault(require("../repositories/order-repository"));
let OrdersController = class OrdersController {
    constructor(repository) {
        this._repository = repository;
    }
    getAllOrdersByUid(userId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, request_handler_1.handleRequest)(this._repository.getAllOrdersByUid(userId), response);
        });
    }
    getOrderById(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, request_handler_1.handleRequest)(this._repository.getOrderById(id), response);
        });
    }
    createOrder(data, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, request_handler_1.handleRequest)(this._repository.createOrder(data), response, 'Order created successfully.');
        });
    }
    deleteOrderById(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, request_handler_1.handleRequest)(this._repository.deleteOrderById(id), response, 'Order deleted successfully.');
        });
    }
    updateOrderById(id, data, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, request_handler_1.handleRequest)(this._repository.updateOrderById(id, data), response, 'Order updated successfully.');
        });
    }
};
OrdersController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [order_repository_1.default])
], OrdersController);
exports.default = OrdersController;
