import { getData } from "../../utils/api";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../reducers/burger-ingredients";

export const BURGER_INGREDIENTS_REQUEST = "BURGER_INGREDIENTS_REQUEST"; //ожидаем ответа
export const BURGER_INGREDIENTS_SUCCESS = "BURGER_INGREDIENTS_SUCCESS"; //данные успешно получены
export const BURGER_INGREDIENTS_FAILED = "BURGER_INGREDIENTS_FAILED"; //произошла ошибка

//thunk-функция
export const getBurgerIngredientsItems = () => {
  return function (dispatch) {
    //сначала отправляй диспатч с загрузкой
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    //теперь функция получения данных, если все хорошо отправляй диспатч с типом и данными
    getData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredientItems: res.data,
        });
      })
      //если ошибка - выведи в консоль ее и отправь диспатч с типом 'ошибка'
      .catch((error) => {
        console.error("Error in getData()", error);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};
