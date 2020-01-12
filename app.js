// Elements
const cellElements = document.querySelectorAll('.cell')
const board = document.querySelector('.board')
const message = document.querySelector('.message')
const overlay = document.querySelector('.overlay')
const restartBtn = document.querySelector('.restart-btn')

// Variables
let circleTurn
const CIRCLE_CLASS = 'o'
const X_CLASS = 'x'
const WIN_COMBS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

restartBtn.addEventListener('click', () => {
	location.reload()
})

cellElements.forEach(item => {
	item.addEventListener('click', clickHandler, {once: true})
})

function clickHandler(e) {
	const cell = e.target
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	}
	swapTurn()
	setBoardClass()
}

function endGame(draw) {
	if (draw) {
		message.innerText = `Draw!`
	} else {
		message.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
	}
	overlay.classList.add('overlay--show')
}

function isDraw() {
 return [...cellElements].every(cell => {
 	return cell.classList.contains(X_CLASS) ||
	 cell.classList.contains(CIRCLE_CLASS)
 })
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurn() {
	circleTurn = !circleTurn
}

function setBoardClass() {
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCLE_CLASS)
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS)
	} else {
		board.classList.add(X_CLASS)
	}
}

function checkWin(currentClass) {
	return WIN_COMBS.some(comb => {
		return comb.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}