const expAdd = document.getElementById("exp_add");
const expList = document.getElementById("exp_list");

const totalElement = document.getElementById("total");
const expInpReason = document.getElementById("exp_input-name");
const expInpAmount = document.getElementById("exp_input-amount");
const expInpDate = document.getElementById("exp_input-date");
const expInpCategory = document.getElementById("exp_input-category");

const expenses = localStorage.getItem("expenseArray")
  ? JSON.parse(localStorage.getItem("expenseArray"))
  : [];

function createExpenseElement(expense) {
  const expenseString = `
    <li class="exp-name">${expense.reason}</li>
    <li class="exp-amount">$${expense.amount}</li>
    <li class="exp-date">${expense.date}</li>
    <li class="exp-category">${expense.category}</li>`;

  const expenseElement = document.createElement("div");
  expenseElement.classList.add("expense");
  expenseElement.innerHTML = expenseString;

  return expenseElement;
}

function totalAmount() {
  const total = expenses.reduce(
    (ac, expense) => ac + parseInt(expense.amount),
    0
  );
  totalElement.innerText = `$ ${total}`;
}

//* Add Expense When Clicked

expAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const expReason = expInpReason.value;
  const expAmount = expInpAmount.value;
  const expDate = expInpDate.value;
  const expCategory = expInpCategory.value;
  const newExpense = {
    reason: expReason,
    amount: expAmount,
    date: expDate,
    category: expCategory,
  };

  if (expReason && expAmount && expDate && expCategory) {
    expenses.push(newExpense);
    localStorage.setItem("expenseArray", JSON.stringify(expenses));

    expList.appendChild(createExpenseElement(newExpense));
    totalAmount();
  } else console.log("Error");

  expInpReason.value = "";
  expInpAmount.value = "";
  expInpDate.value = "";
  expInpCategory.value = "";
});

//* Display The Stored Expenses When Page Is Loaded

if (expenses) {
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    expList.appendChild(createExpenseElement(expense));
  }

  totalAmount();
}
