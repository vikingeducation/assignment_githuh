const request = require('request')
const baseUri = "https://api.github.com";


class Githuh {
	constructor(apiKey) {
		this.apiKey = apiKey
	}

	get_repos(username, callback) {
		this._sendRequest(username, "repos", callback)
	}

	get_start(username, callback){
		this._sendRequest(username, "stars", callback)
	}

	get_profile(username, callback){
		this._sendRequest(username, undefined, callback)
	}

	_sendRequest(username, type, callback) {
		debugger;
		const url = `${baseUri}/users/${username}/${type}/?access_token=${this.apiKey}`
		var options = {
			url: url,
			headers: {
				'User-Agent': 'chadl76'
			}
		}
		request(options, function(error, response, body){
			//console.log(response.statusCode);
			debugger;
			if (!error & response.statusCode === 200) {
				callback(JSON.parse(body).results)
			}
		})
	}
}



const github = new Githuh("insert-api-key")


github.get_repos("chadl76", function(repos){
	//debugger;
	repos.forEach(repo => {console.log(repo.name)})

	
})