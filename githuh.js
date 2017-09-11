const Githuh = require('./api');
const rl = require('readline');

const read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});


//prompt and read response from command line
//parse response to get username and info requested
read.question(`Enter your command: 
      githuh repos <username>
      githuh stars <username>
      githuh profile <username>
      Quit to leave\n`, 
      (answer) => {(answer === 'quit' || 'Quit' || 'q' || 'Q') && read.close(); //callback

    let username = answer.split(' ')[2];  //get username
    let info = answer.split(' ')[1];      //info requested 
    let user = getUser(username);         //get github user object from username

    switch(info){
      case "repos":
        return getRepos(user)
        break;
      case "stars":
        return getStars(user)
        break;
      case "profile":
        return getProfile(user)
        break;
    }
});

function getUser(username){
  let user = new Githuh(username);
  return user;
};

function getRepos(user) {
  user.repos((data) => {
    console.log('\n Showing names of repos');
    console.log('==================');
    data.forEach((repo_obj) => console.log(repo_obj.name))
  })
}

function getStars(user){
  user.stars((data) => {
    console.log('\n Showing starred repos');
    console.log('==================');
    if(data.length === 0){
      console.log("No starred repos.");
    }else {
      data.forEach((starred_obj) => console.log(starred_obj.name));
    }
  })
};

function getProfile(user) {
  user.profile((data) => {
    console.log('\n Showing profile data');
    console.log('==================');
    console.log("Name: " + data.name);
    console.log("Location: " + data.location);
    console.log("Bio: " + data.bio);
    console.log("Public repos: " + data.public_repos);
    console.log("Followers: " + data.followers);
    console.log("Following: " + data.following);
    console.log("\n")

  })
}