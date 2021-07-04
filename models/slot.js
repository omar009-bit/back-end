const mongoose = require('mongoose');

const course = require('./course.js');
RoleSchema_1 = mongoose.model('course').schema,
schema_1 = mongoose.Schema;

const location = require('./location.js');
RoleSchema_4 = mongoose.model('location').schema,
Schema_4 = mongoose.Schema;


const slot =mongoose.Schema({
    time:{type:Number},
    location:{type:RoleSchema_4},
    day:{type:String},
    course:{type:RoleSchema_1}
});
module.exports = mongoose.model('slot',slot);