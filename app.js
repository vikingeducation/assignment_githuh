#! /usr/bin/env node

"use strict";

const request = require("request");

/*Base Uris for API calls*/
/*  "user_url": "https://api.github.com/users/{user}",
    "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
    "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
*/

class Githuh {
    constructor (username, password, userAgent){
        this.baseUri = "https://api.github.com/users/";
        this.username = username;
        this.password = password;
        //Create options with username as password
        this.options = {
                "headers": {
                    "User-agent" : userAgent || username,
                    "Accept" : "application/vnd.github.v3+json"
            }
        };
    }
    
    userRepoLookup(name, callback) { //and set url in options
        let url = `${this.baseUri}${name}/repos`;
        this.options["url"] = url;
        this._sendRequest(this.options, callback);

    }
    userStarsLookup(name, callback) {
        let url = `${this.baseUri}${name}/starred`;
        this.options["url"] = url;
        this._sendRequest(this.options, callback);


    }
    
    userProfileLookup(name, callback){
        let url = `${this.baseUri}${name}`;
        this.options["url"] = url;
        this._sendRequest(this.options, callback);
    }
    
    _sendRequest(options, callback) {
        request.get(options, function(error, response, body) {
            if (error) {
                console.log(error);
            } else if (response.statusCode == 200) {
                //how to send this value back to the calling function
                callback(JSON.parse(body));
            }
        }).auth(this.username, this.password);

    }
    
}



module.exports = Githuh;//Constructor