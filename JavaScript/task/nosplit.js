let no = 549892;
let nno = '';
let count = 0;
while (no > 0) {
    let r = no % 10;
    nno = (r * (Math.pow(10, count))) + " + " + nno;
    no = Math.floor(no / 10);
    count++;
}
console.log(nno);