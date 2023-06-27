if (!sessionStorage.getItem("signedInUser"))
  window.location.href = "../index.html";

if (localStorage.getItem("courses") === null)
  localStorage.setItem("courses", "[]");

let students = JSON.parse(localStorage.getItem("usersStudent"));
let courses = JSON.parse(localStorage.getItem("courses"));

let courseTableBody = document.getElementById("courseTableBody");
courses.forEach(function (course) {
  let row = document.createElement("tr");
  let nameCell = document.createElement("td");
  let actionCell = document.createElement("td");
  let deleteBtn = document.createElement("button");

  nameCell.textContent = course;
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger";

  deleteBtn.addEventListener("click", () => {
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    row.remove();
  });

  actionCell.appendChild(deleteBtn);
  row.appendChild(nameCell);
  row.appendChild(actionCell);
  courseTableBody.appendChild(row);
});

let studentTab = document.getElementById("studentsNav");
studentTab.addEventListener("click", () => {
  let studentTableBody = document.getElementById("studentTableBody");
  students.forEach((student) => {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let coursesCell = document.createElement("td");
    let actionCell = document.createElement("td");
    let assignBtn = document.createElement("button");
    let revokeBtn = document.createElement("button");

    nameCell.textContent = student.name;
    coursesCell.textContent = student.courses.join(", ");
    assignBtn.textContent = "Assign Course";
    assignBtn.className = "btn btn-primary";

    assignBtn.addEventListener("click", () => {
      let course = prompt("Enter course name: ");
      if (!doesStudentHaveCourse(student, course)) {
        student.courses.push(course);
        localStorage.setItem("usersStudent", JSON.stringify(students));
        coursesCell.textContent = student.courses.join(", ");
      } else alert("Create Course First!");
    });

    revokeBtn.textContent = "Revoke Course";
    revokeBtn.className = "btn btn-danger";

    revokeBtn.addEventListener("click", () => {
      let course = prompt("Enter course name: ");
      if (doesStudentHaveCourse(student, course)) {
        let index = student.courses.indexOf(course);
        student.courses.splice(index, 1);
        localStorage.setItem("usersStudent", JSON.stringify(students));
        coursesCell.textContent = student.courses.join(", ");
      } else alert(`${student.name} doesn't have this course!`);
    });
    actionCell.appendChild(assignBtn);
    actionCell.appendChild(revokeBtn);
    row.appendChild(nameCell);
    row.appendChild(coursesCell);
    row.appendChild(actionCell);
    studentTableBody.appendChild(row);
  });
});

let addCourse = document.getElementById("createCourseBtn");
addCourse.addEventListener("click", () => {
  let courseName = prompt("courseName :   ", "");
  if (!doesCourseExists(courseName)) {
    courses.push(courseName);
    localStorage.setItem("courses", JSON.stringify(courses));
    window.location.reload();
  } else alert("Course Already Exist!");
});

function doesCourseExists(courseName) {
  let flag = false;
  courses.forEach((course) => {
    if (!flag) flag = course === courseName;
    else return flag;
  });
  return flag;
}

function doesStudentHaveCourse(student, courseName) {
  let flag = false;
  student.courses.forEach((course) => {
    if (!flag) flag = course === courseName;
    else return flag;
  });
  return flag;
}
