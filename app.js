const inq = require('inquirer');
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
    .then(async (answers) => {
        //console.log(answers);
        if (answers['Main Menu'] == 'Search for Book') {
            let searchTerm = await Search.askQuery();
            search = new Search.Search(searchTerm);
            search.body = await search.getData()
            let results = search.parseData(search.body)
            search.chooseBook(results)
        } else if (answers['Main Menu'] == 'View Reading List') {
            Search.ReadingList.parseFile()
        } else {}
    });
};

mainMenu()



