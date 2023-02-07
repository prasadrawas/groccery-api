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
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const Cloudinary_1 = require("../../common/cloudinary/Cloudinary");
const ImageNotFoundException_1 = __importDefault(require("../../common/exceptions/ImageNotFoundException"));
const NotFoundException_1 = __importDefault(require("../../common/exceptions/NotFoundException"));
const ValidationException_1 = __importDefault(require("../../common/exceptions/ValidationException"));
const product_model_1 = __importDefault(require("../../domain/models/product-model"));
const product_validator_1 = __importDefault(require("../../domain/validators/product-validator"));
let ProductRepository = class ProductRepository {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const product = product_model_1.default.find();
            if (!product)
                throw new NotFoundException_1.default('product list not found');
            return product;
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = product_model_1.default.findById(id);
            if (!product)
                throw new NotFoundException_1.default('product list not found');
            return product;
        });
    }
    createProduct(data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Cloudinary_1.Cloudinary.instance.uploadImage((file === null || file === void 0 ? void 0 : file.path) || '');
            if (result.status === 200) {
                data.image = result.url;
                const { error } = product_validator_1.default.validate(data);
                if (error) {
                    throw new ValidationException_1.default(error.details[0].message);
                }
                return new product_model_1.default(data).save();
            }
            else {
                throw new ImageNotFoundException_1.default(result.message);
            }
        });
    }
    updateProductById(id, data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            //find product
            const product = yield product_model_1.default.findById(id);
            if (!product) {
                throw new NotFoundException_1.default('Product not found');
            }
            //validating category id
            if (!(0, mongoose_1.isValidObjectId)(data.category)) {
                throw new ValidationException_1.default('Category ID is not valid');
            }
            if (!file) {
                data.image = product.image;
                const { error } = product_validator_1.default.validate(data);
                if (error) {
                    throw new ValidationException_1.default(error.details[0].message);
                }
                return yield product_model_1.default.findByIdAndUpdate(id, data, { new: true });
            }
            else {
                //uploading image to cloudinary
                const result = yield Cloudinary_1.Cloudinary.instance.uploadImage((file === null || file === void 0 ? void 0 : file.path) || '');
                if (result.status === 200) {
                    data.image = result.url;
                    //validating product data
                    const { error } = product_validator_1.default.validate(data);
                    if (error) {
                        throw new ValidationException_1.default(error.details[0].message);
                    }
                    return yield product_model_1.default.findByIdAndUpdate(id, data, { new: true });
                }
                else {
                    throw new ImageNotFoundException_1.default(result.message);
                }
            }
        });
    }
    deleteProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findByIdAndDelete(productId);
            if (!product)
                throw new NotFoundException_1.default('product not found');
            return product;
        });
    }
    getProductsByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.find({ category: categoryId });
            if (!product)
                throw new NotFoundException_1.default('products not found');
            return product;
        });
    }
    getHotProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.find().limit(10);
            if (!product)
                throw new NotFoundException_1.default('products not found');
            return product;
        });
    }
};
ProductRepository = __decorate([
    (0, tsyringe_1.autoInjectable)()
], ProductRepository);
exports.default = ProductRepository;
