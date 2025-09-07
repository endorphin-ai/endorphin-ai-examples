import type { TestCase } from 'endorphin-ai';
import { createUser } from '../../src/helpers/users';
import { BASE_URL } from '../../src/envirement';

export const QALA_7: TestCase = {
	id: 'QALA-7',
	name: 'Verify successful login with an existing account',
	description: 'none',
	priority: 'High',
	tags: ['auth'],

	data: async () => {
		console.log('Setting up data for test QALA-7...');
		return await createUser();
	},

	task: async (data) => {
		return `
      STEP 1: Navigate to ${BASE_URL}
      STEP 2: Click on "LogIn" button
      STEP 3: Wait 2 seconds for page load
      STEP 4: Enter "${data.user.email}" in the email field
      STEP 5: Enter "${data.password}" in the password field
      STEP 6: Click "Sign In" button
      STEP 7: Wait 3 seconds for page load
      STEP 8: Verify login was successful by checking username ${data.user.username} is visible
    `;
	},
};
