"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImageNotFoundException';
    }
}
exports.default = ImageNotFoundException;
