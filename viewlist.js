const fs = require('fs');
const path = require('path');
const { parseDate } = require('tough-cookie');

//file path

const fileName = 'readinglist.json';


//display reading list

function displayList(parsedData) {
    for (obj of parsedData) {
        console.log('Title:\t' + obj.title + '\n' +
        'Author(s):\t' + obj.author + '\n' + 
        'Publisher:\t' + obj.publisher + '\n');
    };
};

//parse JSON

function parseFile() {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('opening file')
            var rawData = data
            var parsedData = JSON.parse(rawData)
            //console.log(parsedData)
            displayList(parsedData) 
        };
    }); 
};

//give option to return to menu or quit app

parseFile()
