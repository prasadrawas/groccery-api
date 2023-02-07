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
const NotFoundException_1 = __importDefault(require("../../common/exceptions/NotFoundException"));
const review_model_1 = __importDefault(require("../../domain/models/review-model"));
class ReviewsRepository {
    getAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield review_model_1.default.find({ product: id });
            if (!review)
                throw new NotFoundException_1.default('Reviews not found for this product');
            return review;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield review_model_1.default.findById(id);
            if (!review)
                throw new NotFoundException_1.default('Review not found');
            return review;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new review_model_1.default(data).save();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield review_model_1.default.findByIdAndDelete(id);
            if (!review)
                throw new NotFoundException_1.default('Review not found');
            return review;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield review_model_1.default.findByIdAndUpdate(id, data);
            if (!review)
                throw new NotFoundException_1.default('Review not found');
            return review;
        });
    }
}
exports.default = ReviewsRepository;
