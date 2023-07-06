const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2  // start point x
let y = canvas.height - 30 // start point y
let dx = 2
let dy = -2
const ballRadius = 10
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let leftPressed = false;
let rightPressed = false;
let interval;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    const { key } = e;
    if (key === 'ArrowRight') {
        rightPressed = true
    } else if (key === 'ArrowLeft') {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    const { key } = e;
    if (key === 'ArrowRight') {
        rightPressed = false
    } else if (key === 'ArrowLeft') {
        leftPressed = false
    }
}

// define a ball
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#3A83EA';
    ctx.fill()
    ctx.closePath()
}

// define a paddle to hit the ball
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '3A83EA'
    ctx.fill()
    ctx.closePath()
}

// start
function start() {
    interval = setInterval(draw, 10)
}

// reset
function reset() {
    console.log('game over')
    // document.location.reload()
    x = canvas.width / 2  // start point x
    y = canvas.height - 30 // start point y
    dx = 2
    dy = -2
    paddleX = (canvas.width - paddleWidth) / 2;
    leftPressed = false;
    rightPressed = false;
    clearInterval(interval)
    interval = null;
}

// draw code
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    drawPaddle()
    // ball moving
    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            reset()
        }
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx
    }
    x += dx
    y += dy
    // paddle moving
    if (leftPressed && rightPressed) {
        // stop moving
    } else if (rightPressed) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 5;
        if (paddleX < 0) {
            paddleX = 0
        }
    }
}

start()
