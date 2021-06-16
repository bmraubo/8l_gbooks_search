# 8l_gbooks_search
A CLI Google Books search app with locally-stored Reading List function

- [Requirements](#Requirements)
- [Using the App](#Using-the-App)
    - [Saving Books](#Saving-Books)
- [Brief](#Brief)
- [Technical Summary](#Technical-Summary)
- [Description of Process](#Description-of-Process)
    - [Creating a functioning application](#Creating-a-functioning-application)
        - [Search Feature](#Search-Feature)
        - [Reading List Feature](#Reading-List-Feature)
    - [Considering Useability](#Considering-Useability)
    - [Elegance](#Elegance)

---

## Requirements

[Node.js v14.17.0](https://nodejs.org/)

[Inquirer 8.1.0](https://github.com/SBoudrias/Inquirer.js/)

[Requests 2.88.2](https://github.com/request/request)

## Using the App

App can be run from Terminal/Cmd with the command $node app.js

### Saving Books

Running a search will display an Inquirer checkbox list of 5 results using. The list can be navigated using the **up/down** arrows. Use **Space** to select the book(s) you wish to save to the reading list. Press '**a**' to select all. Press '**i**' to invert the selection. 

Pressing '**Enter**' saves the book(s) to the reading list.

## Brief

Command line application that allows you to use the Google Books API to search for books and construct a reading list.

This application should allow you to:

- Type in a query and display a list of 5 books matching that query.

- Each item in the list should include the book's author, title, and publishing company.

- A user should be able to select a book from the five displayed to save to a “Reading List”

- View a “Reading List” with all the books the user has selected from their queries. This is a local reading list and not tied to Google Books’s account features.

## Technical Summary

The app fulfills all the design requirements. The greatest challenge was the need to learn a new programming language. Javascript was chosen because node.js suitability for the task, similarity to my known language of Python, and popularity (and therefore value of this project as a learning exercise). Due to the limited amount of time and lack of familiarity with the language, the design of the app was in large part influenced by the need to avoid asynchronous functions, a concept that I could not grasp in time. The price for this trade off is the rather inelegant design and circular dependecy issues.   

Inquirer is used as it is a well maintained, reliabile library for managing user input. While the inbuilt 'readlines' could be used to achieve the same purpose, the improvements to user experience with Inquirer make it the better choice for the job. I do not think that the use of Inquirer circumvents the complexity of the task.

The app consists of two files - app.js that controls initial user interactions, and search.js which houses the functions responsible for the Search feature and View Reading List Feature. Initially, Search and View Reading List functions were kept within seperate files, however combining the two was the cheapest solution to circular dependency issues. This causes a forseeable problem with expandability - the circular dependency issue will re-emerge should the size of search.js become unmanagable. The solution lies in gaining a greater understanding of asynchronous functions and callbacks, and refactoring on that basis.

Upon launching the app, the user is presented with a Main Menu. Based on the user's choice, it will run imported functions from search.js. Conceptually, once the initial choice is made, the  role of app.js is complete - all further 'work' is done by the looping code within search.js.

The Search Feature consists of a function that accepts user input, and subsequently triggers a chain of functions responsible for making the API call, parsing the response JSON, extracting the relevant information, and using Inquirer to display the information. the app awaits user input to indicate if any of the books are to be saved, and subsequently saves them in readinglist.json. The final function in the sequence uses Inquirer to create a menu with options for running another search, viewing the reading list, or quiting the app.

The View Reading List feature allows the user to view all saved books in the order that they were saved. It parses the readinglist.json and unpacks the information before printing it for the user. The user is then presented with an Inquirer menu allowing them to run a search or quit the app.

## Description of Process

### Creating a functioning application 

The architecture of the app is limited by the fact that I have not used JavaScript before. Therefore the whole thing has to be built around holes in my knowledge in order to deliver a working final product. I am thinking in Python, but writing JS.

The main difference/difficulty I have found is the concept of asynchronous functions - this is something that Python handles for you. While Promises are necessary for some input driven mechanics, for the most part the app avoids them. While this is not the ideal solution (obviously), the hard deadline means that only so much time can be spent learning JavaScript before applying it. 

**Testing**

 The app is tested during construction by regularly printing output of statements to console for review - is it what I want and can I work with the output down the line.

#### Search Feature

The purpose of the Search Feature is to meet the first 3 project requirements:

- Type in a query and display a list of 5 books matching that query.

- Each item in the list should include the book's author, title, and publishing company.

- A user should be able to select a book from the five displayed to save to a “Reading List”

*askQuery()*

Uses inquirer to ask user for search term. Following input, sends the search term into the runSearch() function. 

*runSearch()*

Takes the search terms from askQuery() and prepares the string for combinining with the GoogleBooks API call. 

Uses request lib to run the search and obtain reponse, from which the body is then extracted for parsing in the parseData() function. 

Output is the response body.

*parseData()*

Unpacks the Google Books API reponse into usable data and extracts the desired information. Lot of overlap with printData() (which is not accurately named anyway, so it may be a good idea to combine the two functions.

*printData()*

I want the data to be in a consistent format before moving on with displaying it.
So everything is put into a single array. 

Issue is that Books generally have one title, one publisher, but several authors - too many authors would cause display issues, so the number is limited to 3. If there are more than 3 authors a plus sign is displayed. 

Perhaps combine it with parseData?

*chooseBook()*

Uses inquirer to create a interactive list of results. While this could be accomplished by printing a the results and then allowing manual user input in the form of 'Select Book to save (1-5)...', inquirer is just much nicer to deal with.

The display of data within the results list - inquirer checkboxes use the name: value. As inquirer returns the answers in an unwieldy way (this is likely due to a fault in my own code, but I could not diagnose what causes it), I have used values: to save each answer as a object with the title, authors and publisher for processing by the saveBook() function. 

*saveBook()*

The function takes the books chosen in chooseBook(), coverts it to a JSON sting, and saves it locally to readinglist.json.

Problems emerged with the Reading List when the app was used more than once. Essentially two lists are created and the JSON parser in parseFile() struggles. Instinctively, I thought to deal with this would be check whether a JSON already exists, and if so, extract the data, add new books, then stringify again. I googled for a more efficient way, however this seemed to be the common practice.

However, this was harder to resolve than expected. The extracted parsedData would not accept push() - Typeof testing showed it was an object - despite being in square brackets.

I tried merge(), however that replaced the values apready present.

There was an old StackOverflow post which stated that a quirk of JavaScrpt was that Typeof returned Arrays as Objects. However this would not explain why the push() function would not work.

I never actually resolved why my approach was wrong here.  Eventually, searching StackOverflow led to to contact:

`parsedData = parsedData.concat(chosenBooks)`

This achieved the desired outcome.

#### Reading List Feature

This is contained in a seperate file, as ultimately I want the app to launch into a menu from which search and view reading list would be seperate options.

Viewing the reading list has some of the JS familiarity issues found above, but is generally a much simpler concept. 2 functions - one to extract and parse the JSON data, the other to display it. 

Finally a menu function to allow return to main menu - this one will be done in readlines to demonstrate capability with inbuilt module and use answer validation. The other option will quit the app. 

### Considering Useability

Once I had working features that accomplished the tasks set out in the requirements, I turned my attention to considering how the app is going to be used, and how to facilitate those use cases.

One of the considerations is the ease of maintaining the app, and extending it to include new features. The main way of doing this is by looking at the architectural design of the app. This is where I encountered the greatest difficulties and my lack of knowledge of JavaScript shows. 

**Navigation**

I want the app to start with a welcome screen that describes what it is, what it does, and provides access to the 2 main features - reading list and search function.

After running the search function, I want the app to ask to return to menu or run another search. I imagine this will involve callbacks. 

After viewing the reading list, I want the app to ask to go back to menu or exit.

Then I can turn to architecture...

*mainMenu()*

*searchMenu()*

An Inquirer menu that includes option for running another search, viewing the reading list or exiting the app.

The options cover the all potential usage cases of the app (per the brief) by the user, and prevent a need to restart the app, which breaks immersion within the app environment.

*listMenu()*

**Architecture**

**Edge Cases and Testing**

### Elegance



