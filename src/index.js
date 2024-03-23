import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, delCard, likeCard, cardTemplate} from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

// @todo: DOM узлы
const cardList = document.querySelector(".places__list"); //В переменную cardList присваиваем элемент places__list, который мы будем наполнять в будущем.
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImg = document.querySelector('.popup_type_image');
const formNewCard = popupTypeNewCard.querySelector('.popup__form');
const formNewCardTitle = formNewCard.querySelector('.popup__input_type_card-name');
const formNewCardUrl = formNewCard.querySelector('.popup__input_type_url');
const formEditProfile = popupTypeEdit.querySelector('.popup__form');
const formEditProfileTitle = formEditProfile.querySelector('.popup__input_type_name');
const formEditProfileDescripion = formEditProfile.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');
const popupImg = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__caption');
const allPopups = document.querySelectorAll('.popup');

// @todo: Вывести карточки на страницу c массива.
/* forEach это функция, которая для каждого объекта cardArrObject массива initialCards выполнит в свою очередь другую функцию append.
Append это функция которая добавит элемент в концец другого элемента или узла. Append в свою очередь добавляет в конец элемент cardItem,
который в свою очередь является результатом возвращения функции addCard...*/
initialCards.forEach(function (initialCards) {
  cardList.append(createCard(initialCards, delCard, likeCard, openModalImage));
});

/*Все попапы теперь анимированы */
allPopups.forEach(function(popupElement){
  popupElement.classList.add('popup_is-animated')
})

/*Функция сохранения значений из формы в разметку страницы,
отменяем стандартное поведение формы,
чтобы не было обновления страницы. */
function saveProfile (event) {
  event.preventDefault();
  profileTitle.innerText = formEditProfileTitle.value;
  profileDescription.innerText = formEditProfileDescripion.value;
  closeModal(popupTypeEdit);
}

/*Функция открытия модального окна редактиврования профиля, поля сразу заполенены
значенияеми из разметки. */
function openProfileEditForm(event) {
  formEditProfileTitle.value = profileTitle.innerText;
  formEditProfileDescripion.value = profileDescription.innerText;
  openModal(popupTypeEdit);
}

/*Функция открытия модального окна с формой новой карточки, которая очищается */
function openNewCardForm (event) {
  openModal(popupTypeNewCard);
}

// Функция открытия модального окна с изображением карточки + описание
function openModalImage (event) {
  const cardImg = event.target;
  popupImg.src = cardImg.src;
  popupImg.alt = cardImg.alt;
  popupDescription.textContent = cardImg.alt;
  openModal(popupTypeImg);
}

// Функция добавления карточки из формы
function addNewCard (event) {
  event.preventDefault();
  const cardValue = {
    name: formNewCardTitle.value,
    link: formNewCardUrl.value
  }
  cardList.prepend(createCard(cardValue, delCard, likeCard, openModalImage));
  closeModal(popupTypeNewCard);
  formNewCard.reset();
}

/* Фнукция открытия модального окна добавления карточки,
которая очищается при открытии*/
profileAddButton.addEventListener('click', openNewCardForm)

/*Вешаем слушатель на кнопку редактирования профиля, поля в форме
в модальном окне заполенены тем, что в данный момент сохранено в разметке */
profileEditButton.addEventListener('click', openProfileEditForm);

/*Вешаем слушатель, по сабмиту значения формы передадутся в разметку */
formEditProfile.addEventListener('submit', saveProfile);

//Вешаем сабмит слушатель на форму добавления новой карточки и вызываем функцию добавления карточки
//со значениями которые ввёл пользователь.
formNewCard.addEventListener('submit', addNewCard)

export { cardTemplate };