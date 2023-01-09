import PropTypes from "prop-types";
import styles from "./ingridients-category.module.css";
import IngridientsItem from "../ingridients-item/ingridients-item";
import categories from "../../../utils/categories";
import { useDispatch, useSelector } from "react-redux";
import { setIngredientsModalActive } from "../../../services/actions/burger-ingredients";
import { setIngredientInModal } from "../../../services/actions/ingredient-details";
import { getIngredients } from "../../../utils/constants";

const IngredientsCategory = ({ type }) => {
  const dispatch = useDispatch();
  
  //открывает окно ингредиента и устанавливает ингредиент при  клике
  const handleOpenIngredientDetails = (currentIngredient) => {
    dispatch(setIngredientsModalActive());
    dispatch(setIngredientInModal(currentIngredient));
  };
  
  //берем пока все ингредиенты все стора
  const ingredients = useSelector(getIngredients);

  //Сортируем ингредиенты по трем основным категориям
  const category = ingredients.filter((element) => element.type === type);

  return (
    <div className={`${styles.item} `} id={type} >
      <h2 className={`${styles.text} text text_type_main-medium pb-6 pt-2`}>
        {categories[type]}
      </h2>
      <ul className={styles.list}>
        
        {category.map((element) => (
          <li
            className={`${styles.element}`}
            key={element._id}
            onClick={() => handleOpenIngredientDetails(element)}
          >
            <IngridientsItem key={element._id} ingredient={element} />
          </li>
        ))}
        
      </ul>
    </div>
  );
};

IngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
};

export default IngredientsCategory;
