
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget");

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseDate = document.getElementById("expense-date");

const expenseTableBody = document.getElementById("expense-table-body");

let totalBudget = Number(localStorage.getItem("spendwiseBudget")) || 0;

let expenses = JSON.parse(localStorage.getItem("spendwiseExpenses")) || [];

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2
    }).format(amount);
}

function saveData() {
    localStorage.setItem("spendwiseBudget", totalBudget);
    localStorage.setItem("spendwiseExpenses", JSON.stringify(expenses));
}

function updateDashboard() {
    const totalExpenses = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    const remainingBalance = totalBudget - totalExpenses;

    document.getElementById("total-budget").textContent =
        formatCurrency(totalBudget);

    document.getElementById("total-expenses").textContent =
        formatCurrency(totalExpenses);

    document.getElementById("remaining-balance").textContent =
        formatCurrency(remainingBalance);

    updateCategoryTotals();
}

function updateCategoryTotals() {
    const categoryTotals = {};

    expenses.forEach(expense => {
        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const categoryElements = {
        "Meals and groceries": "category-meals-and-groceries",
        "Travel and bus fare": "category-travel-and-bus-fare",
        "House rent and housing": "category-house-rent-and-housing",
        "Entertainment": "category-entertainment",
        "Utilities": "category-utilities",
        "Other": "category-other"
    };

    Object.entries(categoryElements).forEach(([category, elementId]) => {
        document.getElementById(elementId).textContent =
            formatCurrency(categoryTotals[category] || 0);
    });
}

function displayExpenses() {
    expenseTableBody.innerHTML = "";

    expenses.forEach(expense => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = expense.name;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatCurrency(expense.amount);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteExpense(expense.id);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(amountCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        expenseTableBody.appendChild(row);
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);

    saveData();
    displayExpenses();
    updateDashboard();
}

budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const budgetValue = Number(budgetInput.value);

    if (!Number.isFinite(budgetValue) || budgetValue < 0) {
        alert("Please enter a valid budget.");
        return;
    }

    totalBudget = budgetValue;

    saveData();
    updateDashboard();

    budgetForm.reset();

    alert("Budget saved successfully.");
});

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;

    if (!name || !Number.isFinite(amount) || amount <= 0 || !category || !date) {
        alert("Please enter valid information in all expense fields.");
        return;
    }

    const newExpense = {
        id: Date.now().toString(),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(newExpense);

    saveData();
    displayExpenses();
    updateDashboard();

    expenseForm.reset();

    alert("Expense added successfully.");
});

displayExpenses();
updateDashboard();
