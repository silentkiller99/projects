let str = '!@@#$%^&*@#$%asdfgjuyrdvbnrdnm123578#W$E%R^T&*YGFTRD$%abcdefghijklmnopqrstuvwxyz$^&*';
let counter = Array(26).fill(0);
let arr = str.split("");

arr.forEach((c) => {
    let r = c.charCodeAt(0);
    if (r >= 65 && r <= 90)
        counter[r - 65]++;
    else if (r >= 97 && r <= 122)
        counter[r - 97]++;
});
if (counter.includes(0)) {
    console.log("A-Z not present!!!!");
}