const axios = require("axios");
const inquire = require("inquirer");
var username;

const api ={
  getUser(){
    inquire.prompt([{
      type: "input",
      name: "userInput",
      message: "Please enter your gitHub username."
    }]).then(function(answer){
      username = answer.userInput;
      const queryUrl = `https://api.github.com/users/${username}/repos?per_page=25`;

      axios.get(queryUrl).then(function(returnedObj){
      const repoOwner =  returnedObj.data[0].owner;
      console.log(repoOwner.avatar_url);
});
});
}};


module.exports = api;

