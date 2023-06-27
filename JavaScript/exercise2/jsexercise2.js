//Question-1
document.writeln("<br> Question-1 <br>");



let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let n = prompt('Enter value of n : ', '3');

document.writeln(arr.slice(0, n) + "<br>");
document.writeln(arr.slice(-n) +"<br>");



//Question-2

document.writeln("<br> Question-2 <br>");


let no = prompt('Enter the no.', '02455136632588');

let newno = no.charAt(0);

for (i = 1; i < no.length; i++){
    if ((no.charAt(i - 1) % 2 == 0) && no.charAt(i) % 2 == 0)
        newno = newno + '-' + no.charAt(i);
    else
        newno = newno + no.charAt(i);
}
document.writeln(newno +"<br>");


//Question-3

//using majority algo
document.writeln("<br> Question-3 <br>");


function findMajority(nums) {
    let count = 0, cd = -1;

    for (let i = 0; i < nums.length; i++) {
        if (count == 0) {
            cd = nums[i];
            count = 1;
        }
        else {
            if (nums[i] == cd)
                count++;
            else
                count--;
        }
    }
    return cd;
}

let arr2 = [ 1, 1, 1, 1, 2, 3, 4 ];
let majority = findMajority(arr2);
document.writeln(" The majority element is : " + majority + "<br>");


//Question-4
document.writeln("<br> Question-4 <br>");


let v;
for (let i = arr.length - 1; i >= 0; i--){
    let j = Math.floor(Math.random() * i + 1);
    v = arr[j];
    arr[j] = arr[i];
    arr[i] = v;
}
document.writeln(arr + "<br>");



//Question-5


document.writeln("<br> Question-5 <br>");


let arr3 = [1, 2, 3, 4, 5];
let arr4 = [4, 5, 6, 7];

let union = [...new Set([...arr3, ...arr4])];

let intersection=arr3.filter(function(data){
return arr4.includes(data)
})
let diffrenceab =arr3.filter(function(data){
if(arr4.includes(data)==false){
return data
}
})
let diffrenceba = arr4.filter(function (data) {
    if (arr3.includes(data) == false)
        return data
})
document.writeln(union);
document.writeln(diff);
document.writeln(intersection);




//Question-6


document.writeln("<br> Question-6 <br>");


let arr5 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let jump = +(prompt('Enter jump : ', '2'));

let a6 = [];

for (let i = 0; i < arr5.length; i = i + jump){
    a6.push(arr5[i])
}
document.writeln(a6 +"<br>");


//Question-7



document.writeln("<br> Question-7 <br>");


let date = prompt('Enter Date : dd-mm-yyyyyyyy OR dd/mm/yyyy OR dd mm yyyy', '03-04-2000');

let a = [];
if (date.includes("-"))
    a = (date.split('-'));
else if (date.includes("/"))
    a = (date.split('/'));
else
    a = (date.split(' '));

let monthL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let monthS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

document.writeln(monthL[(+a[1])-1]+ "<br>");
document.writeln(monthS[(+a[1])-1] +"<br>");


//Question-8


document.writeln("<br> Question-8 <br>");


let fdate = prompt('Enter StartDate : mm-dd-yyyy OR mm/dd/yyyy', '03-03-2020');

let todate = prompt('Enter toDate : mm-dd-yyyy OR mm/dd/yyyy', '03-03-2022');

let datef = new Date(fdate);
let datet = new Date(todate);

let diff_in_Time = datet.getTime() - datef.getTime();


let diff_in_Year = Math.floor(diff_in_Time / (1000 * 3600 * 24 *365));

let diff_in_month = Math.floor((diff_in_Time / (1000 * 3600 * 24 * 365)) - Math.floor(diff_in_Time / (1000 * 3600 * 24 * 365)));

let diff_in_Days = Math.floor((diff_in_Time / (1000 * 3600 * 24 * 365) )- Math.floor(365 * diff_in_month));

document.writeln(diff_in_Year + "Year" + diff_in_month + "Month" + diff_in_Days + "Days<br>");



//Question-9



document.writeln("<br> Question-9 <br>");


let unixTimeStamp = prompt('Enter time Stamp', '1651822834');

let date1 = new Date(unixTimeStamp * 1000);
document.writeln(date1.toLocaleString("en-US") +"  GMT +05:30<br>");


// //Question-10



document.writeln("<br> Question-10 <br>");


let fdate1 = prompt('Enter StartDate : mm-dd-yyyy OR mm/dd/yyyy', '03-03-2020');

let todate1 = prompt('Enter toDate : mm-dd-yyyy OR mm/dd/yyyy', '03-03-2022');

let datef1 = new Date(fdate1);
let datet1 = new Date(todate1);

let diff_in_Time1 = datet1.getTime() - datef1.getTime();


let diff_in_Year1 = Math.floor(diff_in_Time1 / (1000 * 3600 * 24 * 365.5));

let diff_in_month1 = Math.floor((diff_in_Time1 / (1000 * 3600 * 24 * 365.5)) - Math.floor(diff_in_Time1 / (1000 * 3600 * 24 * 365.5)));

let diff_in_Days1 = Math.floor((diff_in_Time1 / (1000 * 3600 * 24 * 365.5)) - (365.5 * diff_in_month1));

document.writeln(diff_in_Year1 + "Year" + diff_in_month1 + "Month" + diff_in_Days1 + "Days<br>");

let diff_in_min = Math.floor(diff_in_Time1 / (1000 * 60));

let diff_in_hour = Math.floor(diff_in_Time1 / (1000 * 3600));

let diff_in_Daysd = Math.floor(diff_in_Time1 / (1000 * 3600 * 24));

let diff_in_week = Math.floor(diff_in_Time1 / (1000 * 3600 * 24 * 7));

let diff_in_monthm = Math.floor(diff_in_Time1 / (1000 * 3600 * 24 * 7 * 4));

let diff_in_Daysw = Math.floor((diff_in_Time1 / (1000 * 3600 * 24 * 7))-Math.floor(diff_in_Time1 / (1000 * 3600 * 24 * 7)));

let diff_in_Daysm = Math.floor((diff_in_Time1 / (1000 * 3600 * 24 * 7 * 4)) - Math.floor(diff_in_Time1 / (1000 * 3600 * 24 * 7 * 4)));

document.writeln(diff_in_monthm + "Month" + diff_in_Daysm + "Days<br>");

document.writeln(diff_in_week + "weeks" + diff_in_Daysw + "Days<br>");

document.writeln(diff_in_Daysd + "Days<br>");

document.writeln(diff_in_hour + "Hours<br>");

document.writeln(diff_in_min + " min <br>" );


//Question-11



document.writeln("<br> Question-11 <br>");


let st_str = "This is a Sample String";
let in_str = " insert me ";

let pos = prompt('Enter position : ','1')

document.writeln(st_str.slice(0,pos) + in_str + st_str.slice(pos) + "<br>");


//Question-12



document.writeln("<br> Question-12 <br>");


let input_str = "RapidOpsSolution";
jump = +(prompt('Enter Length : ', '2'));

let a12 = [];

for (let i = 0; i < input_str.length; i =  i + jump){
    a12.push(input_str.slice(i,i+jump))
}

document.writeln(a12 + "<br>");


//Question-13



document.writeln("<br> Question-13 <br>");


let ipt_no = prompt('Enter the no.', '3546857484218486');

let c = +(+ipt_no.length % 3);

let opt_no = ipt_no.slice(0, c) ;

for (let i = c; i < ipt_no.length; i = i + 3){
    opt_no = opt_no + "," + ipt_no.slice(i, i + 3);
}

document.writeln(opt_no + "<br>");


//Question-14
document.writeln("<br> Question-14 <br>");
let details = [{ id: 1, name: "aman", age: 24 }, { id: 2, name: "adarsh", age: 22 },
    { id: 3, name: "aditya", age: 30 }, { id: 4, name: "ravi", age: 25 }, { id: 5, name: "manas", age: 21 },
    { id: 6, name: "palak", age: 18 }, { id: 7, name: "sonal", age: 21 }, { id: 8, name: "bijendra", age: 20 },
    { id: 9, name: "shumali", age: 18 }, { id: 10, name: "ayush", age: 20 }, { id: 11, name: "nishu", age: 19 }];
    
function compareee(a, b) {
    if (a.age != b.age)
        return a.age - b.age;
    else {
        let c = a.name.charAt(0);
        let d = b.name.charAt(0);
        if (c > d)
            return -1;
        else if (d < c)
            return 1;
        else
            return 0;
    }
}
//b.name - a.name
//b.localeCompare(a ,'es',{sensitvity: 'base'});

details.sort(compareee);

details.forEach((d) => {
    document.writeln(`${d.id}   ${d.age}    ${d.name}    <br>`);
});



//Question-15



document.writeln("<br> Question-15 <br>");


let details2 = [{ name: "aman", age: 24 }, { name: "adarsh", age: 28 },
    { name: "aditya", age: 30 }, { name: "ravi", age: 20 }, { name: "manas", age: 23 },
    { name: "palak", age: 18 }, { name: "sonal", age: 20 }, { name: "bijendra", age: 21 },
    { name: "shumali", age: 18 }, { name: "ayush", age: 22 }, { name: "nishu", age: 19 }];

let option = +prompt('Enter  1 to Delete OR  2 to Insert', '1/2');

let pos1 = (+prompt('Enter Position : ', '5') -1);

if (option == 1) {
    details2.splice(pos1, pos1);
    details2.forEach((d) => {
    document.writeln(`${d.name}   ${d.age} <br>`);
});
}

else if (option == 2) {
    let iname = prompt('Enter the name', 'vibhu');
    let iage = +prompt('Enter age', '26');
 //   let inpobj = new Object();
    details2.splice(pos1, 0, {name: iname, age: iage});
    details2.forEach((d) => {
    document.writeln(`${d.name}   ${d.age} <br>`);
});
}
