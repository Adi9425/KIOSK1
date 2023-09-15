const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const LoginSchema = new Schema({
    email : String,
    Name : String,
    Mobile_NO: Number,
    age:Number,
    description : String
})
module.exports = mongoose.model('Data',LoginSchema);