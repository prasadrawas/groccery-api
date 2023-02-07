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
exports.handleRequest = void 0;
const NotFoundException_1 = __importDefault(require("../exceptions/NotFoundException"));
const ImageNotFoundException_1 = __importDefault(require("../exceptions/ImageNotFoundException"));
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const responses_1 = require("./responses");
const handleRequest = (promise, response, successMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield promise;
        return response
            .status(200)
            .send((0, responses_1.SendSuccessResponse)(result, successMessage));
    }
    catch (error) {
        switch (true) {
            case error instanceof NotFoundException_1.default:
                return response.status(404).send((0, responses_1.SendErrorResponse)(`${error.message}`));
            case error instanceof ImageNotFoundException_1.default:
                return response.status(422).send((0, responses_1.SendErrorResponse)(`${error.message}`));
            case error instanceof ValidationException_1.default:
                return response.status(422).send((0, responses_1.SendErrorResponse)(`${error.message}`));
            default:
                return response.status(501).send((0, responses_1.SendErrorResponse)(`Error: ${error}`));
        }
    }
});
exports.handleRequest = handleRequest;
