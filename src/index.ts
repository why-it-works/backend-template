import config from 'config';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { RegisterRoutes } from './routes/routes';
import * as swaggerJson from './swagger.json';
import * as swaggerUI from 'swagger-ui-express';
import { connectToDb } from './repositories/knex';
import { errorHandler } from './utils/tsoa.utils';
import { asyncContextMiddleware } from './middleware/async-handler';
import { initializeSchema } from './utils/bootstrap';

const app: Application = express();

connectToDb()
	.then(async () => {
		await initializeSchema();

		app.use(cors());
		app.options('*', cors());
		app.use(helmet());
		app.use(express.json({ limit: config.get('requestBodyLimit') }));
		app.use(express.urlencoded({ extended: true }));
		app.use(asyncContextMiddleware);
		RegisterRoutes(app);
		app.use(errorHandler);

		app.use(
			['/openapi', '/docs', '/swagger'],
			express.static('static/', { index: false }),
			swaggerUI.serve,
			swaggerUI.setup(swaggerJson),
		);

		const server = app.listen(config.get('PORT'), (): void => {
			console.info(`Docs are at http://localhost:${config.get('PORT')}/swagger`);
		});

		const shutdown = () => {
			console.log('Received shutdown signal, shutting down gracefully');
			server.close(() => {
				console.log('Closed out remaining connections');
				process.exit(0);
			});
		};

		process.on('SIGTERM', shutdown);
		process.on('SIGINT', shutdown);
	})
	.catch((error) => {
		console.log('connectToDb ::: Error ', error);
	});
