const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],           // Diagonals
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return boardState.includes(null) ? null : "Draw";
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  const winner = checkWinner();

  if (winner) {
    message.textContent = winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  currentPlayer = "X";
  boardState.fill(null);
  gameActive = true;
  message.textContent = "Player X's Turn";
  createBoard();
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

createBoard();
