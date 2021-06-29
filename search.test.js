const { ReadingList } = require('./readinglist');
const search = require('./search');
const fs = require('fs');

jest.mock('fs')

async function getTestData(searchTerm) {
    var search1 = new search.Search(searchTerm);
    search1.searchUrl = search1.formatUrl()
    search1.body = await search1.gBooksCall(search1.searchUrl)
    search1.results = search1.parseData(search1.body);
    return search1
};

describe('Testing Book Objects...', () => {
    var book1 = new search.Book(
        title = "Moby Dick",
        authors = ["Jan Fields", "Herman Melville"],
        publisher = "Abdo Group"
        );

    it('Check Title - should return string', () => {
        expect(typeof book1.publisher).toBe('string')
    });

    it('Check Authors - should return a single string', () => {
        expect(typeof book1.authors).toBe('string')
    });

    it('Check Publisher - should return string', () => {
        expect(typeof book1.publisher).toBe('string')
    });
});

describe('Testing Book Objects... with more than 3 authors ', () => {
    var book1 = new search.Book(
        title = "Moby Dick",
        authors = ["Jan Fields", "Herman Melville", "Cat Stevens", "Jimmy Morrison"],
        publisher = "Abdo Group"
        );

    it('Check Authors - should return string', () => {
        expect(typeof book1.authors).toBe('string')
    });

    it('Check Authors - should end with "Others"', () => {
        expect(book1.authors).toContain("Others")
    });

    it('Check Authors - should not include last author', () => {
        expect(book1.authors).not.toContain("Jimmy Morrison")
    });
});

describe('Testing Search Functionality', () => {

    describe('Testing API Call...', () => {
        it('formatUrl - should return searchUrl in proper format', () => {
            searchTerm = 'moby dick'
            let testSearch = new search.Search(searchTerm);
            var searchUrl = testSearch.formatUrl(searchTerm);
            expect(searchUrl).toBe('https://www.googleapis.com/books/v1/volumes?q=moby+dick');
        });
    
        it('gBooksCall', async () => {
            var search6 = await getTestData('call of the wild');
            expect(typeof search6.gBooksCall(search6.searchUrl)).toBe("object");
        });
    });

    describe('Testing API Response Parse...', () => {

        it("parseData - undefined should return 'No Results'", async () => {
            var search2 = await getTestData('asdgkhjgbap;');
            expect(search2.results).toBe("No Results")
        });

        it('parseData result type is object', async () => {
            var search3 = await getTestData('moby dick');
            expect(typeof search3.results).toBe("object");
        });

        it('parseData results length == 5', async () => {
            var search5 = await getTestData('huckleberry finn');
            expect(search5.results).toHaveLength(5)
        });

        it('parsedData includes Title, Author, Publisher', async () => {
            var search4 = await getTestData('solaris');
            expect(Object.keys(search4.results[0]).sort()).toEqual(["title", "authors", "publisher"].sort())
        });

        it('Checking Search properties after Parsing complete', async () => {
            var search4 = await getTestData('solaris');
            expect(typeof search4.searchTerm).toBe("string");
            expect(typeof search4.searchUrl).toBe("string");
            expect(typeof search4.body).toBe("string")
            expect(typeof search4.results).toBe("object")
        })
    });
});

describe('Testing Reading List Functionality', () => {

    beforeEach( () => {        
    });

    it('parse reading list data', () => {
        var parsedData = ReadingList.parseFile()
        expect(typeof parsedData).toEqual("object")
    });
/*
    it('Read Reading List... should return object', async () => {
        var fileName = jest.mock('./readinglist.json')
        const spy = jest.mock(fs, 'readFile').mockImplementation((fileName,'utf8', function(err,data) {
            if (err) {
                //console.log(err);
                return err
            } else {
                var parsedData = JSON.parse(data)
                return parsedData;
            };
        }));
        var parsedData = await ReadingList.readList(fileName)
        expect(typeof parsedData).toBe("object")
    });

    it('Write to Reading List... should return Boolean value', async () => {
        var fileName = 'testlist.json'
        outcome = await ReadingList.writeList(fileName, data)
        expect(typeof outcome).toBe("boolean")
    });
*/
});
