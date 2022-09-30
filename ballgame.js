let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const GAME_BOARD_WIDTH = 480, GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7, BALL_RADIAN = 30;
const LEVEL = 5;
let currentLevel = 1;
let GAME_RENDER_SPEED = 10 ;
let count = 0;
let x = canvas.width /2 ;
let y = canvas.height - BALL_RADIAN;
let dx = 2;
let dy = -2;
let điểm = 1;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 90;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
let rightPressed = false;
let leftPressed = false;
let GameBoard = function (width, height) {
    this.width = width;
    this.height = height;
    this.drawGameBoard = function (canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
    }
    this.drawScore = function () {
        ctx.font = "15px Arial";
        ctx.fillStyle = "#c01d1d";
        ctx.fillText("điểm:" + điểm, 8, 20);
    }
}
let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
let Ball = function () {
    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS,0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        x += dx;
        y += dy;
        if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
            dx = -dx;
        }
        if (y + dy < BALL_RADIUS){
            dy = -dy;
        }
        else if (y + dy > canvas.height - BALL_RADIUS) {
            if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
                dy = -dy;
            }
            else if (y + dy < canvas.height - BALL_RADIUS-28) {
                if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
                    dy = -dy;
                }
            }else if (y + dy > canvas.height - BALL_RADIUS+5){
                alert("Bạn đã chết! " + " \nĐiểm của bạn: "+ điểm + " \nChơi lại đi bạn!")
                document.location.reload();
                clearInterval(gameInterval);
        }
    }
    }
}
let Paddle = function () {
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;
    this.yCoordinate = canvas.height - PADDLE_HEIGHT;
    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate,
            this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    document.addEventListener("keydown", keyDownHandle, false);
    document.addEventListener("keyup", keyUpHandle, false);
    function keyDownHandle(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }
    function keyUpHandle(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }
    if (rightPressed){
        paddleX = Math.min(paddleX + 5, canvas.width - PADDLE_WIDTH);
    } else if (leftPressed){
        paddleX = Math.max(paddleX - 5,0);
    }
}
function drawGame() {
    let ball = new Ball(x, y, BALL_RADIAN, 10);
    let paddle = new Paddle(PADDLE_WIDTH, 200);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle(paddleX, PADDLE_WIDTH);
    gameBoard.drawScore();
}
let gameInterval = setInterval(drawGame, GAME_RENDER_SPEED);
let countInterval = setInterval(() => {
    điểm ++;
    count++;
    if(count === 5) {
        GAME_RENDER_SPEED -=1;
        currentLevel++
        document.getElementById("level").innerText = "Cấp : " + currentLevel  ;
        checkLevel()
        count = 0;
    }
}, 1000);
function checkLevel() {
    if(currentLevel === LEVEL){
        document.getElementById("level").innerText = "Phá Đảo";
        clearInterval(gameInterval);
        clearInterval(countInterval);
    }
}