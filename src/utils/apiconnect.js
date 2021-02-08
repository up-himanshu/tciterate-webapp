module.exports = (url, method, headers = {}, body = {}) => {
	function _clearEmpties(o) {
		for (var k in o) {
			if (!o[k] || typeof o[k] !== 'object') {
				continue; // If null or not an object, skip to the next iteration
			}

			// The property is an object
			if (Object.keys(o[k]).length === 0) {
				delete o[k]; // The object had no properties, so delete that property
			}
		}
		return o;
	}

	const req = _clearEmpties({ method, headers, body });

	fetch(url, req)
		.then(processResponse)
		.then((res) => {
			const { data } = res;
			return JSON.stringify(data);
		});

	function processResponse(response) {
		const statusCode = response.status;
		const data = response.json();
		return Promise.all([statusCode, data]).then((res) => ({
			statusCode: res[0],
			data: res[1]
		}));
	}
};
