const mongoose= require('mongoose');
const Dishes= require('../node-mongoose/models/dishes');
const url= 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("Connect");
    // var newDish= Dishes({
    //     name: 'bún đậu mắm tôm ',
    //     description : 'món ngon từ mắm tôm '
    // });
    // newDish.save()
    Dishes.create({
        name: 'bún đậu mắm tôm 9',
        description : 'món ngon từ mắm tôm 1'
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description: 'không có mắm tôm thì vứt '}
        },{
            new:true
        })
        .exec();
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating:4,
            comment:'ngon đấy',
            author:'thái dương'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        // return Dishes.deleteMany({});
    })
    .then(()=>{
        console.log('Deleted all dishes');
        return mongoose.connection.close;
    })
    .catch((err)=>{
        console.log(err);
    })
})