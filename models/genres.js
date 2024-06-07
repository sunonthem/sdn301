const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Schema = mongoose.Schema;
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
var Genres = mongoose.model('genre', genreSchema);
module.exports = Genres;