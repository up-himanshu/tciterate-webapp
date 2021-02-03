export default async function () {
	let promise = new Promise((resolve, reject) => {
		let user = localStorage.getItem('user');
		let token = localStorage.getItem('token');
		if (user && token) {
			try {
				let userObj = JSON.parse(user);
				userObj.token = token;
				resolve(userObj);
			} catch (error) {
				reject(error);
			}
		} else {
			reject({ error: 'No user found in localstorage.' });
		}
	});
	let res = await promise;
	return res;
}
