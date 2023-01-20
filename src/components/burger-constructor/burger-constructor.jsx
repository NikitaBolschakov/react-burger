import React, {
  useMemo,
  useEffect,
  useContext,
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
import DataContext from "../../context/burger-ingredients-context";


const BurgerConstructor = ({ onClick, getOrder }) => {
  const data = useContext(DataContext);
  //найти в data первую булку
  const bun = useMemo(
    () => data.find((element) => element.type === "bun"),
    [data]
  );
  
  //собрал все id в заказе
  let orderId = useMemo(() => data.map((element) => element._id), [data]); 

  //подсчет итоговой стоимости с помощью useReducer
  const [total, dispatch] = useReducer(reducer, 0);

  function reducer(totalPrice, action) {
    const total = action.reduce((acc = 0, element) => {
      if (element.type === "bun") {
        acc += 2 * element.price;
      } else {
        acc += element.price;
      }
      return acc;
    }, totalPrice);
    return total;
  }

  useEffect(() => {
    dispatch(data);
  }, [data]);

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
          {data.map((element) => {
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
          <p className="text text_type_digits-medium pr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            onClick();
            getOrder(orderId);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
  getOrder: PropTypes.func.isRequired
};

export default BurgerConstructor;
