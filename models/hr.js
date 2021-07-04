const mongoose=require('mongoose');
const attendance_sheet = require('./attendance_sheet');
RoleSchema = mongoose.model('attendance_sheet').schema,
Schema = mongoose.Schema;
const hr=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,minLength:5,required:true},
    id:{type:String},
    Role:{ type:String},
    Logged_In:{type:Number},// 0:out,1:in
    name:{ type:String},
    salary:{ type:Number},
    In_Out_Flag:{type:Number},
    Day_OFF:{type:String,default:"saturday"},
    Missing_Hours_Per_Month:{h:{type:Number},m:{type:Number}},
    Achieved_Hours:{h:{type:Number},m:{type:Number}},
    Extra_Hours_Per_Month:{h:{type:Number},m:{type:Number}},
    Missing_Days:{type:Number},
    attendance:{type:RoleSchema},
    OfficeLocation:{type:String}
});
module.exports=mongoose.model('HR',hr);