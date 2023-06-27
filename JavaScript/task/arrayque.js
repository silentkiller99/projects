let arr = ['a', 'b', 'c', 'd', 'f', 'g'];
let i = arr[0].charCodeAt(0);


arr.forEach((e) => {
    let j = e.charCodeAt(0);
    if (i != j)
        console.log(String.fromCharCode(i) + "  not present");
    i++;
}); 


let arr1 = [1, 2, 5, 0, 'false', 'x', 0, 'true', 8];
let n = arr1.length;
i = 0;
arr1.forEach((e) =>{
    if (e === 0) {
        arr1[i] = arr1[i + 1];
        arr1[i + 1] = 0;
    }
    else i++;
});
console.log(arr1);

let result = arr1.filter()
