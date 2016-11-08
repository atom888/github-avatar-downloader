var request = require('request');
var fs = require('fs');


console.log("Welcome to the Github Avatar Downloader!");

var GITHUB_USER = "atom888";
var GITHUB_TOKEN = "ad3290475c4b987c8b9afbf2c09a6b36b48bd523";

function github_url(url) { //assigns URL with headed property that provides user-agent for request URL
    return {
        url,
        headers: {
            "User-agent": "something cool",
        },
        json: true
    };
};

function getRepoContributors(repoOwner, repoName, cb) { // build API path with user/token and repoOwner/repoName inputs


    var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

    console.log(requestURL);

    request(github_url(requestURL), function(err, response, body) { // passing the request - github_url - provides required headers for user-agent
        if (err) {
            return cb(err);
        }
        console.log("Response Status Code: ", response.statusCode);
        console.log("Content Type: ", response.headers['content-type']);
        console.log("Response Status Message: ", response.statusMessage);
        cb(null, body); // able to pass body through without using JSON Parse - provides an array with object -- if response.body was call backed then JSON parse would be required.
    })

};

//Assign examples to repoOwner and repoNames
// call downloadImageByURL on each user using the avatar url and user login - iterate through

getRepoContributors("jensen", "gitfun", function(err, result) { // using gitfun repo, created under jensen - project had multiple users working on it
    if (err) {
        console.error(err);
        process.exit(1); // program exitted in a fail state
    }

    console.log("Result:", result);

    result.forEach(function(user) {
        downloadImageByURL(user.avatar_url, user.login);
    })

});

// on response, print status code and pipes photos to same directory labelled under login id
function downloadImageByURL(url, filePath) { //requires the user avatar url and the filepath is based on the user login
    request.get(url)
        .on('error', function(err) {
            if (err) {
                console.log("An error has occurred!");
                throw err;
            }
        })
        .on('response', function(response) {
            console.log("Response Status Message: ", response.statusMessage);
            console.log("Response Content Type: ", response.headers['content-type']);
            console.log('Response Status Code: ', response.statusCode);
            console.log("Downloading image ...");
            console.log("Download complete.");
        })
        .pipe(fs.createWriteStream(`./avatar-photos/${filePath}.jpg`));
}