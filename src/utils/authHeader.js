import config from './../data/config';

export function authHeader(unAuth = null) {
	if (unAuth) {
		return {
			'Content-Type': config.contentType,
			Accept: config.contentType
		};
	} else {
		let token = localStorage.getItem('token');
		return {
			'Content-Type': config.contentType,
			Accept: config.contentType,
			Authorization: 'Bearer ' + token
		};
	}
}
