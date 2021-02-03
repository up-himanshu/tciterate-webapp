import config from './../data/config';

export function authHeaderStore() {
	let user = JSON.parse(localStorage.getItem('user'));

	if (user && user.auth_data) {
		return {
			api_key: config.apiKey,
			Authorization: 'Basic ' + user.auth_data
		};
	} else {
		return {};
	}
}
