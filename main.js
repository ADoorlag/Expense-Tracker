const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// const deleteBtn = document.querySelector("delete-btn");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add transactions
function addTransaction(e){
    e.preventDefault();
    
    if (text.value.trim() === "" || amount.value.trim() === ""){
        alert("Please add text and an amount");
    } else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = "";
        amount.value = "";
    }
}

//generate random id
function generateID(){
    return Math.round(Math.random() * 100000000);
}

// add transactions to DOM list
function addTransactionDOM(transaction){
    //get the sign
    const sign = transaction.amount < 0 ? "-" : '+';

    const item = document.createElement("li");

    //add class based on sign value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class ="delete-btn" onclick = "removeTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

//update the balance, income, and expenses
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc += item, 0).toFixed(2);

    const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc += item, 0 * -1).toFixed(2);

    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

//delete transactions
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

//update transactions in local storage
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

//init app
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);
// deleteBtn.addEventListener("click", removeTransaction)

