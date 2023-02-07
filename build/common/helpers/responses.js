"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidObjectId = exports.validationErrorResponse = exports.serverErrorResponse = exports.SendNotFoundResponse = exports.SendErrorResponse = exports.SendSuccessResponse = void 0;
const SendSuccessResponse = (data, message) => {
    return {
        status: 'success',
        count: data.length,
        message: message,
        data: data,
    };
};
exports.SendSuccessResponse = SendSuccessResponse;
const SendErrorResponse = (value) => {
    return {
        status: 'error',
        message: value,
    };
};
exports.SendErrorResponse = SendErrorResponse;
const SendNotFoundResponse = (value) => {
    return {
        status: 'error',
        message: `${value} not found`,
    };
};
exports.SendNotFoundResponse = SendNotFoundResponse;
const serverErrorResponse = (error) => {
    return {
        status: 'error',
        data: error,
    };
};
exports.serverErrorResponse = serverErrorResponse;
const validationErrorResponse = (message) => {
    return {
        status: 'error',
        message: message,
    };
};
exports.validationErrorResponse = validationErrorResponse;
exports.invalidObjectId = {
    status: 'error',
    message: 'Not a valid ID',
};
