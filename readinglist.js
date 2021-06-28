const fs = require('fs');

const fileName = 'readinglist.json';

//Reading List Functionality

class ReadingList {

    static viewList = async function () {
        var self = this
        console.log('opening file...')
        var parsedData = await self.parseFile()
        self.displayList(parsedData)
    };
    
    static parseFile = function () {
        return new Promise((resolve, reject) => {
            //parse readinglist.json
            if (fs.existsSync(fileName)) {
                fs.readFile(fileName, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        var parsedData = JSON.parse(data)
                        resolve(parsedData) 
                    };
                }); 
            } else {
                console.log('No Reading List has been created')
            };
        });
    };

    static displayList = function (parsedData) {
        //Display the Reading List
        parsedData.forEach(obj => {
            console.log('Title:\t\t' + obj.title + '\n' +
            'Author(s):\t' + obj.author + '\n' + 
            'Publisher:\t' + obj.publisher + '\n');
        });
    };
};

module.exports = {ReadingList};