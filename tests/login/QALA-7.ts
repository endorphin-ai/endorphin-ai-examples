import type { TestCase } from 'endorphin-ai';
import { createUser } from '../../src/helpers/users';
import { API_URL } from '../../src/envirement';

export const QALA_7: TestCase = {
	id: 'QALA-7',
	name: 'Verify successful login with an existing account',
	description: 'none',
	priority: 'High',
	tags: ['auth'],

	setup: async () => {
		console.log('Setting up data for test QALA-7...');
		const data = await createUser();
		return data;
	},

	task: async (setupData) => {
		return `
      STEP 1: Navigate to ${API_URL}
      STEP 2: Click on "LogIn" button
      STEP 3: Wait 2 seconds for page load
      STEP 4: Enter "${setupData.user.email}" in the email field
      STEP 5: Enter "${setupData.user.password}" in the password field
      STEP 6: Click "Sign In" button
      STEP 7: Wait 3 seconds for page load
      STEP 8: Verify login was successful by checking username ${setupData.user.username} is visible
    `;
	},
};
