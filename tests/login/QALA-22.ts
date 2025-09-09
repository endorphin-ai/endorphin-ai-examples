import { BASE_URL } from '../../src/envirement';
import type { TestCase } from 'endorphin-ai';
import { generateData } from 'endorphin-ai';

export const QALA_22: TestCase = {
	id: 'QALA-22',
	name: 'Verify error message is displayed for login attempt with an empty password field',
	description: 'A simple test to verify the framework is working correctly',
	priority: 'High',
	tags: ['auth'],

	// Optional async data generation function
	data: async () => {
		console.log('Generating test data...');

		// Use AI to generate realistic user data
		const userData = await generateData(
			{
				email: 'valid email address for testing',
				password: 'simple password for testing',
				username: 'simple username for testing',
			},
			'Generate realistic test user credentials'
		);

		console.log('Generated test data...', userData);
		return { user: userData };
	},

	task: async (data) => {
		return `
       STEP 1: Navigate to ${BASE_URL}
            STEP 2: Click on "LogIn" button
            STEP 3: Wait 2 seconds for page load
            STEP 4: Enter "${data.user.email}" in the email field
            STEP 5: Wait 2 seconds
            STEP 6: Click "Sign In" button     
            STEP 7: Verify message "Password is required" is visible
    `;
	},
};
