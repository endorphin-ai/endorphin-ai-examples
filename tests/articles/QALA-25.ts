import type { TestCase } from 'endorphin-ai';
import { generateData } from 'endorphin-ai';
import { createUser } from '../../src/helpers/users';
import { BASE_URL } from '../../src/envirement';

export const QALA_25: TestCase = {
	id: 'QALA-25',
	name: 'Verify successful article creation',
	description: 'Verify successful article creation with all required valid inputs',
	priority: 'High',
	tags: ['article'],

	data: async () => {
		console.log('Setting up data for test QALA-25...');
		const user = await createUser();

		const articleData = await generateData(
			{
				title: 'unique realistic article title',
				about: 'about article short description',
				body: 'article text',
				tag: 'tag for article',
			},
			'Generate realistic test data for an article'
		);

		console.log('Generated test data...', articleData);
		return { user: user.user, password: user.password, article: articleData };
	},

	task: async (data) => {
		return `
        STEP 1: Navigate to ${BASE_URL}
        STEP 2: Click on "Login" link
        STEP 3: Wait 2 seconds for page load
        STEP 4: Enter "${data.user.email}" in the email field
        STEP 5: Enter "${data.password}" in the password field
        STEP 6: Click "Sign in" button
        STEP 7: Wait 3 seconds for page load
        STEP 8: Click on "New Article" link
        STEP 9: Wait 2 seconds for page load
        STEP 10: Enter "${data.article.title}" in "Article Title" field
        STEP 11: Enter "${data.article.about}" in "What's this article about?" field
        STEP 12: Enter "${data.article.body}" in "Write your article (in markdown)" field
        STEP 13: Enter "${data.article.tag}" in "Enter tags" field
        STEP 14: Click on "Publish Article" button
        STEP 15: Wait 3 seconds for page load
        STEP 16: Verify "${data.article.title}" is visible on the page
    `;
	},
};
