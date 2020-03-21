const express = require('express');
const bodyParser = require('body-parser');
const promoModel = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
    .get((req, res, next) => {
        promoModel.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        promoModel.create(req.body)
            .then((promotion) => {
                console.log('A new Promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        promoModel.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT operation not supported on /promotions');
    })
    ;


promoRouter.route('/:promoId')
    .get((req, res, next) => {
        promoModel.findById(req.params.promoId)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put((req, res, next) => {
        promoModel.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promo) => {
                console.log('Promotion created/updated', promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        promoModel.findByIdAndDelete(req.params.promoId)
            .then((promo) => {
                console.log('Promotion deleted', promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = promotionRouter;