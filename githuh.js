const request = require('request');

//api calls we'll make

//https://api.github.com/users/EricGlover/starred
//https://api.github.com/users/EricGlover/repos
//http://api.github.com/users/EricGlover

//note:
//I'm running this through node
//so... to run
//$ node githuh.js <command> <username>
//$ node githuh.js profile torvalds

//I'll setup up an alias for the command later

//additional args are on process.argv

//get repos
function repos( username ){
  //console.log(`Repos + ${username}`);
  url = `https://api.github.com/users/${username}/repos`;
  var options = {
    url: url,
    headers: {
      'User-Agent': 'learning_apis'
    }
  }
  request(options, function( err, res, body ){
    var j_obj = JSON.parse( body );
    debugger;
    //j_obj is an object of repo objs
    for( var i = 0; i < j_obj.length; i++){
      //in each repo we just want to console log the names
        //for now
      var repo_obj = j_obj[i];
      console.log(repo_obj.name);
    }
  });
}

//get starred
function stars( username ){
  url = `https://api.github.com/users/${username}/starred`;
  var options = {
    url: url,
    headers: {
      'User-Agent': 'learning_apis'
    }
  }
  request(options, function( err, res, body ){
    debugger;
    var j_obj = JSON.parse( body );
    console.log(`${username} starred:\n=================================='`);
    for( var i = 0; i < j_obj.length; i++){
      //in each repo we just want to console log the names
        //for now
      var repo_obj = j_obj[i];
      console.log(`Entry ${i}=============`)
      console.log( `Name: ${repo_obj.name}`)
      console.log(`Full name: ${repo_obj['full_name']}`)
    }
  });
}

//get profile
function profile( username ){
  url = `https://api.github.com/users/${username}`;
  var options = {
    url: url,
    headers: {
      'User-Agent': 'learning_apis'
    }
  }
  request(options, function( err, res, body ){
    debugger;
    var j_obj = JSON.parse( body );
    console.log(`${username}'s Profile:\n=================================='`);

    var keys_to_log = [
      'name',
      'company',
      'blog',
      'location',
      'email',
      'public_repos',
      'public_gists',
      'followers',
      'following'
    ]
    keys_to_log.forEach( function( key ){
      console.log(`${key} : ${j_obj[key]}`);
    })

  });
}
function switchboard( ){
  var username = 3;
  var command = 2;
  if (process.argv.includes('debug') ){
    username++;
    command++;
  }
  switch ( process.argv[command] ) {
    case "repos":
      repos( process.argv[ username ] );
      break;
    case "profile":
      profile( process.argv[username] );
      break;
    case "stars":
      stars( process.argv[ username ] );
      break;
    default:
      console.log(" I'm sorry but '" + process.argv[command] + "' isn't a valid command.");
      throw( " invalid command")
  }
}
switchboard();

/*  REQUIREMENTS
Create a Command Line Interface, GitHuh?, that displays statistics for a given username. Your application should take at least 3 different commands.

githuh repos <username> should return a list of the user's recent repos.
githuh stars <username> should return a list of the user's starred repos.
githuh profile <username> should return the user's profile information (email, number of public repos, follower/following count, etc.)
Any other fun/interesting/useless commands you'd like to implement.

*/
