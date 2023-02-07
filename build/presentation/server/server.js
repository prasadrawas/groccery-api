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
const compression = require('compression');
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const db_config_1 = __importDefault(require("../../common/config/db-config"));
const router_1 = __importDefault(require("../routes/router"));
const swaggerDocument = require('../../../docs/swagger-doc.json');
const fileUpload = require('express-fileupload');
class Server {
    constructor() {
        this._server = (0, express_1.default)();
        this._server.set('host', process.env.HOST || 'localhost');
        this._server.set('port', process.env.PORT || 4000);
        this._server.use(express_1.default.json());
        this._server.use((0, helmet_1.default)());
        this._server.use(compression());
        this._server.use(router_1.default);
        this._server.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
        this._server.use(fileUpload({
            useTempFiles: true,
        }));
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = this._server.get('host');
            const port = this._server.get('port');
            this._server.listen(port, host, () => {
                console.log(`Server started at http://${host}:${port}`);
            });
            (0, db_config_1.default)();
        });
    }
}
exports.default = Server;
