const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/schoolDB', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

const adminSchema = {
    name: String,
    userId: String,
    password: String,
};

const teacherSchema = {
    name: String,
    contactNo: Number,
    userId: String,
    password: String,
};

const studentSchema = {
    name: String,
    contactNo: Number,
    class: String,
    enrollNo: String,
    userId: String,
    password: String,
};

const classSchema = {
    class: String,
    sub1: String,
    sub2: String,
    sub3: String,
    sub4: String,
    sub5: String,
};

const Admin = new mongoose.model("Admin", adminSchema);
const Teacher = new mongoose.model("Teacher", teacherSchema);
const Student = new mongoose.model("Student", studentSchema);
const Class = new mongoose.model("Class", classSchema);

const admin1 = new Admin ({
    name: "Admin2",
    userId: "admin2@se",
    password: "123456",
});

//admin1.save();

var msg = "";

const successTMsg = function() {
    msg = "success";
};
const failTMsg = function() {
    msg = "fail";
};

const incId = function() {
    msg = "id";
};
const incPass = function() {
    msg = "password";
};


app.get("/", function(req, res) {
    res.render("login.ejs", {msg: msg});
    msg = "";
});

app.post("/", function(req, res) {

    const admin = req.body.admin;
    const teacher = req.body.teacher;
    const student = req.body.student;

    const userName = req.body.username;
    const password = req.body.password;

    try {
        if(admin === "on") {

            Admin.findOne({userId: userName}, function(err, foundAdmin) {
                if(!foundAdmin) {
                    incId();
                    res.redirect("/");
                    console.log(err);
                } else {
                    if(foundAdmin) {
                        if(foundAdmin.password === password) {
                            res.redirect("/admin");
                        } else {
                            incPass();
                            res.redirect("/");
                        }
                    }
                }
            });
        }
    
        if(teacher === "on") {
    
            Teacher.findOne({userId: userName}, function(err, foundTeacher) {
                if(!foundTeacher) {
                    incId();
                    res.redirect("/");
                    console.log(err);
                } else {
                    if(foundTeacher) {
                        if(foundTeacher.password === password) {
                            res.redirect("/teacher");
                        } else {
                            incPass();
                            res.redirect("/");
                        }
                    }
                }
            });
        }
    
        if(student === "on") {
            Student.findOne({userId: userName}, function(err, foundStudent) {
                if(!foundStudent) {
                    incId();
                    res.redirect("/");
                    console.log(err);
                } else {
                    if(foundStudent) {
                        if(foundStudent.password === password) {
                            res.redirect("/student");
                        } else {
                            incPass();
                            res.redirect("/");
                        }
                    }
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }

});

app.get("/admin", function(req, res) {
    res.render("admin.ejs");
});


//////////////// Add Teacher ///////////////

app.get("/addteacher", (req, res) => {
    
    res.render("addteacher.ejs", {msg: msg});
    msg = "";
});

app.post("/addteacher", (req, res) => {

    const tName = req.body.teaName;
    const tCon = req.body.teaCon;
    const tId = req.body.teaId;
    const tPass = req.body.teaPass;

    const teacher = new Teacher ({
        name: tName,
        contactNo: tCon,
        userId: tId,
        password: tPass,
    });
    
    teacher.save(function(err, teacher) {
        if(err) {
            console.log(err);
            failTMsg();
            res.redirect("/addteacher");
        } else {
            successTMsg();
            res.redirect("/addteacher");
        }
    });
});

///////////////// Add Student //////////////

app.get("/addstudent", (req, res) => {
    res.render("addstudent.ejs", {msg: msg});
    msg = "";
});

app.post("/addstudent", (req, res) => {

    const sName = req.body.sName;
    const sCon = req.body.sCon;
    const sClass = req.body.sClass;
    const sEnroll = req.body.sEnroll;
    const sId = req.body.sId;
    const sPass = req.body.sPass;

    console.log(sName, sCon, sClass, sEnroll, sId, sPass);

    const student = new Student ({
        name: sName,
        contactNo: sCon,
        class: sClass,
        enrollNo: sEnroll,
        userId: sId,
        password: sPass,
    });
    
    student.save(function(err, student) {
        if(err) {
            console.log(err);
            failTMsg();
            res.redirect("/addstudent");
        } else {
            successTMsg();
            res.redirect("/addstudent");
        }
    });
});

//////////////////// Add Class ////////////////

app.get("/addclass", (req, res) => {
    res.render("addclass.ejs", {msg: msg});
    msg = "";
});

app.post("/addclass", (req, res) => {

    const className = req.body.class;
    const sub1 = req.body.sub1;
    const sub2 = req.body.sub2;
    const sub3 = req.body.sub3;
    const sub4 = req.body.sub4;
    const sub5 = req.body.sub5;

    const class1 = new Class ({
        class: className,
        sub1: sub1,
        sub2: sub2,
        sub3: sub3,
        sub4: sub4,
        sub5: sub5,
    });
    
    class1.save(function(err, class1) {
        if(err) {
            console.log(err);
            failTMsg();
            res.redirect("/addclass");
        } else {
            successTMsg();
            res.redirect("/addclass");
        }
    });
});


app.get("/teacher", (req, res) => {
    res.render("teacher.ejs");
});

app.get("/student", (req, res) => {
    res.render("student.ejs")
});

app.get("/meeting", (req, res) => {
    res.render("meeting.ejs");
});

app.get("/giveassignment", (req, res) => {
    res.render('giveassignment.ejs');
});

app.get("/submitassignment", (req, res) => {
    res.render('submitassignment.ejs');
});

app.listen(3000, (res, req) => {
    console.log("Server started on port 3000");
});