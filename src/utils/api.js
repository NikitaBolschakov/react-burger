import { getCookie } from "./cookie";

export const API = {
  url: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-Type": "application/json",
  },
};

//обработчик ответа
export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//функция получения данных
export const getData = async () => {
  const res = await fetch(`${API.url}ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
};

//отправка заказа
export const getOrder = async (ingredientsId) => {
  const res = await fetch(`${API.url}orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken")
    },
  });
  return handleResponse(res);
};

//вход пользователя
export const loginRequest = async (loginData) => {
  const res = await fetch(`${API.url}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    }),
  });
  return handleResponse(res);
};

//отправляем email когда забыли пароль
export const forgotPasswordRequest = async (emailData) => {
  const res = await fetch(`${API.url}password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailData.email,
    }),
  });
  return handleResponse(res);
};

//отправляем новый пароль
export const resetPasswordRequest = async (passwordData) => {
  const res = await fetch(`${API.url}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: passwordData.password,
      token: passwordData.verCode,
    }),
  });
  return handleResponse(res);
};

//запрос на регистрацию пользователя
export const userRegistrationRequest = async (registerData) => {
  const res = await fetch(`${API.url}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
    }),
  });
  return handleResponse(res);
};

//запрос на выход
export const logoutRequest = async (refreshToken) => {
  const res = await fetch(`${API.url}auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
  return handleResponse(res);
};

//запрос на обновление пользователя
export const updateUserInfo = async (updateData) => {
  const res = await fetch(`${API.url}auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: updateData.email,
      name: updateData.name,
    }),
  });
  return handleResponse(res);
};

//запрос на рефреш токена 
export const refreshTokenRequest = async () => {
  const refreshToken = getCookie("refreshToken")
  const res = await fetch(`${API.url}auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem('jwt'),
    }),
  });
  return handleResponse(res);
};

//запрос данных пользователя
export const getUserInfo = async () => {
  const res = await fetch(`${API.url}auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
  return handleResponse(res);
};
