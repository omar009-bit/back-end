const { request } = require('express');
const mongoose=require('mongoose');
const attendance_sheet = require('./attendance_sheet');
RoleSchema = mongoose.model('attendance_sheet').schema,
Schema = mongoose.Schema;

const requests = require('./requests.js');
RoleSchema_2 = mongoose.model('requests').schema,
Schema_2 = mongoose.Schema;

const slot = require('./slot.js');
RoleSchema_3 = mongoose.model('slot').schema,
Schema_3 = mongoose.Schema;

const location = require('./location.js');
RoleSchema_4 = mongoose.model('location').schema,
Schema_4 = mongoose.Schema;

const course = require('./course.js');
RoleSchema_5 = mongoose.model('course').schema,
Schema_5 = mongoose.Schema;


const staff=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,minLength:5,required:true},
    Day_Of_Registration:{type:Date},
    id:{type:String},
    Role:{type:String},
    name:{type:String},
    Logged_In:{type:Number},
    salary:{type:Number},
    faculty:{type:String},
    department:{type:String},
    course:{type:[RoleSchema_5]},
    In_Out_Flag:{type:Number},
    Day_OFF:{type:String},
    Achieved_Hours:{h:{type:Number},m:{type:Number}},//////////////
    Missing_Hours_Per_Month:{h:{type:Number},m:{type:Number}},
    Extra_Hours_Per_Month:{h:{type:Number},m:{type:Number}},
    Achieved_Hours_per_day:{type:Number},
    Schedule:{type:[RoleSchema_3]},
    Missing_Days_Per_Month:{type:Number},
    Location:{type:RoleSchema_4},
    attendance:{type:RoleSchema},
    ArrayofRequests:{type:[RoleSchema_2]}
        
});
module.exports=mongoose.model('staff',staff);
