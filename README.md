# 8l_gbooks_search
Test Assessment for 8 Light

Command line application that allows you to use the Google Books API to search for books and construct a reading list.

This application should allow you to:

Type in a query and display a list of 5 books matching that query.

Each item in the list should include the book's author, title, and publishing company.

A user should be able to select a book from the five displayed to save to a “Reading List”

View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.

#########################

Step One - Write something that works. 

The architecture of the app is limited by the fact that I have not used JavaScript before. Therefore the whole thing has to be built around holes in my knowledge in order to deliver a working final product. I am thinking in Python, but writing JS.

The main difference/difficulty I have found is the concept of asynchronous functions - this is something that Python handles for you. While Promises are necessary for some input driven mechanics, for the most part the app avoids them. While this is not the ideal solution (obviously), the hard deadline means that only so much time can be spent learning JavaScript before applying it. 

Conceptually, it is a series of falling dominos. The initial function asks for User input, and that triggers a chain of linked functions that each process a single aspect of the whole. It is not an elegant solution, but it is one which can be implemented in the timeframe.

Testing - the app is tested during construction by regularly printing output of statements to console for review - is it what I want and can I work with the output down the line. Automated testing of the app will be added.

saveBook()

The function takes the books chosen in chooseBook(), coverts it to a JSON sting, and saves it locally to readinglist.txt

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
