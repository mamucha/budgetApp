const btn = document.querySelector('.c-add__box');

btn.addEventListener('click', function () {
  document.querySelector('.c-add').classList.toggle('c-add--anime');
  document.querySelector('.c-add').classList.remove('c-add--content');
});

class BudgetApp {
  addIncomes = null;
  addExpense = null;
  addTransfer = null;
  addBill = null;

  UISelectors = {
    addIncomes: '[data-income]',
    addExpense: '[data-expense]',
    addTransfer: '[data-transfer]',
    addBill: '[data-id]',
  };

  initApp() {
    this.addIncomes = document.querySelector(this.UISelectors.addIncomes);
    this.addExpense = document.querySelector(this.UISelectors.addExpense);
    this.addTransfer = document.querySelector(this.UISelectors.addTransfer);
    this.addBill = document.querySelectorAll(this.UISelectors.addBill);

    this.addListeners();
  }

  addListeners() {
    this.addBill.forEach((item) =>
      item.addEventListener('click', () => {
        this.addItem(item);
      })
    );
  }

  addItem(item) {
    document.querySelector('.c-add').classList.toggle('c-add--content');
    document.querySelector('.c-content__title').innerHTML = `Add ${item.dataset.id}`;
  }
}

const budget = new BudgetApp();
budget.initApp();
