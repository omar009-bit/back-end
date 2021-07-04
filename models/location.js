const mongoose=require('mongoose');
const location = mongoose.Schema({
    name:{type:String},
    type:{type:String},   
    capacity:{type:Number},
    in:{type:Number},
    reserved:{type:Boolean},
    nameofattendants:[String]
    });
module.exports=mongoose.model('location',location);