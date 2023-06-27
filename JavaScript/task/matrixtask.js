let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];


function rotate() {
  let n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = i; i < j - i - 1; j++) {
      tmp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = tmp;
    }
  }
}
function display() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; i < n; j++) {
      document.writeln(matrix[i][j] + `   `);
    }
      document.writeln("<br>");
  }
}

function rotateMatrix90(matrix) {
  let n = matrix.length;
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
    for (let j = n - 1; j >= 0; j--) {
      result[i].push(matrix[j][i]);
    }
  }
  return result;
}


function rotateMatrixsec90(matrix) {
  let n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j <n; j++) {
		let temp = matrix[j][i];
		matrix[j][i] = matrix[i][j];
		matrix[j][i] = temp;
    }
  }
}

function rotate45(matrix) {
	let n = matrix.length;
	let l = 0;
	let r = 0;
	let m = 0;
	let result = [];
	for (let i = 0; i < n; i++)
		result.push([]);
	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			if (i > j) {
				result[l][0] = matrix[i][j];
				l++;
			}
			else if (i == j) {
				result[m][1] = matrix[i][j];
				m++;
			}
			else {
				result[r][2] = matrix[i][j];
				r++;
			}
		}
	}
	return result;
}
console.log(rotate45(matrix));