const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const recipes = require('./recipes.json')

// const apiCall = (_recipeName, _ingredients, _instructions) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     const objToJson = {
//         recipeName: _recipeName,
//         ingredients: _ingredients,
//         instructions: _instructions
//     }
//     res.end(JSON.stringify(objToJson));
// }
 
// console.log(fs.readFile('recipes.json', 'utf8', (err, data) => { console.log(data) })); '))

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);

    const getRecipe = (recipeName) => {
        let recipe = recipes.filter(e => e.name === recipeName)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(recipe));
    }

    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (page == '/api') {
        if ('food' in params) {
            console.log(params.food)
            getRecipe(params.food)
            // if (params['food'] == 'spaghetti') {
            //   res.writeHead(200, {'Content-Type': 'application/json'});
            //   const objToJson = {
            //     name: 'spaghetti',
            //     ingredients: ['noodles', 'tomato sauce', 'cheese'],
            //     instructions: 'boil noodles, add tomato sauce, add cheese, cook for 20 minutes'
            //   }
                
            // }//student = leon
            // else if (params['student'] != 'leon') {
            //     res.writeHead(200, { 'Content-Type': 'application/json' });
            //     const objToJson = {
            //         name: "unknown",
            //         status: "unknown",
            //         currentOccupation: "unknown"
            //     }
            //     res.end(JSON.stringify(objToJson));
            // }//student != leon
        }//food if
    }//else if
    else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    } else {
        figlet('404!!', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
        });
    }
});

server.listen(3000);
