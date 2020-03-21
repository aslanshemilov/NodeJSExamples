var express = require('express');
var bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.routee('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the promotions to you!');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
}) 
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get(function(req,res,next){
    res.end('Will send details of the promo: ' + req.params.promoId +' to you!');
})
.put(function(req, res, next){
    res.write('Updating the promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.post((req, res, end) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion' + req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoID)
});

module.exports = promoRouter;