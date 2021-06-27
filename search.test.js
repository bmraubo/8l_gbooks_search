const { test, expect, describe } = require('@jest/globals');
const search = require('./search');

async function getTestData(searchTerm) {
    var search1 = new search.Search(searchTerm);
    search1.body = await search1.getData();
    search1.results = search1.parseData(search1.body);
    return search1
};

const search1 = getTestData('moby dick');

describe('Testing Book Objects...', () => {
    var book1 = new search.Book(
        title = "Moby Dick",
        authors = ["Jan Fields", "Herman Melville"],
        publisher = "Abdo Group"
        );

    test('Check Title - should return string', () => {
        expect(typeof book1.publisher).toBe('string')
    });

    test('Check Authors - should return a single string', () => {
        expect(typeof book1.authors).toBe('string')
    });

    test('Check Publisher - should return string', () => {
        expect(typeof book1.publisher).toBe('string')
    });
});

describe('Testing Search Functionality', () => {
    
    ///I'll need a mock heresearch1.body = await search1.getData()
    //tests go here

    test('getData - body is not undefined', () => {
        expect(typeof search1.body).not.toBe("undefined")
    });

    describe('parseData - should return an array of length 5', () => {
        test('Data type is array', () => {
            console.log(typeof search1.results)
            expect(typeof search1.results).toBe('array')
        });

        test('results length == 5', () => {
            expect(search1.results).toHaveLength(5)
        });
    });

    //test('Choose Book')

    //test('save book')

});

//describe('Testing Reading List Functionality', () => {

//});
