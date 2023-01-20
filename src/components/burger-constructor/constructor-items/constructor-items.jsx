import  { useRef } from "react";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";
import styles from "./constructor-items.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DELETE_INGREDIENT,
  MOVE_ELEMENT,
} from "../../../services/actions/burger-constructor";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

const ConstructorItems = ({ element, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const deleteIngredient = (id) => {
    dispatch({ type: DELETE_INGREDIENT, id });
  };

  const id = element.id;

  const [{ opacity }, drag] = useDrag({
    type: "item",
    item: { id, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    })
  });

  const [, drop] = useDrop({
    accept: "item",
    hover(element) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = element.index;
      const hoverIndex = index;
      
      dispatch({
        type: MOVE_ELEMENT,
        payload: { dragIndex, hoverIndex },
      });
      
      element.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li className={`${styles.item} pt-4 mr-2`} ref={ref} style={{opacity}}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => deleteIngredient(element.id)}
      />
    </li>
  );
};

ConstructorItems.propTypes = {
  element: ingredientType.isRequired,
};

export default ConstructorItems;
