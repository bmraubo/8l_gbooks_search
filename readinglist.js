const fs = require('fs');

const fileName = 'readinglist.json';

//Reading List Functionality

class ReadingList {

    static viewList = async function () {
        var self = this
        let parsedData = await this.parseFile()
        if (parsedData != 'None') {
            console.log('opening file...')
            self.displayList(parsedData);
        } else {
            console.log('No Reading List has been created')
        }
    };
    
    static parseFile = function () {
        return new Promise(async (resolve) => {    
            var self = this
            //parse readinglist.json
            if (fs.existsSync(fileName)) {
                let parsedData = await self.readList(fileName)
                resolve(parsedData)
            } else {
                resolve('None')
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

    static readList = function (fileName) {
        return new Promise((resolve) => {
            fs.readFile(fileName, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    resolve(err)
                } else {
                    var parsedData = JSON.parse(data)
                    resolve(parsedData);
                };
            });
        });   
    };
};

module.exports = {ReadingList};