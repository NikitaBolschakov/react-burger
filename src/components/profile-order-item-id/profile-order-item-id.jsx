import styles from "./profile-order-item-id.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ItemImage from "../item-image/item-image";

const ProfileOrderItemId = ({ ingredient }) => {

  return (
    <div className={styles.orderIdFeedItem__container}>
      <ItemImage ingredient={ingredient} />
      <div className={styles.orderIdFeedItem__info_container}>
        <p
          className={`${styles.orderIdFeedItem__text} text text_type_main-small`}
        >
          {ingredient.name}
        </p>
        <div>
          <div className={`${styles.orderIdFeedItem__price_container}`}>
            <p
              className={`${styles.orderIdFeedItem__price} text text_type_digits-default`}
            >
              {`${ingredient.quantity} x ${ingredient.price}`}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOrderItemId