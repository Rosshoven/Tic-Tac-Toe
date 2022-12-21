// Creating variables for the game:
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');

// Create an array of the boxes called boxes, from the array like container
let boxes = Array.from(document.getElementsByClassName('box'));

// Variables for color
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks');
let restartIndicator = getComputedStyle(document.body).getPropertyValue('--orange');

// Variables to set up functionality of game - starting with X player
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
// Be able to keep track of which block was clicked, so it can't be re-selected
let spaces = Array(9).fill(null);
let count_plays = 0;


// Function to start game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))    
    }

// Need function called to have game start
    startGame()


// Function to click boxes and respond if/when winner
function boxClicked(e) {
    const id = e.target.id;
    
    //check if spaces array doesn't contain the id, if this index is equal to null, then fill space with current player choice.
    if(!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon()) {
            // Can't click anymore boxes
            boxes.forEach(box => box.removeEventListener('click', boxClicked));
            playerText.innerText = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return
        }
        // increment number of plays made.
          count_plays++;
        // if Ternary operator statement
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
    if(count_plays === 9) {
        playerText.innerText = `Tie Game!`;
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}

// Array containing winning combinations
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Player has won Function
function playerHasWon() {
    // for of loop to iterate through winningCombos Array 
    for (const condition of winningCombos) {
        // destructuring winningCombos array
        let [a, b, c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) { 
            return [a, b, c];
        }
    }
    return false
} 


// Restart game with restart function when restart button is hit
restartBtn.addEventListener('click', restart);

// Restart function to reset the whole board and page
function restart() {
    spaces.fill(null);
    count_plays = 0;
    // reset the boxes
    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.style.color = restartIndicator;
    })
    playerText.innerText = 'Tic-Tac-Toe';
    currentPlayer = X_TEXT;
    startGame();
}

