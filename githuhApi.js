const request = require("request");

const baseUri = "https://api.github.com/users";

class GitHuh {
	constructor(apiKey) {
		this.apiKey = apiKey;
	}

	repos(user, callback) {
		let url = `${baseUri}/${user}/repos` + `?type=owner&sort=created&access_token=${this.apiKey}`;

		this._sendRequest(url, callback);
	}

	starred(user, callback) {
		let url = `${baseUri}/${user}/starred` + `?sort=created&access_token=${this.apiKey}`; 

				this._sendRequest(url, callback);
	}


	profile(user, callback) {
		let url = `${baseUri}/${user}/` + ` ?access_token=${this.apiKey}`;

		this._sendRequest(url, callback);
	}

	_sendRequest(url, callback) {
		let options = {
			url: url,
			headers: { "User-Agent": "timibadass" }
		};

		request(options, (err, response, body) => {
			if(!err && response.StatusCode == 200) {
				callback(JSON.parse(body));
			};
		});
	};
}

module.exports = GitHuh;