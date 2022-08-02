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
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return handleResponse(res);
}

//отправка заказа
export const getOrder = async (ingredientsId) => {
	const res = await fetch(`${API.url}orders`, {
		method: 'POST',
		body: JSON.stringify({
			ingredients: ingredientsId
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return handleResponse(res);
}
