// const btn = document.querySelector('.c-add__box');
// let addPanel = false;

// btn.addEventListener('click', function () {
// if(!addPanel) {
//    document.querySelector('.c-add').classList.add('c-add--anime');
// }

//   document.querySelector('.c-add').classList.remove('c-add--content');
//   document.querySelector('.c-content').classList.remove('c-content--visible');
// });

class BudgetApp {
  // constructor() {
  //   this.addPanel = false;
  // }
  addPanel = false;
  addIncomes = null;
  addExpense = null;
  addTransfer = null;
  addBill = null;
  addButton = null;
  addValue = null;
  description = null;
  value = null;
  date = null;
  taskList = null;

  UISelectors = {
    addIncomes: '[data-income]',
    addExpense: '[data-expense]',
    addTransfer: '[data-transfer]',
    addBill: '[data-id]',
    addButton: '[data-add]',
    addValue: '[data-create]',
    description: 'description',
    value: 'value',
    date: 'date',
    taskList: '[data-tasks]',
  };

  initApp() {
    this.addIncomes = document.querySelector(this.UISelectors.addIncomes);
    this.addExpense = document.querySelector(this.UISelectors.addExpense);
    this.addTransfer = document.querySelector(this.UISelectors.addTransfer);
    this.addBill = document.querySelectorAll(this.UISelectors.addBill);
    this.addButton = document.querySelector(this.UISelectors.addButton);
    this.addValue = document.querySelector(this.UISelectors.addValue);
    this.description = document.getElementById(this.UISelectors.description);
    this.value = document.getElementById(this.UISelectors.value);
    this.date = document.getElementById(this.UISelectors.date);
    this.taskList = document.querySelector(this.UISelectors.taskList);

    this.menangePanel();
    this.addListeners();
  }

  menangePanel() {
    this.addButton.addEventListener('click', (e) => {
      console.log(this.addPanel);
      if (!this.addPanel) {
        document.querySelector('.c-add').classList.add('c-add--anime');
        this.addPanel = true;
      } else {
        document.querySelector('.c-add').classList.remove('c-add--anime');
        this.addPanel = false;
      }

      document.querySelector('.c-add').classList.remove('c-add--content');
      document.querySelector('.c-content').classList.remove('c-content--visible');
    });
  }

  addListeners() {
    this.addBill.forEach((item) =>
      item.addEventListener('click', () => {
        this.addItem(item);
      })
    );

    this.addValue.addEventListener('submit', (e) => this.createItem(e));
  }

  addItem(item) {
    this.addPanel = true;
    document.querySelector('.c-add').classList.add('c-add--content');
    document.querySelector('.c-content').classList.add('c-content--visible');
    document.querySelector('.c-add').classList.remove('c-add--anime');
    document.querySelector('.c-content__title').innerHTML = `Add ${item.dataset.id}`;
  }

  createItem(e) {
    e.preventDefault();
    this.addPanel = false;
    console.log(this.taskList);
    this.taskList.insertAdjacentHTML(
      'beforeend',
      `<li class="c-tasks__item">
    <p class="c-tasks__desc">${this.description.value}</p>
    <p class="c-tasks__value">${this.value.value}</p>
    <p class="c-tasks__date">${this.date.value}</p>
  </li>`
    );

    this.description.value = '';
    this.value.value = '';
    this.date.value = '';
    document.querySelector('.c-add').classList.remove('c-add--content');
    document.querySelector('.c-content').classList.remove('c-content--visible');
  }
}

const budget = new BudgetApp();
budget.initApp();
