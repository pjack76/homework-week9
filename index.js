const inquire = require("inquirer");
const fs = require("fs");
const axios = require("axios");




const questions = [{
    type: "input",
    name: "userInput",
    message: "Please enter your gitHub username."
},

{
    type: "input",
    name: "inputTitle",
    message: "What is the title of your project?."
},

{
    type: "input",
    name: "inputDescription",
    message: "Please enter the description of your project."
}

];

function userInfoPrompt() {
    return inquire.prompt(questions)
};

var username;
var title;
var description;

userInfoPrompt().then(function(answer){
      username = answer.userInput;
      title = answer.inputTitle;
      description = answer.inputDescription;

      const queryUrl = `https://api.github.com/users/${username}/repos?per_page=25`;

      axios.get(queryUrl).then(function(returnedObj){
      var repoOwner =  returnedObj.data[0].owner;
      console.log(repoOwner.avatar_url);

      let markDown = `
      
      # ${title}

      # ${description}

      ![github avatar] (${repoOwner.avatar_url})     
      
      
      `

      
      fs.writeFile("README.md", markDown, function(error){
            if (error) throw error;
            console.log('The file has been saved!');      });
});
});

/*function generateMarkdown() {
    return `
  # ${title}

  # ${description}
  
  `;
  }








function writeToFile(fileName, data) {
    fs.writeFile("README.md", generateMarkdown());
};

writeToFile();

function init() {

}

init();
*/
