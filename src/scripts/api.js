const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
    headers: {
      authorization: "d6fc973b-5db5-4342-8fd7-fcfcf6cf6fd0",
      "Content-Type": "application/json",
    },
  };

function checkResApi(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getCurrentUserProfileApi = function() {
  return fetch(`${config.baseUrl}/users/me/`,
  {
    method: "GET",
    headers: config.headers
  })
  .then(checkResApi);
}

const updateCurrentUserAvatarApi = function(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`,
  {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
     })
  })
    .then(checkResApi);
}

const updateCurrentUserInfoApi = function(user) {
  return fetch(`${config.baseUrl}/users/me`,
  {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(user)
  })
    .then(checkResApi);
}

const getCardListApi = function() {
  return fetch(`${config.baseUrl}/cards`,
  {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResApi);
}

const postCardApi = function(card) {
  return fetch(`${config.baseUrl}/cards`,
  {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card)
  })
  .then(checkResApi);
}

const deleteCardApi = function(card) {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResApi);
}

const putLikeOnCardApi = function(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResApi);
}

const deleteLikeOnCardApi = function(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(checkResApi);
}

export {
  getCurrentUserProfileApi,
  updateCurrentUserAvatarApi,
  updateCurrentUserInfoApi,
  getCardListApi,
  postCardApi,
  deleteCardApi,
  putLikeOnCardApi,
  deleteLikeOnCardApi
}
