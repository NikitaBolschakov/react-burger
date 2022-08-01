import React, {
  useMemo,
  useEffect,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItems from "./constructor-items/constructor-items";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNumber } from "../../services/reducers/order-details";
import { ADD_INGREDIENT } from "../../services/actions/burger-constructor";

const BurgerConstructor = ({ onClick, /*getOrder*/ }) => {
  const dispatch = useDispatch();
  
  //const currentIngredients = useSelector(store => store.burgerConstructor.currentIngredients);

  //берем пока из стора
  const currentIngredients = useSelector(store => store.burgerIngredients.ingredientItems);

  //найти в data первую булку
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

  const g = () => {
    dispatch(getOrderNumber(ingredientsId));
  }

  useEffect(() => {
    dispatch({type: ADD_INGREDIENT, payload: currentIngredients});
  }, [])

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
            onClick();
            //dispatch(getOrderNumber(ingredientsId));
            //g();
            //getOrder(orderId);
          }}
        >
          Оформить заказ
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            onClick();
            //dispatch(getOrderNumber(ingredientsId));
            //g();
            //getOrder(orderId);
          }}
        >
          Номер заказа
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
