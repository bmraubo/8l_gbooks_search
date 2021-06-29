const req = require('request');
const inq = require('inquirer');
const fs = require('fs');

const fileName = 'readinglist.json';

//Search Functionality

class Search {
    constructor(searchTerm) {
        this.searchTerm = searchTerm;
    }

    runSearch = function() {
        //executes search methods 
        return new Promise(async(resolve) => {
            this.searchUrl = this.formatUrl()
            this.body = await this.gBooksCall(this.searchUrl)
            this.results = this.parseData(this.body)
            if (this.results == "No Results") {
                resolve()
            } else {
                this.chosenBooks = await this.chooseBook(this.results)
                await this.saveBook(this.chosenBooks)
                resolve()
            }
        });
    };

    formatUrl = function() {
        //takes search term and settles searchUrl for API call
        var baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
        var searchString = this.searchTerm.split(' ').join('+');
        var searchUrl = baseUrl + searchString;
        return searchUrl
    };
    
    gBooksCall = function(searchUrl) {
        //API call using searchUrl
        return new Promise((resolve,reject) => {
            req(searchUrl, function (error, response, body) {
                if (error != null) {
                    // notify user if error occurs
                    console.error('error: ', error);
                    reject(console.log('statusCode: ', response && response.statusCode));
                } else {
                    //otherwise fulfil promise and return body
                    resolve(body);
                }
            });
        });
    };

    parseData = function(data) {
        var results = [];
        //takes the request data and extracts the title, authors and publisher
        var parsedData = JSON.parse(data);
        if (parsedData.items == undefined) {
            console.log('No Results');
            return "No Results"
        } else {
            parsedData.items.slice(0,5).forEach(item => {
                results.push(new Book(
                    item.volumeInfo.title,
                    item.volumeInfo.authors,
                    item.volumeInfo.publisher
                    )
                );
            });
        return results;
        };
    };

    chooseBook = function(results) {
        //func takes the results of the search, prepares them for display with inquirer
        //results are then displayed with checkboxes that allow user input to save multiple books
        //returns the chosen books
        return new Promise((resolve) => {
            var chosenBooks = [];
            let choices = [];
            results.forEach(arr => {
                //console.log(arr)
                let bookObject = {
                    name: //how the book info will be displayed in the Results printout
                    String('\tTitle:\t\t' + arr.title + '\n' +
                    '\tAuthor(s):\t' + arr.authors + '\n' + 
                    '\tPublisher:\t' + arr.publisher + '\n'),
                    value: { //how the information will be stored in inquirer answers
                        title: arr.title, 
                        author: arr.authors, 
                        publisher: arr.publisher
                    }
                };
                choices.push(bookObject);
            });
            inq
            .prompt({ //displays list of results with checkboxes that can be selected to save book
                type: 'checkbox',
                name: 'Results',
                message: 'Select books to add to reading list <SPACE> -- Press <ENTER> to continue\n',
                choices: choices,
                pageSize: 50,
                loop: false
            })
            .then(answers => {
                answers = Array(answers);
                answers.forEach(x => {
                    x.Results.forEach(y => {
                        chosenBooks.push(y);
                    });
                });
                resolve(chosenBooks); 
            });
        });
    };

    saveBook = function(chosenBooks) {
        //converts chosen book data to JSON format and stores it in a local file
        //checks if a reading list already exists
        return new Promise((resolve) => {
            if (fs.existsSync(fileName)) {
                //unpack data
                fs.readFile(fileName, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        var parsedData = JSON.parse(data);
                        parsedData = parsedData.concat(chosenBooks);
                        var jsonData = JSON.stringify(parsedData);
                        fs.writeFile('readinglist.json', jsonData, function(err) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(`${chosenBooks.length} book(s) saved to Reading List`);
                                resolve()
                            };
                        });
                    };
                });
            } else {
                //package data
                var jsonData = JSON.stringify(chosenBooks);
                //write to file
                fs.writeFile('readinglist.json', jsonData, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${chosenBooks.length} book(s) saved to Reading List`);
                        resolve()
                    };
                });
            };
        });
    };  
};   

class Book {
    
    constructor(title, authors, publisher) {
        this.title = title;
        this.authors = authors;
        this.publisher = publisher;
        this.checkAuthors();
        this.checkPublisher();
    }

    checkAuthors() {
        //avoid undefined value and limit authors to 3, with indication of more
        let checked_authors = []
        if (this.authors == undefined) {
            this.authors = 'Unknown'
        } else if (this.authors.length <= 3) {
            this.authors.forEach(author => {
                checked_authors.push(author);
            });
            checked_authors = String(checked_authors.join(', '));
            this.authors = checked_authors;
        } else {
            this.authors.slice(0,3).forEach(author => {
                checked_authors.push(author);
            });
            checked_authors.push(`& ${this.authors.length-3} Others`);
            checked_authors = String(checked_authors.join(', '));
            this.authors = checked_authors;
        };
    };

    checkPublisher() {
        // avoid undefined value in results
        if (this.publisher == undefined) {this.publisher = 'Unknown'};
    };
};

module.exports = {Search, Book};