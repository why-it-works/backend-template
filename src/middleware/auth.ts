import { Request } from 'express';

export async function expressAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any> {
	// For "anonymous" security, just return undefined or some dummy user
	if (securityName === 'anonymous') {
		return Promise.resolve({});
	}

	// Example for bearer auth:
	if (securityName === 'bearerAuth') {
		const token = request.headers.authorization?.split(' ')[1];
		if (token === 'test-token') {
			return Promise.resolve({ user: 'admin' });
		} else {
			throw new Error('Unauthorized');
		}
	}

	throw new Error('Unknown security name');
}
