//Task-1

//Question-1
function question1() {
  document.writeln("<br> Question-1 <br>");

  let regex = /(?:^[a-zA-Z0-9_\.\-]+[@][a-z]+\.[a-z]{2,3}$)/i;

  let email = prompt("Enter Email Address :", "naman.gujjar@gmail.com");
  console.log(regex.test(email));
  if (regex.test(email)) document.writeln("valid email <br>");
  else document.writeln("invalid email <br>");
}

//Question-2

function question2() {
  document.writeln("<br> Question-2 <br>");

  let email = prompt("Enter Email Address :", "naman.gujjar@gmail.com");
  let index = email.indexOf("@");
  let em = email.slice(2, index - 1);
  em = em.replace(/([a-z0-9\.\-_])/gi, "*");

  let encyptmail = email.slice(0, 2) + em + email.slice(index - 1);

  document.writeln(encyptmail + "<br>");
}

//Question-3

function question3() {
  let str = prompt(
    "Enter string : ",
    "<p><strong><em>javascript exercise</em></strong></p>"
  );

  str.replace(/(<([^>]+)>)/gi, "");

  document.writeln(str);
}

//Question-4


function addTable() {
    let r = prompt('Enter row : ', '4');
    let c = prompt('Enter coloum : ', '');

    let myTDiv = document.getElementById("MyTable");

    let table = document.createElement('TABLE');
    table.border = '2';

    let tableBody = document.createElement('TBODY');
    table.append(tableBody);

    for (let i = 0; i < r; i++) {
    let tr = document.createElement('TR');
    tableBody.append(tr);

    for (let j = 0; j < c; j++) {
      let td = document.createElement('TD');
      td.width = '75';
      td.append(document.createTextNode("Cell " + i + "," + j));
      tr.append(td);
    }
  }
  myTDiv.append(table);

}
