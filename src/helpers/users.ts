import { apiContext } from './api-context';
import { uid } from 'uid';

export const createUser = async () => {
	const name = `Name ${uid(5)}`;
	const email = `Email ${uid(5)}`;
	const password = `Pass ${uid(5)}`;

	const apiRequest = await apiContext();
	const payload = { user: { username: name, email: email, password: password } };
	const apiResponse = await apiRequest.post('/users', { data: payload });
	return apiResponse.json();
};
