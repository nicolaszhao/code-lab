import param from './param';
import type from './type.js';

var authorizationData = {
	request_body: '',
	access_token: '8631a092aec2004a818973aa80aea3fd'
};

var fetch = function(url, options) {
	var params = options.params,
		headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'CatAppHeader': 'cat_app_ios_react_native'
		},
		data = options.authorized ? JSON.stringify(authorizationData) : (options.data || '');

	if (options.authorized) {
		headers['Content-length'] = data.length;
	}

	if (params) {
		if (type(params) === 'object') {
			url += '?' + param(params);
		} else if (typeof params === 'string') {
			url += '?' + params;
		}
	}

	return new Promise(function(resolve, reject) {
		window.fetch(url, {
			method: options.method || 'POST',
			headers: Object.assign(headers, options.headers),
			body: data
		})
			.then((res) => res.json())
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export default fetch;