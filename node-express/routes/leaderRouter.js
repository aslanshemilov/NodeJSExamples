var express = require('express');
var bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get(function(req,res,next){
	res.end('Will send all the leaders to you!');
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported by /leaders');
})
.post((req, res, next) => {
	res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
	res.end('Deleting all leaderships');
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
})
.put((req, res, next) => {
	res.write('Updating the leadership: ' + req.params.leaderId + '\n');
	res.end('Will update the leadership: ' + req.body.name + 
			' with details: ' + req.body.description);
})
.post((req, res, next) => {
	res.write('Updating the leader: ' + req.params.leaderId + '\n');
	res.end('Will update the leader: ' + req.params.leaderId);
})
.delete(function(req, res, next){
	res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;
