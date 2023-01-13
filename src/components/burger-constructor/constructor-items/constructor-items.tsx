import  { useRef, FC } from "react";
import styles from "./constructor-items.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteIngredient,
  moveElement,
} from "../../../services/actions/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../../utils/types";
import { useDispatch } from "../../../services/types/hooks";

interface IConstructorItemsProps {
  element: TIngredient;
  index: number;
}

const ConstructorItems: FC<IConstructorItemsProps> = ({ element, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const resetIngredient = (id: number) => {
    dispatch(deleteIngredient(id));
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
    hover(element: TIngredient) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = element.index;
      const hoverIndex = index;
      
      dispatch(moveElement({ dragIndex, hoverIndex }));
      
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
        handleClose={() => resetIngredient(element.id)}
      />
    </li>
  );
};

export default ConstructorItems;
