/*Создаём готовый конфиг для удобной манипуляции ниже.*/
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/*У каждого поля будет свой айди. Это удобно когда мы создаём свой span для показа ошибок.
Зададим ему класс с id и припишем ему error. Так мы будем отыскивать требуемый спан. В него перекидываем
сообщение об ошибке, присваиваем ему класс для отображения. Для инпута присваиваем свой класс.*/
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
}

/*Либо удаляем всё вышеперечисленное чтобы скрыть, если форма валидна. Текст контент просто очищаем "".*/
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = '';
}

/*Функция обходит массив из импутов и вернёт true если хотя бы один элемент не валидный */
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
  });
}

/*Функция которая выключает кнопку, если одно из полей не валидно. Если валидно, кнопка активна.*/
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

/*Если инпут не соответствует нашему паттерну, то присваем через data нужный текст. И если инпут в целом не валидный,
то присваем нужные декор классы.*/
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }  else {
    hideInputError(formElement, inputElement);
  }
};

/*Чистим валидацию. Включаем все кнопки, убираем все декор классы. Всё это делается для всех инпутов внутри одной формы.*/
function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(function(inputElement){
    hideInputError(formElement, inputElement);
    toggleButtonState(inputList,buttonElement);
  })
}

/*На все инпуты вешаем слушатели событий, которые отзываетюся на нажатия клавиш клавиатуры. Кнопка сразу не активна, поля пустые. */
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      isValid(formElement, inputElement);
      toggleButtonState(inputList,buttonElement);
    })
  })
}

//Всем формам включаем валидацию
function enableValidation () {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(function(formElement) {
    setEventListeners(formElement);
  })
}

export {
  clearValidation,
  enableValidation,
}
