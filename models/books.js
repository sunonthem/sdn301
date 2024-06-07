const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const genres= require('./genres');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment: { type: String, require: true },
    rating: { type: Number, min: 1, max: 5, require: true },
    author: { type: String, require: true }
}, {
    timestamps: true
})
const genreSchema =new Schema({
    genre:{type: mongoose.Schema.Types.ObjectId, ref:"Genre", require:true},
    name:{
        type:String, 
        required:true,
        unique:true
    }
},{
    timestamps:true
})
const bookSchema = new Schema({
    isbn:{
        type: String,
        required:true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    publish_date: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    pages: {
        type: Number,
        required: true,
        min: 0
    },
    website: {
        type: String,
        require: true
    },
    comments: [commentSchema],
    genre:[genreSchema]
    
    
}, {
    timestamps: true
});
var Books = mongoose.model('books', bookSchema);
module.exports = Books;