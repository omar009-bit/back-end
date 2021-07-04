const mongoose=require('mongoose');

const slot = require('./slot.js');
RoleSchema_4 = mongoose.model('slot').schema,
schema_4 = mongoose.Schema;

const requests = mongoose.Schema({
            type:{type:String},
            acceptance:{type:String},
            comment:{type:String},
            emailFrom:{type:String},
            emailTo:{type:String},
            emailToS:{type:String},
            content:{type:String},
            day:{type:String},
            slot:{type:RoleSchema_4}
});
module.exports = mongoose.model('requests',requests);