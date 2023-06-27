let email, password, userType, user, name;

document.getElementById("signUpBtn").addEventListener("click", signUpUser);
document.getElementById("signInBtn").addEventListener("click", signInUser);

function getDataBase() {
  if (localStorage.getItem("usersStudent") === null)
    localStorage.setItem("usersStudent", "[]");
  if (localStorage.getItem("usersAdmin") === null)
    localStorage.setItem("usersAdmin", "[]");
}

function signUpUser() {
  email = document.getElementById(`emailSignUp`).value.trim();
  password = document.getElementById(`passwordSignUp`).value.trim();
  userType = document.getElementById("userTypeSignUp").value;
  name = document.getElementById("nameSignUp").value.trim();
  getDataBase();
  user = {
    email: email,
    password: password,
    userType: userType,
    name: name,
  };
  if (!validateUserSignUp(user)) {
    if (userType === "student") registerStudent();
    else if (userType === "admin") registerAdmin();

    alert("Signed up successfully!");
  } else alert("Email already Registered!");
}

function registerAdmin() {
  let users = JSON.parse(localStorage.getItem("usersAdmin"));
  users.push(user);
  localStorage.setItem("usersAdmin", JSON.stringify(users));
}

function registerStudent() {
  user = {
    name: name,
    email: email,
    password: password,
    userType: userType,
    courses: [],
  };
  let users = JSON.parse(localStorage.getItem("usersStudent"));
  users.push(user);
  localStorage.setItem("usersStudent", JSON.stringify(users));
}

function signInUser() {
  email = document.getElementById(`emailSignIn`).value;
  password = document.getElementById(`passwordSignIn`).value;
  userType = document.getElementById("userTypeSignIn").value;
  user = {
    email: email,
    password: password,
    userType: userType,
  };
  getDataBase();
  if (validateUserSignIn(user)) {
    sessionStorage.setItem(
      "signedInUser",
      JSON.stringify({
        email: email,
        userType: userType,
      })
    );
    if (userType === "admin") {
      console.log("dertuio");
      window.location.replace("admin/admin.html");
    } else if (userType === "student")
      window.location.href = "./student/student.html";
  } else alert("Sign Up first!");
}

function validateUserSignUp() {
  let regex = /(?:^[a-zA-Z0-9_\.\-]+[@][a-z]+\.[a-z]{2,3}$)/i;
  if (regex.test(email)) {
    let users;
    if (userType === "student")
      users = JSON.parse(localStorage.getItem("usersStudent"));
    else if (userType === "admin")
      users = JSON.parse(localStorage.getItem("usersAdmin"));
    let result = false;
    users.forEach((user) => {
      if (result == false) result = email === user.email;
      else return result;
    });
    return result;
  } else return false;
}

function validateUserSignIn() {
  let regex = /(?:^[a-zA-Z0-9_\.\-]+[@][a-z]+\.[a-z]{2,3}$)/i;
  if (regex.test(email)) {
    let users;
    if (userType === "student")
      users = JSON.parse(localStorage.getItem("usersStudent"));
    else if (userType === "admin")
      users = JSON.parse(localStorage.getItem("usersAdmin"));
    let result = false;
    users.forEach((user) => {
      if (result == false)
        result = email === user.email && password === user.password;
      else return result;
    });
    return result;
  } else return false;
}

// function validateUserSignIn(user) {
//   let users;
//   if (userType === "student")
//     users = JSON.parse(localStorage.getItem("usersStudent"));
//   else if (userType === "admin")
//     users = JSON.parse(localStorage.getItem("usersAdmin"));
//   let isUserFound = false;
//   let isPasswordCorrect = false;

//   for (let i = 0; i < users.length; i++) {
//     if (users[i].email === user.email) {
//       isUserFound = true;
//       if (users[i].password === user.password) {
//         isPasswordCorrect = true;
//         break;
//       } else {
//         alert("Wrong Password!");
//         location.reload();
//       }
//     }
//   }
//   if (isUserFound === true && isPasswordCorrect === true) return true;
//   else return false;
// }

// function validateUserSignUp(user) {
//   let users;
//   if (userType === "student")
//     users = JSON.parse(localStorage.getItem("usersStudent"));
//   else users = JSON.parse(localStorage.getItem("usersAdmin"));
//   if (users !== "null") {
//     users.forEach((element) => {
//       if (element.email === user.email) return true;
//     });
//   }
//   return false;
// }
