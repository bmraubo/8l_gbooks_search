# 8l_gbooks_search
Test Assessment for 8 Light

Command line application that allows you to use the Google Books API to search for books and construct a reading list.

This application should allow you to:

Type in a query and display a list of 5 books matching that query.

Each item in the list should include the book's author, title, and publishing company.

A user should be able to select a book from the five displayed to save to a “Reading List”

View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.

#########################

The architecture of the app is limited by the fact that I have not used JavaScript before. 

printData()

I want the data to be in a consistent format before moving on with displaying it.
So everything is put into a single array. Issue is that Books generally have one title, one publisher, but several authors - too many authors would cause display issues, so the number is limited to 3. If there are more than 3 authors a plus sign is displayed. 

