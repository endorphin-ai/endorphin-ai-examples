import { apiContext } from './api-context';
import { uid } from 'uid';

export const createUser = async () => {
	const name = `Name ${uid(5)}`;
	const email = `Email${uid(5)}@example.com`;
	const password = `Pass${uid(5)}`;

	const apiRequest = await apiContext();
	const payload = { user: { username: name, email: email, password: password } };
	const apiResponse = await apiRequest.post('/api/users', { data: payload });
	const response = await apiResponse.json();

	// Add password to the response object and return it
	return {
		...response,
		password: password,
	};
};
