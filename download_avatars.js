var request = require('request');
var fs = require('fs');


console.log("Welcome to the Github Avatar Downloader!");

var GITHUB_USER = "atom888";
var GITHUB_TOKEN = "ad3290475c4b987c8b9afbf2c09a6b36b48bd523";

function github_url(url) { //provides header: user-agent which is required access
    return {
    url,
    headers: {
      "User-agent": "something cool",
    },
    json:true
  };
};

function getRepoContributors(repoOwner, repoName, cb) {


  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);

  request(github_url(requestURL), function(err, response, body) { // passing the request - github_url - provides required headers for user-agent
    if (err) {
      return cb(err);
    }
    console.log("Response Status Code: ", response.statusCode);
    console.log("Content Type: ", response.headers['content-type']);
    console.log("Response Status Message: ", response.statusMessage);
    cb(null, body);
  })

};



getRepoContributors("atom888", "github-avatar-downloader", function(err, result) {
  if(err) {
    console.error(err); //
    process.exit(1); // program exitted in a fail state
  }
  console.log("Result:", result);
});