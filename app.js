const req = require('request');
const inq = require('inquirer');
const fs = require('fs');

function saveBook(chosenBooks) {
    //converts chosen book data to JSON format and stores it in a local file
    var jsonData = JSON.stringify(chosenBooks);
    fs.appendFile('readinglist.json', jsonData, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`${chosenBooks.length} book(s) saved to Reading List`)
        };
    });
    
};

function chooseBook(results) {
    //func takes the results of the search, prepares them for display with inquirer
    //results are then displayed with checkboxes that allow user input to save multiple books
    //chosen books are put into saveBook func
    var chosenBooks = []
    let choices = []
    let bookNum = 1
    for (arr of results) {
        bookObject = {
            name: //how the book info will be displayed in the Results printout
            String('\tTitle:\t' + arr[0] + '\n' +
            '\tAuthor(s):\t' + String(arr.slice(1,arr.length-1).join(', ')) + '\n' + 
            '\tPublisher:\t' + arr[arr.length-1] + '\n'),
            value: { //how the information will be stored in inquirer answers
                title: arr[0], 
                author: String(arr.slice(1,arr.length-1).join(', ')), 
                publisher: arr[arr.length-1]} 
        };
        choices.push(bookObject)
        bookNum++
    }
    inq
    .prompt({ //displays list of results with checkboxes that can be selected to save book
        type: 'checkbox',
        name: 'Results',
        choices: choices,
        pageSize: 50,
        loop: false
    })
    .then(answers => {
        answers = Array(answers)
        //console.log(answers)
        //console.log('Books saved to Reading list');
        for (x of answers) { //this is extremely messy and needs to be cleaned up
            //console.log(x.Results);
            for (y of x.Results) {
                chosenBooks.push(y)
            }
        }
        //console.log(chosenBooks)
        saveBook(chosenBooks) 
    });
};

function printData(title, authors, publisher) {
    // Presents data in a nice way for the user
    var itemData = [];
    itemData.push(title);
    //There might be academic papers etc with many authors - if > 3 indicating with a +
    if (authors == undefined) {
        itemData.push('Unknown')
    } else if (authors.length <= 3) {
        for (author of authors) {
            itemData.push(author)
        }; 
    } else {
        for (author of authors.slice(0,3)) {
            itemData.push(author)
        };
    itemData.push(`& ${authors.length-3} Others`)
    };
    
    itemData.push(publisher);
    //console.log(itemData);
    //console.log(title, authors, publisher);
    /*console.log(
        '\nTitle:\n', itemData[0],'\n',
        'Author(s):\n',String(itemData.slice(1,itemData.length-1).join(', ')),'\n',
        'Publisher:\n',itemData[itemData.length-1]); */
    return itemData
    // print data using inquirer and request user interaction

};

function parseData(data) {
    var results = [] 
    //takes the request data and extracts the title, authors and publisher
    var parsedData = JSON.parse(data);
    var firstFive = parsedData.items.slice(0,5);
    //console.log(firstFive[0]);
    for (item of firstFive) {
        var title = item.volumeInfo.title; 
        var authors = item.volumeInfo.authors; // has to work for multiple authors
        var publisher = item.volumeInfo.publisher;
        if (publisher == undefined) {publisher = 'Unknown'}; //trying to avoid the ugly undefined value in results
        results.push(printData(title,authors,publisher));
    };
    // console.log(results)
    chooseBook(results);
};

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
            // notify user if error occurs
            console.error('error: ', error);
            console.log('statusCode: ', response && response.statusCode);
        } else {
            //otherwise proceed to parse data
            //var reqBody = body;
            //console.log('Body: ', reqBody);
            parseData(body)
        };
    });
};

//test
//runSearch('moby dick')

//Type in query in console

function askQuery() {
    inq
    .prompt([
        {
            name: 'bookSearch',
            message: 'Enter Search Term: '
        },
    ])
    .then(answers => {
        runSearch(answers.bookSearch)
    }); 
};

//test

askQuery()



