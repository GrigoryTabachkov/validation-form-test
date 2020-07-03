/* eslint no-alert:0 */
const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

function validEmail(email) {
  const mailRegExp = /^[\w.+]+@gmail\.com$/;
  return mailRegExp.test(email);
}

function validUserName(userName) {
  /* eslint no-useless-escape:0 */
  const nameRegExp = /([А-ЯЁ][а-яё]+[\-\s]?){3,}/;
  return nameRegExp.test(userName);
}

function validPhone(phone) {
  /* eslint no-useless-escape:0 */
  const phoneRegExp = /^(\+7|8|07)(\(\d{3}\)|\d{3})\d{7}$/;
  return phoneRegExp.test(phone);
}

function validator() {
  const userNameInput = userName.value;
  const emailInput = email.value.trim();
  const phoneInput = phone.value.trim();

  if (userNameInput === '') {
    alert('Заполните ФИО полностью');
  } else if (!validUserName(userNameInput)) {
    alert('Введите ФИО в формате Петров Иван Васильевич');
  }

  if (emailInput === '') {
    alert('Для регистрации необходим email');
  } else if (!validEmail(emailInput)) {
    alert('Email должен принадлежать домену gmail.com');
  }

  if (phoneInput === '') {
    alert('Введите Ваш номер телефона');
  } else if (!validPhone(phoneInput)) {
    alert('В формате +7*, 8*, или 07*');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validator();
});
