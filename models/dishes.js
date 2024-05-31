const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment: { type: String, require: true },
    rating: { type: Number, min: 1, max: 5, require: true },
    author: { type: String, require: true }
}, {
    timestamps: true
});
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    comments: [commentSchema],
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },


}, {
    timestamps: true
});
var Dishes = mongoose.model('dish', dishSchema);
module.exports = Dishes;