import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";
import styles from "./ingridients-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const IngridientsItem = ({ ingredient }) => {
  const location = useLocation();
  const currentIngredients = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );

  const currentBun = useSelector((store) => store.burgerConstructor.currentBun);

  const counter = useMemo(
    () =>
      (count = 0) => {
        //пройти по каждому { _id } в currentIngredients, если совпадает с данным, добавить счетчик ++
        for (let { _id } of currentIngredients)
          if (_id === ingredient._id) count++;
        if (currentBun._id === ingredient._id) return 2;
        return count;
      },
    [currentBun, currentIngredients]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
      className={`${styles.item} pl-4`}
      ref={dragRef}
      style={{ opacity }}
    >
      <div>
        <img
          className={`${styles.image}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.price} pt-1 pb-2`}>
          <p className="text text_type_digits-default pr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default pb-10">{ingredient.name}</p>
        {counter() !== 0 && <Counter count={counter()} size="default" />}
      </div>
    </Link>
  );
};

IngridientsItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngridientsItem;
