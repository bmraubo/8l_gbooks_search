const req = require('request');
const inq = require('inquirer');
const fs = require('fs');
const Search = require('./search')

//Main menu

function mainMenu() {
    console.log('GoogleBooks Search\nDeveloped for 8thLight Technical Assessment\n');
    inq
    .prompt([
        {
            type: 'list',
            name: 'Main Menu',
            message: 'What would you like to do?',
            choices: [
                {name: 'Search for Book'},
                {name: 'View Reading List'},
                {name: 'Exit'}
            ]
        }])
    .then((answers) => {
        //console.log(answers);
        if (answers['Main Menu'] == 'Search for Book') {
            Search.askQuery()
        } else if (answers['Main Menu'] == 'View Reading List') {
            Search.parseFile()
        } else {}
    });
};

//test

mainMenu()



