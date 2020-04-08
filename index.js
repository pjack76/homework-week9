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
    message: "What is the title of your project?"
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
    type: "list",
    name: "inputLicense",
    message: "Please select the license for your project.",
    choices: ["MIT", "GNU GPLv3", "Apache", "Unlicense"]
},

{
    type: "input",
    name: "inputContributing",
    message: "Please enter the number of people will be contributing to the project."
},

{
    type: "list",
    name: "inputTest",
    message: "Please select the testing framework you plan to use for your project.",
    choices: ["Jest", "Mocha", "Nightwatch"]
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

var username, title, description, usage, license, contributing, test, question;
var badge1, badge2, badge3;

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
    } else if (license === "GNU GPLv3"){
        badge1 = "https://img.shields.io/badge/license-GNUGPLv3-blue"
    } else if (license === "Apache"){
        badge1 = "https://img.shields.io/badge/license-Apache-green"
    } else {badge1 = ""};

    if(test ==="Jest"){
        badge2 = "https://img.shields.io/badge/test-Jest-red"
    } else if(test ==="Mocha"){
        badge2 = "https://img.shields.io/badge/test-Mocha-brown"
    } else if(test ==="Nightwatch"){
        badge2 = "https://img.shields.io/badge/test-Nightwatch-black"
    } else {badge2 = ""};

    badge3 = `https://img.shields.io/badge/contributing-${contributing}-black`


    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=25`;

    axios.get(queryUrl).then(function(returnedObj){
    var repoOwner =  returnedObj.data[0].owner;
    console.log(repoOwner.avatar_url);

    let markDown = `

![avatar] (${repoOwner.avatar_url})

# ${title}
![badges] (${badge1} ${badge2} ${badge3})

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

`
     
         
    fs.writeFile("Generated_README.md", markDown, function(error){
            if (error) throw error;
            console.log('The file has been saved!');      });
});
});

