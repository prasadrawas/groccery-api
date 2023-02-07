const compression = require('compression');
import express, { Express } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import connectToMongo from '../../common/config/db-config';
import router from '../routes/router';
const swaggerDocument = require('../../../docs/swagger-doc.json');
const fileUpload = require('express-fileupload');

export default class Server {
  private _server: Express;

  constructor() {
    this._server = express();
    this._server.set('host', process.env.HOST || 'localhost');
    this._server.set('port', process.env.PORT || 4000);
    this._server.use(express.json());
    this._server.use(helmet());
    this._server.use(compression());
    this._server.use(router);
    this._server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
    this._server.use(
      fileUpload({
        useTempFiles: true,
      })
    );
  }

  public async startServer(): Promise<void> {
    const host: string = this._server.get('host');
    const port: number = this._server.get('port');
    this._server.listen(port, host, () => {
      console.log(`Server started at http://${host}:${port}`);
    });
    connectToMongo();
  }
}
