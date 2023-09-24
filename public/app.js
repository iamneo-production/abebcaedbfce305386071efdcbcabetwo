// Initial game state
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let result = document.querySelector('#result');
let winner = document.querySelector('#winner'); // Select the winner element
let btns = document.querySelectorAll('.btn');

// Function to handle player moves
const ticTacToe = (element, index) => {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        element.value = currentPlayer;
        element.disabled = true;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        result.textContent = `Player ${currentPlayer}'s Turn`;
    }
};

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/// Function to check the game result
function checkResult() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            result.textContent = ""; // Clear the result message
            winner.innerHTML = `<strong>Player ${gameState[a]} Won 🎉</strong>`; // Display the winner with emoji and bold text
            winner.style.display = 'block'; // Display the winner element
            gameActive = false;
            return;
        }
    }
    
    if (!gameState.includes('')) {
        result.textContent = "It's a Draw!";
        gameActive = false;
    } else if (gameActive) {
        result.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < btns.length; i++) {
        btns[i].value = '';
        btns[i].disabled = false;
    }
    result.textContent = `Player ${currentPlayer}'s Turn`;
    winner.style.display = 'none'; // Hide the winner element when resetting
}
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

document.querySelector('#reset-btn').addEventListener('click', resetGame);
