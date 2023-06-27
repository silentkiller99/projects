let mydata = JSON.parse(sessionStorage.getItem("loginS"));
let courses = JSON.parse(localStorage.getItem("courses"))

mydata.courses.forEach(e => {
    let c = courses[+e];
    updateCL(c.link, c.title);
});

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
  a.setAttribute("onclick", "view(event)");
  a.append(document.createTextNode("View"));
  d2.appendChild(a);

//   a = document.createElement("A");
//   a.setAttribute("href", "#");
//   a.setAttribute("class", "btn btn-primary");
//   a.setAttribute("id", `${title}-${count}-assign`);
//   a.setAttribute("onclick", "assignCourse(event)");
//   a.appendChild(document.createTextNode("Assign-Course"));
//   d2.appendChild(a);

//   a = document.createElement("A");
//   a.setAttribute("href", "#");
//   a.setAttribute("class", "btn btn-primary");
//   a.setAttribute("id", `${title}-${count}-del`);
//   a.setAttribute("onclick", "deleteCourse(event)");
//   a.appendChild(document.createTextNode("Delete-Course"));
//   d2.appendChild(a);
}
