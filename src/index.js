const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

function validUserName(userName) {
  const nameRegEx = /([А-ЯЁ][а-яё]+[\-\s]?){3,}/;
  return nameRegEx.test(userName);
}

function validEmail(email) {
  const emailRegEx = /^[\w.+]+@gmail.com$/;
  return emailRegEx.test(email);
}

function validPhone(phone) {
  const phoneRegEx = /^(\+7|8|07)(\(\d{3}\)|\d{3})\d{7}$/;
  return phoneRegEx.test(phone);
}

function validator(event) {
  event.preventDefault();

  const userNameInput = userName.value.trim();
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
    alert('Введите Ваш номер мобильного телефона');
  } else if (!validPhone(phoneInput)) {
    alert(`Номер должен начинаться с +7*, 8*, или 07*
    \nи содержать 11 цифр, вы ввели ${phoneInput.length} цифр`);
  }
}

function pasteHandler(event) {
  event.preventDefault();

  const copiedData = event.clipboardData || window.clipboardData;
  const pastedData = copiedData.getData('Text');

  const target = document.activeElement;

  switch (target) {
    case userName:
      // tEsT=1234567890Иван`~!#$%^&*(Петрович)_+[{}]\|/Иванов:;"'<,>.?
      console.log(`\nВставка \n${pastedData} \nв поле c id="${target.id}"`);
      target.value = pastedData.replace(/[^ А-яё]/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`Результат:\n${target.value}`);
      break;

    case email:
      // 1989_taЫыbachkov`~!#$%^&*хаюкен()+[{}]\|:;"'<,>.?/grigЯory@gmail.com
      console.log(`\nВставка \n${pastedData} \nв поле c id="${target.id}"`);
      target.value = pastedData.replace(/[^.\w.@gmail.com]/g, ' ').replace(/\s+/g, '').trim();
      console.log(`Результат:\n${target.value}`);
      break;

    case phone:
      // `~!#$%^&*хаюкенq+7(9wertyZXCV+[{16)2-}]\|:;"'<,>.--57-19!-48
      console.log(`\nВставка \n${pastedData} \nв поле c id="${target.id}"`);
      target.value = pastedData.replace(/[^0-9]/g, '').trim();
      console.log(`Результат:\n${target.value} \n${target.value.length}`);
      break;

    default:
      console.log('Выберите валидное поле для вставки');
  }
}

async function newUser(event) {
  event.preventDefault();

  const requestedData = await document.forms.signUpForm;
  const formData = new FormData(requestedData);
  if (userName.value !== '' && email.value !== '' && phone.value !== '') {
    const userData = {
      name: formData.get('nameData'),
      email: formData.get('emailData'),
      phone: formData.get('phoneData'),
    };
    console.log(userData);
  }
}

form.addEventListener('paste', pasteHandler);
form.addEventListener('change', validator);
form.addEventListener('submit', validator);
form.addEventListener('submit', newUser);
