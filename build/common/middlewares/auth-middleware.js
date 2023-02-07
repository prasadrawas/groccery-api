"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responses_1 = require("../helpers/responses");
require('dotenv').config();
const auth = (request, response, next) => {
    next();
    return;
    const token = request.header('x-token');
    if (!token)
        return response
            .status(401)
            .send((0, responses_1.SendErrorResponse)('Authorization token required'));
    try {
        const payload = jsonwebtoken_1.default.verify(token, `${process.env.JWT_PRIVATE_KEY}`);
        request.payload = payload;
        next();
    }
    catch (e) {
        return response
            .status(403)
            .send((0, responses_1.SendErrorResponse)('Invalid authorization token'));
    }
};
exports.default = auth;
