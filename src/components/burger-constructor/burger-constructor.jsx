import React, { useMemo, useEffect, useReducer, useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItems from "./constructor-items/constructor-items";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BUN,
  ADD_INGREDIENT,
} from "../../services/actions/burger-constructor";
import { SET_ORDER_MODAL_ACTIVE } from "../../services/reducers/burger-ingredients";
import { getOrderNumber } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import { Redirect, useHistory } from "react-router-dom";

const BurgerConstructor = () => {
  
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth); 
  const history = useHistory();

  //текущие ингредиенты в бургере
  const currentIngredients = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );

  //текущая булка в бургере
  const currentBun = useSelector((store) => store.burgerConstructor.currentBun);

  //открывает окно заказа при клике
  const handleOpenOrderDetails = () => {
    dispatch({ type: SET_ORDER_MODAL_ACTIVE });
  }; 

  //собрать массив id элементов для заказа
  const ingredientsId = useMemo(
    () => currentIngredients.map((ingredient) => ingredient._id),
    [currentIngredients]
  );

  //отправить заказ, получить номер
  const postOrder = (ingredientsId) => {
    dispatch(getOrderNumber(ingredientsId));
  };

  const price = useMemo(() => {
    return (
      (currentBun ? currentBun.price * 2 : 0) +
      currentIngredients.reduce((sum, acc) => sum + acc.price, 0)
    );
  }, [currentIngredients, currentBun]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch({
          type: ADD_BUN,
          payload: { ...item, id: Date.now() },
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          payload: { ...item, id: Date.now() },
        });
      }
    }
  });

  return (
    <section className={`${styles.section} pl-10 pt-25`}>
      <div className={`${styles.container} pr-2`} ref={dropTarget}>
        {/* --------- верхняя булка ---------- */}
        {currentBun.length === 0 ? (
          <p></p>
        ) : (
          <div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={currentBun.name + "(верх)"}
              price={currentBun.price}
              thumbnail={currentBun.image}
            />
          </div>
        )}
        {/* --------- список начинок ---------- */}
        {(currentBun.length === 0 ) ? (
          <p className={`pr-2 text text_type_main-medium`}>
            &#128073;  Притащите сюда булочку  &#128072;
          </p>
        ) : currentIngredients.length === 0 && currentBun.length !== 0 ? (
          <p className={`pr-2 text text_type_main-medium`}>
            А теперь выбирайте начинку  &#128076;
          </p>
        ) : (
          <ul className={`${styles.list} pr-2`}>
            {currentIngredients.map((element, index) => {
              if (element.type === "main" || element.type === "sauce") {
                return (
                  <ConstructorItems
                    key={element.id}
                    element={element}
                    index={index}
                  />
                );
              }
            })}
          </ul>
        )}
        {/* --------- нижняя булка ---------- */}
        {currentBun.length === 0 ? (
          <p className={`${styles.text} pr-2 text text_type_main-large`}></p>
        ) : (
          <div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={currentBun.name + "(низ)"}
              price={currentBun.price}
              thumbnail={currentBun.image}
              className={styles.bun}
            />
          </div>
        )}
      </div>
      {/* --------- оформление заказа ---------- */}
      <div className={`${styles.order} pt-10 pr-5 pb-10`}>
        <div className={`${styles.count_result} pr-10`}>
          <p className="text text_type_digits-medium pr-2">
            {price > 0 ? price : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={(currentBun.length === 0 || currentIngredients.length === 0) && true} 
          type="primary"
          size="large"
          onClick={() => {
            if (!isAuth) {
              history.push("/login");;
            } else {
            handleOpenOrderDetails();
            postOrder(ingredientsId);
          } 
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
