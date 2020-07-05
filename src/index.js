const form = document.getElementById('main-form');
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

function errorHandler(input, message) {
  const form = input.parentElement;
  const mistake = form.querySelector('small');
  form.className = 'form error';
  mistake.innerText = message;
}

function successHandler(input) {
  const form = input.parentElement;
  form.className = 'form success';
  // const errorCleaner = document.querySelector('small');
  // errorCleaner.remove();
}

function validator(event) {
  event.preventDefault();

  const userNameInput = userName.value.trim();
  const emailInput = email.value.trim();
  const phoneInput = phone.value.trim();

  if (userNameInput === '') {
    errorHandler(userName, 'Заполните ФИО полностью');
  } else if (!validUserName(userNameInput)) {
    errorHandler(userName, 'Введите ФИО в формате Петров Иван Васильевич');
  } else {
    successHandler(userName);
  }

  if (emailInput === '') {
    errorHandler(email, 'Для регистрации необходим email');
  } else if (!validEmail(emailInput)) {
    errorHandler(email, 'Email должен принадлежать домену gmail.com и не содержать символов, кроме латинских букв и цифр');
  } else {
    successHandler(email);
  }

  if (phoneInput === '') {
    errorHandler(phone, 'Введите Ваш номер мобильного телефона');
  } else if (!validPhone(phoneInput)) {
    errorHandler(phone, 'Номер должен начинаться с +7*, 8*, или 07*');
  } else {
    successHandler(phone);
  }
}

function pasteHandler(event) {
  event.preventDefault();

  const copiedData = event.clipboardData || window.clipboardData;
  const pastedData = copiedData.getData('Text');

  const target = document.activeElement;

  switch (target) {
    case userName:
      // tEsT=1234567890Григорий'~!#$%Бо^ри&со*вич(Т)а_+ба[{ч}к]\о|/:;"'<в,>.?
      console.log(`\nВставка \n${pastedData} \nв поле c id="${target.id}"`);
      // Корректировка выражения, чтобы избежать слишком длинных пробелов при вставке
      target.value = pastedData.replace(/[^ А-яё]/g, '').trim();
      console.log(`Результат:\n${target.value}`);
      break;

    case email:
      // gb.Ыыtaba4kov`~!#$%^&*хаюкен()+[{}]\|:;"'<,>.?/@gmail.com
      console.log(`\nВставка \n${pastedData} \nв поле c id="${target.id}"`);
      target.value = pastedData.replace(/[^.\w.@gmail.com]/g, ' ').replace(/\s+/g, '').trim();
      console.log(`Результат:\n${target.value}`);
      break;

    case phone:
      // `~!#$%^&*хаюкенq0+7(9wertyZXCV+[{16)2-}]\|:;"'<,>.--57-19!-48
      console.log(`\nВставка \n${pastedData} \nв поле c id="${target.id}"`);
      target.value = pastedData.replace(/[^0-9]/g, '').trim();
      console.log(`Результат:\n${target.value} \n${target.value.length}`);
      break;

    default:
      console.log('Выберите валидное поле для вставки');
  }
}

// Думал использовать fetch, но решил остановиться на Promise.all
async function newUser(event) {
  event.preventDefault();

  const requestedData = document.forms.signUpForm;
  const formData = new FormData(requestedData);

  let userData;
  if (validUserName(userName.value) && validEmail(email.value) && validPhone(phone.value)) {
    await Promise.all([
      userData = {
        name: formData.get('nameData'),
        email: formData.get('emailData'),
        phone: formData.get('phoneData'),
      },
    ]).catch((error) => console.log(error));
    console.log(userData);
  }

  alert(`Поздравляем, вы наняты на работу в Nethouse!
  \nФИО: ${userData.name}
  \nEmail: ${userData.email}
  \nТелефон: ${userData.phone}`);
}

form.addEventListener('paste', pasteHandler);
form.addEventListener('change', validator);
form.addEventListener('submit', validator);
form.addEventListener('submit', newUser);
