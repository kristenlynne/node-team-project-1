const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const recipes = require('./recipes.json')
const PORT = 3000

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    const getRecipe = (recipeName) => {
        let recipe = recipes.filter(e => e.name.toLowerCase() === recipeName.toLowerCase())
        console.log('recipe:', recipe)
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
            console.log('food name: ', params.food)
            getRecipe(params.food)
        } else {
            fs.readFile('recipes.json', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                    const recipes = JSON.parse(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(recipes))
                }
            })
        }
    }
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

// server.listen(3000);

server.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})
