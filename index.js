const mongoose= require('mongoose');
const Dishes= require('../node-mongoose/models/dishes');
const url= 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("Connect");
    var newDish= Dishes({
        name: 'bún đậu mắm tôm ',
        description : 'món ngon từ mắm tôm '
    });
    newDish.save()
    .then((dish)=>{
        console.log(dish);
        return Dishes.find({});
    })
    .then((dishes)=>{
        console.log(dishes);
        return Dishes.deleteMany();
    })
    .then(()=>{
        console.log('Deleted all dishes');
        return mongoose.connection.close;
    })
    .catch((err)=>{
        console.log(err);
    })
})