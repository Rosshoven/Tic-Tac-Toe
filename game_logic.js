// Creating variables for the game:
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
// Create an array from an array like object
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Variables to set up functionality of game - starting with X player
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
// Be able to keep track of which block was clicked, so it can't be re-selected
let spaces = Array(9).fill(null);


const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))    
    }

function boxClicked(e) {
    const id = e.target.id;
    

//check if spaces array doesn't contain the id, if this index is equal to null, then fill space with current player choice.
    if(!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !== false) {
            // Can't click anymore boxes
            boxes.forEach(box => box.removeEventListener('click', boxClicked));
            playerText.innerText = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            
            return
        }

        // if Ternary statement
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
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

// playerHasWon Function
function playerHasWon() {
    for (const condition of winningCombos) {
        // destructuring winning array
        let [a, b, c] = condition;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) { 
            return [a ,b ,c];
            
        }
    }
    return false
} 


// Restart game when restart button is hit
restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    })

    playerText.innerText = 'Tic-Tac-Toe';

    currentPlayer = X_TEXT;
}




startGame();