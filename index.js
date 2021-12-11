const accountOne = {
	owner: "Mohasin akonda",
	movements: [2000, -1000, 3000, 500, -4000, 460, 456, 1000],
	interestRate: 1.4,
	pin: 1111,
}

const accountTwo = {
	owner: "Shojib akonda",
	movements: [-2000, -1000, 3000, 5000, -4000],
	interestRate: 1.5,
	pin: 2222,
}
const accountThree = {
	owner: "Jamal hossain akonda",
	movements: [2000, -1000, 3000, -500, -4000],
	interestRate: 1.2,
	pin: 3333,
}

const accounts = [accountOne, accountTwo, accountThree]

//TEMPLATE
const mainApp = document.querySelector(".main")
const welcomeName = document.querySelector(".name")
const welcomeMsg = document.querySelector(".msg")
const userName = document.querySelector(".user-name")
const userId = document.querySelector(".id")
const userLoginBtn = document.querySelector(".nav-btn")
const currentDate = document.querySelector(".current-date")
const currentMainBalance = document.querySelector(".current-balance")
// //////// balance transfer
const transferIdName = document.querySelector(".transfer-id-name")
const transferAmount = document.querySelector(".transfer-amount")
const transferBtn = document.querySelector(".transfer-btn")

// //// loan
const loanAmount = document.querySelector(".loan-amount")
const loanRequestBtn = document.querySelector(".loan-request-btn")
// /// account close

const closeUser = document.querySelector(".close-user-name")
const closeUserPassword = document.querySelector(".close-user-password")
const closeUserBtn = document.querySelector(".close-user-account")

/////////////SUMMARY IS OUT AND INTEREST
const summaryIn = document.querySelector(".summary--in")
const summaryOut = document.querySelector(".summary--out")
const summaryInterest = document.querySelector(".summary--interest")

/////transection row

const transectionArea = document.querySelector(".transection-detail-area")
// bank info area
const bankInfoArea = document.querySelector(".bank-info-area")
const sortBtn = document.querySelector(".movements--sort")

//DISPLAY MOVEMENTS
function valueMovements(movements, sort = false) {
	document.querySelector(".transection-detail-area").innerHTML = "" //update movements after sorting

	const movs = sort ? movements.slice().sort((a, b) => a - b) : movements //sort implement

	movs.forEach(function (mov, index) {
		const value = mov > 0 ? "deposit" : "withdrawal"
		const html = `
        <div class="transection-row">
					<div class="movement-type movement-type--${value}">${index + 1} ${value}</div>
					<div class="movement-date">${date()}</div>
					<div class="movement-value">${mov}$</div>
				</div>
        `
		transectionArea.insertAdjacentHTML("afterbegin", html)
	})
}

/////CURRENT MAIN BALANCE

function displayCurrentBalance(acc) {
	acc.balance = acc.movements.reduce((acc, move) => acc + move, 0)
	// update balance
	currentMainBalance.textContent = `$ ${acc.balance}`
}
///////SUMMARY IN OUT SECTION
function summaryInOut(summary, interest) {
	const deposit = summary
		.filter((mov) => mov > 0)
		.reduce((acc, deposit) => acc + deposit, 0)
	const withdrawal = summary
		.filter((withdraw) => withdraw < 0)
		.reduce((acc, cur) => Math.abs(acc + cur, 0))
	const interestAmount = (deposit * interest) / 100
	summaryIn.textContent = "$" + deposit
	summaryOut.textContent = "$" + withdrawal
	summaryInterest.textContent = "$" + interestAmount.toFixed(2)
}

////CREATE USER NAME

function createUserName(accountsName) {
	accountsName.find((acc) => {
		acc.username = acc.owner
			.toLowerCase()
			.split(" ")
			.map((name) => name[0])
			.join("")
	})
}
createUserName(accounts)
// console.log(accounts)
function updateUI(acc) {
	valueMovements(acc.movements)
	displayCurrentBalance(acc)
	summaryInOut(acc.movements, acc.interestRate)
}
let currentAccount // current account for updating ui

userLoginBtn.addEventListener("click", function () {
	currentAccount = accounts.find(
		(account) => userName.value === account.username,
	)

	if (Number(userId.value) === currentAccount?.pin) {
		welcomeName.textContent = ` ${currentAccount.owner.split(" ")[0]}`

		updateUI(currentAccount)
		mainApp.style.opacity = 100
	}

	const time = new Date()
	const hour = time.getHours()/(1000*60)
	const msg = hour < 12 ? "good morning" : "good evening"
	welcomeMsg.textContent = msg

	userId.value = ""
	userName.value = ""
})
// CURRENT DATE
function date() {
	const dateTemplate = new Date()
	const day = dateTemplate.toLocaleDateString("en-BD")
	const time = dateTemplate.toLocaleTimeString([], { timeStyle: "short" })
	return `${day}  ${time}`
}
currentDate.textContent = date()

// TRANSFER BALANCE
transferBtn.addEventListener("click", function () {
	const amount = Number(transferAmount.value)
	const transferTo = accounts.find(
		(acc) => acc.username === transferIdName.value,
	)
	// accounts.forEach(function (acc) {
	if (
		amount > 0 &&
		transferTo &&
		currentAccount.balance >= amount &&
		currentAccount?.username !== transferTo.username
	) {
		currentAccount.movements.push(-amount)
		transferTo.movements.push(amount)
		// console.log(currentAccount.balance)

		// console.log(currentAccount)
	}
	updateUI(currentAccount)
	// })
	// clear input section
	transferIdName.value = transferAmount.value = ""
})

//////////////////LOAN

loanRequestBtn.addEventListener("click", function () {
	const loan = Number(loanAmount.value)
	if (loan) {
		currentAccount.movements.push(loan) //loan push on current account

		updateUI(currentAccount) //update ui
	}
	loanAmount.value = ""
})

/////////////// CLOSE ACCOUNT

closeUserBtn.addEventListener("click", function () {
	if (
		closeUser.value === currentAccount.username &&
		currentAccount.pin === Number(closeUserPassword.value)
	) {
		const currentUserIndex = accounts.findIndex(
			(acc) => acc.username === closeUser.value,
		)

		accounts.splice(currentUserIndex, 1)
		// console.log(currentAccount)
		mainApp.style.opacity = 0
	}
	closeUser.value = closeUserPassword = ""
})
//////////  SORT MOVEMENTS/////////
let sorted = false
sortBtn.addEventListener("click", function () {
	valueMovements(currentAccount.movements, !sorted)

	sorted = !sorted

	// currentAccount.movements.sort((a,b)=>a-b)
	// console.log(valueMovements(currentAccount.movements,!sorted))
})
/////////////PRACTICE practice
///////////////////////////////
