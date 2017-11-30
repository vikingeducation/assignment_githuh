var path = require("path")
var _ = require("lodash")
var index = require( path.resolve( __dirname, "./index.js" ) )

function testReturnOptions(){
	if(_.isEqual(index("collive.com",{'User-Agent': 'request'}), 
	            { url: "collive.com", headers: {'User-Agent': 'request'} } )){
		console.log("they match")
	} else {
		console.log("there is a problem")
		console.log(index("collive.com",{'User-Agent': 'request'}))
	}
}

(function(){
	testReturnOptions()
}())

