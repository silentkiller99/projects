function doForms() {
    let data = new FormData();
    let all = document.querySelectorAll("#user_form input,#user_form testarea,#user_form select");
    let infomation = [];
    let obj = {};
    for (let field of all) {
        if (field.type != "submit" && field.type != "button") {
            if (field.type == "radio" || field.type == "checkbox") {
                if (field.checked) {
                    fn = field.name; ln = field.value;
                    obj = { key:fn, value: ln };
                    infomation.push(obj);
                    // data.append(field.name, field.value);
                }
            }
            if (field.type == "date" || field.type == "number" || field.type == "email" || field.type == "text") {
                data.append(field.name, field.value);
                fn = field.name;
                ln = field.value;
                    obj = {  key:fn, value : ln };
                    infomation.push(obj);
            }
            if (field.id == "vehical" || field.id =="Places") {
                data.append(field.name, field.value);
                    fn = field.name; ln = field.value;
                obj = { key: fn, value: ln };
                    infomation.push(obj);
            }
        }
    }

    infomation.forEach((e) => {
        // console.log(e);
        updateList(e.key, e.value);
    });
    clearForm();
}
function validateInput(action) {
    let forms = document.getElementById("user_form");
    forms.action = action ;
    if (forms.checkValidity()) {
//        forms.submit();
        doForms();
    }
    else
        alert("empty");
}

function updateList(fn,fv) {

    let myTDiv = document.getElementById("myTable");

    let table = document.createElement('TABLE');
    table.border = '2';
    let tableBody = document.createElement('TBODY');
    table.append(tableBody);

    let tr = document.createElement('TR');
    tr.setAttribute("id", `tr`);
    tableBody.append(tr);

    let td = document.createElement('TD');
    td.setAttribute("id", `tdf`);
    td.width = '75';
    td.append(document.createTextNode(fn));
    tr.append(td);

    td = document.createElement('TD');
    td.setAttribute("id", `tdl`);
    td.width = '75';
    td.append(document.createTextNode(fv));
    tr.append(td);

    myTDiv.append(table);
}
function clearForm() {
    let id = document.getElementById("user_form");
    id.reset();
}

