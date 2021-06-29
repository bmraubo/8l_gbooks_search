const inq = require('inquirer');
const Search = require('./search.js')
const List = require('./readinglist.js')

//Input

function askQuery() {
    return new Promise((resolve) => {
        inq
        //Type in query in console
        .prompt([
            {
                name: 'bookSearch',
                message: 'Enter Search Term: '
            },
        ])
        .then(answers => {
            resolve(answers.bookSearch)
        });
    }) 
};

//Main menu

function mainMenu() {
    //main menu displayed when app is launched
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
    .then(async (answers) => {
        //console.log(answers);
        if (answers['Main Menu'] == 'Search for Book') {
            let searchTerm = await askQuery();
            let search = new Search.Search(searchTerm);
            await search.runSearch()
            searchMenu()
        } else if (answers['Main Menu'] == 'View Reading List') {
            await List.ReadingList.viewList()
            listMenu()
        } else {}
    });
};

function searchMenu() {
    //menu displayed after completing a search
    inq
    .prompt([
        {
            type: 'list',
            name: 'Search Complete',
            message: 'What would you like to do next?',
            choices: [
                {name: 'Run another Search'},
                {name: 'View Reading List'},
                {name: 'Exit'}
            ]
        }])
    .then(async (answers) => {
        //console.log(answers);
        if (answers['Search Complete'] == 'Run another Search') {
            let searchTerm = await askQuery();
            let search = new Search.Search(searchTerm);
            await search.runSearch()
            searchMenu()
        } else if (answers['Search Complete'] == 'View Reading List') {
            await List.ReadingList.viewList()
            listMenu()
        } else {};
    });
};

function listMenu() {
    //menu displayed after viewing the reading list
    inq
    .prompt([
        {
            type: 'list',
            name: 'End of Reading List',
            message: 'What would you like to do next?',
            choices: [
                {name: 'Run Search'},
                {name: 'Exit'}
            ]
        }])
    .then(async (answers) => {
        if (answers['End of Reading List'] == 'Run Search') {
            let searchTerm = await askQuery();
            let search = new Search.Search(searchTerm);
            await search.runSearch()
            searchMenu()
        } else {}
    });
};

mainMenu()



