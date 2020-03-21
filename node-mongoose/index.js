const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'Test'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(() => {
        console.log(err);
    });
});