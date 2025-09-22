let board;
let currentPlayer;
let gameOver;
let winner;
let scoreX = 0;
let scoreO = 0;

function initializeGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  winner = null;
  renderBoard();
  updateStatus();
}

function renderBoard() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < board.length; i++) {
    cells[i].innerText = board[i];
  }
}

function updateStatus() {
  const statusElement = document.getElementById("status");
  if (gameOver) {
    if (winner) {
      statusElement.innerText = `Player ${winner} Wins!`;
    } else {
      statusElement.innerText = "It's a Draw!";
    }
  } else {
    statusElement.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      gameOver = true;
      updateScore(winner);
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true; // Draw
  }
}

function cellClicked(index) {
  if (!board[index] && !gameOver) {
    board[index] = currentPlayer;
    checkWinner();
    renderBoard();
    updateStatus();
    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus();
    }
  }
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    document.getElementById("scoreX").innerText = scoreX;
  } else if (winner === "O") {
    scoreO++;
    document.getElementById("scoreO").innerText = scoreO;
  }
}

// Initialize the game when the page loads
window.onload = initializeGame;
