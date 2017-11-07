var figlet = require('figlet')
var chalk = require('chalk')
var clear = require('clear')
var request = require('request')
var user, check,url
clear() 

var stdin = process.openStdin();
console.log(chalk.yellow(figlet.textSync('GitHuH?', {
    font: 'block',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));

stdin.addListener("data", function(d) {
   
    var inp = d.toString().trim()
    var resp = inp.split(" ");
    var check = resp[1]
    var user = resp[2].slice(1, (resp[2].length-1))
    if (check){
switch(check) {

case "repos":
var url = `https://api.github.com/users/${user}/repos?per_page=10&sort=created`
request(url, {headers :{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	
    var results = (JSON.parse(body))
    results.map(function(repo){
	console.log(chalk.red(repo.name))
    })
    
  } else {
  	 console.log("error")
  }
});
break;

case  "stars":
url = `https://api.github.com/users/${user}/starred`
request(url, {headers :{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    results = (JSON.parse(body))
    results.map(function(repo){
	console.log(chalk.red(repo.name))
    })
  } else {
  	return console.log("error")

  }
});
break;

case "profile":
url = `https://api.github.com/users/${user}`
request(url, {headers :{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var results = (JSON.parse(body))
   console.log(chalk.red(results.email))
    console.log(chalk.red(results.public_repos))
	console.log(chalk.red(results.followers))
	console.log(chalk.red(results.following))
	console.log(chalk.blue(results.created_at))
  } else {
  	return console.log(error, user, url)
  }
});
break;
default:
console.log("enter a valid function!")

}}

  });

