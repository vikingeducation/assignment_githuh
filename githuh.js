const request=require('request');
const baseURI = "https://api.github.com/users/";

const stat = process.argv[2];
const username = process.argv[3];

const acceptableStats=["repos","stars","profile"];
if (acceptableStats.indexOf(stat)<0){

  console.log("You didn't enter an acceptable statistic. Allowed statistics are:");
  acceptableStats.forEach(stat =>{
    console.log(stat);
  })
  throw new Error("Something went badly wrong!");
}

var url=`${baseURI}${username}`;
switch(stat){
  case "stars":
    url+="/starred";
    break;
  case "repos":
    url+="/repos";
    break;

};

var options={
  url:url,
  Accept: "application/vnd.github.v3+json",
  headers:{
    'User-agent': "Githuh application "
  }
};

request.get(options, function(err, response, body){
  if (err){
    throw err;
  }

  body=JSON.parse(body);
  console.log(username+"'s "+stat);
  console.log(body);
});