const inquire = require("inquirer");
const newAPI = require("./utils/api")



const questions = [{
    type: "input",
    name: "username",
    message: "Please enter your gitHub username."
},

{
    type: "input",
    name: "title",
    message: "What is the title of your project?."
},

{
    type: "input",
    name: "description",
    message: "Please enter the description of your project."
}

];

function userInfoPrompt() {
    return inquire.prompt(questions)
};

newAPI.getUser().then(userInfoPrompt());




function writeToFile(fileName, data) {
}

function init() {

}

init();

