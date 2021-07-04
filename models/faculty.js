const mongoose=require('mongoose');
const Department = require('./department');
RoleSchema = mongoose.model('department').schema,
Schema = mongoose.Schema;

const faculty = mongoose.Schema({
    name:{type:String},
    departments:{type:[RoleSchema]}
});

module.exports=mongoose.model('faculty',faculty);