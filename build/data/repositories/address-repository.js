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
const address_model_1 = __importDefault(require("../../domain/models/address-model"));
const address_validator_1 = __importDefault(require("../../domain/validators/address-validator"));
let AddressRepository = class AddressRepository {
    getAllAddressesByUid(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield address_model_1.default.find({ userId: userId });
            if (!address)
                throw new NotFoundException_1.default('No address list found for the user');
            return address;
        });
    }
    getAddressById(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield address_model_1.default.findById(addressId);
            if (!address)
                throw new NotFoundException_1.default('Address not found');
            return address;
        });
    }
    createAddress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = address_validator_1.default.validate(data);
            if (error) {
                throw new ValidationException_1.default(error.details[0].message);
            }
            return yield new address_model_1.default(data).save();
        });
    }
    deleteAddressById(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield address_model_1.default.findByIdAndDelete(addressId);
            if (!address)
                throw new NotFoundException_1.default('Address not found');
            return address;
        });
    }
    updateAddressById(addressId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield address_model_1.default.findByIdAndUpdate(addressId, data, {
                new: true,
            });
            if (!address)
                throw new NotFoundException_1.default('Address not found');
            return address;
        });
    }
};
AddressRepository = __decorate([
    (0, tsyringe_1.autoInjectable)()
], AddressRepository);
exports.default = AddressRepository;
