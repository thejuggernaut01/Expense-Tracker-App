"use strict";

const budgetButton = document.querySelector(".button--1");
const expenseButton = document.querySelector(".button--2");

const editButton = document.querySelector(".edit");
const deleteButton = document.querySelector(".delete");

const budgetInput = document.querySelector(".budget");
const expenseTitle = document.querySelector(".expense_name");
const expenseValue = document.querySelector(".expense_amount");

const budget = document.getElementById("budget");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");

const expenseFormTitle = document.querySelector(".form-title");
const expenseFormValue = document.querySelector(".form-value");

const expenseFormContainer = document.querySelector(".expenseForm");
const expenseContainer = document.querySelector(".container__1");
const balanceContainer = document.querySelector(".balance--value");

let itemList = [];
let itemID = 0;
let itemED = 0;

class budgetApp {
  constructor() {
    budgetButton.addEventListener("click", this.displayBudget.bind(this));
    expenseButton.addEventListener("click", this.displayExpense.bind(this));
    expenseFormContainer.addEventListener(
      "click",
      this.deleteExpense.bind(this)
    );

    expenseFormContainer.addEventListener("click", this.editExpense.bind(this));

    this.totalExpense();
  }

  displayBudget(e) {
    e.preventDefault();
    if (budgetInput.value) {
      budget.innerHTML = `${budgetInput.value}`;
      budgetInput.value = "";

      this.displayBalance();
    } else return;
  }

  displayExpense(e) {
    e.preventDefault();
    if (expenseTitle.value && expenseValue.value) {
      let obj = {};
      expense.innerHTML = expenseValue.value;

      obj.title = expenseTitle.value;
      obj.value = expense.textContent;
      obj.itemID = itemID;
      obj.itemED = itemED;

      itemList.push(obj);

      this.displayExpenseForm(itemList);

      this.displayBalance();

      expenseValue.value = "";
      expenseTitle.value = "";
    } else return;
  }

  totalExpense() {
    let total = 0;
    if (itemList.length > 0) {
      total = itemList.reduce((acc, cur) => {
        acc += Number(cur.value);
        return acc;
      }, 0);
    }
    expense.innerHTML = total;
    return total;
  }

  displayBalance() {
    let expense = this.totalExpense();
    let totalBalance = Number(budget.innerHTML) - expense;
    balance.innerHTML = totalBalance;

    if (totalBalance > 0) {
      balanceContainer.style.color = "#317b22";
    } else if (totalBalance < 0) {
      balanceContainer.style.color = "#b80c09";
    } else {
      balanceContainer.style.color = "#333333";
    }
  }

  displayExpenseForm(expense) {
    expenseFormContainer.innerHTML = "";

    expense.forEach(function (index) {
      const html = `
        <div class="movements__row">
          <div class="form-title">- ${index.title.toUpperCase()}</div>
          <div class="form-value">$${Number(index.value)}</div>
          
          <div class="edit--delete">
            <i class="fa-solid fa-pen-to-square edit" data-id="${++index.itemED}"></i>
            <i class="fa-solid fa-trash delete" data-id="${++index.itemID}"></i>
          </div>
        </div>
      `;
      expenseFormContainer.insertAdjacentHTML("beforeend", html);
    });
  }

  deleteExpense(e) {
    const expenseEl = e.target.parentElement.parentElement;
    if (e.target.classList.contains("delete")) {
      itemList.some((exp) => {
        if (exp.itemID === Number(e.target.dataset.id)) {
          expenseFormContainer.removeChild(expenseEl);
          itemList.forEach((obsoleteItem) => {
            if (itemList.indexOf(exp) > -1) {
              itemList.splice(itemList.indexOf(exp), 1);
            }
          });
        }
      });
    }
    this.displayBalance();
    if (!e.target.classList.contains(".delete")) return;
  }

  editExpense(e) {
    const expenseEl = e.target.parentElement.parentElement;

    if (e.target.classList.contains("edit")) {
      itemList.some((exp) => {
        if (exp.itemID === Number(e.target.dataset.id)) {
          expenseFormContainer.removeChild(expenseEl);
          itemList.forEach((obsoleteItem) => {
            if (itemList.indexOf(exp) > -1) {
              // Show values
              expenseTitle.value = exp.title;
              expenseValue.value = exp.value;

              // Remove from list
              itemList.splice(itemList.indexOf(exp), 1);
              console.log(exp);
            }
          });
        }
      });
    }

    this.displayBalance();
    if (!e.target.classList.contains(".edit")) return;
  }
}

const app = new budgetApp();
