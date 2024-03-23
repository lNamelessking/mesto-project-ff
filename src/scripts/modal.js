/* Функция открытия окна, в которую попадёт попап элемент. Мы присваеваем ему класс анимации, и через 100мс
открываем его */
function openModal (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnKey);
    document.addEventListener('click', closeModalOnClick);
}

/* Функция закрытия окна, в которую попадёт попап элемент. Мы закрываем его, и через 600мс,
когда анимация закончится, судя по CSS классу, убираем класс анимации*/
function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnKey);
    document.removeEventListener('click', closeModalOnClick);
}

/*Функция закрытия модального окна на кнопку Escape.  */
function closeModalOnKey (event) {
    if (event.key === 'Escape') {
        const popupTypeOpened = document.querySelector('.popup_is-opened');
        closeModal(popupTypeOpened);
    }
}

/*Фунция закрытия окна по клику на крестик либо по оверлею, в данном случае, мы смотрим, произошёл
ли кл */
function closeModalOnClick (event) {
    if (
      event.target.matches('.popup__close') ||
      event.target.classList.contains('popup_is-opened')
      ) {
        const popupTypeOpened = event.target.closest('.popup_is-opened')
        closeModal(popupTypeOpened);
    }
}

export { openModal, closeModal, closeModalOnKey, closeModalOnClick }
