import { FC } from "react";
import styles from "./ingridients-category.module.css";
import IngridientsItem from "../ingridients-item/ingridients-item";
import categories from "../../../utils/categories";
import { setIngredientsModalActive } from "../../../services/actions/burger-ingredients";
import { setIngredientInModal } from "../../../services/actions/ingredient-details";
import { getIngredients } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../services/types/hooks";
import { TIngredient } from "../../../utils/types";

//типизируем пропсы
interface IIngredientsCategoryProps {
  type: string;
}

const IngredientsCategory: FC<IIngredientsCategoryProps> = ({ type }) => {
  const dispatch = useDispatch();
  
  //открывает окно ингредиента и устанавливает ингредиент при  клике
  const handleOpenIngredientDetails = (currentIngredient: TIngredient) => {
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

export default IngredientsCategory;
