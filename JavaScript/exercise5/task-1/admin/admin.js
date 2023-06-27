let table = document.getElementById("mytable");
let tableBody = document.createElement("TBODY");

let userListS = JSON.parse(localStorage.getItem("dataS"));
let pos = -1;
let count = -1;
if (localStorage.getItem("courses") == null)
  localStorage.setItem("courses", "[]");

let courses = JSON.parse(localStorage.getItem("courses"));
courses.forEach((c) => {
    count++;
    updateCL(c.link, c.title);
});

function validatecourse(obj) {
    courses = JSON.parse(localStorage.getItem("courses"));
    let result = false;
    courses.forEach((c) => {
        if (result == false)
          result = c.title === obj.title && c.link === obj.link;
        else return result;
    });
    return result;
}

function updateList() {
    let userListS = JSON.parse(localStorage.getItem("dataS"));
  userListS.forEach((e) => {
    pos++;
    let tr = document.createElement("TR");
    tr.setAttribute("id", `tr-${pos}`);
    tableBody.append(tr);

    let th = document.createElement("TH");
    th.setAttribute("scope", "row");
    th.append(document.createTextNode(`${pos}`));
    tr.append(th);

    let td = document.createElement("TD");
    td.setAttribute("id", `tdf-${pos}`);
    td.append(document.createTextNode(e.name));
    tr.append(td);

    td = document.createElement("TD");
    td.setAttribute("id", `tdl-${pos}`);
    td.append(document.createTextNode(e.email_Id));
    tr.append(td);
      
    td = document.createElement("TD");
    td.setAttribute("id", `tdl-${pos}`);
    td.append(document.createTextNode(e.courses));
    tr.append(td);

    // td = document.createElement("TD");
    // let a = document.createElement("A");
    // a.setAttribute("id", `deleteButton-${pos}`);
    // a.setAttribute("class", `btn btn-primary`);
    // a.setAttribute("onclick", "deleteElem(event)");
    // a.append(document.createTextNode("Delete"));
    // td.append(a);
    // tr.append(td);
  });

  table.append(tableBody);
}

function addCourse() {
    count++;
    courses = JSON.parse(localStorage.getItem("courses"));
    let title = prompt("Course-name", "HTML5");
    let link = prompt("Enter link of img : ", "../images/html5.png");
    let obj = { title: title, link: link};
    if (validatecourse(obj)) {
        alert("course already exists");
    }
    else {
        courses.push(obj);
        localStorage.setItem("courses", JSON.stringify(courses));
        updateCL(link, title);
    }
}

function updateCL(link, title) {
    // let e3,d;
    // if (((count+1) % 3) == 0 && count>0) {
    //     e3 = document.getElementById("e3");
    //     d = document.createElement("DIV");
    //     d.setAttribute("id", `card-${count}`);
    //     d.setAttribute("class","carousel-item");
    //     e3.append(d);

    //     d = document.createElement("DIV");
    //     d.setAttribute("id", `course-list`);
    //     d.setAttribute("class", "row");
    //     e3.append(d);

    // }
    let cl = document.getElementById("course-list");
    

    d = document.createElement("DIV");
    d.setAttribute("id",`card-${count}`)
  d.setAttribute("class", "col-md-4 mb-3");
  cl.append(d);

  let d1 = document.createElement("DIV");
  d1.setAttribute("class", "card");
  d.append(d1);

  let img = document.createElement("IMG");
    img.setAttribute("class", "img-fluid");
  img.setAttribute("alt", "100%x280");
  img.setAttribute("src", `${link}`);
  d1.append(img);

  let d2 = document.createElement("DIV");
  d2.setAttribute("class", "card-body");
  d1.append(d2);

    let h = document.createElement("H4");
  h.setAttribute("class", "card-title");
  let t = document.createTextNode(`${title}`);
  h.append(t);
  d2.appendChild(h);

  let a = document.createElement("A");
  a.setAttribute("href", "#");
  a.setAttribute("class", "btn btn-primary");
    a.setAttribute("onclick", "assignToAll(event)");
    a.setAttribute("id", `${title}-${count}-assignAll`);
  a.append(document.createTextNode("Assign-to-All"));
  d2.appendChild(a);

  a = document.createElement("A");
  a.setAttribute("href", "#");
    a.setAttribute("class", "btn btn-primary");
    a.setAttribute("id", `${title}-${count}-assign`);
  a.setAttribute("onclick", "assignCourse(event)");
  a.appendChild(document.createTextNode("Assign-Course"));
  d2.appendChild(a);

  a = document.createElement("A");
  a.setAttribute("href", "#");
    a.setAttribute("class", "btn btn-primary");
    a.setAttribute("id", `${title}-${count}-del`);
  a.setAttribute("onclick", "deleteCourse(event)");
  a.appendChild(document.createTextNode("Delete-Course"));
  d2.appendChild(a);
}

function deleteCourse(event) {
    let tid = +event.target.id.split("-")[1];
    let course = event.target.id.split("-")[0];
    let d = document.getElementById(`card-${tid}`);
    d.remove();
    courses.splice(tid, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    unassignDC(tid);
}

function assignToAll(event) {
    let tid = event.target.id.split("-")[1];
    let userListS = JSON.parse(localStorage.getItem("dataS"));

    userListS.forEach((s) => {
        if(!validateAssignAll(tid,s))
            s.courses.push(`${tid}`);
    });
    localStorage.setItem("dataS",JSON.stringify(userListS));
}

function assignCourse(event) {
    let tid = +event.target.id.split("-")[1];
    sessionStorage.setItem("curcourse", JSON.stringify(`${tid}`));
    window.location.href = "assignCourse/assignCourse.html";

}

function unassignDC(tid) {
    
    let userListS = JSON.parse(localStorage.getItem("dataS"));
    userListS.forEach((s) => {
        let pos = +s.courses.indexOf(`${tid}`);
      s.courses.splice(pos,1);
    });
    localStorage.setItem("dataS", JSON.stringify(userListS));
}

function validateAssignAll(tid, student) {
    let result = false;
    student.courses.forEach((c) => {
        if (result == false)
            result = (+c == +tid);
        else return result;
    });
    return result;
}
