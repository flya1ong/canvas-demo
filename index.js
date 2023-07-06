const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2  // start point x
let y = canvas.height - 30 // start point y
let dx = 2
let dy = -2
// ball geo
const ballRadius = 10
const paddleHeight = 10;
const paddleWidth = 75;
// paddlex geo
let paddleX = (canvas.width - paddleWidth) / 2;
let leftPressed = false;
let rightPressed = false;
let interval;
// brick geo
const brickRowCount = 1;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeigt = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// score
let score = 0;
let msg = null;
// lives
let lives = 1

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    if (msg) return
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function keyDownHandler(e) {
    const { key, code } = e;
    if (key === 'ArrowRight') {
        rightPressed = true
    } else if (key === 'ArrowLeft') {
        leftPressed = true
    } else if ((key === ' ' || code === 'Space') && msg) {
        reset()
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

// fill empty point into bricks array
const bricks = []
function resetBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = []
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 }
        }
    }
}
resetBricks();
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const target = bricks[c][r]
            if (target && target.status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
                const brickY = r * (brickHeigt + brickPadding) + brickOffsetTop
                target.x = brickX;
                target.y = brickY;
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeigt)
                ctx.fillStyle = '#3A83EA'
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const target = bricks[c][r]
            if (target.status === 1) {
                if (x > target.x &&
                    x < target.x + brickWidth &&
                    y > target.y &&
                    y < target.y + brickHeigt
                ) {
                    dy = -dy
                    target.status = 0
                    score++;
                    if (score === brickColumnCount * brickRowCount) {
                        msg = {
                            message: 'You Win!',
                            color: '#E64047'
                        }
                        stop()
                    }
                }
            }
        }
    }
}

function drawMessage() {
    if (msg) {
        const { message, color } = msg
        ctx.font = '20px Arial bold'
        ctx.fillStyle = color
        ctx.fillText(message, canvas.width / 2 - 140, canvas.height / 2 - 10)
        ctx.fillText('please press space button to restart', canvas.width / 2 - 140, canvas.height / 2 + 10)
    }
}

function drawScore() {
    ctx.font = '16px Arial'
    ctx.fillStyle = '#65D348'
    ctx.fillText(`Score:${score}`, 8, 20)
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

// start
function start() {
    draw()
}

// stop
function stop() {
    let timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
    }, 100)
}

// reset
function reset() {
    x = canvas.width / 2  // start point x
    y = canvas.height - 30 // start point y
    dx = 2
    dy = -2
    paddleX = (canvas.width - paddleWidth) / 2
    leftPressed = false
    rightPressed = false
    score = 0
    resetBricks()
    clearInterval(interval)
    interval = null;
    msg = null;
    start()
}



// draw code
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    drawBricks()
    drawPaddle()
    drawScore()
    drawLives()
    collisionDetection()
    if (msg) {
        drawMessage()
        return
    }
    // ball moving
    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            lives--
            if (!lives) {
                msg = {
                    message: 'Sorry, you lose',
                    color: '#E64047'
                }
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
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
    requestAnimationFrame(draw);
}

start()
