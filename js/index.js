class BudgetApp {
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

  numberItems = 0;
  balanceItems = [];

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
    balanceList: '[data-balance-list]',
    taskListIncome: '[data-tasks-income]',
    taskListExpense: '[data-tasks-expense]',
    taskListTransfer: '[data-tasks-transfer]',
    deleteTask: '[data-delete]'
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
    this.balanceList = document.querySelector(this.UISelectors.balanceList);
    this.taskListIncome = document.querySelector(this.UISelectors.taskListIncome);
    this.taskListExpense = document.querySelector(this.UISelectors.taskListExpense);
    this.taskListTransfer = document.querySelector(this.UISelectors.taskListTransfer);


    this.menangePanel();
    this.addListeners();
    this.getLocalStorage();

    const element = this.choiceElement()
    console.log(element)


    this.balanceItems.forEach(({ id, choiceInput, description, value, date }) => {

     if (choiceInput == this.taskListIncome.id) {
      this.taskListIncome.insertAdjacentHTML(
        'beforeend',
        `<li class="c-tasks__item ${choiceInput}" id="${id}">
        <div class="c-tasks__desc">
        <p class="c-tasks__desc">${description}</p>
        <p class="c-tasks__value">${value}</p>
        <p class="c-tasks__date">${date}</p>
        </div>
        <div class="c-tasks__edit">
<button class="c-tasks__button c-tasks__button--edit"><i class="fas fa-edit"></i></button>
<button class="c-tasks__button c-tasks__button--delete" data-delete="delete"><i class="fas fa-times"></i></button>
        </div>
      </li>`
      );
     } else if(choiceInput == this.taskListExpense.id) {
      this.taskListExpense.insertAdjacentHTML(
        'beforeend',
        `<li class="c-tasks__item ${choiceInput}" id="${id}">
        <div class="c-tasks__desc">
        <p class="c-tasks__desc">${description}</p>
        <p class="c-tasks__value">${value}</p>
        <p class="c-tasks__date">${date}</p>
        </div>
        <div class="c-tasks__edit">
<button class="c-tasks__button c-tasks__button--edit"><i class="fas fa-edit"></i></button>
<button class="c-tasks__button c-tasks__button--delete" data-delete="delete"><i class="fas fa-times"></i></button>
        </div>
      </li>`
      );
     } else if(choiceInput == this.taskListTransfer.id) {
      this.taskListTransfer.insertAdjacentHTML(
        'beforeend',
        `<li class="c-tasks__item ${choiceInput}" id="${id}">
        <div class="c-tasks__desc">
        <p class="c-tasks__desc">${description}</p>
        <p class="c-tasks__value">${value}</p>
        <p class="c-tasks__date">${date}</p>
        </div>
        <div class="c-tasks__edit">
<button class="c-tasks__button c-tasks__button--edit" data-btn-edit><i class="fas fa-edit"></i></button>
<button class="c-tasks__button c-tasks__button--delete" data-delete="delete"><i class="fas fa-times"></i></button>
        </div>
      </li>`
      );
     }


    });
  }

  menangePanel() {
    this.addButton.addEventListener('click', (e) => {
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

this.balanceList.addEventListener('click', (e) => {
  this.clickHandler(e.target.parentElement)

})

    this.addValue.addEventListener('submit', (e) => this.createItem(e));
  }

  addItem(item) {
    this.addPanel = true;
    document.querySelector('.c-add').classList.add('c-add--content');
    document.querySelector('.c-content').classList.add('c-content--visible');
    document.querySelector('.c-add').classList.remove('c-add--anime');
    document.querySelector('.c-content__title').innerHTML = `Add ${item.dataset.id}`;
    this.addValue.id = `${item.dataset.id.trim().toLowerCase()}`;
  }

  createItem(e) {
    e.preventDefault();
    this.addPanel = false;
    const newItem = this.getInputsValues();

    console.log(this.taskListTransfer.id)
    console.log(this.addValue.id)

  const element = this.choiceElement();

  


  element.insertAdjacentHTML(
      'beforeend',
this.createLiBox()
    );

    this.balanceItems.push(newItem);
    console.log(newItem);
    this.numberItems++;

    this.setLocalStorage();

    this.description.value = '';
    this.value.value = '';
    this.date.value = '';
    document.querySelector('.c-add').classList.remove('c-add--content');
    document.querySelector('.c-content').classList.remove('c-content--visible');
  }

  choiceElement() {

if(this.addValue.id == this.taskListIncome.id){
  console.log(this.addValue.id)
  return this.taskListIncome
}
else if(this.addValue.id == this.taskListExpense.id) {
  return this.taskListExpense
} 
else if(this.addValue.id == this.taskListTransfer.id) {
  return this.taskListTransfer
}

  }


  createLiBox() {
    return `
    <li class="c-tasks__item ${this.addValue.id}" id="${this.numberItems}">
    <div class="c-tasks__desc">
    <p class="c-tasks__desc">${this.description.value}</p>
    <p class="c-tasks__value">${this.value.value}</p>
    <p class="c-tasks__date">${this.date.value}</p>
    </div>
    <div class="c-tasks__edit">
<button class="c-tasks__button c-tasks__button--edit" data-btn-edit><i class="fas fa-edit"></i></button>
<button class="c-tasks__button c-tasks__button--delete" data-delete="delete"><i class="fas fa-times"></i></button>
    </div>
  </li>`;
  }

  getInputsValues() {
    const id = this.numberItems;
    const choiceInput = this.addValue.id;
    const description = this.description.value;
    const value = this.value.value;
    const date = this.date.value;

    if (value > 0 && description) {
      return {
        id,
        choiceInput,
        description,
        value,
        date,
      };
    }

    return null;
  }

  clickHandler(target) {
    console.log(document.querySelector(this.UISelectors.deleteTask).dataset.delete)
    console.log(target.dataset == document.querySelector(this.UISelectors.deleteTask))
    console.log(target.dataset.delete)
    // console.log(target.getAttribute())
if(target.dataset.delete === document.querySelector(this.UISelectors.deleteTask).dataset.delete)

target.parentElement.parentElement.remove()
this.removeLocalStorage(target.parentElement.parentElement.id);


console.log(target.parentElement.parentElement)
  }

 removeLocalStorage(id) {
    let items = [...this.balanceItems]
    this.balanceItems = items.filter((item) => item.id != id);

    this.setLocalStorage()

  };

  setLocalStorage() {
    localStorage.setItem('balanceItems', JSON.stringify(this.balanceItems));
    localStorage.setItem('numberItems', JSON.stringify(this.numberItems));
  }

  getLocalStorage() {
    this.balanceItems = localStorage.getItem('balanceItems')
      ? JSON.parse(localStorage.getItem('balanceItems'))
      : [];
    this.numberItems = localStorage.getItem('numberItems')
      ? JSON.parse(localStorage.getItem('numberItems'))
      : 0;
  }
}

const budget = new BudgetApp();
budget.initApp();
