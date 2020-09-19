const btn = document.querySelector('.c-add__box');

btn.addEventListener('click', function () {
  document.querySelector('.c-add').classList.toggle('c-add--anime');
  document.querySelector('.c-add').classList.remove('c-add--content');
});

document.querySelector('[data-income]').addEventListener('click', (e) => {
  document.querySelector('.c-add').classList.toggle('c-add--content');
  document.querySelector('.c-content__title').innerHTML = 'Add Expense';
});
