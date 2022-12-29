import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { formatDate } from "../../../../../utils/format-date";
import OrderItemImage from "./order-item-image/order-item-image";
import styles from "./order-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderItem = ({ order }) => {

  const ingredients = useSelector((store) => store.burgerIngredients.ingredientItems);
  const location = useLocation();
  const match = useRouteMatch();

  // 1) взять массив с заказом и пройтись по всем id
  // 2) взять массив ingredients и найти заказанные ингредиенты по id
  // 3) собрать из них новый массив

  const orderIngredients = useMemo(() => {
    return order.ingredients?.map((id) => {      //перебрать id в заказе
      return ingredients?.find((ingredient) => { //найти ингредиент с таким id в ingredients
        if (id === ingredient._id) {            //если они совпадают
          return ingredient;                    //вернуть этот ингредиент в массив orderIngredients
        }
      });
    });
  }, [order.ingredients]);

   const orderPrice = useMemo(() => {
    return orderIngredients?.reduce((sum, item) => {
      sum += item?.price
      return sum;
    }, 0);
  }, [orderIngredients]);  

  return (
    <Link
      to={{ pathname: `${match.path}/${order._id}`, state: { background: location }}}
      className={styles.container}
    >
      <div className={`${styles.item} ${styles.itemTop}`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{`${formatDate(order.createdAt)}`}</p>
      </div>
      <h2 className="text text_type_main-medium">{order.name}</h2>

      <p className={`${styles.status}text text_type_main-default`}>
        {order.status === "pending"
          ? "Готовится"
          : order.status === "done"
          ? "Выполнен"
          : order.status === "created"
          ? "Создан"
          : ""}
      </p>

      <div className={`${styles.item} ${styles.itemBottom}`}>
        <div className={styles.imageBox}>
          <ul className={styles.imageList}>
            {orderIngredients.map((ingredient, index) => (
              <li key={index}><OrderItemImage ingredient={ingredient} /></li>
            ))}
          </ul>
          {orderIngredients.length > 6 && (
            <p className={`${styles.counter} text text_type_main-small`}>
              {`+${orderIngredients.length - 6}`}
            </p>
          )}
        </div>
        <div className={`${styles.priceBox}`}>
          <p className={`${styles.price} text text_type_digits-default`}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;