const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./require/promoRouter');
const leaderRouter = require('./require/leaderRouter');
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server </h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});