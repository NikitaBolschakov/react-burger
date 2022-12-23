import styles from "./feed-id.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams, useRouteMatch } from "react-router-dom";
import { useMemo } from "react";
import { formatOrderStatus } from "../../../utils/format-order-status";
import { useEffect } from "react";
import {
  wsConnectionAuthStart,
  wsConnectionClosed,
  wsConnectionStart,
} from "../../../services/actions/wsActions";
import { formatDate } from "../../../utils/format-date";
import ProfileOrderItemId from "../../profile-order-item-id/profile-order-item-id";

const FeedId = ({ textAlign }) => {

  const { id } = useParams();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.wsOrders.orders);
  const isConnected = useSelector((store) => store.wsOrders.wsConnected);

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredientItems
  );

  const order = orders?.find(({ _id }) => _id === id);

  //в зависимости от роута открываем нужное нам сокет-соединение
  //для получения массива заказов (общего/конкретного пользователя)
  useEffect(() => {
    if (!isConnected) {
      if (path.includes("feed")) {
        dispatch(wsConnectionStart());
      }
      if (path.includes("profile")) {
        dispatch(wsConnectionAuthStart());
      }
      return () => {
        dispatch(wsConnectionClosed());
      };
    }
  }, [dispatch]);

  //создаем объект, где ключ - _id ингредиента, а значение - количество
  //его повторений в массиве, возвращаемом сервером
  const countedOrderIngredients = order?.ingredients.reduce(
    (acc, ingredient) => {
      if (!acc[ingredient]) {
        acc[ingredient] = 1;
      } else {
        acc[ingredient] += 1;
      }
      return acc;
    },
    {}
  );
  //создаем массив из уникальных ингредиентов

  const filteredOrderIngredients = countedOrderIngredients
    ? Object.keys(countedOrderIngredients)
    : null;

  //создаем массив из уникальных ингредиентов для дальнейшей отрисовки,
  //добавляем в него количество повторов каждого ингредиента
  const selectedIngredients = filteredOrderIngredients?.reduce(
    (acc, ingredient) => {
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i]._id === ingredient) {
          const uniqueId = nanoid();
          acc.push({
            _id: ingredients[i]._id,
            price: ingredients[i].price,
            image: ingredients[i].image,
            name: ingredients[i].name,
            nanoId: uniqueId,
            quantity: countedOrderIngredients[ingredient],
          });
        }
      }
      return acc;
    },
    []
  );

  const totalPrice = useMemo(() => {
    return selectedIngredients?.reduce((acc, element) => {
      acc += element.price * element.quantity;

      return acc;
    }, 0);
  }, [selectedIngredients]);

  return (
    <>
      {order && (
        <div className={styles.order__container}>
          <p
            className={`${styles.order__orderId} text text_type_digits-default`}
            style={{ textAlign: `${textAlign}` }}
          >
            {`#${order.number}`}
          </p>
          <h2 className={`${styles.order__header} text text_type_main-medium`}>
            {`${order.name}`}
          </h2>
          <p
            className={`${styles.order__status} text text_type_main-default  ${
              order.status === "done"
                ? styles.order__status_done
                : order.status === "cancel"
                ? styles.order__status_cancel
                : ""
            }`}
          >
            {`${formatOrderStatus(order.status)}`}
          </p>
          <p className={`${styles.order__header} text text_type_main-medium`}>
            Состав:
          </p>
          <ul className={styles.orderIngredients__list}>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient.nanoId}>
                <ProfileOrderItemId
                  selectedIngredients={selectedIngredients}
                  ingredient={ingredient}
                />
              </li>
            ))}
          </ul>
          <div className={styles.orderIngredients__dateAndPrice_container}>
            <p className={`${styles.order__date} text text_type_main-default`}>
              {`${formatDate(order.updatedAt)}`}
            </p>
            <div className={`${styles.order__price_container}`}>
              <p
                className={`${styles.order__price} text text_type_digits-default`}
              >
                {totalPrice}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedId;
