import { putLikeOnCardApi, deleteLikeOnCardApi, deleteCardApi } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки.
function createCard(cardObject, currentUserProfileId, delCard, likeCard, openModalImage) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true); // В переменную cardItem будем клонировать элемент places__item из теймплейта.
  const cardImage = cardItem.querySelector(".card__image"); //Ищем элемент, куда будем перекидывать ссылку на изображение карточки из объекта.
  const cardTitle = cardItem.querySelector(".card__title"); //Ищем элемент, куда будем перекидывать название городов из объекта.
  const cardDelBtn = cardItem.querySelector(".card__delete-button"); //Ищем кнопку удаления карточки.
  const cardLikeBtn = cardItem.querySelector('.card__like-button'); //Кнопка лайка
  const cardLikeCounter = cardItem.querySelector('.card__like-counter'); // В счётчик будет передаваться колличество лайков на карточке.

  cardImage.src = cardObject.link; // Наполняем карточку, передаём ссылку на картинку из объекта.
  cardImage.alt = cardObject.name; // alt Будет соответствовать имени карточки в объекте.
  cardTitle.textContent = cardObject.name; // Наполняем карточку. cardTitle это заголовок, передаём в него текст из объекта массива.
  cardLikeCounter.textContent = cardObject.likes.length; //Счётику перекидываем значение длинны массива likes.

  /*Если в пуле лайкнувших пользователей есть айди нашего юзера, то кнопка лайка активна, если нет, то не активна.*/
  if (handlerLikeMatch(cardObject, currentUserProfileId)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  } else {
    cardLikeBtn.classList.remove('card__like-button_is-active');
  }

  /*Если в какой то карточке которые мы отфетчили есть id владельца, которое совпадает с айди нашего пользователя, то он - владелец,
  ему доступна кнопка удаления карточки. Если нет id - кнопка удаления удалена. На мэтч айди проверяем вспомогательной
  функцией, она проходится по массиву полученых карточек и сверяет owner._id и наш айди который мы отфетчили другой апи функцией.*/
  if(handlerCardOwnerMatch(cardObject, currentUserProfileId)) {
    cardDelBtn.remove();
  } else {
    cardDelBtn.addEventListener('click', function(){
      delCard(cardObject, cardItem);
    })
  }
  /*Слушатель клика, вызывает лайк картчоки (или дислайк внутри неё). */
  cardLikeBtn.addEventListener('click', function() {
    likeCard (cardObject, cardLikeCounter, cardLikeBtn );
  })

  cardImage.addEventListener('click', openModalImage); //Слушатель открытия большой картинки

  return cardItem;
}

// @todo: Функция удаления карточки. Всё просто. Удаляем карточку на сервере, по получению положительного ответа удаляем карточку из разметки.
function delCard (cardObject, cardItem) {
  deleteCardApi(cardObject)
    .then(function() {
      cardItem.remove();
    })
    .catch((err) => {
        console.log(err);
      });
    }

    /*Функция отправки лайка или дислайка на сервер. Если у кнопки есть активный класс, то мы по клику зафетчим дислайк на сервер.
    В ответ мы получим уже обновлённый массив с карточкой, из него возьмём новое значение длинны массива с лайками и вставим его в
    счётчик. Тоже самое касается и лайк части, если активного класса нет, то по клику мы отправим лайк на сервер, айди нашего пользователя
    появится в массиве других пользователей, которые лайкнули карточку, и добавим активный класс.*/
function likeCard(cardObject,cardLikeCounter,cardLikeBtn) {
  if (cardLikeBtn.classList.contains("card__like-button_is-active")) {
    deleteLikeOnCardApi(cardObject)
      .then((res) => {
        cardLikeCounter.textContent = res.likes.length;
        cardLikeBtn.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLikeOnCardApi(cardObject)
      .then((res) => {
        cardLikeCounter.textContent = res.likes.length;
        cardLikeBtn.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/*Вспомогательная функция чтобы проверять хозяина карточки. У каждой карточки есть owner со своим
айди. Если айди нашего пользователя не совпадает с айди владельца карточки, то вернём true. Это нужно
чтобы скрывать кнопку удаления на неподвластных нам карточках. */
function handlerCardOwnerMatch(cardObject, currentUserProfileId) {
  return currentUserProfileId !== cardObject.owner._id;
}


/*Вспомогательная функция. Проходится по массиву likes внутри объекта карточки. Это происходит для каждой карточки во время
фетча всех карточек с сервера. Как только метод some вернёт совпадение (если айди нашего пользователя есть в пуле лайкнувших людей)
вернётся true и мы выйдем из цикла. Это нужно чтобы тогглить класс кнопки лайка выше. */
function handlerLikeMatch(cardObject, currentUserProfileId) {
  return cardObject.likes.some(function(someLike) {
     return someLike._id === currentUserProfileId;
  })
}

export {
  cardTemplate,
  createCard,
  delCard,
  likeCard,
  handlerCardOwnerMatch,
  handlerLikeMatch
};
