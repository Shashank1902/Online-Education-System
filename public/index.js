const adminBtn = document.querySelector("#admin");
const teacherBtn = document.querySelector("#teacher");
const studentsBtn = document.querySelector("#students");

adminBtn.onclick = function() {
    teacherBtn.checked = studentsBtn.checked = false;
};

teacherBtn.onclick = function() {
    adminBtn.checked = studentsBtn.checked = false;
};

studentsBtn.onclick = function() {
    adminBtn.checked = teacherBtn.checked = false;
};

