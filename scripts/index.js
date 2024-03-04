// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //В переменную cardTemplate передали "контент" внутри тегов <template id="card-template">.

// @todo: DOM узлы
const cardList = document.querySelector(".places__list"); //В переменную cardList присваиваем элемент places__list, который мы будем наполнять в будущем.

// @todo: Функция создания карточки.
/*Работа функции организована таким образом: в оператор попадает объект из массива
с карточками, который хранит в себе заголовок и ссылку на картинку карточки.
Мы клонируем узел который содержит в себе теймплейт и заполняем его элементами объекта массива. */

function addCard(cardArrObject, delCard) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true); // В переменную cardItem будем клонировать эдемент places__item из теймплейта.
  const cardImage = cardItem.querySelector(".card__image"); //Ищем элемент, куда будем перекидывать ссылку на карточку из объекта.
  const cardTitle = cardItem.querySelector(".card__title"); //Ищем элемент, куда будем перекидывать название городов из объекта.
  const cardDelBtn = cardItem.querySelector(".card__delete-button"); //Ищем кнопку удаления карточки.
  cardImage.src = cardArrObject.link; // Наполняем карточку, передаём ссылку на картинку из объекта массива в аттрибут src элемента cardImage.
  cardTitle.textContent = cardArrObject.name; // Наполняем карточку. cardTitle это заголовок, передаём в него текст из объекта массива.
  cardDelBtn.addEventListener("click", delCard); /*Вешаем слушатель события, в данном случае у delCard появляется event, который содержит
  в себе информацию о событии которое произошло и место target, в котором оно произошло*/
  return cardItem; // Мы склонировали, наполнили,а  теперь возвращаем наполненный элемент
}
// @todo: Функция удаления карточки
function delCard (evt) {
    const delCardTarget = evt.target.closest('.places__item'); /* Клик происходит по кнопке, она является target,
    в данном случае мы delCardTarget присваиваем ближайший родительский элемент places__item к нашему target(кнопке)*/
    delCardTarget.remove(); //удаляем элемент
}
// @todo: Вывести карточки на страницу
/* forEach это функция, которая для каждого объекта cardArrObject массива initialCards выполнит в свою очередь другую функцию append.
Append это функция которая добавит элемент в концец другого элемента или узла. Append в свою очередь добавляет в конец элемент cardItem,
который в свою очередь является результатом возвращения функции addCard...*/
initialCards.forEach(function (cardArrObject) {
  cardList.append(addCard(cardArrObject, delCard));
});