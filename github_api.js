const request = require('request');

const baseUri = 'https://api.github.com/users';

class Github {
	getRecentRepos(username, callback) {
		this._getUser(username, callback, 'repos');
	}

	getStarredRepos(username, callback) {
		this._getUser(username, callback, 'starred');
	}

	getProfileInfo(username, callback) {
		this._getUser(username, callback);
	}

	_getUser(username, callback, type) {
		let options = {
			uri: `${baseUri}/${username}`,
			method: 'GET',
			headers: {'user-agent': 'node.js'}
		}

		if (arguments.length === 3) {
			options.uri = `${baseUri}/${username}/${type}`;
		}

		request(options, function(err, res, body) {
			if (!err && res.statusCode === 200) {
				callback(JSON.parse(body));

			} else {
				console.error(err, res.statusCode);
			}
		})
	}
}

const githubAPI = new Github();

module.exports = {
	githubAPI
}