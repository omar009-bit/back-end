
const express = require('express');
const app = express();
const PORT = 1000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(PORT,()=>{
    console.log(`the server is up and running on port number ${PORT}`);
});
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors= require('cors');
app.use(cors());
const bcrypt=require('bcryptjs');
const staff=require('./models/staff.js');
const hr =require('./models/hr.js');
const location = require('./models/location.js');
const faculty =require('./models/faculty.js');
const department =require('./models/department.js');
const attendance_sheet=require('./models/attendance_sheet.js');
const course = require('./models/course.js');
const requests = require('./models/requests.js');
const slot = require('./models/slot.js');

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
// const URL = "mongodb://Omar:123@cluster0-shard-00-00.zp9kz.mongodb.net:27017,cluster0-shard-00-01.zp9kz.mongodb.net:27017,cluster0-shard-00-02.zp9kz.mongodb.net:27017/GUC?ssl=true&replicaSet=atlas-l7ocwn-shard-0&authSource=admin&retryWrites=true&w=majority";
const URL = "mongodb://ARKhaled:Bodyflash149@cluster0-shard-00-00.ahlri.mongodb.net:27017,cluster0-shard-00-01.ahlri.mongodb.net:27017,cluster0-shard-00-02.ahlri.mongodb.net:27017/finaldatabase?ssl=true&replicaSet=atlas-9lyluq-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(URL,connectionParams).then(()=>{
    console.log("connected successfully to Database");
}).
catch(()=>{
    console.log(" failed to connect to Database");
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const auth = (req,res,next)=>{
    try{
        const token = req.header('x-auth-token');
        const jwt_password = "Bodyflash149$";
        const verified = jwt.verify(token,jwt_password);
        if(!verified){
           return  res.json({msg:"Not Authorized"});
        }
        req.user = verified._id;
        req.role= verified.role;
        req.m=verified.m;
        console.log(verified);
        next();
        // return res.json({msg:"ok"})
    }
    catch(error){
        console.log({error:error.message});
        return res.json({error:error.message,msg:error.message});
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/register',async(req,res)=>{
    try{
        let{email,password,passwordCheck,Role,name,In_Out_Flag,Missing_Hours,Extra_Hours,
            Achieved_Time_per_day,Missing_Days,salary,Logged_In,attendance}=req.body;
        if(!email||!password||!passwordCheck){
            console.log("Please Enter Valid Requested Info ");
            return res.json({msg:"Please Enter Valid Requested Info "});
        }
        if(!name){
            name=req.body.email;
        }
        if(password!=passwordCheck){
            console.log("Please enter the same password twice");
            return res.json({msg:"Please enter the same password twice"});
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const documentCount = await hr.count({});
        var NewID = 1 + documentCount;
        const IDString = "hr-" + NewID;
        const existingHR = await hr.findOne({email:email});
        if(existingHR){
            console.log("HR email already exists");
             return res.json({msg:"HR email already exists"});
        }
        const existingUSer1 = await staff.findOne({email:email});
        if(existingUSer1){
             return res.json({msg:"Email Already Exists"});
        }
       let attendanceTemp=new attendance_sheet();
        const newHR = new hr({
                email:email,
                password:hashedPassword,
                Role:"HR",
                name:name,
                In_Out_Flag:0,
                Missing_Hours_Per_Month:{h:0,m:0},
                Extra_Hours_Per_Month:{h:0,m:0},
                Achieved_Hours:{h:0,m:0},  
                Missing_Days:0,
                salary:0,Logged_In:0,
                id:IDString,
                attendance:attendanceTemp
            });
        const savedHR = await newHR.save();
        console.log(savedHR);
        return res.json({msg:"Created Successfuly!!"});
    }
    catch(error){
        console.log(error.message);
        return res.json({error:error.message});
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/login',async(req,res)=>{
    try{
        let {email,password}=req.body;
        // console.log(1);
        if(!email||!password){
            return res.send({msg:"Please Enter Valid Email and Password"});
        }
        const existingUser = await staff.findOne({email:email});
        // console.log(existingUser);
        const existingHR = await hr.findOne({email:email});
        // console.log(existingHR);
        if(!existingHR&&!existingUser){
            // console.log("Email doesn't exist");
            return res.send({msg:"Email doesn't exist"});
        }
        if(existingHR){
            const isMatchedHR = await bcrypt.compare(password,existingHR.password);
            // console.log(isMatchedHR);
            if(!isMatchedHR){
                // console.log("Invalid Credentials");
                return res.send({msg:"Invalid Credentials"});
            }
            // if(existingHR.Logged_In==0){
            const UpdatedHR = await hr.findOne({email:req.body.email});
            const jwt_password = "Bodyflash149$";
            const token = jwt.sign({id:existingHR._id,role:existingHR.Role,m:existingHR.email},jwt_password);
            const UpdatedHR2 = await hr.findOneAndUpdate({email:req.body.email},{Logged_In:1});
            // console.log(token,"Logged in successfully",UpdatedHR2);
            return res.json({token:token,msg:"Logged in successfully",User:UpdatedHR2,key:UpdatedHR2._id});
            
            // }
            // else{
            //     // console.log("Already Logged In");
            //     return res.send({msg:"Already Logged In"});
            // }
        }
        if(existingUser){
            const isMatched = await bcrypt.compare(password,existingUser.password);
            console.log(isMatched);
            if(!isMatched){
                console.log("Invalid Credentials");
                return res.json({msg:"Invalid Credentials"});
            }
            // if(existingUser.Logged_In==1){
            //     return res.send({msg:"Already Logged In"});
            // }
            // if(existingUser.Logged_In==0){
            const UpdatedUser = await staff.findOne({email:req.body.email});
            const jwt_password = "Bodyflash149$";
            console.log(existingUser.Role);
            const token = jwt.sign({id:existingUser._id,role:existingUser.Role,m:existingUser.email},jwt_password);
            const UpdatedUser2 = await staff.findOneAndUpdate({email:req.body.email},{Logged_In:1});
            // console.log(token,"Password Should Be Updated",UpdatedUser2);
            return res.json({token:token,msg:"Logged in successfully",User:UpdatedUser2,key:UpdatedUser2._id});
            // }
            // else{
            //     console.log("Already Logged In");
            //     return res.send({msg:"Already Logged In"});
            // }
        } 
    }
    catch(error){
        // console.log(error.message);
        res.send({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////
app.use(auth);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/signin',async(req,res)=>{
    try{
        // const {email,password}=req.body;
        // if(!email||!password){
        //     return res.status(400).json({msg:"Please Enter Valid Email and Password"});
        // }
        const existingUser = await staff.findOne({email:req.m});
        var today1=new Date();
        if(!existingUser){
            const existingHR = await hr.findOne({email:req.m});
            if(!existingHR){
                return res.json({msg:"not registered"});
            }
            // const isMatchedHR = await bcrypt.compare(password,existingHR.password);
            // if(!isMatchedHR){
            //     return res.json({msg:"Invalid HR Credentials"});
            // }
            if(existingHR.Logged_In==1){ 
                let Arr= await hr.findOne({email:req.m});
                let arr=Arr.attendance.In.push(today1);
                const UpdatedHR = await hr.findOneAndUpdate({email:req.m},{In_Out_Flag:1,
                    attendance:{In:Arr.attendance.In,Out:Arr.attendance.Out,Detector:1}});
                console.log(UpdatedHR);
                return res.json({msg:"Signed In Successfully"});
            }
            else{ 
                return res.json({msg:" invalid"});
            }
        }
        // const isMatched = await bcrypt.compare(password,existingUser.password);
        // if(!isMatched){
        //     return res.status(400).json({msg:"Invalid Credentials"});
        // }
        if(existingUser.Logged_In==1){ 
            let Arr= await staff.findOne({email:req.m});
            let arr=Arr.attendance.In.push(today1);
            const UpdatedUser = await staff.findOneAndUpdate({email:req.m},{In_Out_Flag:1,
                attendance:{In:Arr.attendance.In,Out:Arr.attendance.Out,Detector:1}});
            return res.json({msg:"Signed In Successfully"});
        }
        else{ 
            return res.json({msg:"invalid"});
        }
    }
    catch(error){
       return  res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/logout',async(req,res)=>{
    try{ 
        // const {email}=req.body;
        const existingUser = await staff.findOne({email:req.m});
        const existingHR = await hr.findOne({email:req.m});
        if(!existingHR&&!existingUser){
            return res.json({msg:"User not found"});
        }
        if(existingHR){
            if(existingHR.Logged_In==1){
                const UpdatedHR2 = await hr.findOneAndUpdate({email:req.m},{Logged_In:0});
                return res.json({msg:"Logged Out Successfully"});
            }
            else{
                return res.json({msg:"Already Logged out"});
            }
        }
        if(existingUser){
            if(existingUser.Logged_In==1){
                const UpdatedUser2 = await staff.findOneAndUpdate({email:req.m},{Logged_In:0});
                return res.json({msg:"Logged Out Successfully"});
            }
            else{
                return res.json({msg:" Already Logged out"});
            }  
        }
    }
    catch(error){
       return  res.json({error:error.message});
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/signout',async(req,res)=>{
    try{ 
        const existingUser = await staff.findOne({email:req.m});
        var today1=new Date();
        if(!existingUser){
            const existingHR = await hr.findOne({email:req.m});
            if(!existingHR){
                return res.json({msg:"HR is not registered"});
            }
            if(existingHR.In_Out_Flag==1&&existingHR.Logged_In==1){ 
                let Arr= await hr.findOne({email:req.m});
                let arr=Arr.attendance.Out.push(today1);
                let arr2=Arr.attendance.In[Arr.attendance.In.length-1];
                const me=Arr.Achieved_Hours.m;
                const he=Arr.Achieved_Hours.h;
                let h2=today1.getHours()-arr2.getHours();
                let m2=today1.getMinutes()-arr2.getMinutes();
                const x = h2+ he;const newX=x;
                const y = m2+ me;const newY=y;
                const newX2=newX+Math.floor(newY/60);
                const newY2=newY%60;
                const UpdatedHR = await hr.findOneAndUpdate({email:req.m},
                    {In_Out_Flag:0,Achieved_Hours:{h:newX2,m:newY2},attendance:{Out:Arr.attendance.Out,In:Arr.attendance.In,Detector:0}});
                console.log(UpdatedHR);
                return res.json({msg:"Signed Out Successfully"});
                
            }
            else{
               return res.json({msg:"Invalid"});
            }
        }
        if(existingUser.In_Out_Flag==1&&existingUser.Logged_In==1){
            let Arr= await staff.findOne({email:req.m});
                let arr=Arr.attendance.Out.push(today1);
                let arr2=Arr.attendance.In[Arr.attendance.In.length-1];
                console.log(arr2);console.log(Arr);
                let me=Arr.Achieved_Hours.m;
                console.log({me:me});
                const he=Arr.Achieved_Hours.h;
                let h2=today1.getHours()-arr2.getHours();
                let m2=today1.getMinutes()-arr2.getMinutes();
                const x = h2+ he;const newX=x;
                const y = m2+ me;const newY=y;
                const newX2=newX+Math.floor(newY/60);
                const newY2=newY%60;
            const UpdatedUser = await staff.findOneAndUpdate({email:req.m},
                {In_Out_Flag:0,Achieved_Hours:{h:newX2,m:newY2},attendance:{Out:Arr.attendance.Out,In:Arr.attendance.In,Detector:0}});
                console.log(UpdatedUser);
            return res.json({msg:"Signed Out Successfully"});
        }
        else{
           return  res.json({msg:"invalid"});
        }
    } 
    catch(error){
        return res.json({error:error.message});
    }
}); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewProfile' ,async(req,res)=>{
    try{
    const existingUser = await staff.findOne({email:req.m});
    console.log(req.role,req.m);
    if(req.role.localeCompare("HR")!=0){
        if(!existingUser){
            console.log("Does not exist")
            return res.json({msg:"Does not exist"});
        }else{
            console.log(existingUser);
         return res.json({msg:"ok",existingUser});
        }
    }
    if(req.role.localeCompare("HR")==0){
        const existingHR=await hr.findOne({email:req.m});
        if(!existingHR){
            console.log("Does not exist")
            return res.json({msg:"Does not exist"});
        }else{
            console.log(existingHR);
            return res.json({msg:"ok",existingHR});
        }
    }
    }
    catch(error){
        console.log({error:error.message});
        return res.json({error:error.message});
    }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewMissingAndExtraTime' ,async(req,res)=>{   
    try{
        if(req.role.localeCompare("HR")==0){
            const existingHR=await hr.findOne({email:req.m});
            if(!existingHR){
                return res.json({msg:" Does not exist"});
            }
             return res.json({msg:"ok",MissingHours:existingHR.Missing_Hours_Per_Month,ExtraHours:existingHR.Extra_Hours_Per_Month});
        }else if(req.role.localeCompare("HR")!=0){
            const existingUser=await staff.findOne({email:req.m});
            if(!existingUser){
                return res.json({msg:" Does not exist"});
            }
            return res.json({msg:"ok",MissingHours:existingUser.Missing_Hours_Per_Month,ExtraHours:existingUser.Extra_Hours_Per_Month});
        }
    }  catch(error){
        return res.json({error:error.message});
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateProfile',async(req,res)=>{
    try{
        console.log(req.m,req.role);
        let{newemail}=req.body;
        if(!newemail){
            return res.json({msg:"Please Enter Valid Info"});
        }
        const existingHR = await hr.findOne({email:newemail});
        const existingUser = await staff.findOne({email:newemail});
        if(existingHR || existingUser){
            return res.json({msg:"Email already exixts"});
        }
        else{
            const existingHR2 = await hr.findOne({email:req.m});
            const existingUser2 = await staff.findOne({email:req.m});
            if(existingUser2){
                if(!req.body.Day_OFF){
                    const UpdatedUser = await staff.findOneAndUpdate({email:req.m},{email:newemail,Logged_In:0});
                    return res.json({msg:"Updated Successfully"});               
                }
                const UpdatedUser = await staff.findOneAndUpdate({email:req.m},{email:newemail,Day_OFF:req.body.Day_OFF,Logged_In:0});
                return res.json({msg:"Updated Successfully"});
            }
            else{
                const UpdatedHR = await hr.findOneAndUpdate({email:req.m},{email:newemail,Logged_In:0});
                return res.json({msg:"Updated Successfully"});
            }
        }
        
    }
    catch(error){
        return res.json({error:error.message});
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ResetPassword',async(req,res)=>{
    try{
        console.log(req.role,req.m);
        let{password}=req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        if(req.role.localeCompare("HR")==0){
            const existingHR2 = await hr.findOne({email:req.m});
            if(!existingHR2){
                return res.json({msg:" Does not exist"});
            }else{
                const UpdatedHR = await hr.findOneAndUpdate({email:req.m},{password:hashedPassword,In_Out_Flag:0});
                return res.json({msg:"Password Updated"});
             }
        }else{
            const existingUser2 = await staff.findOne({email:req.m});
            if(existingUser2){
                const UpdatedUser = await staff.findOneAndUpdate({email:req.m},{password:hashedPassword,In_Out_Flag:0});
                return res.json({msg:"Password Updated"});
            }else{
                return res.json({msg:" Does not exist"});
            }
        } 
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/viewAttendanceTotal',async(req,res)=>{
    try{
        const existingUser4=await staff.findOne({email:req.m});
        if(!existingUser4){
            const existingHR4=await hr.findOne({email:req.m});
            if(existingHR4){
                let arr=existingHR4.attendance.In;
                let arr2=existingHR4.attendance.Out;
                if(arr.length==0&&arr2.length==0){
                    return res.json({msg:"No Attendance Recorded",In:arr,Out:arr2});

                }
                else{
                    return res.json({msg:"ok",In:arr,Out:arr2});
                }
               
            }else{
                return res.json({msg:"Invalid"});
            }
        }
        else{
            let arr=existingUser4.attendance.In;
            let arr2=existingUser4.attendance.Out;
            if(arr.length==0&&arr2.length==0){
                return res.json({msg:"No Attendance Recorded",In:arr,Out:arr2});
            }
            else{
                return res.json({msg:"ok",In:arr,Out:arr2});
            }
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/viewAttendanceMonthly',async(req,res)=>{
    try{
        let{month}=req.body;
        if(!month){
            return res.json({msg:"Please Enter Valid Info"});
        }
        const existingUser4=await staff.findOne({email:req.m});
        if(!existingUser4){
            const existingHR4=await hr.findOne({email:req.m});
            if(existingHR4){
                let arr=existingHR4.attendance.In;
                let arr2=existingHR4.attendance.Out;
                let x= arr.filter((arr) => (arr.getMonth()+1) ==month);
                let y= arr2.filter((arr2) => (arr2.getMonth()+1) ==month);
               return  res.json({msg:"ok",In:x,Out:y});
            }else{
                return res.json({msg:"Invalid"});
            }
        }
        else{
            let arr=existingUser4.attendance.In;
            let arr2=existingUser4.attendance.Out;
            let x= arr.filter((arr) => (arr.getMonth()+1) ==month);
            let y= arr2.filter((arr2) => (arr2.getMonth()+1) ==month);
            return res.json({msg:"ok",In:x,Out:y});
        }        
    }
    catch(error){
       return  res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AddLocation',async(req,res)=>{
    try{ 
        let {name,type,capacity,In,reserved,nameofattendants}=req.body;
        console.log(req.role);
        if(req.role.localeCompare("HR")==0){
            if(!name||!type||!capacity){
                return res.json({msg:"Please Enter Valid location"});
            }
            const existingLocation = await location.findOne({name:name});
            if(existingLocation){
                return res.json({msg:"Location already exists"});
            }
            const newLocation = new location({
                    name:name,
                    type:type,
                    capacity:capacity,
                    in:0,
                    reserved:false,
                    nameofattendants:[]
                });
            const savedLocation = await newLocation.save();
            return res.json({msg:"Location added successfully"});
                }
        else{
            return res.json({msg:"You are NOT an HR"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateLocation',async(req,res)=>{
    try{
        var n = req.role.localeCompare("HR");
        if(n==0){      
            let{oldName,newName} = req.body;
            if(!oldName||!newName){
                return res.json({msg:"Please Insert Valid Info"});
            }
            if(oldName.localeCompare(newName)==0){
                return res.json({msg:"Enter different names"});
            }
            const Already = await location.findOne({name:newName});
            const Already2 = await location.findOne({name:oldName});
            if(!Already2){
                return res.json({msg:"Location doesn't exist"});
             }
            if(Already){
                return res.json({msg:"already exists"});
            }
            const UpdatedLocation = await location.findOneAndUpdate({name:oldName},
                                                                        {name:newName});
                
                return res.json({msg:"Location Updated Successfully",Location:UpdatedLocation});
        }
        else{
            return res.json({msg:"You are not an HR"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteLocation',async(req,res)=>{
    try{  
        console.log(req.role);
        let{name}=req.body;
        if(req.role.localeCompare("HR")==0){
            console.log(req.body.name);
            if(!name){
                return res.json({msg:"Please Insert Valid Info"});
            }
            const find = await location.findOne({name:name});
            if(!find){
                return res.json({msg:"The location is already deleted"});
            }     
            const constdeleted = await location.findOneAndDelete({name:name});
            return res.json({msg:"Location Deleted Successfully"});
        }else{
            return res.json({msg:"Invalid"});
        }
    }
    catch(error){
        res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AddFaculty',async(req,res)=>{
    try{
        let{name}=req.body;
        const existingHR = await hr.findOne({email:req.m});
        if(!existingHR||!name){
            return res.json({msg:"invalid info"});
        }
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!name){
                return res.json({msg:"Please Enter Valid Faculty Name"});
            }
            const existingFaculty = await faculty.findOne({name:name});
            if(existingFaculty){
                return res.json({msg:"Faculty already exists"});
            }
            x=new department();
            const newFaculty = new faculty({
                name:req.body.name,
                departments:x
            });
            const savedFaculty = await newFaculty.save();
           return res.json({msg:"Faculty added successfully",Faculty:savedFaculty});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
       return res.json({error:error.message});
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateFaculty',async(req,res)=>{
    try{
        let{name,newname}=req.body;
        if(!name||!newname){
            return res.json({msg:"invalid info"});
        }
        const existingHR = await hr.findOne({email:req.m});
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!name){
                return res.json({msg:"Please Enter Valid Faculty Name"});
            }
            if(name.localeCompare(newname)==0){
                return res.json({msg:"Faculty can't be updated"});
            }
            const fac = await faculty.findOne({name:newname});
            if(fac){
                return res.json({msg:"Faculty already updated"});
            }
            const existingFaculty = await faculty.findOneAndUpdate({name:name},{name:newname});
            if(!existingFaculty){
                return res.json({msg:"Faculty doesn't exist"});
            }
            return res.json({msg:"Faculty Updated Successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteFaculty',async(req,res)=>{
    try{ 
        let{name}=req.body;
        if(!name){
            return res.json({msg:"invalid info"});
        }
        const existingHR = await hr.findOne({email:req.m});
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!name){
                return res.json({msg:"Please Enter Valid Faculty Name"});
            }
            const fac = await faculty.findOne({name:name});
            if(!fac){
                return res.json({msg:"Faculty already deleted"});
            } 
            const constdeleted = await faculty.findOneAndRemove({name:name});
            return res.json({msg:"Faculty Deleted Successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        return res.json({error:error.message});

    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AddDepartment',async(req,res)=>{
    try{
        if(req.role.localeCompare("HR")==0){

        let{departmentName,facultyName}=req.body;
            if(!departmentName||!facultyName){
                return res.json({msg:"Please Enter Valid info"});
            }
            const existingFaculty = await faculty.findOne({name:facultyName});
            if(!existingFaculty){
                return res.json({msg:"Faculty doesn't exist"});
            }
            const existingDepartment = await department.findOne({name:departmentName});
            if(existingDepartment){
                return res.json({msg:"Department already exists"});
            }
            const  c = new course();
            const newDepartment = new department({name:departmentName,course:c});
            if(!existingDepartment){
               const savedDepartment = await newDepartment.save();
            }
            if(existingFaculty){
                let arr = existingFaculty.departments;
                let x = arr.push(newDepartment);
                const updatedDepartement = await faculty.findOneAndUpdate({name:facultyName},{departments:arr});
                return res.json({msg:"Added and updated Successfully"});
            }
        }else{
            return res.status(400).json({msg:"Invalid Functionality"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateDepartment',async(req,res)=>{
    try{
        
        let{oldDepartmentName,newDepartmentName,facultyName}=req.body;
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!oldDepartmentName||!newDepartmentName||!facultyName){
                return res.json({msg:"Please Enter Valid  Info"});
            }
            if(oldDepartmentName.localeCompare(newDepartmentName)==0){
                return res.json({msg:"Please Enter a new Name"});
            }
            const existingDepartment= await department.findOne({name:oldDepartmentName});
            if(!existingDepartment){
                return res.json({msg:"no such department , please check the name again"});
            }
            const existingFaculty = await faculty.findOne({name:facultyName});
            console.log(existingFaculty);
            let arr= existingFaculty.departments;
            objIndex = arr.findIndex((obj => obj.name== oldDepartmentName));
            arr[objIndex].name = newDepartmentName;
            const updatedDepartement2=await department.findOneAndUpdate({name:oldDepartmentName},{name:newDepartmentName});
            const updatedDepartement=await faculty.findOneAndUpdate({name:facultyName},{departments:arr});
            return res.json({msg:"updated Successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteDepartment',async(req,res)=>{
    try{
        let{departmentName,facultyName}=req.body;
        if(!departmentName||!facultyName){
            return res.json({msg:"Please Enter Valid  Info"});
        }
        // const existingHR = await hr.findOne({email:req.body.email});
        var n = req.role.localeCompare("HR");
        if(n==0){
            const existingFaculty = await faculty.findOne({name:facultyName});
            // console.log("existingFaculty:",existingFaculty);
            if(!existingFaculty){
                return res.json({msg:"Faculty does not exist"});
            }
            const existingDepartment = await department.findOne({name:departmentName});
            // console.log("existingDepartment:",existingDepartment);
            if(!existingDepartment){
                return res.json({msg:"Department does not exist "});
            }
            const constdeleted = await department.findOneAndRemove({name:departmentName});
            let arr= existingFaculty.departments;
            objIndex = arr.findIndex((obj => obj.name== departmentName));
            // console.log("before:",arr);
            arr.splice(objIndex,1);
            // console.log("after",arr);
            const updatedDepartement=await faculty.findOneAndUpdate({name:facultyName},{departments:arr});
            return res.json({msg:"deleted Successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        return res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AddCourse',async(req,res)=>{
    try{
        let{departmentName,facultyName,coursename}=req.body;
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!departmentName||!facultyName||!coursename){
                return res.json({msg:"Please Enter Valid info"});
            }
            const existingFaculty = await faculty.findOne({name:facultyName});
            console.log("faculty:",existingFaculty);
            if(!existingFaculty){
                return res.json({msg:"Faculty doesn't exist"});
            }
            const existingDepartment = await department.findOne({name:departmentName});
            console.log("department",existingDepartment);
            if(!existingDepartment){
                return res.json({msg:"Department doesn't exist"});
            }
            const existingCourse = await course.findOne({name:coursename});
            if(existingCourse){
                return res.json({msg:"Course already exist"});
            }
           
            const newCourse=new course({name:coursename});
            if(!existingCourse){
                const savedCourses = await newCourse.save(); 
            }
            if(existingFaculty&&existingDepartment){
                let arr= existingDepartment.courses;
                let x=arr.push(newCourse);
                const updatedDepartment=await department.findOneAndUpdate({name:departmentName},{courses:arr});
                const newExistingDepartment=await department.findOne({name:departmentName});
                console.log(newExistingDepartment);
                const updatedFaculty=await faculty.findOneAndUpdate({name:facultyName},{departments:newExistingDepartment});
                return res.json({msg:"Added Successfully"});
            }
        }else{
                return res.json({msg:"You are NOT an HR"});
        }
     
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateCourse',async(req,res)=>{
    try{
        let{oldCourseName,newCourseName,facultyName,departmentName}=req.body;
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!oldCourseName||!newCourseName||!facultyName||!departmentName){
                return res.json({msg:"Please Enter Valid  Info"});
            }
            if(oldCourseName.localeCompare(newCourseName)==0){
                return res.json({msg:"Please Enter a new Name"});
            }
            const existingCourse= await course.findOne({name:oldCourseName});
            if(!oldCourseName){
                return res.json({msg:"no such course , please check the name again"});
            }
            const existingFaculty = await faculty.findOne({name:facultyName});
            if(!existingFaculty){
                return res.json({msg:"no such faculty , please check the name again"});
            }
            const existingDepartment = await department.findOne({name:departmentName});
            if(!existingDepartment){
                return res.json({msg:"no such department , please check the name again"});
            }
            const updatedCourse=await course.findOneAndUpdate({name:oldCourseName},{name:newCourseName});
            let arr= existingDepartment.courses;
            objIndex = arr.findIndex((obj => obj.name== oldCourseName));
            arr[objIndex].name = newCourseName;
            console.log("courses after updating:",arr);
            const updatedDepartement=await department.findOneAndUpdate({name:departmentName},{courses:arr});
            ///////////update inside faculty
            const newDepartment=await department.findOne({name:departmentName});
            console.log("newDepartment",newDepartment);
            const existingDepartment2=await faculty.findOne({name:facultyName});
            let a=existingDepartment2.departments;

            console.log("a:",a);
            let d=a.filter((department) => (department.name) ==departmentName);
            console.log("d:",d);
            objIndex = a.findIndex((obj => obj.name== departmentName));
            let a2=a[objIndex].courses;
            console.log("a2 before:",a2);
            objIndex2 = a2.findIndex((obj => obj.name== oldCourseName));
            a2[objIndex2]=newCourseName;
            console.log("a2 after:",a2);
            const updatedFaculty=await faculty.findOneAndUpdate({name:facultyName},{departments:existingFaculty.departments});
            return res.json({msg:"updated Successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteCourse',async(req,res)=>{
    try{
        let{departmentName,facultyName,courseName}=req.body;
        if(!departmentName||!facultyName||!courseName){
            return res.json({msg:"Please Enter Valid  Info"});
        }
            const existingFaculty = await faculty.findOne({name:facultyName});
            console.log("existingFaculty:",existingFaculty);
            if(!existingFaculty){
                return res.json({msg:"Faculty does not exist"});
            }
            const existingDepartment = await department.findOne({name:departmentName});
            console.log("existingDepartment:",existingDepartment);
            if(!existingDepartment){
                return res.json({msg:"Department does not exist "});
            }
            const existingCourse = await course.findOne({name:courseName});
            console.log("existingCourse:",existingCourse);
            if(!existingCourse){
                return res.json({msg:"course does not exist "});
            }
            const courseDeleted = await course.findOneAndRemove({name:courseName});
            let arr= existingDepartment.courses;
            objIndex = arr.findIndex((obj => obj.name== courseName));
            console.log("before:",arr);
            arr.splice(objIndex,1);
            console.log("after",arr);
            const updateCourse=await department.findOneAndUpdate({name:departmentName},{courses:arr});
            const newDepartmentAfterSaving=await department.findOne({name:departmentName});
            const updatedFaculty=await faculty.findOneAndUpdate({name:facultyName},{departments:newDepartmentAfterSaving});
            return res.json({msg:"deleted Successfully"});   
    }
    catch(error){
        res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AddStaffMember',async(req,res)=>{
    try{
        let{
            emailSM,
            Role,
            name,
            Day_OFF,
            salary,
            facultyName,
            departmentName,
            Location,
            Day_Of_Registration
        } = req.body;
        var today = new Date();
        var start = today.getDate();
        const start1 = today.getMonth()+1;
        if(req.role.localeCompare("HR")==0){
            if(!emailSM||!Role||!name||!salary||!Day_OFF||!facultyName||!departmentName||!Location){
                return res.json({msg:"Please Enter Valid info "});
            }
            if(Day_OFF.localeCompare("friday")==0){
                return res.json({msg:"Please enter a weekday"});
            }
            if(Day_OFF.localeCompare("saturday")==1&&Day_OFF.localeCompare("sunday")==1&&Day_OFF.localeCompare("monday")==1&&
               Day_OFF.localeCompare("tuesday")==1&&Day_OFF.localeCompare("wednesday")==1&&Day_OFF.localeCompare("thursday")==1){
                return res.json({msg:"Please enter a valid day"});
            }
            console.log(facultyName);
            const existingfac = await faculty.findOne({name:facultyName});
            if(!existingfac){
                return res.json({msg:"Faculty does not exist"});
            }
            const existingdep = await department.findOne({name:departmentName});
            if(!existingdep){
                return res.json({msg:"Department does not exist"});
            }

            const existingUser = await staff.findOne({email:emailSM});
            if(existingUser){
                return res.json({msg:"Staff Member email already exists"});
            }
            const documentCount = await staff.count({});
            var NewID = 1 + documentCount;
            const IDString = "ac-" + NewID;
            const password = "123456";
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password,salt);
            var attendanceTemp2=new attendance_sheet();
            let locationreq = await location.findOne({name:Location});
            if(locationreq.in<locationreq.capacity){
                if(locationreq.type.localeCompare("office")==0){
                    let Arr=locationreq.nameofattendants;
                    let x=Arr.push(req.body.emailSM);
                    var newIn = await locationreq.in+1;
                    const updatedloc = await location.findOneAndUpdate({name:Location},{in:newIn,nameofattendants:Arr});  
                    const newUser = new staff({
                        email:emailSM,
                        password:hashedPassword,
                        id:IDString,
                        Role:Role,
                        name:name,
                        Day_OFF:Day_OFF,
                        In_Out_Flag:0,
                        Missing_Hours_Per_Month:{h:0,m:0},
                        Extra_Hours_Per_Month:{h:0,m:0},
                        Achieved_Hours:{h:0,m:0},
                        Logged_In:0,
                        Missing_Days:0,
                        salary:salary,
                        faculty:facultyName,
                        department:departmentName,
                        Location:locationreq,
                        attendance:attendanceTemp2,
                        Day_Of_Registration:today
                        });
                    const savedUser = await newUser.save();
                    console.log(res.data);
                   return res.json({msg:"StaffMember added successfully",StaffMember:savedUser});
                }
            }
            else{
                return res.json({msg:"Office location is full capacity or the place is not an office"});
                }
        }else{
            return res.json({msg:"Invalid Functionality"});

        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateStaffMember',async(req,res)=>{
    try{
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!req.body.OfficeLocation||!req.body.emailSM||!req.body.role||!req.body.Day_OFF){
                return res.json({msg:"Please Enter Valid Info"});
            }
            const l = await location.findOne({name:req.body.OfficeLocation});
            if(!l){
                return res.json({msg:"Office Location does not exist"});
            }
            const Already = await staff.findOne({email:req.body.emailSM});
            if(!Already){
                return res.json({msg:"Staff Member does not exist"});
            }
            let locationreq2 = await location.findOne({name:req.body.OfficeLocation});
            if(locationreq2.in<locationreq2.capacity&&locationreq2.type.localeCompare("office")==0){
            let locationreq = await location.findOne({name:Already.Location.name});
            var newIn = await locationreq.in-1;
            let Arr2=locationreq.nameofattendants;
            console.log(Arr2);
            objIndex = Arr2.findIndex((obj => obj == req.body.emailSM));
            let x2=Arr2.splice(objIndex,1);
            console.log(Arr2,x2);
            const updatedloc = await location.findOneAndUpdate({name:Already.Location.name},{in:newIn,nameofattendants:Arr2});
            var newIn2 = await locationreq2.in+1;
            let Arr=locationreq2.nameofattendants;
            let x=Arr.push(req.body.emailSM);
            const updatedloc2 = await location.findOneAndUpdate({name:req.body.OfficeLocation},{in:newIn2,nameofattendants:Arr});
            const UpdatedStaff = await staff.findOneAndUpdate({email:req.body.emailSM},
                {Role:req.body.role,Day_OFF:req.body.Day_OFF,
                // salary:req.body.salary,faculty:req.body.faculty,department:req.body.department,
                Location:updatedloc2});
            
            return res.json({msg:"Updated Successfully"});
            }else{
                return res.json({msg:"Not an office or at full capacity"});
            }
        }else{
            return res.json({msg:"You are not an HR"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteStaffMember',async(req,res)=>{
    try{
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!req.body.emailSM){
                return res.json({msg:"Please Enter Valid Staff Member Mail"});
            }
            const fac = await staff.findOne({email:req.body.emailSM});
            if(!fac){
                return res.json({msg:"Staff Member already deleted"});
            } 
            let locationreq = await location.findOne({name:fac.Location.name});
            var newIn = await locationreq.in-1;
            let Arr=locationreq.nameofattendants;
            objIndex = Arr.findIndex((obj => obj == req.body.emailSM));
            let x=Arr.splice(objIndex,1);
            const updatedloc = await location.findOneAndUpdate({name:fac.Location.name},{in:newIn,nameofattendants:Arr}); 
            const constdeleted = await staff.findOneAndRemove({email:req.body.emailSM});
            return res.json({msg:"Deleted Successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ShowAttendanceStaffToHR',async(req,res)=>{
    try{
        if(req.role.localeCompare("HR")==0){
            console.log(1);
        let{email}=req.body;
        if(!email){
            return res.json({msg:"Please Enter Valid Info"});
        }
        const existingHR=await hr.findOne({email:req.m});
        const existingUser4=await staff.findOne({email:email});
        if(!existingUser4){
            return res.json({msg:"No such staff"});
        }
        if(existingHR){
            let arr=existingUser4.attendance.In;
            let arr2=existingUser4.attendance.Out;
            return res.json({msg:"ok",staff:email,In:arr,Out:arr2});
        }else{
            return res.json({msg:"Invalid"});
        }
    }else{
        return res.json({msg:"Invalid Functionality"});
    }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateStaffMemberSalary',async(req,res)=>{
    try{
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!req.body.emailSM){
                return res.json({msg:"Please Enter Valid Staff Member Mail"});
            }
            const fac = await staff.findOne({email:req.body.emailSM});
            if(!fac){
                return res.json({msg:"Staff Member does not exist"});
            }
            if(fac.salary == req.body.salary){
                return res.json({msg:"Salary is already updated"});
            }
            const fac2 = await staff.findOneAndUpdate({email:req.body.emailSM},{salary:req.body.salary});
            return res.json({msg:"Salary is updated successfully"});
        }
        else{
            return res.json({msg:"You are NOT an HR"});
        }        
    }
    catch(error){
        return res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/SetSchedule',async(req,res)=>{
    try{
        let{
            emailS,
            time,
            locationName,
            courseName,
            day
        }=req.body;
        var n = req.role.localeCompare("HR");
        if(n==0){
            if(!emailS||!time||!locationName||!courseName||!day){
                return res.json({msg:"Please enter valid info"});
            }
            let x = await staff.findOne({email:emailS});
            if(day!="saturday"&&day!="sunday"&&day!="monday"&&day!="tuesday"&&day!="wednesday"&&day!="thursday"){
                return res.json({msg:"Please enter a valid day"});
            }
            else{
            if(day.localeCompare("friday")==0||x.Day_OFF.localeCompare(day)==0){
                return res.json({msg:"Please enter another day"});
            }
            const loc = await location.findOne({name:locationName});
            if(!loc){
                return res.json({msg:"Please enter an existing location"});
            }
            if(loc.type.localeCompare("office")==0){
                return res.json({msg:"Please enter another location"});
            }
            const existingCourse= await course.findOne({name:courseName});
            if(!existingCourse){
                return res.json({msg:"Please enter an existing course"});
            }
            let sch=x.Schedule.filter((slot) => (slot.day) ==day);
            console.log(sch); 
            if(sch.length==0){
                var slot2 = new slot({time:time,location:loc,day:day,course:existingCourse});
                let y = x.Schedule.push(slot2);
                console.log(x.Schedule);
                const updateschedule = await staff.findOneAndUpdate({email:emailS},{Schedule:x.Schedule});
                return res.json({msg:"Done Scheduling",Schedule:x.Schedule});
            }
            let sch2=sch.filter((slot)=>(slot.time)==time);
            console.log(sch2);
            if(sch2.length!=0){
                return res.json({msg:"Slot busy"});
            }
            else{
                var slot2 = new slot({time:time,location:loc,day:day,course:existingCourse});
                let y = x.Schedule.push(slot2);
                console.log(x.Schedule);
                const updateschedule = await staff.findOneAndUpdate({email:emailS},{Schedule:x.Schedule});
                return res.json({msg:"Done Scheduling",Schedule:x.Schedule});
            }
            }
        }else{
            return res.status(400).json({msg:"You are NOT an HR"});
        }
        }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewSchedule',async(req,res)=>{
    try{
        const existingstaff = await staff.findOne({email:req.m});
        if(!existingstaff){
            return res.json({msg:"Please Enter a valid user token"});
        }
        return res.json({msg:"ok",schedule:existingstaff.Schedule});
    }
    catch(error){
       return res.json({error:error.message});
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewScheduleOfStaff',async(req,res)=>{
    try{
        const existingHR = await hr.findOne({email:req.m});
        if(!existingHR){
            return res.json({msg:"Please Enter a valid user token"});
        }
        if(!req.body.emailSM){
            return res.json({msg:"Please Enter valid Info"});
        }
        const existingstaff = await staff.findOne({email:req.body.emailSM});
        return res.json({msg:"ok",schedule:existingstaff.Schedule});
    }
    catch(error){
       return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewMissingAndExtraTimeOfStaff' ,async(req,res)=>{
    try{
        if(req.role.localeCompare("HR")==0){
            const existingHR=await hr.findOne({email:req.m});
            if(!existingHR){
                return res.json({msg:" Not an HR"});
            }
            if(!req.body.emailSM){
                return res.json({msg:"Enter Valid Info"});
            }
            const existingUser=await staff.findOne({email:req.body.emailSM});
            if(!existingUser){
                return res.json({msg:"Staff Member doesn't exist"});
            }
             return res.json({msg:"ok",MissingHours:existingUser.Missing_Hours_Per_Month,ExtraHours:existingUser.Extra_Hours_Per_Month});
        }else {
            return res.json({msg:"Invalid Functionality , Not an HR"});
        }
    }  catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewSlotAssignmentCI',async(req,res)=>{
    try{
        let{reqcourse}=req.body;
        var n = req.role.localeCompare("CI");
        if(n==0){
            // if(!reqcourse){
            //     return res.json({msg:"Please Enter staff member course"});
            // }
            const existingCI =await staff.findOne({email:req.m});
            let x = existingCI.Schedule;
            let y = x.filter((x)=>{
            return x.course.name==reqcourse;});
            console.log(y);
            res.json(y);

        }else{
            return res.json({msg:"You are not a course instructor"});
        }
    }
    catch(error){
        res.json({error:error.message});
    }

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/SendReplacementRequest',async(req,res)=>{
    try{
        let{email,emailToS,time,locationofslot,day,courseofslot}=req.body;
        const existingSM = await staff.findOne({email:req.m});
        const existingHOD = await staff.findOne({email:req.body.email});
        var m = existingHOD.Role.localeCompare("HOD");
        var n = existingSM.Role.localeCompare("HOD");
        if(n!=0 && m ==0){
            if(!email){
                return res.json({msg:"Please Enter Valid Head of Department Email"});
            }            
            let loc = await location.findOne({name:locationofslot});
            let cou = await course.findOne({name:courseofslot});
            if(!loc || !cou){
                return res.json({msg:"Please Enter valid location and course"});
            }

            const s = new slot({time:time,location:loc,day:day,course:cou});
            const r = new requests({type:"Replacement",emailTo:email,emailFrom:req.m,emailToS:emailToS,acceptance:"pending",comment:" ",slot:s});
            const rs = new requests({type:"Replacement",emailTo:emailToS,emailFrom:req.m,acceptance:"pending",comment:" ",slot:s});
            

            let hod = await staff.findOne({email:email});
            let arr = hod.ArrayofRequests;
            let x = arr.push(r);
            const UpdatedHOD = await staff.findOneAndUpdate({email:email},{ArrayofRequests:arr});

            let hod2 = await staff.findOne({email:emailToS});
            let arr2 = hod2.ArrayofRequests;
            let y = arr2.push(rs);
            const UpdatedSM = await staff.findOneAndUpdate({email:emailToS},{ArrayofRequests:arr2});

           
            const ssave = await s.save();
            const rsave = await r.save();
            return res.json({msg:"Request sent"});
        }
        else{
            return res.json({msg:"Invalid Data"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewReplacementRequests',async(req,res)=>{
    try{
        if(req.role.localeCompare("HR")!=0){
        const existingSM = await staff.findOne({email:req.m});
        if(!existingSM){
            return res.json({msg:"staff member does not exist"});
        }
        const SMRequests= await requests.find({emailFrom:req.m});
        if(!SMRequests){
            return res.json({msg:"There are currently no requests"});
        }
        let x= SMRequests.filter((requests)=>{
                return requests.type=="Replacement";});
        // console.log(SMRequests);
        return res.json({msg:"ok",Replacement:x});
        }else{
            return res.json({msg:"Invaild Functionality"});
        }     
}catch(error){
    return res.json({error:error.message});
}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AssignStaffCourseHOD',async(req,res)=>{
    try{
       
        var n =req.role.localeCompare("HOD");
        if(n==0){
            const existingHOD=await staff.findOne({email:req.m});
            if(!existingHOD){
             return res.json({msg:"HOD doesn't exist"});
            }
            if(!req.body.course||!req.body.emailSM){
                return res.json({msg:"Please enter required info"});
            }
            const existingCourse=await course.findOne({name:req.body.course});
            const existingSM= await staff.findOne({email:req.body.emailSM});
            if(!existingCourse){
                return res.json({msg:"course does not exist"});
            } 
            if(!existingSM){
                return res.json({msg:"staff member does not exist"});
            } 
            if(existingSM.Role.localeCompare("Course Instructor")==0){
                const coursesIndep=await department.findOne({name:existingHOD.department});
                const existingCourseDep=coursesIndep.courses;
                let y =existingCourseDep.filter((course)=>{
                    return course.name==req.body.course;
                });
                if(y.length==0){
                    return res.json({msg:"the course does not exist in this department"});
                }
                let coursesTaught= existingSM.course;
                let x =coursesTaught.filter((course)=>{
                    return course.name==req.body.course;
                });
                if(x.length==0){
                    const m= new course({name:req.body.course});
                    coursesTaught.push(m);
                    const addedCourse=await staff.findOneAndUpdate({email:req.body.emailSM},{course:coursesTaught});
                    res.json({msg:"course is assigned succesfully"});
                }
                else{
                    return res.json({msg:"the course is already assigned to this member"});
                }
                
            }else{
                return res.json({msg:"please enter a course instructor email "});
            }
        }
        else{
            return res.json({msg:"You are NOT HOD"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateStaffCourseHOD',async(req,res)=>{
    try{
        let{emailSM,reqcourse,oldcourse}=req.body;
        var n = req.role.localeCompare("HOD");
        if(n==0){
            const existingHOD=await staff.findOne({email:req.m});
            if(!existingHOD){
             return res.json({msg:"Not a valid HOD "});
            }
            if(!emailSM){
                return res.json({msg:"Please Enter course instructor Email"});
            }
            if(!reqcourse||!oldcourse){
                return res.json({msg:"Please enter the courses"});
            }
            const existingCI=await staff.findOne({email:emailSM});
            if(!existingCI){
                return res.json({msg:"staff member does not exist"});
            }
            if(existingCI.Role.localeCompare("CI")==0){
            const existingC=await course.findOne({name:reqcourse});
            if(!existingC){
                return res.json({msg:"course does not exist"});
            }
            let courseArr=existingCI.course;
            let x =courseArr.filter((course)=>{
                return course.name==reqcourse;
            });
            let y =courseArr.filter((course)=>{
                return course.name==oldcourse;
            });
            if(x.length==0 && y.length!=0){
                objIndex = courseArr.findIndex((obj => obj.name == oldcourse));
                courseArr[objIndex].name = reqcourse;
                let updatedSM=await staff.findOneAndUpdate({email:emailSM},{course:courseArr});

                return res.json({msg:"staff member updated successfully"});
            }
            else{
                return res.json({msg:"staff member already updated /course to be updated does not exist"});
            }
             }
            else{
                return res.json({msg:"Please enter a course instructor email"});
            }
        }
        else{
            return res.json({msg:"You are not an HOD"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteStaffCourseHOD',async(req,res)=>{
    try{
        let{emailSM,reqcourse}=req.body;
        var n = req.role.localeCompare("HOD");
        if(n==0){
            const existingHOD=await staff.findOne({email:req.m});
            if(!existingHOD){
             return res.json({msg:"Please enter a valid HOD email"});
            }
            if(!emailSM){
                return res.json({msg:"Please Enter course instructor Email"});
            }
            const existingCI=await staff.findOne({email:emailSM});
            if(!existingCI){
                return res.json({msg:"staff member does not exist"});
            }
            if(existingCI.Role.localeCompare("CI")==0){
            let courseArr=existingCI.course;
            let x =courseArr.filter((course)=>{
                return course.name==reqcourse;
            });
            if(x.length==0){
                return res.json({msg:"staff member has no course"});
            }
            else{
                objIndex = courseArr.findIndex((obj => obj.name == reqcourse));
                courseArr.splice(objIndex, 1);
                let updatedSM=await staff.findOneAndUpdate({email:emailSM},{course:courseArr});
                return res.json({msg:"staff member course removed successfully"});
                
            } }
            else{
                return res.json({msg:"Please enter a course instructor email"});
            }
        }
        else{
            return res.json({msg:"You are not an HOD"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AssignStaffCI',async(req,res)=>{
    try{
        let{emailSM,time,reqlocation,day,reqcourse}=req.body;
        
        var n = req.role.localeCompare("CI");

        if(existingstaff.Role.localeCompare("CC")!=0){
            return res.json({msg:"The assigned staff is not course coordinator"});
        }
        if(n==0){
            const existingCI = await staff.findOne({email:req.m});
            if(!existingCI){
                return res.json({msg:"The email does not exist"});
            }
            const existingstaff = await staff.findOne({email:emailSM});
            if(!existingstaff){
                return res.json({msg:"The email does not exist"});
            }
            const x = existingCI.course;
            let y = x.filter((x)=>{
                return x.name==reqcourse;});
                
            if(!y){
                return res.json({msg:"This course is invalid"});
            }
            const cou = await course.findOne({name:reqcourse});
            if(!cou){
                return res.json({msg:"Please enter existing course"});
            }
            const lou = await location.findOne({name:reqlocation});
            if(!lou){
                return res.json({msg:"Please enter existing location"});
            }
            const s = new slot({time:time,location:lou,day:day,course:cou});
            console.log(s);
        
            const already = existingstaff.Schedule;
            let z = already.filter((already)=>{
                return already.time==time || already.day == day;});  
            if(!z){
                return res.json({msg:"Time and day is not available"});
            }

            let arr1 = existingstaff.Schedule;
            let x1 = arr1.push(s);

            let arr2 = existingstaff.course;
            let x2 = arr2.push(cou);
            const updatedstaff = await staff.findOneAndUpdate({email:emailSM},{Schedule:arr1,course:arr2});
            const ssave = await s.save();
            return res.json({msg:"Assigned succesfully"});
        }else{
            return res.json({msg:"You are not a course instructor"});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/SendSlotLinkingRequest',async(req,res)=>{
    try{
        let{emailCC,time,locationofslot,day,courseinslot}=req.body;
        if(!email){
            return res.json({msg:"Please Enter Valid Head of department Email"});
        }
       
        if(!emailCC){
            return res.json({msg:"Please Enter Course Coordinator Email"});
        }
        const existingSM = await staff.findOne({email:req.m});
        const existingHOD = await staff.findOne({email:email});
        const existingCC = await staff.findOne({email:emailCC});
        if(!existingCC){
            return res.json({msg:"Please Enter existing Course Coordinator Email"});
        }
        if(!existingHOD){
            return res.json({msg:"Please Enter existing Head of department Email"});
        }
        console.log(existingSM,existingHOD,existingCC);
        var n = existingSM.Role.localeCompare("HOD");
        var m = existingCC.Role.localeCompare("CC");
        var o = existingHOD.Role.localeCompare("HOD");

        if(n!=0 && m ==0 && o == 0){
            
            const existingcourse = await course.findOne({name:courseinslot});
            if(!existingcourse){
                return res.json({msg:"Course Does not exist"});
            }
            const existingLocation = await location.findOne({name:locationofslot});
            if(!existingLocation){
                return res.json({msg:"location Does not exist"});
            }
            const s = new slot({time:time,
                                location:existingLocation,
                                day:day,
                                course:existingcourse});
            
            const r = new requests({type:"Slot Linking",
                                    emailTo:email,
                                    emailFrom:req.m,
                                    acceptance:"pending",
                                    comment:" ",slot:s});

            const rs = new requests({type:"Slot Linking",
                                    emailTo:emailCC,
                                    emailFrom:req.m,
                                    acceptance:"pending",
                                    comment:" ",slot:s});

            let cc = await staff.findOne({email:email});
            let arr = cc.ArrayofRequests;
            let x = arr.push(r);
            const UpdatedCC = await staff.findOneAndUpdate({email:email},{ArrayofRequests:arr});

            let hod3 = await staff.findOne({email:emailCC});
            let arr3 = hod3.ArrayofRequests;
            let z = arr3.push(rs);
            const UpdatedSM2 = await staff.findOneAndUpdate({email:emailCC},{ArrayofRequests:arr3});

            const rsave = await r.save();
            const rssave = await rs.save();
            const ssave = await s.save();
            return res.json({msg:"Request sent"});
        }
        else{
            return res.json({msg:"Invalid Data"});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/SendChangeDayOFFRequest',async(req,res)=>{
    try{
        let{email,day,content}=req.body;
        const existingSM = await staff.findOne({email:req.m});
        const existingHOD = await staff.findOne({email:email});
        var m = existingHOD.Role.localeCompare("HOD");
        var n = existingSM.Role.localeCompare("HOD");
            if(!email){
                return res.json({msg:"Please Enter Valid Head of department Email"});
            }
           
            const r = new requests({type:"Change Day OFF",
                                    emailTo:email,
                                    emailFrom:req.m,
                                    acceptance:"pending",
                                    comment:"",
                                    content:content,
                                    day:day});

            let hod = await staff.findOne({email:email});
            let arr = hod.ArrayofRequests;
            let x = arr.push(r);
            const UpdatedHOD = await staff.findOneAndUpdate({email:email},{ArrayofRequests:arr});

            let hod3 = await staff.findOne({email:req.m});
            let arr3 = hod3.ArrayofRequests;
            let z = arr3.push(r);
            const UpdatedSM2 = await staff.findOneAndUpdate({email:req.m},{ArrayofRequests:arr3});
            const rsave = await r.save();

            return res.json({msg:"Request sent"});
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/SendCompensationRequest',async(req,res)=>{
    try{
        let{email,emailSM,day,content}=req.body;
        const existingSM = await staff.findOne({email:req.body.emailSM});
        const existingHOD = await staff.findOne({email:req.body.email});
        var m = existingHOD.Role.localeCompare("Head Of Department");
        var n = existingSM.Role.localeCompare("Head Of Department");
        if(n==1 && m ==0){
            if(!email){
                return res.status(400).json({msg:"Please Enter Valid Head of department Email"});
            }
            if(!emailSM){
                return res.status(400).json({msg:"Please Enter Your Email"});
            }
            const r = new requests({type:"Compensation",
                                    emailTo:email,
                                    emailFrom:emailSM,
                                    acceptance:"pending",
                                    comment:" ",
                                    content:content,
                                    day:day});

            let hod = await staff.findOne({email:email});
            let arr = hod.ArrayofRequests;
            let x = arr.push(r);
            const UpdatedHOD = await staff.findOneAndUpdate({email:email},{ArrayofRequests:arr});

            let hod3 = await staff.findOne({email:emailSM});
            let arr3 = hod3.ArrayofRequests;
            let z = arr3.push(r);
            const UpdatedSM2 = await staff.findOneAndUpdate({email:emailSM},{ArrayofRequests:arr3});
            const rsave = await r.save();

            res.status(400).json({msg:"Request sent"});
        }
        else{
            return res.status(400).json({msg:"Invalid Data"});
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/SendLeaveRequest',async(req,res)=>{
    try{
        let{email,day,content}=req.body;
        if(!email){
            return res.json({msg:"Please Enter Valid Head of department Email"});
        }
        const existingSM = await staff.findOne({email:req.m});
        const existingHOD = await staff.findOne({email:req.body.email});
        var m = existingHOD.Role.localeCompare("HOD");
        var n = existingSM.Role.localeCompare("HOD");
        if(n!=0 && m ==0){
            const r = new requests({type:"Leave",
                                    emailTo:email,
                                    emailFrom:req.m,
                                    acceptance:"pending",
                                    comment:" ",
                                    content:content,
                                    day:day});

            let hod = await staff.findOne({email:email});
            let arr = hod.ArrayofRequests;
            let x = arr.push(r);
            const UpdatedHOD = await staff.findOneAndUpdate({email:email},{ArrayofRequests:arr});

            let hod3 = await staff.findOne({email:req.m});
            let arr3 = hod3.ArrayofRequests;
            let z = arr3.push(r);
            const UpdatedSM2 = await staff.findOneAndUpdate({email:req.m},{ArrayofRequests:arr3});
            const rsave = await r.save();

            res.json({msg:"Request sent"});
        }
        else{
            return res.json({msg:"Invalid Data"});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewStatusRequests',async(req,res)=>{
    try{
        let{status}=req.body;
        const existingSM = await staff.findOne({email:req.m});
        if(!existingSM){
            return res.json({msg:"staff member does not exist"});
        }
        const SMRequests= await requests.find({emailFrom:req.m});
        if(!SMRequests){
            return res.json({msg:"There are currently no requests"});
        }
        if(!status){
            return res.json({SMRequests});
        }
        if(status.localeCompare("true")==0){
             let x= SMRequests.filter((requests)=>{return requests.acceptance=="true";});
             return res.json({msg:"ok",Requests:x});
        }
        if(status.localeCompare("false")==0){
            let x= SMRequests.filter((requests)=>{return requests.acceptance=="false";});
            return res.json({msg:"ok",Requests:x});
        }
        if(status.localeCompare("pending")==0){
            let x=SMRequests.filter((requests)=>{return requests.acceptance=="pending";});
            return res.json({msg:"ok",Requests:x});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewRequestsDepartmentHOD',async(req,res)=>{
    try{
        const existingHOD = await staff.findOne({email:req.m});
        if(!existingHOD){
            return res.json({msg:"HOD does not exist"});
        }
        var n = existingHOD.Role.localeCompare("HOD");
        if(n==0){
           
            const memDep= existingHOD.department;
            if(!memDep){
                return res.json({msg:"department not found"});
            }
            const depRequests= await requests.find({emailTo:req.m});
            if(!depRequests){
                return res.json({msg:"There are currently no requests"});
            }
            let x= depRequests.filter((requests)=>{
                return requests.type=="Change Day OFF";});
            let y =depRequests.filter((requests)=>{
                return requests.type=="Leave";
            });
            if(!x){
                return res.json({msg:"There are currently no leave/Change day off requests"});
            }
            return res.json({msg:"ok",Changedayoff:x,Leave:y});
        }else{
            return res.json({msg:"You are not HOD"});
        }
}catch(error){
    return res.json({error:error.message});
}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewStaffDayOFFHOD',async(req,res)=>{
    try{
        
        var n = req.role.localeCompare("HOD");
        if(n==0){
            const existingHOD = await staff.findOne({email:req.m});
            if(!existingHOD){
                return res.json({msg:"HOD does not exist"});
            }
         
            const requestedDepartment = existingHOD.department;
            const fac = await staff.find({department:requestedDepartment});
            if(!fac){
                return res.json({msg:"department does not exist"});
            } 
            const dayoff=groupBy(fac,'Day_OFF');
            res.json({msg:"ok",dayoff:dayoff});
        }
        else{
            return res.json({msg:"Invalid Functionality"});
        }        
    }
    catch(error){
        return res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       acc[key].push(obj);
       return acc;
    }, {});
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewStaffDayOFFHODSM',async(req,res)=>{
    try{
        const existingHOD = await staff.findOne({email:req.m});
        if(!existingHOD){
            return res.json({msg:"HOD does not exist"});
        }
        console.log(1);
        var n = existingHOD.Role.localeCompare("HOD");
        if(n==0){
            console.log(2);

            if(!req.body.emailSM){
                return res.json({msg:"Please enter a staff member email"});
            }
            const requestedDepartment = existingHOD.department;
            const fac = await staff.find({department:requestedDepartment});
            if(!fac){
                return res.json({msg:"department does not exist"});
            }
            const existingSM=await staff.findOne({email:req.body.emailSM});
            const smDep=existingSM.department;
            console.log(3);

            if(smDep==requestedDepartment){
            if(!existingSM){
                return res.json({msg:"Staff member does not exist"});
            } 
            let vac=existingSM.Day_OFF;
            return res.json({msg:"ok",vac:vac});
            }
            else{
            console.log(4);

                return res.json({msg:"staff memebr is not in this department"});
            }
        }
         else{
            return res.json({msg:"You are NOT an HR"});
            }        
    }   
    catch(error){
        return res.json({error:error.message});

    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get(('/ViewStaffInDepartmentHOD'),async(req,res)=>{
    try{
        
         const existingHOD = await staff.findOne({email:req.m});
         if(!existingHOD){
             return res.json({msg:"No Such HOD"});
         }
         var n = existingHOD.Role.localeCompare("HOD");
         if(n==0){
             const requestedDepartment =existingHOD.department;
             const fetchedDepStaff =await staff.find({department:requestedDepartment});
             if(!fetchedDepStaff){
                 return res.json({msg:"No members in the department yet"});
             }
             return res.json({msg:"ok",fetchedDepStaff:fetchedDepStaff});
         }
         else{
             return res.json({msg:"You are NOT a Head Of Department"});
         }
     }
     catch(error){
            return res.json({error:error.message});
     
         }   
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post(('/ViewStaffInDepartmentHODPerCourse'),async(req,res)=>{
    try{
        if(!req.body.course){
        return res.json({msg:"Please Enter required info"});
        }
        const existingHOD = await staff.findOne({email:req.m});
        if(!existingHOD){
            return res.json({msg:"The email does not exist"});
        }
        var n = existingHOD.Role.localeCompare("HOD");
        if(n==0){
            const existingCourseg=await course.findOne({name:req.body.course});
            if(!existingCourseg){
                return res.json({msg:"course does not exist"});
            }
            const requestedDepartment =existingHOD.department;
            let fetchedDepStaff =await staff.find({department:requestedDepartment});
            if(!fetchedDepStaff){
                return res.json({msg:"No members in the department yet"});
            }
            let i=0;
            let ans=[];
            while(i<fetchedDepStaff.length){
                let obj=fetchedDepStaff[i];
                let objCourses=obj.course;
                let courseStaff=objCourses.filter((course)=>{
                    return course.name==req.body.course;
                });
                if(courseStaff.length!=0){
                    ans.push(obj);
                    i+=1;
                }else{
                i+=1;
                }
            }
            console.log(ans);
            if(ans.length==0){
                return res.json({msg:"no one is assigned to this course "});
            }

            res.json({msg:"ok",ans:ans});
        }
        else{
            return res.json({msg:"You are NOT a Head Of Department"});
        }
    }
    catch(error){
            return res.json({error:error.message});
    
        }   

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteCourseStaffCI',async(req,res)=>{
    try{
        let{emailCC,reqcourse}=req.body;
        const existingCI = await staff.findOne({email:req.m});
        var n = existingCI.Role.localeCompare("CI");
        if(n==0){
            if(!emailCC){
                return res.json({msg:"Please Enter staff member Email"});
            }
            if(!reqcourse){
                return res.json({msg:"Please Enter staff member course"});
            }
            
            const cou = await course.findOne({name:reqcourse});
            if(!cou){
                return res.json({msg:"Please enter existing course"});
            }
            
            const sm = await staff.findOne({email:emailCC});
            let x = sm.course;
            let z = x.filter((x)=>{
                    return x.name==reqcourse;});  
            if(!z){
                return res.json({msg:"course is not available"});
            }
            
             objIndex = z.findIndex((obj => obj.name == reqcourse));
             z[objIndex].name = reqcourse;

            console.log(z);
            const updatedstaff = await staff.findOneAndUpdate({email:emailCC},{course:z});
            res.json({msg:"Course Deleted Successfully"});
           
        }
        else{
            return res.json({msg:"You are not a course instructor"});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewCourseCoverageHOD',async(req,res)=>{
    try{
        if(!req.body.course){
        return res.json({msg:"Please Enter valid course"})    
        }
        const existingHOD =await staff.findOne({email:req.m});
        if(!existingHOD){
            return res.json({msg:"HOD does not exist"});
        }
        var n =existingHOD.Role.localeCompare("HOD");
        if(n==0){
            const existingCourse = await course.findOne({name:req.body.course});
            if(!existingCourse){
                return res.json({msg:"course does not exist"});
            }
            let depname = existingHOD.department;
            let dep = await department.findOne({name:depname});
            const depcourses = dep.courses;
            console.log(depcourses);
            let x = depcourses.filter((depcourse)=>{
                return depcourse.name==req.body.course;
            });
            if(x.length==0){
                return res.json({msg:"course is not in this department"});
            }
            const reqdcourse = await course.findOne({name:req.body.course});
            const totalCourseSlots = await slot.find({course:reqdcourse});
            const depmembers = await staff.find({department:existingHOD.department});
            let i=0;
            let assignedslots=[];
            while(i<depmembers.length){
                let obj=depmembers[i];
                let coursesTaught =obj.course;
                let x=coursesTaught.filter((course)=>{
                    return course.name==req.body.course;
                });
                if(x.length!=0){
                let slots=obj.Schedule;
                let assgnslots=slots.filter((slots)=>{
                    return slots.course===reqdcourse;
                });
                assignedslots.push(assgnslots);
                i+=1;
                    
                }else{
                    i+=1;
                }
            }
            
            if(assignedslots.length==0){
                return res.json({msg:"there are no slots assigned yet"});
            }
            var coverage =( (assignedslots.length) / (totalCourseSlots.length) )*100;
            return res.json({msg:"ok",coverage:coverage});
        }
        else{
            return res.json({msg:"you are NOT HOD"});
        }
    }
    catch(error){
        return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewCourseCoverageCI',async(req,res)=>{
    try{
        // if(!req.body.course){
        // return res.json({msg:"Please Enter valid info"});    
        // }
        let{course}=req.body;
        const existingCI =await staff.findOne({email:req.m});
        if(!existingCI){
            return res.json({msg:"CI does not exist"});
        }
        var n =existingCI.Role.localeCompare("CI");
        if(n==0){
            const existingCourse = await course.findOne({name:course});
            if(!existingCourse){
                return res.json({msg:"course does not exist"});
            }
            let depname = existingCI.department;
            let dep = await department.findOne({name:depname});
            const depcourses = dep.courses;
            console.log(depcourses);
            let x = depcourses.filter((depcourse)=>{
                return depcourse.name==course;
            });
            if(x.length==0){
                return res.json({msg:"course is not in this department"});
            }
            const reqdcourse = await course.findOne({name:course});
            const totalCourseSlots = await slot.find({course:reqdcourse});
            const depmembers = await staff.find({department:existingCI.department});
            let i=0;
            let assignedslots=[];
            while(i<depmembers.length){
                let obj=depmembers[i];
                let coursesTaught =obj.course;
                let x=coursesTaught.filter((course)=>{
                    return course.name==course;
                });
                if(x.length!=0){
                let slots=obj.Schedule;
                let assgnslots=slots.filter((slots)=>{
                    return slots.course===reqdcourse;
                });
                assignedslots.push(assgnslots);
                i+=1;
                    
                }else{
                    i+=1;
                }
            }
            
            if(assignedslots.length==0){
                return res.json({msg:"there are no slots assigned yet"});
            }
            var coverage =( (assignedslots.length) / (totalCourseSlots.length) )*100;
            res.json(coverage);
        }
        else{
            return res.json({msg:"you are NOT CI"});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/ViewTeachingAssignmentsHOD',async(req,res)=>{
    try{
        let{reqcourse}=req.body;
        const existingHOD = await staff.findOne({email:req.m});
        if(!existingHOD){
            return res.json({msg:"The email does not exist"});
        }
        var n = req.role.localeCompare("HOD");
        if(n==0){
            if(!course){
                return res.json({msg:"Please Enter staff member course"});
            }
            const existngCourse=await course.findOne({name:reqcourse});
            if(!existngCourse){
                return res.json({msg:"course does not exist"});
            }
            const depName=existingHOD.department;
            let depC=await department.findOne({name:depName});
            let depCourses=depC.courses;
            let x=depCourses.filter((course)=>{
                return course.name==reqcourse;
            });
            if(x.length==0){
                return res.json({msg:"course does not belong to this department"});
            }
            const staffInDep =await staff.find({department:existingHOD.department});
            let i = 0;
            let assignedslots = [];
            const llll = await course.findOne({name:reqcourse});
            while(i<staffInDep.length){
                let obj = staffInDep[i];
                let coursesTaught = obj.course;
                let x = coursesTaught.filter((course)=>{
                    return course.name==reqcourse;
                });
                if(x.length!=0){
                    let slots = obj.Schedule;
                    let assgnslots = slots.filter((slots)=>{
                        return slots.course.name == reqcourse;
                    });
                    assignedslots.push(assgnslots);
                    i+=1;
                }
                else{i+=1;}
            }

            if(assignedslots.length==0){
                return res.json({msg:"no slots are assigned for this course yet"});
            }
            return res.json({msg:"ok",assignedslots:assignedslots});

        }else{
            return res.json({msg:"You are not HOD"});

        }
    }
    catch(error){
        return res.json({error:error.message});
    }

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AcceptSlotLinkingRequest',async (req,res)=>{
    try{
        let{emailSM}=req.body;
        console.log(emailSM);
        if(!emailSM){
            return res.json({msg:"Please Enter Valid info"});
        }
        const existingcoordinator = await staff.findOne({email:req.m});
        if(!existingcoordinator){
            return res.json({msg:"Course Coordinator does not exist"});
        }
        var n = existingcoordinator.Role.localeCompare("CC")
        if(n==0){
            
            const existingStaff=await staff.findOne({email:emailSM});
            if(!existingStaff){
                return res.json({msg:"Please enter a valid staff member"});
            }
            
            const reqMem=existingcoordinator.ArrayofRequests;
            if(reqMem.length==0){
                return res.json({msg:"There are no requests"})
            }
            objIndex = reqMem.findIndex((obj => obj.type == "Slot Linking"&&obj.emailFrom==emailSM));
            
            arr1 = existingStaff.ArrayofRequests;
            let emailSS = reqMem[objIndex].emailFrom
            let daySM = reqMem[objIndex].slot.day
            let timeSM = reqMem[objIndex].slot.time
            let newslot = reqMem[objIndex].slot
            let sch=existingStaff.Schedule.filter((slot) => (slot.day) ==daySM); 
            if(sch.length==0){
                arr = existingStaff.Schedule
                arr.push(newslot);
                reqMem[objIndex].acceptance = "true";
                arr1.push(reqMem[objIndex])
                const updatedReq=await staff.findOneAndUpdate({email:emailSM},{Schedule:arr,ArrayofRequests:arr1});
                let x = existingcoordinator.ArrayofRequests.filter((co)=>{
                    return co.emailFrom!=emailSM;
                  });
                const updatedReqs=await staff.findOneAndUpdate({email:req.m},{ArrayofRequests:x});
                return res.json(existingStaff.Schedule);
            }
            let sch2 = sch.filter((slot)=>{
                console.log(slot.time);
                console.log(timeSM)
                return slot.time == timeSM
            })
            console.log(sch2)
            if(sch2.length!=0){
                let x = existingcoordinator.ArrayofRequests.filter((co)=>{
                    return co.time!=timeSM&&co.day!=daySM&&co.emailFrom!=emailSM;
                  });
                const updatedReqs=await staff.findOneAndUpdate({email:req.m},{ArrayofRequests:x});
                return res.json({msg:"Slot is busy, choose another one to get the request accepted"})
            }
            else{
            arr = existingStaff.Schedule
                arr.push(newslot);
                reqMem[objIndex].acceptance = true;
                const updatedReq=await staff.findOneAndUpdate({email:emailSM},{Schedule:arr,ArrayofRequests:arr1});
                let x = existingcoordinator.ArrayofRequests.filter((co)=>{
                    return co.time!=timeSM&&co.day!=daySM&&co.emailFrom!=emailSM;
                  });
                const updatedReqs=await staff.findOneAndUpdate({email:req.m},{ArrayofRequests:x});
                return res.json({msg:"ok",schedule:existingStaff.Schedule});
            
            }
        }
        else{
            return res.json({msg:"You are not a CC"});
        }
    }catch(error){
        res.json({error:error.message});
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/RejectSlotLinkingRequest',async (req,res)=>{
    try{
        let{emailSM}=req.body;
        console.log(emailSM)
        if(!emailSM){
            return res.json({msg:"Please Enter Valid staff email"});
        }
        const existingcoordinator = await staff.findOne({email:req.m});
        if(!existingcoordinator){
            return res.json({msg:"Course Coordinator does not exist"});
        }
        var n = existingcoordinator.Role.localeCompare("CC")
        if(n==0){
           
            
            const existingStaff=await staff.findOne({email:emailSM});
            
            if(!existingStaff){
                return res.json({msg:"Please enter a valid staff member"});
            }
            
            const reqMem=existingcoordinator.ArrayofRequests;
            if(reqMem.length==0){
                return res.json({msg:"There are no requests"})
            }
            console.log(reqMem)
            objIndex = reqMem.findIndex((obj => obj.type == "Slot Linking"&&obj.emailFrom==emailSM));
            reqMem[objIndex].acceptance = "false";
            arr1 = existingStaff.ArrayofRequests;
            arr1.push(reqMem[objIndex])
            
            const updatedReq=await staff.findOneAndUpdate({email:emailSM},{ArrayofRequests:arr1});
            let x = existingcoordinator.ArrayofRequests.filter((co)=>{
                return co.emailFrom!=emailSM;
              });
            const updatedReqs=await staff.findOneAndUpdate({email:email},{ArrayofRequests:x});
            
            return res.json({msg:"Unfortunately, your request has been rejected"});
        }
        else{
            return res.json({msg:"You are not CC"});
        }
    }catch(error){
       return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/ViewSlotLinkingRequest',async(req,res)=>{
    try{
        // let{email}=req.body;
        const excoord = await staff.findOne({email:req.m});
    
        var n = excoord.Role.localeCompare("CC")
        if(!excoord){
            return res.json({msg:"Please enter an existing email"});
        }
        if(n==0){
        if(excoord.ArrayofRequests.length==0){
            return res.json({msg:"There are no requests"});
        }    

        let x= excoord.ArrayofRequests.filter((requests)=>{
            return requests.type=="Slot Linking"});

          return res.json({msg:"ok",requestsArray:x});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/AddCourseSlot',async (req,res)=>{
    try{
        let{coursename,time,Location,day}=req.body;
        const existingcoordinator = await staff.findOne({email:req.m});
        if(!existingcoordinator){
            return res.json({msg:"Please Enter a valid email"});
        }
        const n = existingcoordinator.Role.localeCompare("CC");
        if(n==0){
            if(!coursename){
                return res.json({msg:"Please Enter the course name"});
            }
            if(!time){
                return res.json({msg:"Please Enter the hour of the slot"});
            }
            if(!Location){
                return res.json({msg:"Please Enter the location of the slot"});
            }
            if(!day){
                return res.json({msg:"Please Enter the day of the slot"});
            }
            const excourse = await course.findOne({name:coursename})
            if(!excourse){
                return res.json({msg:"Please Enter an existing course"});
            }
            const exlocation = await location.findOne({name:Location})
            if(!exlocation){
                return res.json({msg:"Please Enter an existing location"});
            }
            let x = existingcoordinator.course.filter((co)=>{
                console.log(co.name)
                return co.name==coursename;
              });
              if(x.length==0){
                return res.json({msg:"Please Enter an assigned course"});
              }
              
              
            if(day!="saturday"&&day!="sunday"&&day!="monday"&&day!="tuesday"&&day!="wednesday"&&day!="thursday"){
                return res.json({msg:"Please enter a valid day"});
            }    
            const checkcourse = await slot.findOne({course:excourse,time:time,day:day,location:exlocation})
            if(checkcourse!=null){
                return res.json({msg:"The course slot has already been added!"})
            }
                const s = new slot({time:time,location:exlocation,day:day,course:excourse})
                await s.save();
                console.log(excourse.name)
                return res.json({msg:"The course slot has been added successfully!"})
    }
    }catch(error){  
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/UpdateCourseSlot',async (req,res)=>{
    try{
        let{coursename,newtime,newlocation,newday}=req.body;
        const existingcoordinator = await staff.findOne({email:req.m});
        if(!existingcoordinator){
            res.json({msg:"Please Enter a valid email"});
        }
        const n = existingcoordinator.Role.localeCompare("CC");
        if(n==0){
            if(!coursename){
                return res.json({msg:"Please Enter the course name"});
            }
            if(!newtime){
                return res.json({msg:"Please Enter the hour of the slot"});
            }
            if(!newlocation){
                return res.json({msg:"Please Enter the location of the slot"});
            }
            if(!newday){
                return res.json({msg:"Please Enter the day of the slot"});
            }
            let x = existingcoordinator.course.filter((co)=>{
                return co.course==coursename;
              });
              const exlocation = await location.findOne({name:newlocation})
            if(!exlocation){
                return res.json({msg:"Please Enter an existing location"});
            }
           
            if(newday!="saturday"&&newday!="sunday"&&newday!="monday"&&newday!="tuesday"&&newday!="wednesday"&&newday!="thursday"){
                return res.json({msg:"Please enter a valid day"});
            }
            const excourse = await course.findOne({name:coursename})
            const checkcourse = await slot.findOne({course:excourse,time:newtime,day:newday,location:exlocation})
            if(checkcourse!=null){
                return res.json({msg:"The course slot has already been updated!"})
            }
       
            
              const sl = await slot.findOneAndUpdate({course:excourse},{time:newtime,location:exlocation,day:newday})
              return res.json({msg:"The course slot has been Updated successfully!"})
           
        }
    }catch(error){  
        res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/DeleteCourseSlot',async (req,res)=>{
    try{
        let{coursename,time,day,Location}=req.body;
        const existingcoordinator = await staff.findOne({email:req.m});
        if(!existingcoordinator){
            res.json({msg:"Please Enter a valid email"});
        }
        const n = existingcoordinator.Role.localeCompare("CC");
        if(n==0){
            
            if(!coursename){
                return res.json({msg:"Please Enter the course name"});
            }
            if(!time){
                return res.json({msg:"Please Enter the time"});
            }
            if(!day){
                return res.json({msg:"Please Enter the day"});
            }
            if(!Location){
                return res.json({msg:"Please Enter the location"});
            }
            // let x = existingcoordinator.Schedule.filter((co)=>{
            //     return co.course!=coursename&&co.time!=time&&co.day!=day;
            //   });
            const exlocation = await location.findOne({name:Location})
            const excourse = await course.findOne({name:coursename})
            const checkcourse = await slot.findOne({course:excourse,time:time,day:day,location:exlocation})
            if(checkcourse==null){
                return res.json({msg:"This course doesn't exist or it's already deleted"});
            }   
            await slot.findOneAndRemove({course:excourse,time:time,day:day,location:exlocation})
            return res.json({msg:"The course slot has been deleted successfully!"})       
    }
    }catch(error){  
       return res.json({error:error.message});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports=app;
