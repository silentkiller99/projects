let studentId = sessionStorage.getItem("signedInUser");
if (!studentName) window.location.href = "../index.html";

let students = JSON.parse(localStorage.getItem("usersStudent"));
let student = students.find((s) => s.email === studentId.email);

document.querySelector("h1").textContent += ` - ${student.name}`;

let courseList = document.querySelector(".course-list");
student.courses.forEach((courseName) => {
  let div = document.createElement("div");
  div.classList.add("course");
  div.textContent = courseName;
  courseList.appendChild(div);
});
