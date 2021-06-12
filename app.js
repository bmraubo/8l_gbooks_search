const req = require('request')
const inq = require('inquirer');

/////Help parameter to explain options - there is only one - 'View reading list'

/////Search function

function parseData(data) { //takes the request data and extracts the title, authors and publisher
    var parsedData = JSON.parse(data);
    var firstFive = parsedData.items.slice(0,5);
    //console.log(firstFive[0]);
    for (item of firstFive) {
        console.log(item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.publisher);
    }
}

function runSearch(searchTerm) {
    var baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    //convert search term to search string
    var searchString = searchTerm.split(' ').join('+');
    console.log(searchString);
    //send HTTP GET request to https://www.googleapis.com/books/v1/volumes?q=search+terms
    var searchUrl = baseUrl + searchString;
    console.log(searchUrl);
    req(searchUrl, function (error, response, body) {
        if (error != null) {
        console.error('error: ', error);
        console.log('statusCode: ', response && response.statusCode);
        } else {
        var reqBody = body;
        //console.log('Body: ', reqBody);
        parseData(reqBody)
        }
    })
};

//test
//runSearch('moby dick')

//Type in query in console

function askQuery() {
    inq
    .prompt([
        {
            name: 'bookSearch',
            message: 'Enter Search Term'
        },
    ])
    .then(answers => {
        runSearch(answers.bookSearch)
    }); 
};

//test

askQuery()


//Send Request through Google Books API

//function runSearch(searchTerm)

//Print list of top 5 results
    //Display books author, title, publishing company
    //Use colors to make key information pop
    //Use inquirer to print check boxes next to each result

//Offer user information on next step to save book to Reading list

///// Save function

//Use JSON to store information

//Allow user to select book from search results
    //This is done using inqurier checkboxes

//Save selected

/////View function

//Include launch parameter to view reading list

