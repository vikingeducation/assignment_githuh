var request = require('request')
var fs = require('fs')
var picture = 'https://i.redditmedia.com/JLaFxx7BUYaLXtD2pplx7AcCK4tgiWXfUJJ2gXr-pkE.jpg?w=576&s=a9affeaab19563f78fa4945e68fdf375'


// request(picture).pipe(fs.createWriteStream('test.png'))
//
// request
//   .get(picture)
//   .on('response', function(response) {
//     console.log(response.statusCode) // 200
//     console.log(response.headers['content-type']) // 'image/png'
//   })
//   .pipe(request.put('http://mysite.com/img.png'))

const gitHuh = request.defaults({
  headers: { 'User-Agent': 'Seeker0' }
});


const baseUri = 'https://api.github.com/users';

var getGit = (user, type) => {
  gitHuh
    .get(`${baseUri}/${user}/${type}`)
    .on('error', err => console.error(err))
    .on('response', response => {
      console.log(response);
    });
};

// getGit('Seeker0', 'repos');

// getGit('Seeker0', 'stars');

getGit('Seeker0', 'profile');
