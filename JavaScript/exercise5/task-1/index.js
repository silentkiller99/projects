let checkU;
let loginIndex;

if (localStorage.getItem("dataA") == null) 
  localStorage.setItem("dataA", "[]");

if (localStorage.getItem("dataS") == null) 
  localStorage.setItem("dataS", "[]");

function checkbtn(event) {
  checkU = event.target.value;
  console.log(checkU);
}

function validateInput() {
  let regex = /(?:^[a-zA-Z0-9_\.\-]+[@][a-z]+\.[a-z]{2,3}$)/i;
  let email = document.getElementById("logemaill").value.trim();
  let password = document.getElementById("logpassl").value.trim();
  if (regex.test(email)) {
    obj = { email_Id: email, password: password };
    let r = validateUser(obj, checkU);

    if (r) {
      if (checkU == "admin") {
        window.location.href = "admin/admin.html";
      } else if (checkU == "student") {
        userListS = JSON.parse(localStorage.getItem("dataS"));
        sessionStorage.setItem("loginS", JSON.stringify(userListS[loginIndex-1]));
        window.location.href = "student/student.html";
      }
    } else alert("SignUp First");
  } else {
    alert("InvalidEmail");
  }
}

function validateUser(obj) {
  loginIndex = 0;
  let userList;
  if (checkU == "admin") userList = JSON.parse(localStorage.getItem("dataA"));
  else if(checkU == "student") userList = JSON.parse(localStorage.getItem("dataS"));
  let result = false;
  userList.forEach((o) => {
    if (result == false)
      result = o.email_Id === obj.email_Id && o.password === obj.password;
    else return result;
    loginIndex++;
  });
  return result;
}

function insertUser(event) {
    let userList;
    let namen = document.getElementById("logname").value.trim();
    let regex = /(?:^[a-zA-Z0-9_\.\-]+[@][a-z]+\.[a-z]{2,3}$)/i;
    let emailn = document.getElementById("logemail").value.trim();
    let passwordn = document.getElementById("logpass").value.trim();
  if (regex.test(emailn)) {
    let obj = { email_Id: emailn, password: passwordn, name: namen };
    let r = validateUser(obj);
    if (r) alert("EmailAlreadyExists");
    else {
      if (checkU == "admin") {
        userList = JSON.parse(localStorage.getItem("dataA"));
        let obj = { email_Id: emailn, password: passwordn, name: namen };

            userList.push(obj);
            localStorage.setItem("dataA", JSON.stringify(userList));
      } else if (checkU == "student"){
        userList = JSON.parse(localStorage.getItem("dataS"));
        let obj = { email_Id: emailn, password: passwordn, name: namen, courses: [] };
        userList.push(obj);
            localStorage.setItem("dataS", JSON.stringify(userList));
        }
      window.location.href = "./index.html";
    }
  } else alert("InvalidEmail");
}
    
  