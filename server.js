//appel des modules
const express = require('express');
const bodyParser =require('body-parser');
const apiRouter = require('./apiRouter').router;
const port = 8081



//server
const server = express();

//authentification http
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

//configuration routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html') //configuration en tête server
    res.status(200).send('<h1>Bonjour server.js</h1>')
});

//configuration router 
server.use('/api/', apiRouter);

//configuration port
server.listen(port, () => {
    console.log('server en écoute');
});