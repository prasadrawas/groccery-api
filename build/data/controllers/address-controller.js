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
const address_repository_1 = __importDefault(require("../repositories/address-repository"));
let AddressController = class AddressController {
    constructor(repository) {
        this._repository = repository;
    }
    getAllAddressesByUid(userId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, request_handler_1.handleRequest)(this._repository.getAllAddressesByUid(userId), response);
        });
    }
    getAddressById(addressId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, request_handler_1.handleRequest)(this._repository.getAddressById(addressId), response);
        });
    }
    createAddress(data, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, request_handler_1.handleRequest)(this._repository.createAddress(data), response, 'Address created successfully.');
        });
    }
    deleteAddressById(addressId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, request_handler_1.handleRequest)(this._repository.deleteAddressById(addressId), response, 'Address deleted successfully.');
        });
    }
    updateAddressById(addressId, data, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, request_handler_1.handleRequest)(this._repository.updateAddressById(addressId, data), response, 'Address updated successfully.');
        });
    }
};
AddressController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [address_repository_1.default])
], AddressController);
exports.default = AddressController;
