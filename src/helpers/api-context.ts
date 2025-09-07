import { request } from '@playwright/test';
import { BASE_URL } from '../envirement';

export const apiContext = async () => {
	console.log('Creating API context with baseURL:', BASE_URL);
	return await request.newContext({
		baseURL: BASE_URL,
		extraHTTPHeaders: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
