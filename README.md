# 8l_gbooks_search
A CLI Google Books search app with locally-stored Reading List function

- [Requirements](#Requirements)
- [Using the App](#Using-the-App)
- [Saving Books](#Saving-Books)
- [Brief](#Brief)
- [Technical Summary](#Technical-Summary)
- [Description of Process](#Description-of-Process)

### Requirements

Node.js v14.17.0

inquirer

### Using the App

App can be run from Terminal/Cmd with the command $node app.js

### Saving Books

Running a search will display an Inquirer checkbox list of 5 results using. The list can be navigated using the up/down arrows. Use Space to select the book(s) you wish to save to the reading list. Press 'a' to select all. Press 'i' to invert the selection. 

Pressing 'Enter' saves the book(s) to the reading list.

### Brief

Command line application that allows you to use the Google Books API to search for books and construct a reading list.

This application should allow you to:

- Type in a query and display a list of 5 books matching that query.

- Each item in the list should include the book's author, title, and publishing company.

- A user should be able to select a book from the five displayed to save to a “Reading List”

- View a “Reading List” with all the books the user has selected from their queries. This is a local reading list and not tied to Google Books’s account features.

### Technical Summary

### Description of Process

Step One - Write something that works. 

The architecture of the app is limited by the fact that I have not used JavaScript before. Therefore the whole thing has to be built around holes in my knowledge in order to deliver a working final product. I am thinking in Python, but writing JS.

The main difference/difficulty I have found is the concept of asynchronous functions - this is something that Python handles for you. While Promises are necessary for some input driven mechanics, for the most part the app avoids them. While this is not the ideal solution (obviously), the hard deadline means that only so much time can be spent learning JavaScript before applying it. 

Conceptually, it is a series of falling dominos. The initial function asks for User input, and that triggers a chain of linked functions that each process a single aspect of the whole. It is not an elegant solution, but it is one which can be implemented in the timeframe.

Testing - the app is tested during construction by regularly printing output of statements to console for review - is it what I want and can I work with the output down the line. Automated testing of the app will be added.

saveBook()

The function takes the books chosen in chooseBook(), coverts it to a JSON sting, and saves it locally to readinglist.json.

Problems emerge with reading when the app is used more than once. Essentially two lists are created and the JSON parser in viewlist.parseFile() struggles. Instinctively, a way to deal with this would be check whether a JSON already exists, and if so, extract the data, add new books, then stringify again. Googling for a better way.

This is harder to resolve than expected. The parsedData is an object... but in square brackets. typeof confirms object. Cannot push() because object. Merging is problematic, because data is replaced. Surely it is a list of objects?

So apparently, typeof returns object for array... this is odd, but StackOverflow says this is a quirk of JavaScript. But this should affect my ability to push data.

Concat. The answer is concat - parsedData = parsedData.concat(chosenBooks)

chooseBook()

Uses inquirer to create a interactive list of results. While this could be accomplished by printing a the results and then allowing manual user input in the form of 'Select Book to save (1-5)...', inquirer is just much nicer to deal with.

The display of data within the results list - inquirer checkboxes use the name: value. As inquirer returns the answers in an unwieldy way (this is likely due to a fault in my own code, but I could not diagnose what causes it), I have used values: to save each answer as a object with the title, authors and publisher for processing by the saveBook() function. 

printData()

I want the data to be in a consistent format before moving on with displaying it.
So everything is put into a single array. 

Issue is that Books generally have one title, one publisher, but several authors - too many authors would cause display issues, so the number is limited to 3. If there are more than 3 authors a plus sign is displayed. 

Perhaps combine it with parseData?

parseData()

Unpacks the Google Books API reponse into usable data and extracts the desired information. Lot of overlap with printData() (which is not accurately named anyway, so it may be a good idea to combine the two functions. 

runSearch()

Takes the search terms from askQuery() and prepares the string for combinining with the GoogleBooks API call. 

Uses request lib to run the search and obtain reponse, from which the body is then extracted for parsing in the parseData() function. 

Output is the response body.

askQuery()

Uses inquirer to ask user for search term. Following input, sends the search term into the runSearch() function. 

This could also be accomplished using readlines, however inquirer provides more functionality, which is used in the chooseBook() function. 

Viewing Reading List

This is contained in a seperate file, as ultimately I want the app to launch into a menu from which search and view reading list would be seperate options.

Viewing the reading list has some of the JS familiarity issues found above, but is generally a much simpler concept. 2 functions - one to extract and parse the JSON data, the other to display it. 

Finally a menu function to allow return to main menu - this one will be done in readlines to demonstrate capability with inbuilt module and use answer validation. The other option will quit the app. 

Step Two - Add elegance

Basic functionality is there - now to add some quality of life features.

First - menus.

I want the app to start with a welcome screen that describes what it is, what it does, and provides access to the 2 main features - reading list and search function.

After running the search function, I want the app to ask to return to menu or run another search. I imagine this will involve callbacks. 

After viewing the reading list, I want the app to ask to go back to menu or exit.

Then I can turn to architecture...



