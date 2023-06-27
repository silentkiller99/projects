let pos = -1;
let table = document.getElementById("mytable");
let tableBody = document.createElement("TBODY");
updateList();

let ids = +JSON.parse(sessionStorage.getItem("curcourse"));
let userListS = JSON.parse(localStorage.getItem("dataS"));

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

    td = document.createElement("TD");
    let a = document.createElement("A");
    a.setAttribute("id", `assign-${pos}`);
    a.setAttribute("class", `btn btn-primary`);
    a.setAttribute("onclick", "assignC(event)");
    a.append(document.createTextNode("Assign"));
    td.append(a);
    tr.append(td);
      
    td = document.createElement("TD");
    a = document.createElement("A");
    a.setAttribute("id", `revoke-${pos}`);
    a.setAttribute("class", `btn btn-primary`);
    a.setAttribute("onclick", "revokeC(event)");
    a.append(document.createTextNode("Revoke"));
    td.append(a);
    tr.append(td);
  });

  table.append(tableBody);
}

function assignC(event) {
    let idS = +event.target.id.split("-")[1];
    if (validateAssign(ids)) { }
    else{
        userListS[idS].courses.push(ids);
        localStorage.setItem("dataS", JSON.stringify(userListS));
    }
}

function revokeC(event) {
    let ids = +event.target.id.split("-")[1];
  if (validateAssign(ids)) {
      let pos = +userListS[ids].courses.indexOf(ids);
        userListS[ids].courses.splice(pos, 1);
        localStorage.setItem("dataS", JSON.stringify(userListS));
    }
}

function validateAssign(ids) {
  let result = false;
  userListS[ids].courses.forEach((c) => {
    if (result == false) result = +c == +ids;
    else return result;
  });
  return result;
}