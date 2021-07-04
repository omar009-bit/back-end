Functionality: View the status of all submitted requests
Route: /ViewStatusRequests
Request type: GET
Request body: {
    "email":"miro@gmail.com",
    "status":"pending"
}
Response: {
    "Requests": [
        {
            "_id": "5fe61c108232884f74407ee3",
            "type": "Replacement",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "emailToS": "halim@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "slot": {
                "_id": "5fe61c108232884f74407ee0",
                "time": 5,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "sunday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            "__v": 0
        },
        {
            "_id": "5fe630d028b44e22782aba40",
            "type": "Slot Linking",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "slot": {
                "_id": "5fe630d028b44e22782aba3d",
                "time": 5,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe60acc52cc88346c828e01",
                    "name": "H12",
                    "type": "hall",
                    "capacity": 100,
                    "in": 0,
                    "reserved": false,
                    "__v": 0
                },
                "day": "sunday",
                "course": {
                    "_id": "5fe6249257ae7856100135f1",
                    "name": "Math301",
                    "__v": 0
                }
            },
            "__v": 0
        },
        {
            "_id": "5fe630d028b44e22782aba44",
            "type": "Slot Linking",
            "emailTo": "omar@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "slot": {
                "_id": "5fe630d028b44e22782aba3d",
                "time": 5,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe60acc52cc88346c828e01",
                    "name": "H12",
                    "type": "hall",
                    "capacity": 100,
                    "in": 0,
                    "reserved": false,
                    "__v": 0
                },
                "day": "sunday",
                "course": {
                    "_id": "5fe6249257ae7856100135f1",
                    "name": "Math301",
                    "__v": 0
                }
            },
            "__v": 0
        },
        {
            "_id": "5fe63156733be63bf878418d",
            "type": "Change Day OFF",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": "",
            "content": "I am sick",
            "day": "monday",
            "__v": 0
        },
        {
            "_id": "5fe631c3c166372784fc98f3",
            "type": "Compensation",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "content": "I am sick",
            "day": "monday",
            "__v": 0
        },
        {
            "_id": "5fe631fca350364d3cd940cf",
            "type": "Leave",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "content": "I am sick",
            "day": "monday",
            "__v": 0
        }
    ]
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Submit any type of “leave” request (automatically sent to HOD).
Route: /SendLeaveRequest
Request type: POST
Request body: {
    "email":"boody@gmail.com",
    "emailSM":"miro@gmail.com",
    "day":"monday",
    "content":"I am sick"
}
Response:{
    "msg": "Request sent"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: “Compensation” leave must have a reason
Route: /SendCompensationRequest
Request type: POST
Request body:{
    "email":"boody@gmail.com",
    "emailSM":"miro@gmail.com",
    "day":"monday",
    "content":"I am sick"
}
Response:{
    "msg": "Request sent"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Change their day off by sending a “change day off” request (automatically sent to HOD),and optionally leave a reason.
Route: /SendChangeDayOFFRequest
Request type: POST
Request body:{
    "email":"boody@gmail.com",
    "emailSM":"miro@gmail.com",
    "day":"monday",
    "content":"I am sick"
}
Response:{
    "msg": "Request sent"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Send a “slot linking” request (automatically sent to course coordinator). A “slot linking” request is a request done by the academic member to indicate their desire to teach a slot.
Route: /SendSlotLinkingRequest
Request type: POST
Request body:{
    "email":"boody@gmail.com",
    "emailSM":"miro@gmail.com",
    "emailCC":"omar@gmail.com",
    "time":5,
    "locationofslot":"H12",
    "day":"sunday",
    "courseinslot":"Math301"
} 
Response:{
    "msg": "Request sent"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Send a replacement request
Route: /SendReplacementRequest
Request type: POST
Request body:{
    "email":"boody@gmail.com",
    "emailSM":"miro@gmail.com",
    "emailToS":"halim@gmail.com",
    "time":5,
    "locationofslot":"C7366",
    "day":"sunday",
    "courseofslot":"CSEN101"
}
Response:{
    "msg": "Request sent"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view “replacement” request(s).
Route: /ViewReplacementRequests
Request type: GET
Request body:{
    "email":"miro@gmail.com"
}   
Response:{
    "Replacement": [
        {
            "_id": "5fe61c108232884f74407ee3",
            "type": "Replacement",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "emailToS": "halim@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "slot": {
                "_id": "5fe61c108232884f74407ee0",
                "time": 5,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "sunday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            "__v": 0
        }
    ]
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Functionality: add a location
Route: /AddLocation
Request type: POST
Request body: {
    "name":"C7309",
    "type":"office",
    "capacity":3
}
Response:{
    "msg": "Location added successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update a location
Route: /UpdateLocation
Request type: POST
Request body: {
    "oldName":"C7309",
    "newName":"C7366"
}
Response:{
    "nameofattendants": [],
    "_id": "5fe5c970d3edf33c1491e412",
    "name": "C7309",
    "type": "office",
    "capacity": 3,
    "in": 0,
    "reserved": false,
    "__v": 0
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete a location
Route: /DeleteLocation
Request type: DELETE
Request body: {
    "name":"C7310"
}
Response:{
    "msg": "Deleted Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: add a faculty
Route: /AddFaculty
Request type: POST
Request body: {
    "email":"amina@gmail.com",
    "name":"Engineering"
}
Response:{
    "_id": "5fe5d11d60feb84fd4522018",
    "name": "Engineering",
    "departments": [
        {
            "_id": "5fe5d11d60feb84fd4522017",
            "courses": []
        }
    ],
    "__v": 0
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update a faculty
Route: /UpdateFaculty
Request type: POST
Request body: {
    "email":"amina@gmail.com",
    "name":"Mecha",
    "newname":"Mechatronics"
}
Response:{
    "msg": "Updated Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete a faculty
Route: /DeleteFaculty
Request type: DELETE
Request body: {
    "email":"amina@gmail.com",
    "name":"Mechatronics"
}
Response:{
    "msg": "Deleted Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: add a department
Route: /AddDepartment
Request type: POST
Request body: {
    "facultyName":"Engineering",
    "departmentName":"MET"
}
Response:{
    "msg": "Added and updated Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update a department
Route: /UpdateDepartment
Request type: POST
Request body: {
    "facultyName":"Engineering",
    "oldDepartmentName":"MET",
    "newDepartmentName":"TEM"
}
Response:{
    "msg": "updated Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete a department
Route: /DeleteDepartment
Request type: DELETE
Request body: {
    "facultyName":"Engineering",
    "departmentName":"Mechatronics"
}
Response:{
    "msg": "deleted Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: add a course
Route: /AddCourse
Request type: POST
Request body: {
    "facultyName":"Engineering",
    "departmentName":"MET",
    "coursename":"Math301"
}
Response:{
    "msg": "Added Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update a course
Route: /UpdateCourse
Request type: POST
Request body: {
    "facultyName":"Engineering",
    "departmentName":"MET",
    "oldCourseName":"Math301",
    "newCourseName":"Math305"
}
Response:{
    "msg": "updated Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete a course
Route: /DeleteCourse
Request type: DELETE
Request body: {
    "facultyName":"Engineering",
    "departmentName":"MET",
    "courseName":"Math305"
}
Response:{
    "msg": "deleted Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: add staff member
Route: /AddStaffMember
Request type: POST
Request body: {
    "emailSM":"boody@gmail.com",
    "Role":"Head Of Department",
    "name":"boody",
    "Day_OFF":"sunday",
    "salary":40000,
    "faculty":"Engineering",
    "department":"MET",
    "Location":"C7366"
}
Response:{
    "_id": "5fe5d6fb8c9f875184c78cd4",
    "email": "boody@gmail.com",
    "password": "$2a$10$c5h9Rfc/fgCWm7yFHXip2OCS5hz6DhbmnBVvCSk9qJEjZRDMx9xq2",
    "id": "ac-1",
    "Role": "Head Of Department",
    "name": "boody",
    "Day_OFF": "sunday",
    "In_Out_Flag": 0,
    "Missing_Hours_Per_Month": {
        "h": 25,
        "m": 12
    },
    "Extra_Hours_Per_Month": {
        "h": 0,
        "m": 0
    },
    "Achieved_Hours_per_day": 0,
    "Logged_In": 0,
    "salary": 40000,
    "faculty": "Engineering",
    "department": "MET",
    "Location": {
        "nameofattendants": [],
        "_id": "5fe5c970d3edf33c1491e412",
        "name": "C7366",
        "type": "office",
        "capacity": 3,
        "in": 0,
        "reserved": false,
        "__v": 0
    },
    "attendance": {
        "In": [],
        "Out": [],
        "_id": "5fe5d6fb8c9f875184c78cd3"
    },
    "Day_Of_Registration": "2020-12-25T12:11:39.050Z",
    "course": [],
    "Schedule": [],
    "ArrayofRequests": [],
    "__v": 0
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update staff member
Route: /UpdateStaffMember
Request type: POST
Request body: {
    "emailSM":"boody@gmail.com",
    "newemailSM":"boody2@gmail.com"
}
Response:{
    "msg": "Updated Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete staff member
Route: /DeleteStaffMember
Request type: DELETE
Request body: {
    "emailSM":"boody2@gmail.com"
}
Response:{
    "msg": "Deleted Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View staff member attendance record
Route: /ShowAttendanceStaffToHR
Request type: GET
Request body: {
    "emailHR":"amina@gmail.com",
    "email":"miro@gmail.com"
}
Response:{
    "staff": "miro@gmail.com",
    "In": [],
    "Out": []
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update staff member salary
Route: /UpdateStaffMemberSalary
Request type: POST
Request body: {
    "email":"amina@gmail.com",
    "emailSM":"miro@gmail.com",
    "salary":50000
}
Response:{
    "msg": "Salary is updated successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: register as a HR
Route: /register
Request type: POST
Request body:{
    "email":"amina@gmail.com",
    "password":"amina",
    "passwordCheck":"amina",
    "name":"amina"
}
Response:{
    "Day_OFF": "saturday",
    "_id": "5fe5c92ed3edf33c1491e410",
    "email": "amina@gmail.com",
    "password": "$2a$10$HlZn8OJgbnu6X3whS/k3gupJiwiKgPX3Rb/qe3X8G5g65coBLx5fK",
    "Role": "HR",
    "name": "amina",
    "In_Out_Flag": 0,
    "Missing_Hours": 0,
    "Extra_Hours": 0,
    "Missing_Days": 0,
    "salary": 0,
    "Logged_In": 0,
    "id": "hr-1",
    "attendance": {
        "In": [],
        "Out": [],
        "_id": "5fe5c92ed3edf33c1491e40f"
    },
    "__v": 0
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: login
Route: /login
Request type: POST
Request body: {
    "email":"miro@gmail.com",
    "password":"123456"
}
Response:{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTVkN2YwOGM5Zjg3NTE4NGM3OGNkOCIsImlhdCI6MTYwODkwNTAxMX0.NXfUGnfxrSOjItOwT16OYI34rnFuh658kjdoySu4_j8",
    "msg": "Password Should Be Updated",
    "UpdatedUser2": {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5d7f08c9f875184c78cd8",
        "email": "miro@gmail.com",
        "password": "$2a$10$mzIfSUUrfb6kGobAk/2EH.eNp4U4EEsA59vsh5n8XzZlvTznrhjv.",
        "id": "ac-2",
        "Role": "Teaching Assistant",
        "name": "miro",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 50000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 3,
            "in": 1,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe5d7ef8c9f875184c78cd7"
        },
        "Day_Of_Registration": "2020-12-25T12:15:43.519Z",
        "course": [],
        "Schedule": [],
        "ArrayofRequests": [],
        "__v": 0
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: logout
Route: /logout
Request type: POST
Request body: {
    "email":"miro@gmail.com",
    "password":"123456"
}
Response:{
    "msg": "Logged Out Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view profile
Route: /ViewProfile
Request type: GET
Request body: {
    "email":"miro@gmail.com"
}
Response:{
    "Missing_Hours_Per_Month": {
        "h": 25,
        "m": 12
    },
    "Extra_Hours_Per_Month": {
        "h": 0,
        "m": 0
    },
    "_id": "5fe5d7f08c9f875184c78cd8",
    "email": "miro@gmail.com",
    "password": "$2a$10$mzIfSUUrfb6kGobAk/2EH.eNp4U4EEsA59vsh5n8XzZlvTznrhjv.",
    "id": "ac-2",
    "Role": "Teaching Assistant",
    "name": "miro",
    "Day_OFF": "sunday",
    "In_Out_Flag": 0,
    "Achieved_Hours_per_day": 0,
    "Logged_In": 0,
    "salary": 50000,
    "faculty": "Engineering",
    "department": "MET",
    "Location": {
        "nameofattendants": [],
        "_id": "5fe5c970d3edf33c1491e412",
        "name": "C7366",
        "type": "office",
        "capacity": 3,
        "in": 1,
        "reserved": false,
        "__v": 0
    },
    "attendance": {
        "In": [],
        "Out": [],
        "_id": "5fe5d7ef8c9f875184c78cd7"
    },
    "Day_Of_Registration": "2020-12-25T12:15:43.519Z",
    "course": [],
    "Schedule": [],
    "ArrayofRequests": [],
    "__v": 0
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: signin
Route: /signin
Request type: POST
Request body: {
    "email":"miro@gmail.com",
    "password":"123456"
}
Response:{
    "msg": " Signed In Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: signout
Route: /signout
Request type: POST
Request body: {
    "email":"miro@gmail.com",
    "password":"123456"
}
Response:{
    "msg": " Signed Out Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update profile
Route: /UpdateProfile
Request type: POST
Request body: {
    "email":"miro@gmail.com",
    "newemail":"miro2@gmail.com",
    "Day_OFF":"monday"
}
Response:{
    "msg": "Updated Successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: reset password
Route: /ResetPassword
Request type: POST
Request body: {
    "email":"miro@gmail.com",
    "password":"123"
}
Response:{
    "msg": "Password Updated"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view attendance record total
Route: /viewAttendanceTotal
Request type: GET
Request body: {
    "email":"amina@gmail.com"
}
Response:{
    "In": [],
    "Out": []
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view attendance record monthly
Route: /viewAttendanceMonthly
Request type: GET
Request body: {
    "email":"amina@gmail.com",
    "month":12
}
Response:{
    "In": [],
    "Out": []
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view Schedule Staff
Route: /ViewSchedule
Request type: GET
Request body: {
    "email":"khaled@gmail.com"
}
Response:[
    {
        "_id": "5fe60ae252cc88346c828e04",
        "time": 1,
        "location": {
            "nameofattendants": [],
            "_id": "5fe60acc52cc88346c828e01",
            "name": "H12",
            "type": "hall",
            "capacity": 100,
            "in": 0,
            "reserved": false,
            "__v": 0
        },
        "day": "tuesday",
        "course": {
            "_id": "5fe5d50a8c9f875184c78cc4",
            "name": "CSEN101",
            "__v": 0
        }
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: set Schedule HR
Route: /SetSchedule
Request type: POST
Request body: {
    "emailS":"omar@gmail.com",
    "time":2,
    "locationName":"H12",
    "courseName":"CSEN101",
    "day":"wednesday"
}
Response:[
    {
        "_id": "5fe60c7f6cb6445640d4d9b2",
        "time": 2,
        "location": {
            "nameofattendants": [],
            "_id": "5fe60acc52cc88346c828e01",
            "name": "H12",
            "type": "hall",
            "capacity": 100,
            "in": 0,
            "reserved": false,
            "__v": 0
        },
        "day": "wednesday",
        "course": {
            "_id": "5fe5d50a8c9f875184c78cc4",
            "name": "CSEN101",
            "__v": 0
        }
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View Slot Assignment CI
Route: /ViewSlotAssignment
Request type: GET
Request body: {
    "email":"khaled@gmail.com",
    "reqcourse":"CSEN101"
}
Response:[
    {
        "_id": "5fe60ae252cc88346c828e04",
        "time": 1,
        "location": {
            "nameofattendants": [],
            "_id": "5fe60acc52cc88346c828e01",
            "name": "H12",
            "type": "hall",
            "capacity": 100,
            "in": 0,
            "reserved": false,
            "__v": 0
        },
        "day": "tuesday",
        "course": {
            "_id": "5fe5d50a8c9f875184c78cc4",
            "name": "CSEN101",
            "__v": 0
        }
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Assign a course to course instructor
Route: /AssignStaffCourseHOD
Request type: POST
Request body: {
    "email":"boody@gmail.com",
    "emailSM":"khaled@gmail.com",
    "course":"CSEN101"
}   
Response:{
    "msg": "course is assigned succesfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update a course to course instructor
Route: /UpdateStaffCourseHOD
Request type: POST
Request body: {
    "email":"boody@gmail.com",
    "emailSM":"khaled@gmail.com",
    "reqcourse":"Math301",
    "oldcourse":"CSEN101"
}   
Response:{
    "msg": "staff member updated successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete a course to course instructor
Route: /DeleteStaffCourseHOD
Request type: DELETE
Request body: {
    "email":"boody@gmail.com",
    "emailSM":"khaled@gmail.com",
    "reqcourse":"Math301"
}   
Response:{
    "msg": "staff member course removed successfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: assign a course to course coordinator
Route: /AssignStaffCI
Request type: POST
Request body: {
    "email":"khaled@gmail.com",
    "emailSM":"omar@gmail.com",
    "reqcourse":"CSEN101",
    "time":3,
    "reqlocation":"C7366",
    "day":"tuesday"
}   
Response:{
    "msg": "Assigned succesfully"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View all the requests change day off or leave HOD
Route: /ViewRequestsDepartmentHOD
Request type: GET
Request body: {
    "email":"boody@gmail.com"
}
Response:{
    "Changedayoff": [
        {
            "_id": "5fe63156733be63bf878418d",
            "type": "Change Day OFF",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": "",
            "content": "I am sick",
            "day": "monday",
            "__v": 0
        }
    ],
    "Leave": [
        {
            "_id": "5fe631fca350364d3cd940cf",
            "type": "Leave",
            "emailTo": "boody@gmail.com",
            "emailFrom": "miro@gmail.com",
            "acceptance": "pending",
            "comment": " ",
            "content": "I am sick",
            "day": "monday",
            "__v": 0
        }
    ]
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View all the staffs day off HOD
Route: /ViewStaffDayOFFHOD
Request type: GET
Request body: {
    "email":"boody@gmail.com"
}
Response:{
    "monday": [
        {
            "Missing_Hours_Per_Month": {
                "h": 25,
                "m": 12
            },
            "Extra_Hours_Per_Month": {
                "h": 0,
                "m": 0
            },
            "_id": "5fe5d7f08c9f875184c78cd8",
            "email": "miro@gmail.com",
            "password": "$2a$10$1n8YCxEDDuEBOabQ8hWdC.8eWYjo0p0TJWqAVMXa.DMxToQ6FiBWK",
            "id": "ac-2",
            "Role": "Teaching Assistant",
            "name": "miro",
            "Day_OFF": "monday",
            "In_Out_Flag": 0,
            "Achieved_Hours_per_day": 0,
            "Logged_In": 1,
            "salary": 50000,
            "faculty": "Engineering",
            "department": "MET",
            "Location": {
                "nameofattendants": [],
                "_id": "5fe5c970d3edf33c1491e412",
                "name": "C7366",
                "type": "office",
                "capacity": 3,
                "in": 1,
                "reserved": false,
                "__v": 0
            },
            "attendance": {
                "In": [
                    "2020-12-25T14:08:56.228Z"
                ],
                "Out": [
                    "2020-12-25T14:09:59.094Z"
                ],
                "_id": "5fe5f2b7bc7b9713981f56b3",
                "Detector": 0
            },
            "Day_Of_Registration": "2020-12-25T12:15:43.519Z",
            "course": [],
            "Schedule": [],
            "ArrayofRequests": [
                {
                    "_id": "5fe63156733be63bf878418d",
                    "type": "Change Day OFF",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": "",
                    "content": "I am sick",
                    "day": "monday"
                },
                {
                    "_id": "5fe631c3c166372784fc98f3",
                    "type": "Compensation",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "content": "I am sick",
                    "day": "monday"
                },
                {
                    "_id": "5fe631fca350364d3cd940cf",
                    "type": "Leave",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "content": "I am sick",
                    "day": "monday"
                }
            ],
            "__v": 0
        }
    ],
    "sunday": [
        {
            "Missing_Hours_Per_Month": {
                "h": 25,
                "m": 12
            },
            "Extra_Hours_Per_Month": {
                "h": 0,
                "m": 0
            },
            "_id": "5fe5e7cb4f3313010c608502",
            "email": "boody@gmail.com",
            "password": "$2a$10$7X9DBPidFXPSUhhoy5tJSu1EeDeHOISIp1ElrDDqTmiywmtJHaKk.",
            "id": "ac-2",
            "Role": "Head Of Department",
            "name": "boody",
            "Day_OFF": "sunday",
            "In_Out_Flag": 0,
            "Achieved_Hours_per_day": 0,
            "Logged_In": 0,
            "salary": 40000,
            "faculty": "Engineering",
            "department": "MET",
            "Location": {
                "nameofattendants": [],
                "_id": "5fe5c970d3edf33c1491e412",
                "name": "C7366",
                "type": "office",
                "capacity": 25,
                "in": 2,
                "reserved": false,
                "__v": 0
            },
            "attendance": {
                "In": [],
                "Out": [],
                "_id": "5fe5e7cb4f3313010c608501"
            },
            "Day_Of_Registration": "2020-12-25T13:23:22.999Z",
            "course": [],
            "Schedule": [],
            "ArrayofRequests": [
                {
                    "_id": "5fe61c108232884f74407ee3",
                    "type": "Replacement",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "emailToS": "halim@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "slot": {
                        "_id": "5fe61c108232884f74407ee0",
                        "time": 5,
                        "location": {
                            "nameofattendants": [],
                            "_id": "5fe5c970d3edf33c1491e412",
                            "name": "C7366",
                            "type": "office",
                            "capacity": 25,
                            "in": 7,
                            "reserved": false,
                            "__v": 0
                        },
                        "day": "sunday",
                        "course": {
                            "_id": "5fe5d50a8c9f875184c78cc4",
                            "name": "CSEN101",
                            "__v": 0
                        }
                    }
                },
                {
                    "_id": "5fe630d028b44e22782aba40",
                    "type": "Slot Linking",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "slot": {
                        "_id": "5fe630d028b44e22782aba3d",
                        "time": 5,
                        "location": {
                            "nameofattendants": [],
                            "_id": "5fe60acc52cc88346c828e01",
                            "name": "H12",
                            "type": "hall",
                            "capacity": 100,
                            "in": 0,
                            "reserved": false,
                            "__v": 0
                        },
                        "day": "sunday",
                        "course": {
                            "_id": "5fe6249257ae7856100135f1",
                            "name": "Math301",
                            "__v": 0
                        }
                    }
                },
                {
                    "_id": "5fe63156733be63bf878418d",
                    "type": "Change Day OFF",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": "",
                    "content": "I am sick",
                    "day": "monday"
                },
                {
                    "_id": "5fe631c3c166372784fc98f3",
                    "type": "Compensation",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "content": "I am sick",
                    "day": "monday"
                },
                {
                    "_id": "5fe631fca350364d3cd940cf",
                    "type": "Leave",
                    "emailTo": "boody@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "content": "I am sick",
                    "day": "monday"
                }
            ],
            "__v": 0
        },
        {
            "Missing_Hours_Per_Month": {
                "h": 25,
                "m": 12
            },
            "Extra_Hours_Per_Month": {
                "h": 0,
                "m": 0
            },
            "_id": "5fe5e7e94f3313010c608506",
            "email": "khaled@gmail.com",
            "password": "$2a$10$mqRdS6YeSRt31MNDI9al.uT83BzIN0wcjETh5lBKCT0bsGx3kX5F2",
            "id": "ac-3",
            "Role": "Course Instructor",
            "name": "khaled",
            "Day_OFF": "sunday",
            "In_Out_Flag": 0,
            "Achieved_Hours_per_day": 0,
            "Logged_In": 0,
            "salary": 40000,
            "faculty": "Engineering",
            "department": "MET",
            "Location": {
                "nameofattendants": [],
                "_id": "5fe5c970d3edf33c1491e412",
                "name": "C7366",
                "type": "office",
                "capacity": 25,
                "in": 3,
                "reserved": false,
                "__v": 0
            },
            "attendance": {
                "In": [],
                "Out": [],
                "_id": "5fe5e7e94f3313010c608505"
            },
            "Day_Of_Registration": "2020-12-25T13:23:52.935Z",
            "course": [
                {
                    "_id": "5fe62661786fa44ba06611b2",
                    "name": "CSEN101"
                }
            ],
            "Schedule": [
                {
                    "_id": "5fe60ae252cc88346c828e04",
                    "time": 1,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe60acc52cc88346c828e01",
                        "name": "H12",
                        "type": "hall",
                        "capacity": 100,
                        "in": 0,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "tuesday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                }
            ],
            "ArrayofRequests": [],
            "__v": 0
        },
        {
            "Missing_Hours_Per_Month": {
                "h": 25,
                "m": 12
            },
            "Extra_Hours_Per_Month": {
                "h": 0,
                "m": 0
            },
            "_id": "5fe5e8024f3313010c60850a",
            "email": "omar@gmail.com",
            "password": "$2a$10$l9JMUvQ6ws/nRv18QqLHuONOqBh.5Rj/woYuu46g4ey5LTHNV4KiC",
            "id": "ac-4",
            "Role": "Course Coordinator",
            "name": "omar",
            "Day_OFF": "sunday",
            "In_Out_Flag": 0,
            "Achieved_Hours_per_day": 0,
            "Logged_In": 0,
            "salary": 40000,
            "faculty": "Engineering",
            "department": "MET",
            "Location": {
                "nameofattendants": [],
                "_id": "5fe5c970d3edf33c1491e412",
                "name": "C7366",
                "type": "office",
                "capacity": 25,
                "in": 4,
                "reserved": false,
                "__v": 0
            },
            "attendance": {
                "In": [],
                "Out": [],
                "_id": "5fe5e8024f3313010c608509"
            },
            "Day_Of_Registration": "2020-12-25T13:24:17.706Z",
            "course": [
                {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                },
                {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                },
                {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            ],
            "Schedule": [
                {
                    "_id": "5fe60c7f6cb6445640d4d9b2",
                    "time": 2,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe60acc52cc88346c828e01",
                        "name": "H12",
                        "type": "hall",
                        "capacity": 100,
                        "in": 0,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "wednesday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                },
                {
                    "_id": "5fe62c33e1e2de4c04f0f15f",
                    "time": 3,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe5c970d3edf33c1491e412",
                        "name": "C7366",
                        "type": "office",
                        "capacity": 25,
                        "in": 7,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "tuesday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                },
                {
                    "_id": "5fe62c91eae6c22878490731",
                    "time": 3,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe5c970d3edf33c1491e412",
                        "name": "C7366",
                        "type": "office",
                        "capacity": 25,
                        "in": 7,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "tuesday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                },
                {
                    "_id": "5fe62d5ba84b2d56842ae533",
                    "time": 3,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe5c970d3edf33c1491e412",
                        "name": "C7366",
                        "type": "office",
                        "capacity": 25,
                        "in": 7,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "tuesday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                }
            ],
            "ArrayofRequests": [
                {
                    "_id": "5fe630d028b44e22782aba44",
                    "type": "Slot Linking",
                    "emailTo": "omar@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "slot": {
                        "_id": "5fe630d028b44e22782aba3d",
                        "time": 5,
                        "location": {
                            "nameofattendants": [],
                            "_id": "5fe60acc52cc88346c828e01",
                            "name": "H12",
                            "type": "hall",
                            "capacity": 100,
                            "in": 0,
                            "reserved": false,
                            "__v": 0
                        },
                        "day": "sunday",
                        "course": {
                            "_id": "5fe6249257ae7856100135f1",
                            "name": "Math301",
                            "__v": 0
                        }
                    }
                }
            ],
            "__v": 0
        },
        {
            "Missing_Hours_Per_Month": {
                "h": 25,
                "m": 12
            },
            "Extra_Hours_Per_Month": {
                "h": 0,
                "m": 0
            },
            "_id": "5fe61a5f34cbfe3ff8be3b66",
            "email": "halim@gmail.com",
            "password": "$2a$10$LGwf8TOHYvqQQCVZmjJ.ZuU7/y2JHRAQCeXi5KVtq.Y2FmPrjQi2y",
            "id": "ac-5",
            "Role": "Teaching Assistant",
            "name": "halim",
            "Day_OFF": "sunday",
            "In_Out_Flag": 0,
            "Achieved_Hours_per_day": 0,
            "Logged_In": 0,
            "salary": 40000,
            "faculty": "Engineering",
            "department": "MET",
            "Location": {
                "nameofattendants": [],
                "_id": "5fe5c970d3edf33c1491e412",
                "name": "C7366",
                "type": "office",
                "capacity": 25,
                "in": 6,
                "reserved": false,
                "__v": 0
            },
            "attendance": {
                "In": [],
                "Out": [],
                "_id": "5fe61a5e34cbfe3ff8be3b65"
            },
            "Day_Of_Registration": "2020-12-25T16:59:09.105Z",
            "course": [],
            "Schedule": [],
            "ArrayofRequests": [
                {
                    "_id": "5fe61c108232884f74407ee7",
                    "type": "Replacement",
                    "emailTo": "halim@gmail.com",
                    "emailFrom": "miro@gmail.com",
                    "acceptance": "pending",
                    "comment": " ",
                    "slot": {
                        "_id": "5fe61c108232884f74407ee0",
                        "time": 5,
                        "location": {
                            "nameofattendants": [],
                            "_id": "5fe5c970d3edf33c1491e412",
                            "name": "C7366",
                            "type": "office",
                            "capacity": 25,
                            "in": 7,
                            "reserved": false,
                            "__v": 0
                        },
                        "day": "sunday",
                        "course": {
                            "_id": "5fe5d50a8c9f875184c78cc4",
                            "name": "CSEN101",
                            "__v": 0
                        }
                    }
                }
            ],
            "__v": 0
        }
    ]
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View specific staff day off HOD
Route: /ViewStaffDayOFFHODSM
Request type: GET
Request body: {
    "email":"boody@gmail.com",
    "emailSM":"miro@gmail.com"
}
Response:"monday"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View staff in department HOD
Route: /ViewStaffInDepartmentHOD
Request type: GET
Request body: {
    "email":"boody@gmail.com"
}
Response:[
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5d7f08c9f875184c78cd8",
        "email": "miro@gmail.com",
        "password": "$2a$10$1n8YCxEDDuEBOabQ8hWdC.8eWYjo0p0TJWqAVMXa.DMxToQ6FiBWK",
        "id": "ac-2",
        "Role": "Teaching Assistant",
        "name": "miro",
        "Day_OFF": "monday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 1,
        "salary": 50000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 3,
            "in": 1,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [
                "2020-12-25T14:08:56.228Z"
            ],
            "Out": [
                "2020-12-25T14:09:59.094Z"
            ],
            "_id": "5fe5f2b7bc7b9713981f56b3",
            "Detector": 0
        },
        "Day_Of_Registration": "2020-12-25T12:15:43.519Z",
        "course": [],
        "Schedule": [],
        "ArrayofRequests": [
            {
                "_id": "5fe63156733be63bf878418d",
                "type": "Change Day OFF",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": "",
                "content": "I am sick",
                "day": "monday"
            },
            {
                "_id": "5fe631c3c166372784fc98f3",
                "type": "Compensation",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "content": "I am sick",
                "day": "monday"
            },
            {
                "_id": "5fe631fca350364d3cd940cf",
                "type": "Leave",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "content": "I am sick",
                "day": "monday"
            }
        ],
        "__v": 0
    },
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5e7cb4f3313010c608502",
        "email": "boody@gmail.com",
        "password": "$2a$10$7X9DBPidFXPSUhhoy5tJSu1EeDeHOISIp1ElrDDqTmiywmtJHaKk.",
        "id": "ac-2",
        "Role": "Head Of Department",
        "name": "boody",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 40000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 25,
            "in": 2,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe5e7cb4f3313010c608501"
        },
        "Day_Of_Registration": "2020-12-25T13:23:22.999Z",
        "course": [],
        "Schedule": [],
        "ArrayofRequests": [
            {
                "_id": "5fe61c108232884f74407ee3",
                "type": "Replacement",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "emailToS": "halim@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "slot": {
                    "_id": "5fe61c108232884f74407ee0",
                    "time": 5,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe5c970d3edf33c1491e412",
                        "name": "C7366",
                        "type": "office",
                        "capacity": 25,
                        "in": 7,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "sunday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                }
            },
            {
                "_id": "5fe630d028b44e22782aba40",
                "type": "Slot Linking",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "slot": {
                    "_id": "5fe630d028b44e22782aba3d",
                    "time": 5,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe60acc52cc88346c828e01",
                        "name": "H12",
                        "type": "hall",
                        "capacity": 100,
                        "in": 0,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "sunday",
                    "course": {
                        "_id": "5fe6249257ae7856100135f1",
                        "name": "Math301",
                        "__v": 0
                    }
                }
            },
            {
                "_id": "5fe63156733be63bf878418d",
                "type": "Change Day OFF",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": "",
                "content": "I am sick",
                "day": "monday"
            },
            {
                "_id": "5fe631c3c166372784fc98f3",
                "type": "Compensation",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "content": "I am sick",
                "day": "monday"
            },
            {
                "_id": "5fe631fca350364d3cd940cf",
                "type": "Leave",
                "emailTo": "boody@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "content": "I am sick",
                "day": "monday"
            }
        ],
        "__v": 0
    },
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5e7e94f3313010c608506",
        "email": "khaled@gmail.com",
        "password": "$2a$10$mqRdS6YeSRt31MNDI9al.uT83BzIN0wcjETh5lBKCT0bsGx3kX5F2",
        "id": "ac-3",
        "Role": "Course Instructor",
        "name": "khaled",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 40000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 25,
            "in": 3,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe5e7e94f3313010c608505"
        },
        "Day_Of_Registration": "2020-12-25T13:23:52.935Z",
        "course": [
            {
                "_id": "5fe62661786fa44ba06611b2",
                "name": "CSEN101"
            }
        ],
        "Schedule": [
            {
                "_id": "5fe60ae252cc88346c828e04",
                "time": 1,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe60acc52cc88346c828e01",
                    "name": "H12",
                    "type": "hall",
                    "capacity": 100,
                    "in": 0,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            }
        ],
        "ArrayofRequests": [],
        "__v": 0
    },
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5e8024f3313010c60850a",
        "email": "omar@gmail.com",
        "password": "$2a$10$l9JMUvQ6ws/nRv18QqLHuONOqBh.5Rj/woYuu46g4ey5LTHNV4KiC",
        "id": "ac-4",
        "Role": "Course Coordinator",
        "name": "omar",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 40000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 25,
            "in": 4,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe5e8024f3313010c608509"
        },
        "Day_Of_Registration": "2020-12-25T13:24:17.706Z",
        "course": [
            {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            },
            {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            },
            {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            }
        ],
        "Schedule": [
            {
                "_id": "5fe60c7f6cb6445640d4d9b2",
                "time": 2,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe60acc52cc88346c828e01",
                    "name": "H12",
                    "type": "hall",
                    "capacity": 100,
                    "in": 0,
                    "reserved": false,
                    "__v": 0
                },
                "day": "wednesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            {
                "_id": "5fe62c33e1e2de4c04f0f15f",
                "time": 3,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            {
                "_id": "5fe62c91eae6c22878490731",
                "time": 3,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            {
                "_id": "5fe62d5ba84b2d56842ae533",
                "time": 3,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            }
        ],
        "ArrayofRequests": [
            {
                "_id": "5fe630d028b44e22782aba44",
                "type": "Slot Linking",
                "emailTo": "omar@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "slot": {
                    "_id": "5fe630d028b44e22782aba3d",
                    "time": 5,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe60acc52cc88346c828e01",
                        "name": "H12",
                        "type": "hall",
                        "capacity": 100,
                        "in": 0,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "sunday",
                    "course": {
                        "_id": "5fe6249257ae7856100135f1",
                        "name": "Math301",
                        "__v": 0
                    }
                }
            }
        ],
        "__v": 0
    },
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe61a5f34cbfe3ff8be3b66",
        "email": "halim@gmail.com",
        "password": "$2a$10$LGwf8TOHYvqQQCVZmjJ.ZuU7/y2JHRAQCeXi5KVtq.Y2FmPrjQi2y",
        "id": "ac-5",
        "Role": "Teaching Assistant",
        "name": "halim",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 40000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 25,
            "in": 6,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe61a5e34cbfe3ff8be3b65"
        },
        "Day_Of_Registration": "2020-12-25T16:59:09.105Z",
        "course": [],
        "Schedule": [],
        "ArrayofRequests": [
            {
                "_id": "5fe61c108232884f74407ee7",
                "type": "Replacement",
                "emailTo": "halim@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "slot": {
                    "_id": "5fe61c108232884f74407ee0",
                    "time": 5,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe5c970d3edf33c1491e412",
                        "name": "C7366",
                        "type": "office",
                        "capacity": 25,
                        "in": 7,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "sunday",
                    "course": {
                        "_id": "5fe5d50a8c9f875184c78cc4",
                        "name": "CSEN101",
                        "__v": 0
                    }
                }
            }
        ],
        "__v": 0
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: View staff in department per course HOD
Route: /ViewStaffInDepartmentHODPerCourse
Request type: GET
Request body: {
    "email":"boody@gmail.com",
    "course":"CSEN101"
}
Response:[
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5e7e94f3313010c608506",
        "email": "khaled@gmail.com",
        "password": "$2a$10$mqRdS6YeSRt31MNDI9al.uT83BzIN0wcjETh5lBKCT0bsGx3kX5F2",
        "id": "ac-3",
        "Role": "Course Instructor",
        "name": "khaled",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 40000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 25,
            "in": 3,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe5e7e94f3313010c608505"
        },
        "Day_Of_Registration": "2020-12-25T13:23:52.935Z",
        "course": [
            {
                "_id": "5fe62661786fa44ba06611b2",
                "name": "CSEN101"
            }
        ],
        "Schedule": [
            {
                "_id": "5fe60ae252cc88346c828e04",
                "time": 1,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe60acc52cc88346c828e01",
                    "name": "H12",
                    "type": "hall",
                    "capacity": 100,
                    "in": 0,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            }
        ],
        "ArrayofRequests": [],
        "__v": 0
    },
    {
        "Missing_Hours_Per_Month": {
            "h": 25,
            "m": 12
        },
        "Extra_Hours_Per_Month": {
            "h": 0,
            "m": 0
        },
        "_id": "5fe5e8024f3313010c60850a",
        "email": "omar@gmail.com",
        "password": "$2a$10$l9JMUvQ6ws/nRv18QqLHuONOqBh.5Rj/woYuu46g4ey5LTHNV4KiC",
        "id": "ac-4",
        "Role": "Course Coordinator",
        "name": "omar",
        "Day_OFF": "sunday",
        "In_Out_Flag": 0,
        "Achieved_Hours_per_day": 0,
        "Logged_In": 0,
        "salary": 40000,
        "faculty": "Engineering",
        "department": "MET",
        "Location": {
            "nameofattendants": [],
            "_id": "5fe5c970d3edf33c1491e412",
            "name": "C7366",
            "type": "office",
            "capacity": 25,
            "in": 4,
            "reserved": false,
            "__v": 0
        },
        "attendance": {
            "In": [],
            "Out": [],
            "_id": "5fe5e8024f3313010c608509"
        },
        "Day_Of_Registration": "2020-12-25T13:24:17.706Z",
        "course": [
            {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            },
            {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            },
            {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            }
        ],
        "Schedule": [
            {
                "_id": "5fe60c7f6cb6445640d4d9b2",
                "time": 2,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe60acc52cc88346c828e01",
                    "name": "H12",
                    "type": "hall",
                    "capacity": 100,
                    "in": 0,
                    "reserved": false,
                    "__v": 0
                },
                "day": "wednesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            {
                "_id": "5fe62c33e1e2de4c04f0f15f",
                "time": 3,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            {
                "_id": "5fe62c91eae6c22878490731",
                "time": 3,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            },
            {
                "_id": "5fe62d5ba84b2d56842ae533",
                "time": 3,
                "location": {
                    "nameofattendants": [],
                    "_id": "5fe5c970d3edf33c1491e412",
                    "name": "C7366",
                    "type": "office",
                    "capacity": 25,
                    "in": 7,
                    "reserved": false,
                    "__v": 0
                },
                "day": "tuesday",
                "course": {
                    "_id": "5fe5d50a8c9f875184c78cc4",
                    "name": "CSEN101",
                    "__v": 0
                }
            }
        ],
        "ArrayofRequests": [
            {
                "_id": "5fe630d028b44e22782aba44",
                "type": "Slot Linking",
                "emailTo": "omar@gmail.com",
                "emailFrom": "miro@gmail.com",
                "acceptance": "pending",
                "comment": " ",
                "slot": {
                    "_id": "5fe630d028b44e22782aba3d",
                    "time": 5,
                    "location": {
                        "nameofattendants": [],
                        "_id": "5fe60acc52cc88346c828e01",
                        "name": "H12",
                        "type": "hall",
                        "capacity": 100,
                        "in": 0,
                        "reserved": false,
                        "__v": 0
                    },
                    "day": "sunday",
                    "course": {
                        "_id": "5fe6249257ae7856100135f1",
                        "name": "Math301",
                        "__v": 0
                    }
                }
            }
        ],
        "__v": 0
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Delete course in course coordinator CI
Route: /DeleteCourseStaffCI
Request type: DELETE
Request body: {
    "emailCI":"khaled@gmail.com",
    "emailCC":"omar@gmail.com",
    "reqcourse":"CA305"
}
Response: {
       msg:"Course Deleted Successfully"
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Course Coverage HOD
Route: /ViewCourseCoverageHOD
Request type: GET
Request body: {
    "email":"boody@gmail.com",
    "course":"CSEN101"
   
}
Response: 25
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: Course Coverage CI
Route: /ViewCourseCoverageCI
Request type: GET
Request body: {
    "email":"khaled@gmail.com",
    "course":"CSEN101"
}
Response: 25
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view teaching assignments HOD
Route: /ViewTeachingAssignmentsHOD
Request type: GET
Request body: {
    "email":"boody@gmail.com",
    "reqcourse":"CSEN101" 
}
Response: [
    [
        {
            "_id": "5fe60ae252cc88346c828e04",
            "time": 1,
            "location": {
                "nameofattendants": [],
                "_id": "5fe60acc52cc88346c828e01",
                "name": "H12",
                "type": "hall",
                "capacity": 100,
                "in": 0,
                "reserved": false,
                "__v": 0
            },
            "day": "tuesday",
            "course": {
                "_id": "5fe5d50a8c9f875184c78cc4",
                "name": "CSEN101",
                "__v": 0
            }
        }
    ]
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: accept a slot linking request CC
Route: /AcceptSlotLinkingRequest
Request type: POST
Request body: {
    "email":"omar@gmail.com",
    "emailSM":"miro@gmail.com"
}
Response:[
    {
        "_id": "5fe630d028b44e22782aba3d",
        "time": 5,
        "location": {
            "nameofattendants": [],
            "_id": "5fe60acc52cc88346c828e01",
            "name": "H12",
            "type": "hall",
            "capacity": 100,
            "in": 0,
            "reserved": false,
            "__v": 0
        },
        "day": "sunday",
        "course": {
            "_id": "5fe6249257ae7856100135f1",
            "name": "Math301",
            "__v": 0
        }
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: reject a slot linking request CC
Route: /RejectSlotLinkingRequest
Request type: POST
Request body: {
    "email":"omar@gmail.com",
    "emailSM":"miro@gmail.com"
}
Response:{
    "msg": "Unfortunately, your request has been rejected"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: view a slot linking request CC
Route: /ViewSlotLinkingRequest
Request type: GET
Request body: {
    "email":"omar@gmail.com"
}
Response:[
    {
        "_id": "5fe651908934741fe8ac5c1d",
        "type": "Slot Linking",
        "emailTo": "omar@gmail.com",
        "emailFrom": "miro@gmail.com",
        "acceptance": "pending",
        "comment": " ",
        "slot": {
            "_id": "5fe651908934741fe8ac5c16",
            "time": 5,
            "location": {
                "nameofattendants": [],
                "_id": "5fe60acc52cc88346c828e01",
                "name": "H12",
                "type": "hall",
                "capacity": 100,
                "in": 0,
                "reserved": false,
                "__v": 0
            },
            "day": "sunday",
            "course": {
                "_id": "5fe6249257ae7856100135f1",
                "name": "Math301",
                "__v": 0
            }
        }
    },
    {
        "_id": "5fe651958934741fe8ac5cb6",
        "type": "Slot Linking",
        "emailTo": "omar@gmail.com",
        "emailFrom": "miro@gmail.com",
        "acceptance": "pending",
        "comment": " ",
        "slot": {
            "_id": "5fe651958934741fe8ac5caf",
            "time": 5,
            "location": {
                "nameofattendants": [],
                "_id": "5fe60acc52cc88346c828e01",
                "name": "H12",
                "type": "hall",
                "capacity": 100,
                "in": 0,
                "reserved": false,
                "__v": 0
            },
            "day": "sunday",
            "course": {
                "_id": "5fe6249257ae7856100135f1",
                "name": "Math301",
                "__v": 0
            }
        }
    }
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: add course slot CC
Route: /AddCourseSlot
Request type: POST
Request body: {
    "email":"omar@gmail.com",
    "coursename":"Math301",
    "time":2,
    "Location":"H12",
    "day":"thursday"
   
}
Response:{
    "msg": "The course slot has been added successfully!"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: update course slot CC
Route: /UpdateCourseSlot
Request type: POST
Request body: {
    "email":"omar@gmail.com",
    "coursename":"Math301",
    "newtime":3,
    "newlocation":"C7366",
    "newday":"monday"
   
}
Response:{
    "msg": "The course slot has been Updated successfully!"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Functionality: delete course slot CC
Route: /DeleteCourseSlot
Request type: Delete
Request body: {
    "email":"omar@gmail.com",
    "coursename":"Math301",
    "time":3,
    "Location":"C7366",
    "day":"monday" 
}
Response:{
    "msg": "The course slot has been deleted successfully!"
}