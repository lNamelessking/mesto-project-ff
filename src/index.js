import './pages/index.css';
import { createCard, delCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { clearValidation, enableValidation} from './scripts/validation.js';
import { getCardListApi, getCurrentUserProfileApi, postCardApi, updateCurrentUserInfoApi, updateCurrentUserAvatarApi } from './scripts/api.js';
// @todo: DOM узлы
const cardList = document.querySelector(".places__list"); //В переменную cardList присваиваем элемент places__list, который мы будем наполнять в будущем.
const avatarUpdateButton = document.querySelector('.profile__image');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupTypeUpdateAvatar = document.querySelector('.popup_type_new-avatar');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImg = document.querySelector('.popup_type_image');

const formUpdateAvatar = popupTypeUpdateAvatar.querySelector('.popup__form');
const inputUpdateAvatar = formUpdateAvatar.querySelector('.popup__input_type_url');
const submitButtonUpdateAvatar = formUpdateAvatar.querySelector('.popup__button');

const formNewCard = popupTypeNewCard.querySelector('.popup__form');
const inputNewCardTitle = formNewCard.querySelector('.popup__input_type_card-name');
const inputNewCardUrl = formNewCard.querySelector('.popup__input_type_url');
const submitButtonNewCard = formNewCard.querySelector('.popup__button');

const formEditProfile = popupTypeEdit.querySelector('.popup__form');
const inputEditProfileTitle = formEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileDescripion = formEditProfile.querySelector('.popup__input_type_description');
const submitButtonEditProfile = formEditProfile.querySelector('.popup__button');

const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector(".profile__image");
const popupImg = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__caption');
const allPopups = document.querySelectorAll('.popup');
let currentUserProfileId = null;

/*Все попапы теперь анимированы */
allPopups.forEach(function(popupElement){
  popupElement.classList.add('popup_is-animated')
})

/*Открытие модального окна с аватаром*/
function openUpdateAvatarPopup(event) {
  clearValidation(formUpdateAvatar);
  openModal(popupTypeUpdateAvatar);
}

/*Функция открытия модального окна редактиврования профиля, поля сразу заполенены
значенияеми из разметки. */
function openProfileEditForm(event) {
  clearValidation(formEditProfile);
  inputEditProfileTitle.value = profileTitle.innerText;
  inputEditProfileDescripion.value = profileDescription.innerText;
  openModal(popupTypeEdit);
}

/*Функция открытия модального окна с формой новой карточки, которая очищается */
function openNewCardForm(event) {
  clearValidation(formNewCard);
  openModal(popupTypeNewCard);
}

// Функция открытия модального окна с изображением карточки + описание
function openModalImage(event) {
  const cardImg = event.target;
  popupImg.src = cardImg.src;
  popupImg.alt = cardImg.alt;
  popupDescription.textContent = cardImg.alt;
  openModal(popupTypeImg);
}

Promise.all([getCardListApi(), getCurrentUserProfileApi()])
  .then(function ([fetchedCardList, fetchedCurrentUser]) {
    currentUserProfileId = fetchedCurrentUser._id;
    profileTitle.textContent = fetchedCurrentUser.name;
    profileAvatar.style.background = `url(\\${fetchedCurrentUser.avatar})`
    profileDescription.textContent = fetchedCurrentUser.about;

    fetchedCardList.forEach(function(fetchedCard) {
      cardList.append(createCard(fetchedCard, currentUserProfileId, delCard, likeCard, openModalImage))
    })
  })
  .catch((err) => {
    console.log(err);
  });

//вспомогательная функция рендеринга состояния текста кнопки.
function renderLoading(loadingState, button) {
  if (loadingState === true) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = "Сохранить";
  }
}

/*Функция сохранения значений из формы в разметку страницы,
отменяем стандартное поведение формы,
чтобы не было обновления страницы. */
function postProfile(event) {
  event.preventDefault();
  const fetchingProfile = {
    name: inputEditProfileTitle.value,
    about: inputEditProfileDescripion.value
  }
  renderLoading(true, submitButtonEditProfile)
  updateCurrentUserInfoApi(fetchingProfile)
    .then(function(fetchedProfile){
      profileTitle.innerText = fetchedProfile.name
      profileDescription.innerText = fetchedProfile.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function(){
      renderLoading(false, submitButtonEditProfile)
    })
    closeModal(popupTypeEdit);
}
/*Обновление аватара по сабмиту, отправляем картинку, получаем ответ, вставляем, после обновления закрываем попап.*/
function postAvatar(event) {
  event.preventDefault();
  renderLoading(true, submitButtonUpdateAvatar);
  updateCurrentUserAvatarApi(inputUpdateAvatar.value)
    .then(function(fetchedAvatar) {
      profileAvatar.style.backgroundImage = `url(${fetchedAvatar.avatar})`
    })
    .catch((err) => { console.log(err);
    })
    .finally(function(){
      renderLoading(false, submitButtonUpdateAvatar)
    })
    closeModal(popupTypeUpdateAvatar);
}

/* Функция добавления карточки. Создаём объект где храним значение полей. Его передаём фетчу, получаем
объект новой карточки и выводим её, попутно меняя состояние кнопки при загрзке и отлавливая ошибки, в конце закрывеаем окно*/
function postCard(event) {
  event.preventDefault();
  const fetchingCard = {
    name: inputNewCardTitle.value,
    link: inputNewCardUrl.value
  }
  renderLoading(true, submitButtonNewCard)
  postCardApi(fetchingCard)
  .then(function(fetchedCard) {
    cardList.prepend(createCard(fetchedCard, currentUserProfileId, delCard, likeCard, openModalImage));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    renderLoading(false, submitButtonNewCard)
  })
  closeModal(popupTypeNewCard);
  formNewCard.reset();
}

avatarUpdateButton.addEventListener('click', openUpdateAvatarPopup);
/* Фнукция открытия модального окна добавления карточки,
которая очищается при открытии*/
profileAddButton.addEventListener('click', openNewCardForm);

/*Вешаем слушатель на кнопку редактирования профиля, поля в форме
в модальном окне заполенены тем, что в данный момент сохранено в разметке */
profileEditButton.addEventListener('click', openProfileEditForm);

/*Вешаем слушатель, по сабмиту значения формы передадутся в разметку */
formEditProfile.addEventListener('submit', postProfile);

//Вешаем сабмит слушатель на форму добавления новой карточки и вызываем функцию добавления карточки
//со значениями которые ввёл пользователь.
formNewCard.addEventListener('submit', postCard);

//Слушатель сабмита аватара
formUpdateAvatar.addEventListener('submit', postAvatar);

//Включаем валидацию
enableValidation();
