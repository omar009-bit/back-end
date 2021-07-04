const mongoose=require('mongoose');
const Course = require('./course');
RoleSchemas = mongoose.model('course').schema,
Schema = mongoose.Schema;

const department = mongoose.Schema({
    name:{type:String},
    courses:{type:[RoleSchemas]}
});

module.exports=mongoose.model('department',department);