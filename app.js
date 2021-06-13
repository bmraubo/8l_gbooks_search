const req = require('request');
const inq = require('inquirer');
const fs = require('fs');
const Search = require('./search')

//Main menu

function mainMenu() {
    console.log('GoogleBooks Search\nDeveloped for 8thLight Technical Assessment\n\n');
    inq
    .prompt([
        {
            type: 'list',
            name: 'Main Menu',
            message: 'What would you like to do?',
            choices: [
                {name: 'Search for Book'},
                {name: 'View Reading List'}
            ]
        }])
    .then((answers) => {
        //console.log(answers);
        if (answers['Main Menu'] == 'Search for Book') {
            Search.askQuery()
        } else {
            Search.parseFile()
        }
    });
};

//test

mainMenu()



