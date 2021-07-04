const mongoose=require('mongoose');
const attendance_sheet = mongoose.Schema({
            In:{type:[Date]},
            Out:{type:[Date]},
            Detector:{type:Number}
        
});
module.exports=mongoose.model('attendance_sheet',attendance_sheet);