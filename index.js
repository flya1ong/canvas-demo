const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2  // start point x
let y = canvas.height - 30 // start point y
let dx = 2
let dy = -2
const ballRadius = 10

// define a ball
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#3A83EA';
    ctx.fill()
    ctx.closePath()
}

// define a paddle to hit the ball
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '3A83EA'
    ctx.fill()
    ctx.closePath()
}

// draw code
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    drawPaddle()
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx
    }
    x += dx
    y += dy
}

setInterval(draw, 10)
