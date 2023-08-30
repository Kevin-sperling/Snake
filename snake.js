//game constants
const gameBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls");
const endgame = document.querySelector(".endgame")
const restart = document.querySelector(".restart")

//game variables
let gameOver = false;
let foodX = 0;
let foodY = 0;
let snakeX = 10;
let snakeY = 10;
let velocityX = 0; 
let velocityY = 0;
let snakeBody = [];
let score = 0;

//score tracking
let highScore = localStorage.getItem("high-score");
highScoreElement.innerText = `High Score: ${highScore}`;

//randomize food position
function updateFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//show game over screen 
function handleGameOver() {
    endgame.style.display = "flex";
    clearInterval();
}

restart.addEventListener('click', restartGame)

function restartGame(){
    location.reload();
}


//change snake direction
function changeDirection (e) {
    if (e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else 
        if (e.key === "ArrowDown" && velocityY != -1){
            velocityX = 0;
            velocityY = 1;
    } else 
        if (e.key === "ArrowRight" && velocityX != -1){
            velocityX = 1;
            velocityY = 0;
    } else 
        if (e.key === "ArrowLeft" && velocityX != 1){
            velocityX = -1;
            velocityY = 0;
    }  
}
document.addEventListener("keydown", changeDirection);

//main game function
function Game() {
    if (gameOver) return handleGameOver();

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //checking for snake hitting food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();

        //increase snake length when scoring
        snakeBody.push([foodY, foodX]);

        //score tracking
        score++;
        highScore = score >= highScore ? score : highScore;
    }

    //score tracking
    localStorage.setItem('highScore', highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;

    //snake movement
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1 ; i > 0 ; i--) {
        snakeBody[i] = snakeBody[i - 1];

    }

    snakeBody[0] = [snakeX, snakeY];

    //check for snake hitting wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameOver = true;
    }

    for (let i = 0 ; i < snakeBody.length ; i++){
        //display snake
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        //check for snake colliding with itself
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody [i][0]){
            gameOver = true;
        }
    }
    gameBoard.innerHTML = html
}

//call functions
updateFoodPosition();
setInterval(Game, 50);

