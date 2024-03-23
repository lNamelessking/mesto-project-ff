const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки.
/*Работа функции организована таким образом: в оператор попадает объект из массива
с карточками, который хранит в себе заголовок и ссылку на картинку карточки.
Мы клонируем узел который содержит в себе теймплейт и заполняем его элементами объекта массива. */

function createCard(cardArrObject, delCard, cardLike, openModalImage) {
    const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true); // В переменную cardItem будем клонировать эдемент places__item из теймплейта.
    const cardImage = cardItem.querySelector(".card__image"); //Ищем элемент, куда будем перекидывать ссылку на карточку из объекта.
    const cardTitle = cardItem.querySelector(".card__title"); //Ищем элемент, куда будем перекидывать название городов из объекта.
    const cardDelBtn = cardItem.querySelector(".card__delete-button"); //Ищем кнопку удаления карточки.
    const cardLikeBtn = cardItem.querySelector('.card__like-button');
    cardImage.src = cardArrObject.link; // Наполняем карточку, передаём ссылку на картинку из объекта массива в аттрибут src элемента cardImage.
    cardImage.alt = cardArrObject.name; // alt Будет соответствовать имени карточки в объекте.
    cardTitle.textContent = cardArrObject.name; // Наполняем карточку. cardTitle это заголовок, передаём в него текст из объекта массива.
    cardDelBtn.addEventListener("click", delCard); /*Вешаем слушатель события, в данном случае у delCard появляется event, который содержит
    в себе информацию о событии которое произошло и место target, в котором оно произошло*/
    cardLikeBtn.addEventListener('click', cardLike); // Слушатель лайка функции
    cardImage.addEventListener('click', openModalImage); //Слушатель открытия большой картинки
    return cardItem; // Мы склонировали, наполнили,а  теперь возвращаем наполненный элемент
  }

  // @todo: Функция удаления карточки
  function delCard (event) {
      const delCardTarget = event.target.closest('.places__item'); /* Клик происходит по кнопке, она является target,
      в данном случае мы delCardTarget присваиваем ближайший родительский элемент places__item к нашему target(кнопке)*/
      delCardTarget.remove(); //удаляем элемент
  }

  /*Функция лайка, если класса нет, то добавит, если есть, то удалит */
  function likeCard (event) {
    if (event.target.matches('.card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
    }
  }

  export {
    createCard,
    delCard,
    likeCard,
    cardTemplate
  };