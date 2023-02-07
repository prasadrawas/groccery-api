"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const connectToMongo = (isLocal) => {
    mongoose_1.default.set('strictQuery', false);
    if (isLocal) {
        mongoose_1.default
            .connect(`${process.env.MONGO_LOCAL_URL}`)
            .then(() => console.log('Database connection Success'))
            .catch((err) => console.log('Database connected Failed: ' + err.message));
    }
    else {
        mongoose_1.default
            .connect(`${process.env.MONGO_CLOUD_URL}`)
            .then(() => console.log('Database connection Success'))
            .catch((err) => console.log('Database connected Failed: ' + err.message));
    }
};
exports.default = connectToMongo;
