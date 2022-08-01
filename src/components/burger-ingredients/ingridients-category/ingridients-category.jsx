import React from "react";
import PropTypes from "prop-types";
import styles from "./ingridients-category.module.css";
import IngridientsItem from "../ingridients-item/ingridients-item";
import categories from "../../../utils/categories";
import {  useSelector } from "react-redux";

const IngredientsCategory = ({ type, onClick }) => {
  
  const ingredients = useSelector(store => store.burgerIngredients.ingredientItems); //берем из стора

  //Сортируем ингредиенты по трем основным категориям
  const category = ingredients.filter((element) => element.type === type);

  return (
    <li className={`${styles.item} `} id={type}>
      <h2 className={`${styles.text} text text_type_main-medium pb-6 pt-2`}>{categories[type]}</h2>
      <ul className={styles.list}>

        {category.map((element) => (
          <li className={`${styles.item}`} key={element._id} onClick={() => onClick(element)}>
            <IngridientsItem key={element._id} ingredient={element} />
          </li>
        ))}

      </ul>
    </li>
  );
};

IngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsCategory;