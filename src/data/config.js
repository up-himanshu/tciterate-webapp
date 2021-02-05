module.exports = {
	url: 'localurl', // modify this setting only if explicit pointing is required.
	baseurl: 'http://3.22.108.178:3340',
	localurl: 'http://localhost:3333',
	ngrokurl: 'https://3da17821.ngrok.io',
	apiKey: '6d0db711938bea9d123a5bc8afb41acc3ee3b4cd',
	contentType: 'application/json',
	accept: 'application/json',
	endpoints: {
		login: '/api/v1/users/login',
		users: '/api/v1/users/',
		projects: '/api/v1/projects/',
		testCases: '/api/v1/testcases/',
		executions: '/api/v1/executions/',
		executionResults: '/api/v1/executionresults/',
		categories: '/api/v1/categories/',
		subcategories: '/api/v1/subcategories/',
		serviceType: '/api/v1/service-type/',
		disciplines: '/api/v1/disciplines/',
		technologies: '/api/v1/technologies/',
		stats: '/api/v1/stats',
		configurations: '/api/v1/configurations/',
		sub_admins: '/api/v1/sub-admins/',
		providers: '/api/v1/providers/',
		add_categories: '/api/v1/add_category',
		location: '/api/v1/location/',
		profile: '/api/v1/admin'
	}
};
