var request = require('request')
var fs = require('fs')
var picture = 'https://i.redditmedia.com/JLaFxx7BUYaLXtD2pplx7AcCK4tgiWXfUJJ2gXr-pkE.jpg?w=576&s=a9affeaab19563f78fa4945e68fdf375'


// request(picture).pipe(fs.createWriteStream('test.png'))

request
  .get(picture)
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(request.put('http://mysite.com/img.png'))
