const Githuh = require('./api_wrapper');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Enter your command: \ngithuh repos <username>\ngithuh stars <username>\ngithuh profile <username>\nExit to leave\n`, (answer) => {
  (answer === 'exit' || "Exit") && rl.close();
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
    let profileData = {};
    profileData.name = data.name || "Not given."
    profileData.email = data.email || "Not given.";
    profileData.bio = data.bio || "(Bio not wriiten)";

    let date = new Date(data.created_at).toDateString();
    profileData.createdDate = date;

    console.log(`The profile of ${profileData.name} was created on ${profileData.createdDate}.\nTheir email is ${profileData.email} and their bio states the following:
      ${profileData.bio}`);

  })
}
