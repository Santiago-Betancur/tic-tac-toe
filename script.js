// Initialize game variables
let numPlays = 0;
let gameFinished = false;
let currentPlayer = "X";
let currentPlays = {
  X: [],
  O: [],
};

// Define winning positions for the game
const winningPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Set up the game when the document is ready
$(document).ready(function () {
  $(".cell").on("click", function () {
    if (!gameFinished) {
      numPlays++; // Increment play count
      $(this).text(currentPlayer); // Display current player's mark
      currentPlays[currentPlayer].push(parseInt($(this).attr("data-index"))); // Store player's move

      if (isWinner()) { // Check for a win
        showGameResult('win');
      }

      if (!gameFinished && isDraw()) { // Check for a draw
        showGameResult("draw");
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
    }
  });
});

// Reset the game to play again
function playAgain() {
  numPlays = 0;
  gameFinished = false;
  currentPlayer = "X";
  currentPlays = {
    X: [],
    O: [],
  };
  $('.cell, #gameResult').text(''); // Clear the board and result text
}

// Show game result and offer to play again
function showGameResult(type) {
  gameFinished = true;
  if (type === "win") {
    $('#gameResult').text('Winner is ' + currentPlayer);
  } else {
    $('#gameResult').text('Draw!');
  }
  $("#gameResult").append(`<p id="playAgain" onclick="playAgain()">Play Again?</p>`)
}

// Check if all plays are made without a winner
function isDraw() {
  return numPlays === 9;
}

// Check for a winning combination
function isWinner() {
  for (let i = 0; i < winningPositions.length; i++) {
    let isWinner = true;
    for (let j = 0; j < winningPositions[i].length; j++) {
      if (currentPlays[currentPlayer].indexOf(winningPositions[i][j]) === -1) {
        isWinner = false;
        break;
      }
    }
    if (isWinner) {
      return true;
    }
  }
  return false;
}
