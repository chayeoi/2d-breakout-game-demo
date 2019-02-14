const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const ballRadius = 10
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true
  }
  else if (e.keyCode == 37) {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false
  }
  else if (e.keyCode == 37) {
    leftPressed = false
  }
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }

  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    }
    else {
      alert('GAME OVER')
      document.location.reload()
      clearInterval(interval)
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }

  x += dx
  y += dy
}

const interval = setInterval(draw, 10)
