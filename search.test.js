const { test, expect, describe } = require('@jest/globals');
const { ReadingList } = require('./readinglist');
const search = require('./search');
const fs = require('fs');

async function getTestData(searchTerm) {
    var search1 = new search.Search(searchTerm);
    search1.body = await search1.getData();
    search1.results = search1.parseData(search1.body);
    return search1
};

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

describe('Testing Book Objects... with more than 3 authors ', () => {
    var book1 = new search.Book(
        title = "Moby Dick",
        authors = ["Jan Fields", "Herman Melville", "Cat Stevens", "Jimmy Morrison"],
        publisher = "Abdo Group"
        );

    test('Check Authors - should return string', () => {
        expect(typeof book1.authors).toBe('string')
    });

    test('Check Authors - should end with "Others"', () => {
        expect(book1.authors).toContain("Others")
    });

    test('Check authors - should not include last author', () => {
        expect(book1.authors).not.toContain("Jimmy Morrison")
    });
});

describe('Testing Search Functionality', () => {

    test('getData - body is not undefined', async () => {
        var search1 = await getTestData('anna karenina')
        expect(typeof search1.body).not.toBe("undefined")
    });

    describe('parseData - should return "No Results" || an object of length 5', () => {

        test("ParseData should return 'No Results'", async () => {
            var search2 = await getTestData('asdgkhjgbap;');
            expect(search2.results).toBe("No Results")
        });

        test('parseData type result is object', async () => {
            var search1 = await getTestData('moby dick');
            expect(typeof search1.results).toBe("object");
        });

        test('parseData results length == 5', async () => {
            var search1 = await getTestData('huckleberry finn');
            expect(search1.results).toHaveLength(5)
        });
    });
});

describe('Testing Reading List Functionality', () => {

    test('parse reading list data', async () => {
        parsedData = await ReadingList.parseFile()
        expect(typeof parsedData).toBe("object")
    })
});
