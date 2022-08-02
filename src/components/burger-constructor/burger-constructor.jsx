import React, {
  useMemo,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItems from "./constructor-items/constructor-items";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";

import { ADD_INGREDIENT } from "../../services/actions/burger-constructor";
import { SET_ORDER_MODAL_ACTIVE } from "../../services/reducers/burger-ingredients";
import { getOrderNumber } from "../../services/actions/order-details";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  //открывает окно заказа при клике
  const handleOpenOrderDetails = () => {
    dispatch({type: SET_ORDER_MODAL_ACTIVE})
  }
  
  //берем пока из стора
  const currentIngredients = useSelector(store => store.burgerIngredients.ingredientItems);
  //когда будет днд, поменять на это
  //const currentIngredients = useSelector(store => store.burgerConstructor.currentIngredients);

  //найти в currentIngredients первую булку  //возможно здесь неправильно указана зависимость
  const bun = useMemo(
    () => currentIngredients.find((element) => element.type === "bun"),
    []
  );
  
  //собрал все id в заказе
  let ingredientsId = useMemo(() => currentIngredients.map((element) => element._id), []);
  
  //подсчет итоговой стоимости с помощью useReducer
  //const [total, dispatch] = useReducer(reducer, 0);

  /*function reducer(totalPrice, action) {
    const total = action.reduce((acc = 0, element) => {
      if (element.type === "bun") {
        acc += 2 * element.price;
      } else {
        acc += element.price;
      }
      return acc;
    }, totalPrice);
    return total;
  }*/

  const postOrder = (ingredientsId) => {
    dispatch(getOrderNumber(ingredientsId))
  }

  /*useEffect(() => {
    dispatch({type: ADD_INGREDIENT, payload: currentIngredients});
  }, [])*/

  return (
    <section className={`${styles.section} pl-10 pt-25`}>
      <div className={`${styles.container} pr-2`}>
        {/* --------- верхняя булка ---------- */}
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
        {/* --------- список покупок ---------- */}
        <ul className={`${styles.list} pr-2`}>
          {currentIngredients.map((element) => {
            if (element.type === "main" || element.type === "sauce") {
              return <ConstructorItems key={element._id} element={element} />;
            }
          })}
        </ul>
        {/* --------- нижняя булка ---------- */}
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      {/* --------- оформление заказа ---------- */}
      <div className={`${styles.order} pt-10 pr-5 pb-10`}>
        <div className={`${styles.count_result} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{/*total*/100}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handleOpenOrderDetails();
            postOrder(ingredientsId);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor
