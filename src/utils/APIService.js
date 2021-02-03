import { authHeader } from './authHeader';
import { authHeaderStore } from './authHeaderStore';
import config from './../data/config';
// import queryString from 'query-string';
// import axios from 'axios';

export const APIService = {
	login,
	logout,
	fetchAllCategories,
	addCategory,
	updateCategory,
	deleteCategory,
	fetchAllSubCategories,
	addSubCategory,
	updateSubCategory,
	adminProfile,
	fetchAllUsers,
	fetchAllProviders,
	deleteSubCategory,
	addUser,
	updateUser,
	deleteUser,
	statusUser,
	addProvider,
	updateProvider,
	deleteProvider,
	fetchCountry,
	fetchState,
	fetchCity,
	fetchAllServiceType,
	fetchSubCategory,
	addServiceType,
	updateServiceType,
	deleteServiceType,
	fetchAllSubAdmins,
	addSubAdmin,
	updateSubAdmin,
	deleteSubAdmin,
	fetchAllAdminRoleType,
	statusAdmin,
	statusCategory,
	statusSubCategory,
	statusServiceType
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
	localStorage.removeItem('user');
	localStorage.removeItem('units');
	localStorage.removeItem('categories');
	localStorage.removeItem('orderStatuses');
}

async function fetchAllSubAdmins() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.sub_admins, requestOptions)
		.then(_handleResponse)
		.then((users) => {
			return users;
		});
}

function addSubAdmin(body) {
	// console.log(body);
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.sub_admins, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function updateSubAdmin(id, body) {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.sub_admins + id, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function statusAdmin(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.sub_admins + id + '/status', requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

function deleteSubAdmin(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.sub_admins + id, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

async function fetchAllAdminRoleType(token) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.sub_admins + 'roles-type', requestOptions)
		.then(_handleResponse)
		.then((users) => {
			return users;
		});
}

async function fetchAllUsers(token) {
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

async function fetchAllProviders(token) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.providers, requestOptions)
		.then(_handleResponse)
		.then((providers) => {
			return providers;
		});
}

function fetchAllCategories() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.categories, requestOptions)
		.then(_handleResponse)
		.then(async (categories) => {
			// await localStorage.setItem('categories', JSON.stringify(categories));
			return categories;
		});
}

function addCategory(body) {
	// console.log(body);

	var formData = new FormData();
	formData.append('category_image', body.category_image);
	formData.append('description', body.description);
	formData.append('category_name', body.name);

	const requestOptions = {
		method: 'POST',
		headers: authHeaderStore(),
		body: formData
	};

	return fetch(baseUrl + config.endpoints.add_categories, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function updateCategory(id, body) {
	// const categoryBody = { category_name: body };

	var formData = new FormData();

	formData.append('description', body.description);
	formData.append('category_name', body.name);

	if (body.category_image_change) {
		formData.append('category_image', body.category_image);
	}
	formData.append('category_image_change', body.category_image_change);

	const requestOptions = {
		method: 'PUT',
		headers: authHeaderStore(),
		body: formData
	};

	return fetch(baseUrl + config.endpoints.categories + id, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function deleteCategory(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.categories + id, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function fetchAllSubCategories() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.subcategories, requestOptions)
		.then(_handleResponse)
		.then(async (categories) => {
			// console.log('categories :: ' + categories);

			await localStorage.setItem('subcategories', JSON.stringify(categories));
			return categories;
		});
}

function addSubCategory(body) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.subcategories, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function updateSubCategory(id, body) {
	// console.log(body);
	// const categoryBody = { name: body };
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.subcategories + id, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function deleteSubCategory(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.subcategories + id, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
		});
}

function adminProfile() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.profile, requestOptions)
		.then(_handleResponse)
		.then((category) => {
			return category;
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

function updateUser(id, body) {
	var formData = new FormData();

	if (body.profile_change) {
		formData.append('profile_photo', body.profile_photo);
	}

	formData.append('first_name', body.first_name);
	formData.append('last_name', body.last_name);
	formData.append('email', body.email);
	formData.append('address_1', body.address_1);
	formData.append('city', body.city);
	formData.append('state', body.state);
	formData.append('country', body.country);
	formData.append('zip_code', body.zip_code);
	formData.append('phone', body.phone);
	formData.append('profile_change', body.profile_change);
	formData.append('role_type', body.role_type);

	const requestOptions = {
		method: 'PUT',
		headers: authHeaderStore(),
		body: formData
	};

	return fetch(baseUrl + config.endpoints.users + id, requestOptions)
		.then(_handleResponse)
		.then((user) => {
			return user;
		});
}

function deleteUser(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.users + id, requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

function statusUser(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.users + id + '/status', requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

async function fetchCountry(token) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.location + 'country', requestOptions)
		.then(_handleResponse)
		.then((location) => {
			return location;
		});
}

async function fetchState(country_id) {
	let body = { country_id: country_id };
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.location + 'state', requestOptions)
		.then(_handleResponse)
		.then((location) => {
			return location;
		});
}

async function fetchCity(state_id) {
	let body = { state_id: state_id };
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.location + 'city', requestOptions)
		.then(_handleResponse)
		.then((location) => {
			return location;
		});
}

function addProvider(body) {
	var formData = new FormData();
	formData.append('profile_photo', body.profile_photo);
	formData.append('first_name', body.first_name);
	formData.append('last_name', body.last_name);
	formData.append('email', body.email);
	formData.append('password', body.password);
	formData.append('address_1', body.address_1);
	formData.append('city', body.city);
	formData.append('state', body.state);
	formData.append('country', body.country);
	formData.append('zip_code', body.zip_code);
	formData.append('phone', body.phone);

	const requestOptions = {
		method: 'POST',
		headers: authHeaderStore(),
		body: formData
	};

	return fetch(baseUrl + config.endpoints.providers, requestOptions)
		.then(_handleResponse)
		.then((user) => {
			return user;
		});
}

function updateProvider(id, body) {
	var formData = new FormData();

	if (body.profile_change) {
		formData.append('profile_photo', body.profile_photo);
	}

	formData.append('first_name', body.first_name);
	formData.append('last_name', body.last_name);
	formData.append('email', body.email);
	formData.append('address_1', body.address_1);
	formData.append('city', body.city);
	formData.append('state', body.state);
	formData.append('country', body.country);
	formData.append('zip_code', body.zip_code);
	formData.append('phone', body.phone);
	formData.append('profile_change', body.profile_change);

	const requestOptions = {
		method: 'PUT',
		headers: authHeaderStore(),
		body: formData
	};

	return fetch(baseUrl + config.endpoints.providers + id, requestOptions)
		.then(_handleResponse)
		.then((user) => {
			return user;
		});
}

function deleteProvider(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.providers + id, requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

function fetchAllServiceType() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.serviceType, requestOptions)
		.then(_handleResponse)
		.then(async (serviceType) => {
			await localStorage.setItem('serviceType', JSON.stringify(serviceType));
			return serviceType;
		});
}

function addServiceType(body) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.serviceType, requestOptions)
		.then(_handleResponse)
		.then((serviceType) => {
			return serviceType;
		});
}

function updateServiceType(id, body) {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.serviceType + id, requestOptions)
		.then(_handleResponse)
		.then((serviceType) => {
			return serviceType;
		});
}

function deleteServiceType(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.serviceType + id, requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

async function fetchSubCategory(category_id) {
	let body = { category_id: category_id };
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body)
	};

	return fetch(baseUrl + config.endpoints.categories + 'sub-category', requestOptions)
		.then(_handleResponse)
		.then((location) => {
			return location;
		});
}

function statusCategory(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.categories + id + '/status', requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

function statusSubCategory(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.subcategories + id + '/status', requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
		});
}

function statusServiceType(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(baseUrl + config.endpoints.serviceType + id + '/status', requestOptions)
		.then(_handleResponse)
		.then((res) => {
			return res;
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
