import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	console.error(err);
	res.status(500).json({
		success: false,
		message: err.message || 'Unhandled Error',
	});
}

/*
import { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

export const errorHandler = (err: any, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void => {
	if (err instanceof ValidateError) {
		console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
		return res.status(422).json({
			success: false,
			message: 'Validation Failed',
			data: err?.fields,
		});
	}

	if (err.status) {
		return res.status(err.status).json({ message: err.message });
	}

	if (err instanceof Error) {
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: err,
		});
	}

	next();
};

export function notFoundHandler(_req: any, res: ExResponse) {
	res.status(404).send({
		message: 'Not Found',
	});
}
 
*/
