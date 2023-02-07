"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const responses_1 = require("../helpers/responses");
const objectid = (request, response, next) => {
    const id = request.params.id;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return response.status(400).send(responses_1.invalidObjectId);
    }
    next();
};
exports.default = objectid;
