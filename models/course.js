const mongoose=require('mongoose');

const course = mongoose.Schema({
    name:{type:String}
});

module.exports=mongoose.model('course',course);