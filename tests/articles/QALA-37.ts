import type { TestCase } from 'endorphin-ai';
import { generateData } from 'endorphin-ai';
import { createUser } from '../../src/helpers/users';
import { BASE_URL } from '../../src/envirement';
import { apiContext } from '../../src/helpers/api-context';
import { uid } from 'uid';

export const QALA_37: TestCase = {
	id: 'QALA-37',
	name: 'Verify user can leave a comment under another user article',
	description: 'Verify successful comment creation on an article authored by a different user',
	priority: 'High',
	tags: ['article', 'comment'],

	data: async () => {
		console.log('Setting up data for test QALA-37...');

		// Create article author (User A)
		const author = await createUser();
		console.log('Author created:', author.user.username);

		// Create commenter (User B)
		const commenter = await createUser();
		console.log('Commenter created:', commenter.user.username);

		// Generate article data
		const articleData = await generateData(
			{
				title: 'unique realistic article title',
				body: 'article text',
			},
			'Generate realistic test data for an article',
		);

		// Create article as User A via API
		const apiRequest = await apiContext();
		const articlePayload = {
			article: {
				title: `${articleData.title} ${uid(5)}`,
				description: 'An article for testing comments',
				body: articleData.body,
				tagList: ['test'],
			},
		};
		const apiResponse = await apiRequest.post('/api/articles', {
			data: articlePayload,
			headers: { Authorization: `Token ${author.user.token}` },
		});
		const articleResponse = await apiResponse.json();
		if (articleResponse.errors) {
			throw new Error(`Article creation failed: ${JSON.stringify(articleResponse.errors)}`);
		}
		console.log('Article created:', articleResponse.article.title, 'slug:', articleResponse.article.slug);

		// Generate comment text
		const commentData = await generateData(
			{
				comment: 'a short meaningful comment about the article',
			},
			'Generate a realistic comment for an article',
		);

		return {
			commenter: commenter.user,
			commenterPassword: commenter.password,
			articleSlug: articleResponse.article.slug,
			articleTitle: articleResponse.article.title,
			comment: commentData.comment,
		};
	},

	task: async (data) => {
		return `
        STEP 1: Navigate to ${BASE_URL}
        STEP 2: Click on "Login" link
        STEP 3: Wait 2 seconds for page load
        STEP 4: Enter "${data.commenter.email}" in the email field
        STEP 5: Enter "${data.commenterPassword}" in the password field
        STEP 6: Click "Sign in" button
        STEP 7: Wait 3 seconds for page load
        STEP 8: Navigate to ${BASE_URL}#/article/${data.articleSlug}
        STEP 9: Wait 3 seconds for the article page to load
        STEP 10: Enter "${data.comment}" in the "Write a comment..." textarea
        STEP 11: Click "Post Comment" button
        STEP 12: Wait 2 seconds
        STEP 13: Verify "${data.comment}" is visible on the page
    `;
	},
};
