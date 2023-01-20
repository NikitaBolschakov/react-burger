import { FC } from "react";
import { TIngredient } from "../../../../../../utils/types";
import styles from "./order-item-image.module.css";

interface IOrderItemImageProps {
  ingredient?: TIngredient;
}

const OrderItemImage: FC<IOrderItemImageProps> = ({ ingredient }) => {

  return (
    <div className={styles.border}>
      <div className={styles.container}>
        <img className={styles.image}  alt={ingredient?.name}  src={ingredient?.image} /> 
      </div>
    </div>
  );
}

export default OrderItemImage;