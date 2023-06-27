let winningConditions = [
  ["00", "01", "02"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"],
  ["02", "11", "20"],
];
let currentGame = [[], [], []];
let currentPlayer = "X";
let cells = document.querySelectorAll(".cell");
let countInputs = 0;

cells.forEach((cell) => {
  cell.addEventListener("click", onClick);
});

function onClick(event) {
  let cell = event.target;
  cell.textContent = currentPlayer;
  countInputs++;
  setTimeout(function () {
    updateGame(event);
    changePlayer();
    cell.removeEventListener("click", onClick);
  }, 100);
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateGame(event) {
  let row_position = +event.target.id.split("-")[2];
  let coloum_position = +event.target.id.split("-")[3];
  currentGame[row_position][coloum_position] = `${currentPlayer}-${row_position}-${coloum_position}`;
  checkWinDraw();
}

function checkWinDraw() {
  winningConditions.forEach((array_of_winning_possibilities) => {
    let winCount = 0;
    array_of_winning_possibilities.forEach((index_of_matrix) => {
      let row_position = +index_of_matrix.split("")[0];
      let coloum_position = +index_of_matrix.split("")[1];
      if (currentGame[row_position][coloum_position] === `${currentPlayer}-${row_position}-${coloum_position}`)
        winCount++;
    });
    if (winCount == 3) {
      alert(`Player ${currentPlayer} Won`);
      resetGame();
    }
  });
  if (countInputs == 9) {
    alert("Its a tie!!!!");
    resetGame();
  }
}

function resetGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", onClick);
    cell.textContent = "";
  });
  currentGame = [[], [], []];
  currentPlayer = "X";
  countInputs = 0;
}