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
},

{
    type: "input",
    name: "inputUsage",
    message: "Please enter the usage of your project."
},

{
    type: "input",
    name: "inputInstallation",
    message: "Please enter how to install your project."
},

{
    type: "input",
    name: "inputLicense",
    message: "Please select the license for your project."
},

{
    type: "input",
    name: "inputContributing",
    message: "Please enter the names of people contributing to the project."
},

{
    type: "input",
    name: "inputTest",
    message: "Please enter the description of how to test your project."
},

{
    type: "input",
    name: "inputQuestion",
    message: "Please ask question about the project."
}

];

function userInfoPrompt() {
    return inquire.prompt(questions)
};

var username;
var title;
var description;
var usage;
var license;
var contributing;
var test;
var question;
var badge1, badge2;

userInfoPrompt().then(function(answer){
    username = answer.userInput;
    title = answer.inputTitle;
    description = answer.inputDescription;
    usage = answer.inputUsage;
    installation = answer.inputInstallation;
    license = answer.inputLicense;
    contributing = answer.inputContributing;
    test = answer.inputTest;
    question = answer.inputQuestion;

    if(license ==="MIT"){
        badge1 = "https://img.shields.io/badge/license-MIT-purple"
    } else {badge1 = ""};

    if(test ==="NPM"){
        badge2 = "https://img.shields.io/badge/test-NPM-red"
    } else {badge2 = ""};


    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=25`;

    axios.get(queryUrl).then(function(returnedObj){
    var repoOwner =  returnedObj.data[0].owner;
    console.log(repoOwner.avatar_url);

    let markDown = `
      
# ${title}
![badges](${badge1} ${badge2})

### Table of Content
* [Description]
* [Usage]
* [Installation]
* [License]
* [Contributing]
* [Test]
* [Questions]

### Description
${description}

### Usage
${usage}
    
### Installation
${installation}
    
### License
${license}

### Contributing
${contributing}
    
### Test
${test}

### Questions
${question}

<img src= ${repoOwner.avatar_url} alt="github avatar"/>

`
     
         
    fs.writeFile("Generated_README.md", markDown, function(error){
            if (error) throw error;
            console.log('The file has been saved!');      });
});
});

