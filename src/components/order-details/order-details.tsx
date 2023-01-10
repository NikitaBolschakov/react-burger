import { FC } from "react";
import styles from "./order-details.module.css";
import done from "../../vendors/images/done.svg";
import Preloader from "../preloader/preloader";
import { getOrderNumber } from "../../utils/constants";
import { useSelector } from "../../services/types/hooks";

const OrderDetails: FC = () => {
  const orderNumber = useSelector(getOrderNumber);

  return (
    <div className={`${styles.container} pl-25 pr-25`}>
      {orderNumber ? (
        <>
          <h1
            className={`${styles.title} text text_type_digits-large pt-15 pb-8`}
          >
            {orderNumber}
          </h1>
          <p className={`text text_type_main-medium pb-15`}>
            идентификатор заказа
          </p>
          <img className={`${styles.icon} pb-15`} src={done} alt={done} />
          <p className={`text text_type_main-default pb-2`}>
            Ваш заказ начали готовить
          </p>
          <p
            className={`text text_type_main-default text_color_inactive pb-30`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        <>
          <h1
            className={`${styles.title} text text_type_main-medium pt-15 pb-8`}
          >
            Заказ обрабатывается, пожалуйста, подождите несколько секунд...
          </h1>
          <Preloader />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
