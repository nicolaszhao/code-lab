import { AsyncStorage } from 'react-native';

var getUserId = function() {
	return new Promise(function(resolve, reject) {
		AsyncStorage.getItem('userid').then(function(id) {
			resolve(id);
		}).catch(function(err) {
			reject(err);
		});
	});
};

var getUserData = function() {
	var userDataKey;

	return new Promise(function(resolve, reject) {
		getUserId().then(function(id) {
			if (!id) {
				reject(new Error('user-id(username)不存在，无法获取或设置用户数据！'));
			} else {
				userDataKey = 'cat-user-' + id;
				AsyncStorage.getItem(userDataKey).then(function(data) {
					resolve(JSON.parse(data));
				}).catch(function(err) {
					reject(err);
				});
			}
		}).catch(function(err) {
			reject(err);
		});
	});
};

var setUserData = function(data) {
	var userDataKey;

	return new Promise(function(resolve, reject) {
		getUserId().then(function(id) {
			if (!id) {
				reject(new Error('user-id(username)不存在，无法获取或设置用户数据！'));
			} else {
				userDataKey = 'cat-user-' + id;
				AsyncStorage.setItem(userDataKey, JSON.stringify(data)).then(function() {
					resolve();
				}).catch(function(err) {
					reject(err);
				});
			}
		}).catch(function(err) {
			reject(err);
		});
	});
};

var storage = {
	getItem: function(key) {
		return new Promise(function(resolve, reject) {
			getUserData().then(function(data) {
				data = data && data[key];
				resolve(data === null || typeof data === 'undefined' ? null : data);
			}).catch(function(err) {
				reject(err);
			});
		});
	},

	setItem: function(key, value) {
		return new Promise(function(resolve, reject) {
			getUserData().then(function(data) {
				data = data || {};
				data[key] = value;
				setUserData(data).then(function() {
					resolve();
				}).catch(function(err) {
					reject(err);
				})
			}).catch(function(err) {
				reject(err);
			});
		});
	},

	removeItem: function(key) {
		return this.setItem(key, undefined);
	},

	sign: function(id) {
		return AsyncStorage.setItem('userid', id);
	},

	token: function(value) {
		if (value) {
			if (value === 'free') {
				return this.removeItem('token').then(function() {
					AsyncStorage.removeItem('userid');
				});
			}
			return this.setItem('token', value);
		} else {
			return this.getItem('token');
		}
	}
};

export default storage;