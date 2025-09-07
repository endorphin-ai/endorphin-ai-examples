// Load environment variables from .env file
import 'dotenv/config';

// Environment configuration
export const environment = {
	// Base URL for the application
	baseUrl: process.env.BASE_URL,
} as const;

// Export individual values for convenience
export const BASE_URL = environment.baseUrl;

// Debug: Log the values to check what's being used
console.log('Environment variables:');
console.log('- process.env.BASE_URL:', process.env.BASE_URL);

console.log('- Final BASE_URL:', BASE_URL);
