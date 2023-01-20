import styles from "./order-ingredient.module.css";
import OrderItemImage from "../../feed/feed-orders/order-item/order-item-image/order-item-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderIngredient = ({ingredient}) => {

  return (
    <div className={styles.container}>
      <OrderItemImage ingredient={ingredient} />
      <div className={styles.info}>
        <p className={`${styles.text} text text_type_main-small`} >{ingredient?.name}</p>
        <div>
          <div className={`${styles.priceBox}`}>
            <p className={`${styles.price} text text_type_digits-default`}>
              {`${ingredient.quantity} x ${ingredient.price}`}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderIngredient;