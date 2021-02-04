import { authHeader } from './authHeader';
import config from './../data/config';
// import queryString from 'query-string';
// import axios from 'axios';

export const APIService = {
	login,
	logout,
	fetchAllUsers,
	addUser,
	fetchAllProjects,
	addProject,
	fetchProjectTestCases,
	addProjectTestCase,
	updateProjectTestCase,
	deleteProjectTestCase,
	fetchProjectExecutions,
	addProjectExecution,
	fetchExecutionResults,
	updateExecutionResult
};

const baseUrl =
	config.url === 'baseurl'
		? config.baseurl
		: config.url === 'localurl'
		? config.localurl
		: config.url === 'ngrokurl'
		? config.ngrokurl
		: config.url === 'sandbox'
		? config.sandbox
		: window.location.hostname;

// const instance = axios.create({ baseURL: baseUrl });

function login(email, password) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(true),
		body: JSON.stringify({ email, password })
	};
	return fetch(baseUrl + config.endpoints.login, requestOptions)
		.then(_handleResponse)
		.then(async (user) => {
			if (user) {
				await localStorage.setItem('user', JSON.stringify(user));
				await localStorage.setItem('token', user.token);
			}
			return user;
		});
}

function logout() {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};
	return fetch(baseUrl + config.endpoints.users, requestOptions)
		.then(_handleResponse)
		.then((user) => {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			return user;
		});
}

async function fetchAllUsers() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.users, requestOptions)
		.then(_handleResponse)
		.then((users) => {
			return users;
		});
}

function addUser(body) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};
	return fetch(baseUrl + config.endpoints.users, requestOptions)
		.then(_handleResponse)
		.then((user) => {
			return user;
		});
}

async function fetchAllProjects() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.projects, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function addProject(body) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};
	return fetch(baseUrl + config.endpoints.projects, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

async function fetchProjectTestCases(project_id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.testCases + project_id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function addProjectTestCase(project_id, body) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};
	return fetch(baseUrl + config.endpoints.testCases + project_id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function updateProjectTestCase(id, body) {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(body)
	};
	return fetch(baseUrl + config.endpoints.testCases + id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function deleteProjectTestCase(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};
	return fetch(baseUrl + config.endpoints.testCases + id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

async function fetchProjectExecutions(project_id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.executions + project_id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function addProjectExecution(project_id, body) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};
	return fetch(baseUrl + config.endpoints.executions + project_id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

async function fetchExecutionResults(execution_id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.executionResults + execution_id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function updateExecutionResult(id, body) {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(body)
	};
	return fetch(baseUrl + config.endpoints.executionResults + id, requestOptions)
		.then(_handleResponse)
		.then((data) => {
			return data;
		});
}

function _handleResponse(response) {
	return response.text().then((text) => {
		let data = text && JSON.parse(text);
		console.log('_handleResponse', text);
		data.statusText = response.statusText;
		if (!response.ok) {
			if (response.status === 401) {
				// console.log(response);
				// logout();
				// if (new URL(response.url).pathname !== "/api/dashboard/admins/login") {
				//   window.location.reload(true);
				// }
			}
			return Promise.reject(data);
		}

		return data;
	});
}
