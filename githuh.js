const Githuh = require('./api_wrapper');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`enter your command: \ngithuh repos <username>\ngithuh stars <username>\ngithuh profile <username>\nexit to leave\n`, (answer) => {
  if (answer === 'exit' || 'Exit') rl.close();
  let username = answer.split(' ')[2];
  let info = answer.split(' ')[1];
  let user = getUser(username, info);
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
})

function getUser(username){
  let user = new Githuh(username);
  return user;
};

function getRepos(user) {
  user.repo((data) => {
    console.log('Showing names of repos');
    console.log('==================');
    data.forEach((repo_obj) => console.log(repo_obj.name));
  })
}

function getStars(user){
  user.stars((data) => {
    console.log('Showing starred repos');
    console.log('==================');
    if (data.length === 0){
      console.log("No starred repos.");
    } else {
      data.forEach((starred_obj) => console.log(starred_obj.name));
    }
  })
}

function getProfile(user) {
  user.profile((data) => {
    let profileData = {};
    profileData.name = data.name;
    profileData.email = data.email;
    profileData.public_repos = data.public_repos;
    profileData.followers = data.followers;
    profileData.following = data.following;
    console.log('Showing profile data');
    console.log('==================');
    console.log(`The profile of ${profileData.name} has an email address of ${profileData.email}. He or she has ${profileData.public_repos} public repos, is following ${profileData.following} people and has ${profileData.followers} followers.`);
  })
}