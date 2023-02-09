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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
require('dotenv').config();
class Cloudinary {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });
    }
    static get instance() {
        if (!Cloudinary.object) {
            Cloudinary.object = new Cloudinary();
        }
        return Cloudinary.object;
    }
    uploadImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cloudinaryImageUploadResponseData = yield cloudinary_1.v2.uploader.upload(image, {
                    folder: 'images',
                });
                const { url } = cloudinaryImageUploadResponseData;
                if (!url) {
                    return {
                        message: "Couldn't upload your image at the moment. Please try again later.",
                        status: 400,
                    };
                }
                return {
                    message: 'Successfully uploaded image.',
                    status: 200,
                    url: url,
                };
            }
            catch (error) {
                return {
                    message: 'Internal Server Error',
                    status: 500,
                };
            }
        });
    }
}
exports.Cloudinary = Cloudinary;
