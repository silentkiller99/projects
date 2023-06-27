let mList = [];
let count = -1;
let countML = 0;

let rList = [{ firstName: "Palak", lastName: "Lanjewar" }, { firstName: "Shumali", lastName: "Lanjewar" },
{ firstName: "Kriti", lastName: "Bose" }, { firstName: "Tripti", lastName: "Bose" },
{ firstName: "Sharbani", lastName: "Mazumdar" }, { firstName: "Mohammad", lastName: "Asad" },
{ firstName: "Vibhu", lastName: "Raj" }, { firstName: "Aman", lastName: "Gupta" },
{ firstName: "Ravi", lastName: "Gupta" }, { firstName: "Manas", lastName: "Deep" },
{ firstName: "Adarsh", lastName: "Ranjan" }, { firstName: "Aditya", lastName: "Kumar" },
{ firstName: "Sonal", lastName: "Shirvastava" }, { firstName: "Shruti", lastName: "Shrivastava" },
{ firstName: "Tripti", lastName: "Panday" }, { firstName: "Nishu", lastName: "Singh" }];

let myTDiv = document.getElementById("myTable");

let table = document.createElement('TABLE');
table.border = '2';

function validateInput(event) {
    let lt = event.target.id.split("-")[2];
    let pos = event.target.id.split("-")[1];
    let btn =event.target.id.split("-")[0];
    let fn = document.getElementById("firstName").value.trim();
    let ln = document.getElementById("lastName").value.trim();
    const obj = { firstName: fn, lastName: ln };

    if (fn === "" || ln === "") {
        changeUBtn(pos, lt);
        clearForm();
        console.log("Empty!!!!!!");
    }
    else if (compare(obj)) {
        changeUBtn(pos, lt);
        clearForm();
        console.log("dublicate!!!!");
    }
    else {
        if (btn === "addbtn")
            createElem(fn,ln,countML++);
        else
            changeData(fn,ln,pos,lt);
    }      
}

function compare(obj) {
    let result = false;
    mList.forEach((o) => {
        if (result == false)
            result = ((o.firstName === obj.firstName) && (o.lastName === obj.lastName));
        else
            return (result);
//        JSON.stringify(obj) === JSON.stringify(o);
    });
    rList.forEach((o) => {
        if (result == false)
            result = ((o.firstName === obj.firstName) && (o.lastName === obj.lastName));
        else
            return (result);
//        JSON.stringify(obj) === JSON.stringify(o);
    });
    return (result);
}


function createElem(fn,ln,pos) {
    const obj = { firstName: fn, lastName: ln };
    mList.push(obj);

    updateList(fn,ln,"mList",pos);
}


function changeData(fn, ln, pos,lt) {
    if (lt === "mList") {
        mList[pos].firstName = fn;
        mList[pos].lastName = ln;
    }
    else {
        rList[pos].firstName = fn;
        rList[pos].lastName = ln;
    }
    let fe = document.getElementById(`tdf-${pos}-${lt}`);
    let le = document.getElementById(`tdl-${pos}-${lt}`);
    fe.textContent = fn;
    le.textContent = ln;
    changeUBtn(pos,lt);
}

function updateList(fn, ln, t, pos) {
    count++;
    let tableBody = document.createElement('TBODY');
    table.append(tableBody);

    let tr = document.createElement('TR');
    tr.setAttribute("id", `tr-${pos}-${t}`);
    tableBody.append(tr);

    let td = document.createElement('TD');
    td.setAttribute("id", `tdf-${pos}-${t}`);
    td.width = '75';
    td.append(document.createTextNode(fn));
    tr.append(td);

    td = document.createElement('TD');
    td.setAttribute("id", `tdl-${pos}-${t}`);
    td.width = '75';
    td.append(document.createTextNode(ln));
    tr.append(td);

    td = document.createElement('input');
    td.setAttribute("type", "button");
    td.setAttribute("id", `editButton-${pos}-${t}`);
    td.setAttribute("class", `editButton`);
    td.setAttribute("onclick", "editElem(event)");
    td.setAttribute("value", "Edit");
    td.width = '75';
    tr.append(td);

    td = document.createElement('input');
    td.setAttribute("type", "button");
    td.setAttribute("id", `deleteButton-${pos}-${t}`);
    td.setAttribute("class", `deleteButton`);
    td.setAttribute("onclick", "deleteElem(event)");
    td.setAttribute("value", "Delete");
    td.width = '75';
    tr.append(td);

    myTDiv.append(table);
    clearForm();
}


function deleteElem(event) {
    let lt = event.target.id.split("-")[2];
    let pos = event.target.id.split("-")[1];
    document.getElementById(`tr-${pos}-${lt}`).remove();

    if (lt =="mList")
        mList.splice(pos, 1);
}

function editElem(event) {
    let pos = event.target.id.split("-")[1];
    let lt = event.target.id.split("-")[2];
    let fn =document.getElementById("firstName");
    let ln = document.getElementById("lastName");
    let btn = document.querySelector("#addbtn-x-x");
    btn.value = 'Update';

    if (lt == "mList") {
        fn.value = mList[pos].firstName;
        ln.value = mList[pos].lastName;
    }
    else {
        fn.value = rList[pos].firstName;
        ln.value = rList[pos].lastName;
    }
    btn.id = `update-${pos}-${lt}`;
}

function changeUBtn(pos,lt) {
    let btn = document.querySelector(`#update-${pos}-${lt}`);
    btn.value = 'Add';
    btn.id = "addbtn-x-x";
    clearForm();
}

function clearForm() {
    let fn =document.getElementById("firstName");
    fn.value = "";
    let ln = document.getElementById("lastName");
    ln.value = "";
}

function renderList() {
    let pos = -1;
    rList.forEach(element => {
        pos++;
        if (document.contains(document.getElementById(`tr-${pos}-rList`)))
            console.log("already exsists!!!!!");
      
        else
            updateList(element.firstName,element.lastName,"rList",pos);
    });
}
