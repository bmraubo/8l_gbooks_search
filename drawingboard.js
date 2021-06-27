const req = require('request')
const inq = require('inquirer');
const Search = require('./search')

function delay(ms) {
    console.log('delaying')
    return new Promise(resolve => setTimeout(resolve, ms))
}

function Silence(ms) {
    console.log('Sitting Silently')
    return new Promise(resolve => setTimeout(resolve, ms))
}

function Awaken(ms) {
    console.log('it stirs...')
    return new Promise(resolve => setTimeout(resolve, ms))
}

function Speak() {
    console.log('RAWR')
}


//delay(3000).then(() => console.log('rawr'))

const posts = [
    {title: 'Post 1', body: 'This is post one'},
    {title: 'Post 2', body: 'This is post two'}
];

function getPosts() {
    setTimeout(() => {
        posts.forEach((post) => {
            console.log(`Title: ${post.title}\nBody: ${post.body}\n\n`)
        })
    }, 1000)
}

function createPost(post) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false
            if (!error) {
                resolve();
            } else {
                reject('Error');
            }
        }, 2000);
    });
}

function publish(answer) {
    console.log(answer)
}

///createPost({title: 'Post 3', body: 'This is post three'})
    //.then(getPosts)
    //.catch(err => console.log (err));

async function init() {
    await createPost({title: 'Post 3', body: 'This is post three'})
    getPosts()
}

//init()

function askQuery() {
    return new Promise((resolve,reject) => {
        inq
        .prompt([
            {
                name: 'bookSearch',
                message: 'Enter Search Term: '
            },
        ])
        .then(answers => {
            resolve(answers.bookSearch)
        });
    })
    //Type in query in console
     
};

async function display() {
    let searchTerm = await askQuery()
    search1 = new Search.Search(searchTerm)
    console.log(search1)
    getData(searchTerm)
}
display()

//GetData

function gBooksCall(searchUrl) {
    return new Promise((resolve,reject) => {
        req(searchUrl, function (error, response, body) {
            if (error != null) {
                // notify user if error occurs
                console.error('error: ', error);
                reject(console.log('statusCode: ', response && response.statusCode));
            } else {
                //otherwise proceed to parse data
                resolve(body);
            }
        })
    })
}

getData = async function(searchTerm) {
    let self = this
    var baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    var searchString = searchTerm.split(' ').join('+');
    var searchUrl = baseUrl + searchString;
    var body = await gBooksCall(searchUrl)
    console.log(body)
};

//ParseData
//ChooseBook
//SaveBook
//searchMenu