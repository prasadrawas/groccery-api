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
const auth_controller_1 = __importDefault(require("../../data/controllers/auth-controller"));
//Creating Router instance
const authRouter = express_1.default.Router();
//Creating controller instance
const controller = tsyringe_1.container.resolve(auth_controller_1.default);
//Login to server
authRouter.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    yield controller.login(email, password, response);
}));
//Register to server
authRouter.post('/register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password } = request.body;
    yield controller.register(name, email, phone, password, response);
}));
exports.default = authRouter;
