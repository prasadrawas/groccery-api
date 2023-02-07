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
const Cloudinary_1 = require("../../common/cloudinary/Cloudinary");
const ImageNotFoundException_1 = __importDefault(require("../../common/exceptions/ImageNotFoundException"));
const NotFoundException_1 = __importDefault(require("../../common/exceptions/NotFoundException"));
const ValidationException_1 = __importDefault(require("../../common/exceptions/ValidationException"));
const category_model_1 = __importDefault(require("../../domain/models/category-model"));
const category_validator_1 = __importDefault(require("../../domain/validators/category-validator"));
class CategoryRepository {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.find();
            if (!category)
                throw new NotFoundException_1.default('Category list not found');
            return category;
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findById(id);
            if (!category)
                throw new NotFoundException_1.default('Category not found');
            return category;
        });
    }
    createCategory(data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Cloudinary_1.Cloudinary.instance.uploadImage((file === null || file === void 0 ? void 0 : file.path) || '');
            if (result.status === 200) {
                data.image = result.url;
                const { error } = category_validator_1.default.validate(data);
                if (error) {
                    throw new ValidationException_1.default(error.details[0].message);
                }
                const category = new category_model_1.default(data);
                return yield category.save();
            }
            else {
                throw new ImageNotFoundException_1.default(result.message);
            }
        });
    }
    deleteCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findByIdAndDelete(id);
            if (!category)
                throw new NotFoundException_1.default('Category not found');
            return category;
        });
    }
    updateCategoryById(id, data, image) {
        return __awaiter(this, void 0, void 0, function* () {
            //finding category
            const result = yield category_model_1.default.findById(id);
            if (!result) {
                throw new NotFoundException_1.default('Category not found');
            }
            if (!image) {
                data.image = result.image;
                const { error } = category_validator_1.default.validate(data);
                if (error) {
                    throw new ValidationException_1.default(error.details[0].message);
                }
                return yield category_model_1.default.findByIdAndUpdate(id, data, {
                    new: true,
                });
            }
            else {
                //Uploading image to cloudinary
                const result = yield Cloudinary_1.Cloudinary.instance.uploadImage((image === null || image === void 0 ? void 0 : image.path) || '');
                if (result.status === 200) {
                    data.image = result.url;
                    const { error } = category_validator_1.default.validate(data);
                    if (error) {
                        throw new ValidationException_1.default(error.details[0].message);
                    }
                    return yield category_model_1.default.findByIdAndUpdate(id, data, {
                        new: true,
                    });
                }
                else {
                    throw new ImageNotFoundException_1.default(result.message);
                }
            }
        });
    }
}
exports.default = CategoryRepository;
