// let input = prompt("Enter string", "::{{CODE}}--{{SYMBOL}}**{{AMOUNT}}--");
// let firstIndex = input.indexOf("{");
// let lastIndex = input.lastIndexOf("}");
// input = input.substring(firstIndex, lastIndex + 1);
// let result = input.replace(/({+SYMBOL}+.{0,2})/gi, "");
// // let result1 = input.replace(/({+SYMBOL}+[~!@#$%^&*()_+:;"'|,./\-><`0-9a-z]{0,2})/gi,"");
// console.log(result);
// console.log(result1);
// 
// 
// 
// 
// 
// 

let x = prompt("Enter string", "::{{CODE}}--{{SYMBOL}}**{{AMOUNT}}--");
x = x.substring(x.indexOf("{"), x.lastIndexOf("}") + 1);
let result1 = x.replace(/({+SYMBOL}+[~!@#$%^&*()_+:;"'|,./\-><`0-9a-z]{0,2})/gi,"");
console.log(result1);
