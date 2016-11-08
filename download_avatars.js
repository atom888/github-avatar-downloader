var request = require('request');


console.log("Welcome to the Github Avatar Downloader!");

var GITHUB_USER = "atom888";
var GITHUB_TOKEN = "ad3290475c4b987c8b9afbf2c09a6b36b48bd523";

function getRepoContributors(repoOwner, repoName, cb) {


  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);
};



getRepoContributors("atom888", "github-avatar-downloader", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});