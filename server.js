//appel des modules
const express = require('express');
const bodyParser = require('body-parser');
/*const modeluser = require('./models/modeluser');*/
const apiRouter = require('./apiRouter').router;
const port = 4000

//server
const server = express();

//configuration des pré- requete sur l'objet express pour boydParser authentification http
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//middlewares pour verifié l'url
server.use((req, res, next) => {
    console.log(`url : ${req.url}`);
    next()
});

//configuration routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html') //configuration en tête server
    res.status(200).send('<h1>Bonjour server.js</h1>')
});

//configuration route 
server.use('/api/', apiRouter);
/*server.get('/modeluser', (req, res) => {
    const products = [
        {id: 1, name: "will",},
        {id: 2, name: "willy",},
        {id: 3, name: "william",},
        {id: 4, name: "will-anna",},
    ];
    res.send(products);
});*/
//configuration port
server.listen(port, () => {
    console.log(`server en écoute sur le ${port}!`);
});