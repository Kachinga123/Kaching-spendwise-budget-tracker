
// =====================================
// SPENDWISE BUDGET TRACKER
// =====================================

const totalBudget = 50000;

const expenseForm = document.querySelector("#expense-form");
const expenseTable = document.querySelector("#expense-table tbody");
const summaryItems = document.querySelectorAll(".summary-item strong");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// =====================================
// DISPLAY EXPENSES
// =====================================

function displayExpenses() {

    expenseTable.innerHTML = "";

    expenses.forEach(function(expense, index) {

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${escapeHTML(expense.name)}</td>
            <td>KSh ${expense.amount.toLocaleString()}</td>
            <td>${escapeHTML(expense.category)}</td>
            <td>${escapeHTML(expense.date)}</td>
            <td>
                <button type="button"
                        class="delete-expense"
                        data-index="${index}">
                    Delete
                </button>
            </td>
        `;

        expenseTable.appendChild(newRow);
    });

    updateSummary();
}

// =====================================
// UPDATE DASHBOARD SUMMARY
// =====================================

function updateSummary() {

    const totalSpent = expenses.reduce(function(total, expense) {
        return total + expense.amount;
    }, 0);

    const remainingBudget = totalBudget - totalSpent;

    summaryItems[0].textContent =
        `KSh ${totalBudget.toLocaleString()}`;

    summaryItems[1].textContent =
        `KSh ${totalSpent.toLocaleString()}`;

    summaryItems[2].textContent =
        `KSh ${remainingBudget.toLocaleString()}`;
}

// =====================================
// SAFELY DISPLAY TEXT
// =====================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];

    });
}

// =====================================
// ADD NEW EXPENSE
// =====================================

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const expenseName =
        document.querySelector("#expense-name").value.trim();

    const expenseAmount =
        Number(document.querySelector("#expense-amount").value);

    const expenseCategory =
        document.querySelector("#expense-category").value;

    const expenseDate =
        document.querySelector("#expense-date").value;

    if (!expenseName || expenseAmount <= 0 ||
        !expenseCategory || !expenseDate) {

        alert("Please enter all expense details correctly.");
        return;
    }

    const newExpense = {
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
        date: expenseDate
    };

    expenses.push(newExpense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    expenseForm.reset();

    alert("Expense added successfully!");

});

// =====================================
// DELETE EXPENSE
// =====================================

expenseTable.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-expense")) {

        const index = Number(event.target.dataset.index);

        const confirmDelete = confirm(
            "Are you sure you want to delete this expense?"
        );

        if (confirmDelete) {

            expenses.splice(index, 1);

            localStorage.setItem(
                "expenses",
                JSON.stringify(expenses)
            );

            displayExpenses();

            alert("Expense deleted successfully!");
        }
    }

});

// =====================================
// LOAD SAVED EXPENSES
// =====================================

displayExpenses();
