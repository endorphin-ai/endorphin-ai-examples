// Example Endorphin AI Test
// This is a sample test to help you get started
import type { TestCase } from 'endorphin-ai';
import { BASE_URL } from '../../src/envirement';

export const QALA_1: TestCase = {
	id: 'QALA-1',
	name: 'Health Check Test',
	description: 'Basic health check to verify the testing framework is working',
	priority: 'High',
	tags: ['health', 'smoke'],

	data: async () => {
		return {};
	},
	task: `STEP 1: Navigate to ${BASE_URL},
         STEP 2: Verify that text "A place to share your knowledge." is visible`,
};
