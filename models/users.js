const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    admin:{
        type:Boolean,
        default:false
    }
})
var User= mongoose.model('/users',userSchema);
module.exports = User;