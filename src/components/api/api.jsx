export const API = {
    url: "https://norma.nomoreparties.space/api/ingredients",
    headers: {
      "Content-Type": "application/json"
    }
  }

//обработчик ответа
export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}