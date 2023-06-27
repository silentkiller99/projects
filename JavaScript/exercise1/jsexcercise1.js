//task-1

function task1(){
    let n = prompt('no of rows :', '');
let string = "";
let k = n - 1;
for (let i = 0; i <n; i++){
    for (let j = 0; j < n; j++){
        if (i == j || j == k)
            string += "* ";
        else
            string += "  ";
    }
    string += "\n";
    k--;
}
console.log(string);
}

//task-2

function task2(){
    n = prompt('no of rows :', '');
string = "";
k = n - 1;
for (let i = 0; i <n; i++){
    for (let j = 0; j < n; j++){
        if (i == 0 || j == 0 || i == k || j == k)
            string += "* ";
        else
            string += "  ";
    }
    string += "\n";
    
}
console.log(string);
}


//task-3

function task3(){
    n = prompt('no of rows :', '');
string = "";
k = Math.floor(n/2);
let l = 1;
for (let i = 0; i < n; i++){
    
    for (let j = 0; j < k; j++){
        string += "  ";
        
    }
    for (let j = 1; j <= l; j++){
        if (j == 1 || j == l)
            string += "* ";
        else
            string += "  ";
    }
    string += "\n";
    if (i < Math.floor(n/2)) {
        k--;
        l += 2;
     }
           
    else {
        k++;
        l -= 2;
        }
          
}
console.log(string);
}

//task-4

function task4(){

n = prompt('no of rows : ', '');
if (n % 2 != 0) {
    string = "";
    k = 0;
    for (let i = 0; i < n; i++) {
        if (i < n - 2)
            k++;
        else
            k--;
    
        for (let j = 0; j < k; j++) {
            string += "* ";
        }
        string += "\n";
    }
    console.log(string);

}
else
    alert('wrong input');

}

//task-5

function task5(){
    n = prompt('no of rows : ', '');
    string = "";
    for (let i = 0; i < n*2 -1; i++) {
        if (i < n) {
            for (let s = 0; s < i; s++)
            string += " ";
        k = i+1;
        for (let j = i; j < n; j++)
            string += k++ + " ";
        string += "\n";
        }
        else {
            k = 1;
            for (let s = i; s < n*2-2; s++) {
                string += " ";
                k++;
            }
            for (let j = k; j <= n; j++)
                string += j + " ";
            string += "\n";
        }
        
        
    }
    console.log(string);
}