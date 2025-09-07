// Environment configuration
export const environment = {
	// Base URL for the application
	baseUrl: process.env.BASE_URL || 'https://qafromla.herokuapp.com/',

	// Other environment variables
	apiUrl: process.env.API_URL || 'https://qafromla.herokuapp.com/api',
} as const;

// Export individual values for convenience
export const BASE_URL = environment.baseUrl;
export const API_URL = environment.apiUrl;

// Default export
export default environment;
