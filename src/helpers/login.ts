import { BASE_URL } from '../envirement';

export const login = async (page, user) => {
	await page.goto(BASE_URL);
};
