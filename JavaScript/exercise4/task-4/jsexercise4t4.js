let firstName = [];
let lastName = [];
let cList = [];
let count = -1;
document.getElementById(`deleteButton-x`).checked = false;

let myTDiv = document.getElementById("myTable");

let table = document.createElement('TABLE');
table.border = '2';

function validateInput(event) {
    let fn = document.getElementById("firstName").value;
    let ln = document.getElementById("lastName").value;
    let pos = event.target.id.split("-")[1];
    let btn =event.target.id.split("-")[0];

    if (fn === "" || ln === "") {

    }
    else if (firstName.includes(fn) && lastName.includes(ln)) {

    }
    else {
        if (btn ==="addbtn")
            createElem(fn, ln);
        else
            changeData(fn,ln,pos);
    }      
}


function createElem(fn,ln) {
    
    firstName.push(fn);
    lastName.push(ln);
    count++;
    updateList();  
}



function changeData(fn,ln,pos) {
    firstName[pos] = fn;
    lastName[pos] = ln;
    let fe = document.getElementById(`tdf-${pos}`);
    let le = document.getElementById(`tdl-${pos}`);
    fe.textContent = fn;
    le.textContent = ln;
    changeUBtn(pos);
}


function updateList() {

    let tableBody = document.createElement('TBODY');
    table.append(tableBody);

    let tr = document.createElement('TR');
    tr.setAttribute("id", `tr-${count}`);
    tableBody.append(tr);

    let td = document.createElement('input');
    td.setAttribute("type", "checkbox");
    td.setAttribute("id", `deleteButton-${count}`);
    td.setAttribute("name", `deleteButton`);
    td.setAttribute("value", `deleteButton-${count}`);
    td.setAttribute("onchange", "chkbox(this)");
    td.setAttribute("checked", "true");
    td.checked = false;
    td.width = '75';
    tr.append(td);

    td = document.createElement('TD');
    td.setAttribute("id", `tdf-${count}`);
    td.width = '75';
    td.append(document.createTextNode(firstName[count]));
    tr.append(td);

    td = document.createElement('TD');
    td.setAttribute("id", `tdl-${count}`);
    td.width = '75';
    td.append(document.createTextNode(lastName[count]));
    tr.append(td);

    td = document.createElement('input');
    td.setAttribute("type", "button");
    td.setAttribute("id", `editButton-${count}`);
    td.setAttribute("class", `editButton`);
    td.setAttribute("onclick", "editElem(event)");
    td.setAttribute("value", "Edit");
    td.width = '75';
    tr.append(td);

    td = document.createElement('input');
    td.setAttribute("type", "button");
    td.setAttribute("id", `deleteBtn-${count}`);
    td.setAttribute("class", `deleteButton`);
    td.setAttribute("onclick", "deleteElem(event)");
    td.setAttribute("value", "Delete");
    td.width = '75';
    tr.append(td);

    myTDiv.append(table);
    clearForm();
}



function deleteElem(event) {
    let pos = event.target.id.split("-")[1];
    document.getElementById(`tr-${pos}`).remove();
    firstName.splice(pos, 1);
    lastName.splice(pos,1);
}

function editElem(event) {
    let pos = event.target.id.split("-")[1];
    let fn =document.getElementById("firstName");
    fn.value = firstName[pos];
    let ln = document.getElementById("lastName");
    ln.value = lastName[pos];
    let btn = document.querySelector("#addbtn-x");
    btn.value = 'Update';
    btn.id = `update-${pos}`;
    btn = document.querySelector(`#deleteBtn-${pos}`);
    btn.disabled = true;

}

function changeUBtn(pos) {
    let btn = document.querySelector(`#update-${pos}`);
    btn.value = 'Add';
    btn.id = "addbtn-x";
    btn = document.querySelector(`#deleteBtn-${pos}`);
    btn.disabled = false;
    clearForm();
}

function clearForm() {
    let fn =document.getElementById("firstName");
    fn.value = "";
    let ln = document.getElementById("lastName");
    ln.value = "";
}

function chkbox(this1) {
    let c = +this1.id.split("-")[1];
    if (cList.includes(c)) {
        cList.splice(cList.indexOf(c), 1);
    }
    else
        cList.push(c);
    if (cList.length == firstName.length)
        document.getElementById(`deleteButton-x`).checked = true;
    else
        document.getElementById(`deleteButton-x`).checked = false;

}

function chkboxall() {
    let i = 0;
    firstName.forEach((e) => {
        if (!cList.includes(i)) {
            document.getElementById(`deleteButton-${i}`).checked = true;
            cList.push(i);
        }
        i++;
    });
    console.log(cList);

}

function deleteChecked() {
    cList.forEach((pos) => {
        document.getElementById(`tr-${pos}`).remove();
        firstName.splice(pos, 1);
        lastName.splice(pos, 1);    
    });
    document.getElementById(`deleteButton-x`).checked = false;
}