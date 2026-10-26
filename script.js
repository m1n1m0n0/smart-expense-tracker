// Smart Expense Tracker: add, list, delete and total expenses (data resets on refresh)

// Elements from index.html
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const message = document.getElementById("message");
const totalAmount = document.getElementById("total-amount");
const expenseList = document.getElementById("expense-list");

// All expenses: { id, name, amount, category }
let expenses = [];
let nextId = 1;

// Read the form, validate it, and add the expense if it is valid
function addExpense(event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;

  if (name === "") {
    showMessage("Please enter an expense name.");
    return;
  }
  // Check the amount in whole cents, the same value we display and total.
  // Empty ("" -> 0), text (NaN), negatives, 0.001 (-> 0 cents) and huge values (-> Infinity) are all rejected.
  const cents = Math.round(amount * 100);
  if (!Number.isFinite(cents) || cents <= 0) {
    showMessage("Amount must be greater than zero.");
    return;
  }

  expenses.push({ id: nextId++, name: name, amount: amount, category: category });
  showMessage("");
  form.reset();
  renderExpenses();
}

// Remove only the expense with this id
function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  renderExpenses();
}

// Show a validation message (an empty string hides it)
function showMessage(text) {
  message.textContent = text;
}

// Rebuild the table rows from the expenses array
function renderExpenses() {
  expenseList.textContent = ""; // remove the old rows

  // Empty state: one friendly row across all 4 columns instead of a bare header
  if (expenses.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 4;
    emptyCell.textContent = "No expenses yet. Add your first one above.";
    emptyRow.appendChild(emptyCell);
    expenseList.appendChild(emptyRow);
  }

  expenses.forEach(function (expense) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = expense.name; // textContent: typed text is never treated as HTML

    const categoryCell = document.createElement("td");
    categoryCell.textContent = expense.category;

    const amountCell = document.createElement("td");
    amountCell.textContent = "$" + expense.amount.toFixed(2);

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteExpense(expense.id);
    });
    actionCell.appendChild(deleteButton);

    row.append(nameCell, categoryCell, amountCell, actionCell);
    expenseList.appendChild(row);
  });

  updateTotal();
}

// Add up in whole cents so 0.10 + 0.20 shows $0.30, not $0.30000000000000004
function updateTotal() {
  let totalCents = 0;
  expenses.forEach(function (expense) {
    totalCents += Math.round(expense.amount * 100);
  });
  totalAmount.textContent = "$" + (totalCents / 100).toFixed(2);
}

form.addEventListener("submit", addExpense);
renderExpenses(); // show the empty state when the page first loads
