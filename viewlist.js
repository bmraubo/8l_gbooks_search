const fs = require('fs');

//file path

const fileName = 'readinglist.json';

//give option to return to menu or quit app

function listMenu() {
    console.log('Go back to menu (y/n)?')

}

//display reading list

function displayList(parsedData) {
    for (obj of parsedData) {
        console.log('Title:\t\t' + obj.title + '\n' +
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
            console.log('opening file...')
            var parsedData = JSON.parse(data)
            //console.log(parsedData)
            displayList(parsedData) 
        };
    }); 
};



parseFile()
