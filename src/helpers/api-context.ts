import { request } from '@playwright/test';
import { API_URL } from '../envirement';

export const apiContext = async () => {
	return await request.newContext({
		baseURL: API_URL,
		extraHTTPHeaders: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
